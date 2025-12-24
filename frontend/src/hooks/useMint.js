import { useState, useCallback, useEffect } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';
import { useStacks } from '../context/StacksContext';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../utils/constants';

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
                },
                onCancel: () => {
                    console.log('User cancelled minting');
                    setIsMinting(false);
                },
            });
        } catch (e) {
            console.error('Minting error:', e);
            setIsMinting(false);
        }
    }, [userSession, network]);

    return { mint, isMinting, txId };
};
