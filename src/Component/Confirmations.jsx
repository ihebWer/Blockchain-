import { useLocation, useNavigate } from 'react-router-dom'; // Importation des hooks useLocation et useNavigate de react-router-dom pour accéder à l'état de la navigation et naviguer entre les pages
import Header from './Header'; // Importation du composant Header pour l'interface utilisateur
import Footer from './Footer'; // Importation du composant Footer pour l'interface utilisateur
import '../Style/Confirmations.scss'; // Importation des styles spécifiques pour ce composant

// Composant principal Confirmation
const Confirmation = () => {
    const location = useLocation(); // Utilisation du hook useLocation pour accéder à l'état passé par la navigation
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour naviguer entre les pages

    const { terrainId, startTime, endTime } = location.state || {}; // Déstructuration des données passées via l'état de la navigation

    // Fonction pour naviguer vers la page d'accueil
    const handleBackToHome = () => {
        navigate('/'); // Navigue vers la route racine
    };

    return (
        <div>
            <Header /> {/* Affiche le composant Header */}
            <div className="confirmation-container">
                <h2>Confirmation de Réservation</h2> {/* Titre de la section de confirmation */}
                {terrainId ? (
                    <div className="confirmation-details"> {/* Affichage des détails de la réservation si l'ID du terrain est présent */}
                        <p>Votre réservation a été confirmée pour le terrain ID: {terrainId}</p> {/* Affiche l'ID du terrain */}
                        <p>Heure de début: {new Date(startTime).toLocaleString()}</p> {/* Affiche l'heure de début formatée */}
                        <p>Heure de fin: {new Date(endTime).toLocaleString()}</p> {/* Affiche l'heure de fin formatée */}
                        <button onClick={handleBackToHome} className="extraordinary-button">
                            Retour à l'accueil {/* Bouton pour retourner à la page d'accueil */}
                        </button>
                    </div>
                ) : (
                    <p>Aucune réservation trouvée.</p> // Message affiché si aucune réservation n'est trouvée
                )}
            </div>
            <Footer /> {/* Affiche le composant Footer */}
        </div>
    );
};

export default Confirmation; // Exportation du composant Confirmation

/*
Explication des commentaires ajoutés

Importation des modules :

Importation des hooks useLocation et useNavigate de react-router-dom pour accéder à l'état de la navigation et naviguer entre les pages.
Importation des composants Header et Footer pour l'interface utilisateur.
Importation des styles spécifiques pour ce composant.

Déclaration des états locaux :

Utilisation des hooks useLocation et useNavigate pour la navigation.
Déstructuration des données passées via l'état de la navigation (terrainId, startTime, endTime).

Fonction handleBackToHome :

Fonction pour naviguer vers la page d'accueil.
Utilise navigate('/') pour rediriger l'utilisateur vers la page d'accueil.

Rendu du composant :

Affiche le composant Header.
Affiche un titre pour la section de confirmation.
Si terrainId est présent, affiche les détails de la réservation (ID du terrain, heure de début et heure de fin).
Affiche un bouton qui appelle handleBackToHome pour retourner à la page d'accueil.
Si terrainId n'est pas présent, affiche un message indiquant qu'aucune réservation n'a été trouvée.
Affiche le composant Footer.
*/
