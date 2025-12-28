import { useState, useEffect, useCallback } from 'react';
import { useStacks } from '../context/StacksContext';

export const useSTXBalance = () => {
    const { address, network } = useStacks();
    const [balance, setBalance] = useState({ stx: 0, loading: false, error: null });

    const fetchBalance = useCallback(async () => {
        if (!address) {
            setBalance({ stx: 0, loading: false, error: null });
            return;
        }

        setBalance(prev => ({ ...prev, loading: true }));
        try {
            const apiUrl = network.coreApiUrl;
            const response = await fetch(`${apiUrl}/extended/v1/address/${address}/balances`);
            const data = await response.json();

            // STX balance is in micro-STX
            const stx = data.stx.balance;

            setBalance({ stx, loading: false, error: null });
        } catch (error) {
            console.error('Error fetching balance:', error);
            setBalance(prev => ({ ...prev, loading: false, error }));
        }
    }, [address, network]);

    useEffect(() => {
        fetchBalance();

        // Refresh every 30 seconds
        const interval = setInterval(fetchBalance, 30000);
        return () => clearInterval(interval);
    }, [fetchBalance]);

    return { ...balance, refresh: fetchBalance };
};
