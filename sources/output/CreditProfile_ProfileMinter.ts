import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    nextItemIndex: bigint;
    collectionContent: Cell;
    ownerAddress: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.nextItemIndex, 257);
        b_0.storeRef(src.collectionContent);
        b_0.storeAddress(src.ownerAddress);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _nextItemIndex = sc_0.loadIntBig(257);
    let _collectionContent = sc_0.loadRef();
    let _ownerAddress = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function loadTupleCollectionData(source: TupleReader) {
    let _nextItemIndex = source.readBigNumber();
    let _collectionContent = source.readCell();
    let _ownerAddress = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeAddress(source.ownerAddress);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type NftData = {
    $$type: 'NftData';
    isInitialized: boolean;
    index: bigint;
    collectionAddress: Address;
    ownerAddress: Address | null;
    individualContent: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isInitialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeRef(src.individualContent);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _isInitialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collectionAddress = sc_0.loadAddress();
    let _ownerAddress = sc_0.loadMaybeAddress();
    let _individualContent = sc_0.loadRef();
    return { $$type: 'NftData' as const, isInitialized: _isInitialized, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function loadTupleNftData(source: TupleReader) {
    let _isInitialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collectionAddress = source.readAddress();
    let _ownerAddress = source.readAddressOpt();
    let _individualContent = source.readCell();
    return { $$type: 'NftData' as const, isInitialized: _isInitialized, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isInitialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collectionAddress);
    builder.writeAddress(source.ownerAddress);
    builder.writeCell(source.individualContent);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    queryId: bigint;
    forwardValue: bigint;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3044091507, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.forwardValue);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3044091507) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _forwardValue = sc_0.loadCoins();
    return { $$type: 'Mint' as const, queryId: _queryId, forwardValue: _forwardValue };
}

function loadTupleMint(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _forwardValue = source.readBigNumber();
    return { $$type: 'Mint' as const, queryId: _queryId, forwardValue: _forwardValue };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.forwardValue);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type ChangeCollectionOwner = {
    $$type: 'ChangeCollectionOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeCollectionOwner(src: ChangeCollectionOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2508059572, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeCollectionOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2508059572) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeCollectionOwner(source: ChangeCollectionOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeCollectionOwner(): DictionaryValue<ChangeCollectionOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeCollectionOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCollectionOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeCollectionContent = {
    $$type: 'ChangeCollectionContent';
    queryId: bigint;
    newCollectionContent: string;
}

export function storeChangeCollectionContent(src: ChangeCollectionContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3608248528, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.newCollectionContent);
    };
}

export function loadChangeCollectionContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3608248528) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newCollectionContent = sc_0.loadStringRefTail();
    return { $$type: 'ChangeCollectionContent' as const, queryId: _queryId, newCollectionContent: _newCollectionContent };
}

function loadTupleChangeCollectionContent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newCollectionContent = source.readString();
    return { $$type: 'ChangeCollectionContent' as const, queryId: _queryId, newCollectionContent: _newCollectionContent };
}

function storeTupleChangeCollectionContent(source: ChangeCollectionContent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.newCollectionContent);
    return builder.build();
}

function dictValueParserChangeCollectionContent(): DictionaryValue<ChangeCollectionContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeCollectionContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCollectionContent(src.loadRef().beginParse());
        }
    }
}

export type ChangeProfileBaseUrl = {
    $$type: 'ChangeProfileBaseUrl';
    queryId: bigint;
    newProfileBaseUrl: string;
}

export function storeChangeProfileBaseUrl(src: ChangeProfileBaseUrl) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3301117984, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.newProfileBaseUrl);
    };
}

export function loadChangeProfileBaseUrl(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3301117984) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newProfileBaseUrl = sc_0.loadStringRefTail();
    return { $$type: 'ChangeProfileBaseUrl' as const, queryId: _queryId, newProfileBaseUrl: _newProfileBaseUrl };
}

function loadTupleChangeProfileBaseUrl(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newProfileBaseUrl = source.readString();
    return { $$type: 'ChangeProfileBaseUrl' as const, queryId: _queryId, newProfileBaseUrl: _newProfileBaseUrl };
}

function storeTupleChangeProfileBaseUrl(source: ChangeProfileBaseUrl) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.newProfileBaseUrl);
    return builder.build();
}

function dictValueParserChangeProfileBaseUrl(): DictionaryValue<ChangeProfileBaseUrl> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeProfileBaseUrl(src)).endCell());
        },
        parse: (src) => {
            return loadChangeProfileBaseUrl(src.loadRef().beginParse());
        }
    }
}

export type Init = {
    $$type: 'Init';
    queryId: bigint;
    forwardValue: bigint;
    owner: Address;
    authority: Address;
}

export function storeInit(src: Init) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2169787220, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.forwardValue);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.authority);
    };
}

export function loadInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2169787220) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _forwardValue = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _authority = sc_0.loadAddress();
    return { $$type: 'Init' as const, queryId: _queryId, forwardValue: _forwardValue, owner: _owner, authority: _authority };
}

function loadTupleInit(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _forwardValue = source.readBigNumber();
    let _owner = source.readAddress();
    let _authority = source.readAddress();
    return { $$type: 'Init' as const, queryId: _queryId, forwardValue: _forwardValue, owner: _owner, authority: _authority };
}

function storeTupleInit(source: Init) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.forwardValue);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.authority);
    return builder.build();
}

function dictValueParserInit(): DictionaryValue<Init> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInit(src)).endCell());
        },
        parse: (src) => {
            return loadInit(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    queryId: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ProveOwnership = {
    $$type: 'ProveOwnership';
    queryId: bigint;
    dest: Address;
    forwardPayload: Cell;
    withContent: boolean;
}

export function storeProveOwnership(src: ProveOwnership) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(81711432, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.dest);
        b_0.storeRef(src.forwardPayload);
        b_0.storeBit(src.withContent);
    };
}

export function loadProveOwnership(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 81711432) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dest = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadRef();
    let _withContent = sc_0.loadBit();
    return { $$type: 'ProveOwnership' as const, queryId: _queryId, dest: _dest, forwardPayload: _forwardPayload, withContent: _withContent };
}

function loadTupleProveOwnership(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dest = source.readAddress();
    let _forwardPayload = source.readCell();
    let _withContent = source.readBoolean();
    return { $$type: 'ProveOwnership' as const, queryId: _queryId, dest: _dest, forwardPayload: _forwardPayload, withContent: _withContent };
}

function storeTupleProveOwnership(source: ProveOwnership) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.dest);
    builder.writeCell(source.forwardPayload);
    builder.writeBoolean(source.withContent);
    return builder.build();
}

function dictValueParserProveOwnership(): DictionaryValue<ProveOwnership> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProveOwnership(src)).endCell());
        },
        parse: (src) => {
            return loadProveOwnership(src.loadRef().beginParse());
        }
    }
}

export type RequestOwner = {
    $$type: 'RequestOwner';
    queryId: bigint;
    dest: Address;
    forwardPayload: Cell;
    withContent: boolean;
}

export function storeRequestOwner(src: RequestOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3502489578, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.dest);
        b_0.storeRef(src.forwardPayload);
        b_0.storeBit(src.withContent);
    };
}

export function loadRequestOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3502489578) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dest = sc_0.loadAddress();
    let _forwardPayload = sc_0.loadRef();
    let _withContent = sc_0.loadBit();
    return { $$type: 'RequestOwner' as const, queryId: _queryId, dest: _dest, forwardPayload: _forwardPayload, withContent: _withContent };
}

function loadTupleRequestOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dest = source.readAddress();
    let _forwardPayload = source.readCell();
    let _withContent = source.readBoolean();
    return { $$type: 'RequestOwner' as const, queryId: _queryId, dest: _dest, forwardPayload: _forwardPayload, withContent: _withContent };
}

function storeTupleRequestOwner(source: RequestOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.dest);
    builder.writeCell(source.forwardPayload);
    builder.writeBoolean(source.withContent);
    return builder.build();
}

function dictValueParserRequestOwner(): DictionaryValue<RequestOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRequestOwner(src)).endCell());
        },
        parse: (src) => {
            return loadRequestOwner(src.loadRef().beginParse());
        }
    }
}

export type Destroy = {
    $$type: 'Destroy';
    queryId: bigint;
}

export function storeDestroy(src: Destroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Destroy' as const, queryId: _queryId };
}

function loadTupleDestroy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Destroy' as const, queryId: _queryId };
}

function storeTupleDestroy(source: Destroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDestroy(): DictionaryValue<Destroy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadDestroy(src.loadRef().beginParse());
        }
    }
}

export type ChangeAuthority = {
    $$type: 'ChangeAuthority';
    queryId: bigint;
    newAuthority: Address;
}

export function storeChangeAuthority(src: ChangeAuthority) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2458907371, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newAuthority);
    };
}

export function loadChangeAuthority(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2458907371) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newAuthority = sc_0.loadAddress();
    return { $$type: 'ChangeAuthority' as const, queryId: _queryId, newAuthority: _newAuthority };
}

function loadTupleChangeAuthority(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newAuthority = source.readAddress();
    return { $$type: 'ChangeAuthority' as const, queryId: _queryId, newAuthority: _newAuthority };
}

function storeTupleChangeAuthority(source: ChangeAuthority) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newAuthority);
    return builder.build();
}

function dictValueParserChangeAuthority(): DictionaryValue<ChangeAuthority> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeAuthority(src)).endCell());
        },
        parse: (src) => {
            return loadChangeAuthority(src.loadRef().beginParse());
        }
    }
}

export type Revoke = {
    $$type: 'Revoke';
    queryId: bigint;
}

export function storeRevoke(src: Revoke) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1871312355, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadRevoke(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1871312355) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Revoke' as const, queryId: _queryId };
}

function loadTupleRevoke(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Revoke' as const, queryId: _queryId };
}

function storeTupleRevoke(source: Revoke) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserRevoke(): DictionaryValue<Revoke> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRevoke(src)).endCell());
        },
        parse: (src) => {
            return loadRevoke(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    queryId: bigint;
    index: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type OwnershipProof = {
    $$type: 'OwnershipProof';
    queryId: bigint;
    itemId: bigint;
    owner: Address | null;
    data: Cell;
    revokedAt: bigint;
    content: Cell | null;
}

export function storeOwnershipProof(src: OwnershipProof) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(86296494, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.itemId, 256);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.data);
        b_0.storeUint(src.revokedAt, 64);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadOwnershipProof(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 86296494) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _itemId = sc_0.loadUintBig(256);
    let _owner = sc_0.loadMaybeAddress();
    let _data = sc_0.loadRef();
    let _revokedAt = sc_0.loadUintBig(64);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'OwnershipProof' as const, queryId: _queryId, itemId: _itemId, owner: _owner, data: _data, revokedAt: _revokedAt, content: _content };
}

function loadTupleOwnershipProof(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _itemId = source.readBigNumber();
    let _owner = source.readAddressOpt();
    let _data = source.readCell();
    let _revokedAt = source.readBigNumber();
    let _content = source.readCellOpt();
    return { $$type: 'OwnershipProof' as const, queryId: _queryId, itemId: _itemId, owner: _owner, data: _data, revokedAt: _revokedAt, content: _content };
}

function storeTupleOwnershipProof(source: OwnershipProof) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.itemId);
    builder.writeAddress(source.owner);
    builder.writeCell(source.data);
    builder.writeNumber(source.revokedAt);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserOwnershipProof(): DictionaryValue<OwnershipProof> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipProof(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipProof(src.loadRef().beginParse());
        }
    }
}

export type OwnerInfo = {
    $$type: 'OwnerInfo';
    queryId: bigint;
    itemId: bigint;
    initiator: Address;
    owner: Address | null;
    data: Cell;
    revokedAt: bigint;
    content: Cell | null;
}

export function storeOwnerInfo(src: OwnerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(232130531, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.itemId, 256);
        b_0.storeAddress(src.initiator);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.data);
        b_0.storeUint(src.revokedAt, 64);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadOwnerInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 232130531) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _itemId = sc_0.loadUintBig(256);
    let _initiator = sc_0.loadAddress();
    let _owner = sc_0.loadMaybeAddress();
    let _data = sc_0.loadRef();
    let _revokedAt = sc_0.loadUintBig(64);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'OwnerInfo' as const, queryId: _queryId, itemId: _itemId, initiator: _initiator, owner: _owner, data: _data, revokedAt: _revokedAt, content: _content };
}

function loadTupleOwnerInfo(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _itemId = source.readBigNumber();
    let _initiator = source.readAddress();
    let _owner = source.readAddressOpt();
    let _data = source.readCell();
    let _revokedAt = source.readBigNumber();
    let _content = source.readCellOpt();
    return { $$type: 'OwnerInfo' as const, queryId: _queryId, itemId: _itemId, initiator: _initiator, owner: _owner, data: _data, revokedAt: _revokedAt, content: _content };
}

function storeTupleOwnerInfo(source: OwnerInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.itemId);
    builder.writeAddress(source.initiator);
    builder.writeAddress(source.owner);
    builder.writeCell(source.data);
    builder.writeNumber(source.revokedAt);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserOwnerInfo(): DictionaryValue<OwnerInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerInfo(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    queryId: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadTupleExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

 type ProfileMinter_init_args = {
    $$type: 'ProfileMinter_init_args';
    owner: Address;
    collectionContent: string;
    profileBaseUrl: string;
}

function initProfileMinter_init_args(src: ProfileMinter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.collectionContent);
        b_0.storeStringRefTail(src.profileBaseUrl);
    };
}

async function ProfileMinter_init(owner: Address, collectionContent: string, profileBaseUrl: string) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProfileMinter_init_args({ $$type: 'ProfileMinter_init_args', owner, collectionContent, profileBaseUrl })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ProfileMinter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2977: { message: `Already initialized` },
    10990: { message: `Already revoked` },
    23129: { message: `Authority only` },
    40129: { message: `Only collection contract can initialize` },
    46880: { message: `Value should be greater than 2x forwardFee` },
    58772: { message: `only owner` },
}

export class ProfileMinter implements Contract {
    
    static async init(owner: Address, collectionContent: string, profileBaseUrl: string) {
        return await ProfileMinter_init(owner, collectionContent, profileBaseUrl);
    }
    
    static async fromInit(owner: Address, collectionContent: string, profileBaseUrl: string) {
        const init = await ProfileMinter_init(owner, collectionContent, profileBaseUrl);
        const address = contractAddress(0, init);
        return new ProfileMinter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ProfileMinter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: ProfileMinter_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ChangeCollectionOwner | ChangeCollectionContent | ChangeProfileBaseUrl | Mint | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeCollectionOwner') {
            body = beginCell().store(storeChangeCollectionOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeCollectionContent') {
            body = beginCell().store(storeChangeCollectionContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeProfileBaseUrl') {
            body = beginCell().store(storeChangeProfileBaseUrl(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individualConten: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individualConten);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}