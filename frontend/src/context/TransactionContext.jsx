import React, { createContext, useContext, useState, useEffect } from 'react';

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
