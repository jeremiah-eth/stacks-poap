import { EXPLORER_BASE_URL, NETWORK_MODE } from '../constants/network';

export const getExplorerLink = (id, type = 'tx') => {
    return `${EXPLORER_BASE_URL}/${type}/${id}?chain=${NETWORK_MODE}`;
};

export const getExplorerAddressLink = (address) => {
    return getExplorerLink(address, 'address');
};

export const getExplorerTxLink = (txId) => {
    return getExplorerLink(txId, 'txid');
};
