import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  balance: number;
  addTokens: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const addTokens = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return (
    <WalletContext.Provider value={{ balance, addTokens }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 