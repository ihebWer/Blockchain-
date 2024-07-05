// Importation des hooks useState et useEffect de React pour gérer l'état et les effets dans le composant
import { useState } from 'react';
// Importation d'ethers pour l'interaction avec la blockchain Ethereum
import { ethers } from 'ethers';
// Importation des composants Header et Footer pour l'interface utilisateur
import Header from './Header';
import Footer from './Footer';
// Importation du fichier de styles SCSS spécifique à ce composant
import '../Style/admin.scss';
// Importation du composant Button de react-bootstrap pour les boutons stylisés
import { Button } from 'react-bootstrap';
// Importation du composant Link de react-router-dom pour la navigation entre les pages
import { Link } from 'react-router-dom';
// Importation des informations du contrat, y compris l'ABI (Application Binary Interface) et l'adresse du contrat
import { contractABI, contractAddress } from '../contracts/contractInfo';

// Déclaration du composant fonctionnel Admin
const Admin = () => {
    // Définition de l'état local pour gérer les données du formulaire, le message de retour et l'état de chargement
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        capacity: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour gérer les changements dans les champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Mise à jour de l'état formData avec les nouvelles valeurs saisies
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, capacity } = formData;
        // Vérification que tous les champs du formulaire sont remplis
        if (!title || !description || !capacity) {
            setMessage("Tous les champs doivent être remplis.");
            return;
        }

        // Définition de l'état de chargement sur true et réinitialisation du message
        setIsLoading(true);
        setMessage('');

        try {
            // Vérification de la connexion au portefeuille Ethereum
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            // Connexion au fournisseur Ethereum et récupération du signataire
            // getSigner() est une méthode de Web3Provider qui renvoie un objet Signer. 
            // Le Signer représente l'utilisateur connecté et contient la clé privée nécessaire pour signer des transactions. 
            // Cela permet à votre application d'effectuer des transactions en utilisant l'identité de l'utilisateur sans 
            // exposer directement sa clé privée.
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            // Création de l'instance du contrat
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Appel de la fonction addTerrain du contrat avec les données du formulaire
            const transaction = await contract.addTerrain(title, description, Number(capacity));
            await transaction.wait();

            // Mise à jour du message de succès et réinitialisation des champs du formulaire
            setMessage('Terrain ajouté avec succès.');
            setFormData({ title: '', description: '', capacity: '' });
        } catch (error) {
            // Gestion des erreurs et mise à jour du message d'erreur
            console.error("Erreur lors de l'ajout du terrain:", error);
            setMessage(`Échec de l'ajout du terrain: ${error.message}`);
        } finally {
            // Réinitialisation de l'état de chargement
            setIsLoading(false);
        }
    };

    // Retourne le JSX pour l'affichage du composant
    return (
        <div className="unique-form-container1">
            <Header />
            <h2><b>Ajouter un Terrain</b></h2>
            <form onSubmit={handleSubmit} className="reservation-form">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="title"><h3>Titre</h3></label></td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description"><h3>Description</h3></label></td>
                            <td>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="capacity"><h3>Capacité</h3></label></td>
                            <td>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit" className="extraordinary-button" disabled={isLoading}>
                    {isLoading ? 'Ajout en cours...' : 'Ajouter un terrain'}
                </Button>
                <Link to="/news">
                  <Button className="extraordinary-button" variant="primary">
                    Ajoutez une news
                  </Button>
                </Link>
            </form>
            {message && <p>{message}</p>}
            <Footer />
        </div>
    );
};

// Exportation du composant Admin pour pouvoir l'utiliser dans d'autres fichiers
export default Admin;
