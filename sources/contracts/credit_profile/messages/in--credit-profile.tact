message(0x2fcb26a2) GetStaticData {
  queryId: Int as uint64;
}

message(0x04ded148) ProveOwnership {
  queryId: Int as uint64;
  dest: Address;
  forwardPayload: Cell;
  withContent: Bool;
}

message(0xd0c3bfea) RequestOwner {
  queryId: Int as uint64;
  dest: Address;
  forwardPayload: Cell;
  withContent: Bool;
}

message(0x1f04537a) Destroy {
  queryId: Int as uint64;
}

message ChangeAuthority {
  queryId: Int as uint64;
  newAuthority: Address;
}

message(0x6f89f5e3) Revoke {
  queryId: Int as uint64;
}