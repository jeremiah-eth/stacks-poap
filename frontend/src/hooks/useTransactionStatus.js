import { useState, useEffect, useCallback } from 'react';
import { useStacks } from '../context/StacksContext';

export const useTransactionStatus = (imgTxId) => {
    const { network } = useStacks();
    const [status, setStatus] = useState('pending'); // pending, success, failed, not_found
    const [data, setData] = useState(null);

    const checkStatus = useCallback(async (txIdToCheck) => {
        if (!txIdToCheck) return;

        try {
            const apiUrl = network.coreApiUrl;
            const response = await fetch(`${apiUrl}/extended/v1/tx/${txIdToCheck}`);

            if (response.status === 404) {
                setStatus('not_found'); // Likely mempool hasn't indexed it yet
                return;
            }

            const txData = await response.json();
            setData(txData);

            if (txData.tx_status === 'success') {
                setStatus('success');
            } else if (txData.tx_status === 'pending') {
                setStatus('pending');
            } else if (txData.tx_status.startsWith('abort')) {
                setStatus('failed');
            }
        } catch (e) {
            console.error('Error checking tx status:', e);
        }
    }, [network]);

    useEffect(() => {
        if (!imgTxId) return;

        checkStatus(imgTxId);

        // Poll every 5 seconds if pending
        const interval = setInterval(() => {
            if (status === 'pending' || status === 'not_found') {
                checkStatus(imgTxId);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [imgTxId, checkStatus, status]);

    return { status, data };
};
