import { useState } from 'react'; // Importation du hook useState de React pour gérer l'état local
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate de react-router-dom pour la navigation entre les pages
import Header from './Header'; // Importation du composant Header pour l'interface utilisateur
import Footer from './Footer'; // Importation du composant Footer pour l'interface utilisateur
import '../Style/searchterrain.scss'; // Importation des styles spécifiques pour ce composant
import { Button } from 'react-bootstrap'; // Importation du composant Button de react-bootstrap pour les boutons stylisés
import { ethers } from 'ethers'; // Importation de ethers pour interagir avec le réseau Ethereum
import { contractABI, contractAddress } from '../contracts/contractInfo'; // Importation de l'ABI et de l'adresse du contrat

// Composant principal SearchTerrain
const SearchTerrain = () => {
    // Déclaration des états locaux pour stocker les données du formulaire, les messages et l'état de chargement
    const [formData, setFormData] = useState({
        numberOfPlayers: 1,
        reservationDate: '',
        startTime: '',
        endTime: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation entre les pages

    // Fonction pour gérer les changements dans les champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startTime') { // Si le champ modifié est l'heure de début
            const [hours, minutes] = value.split(':'); // Séparation des heures et des minutes
            const startTime = new Date(2000, 0, 1, hours, minutes); // Création d'un objet Date avec l'heure de début
            startTime.setMinutes(startTime.getMinutes() + 90); // Ajout de 90 minutes à l'heure de début
            const endTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`; // Conversion de l'heure de fin en chaîne de caractères formatée
            setFormData({ ...formData, [name]: value, endTime }); // Mise à jour de l'état formData avec l'heure de début et l'heure de fin calculée
        } else { // Si le champ modifié n'est pas l'heure de début
            setFormData({ ...formData, [name]: value }); // Mise à jour de l'état formData avec la nouvelle valeur
        }
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        if (!formData.numberOfPlayers || !formData.reservationDate || !formData.startTime) { // Vérifie que tous les champs sont remplis
            alert('Veuillez remplir tous les champs.');
            return;
        }

        const numberOfPlayers = parseInt(formData.numberOfPlayers);
        if (isNaN(numberOfPlayers) || numberOfPlayers <= 1) { // Vérifie que le nombre de joueurs est un entier strictement positif
            setMessage('Le nombre de joueurs doit être un entier strictement positif.');
            return;
        }

        const startTimeForm = new Date(`2000-01-01T${formData.startTime}`);
        const debutIntervalStart = new Date(`2000-01-01T06:00:00`);
        const debutIntervalEnd = new Date(`2000-01-01T18:00:00`);
        if (startTimeForm < debutIntervalStart || startTimeForm > debutIntervalEnd) { // Vérifie que l'heure de début est entre 06:00 et 18:00
            setMessage('L\'heure de début doit être entre 06:00 et 18:00.');
            return;
        }

        const currentDate = new Date();
        const reservationDate = new Date(formData.reservationDate);

        if (reservationDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) { // Vérifie que la date de réservation n'est pas antérieure à la date actuelle
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();

            if (startTimeForm.getHours() < currentHour || (startTimeForm.getHours() === currentHour && startTimeForm.getMinutes() < currentMinute)) { // Vérifie que l'heure de début est postérieure à l'heure actuelle
                const currentHourStr = currentHour < 10 ? '0' + currentHour : currentHour.toString();
                const currentMinuteStr = currentMinute < 10 ? '0' + currentMinute : currentMinute.toString();
                const errorMessage = `L'heure de début de réservation doit être postérieure à ${currentHourStr}:${currentMinuteStr}`;
                setMessage(errorMessage);
                return;
            }
        }

        try {
            if (!window.ethereum) { // Vérifie si un portefeuille Ethereum est connecté
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum); // Initialisation d'un fournisseur Ethereum à partir de window.ethereum
            await provider.send("eth_requestAccounts", []); // Envoie une demande de connexion au portefeuille
            const signer = provider.getSigner(); // Récupère le signataire (utilisateur actuel)
            const contract = new ethers.Contract(contractAddress, contractABI, signer); // Initialisation d'une instance du contrat avec le signataire

            const startTimestamp = Math.floor(new Date(`${formData.reservationDate}T${formData.startTime}`).getTime() / 1000); // Conversion de l'heure de début en timestamp
            const endTimestamp = Math.floor(new Date(`${formData.reservationDate}T${formData.endTime}`).getTime() / 1000); // Conversion de l'heure de fin en timestamp

            console.log('startTimestamp:', startTimestamp);
            console.log('endTimestamp:', endTimestamp);

            const terrains = await contract.listAvailableTerrains(startTimestamp, endTimestamp); // Appelle la fonction listAvailableTerrains du contrat pour obtenir les terrains disponibles

            const formattedTerrains = terrains.map(terrain => ({
                id: ethers.BigNumber.from(terrain.id).toString(), // Conversion de l'ID du terrain en chaîne de caractères
                title: terrain.title,
                description: terrain.description,
                capacity: ethers.BigNumber.from(terrain.capacity).toString(), // Conversion de la capacité en chaîne de caractères
                isAvailable: terrain.isAvailable
            }));

            console.log('Navigating with:', {
                terrains: formattedTerrains,
                startTime: `${formData.reservationDate}T${formData.startTime}`,
                endTime: `${formData.reservationDate}T${formData.endTime}`
            });

            navigate('/terrains_disponibles', {
                state: {
                    terrains: formattedTerrains,
                    startTime: `${formData.reservationDate}T${formData.startTime}`,
                    endTime: `${formData.reservationDate}T${formData.endTime}`
                }
            }); // Navigation vers la page des terrains disponibles avec les données des terrains et les heures de début et de fin
        } catch (error) {
            setMessage(`Erreur: ${error.message}`); // Affichage du message d'erreur en cas d'échec de la transaction
        }
    };

    return (
        <div className="unique-form-container1">
            <Header /> {/* Affiche le composant Header */}
            <h2><b>Recherche de terrain</b></h2> {/* Titre de la section de recherche */}
            <form onSubmit={handleSubmit}> {/* Formulaire de recherche de terrain */}
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="numberOfPlayers"><h3>Nombre de joueurs </h3></label></td>
                            <td>
                                <input
                                    type="number"
                                    name="numberOfPlayers"
                                    value={formData.numberOfPlayers}
                                    onChange={handleChange}
                                /> {/* Champ de saisie pour le nombre de joueurs */}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reservationDate"><h3>Date de réservation </h3></label></td>
                            <td>
                                <input
                                    type="date"
                                    name="reservationDate"
                                    value={formData.reservationDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={handleChange}
                                /> {/* Champ de saisie pour la date de réservation */}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="startTime"><h3>Heure de début </h3></label></td>
                            <td>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                /> {/* Champ de saisie pour l'heure de début */}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="endTime"><h3>Heure de fin </h3></label></td>
                            <td>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    readOnly
                                /> {/* Champ de saisie pour l'heure de fin (lecture seule) */}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className="extraordinary-button" variant="primary" type="submit">Rechercher</Button> {/* Bouton de soumission du formulaire */}
            </form>
            {message && <p>{message}</p>} {/* Affichage des messages d'erreur ou de succès */}
            <Footer /> {/* Affiche le composant Footer */}
        </div>
    );
};

export default SearchTerrain; // Exportation du composant SearchTerrain
