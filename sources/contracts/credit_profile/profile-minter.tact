import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./messages/in--profile-minter";
import "./messages/profile-minter--credit-profile";
import "./credit-profile";

struct CollectionData {
  nextItemIndex: Int;
  collectionContent: Cell;
  ownerAddress: Address;
}

fun calculateCreditProfileAddress(index: Int): Address {
  let stateInit: StateInit = initOf CreditProfile(index, myAddress());
  return contractAddress(stateInit);
}

contract ProfileMinter with Deployable, Ownable, Stoppable, Resumable {
  owner: Address;
  stopped: Bool;
  nextItemIndex: Int;
  collectionContent: String;
  profileBaseUrl: String;

  init(owner: Address, collectionContent: String, profileBaseUrl: String) {
    self.stopped = false;
    self.owner = owner;
    self.nextItemIndex = 0;
    self.collectionContent = collectionContent;
    self.profileBaseUrl = profileBaseUrl;
  }

  fun assembleItemUrl(index: Int): Cell {
    return beginCell()
      .storeUint(1, 8)
      .storeSlice(self.profileBaseUrl.asSlice())
      .storeRef(beginCell().storeUint(index, 256).endCell())
    .endCell();
  }

  receive(msg: ChangeCollectionOwner) {
    let ctx: Context = context();
    self.requireOwner();
    self.owner = msg.newOwner;
    reply(Excesses{
        queryId: msg.queryId
    }.toCell());
  }

  receive(msg: ChangeCollectionContent) {
    self.requireOwner();
    self.collectionContent = msg.newCollectionContent;
    reply(Excesses{
        queryId: msg.queryId
    }.toCell());
  }

  receive(msg: ChangeProfileBaseUrl) {
    self.requireOwner();
    self.profileBaseUrl = msg.newProfileBaseUrl;
    reply(Excesses{
        queryId: msg.queryId
    }.toCell());
  }

  receive(msg: Mint) {
    self.requireNotStopped();
    let ctx: Context = context();
    require(ctx.value > 3 * ctx.readForwardFee(), "Value should be greater than 2x forwardFee");
    let stateInit: StateInit = initOf CreditProfile(self.nextItemIndex, myAddress());
    let address: Address = contractAddress(stateInit);
    send(SendParameters{
      to: address,
      mode: SendRemainingValue,
      code: stateInit.code,
      data: stateInit.data,
      value: 0,
      body: Init{
        queryId: msg.queryId,
        forwardValue: msg.forwardValue,
        owner: ctx.sender,
        authority: self.owner
      }.toCell()
    });
    self.nextItemIndex = (self.nextItemIndex + 1);
  }

  get fun get_collection_data(): CollectionData {
    return CollectionData{
      nextItemIndex: self.nextItemIndex,
      collectionContent: self.collectionContent.asSlice().asCell(),
      ownerAddress: self.owner
    };
  }

  get fun get_nft_address_by_index(index: Int): Address {
    return calculateCreditProfileAddress(index);
  }

  get fun get_nft_content(index: Int, individualConten: Cell): Cell {
    return self.assembleItemUrl(index);
  }
}
