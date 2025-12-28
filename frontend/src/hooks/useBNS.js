import { useState, useEffect } from 'react';
import { useStacks } from '../context/StacksContext';

export const useBNS = () => {
    const { address, network } = useStacks();
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchName = async () => {
            if (!address) {
                setName(null);
                return;
            }

            setLoading(true);
            try {
                // Fetch names owned by address
                // Note: Using the BNS V1 endpoint for simplicity on Mainnet
                const apiUrl = network.coreApiUrl;
                const response = await fetch(`${apiUrl}/v1/addresses/stacks/${address}`);
                const data = await response.json();

                if (data.names && data.names.length > 0) {
                    setName(data.names[0]);
                } else {
                    setName(null);
                }
            } catch (error) {
                console.error('Error fetching BNS name:', error);
                setName(null);
            } finally {
                setLoading(false);
            }
        };

        fetchName();
    }, [address, network]);

    return { name, loading };
};
