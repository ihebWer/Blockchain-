import { useEffect, useState } from 'react'; // Importation des hooks useEffect et useState de React
import { ethers } from 'ethers'; // Importation de la bibliothèque ethers pour interagir avec Ethereum
import { useLocation, useNavigate } from 'react-router-dom'; // Importation des hooks de react-router-dom pour la navigation
import Header from './Header'; // Importation du composant Header
import Footer from './Footer'; // Importation du composant Footer
import { contractABI, contractAddress } from '../contracts/contractInfo'; // Importation de l'ABI et de l'adresse du contrat
import '../Style/searchterrain.scss'; // Importation des styles spécifiques

// Composant principal pour afficher la liste des terrains
const TerrainList = () => {
    const location = useLocation(); // Utilisation du hook useLocation pour accéder à l'état passé par la navigation
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour naviguer entre les pages
    const [terrains, setTerrains] = useState([]); // État local pour stocker la liste des terrains
    const [error, setError] = useState(null); // État local pour gérer les erreurs

    // Effet pour formater et définir les terrains à partir de l'état de la navigation
    useEffect(() => {
        if (location.state && location.state.terrains) { // Vérifie si des terrains sont passés via l'état de la navigation
            const formattedTerrains = location.state.terrains.map(terrain => ({
                ...terrain,
                id: ethers.BigNumber.from(terrain.id).toString(), // Conversion de l'ID du terrain en chaîne de caractères
                capacity: ethers.BigNumber.from(terrain.capacity).toString(), // Conversion de la capacité en chaîne de caractères
            }));
            setTerrains(formattedTerrains); // Mise à jour de l'état avec les terrains formatés
        } else {
            setError('Aucun terrain disponible pour les critères spécifiés.'); // Message d'erreur si aucun terrain n'est trouvé
        }
    }, [location]); // Dépendance sur l'objet location

    // Fonction pour gérer la réservation d'un terrain
    const handleReservation = async (terrainId) => {
        try {
            if (!window.ethereum) { // Vérifie si un portefeuille Ethereum est connecté
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum); // Initialise un fournisseur Ethereum
            await provider.send("eth_requestAccounts", []); // Demande la connexion au portefeuille
            const signer = provider.getSigner(); // Récupère le signataire
            const contract = new ethers.Contract(contractAddress, contractABI, signer); // Initialise une instance du contrat

            const { startTime, endTime } = location.state; // Récupère les heures de début et de fin de l'état de la navigation
            if (!startTime || !endTime) { // Vérifie que les heures de début et de fin sont présentes
                throw new Error("Start time or end time is missing");
            }

            const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000); // Convertit l'heure de début en timestamp Unix
            const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000); // Convertit l'heure de fin en timestamp Unix

            await contract.makeReservation(terrainId, startTimestamp, endTimestamp); // Appelle la fonction de réservation du contrat

            navigate('/confirmation', { // Navigue vers la page de confirmation avec les détails de la réservation
                state: {
                    terrainId,
                    startTime,
                    endTime
                }
            });
        } catch (error) {
            setError(`Erreur: ${error.message}`); // Gère les erreurs en mettant à jour l'état d'erreur
        }
    };

    if (error) { // Affiche un message d'erreur si une erreur est présente
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header /> {/* Affiche le composant Header */}
            <h1 style={{ textAlign: 'center' }}>Liste des terrains adéquats</h1> {/* Titre de la section */}
            <div className="terrain-list-container">
                {terrains.map((terrain, index) => (
                    <div key={index} className="terrain-card">
                        <h2>{terrain.title}</h2>
                        <div className="terrain-details">
                            <div className="terrain-info">
                                <p><strong>Capacité :</strong> {terrain.capacity}</p> {/* Affiche la capacité du terrain */}
                                <p><strong>Description :</strong> {terrain.description}</p> {/* Affiche la description du terrain */}
                            </div>
                            <div className="terrain-actions">
                                <button
                                    className="extraordinary-button"
                                    onClick={() => handleReservation(terrain.id)} // Appelle handleReservation au clic
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer /> {/* Affiche le composant Footer */}
        </div>
    );
};

export default TerrainList; // Exportation du composant TerrainList
