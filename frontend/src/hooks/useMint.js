import { useState, useCallback, useEffect } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { useStacks } from '../context/StacksContext';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../utils/constants';
import toast from 'react-hot-toast';

export const useMint = () => {
    const { userSession, network } = useStacks();
    const [isMinting, setIsMinting] = useState(false);
    const [txId, setTxId] = useState(null);

    const mint = useCallback(async () => {
        if (!userSession.isUserSignedIn()) return;

        setIsMinting(true);
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
                    setIsMinting(false);
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
                    setIsMinting(false);
                    toast.error('Minting cancelled');
                },
            });
        } catch (e) {
            console.error('Minting error:', e);
            setIsMinting(false);
            toast.error('Something went wrong');
        }
    }, [userSession, network]);

    return { mint, isMinting, txId };
};
