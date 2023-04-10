message(0x8b771735) ReportStaticData {
  queryId: Int as uint64;
  index: Int as uint256;
  collection: Address;
}

message(0x0524c7ae) OwnershipProof {
  queryId: Int as uint64;
  itemId: Int as uint256;
  owner: Address?;
  data: Cell;
  revokedAt: Int as uint64;
  content: Cell?;
}

message(0x0dd607e3) OwnerInfo {
  queryId: Int as uint64;
  itemId: Int as uint256;
  initiator: Address;
  owner: Address?;
  data: Cell;
  revokedAt: Int as uint64;
  content: Cell?;
}

message(0xd53276db) Excesses {
  queryId: Int as uint64;
}