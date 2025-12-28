import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('poap_transactions');
        if (saved) {
            try {
                setTransactions(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse transactions', e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('poap_transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (tx) => {
        setTransactions(prev => [tx, ...prev]);
    };

    const updateTransaction = (txId, updates) => {
        setTransactions(prev => prev.map(tx =>
            tx.txId === txId ? { ...tx, ...updates } : tx
        ));
    };

    const clearTransactions = () => {
        setTransactions([]);
        localStorage.removeItem('poap_transactions');
    };

    // Background Polling Daemon
    useEffect(() => {
        const checkPendingTransactions = async () => {
            const pendingTxs = transactions.filter(tx => tx.status === 'pending');
            if (pendingTxs.length === 0) return;

            // In a real app with many txs, we'd batch this or use a more efficient query
            // For now, check individually
            for (const tx of pendingTxs) {
                try {
                    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tx/${tx.txId}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.tx_status === 'success') {
                            updateTransaction(tx.txId, { status: 'success' });
                            toast.success('Transaction confirmed!', {
                                icon: '✅',
                                style: { background: '#020617', color: '#fff', border: '1px solid rgba(74,222,128,0.2)' }
                            });
                            confetti({
                                particleCount: 100,
                                spread: 70,
                                origin: { y: 0.6 }
                            });
                        } else if (data.tx_status.startsWith('abort')) {
                            updateTransaction(tx.txId, { status: 'failed', error: data.tx_result?.repr });
                            toast.error('Transaction failed', {
                                icon: '❌',
                                style: { background: '#020617', color: '#fff', border: '1px solid rgba(248,113,113,0.2)' }
                            });
                        }
                    }
                } catch (e) {
                    console.error('Error polling tx:', tx.txId, e);
                }
            }
        };

        const interval = setInterval(checkPendingTransactions, 5000);
        return () => clearInterval(interval);
    }, [transactions]);

    const value = {
        transactions,
        addTransaction,
        updateTransaction,
        clearTransactions
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
