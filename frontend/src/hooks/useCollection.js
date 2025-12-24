import { useState, useEffect } from 'react';
import { useStacks } from '../context/StacksContext';
import { FULL_CONTRACT_ID } from '../utils/constants';

export const useCollection = () => {
    const { address } = useStacks();
    const [badges, setBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCollection = async () => {
        if (!address) return;
        setIsLoading(true);
        try {
            // Fetching from Hiro API
            const response = await fetch(
                `https://api.hiro.so/extended/v1/tokens/nft/holdings?principal=${address}&contract_id=${FULL_CONTRACT_ID}`
            );
            const data = await response.json();
            setBadges(data.results || []);
        } catch (e) {
            console.error('Error fetching collection:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCollection();
    }, [address]);

    return { badges, isLoading, refresh: fetchCollection };
};
