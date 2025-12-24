import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { STACKS_MAINNET } from '@stacks/network';

const StacksContext = createContext();

export const useStacks = () => useContext(StacksContext);

export const StacksProvider = ({ children }) => {
    const [userSession] = useState(new UserSession({
        appConfig: new AppConfig(['store_write', 'publish_data'])
    }));
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        } else if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then((data) => {
                setUserData(data);
            });
        }
    }, [userSession]);

    const connectWallet = () => {
        showConnect({
            appDetails: {
                name: 'Stacks POAP',
                icon: window.location.origin + '/vite.svg',
            },
            userSession,
            onFinish: () => {
                setUserData(userSession.loadUserData());
            },
            onCancel: () => {
                console.log('User cancelled connection');
            }
        });
    };

    const disconnectWallet = () => {
        userSession.signUserOut();
        setUserData(null);
    };

    const value = {
        userSession,
        userData,
        address: userData?.profile?.stxAddress?.mainnet,
        isConnected: !!userData,
        connectWallet,
        disconnectWallet,
        network: STACKS_MAINNET
    };

    return (
        <StacksContext.Provider value={value}>
            {children}
        </StacksContext.Provider>
    );
};
