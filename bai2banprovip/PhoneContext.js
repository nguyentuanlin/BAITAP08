// PhoneContext.js
import React, { createContext, useContext, useState } from 'react';

const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const contextValue = {
    phoneNumber,
    setPhoneNumber,
    styles: {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4CAF50',
      },
      phoneText: {
        fontSize: 20,
        color: '#555',
      },
      phoneNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
    },
  };

  return (
    <PhoneContext.Provider value={contextValue}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  return useContext(PhoneContext);
};
