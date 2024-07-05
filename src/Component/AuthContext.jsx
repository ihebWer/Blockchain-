import { createContext, useState, useContext, useEffect } from 'react'; // Importation des hooks nécessaires de React
import { useAccount, useDisconnect } from 'wagmi'; // Importation des hooks wagmi pour gérer les comptes Ethereum et la déconnexion
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation des types des props
import { getAdminAddresses } from './adminAddresses'; // Importation de la fonction qui retourne les adresses des administrateurs

// Création d'un contexte d'authentification
const AuthContext = createContext();

// Définition du composant AuthProvider qui va fournir le contexte d'authentification à ses enfants
export const AuthProvider = ({ children }) => {
  // Utilisation du hook useAccount de wagmi pour obtenir l'adresse et l'état de connexion de l'utilisateur
  const { address, isConnected } = useAccount(); 
  // Utilisation du hook useDisconnect de wagmi pour gérer la déconnexion
  const { disconnect } = useDisconnect();
  // État local pour déterminer si l'utilisateur est un administrateur
  const [isAdmin, setIsAdmin] = useState(false);

  // Effet qui se déclenche chaque fois que l'adresse ou l'état de connexion change
  useEffect(() => {
    // Si l'utilisateur est connecté
    if (isConnected) {
      // Récupération des adresses des administrateurs
      const adminAddresses = getAdminAddresses();
      // Vérification si l'adresse connectée est une adresse d'administrateur
      setIsAdmin(adminAddresses.includes(address));
    } else {
      // Si l'utilisateur n'est pas connecté, réinitialisation de l'état isAdmin à false
      setIsAdmin(false);
    }
  }, [address, isConnected]); // L'effet dépend de address et isConnected

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleDisconnect = () => {
    // Appel de la fonction disconnect pour déconnecter l'utilisateur
    disconnect();
    // Réinitialisation de l'état isAdmin à false
    setIsAdmin(false);
  };

  // Rendu du fournisseur de contexte avec les valeurs nécessaires
  return (
    <AuthContext.Provider value={{ isAdmin, address, isConnected, handleDisconnect }}>
      {children} {/* Rendu des enfants à l'intérieur du fournisseur de contexte */}
    </AuthContext.Provider>
  );
};

// Définition des types de props attendus pour le composant AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children doit être un élément React et est requis
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);
