import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages/in--credit-profile";
import "./messages/profile-minter--credit-profile";
import "./messages/credit-profile--in";

struct NftData {
  isInitialized: Bool;
  index: Int;
  collectionAddress: Address;
  ownerAddress: Address?;
  individualContent: Cell;
}

contract CreditProfile with Deployable {
  isInitialized: Bool;
  index: Int as uint256;
  collection: Address;
  owner: Address?;
  authority: Address?;
  revokedAt: Int as uint64;

  init(index: Int, collection: Address) {
    self.isInitialized = false;
    self.index = index;
    self.collection = collection;
    self.revokedAt = 0;
  }

  fun insertContent(withContent: Bool): Cell? {
    if (withContent) {
      return beginCell()
        .storeUint(self.index, 256)
      .endCell();
    }
    return emptyCell();
  }

  receive(msg: Init) {
    require(!self.isInitialized, "Already initialized");
    require(sender() == self.collection, "Only collection contract can initialize");
    self.isInitialized = true;
    self.owner = msg.owner;
    self.authority = msg.authority;
    nativeReserve(myBalance() + msg.forwardValue - context().value, 0);
    send(SendParameters{
      to: msg.owner,
      value: 0,
      mode: SendRemainingValue,
      body: "Credit Profile created".asComment()
    });
  }

  receive(msg: GetStaticData) {
    reply(ReportStaticData{
      queryId: msg.queryId,
      index: self.index,
      collection: self.collection
    }.toCell());
  }

  receive(msg: ProveOwnership) {
    require(sender() == self.owner, "only owner");
    send(SendParameters{
      to: msg.dest,
      value: 0,
      mode: SendRemainingValue,
      body: OwnershipProof{
        queryId: msg.queryId,
        itemId: self.index,
        owner: self.owner,
        data: msg.forwardPayload,
        revokedAt: self.revokedAt,
        content: self.insertContent(msg.withContent)
      }.toCell()
    });
  }

  receive(msg: Destroy) {
    require(sender() == self.owner, "only owner");
    self.owner = null;
    self.authority = null;
    reply(Excesses{
      queryId: msg.queryId
    }.toCell());
  }

  receive(msg: ChangeAuthority) {
    require(sender() == self.authority, "Authority only");
    self.authority = msg.newAuthority;
    reply(Excesses{
      queryId: msg.queryId
    }.toCell());
  }

  receive(msg: Revoke) {
    require(sender() == self.authority, "Authority only");
    require(self.revokedAt == 0, "Already revoked");
    self.revokedAt = now();
    reply(Excesses{
      queryId: msg.queryId
    }.toCell());
  }

  receive(msg: RequestOwner) {
    send(SendParameters{
      to: msg.dest,
      value: 0,
      mode: SendRemainingValue,
      body: OwnerInfo{
        queryId: msg.queryId,
        itemId: self.index,
        initiator: sender(),
        owner: self.owner,
        data: msg.forwardPayload,
        revokedAt: self.revokedAt,
        content: self.insertContent(msg.withContent)
      }.toCell()
    });
  }

  get fun get_nft_data(): NftData {
    return NftData{
      isInitialized: self.isInitialized,
      index: self.index,
      collectionAddress: self.collection,
      ownerAddress: self.owner,
      individualContent: beginCell()
        .storeUint(self.index, 256)
      .endCell()
    };
  }

  get fun get_authority_address(): Address? {
    return self.authority;
  }

  get fun get_revoked_time(): Int {
    return self.revokedAt;
  }
}
