import { useState, useCallback, useEffect } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { useStacks } from '../context/StacksContext';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../utils/constants';
import toast from 'react-hot-toast';

export const useMint = () => {
    const { userSession, network, address } = useStacks();
    const [mintStatus, setMintStatus] = useState('idle'); // idle, preparing, signing, broadcasting, success, error
    const [txId, setTxId] = useState(null);

    const mint = useCallback(async () => {
        if (!userSession.isUserSignedIn()) return;

        setMintStatus('preparing');
        // Balance Check
        try {
            const apiUrl = network.coreApiUrl;
            const response = await fetch(`${apiUrl}/extended/v1/address/${address}/balances`);
            const data = await response.json();
            const balance = parseInt(data.stx.balance);

            // Should have at least 0.5 STX for fees
            if (balance < 500000) {
                toast.error('Insufficient STX balance for fees');
                setMintStatus('error');
                return;
            }
        } catch (e) {
            console.error('Balance check failed:', e);
            // Proceed anyway, let the wallet handle it if check fails
        }

        setMintStatus('signing');
        try {
            await openContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'mint',
                functionArgs: [],
                network,
                onFinish: (data) => {
                    console.log('Transaction broadcasted:', data.txId);
                    setTxId(data.txId);
                    setMintStatus('broadcasting'); // It's broadcasted, but we wait for exploration
                    setTimeout(() => setMintStatus('success'), 1000);
                    toast.success('Transaction broadcasted!', {
                        duration: 5000,
                        icon: '🚀',
                        style: {
                            background: '#020617',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }
                    });
                },
                onCancel: () => {
                    console.log('User cancelled minting');
                    setMintStatus('idle');
                    toast.error('Minting cancelled');
                },
            });
        } catch (e) {
            console.error('Minting error:', e);
            setMintStatus('error');
            toast.error('Something went wrong');
        }
    }, [userSession, network, address]);

    return { mint, mintStatus, txId, isMinting: mintStatus !== 'idle' && mintStatus !== 'error' };
};
