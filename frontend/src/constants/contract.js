import { NETWORK_MODE } from './network';

export const CONTRACT_ADDRESS = 'SP95KYNT2QWA2EXJS2WZT666ZVXDA4QV4AZZ2T5G';
export const CONTRACT_NAME = 'stacks-poap';

export const POAP_CONTRACT = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

// Asset identifier for the NFT
export const NFT_ASSET_NAME = 'poap-badge';
export const ASSET_IDENTIFIER = `${POAP_CONTRACT}::${NFT_ASSET_NAME}`;
