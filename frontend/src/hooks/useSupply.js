import { useState, useEffect } from 'react';
import { fetchCallReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { useStacks } from '../context/StacksContext';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../utils/constants';

export const useSupply = () => {
    const { network } = useStacks();
    const [supply, setSupply] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSupply = async () => {
        try {
            const result = await fetchCallReadOnlyFunction({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'get-last-token-id',
                functionArgs: [],
                network,
                senderAddress: CONTRACT_ADDRESS,
            });

            const json = cvToJSON(result);
            setSupply(parseInt(json.value.value));
            setIsLoading(false);
        } catch (e) {

            console.error('Error fetching supply:', e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSupply();
        const interval = setInterval(fetchSupply, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [network]);

    return { supply, isLoading, refresh: fetchSupply };
};
