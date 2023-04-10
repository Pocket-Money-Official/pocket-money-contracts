# TACT Compilation Report
Contract: ProfileMinter
BOC Size: 2305 bytes

# Types
Total Types: 23

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## CollectionData
TLB: `_ nextItemIndex:int257 collectionContent:^cell ownerAddress:address = CollectionData`
Signature: `CollectionData{nextItemIndex:int257,collectionContent:^cell,ownerAddress:address}`

## NftData
TLB: `_ isInitialized:bool index:int257 collectionAddress:address ownerAddress:Maybe address individualContent:^cell = NftData`
Signature: `NftData{isInitialized:bool,index:int257,collectionAddress:address,ownerAddress:Maybe address,individualContent:^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Mint
TLB: `mint#b5712673 queryId:uint64 forwardValue:coins = Mint`
Signature: `Mint{queryId:uint64,forwardValue:coins}`

## ChangeCollectionOwner
TLB: `change_collection_owner#957df3b4 queryId:uint64 newOwner:address = ChangeCollectionOwner`
Signature: `ChangeCollectionOwner{queryId:uint64,newOwner:address}`

## ChangeCollectionContent
TLB: `change_collection_content#d71180d0 queryId:uint64 newCollectionContent:^string = ChangeCollectionContent`
Signature: `ChangeCollectionContent{queryId:uint64,newCollectionContent:^string}`

## ChangeProfileBaseUrl
TLB: `change_profile_base_url#c4c31020 queryId:uint64 newProfileBaseUrl:^string = ChangeProfileBaseUrl`
Signature: `ChangeProfileBaseUrl{queryId:uint64,newProfileBaseUrl:^string}`

## Init
TLB: `init#81545354 queryId:uint64 forwardValue:coins owner:address authority:address = Init`
Signature: `Init{queryId:uint64,forwardValue:coins,owner:address,authority:address}`

## GetStaticData
TLB: `get_static_data#2fcb26a2 queryId:uint64 = GetStaticData`
Signature: `GetStaticData{queryId:uint64}`

## ProveOwnership
TLB: `prove_ownership#04ded148 queryId:uint64 dest:address forwardPayload:^cell withContent:bool = ProveOwnership`
Signature: `ProveOwnership{queryId:uint64,dest:address,forwardPayload:^cell,withContent:bool}`

## RequestOwner
TLB: `request_owner#d0c3bfea queryId:uint64 dest:address forwardPayload:^cell withContent:bool = RequestOwner`
Signature: `RequestOwner{queryId:uint64,dest:address,forwardPayload:^cell,withContent:bool}`

## Destroy
TLB: `destroy#1f04537a queryId:uint64 = Destroy`
Signature: `Destroy{queryId:uint64}`

## ChangeAuthority
TLB: `change_authority#928ff2eb queryId:uint64 newAuthority:address = ChangeAuthority`
Signature: `ChangeAuthority{queryId:uint64,newAuthority:address}`

## Revoke
TLB: `revoke#6f89f5e3 queryId:uint64 = Revoke`
Signature: `Revoke{queryId:uint64}`

## ReportStaticData
TLB: `report_static_data#8b771735 queryId:uint64 index:uint256 collection:address = ReportStaticData`
Signature: `ReportStaticData{queryId:uint64,index:uint256,collection:address}`

## OwnershipProof
TLB: `ownership_proof#0524c7ae queryId:uint64 itemId:uint256 owner:Maybe address data:^cell revokedAt:uint64 content:Maybe ^cell = OwnershipProof`
Signature: `OwnershipProof{queryId:uint64,itemId:uint256,owner:Maybe address,data:^cell,revokedAt:uint64,content:Maybe ^cell}`

## OwnerInfo
TLB: `owner_info#0dd607e3 queryId:uint64 itemId:uint256 initiator:address owner:Maybe address data:^cell revokedAt:uint64 content:Maybe ^cell = OwnerInfo`
Signature: `OwnerInfo{queryId:uint64,itemId:uint256,initiator:address,owner:Maybe address,data:^cell,revokedAt:uint64,content:Maybe ^cell}`

## Excesses
TLB: `excesses#d53276db queryId:uint64 = Excesses`
Signature: `Excesses{queryId:uint64}`

# Get Methods
Total Get Methods: 4

## get_collection_data

## get_nft_address_by_index
Argument: index

## get_nft_content
Argument: index
Argument: individualConten

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2977: Already initialized
10990: Already revoked
23129: Authority only
40129: Only collection contract can initialize
46880: Value should be greater than 2x forwardFee
58772: only owner