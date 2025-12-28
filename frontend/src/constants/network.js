import { StacksMainnet, StacksTestnet } from '@stacks/network';

const isMainnet = true; // Toggle this for dev/prod

export const network = isMainnet ? new StacksMainnet() : new StacksTestnet();

export const EXPLORER_BASE_URL = isMainnet
    ? 'https://explorer.hiro.so'
    : 'https://explorer.hiro.so';

export const NETWORK_MODE = isMainnet ? 'mainnet' : 'testnet';
