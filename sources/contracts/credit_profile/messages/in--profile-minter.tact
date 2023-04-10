message Mint {
  queryId: Int as uint64;
  forwardValue: Int as coins;
}

message ChangeCollectionOwner {
  queryId: Int as uint64;
  newOwner: Address;
}

message ChangeCollectionContent {
  queryId: Int as uint64;
  newCollectionContent: String;
}

message ChangeProfileBaseUrl {
  queryId: Int as uint64;
  newProfileBaseUrl: String;
}