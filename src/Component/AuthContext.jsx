import { createContext, useState, useContext, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import PropTypes from 'prop-types';
import { getAdminAddresses } from './adminAddresses'; // Assurez-vous d'avoir une fonction qui retourne les adresses admin

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isConnected) {
      const adminAddresses = getAdminAddresses();
      setIsAdmin(adminAddresses.includes(address));
    } else {
      setIsAdmin(false);
    }
  }, [address, isConnected]);

  const handleDisconnect = () => {
    disconnect();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, address, isConnected, handleDisconnect }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
