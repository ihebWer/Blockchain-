import { useState } from 'react'; // Importation du hook useState de React pour gérer l'état local
import { ethers } from 'ethers'; // Importation de ethers pour interagir avec le réseau Ethereum
import Header from './Header'; // Importation du composant Header pour l'interface utilisateur
import Footer from './Footer'; // Importation du composant Footer pour l'interface utilisateur
import '../Style/admin.scss'; // Importation des styles spécifiques pour ce composant
import { Button } from 'react-bootstrap'; // Importation du composant Button de react-bootstrap pour les boutons stylisés
import { Link } from 'react-router-dom'; // Importation du composant Link de react-router-dom pour la navigation entre les pages
import { contractABI, contractAddress } from '../contracts/NewsContract'; // Importation de l'ABI et de l'adresse du contrat NewsContract

const CreateNews = () => {
    // Déclaration de l'état formData pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: ''
    });
    // Déclaration de l'état message pour afficher les messages d'erreur ou de succès
    const [message, setMessage] = useState('');
    // Déclaration de l'état isLoading pour gérer l'état de chargement
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Mise à jour de l'état formData avec les nouvelles valeurs
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        const { title, content, date } = formData;
        if (!title || !content || !date) { // Vérification que tous les champs sont remplis
            setMessage("Tous les champs doivent être remplis.");
            return;
        }

        setIsLoading(true); // Passe l'état isLoading à true pour indiquer que le chargement est en cours
        setMessage(''); // Réinitialise le message

        try {
            if (!window.ethereum) { // Vérification de la connexion au portefeuille Ethereum
                throw new Error("Ethereum wallet is not connected");
            }

            // Initialisation du fournisseur Ethereum à partir de window.ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Envoie une demande de connexion au portefeuille
            const signer = provider.getSigner(); // Récupération du signataire
            // Initialisation d'une instance du contrat NewsContract à partir de son ABI et de son adresse
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Convertit la date en timestamp Unix
            const dateTimestamp = Math.floor(new Date(date).getTime() / 1000);

            // Appel de la fonction addNews du contrat avec les données du formulaire
            const transaction = await contract.addNews(title, content, dateTimestamp);
            await transaction.wait(); // Attend la confirmation de la transaction

            setMessage('News ajoutée avec succès.'); // Mise à jour du message de succès
            // Réinitialise le formulaire après l'ajout de la news
            setFormData({ title: '', content: '', date: '' });
        } catch (error) { // Gère les erreurs
            console.error("Erreur lors de l'ajout de la news:", error);
            setMessage(`Échec de l'ajout de la news: ${error.message}`); // Affiche le message d'erreur
        } finally {
            setIsLoading(false); // Passe l'état isLoading à false pour indiquer que le chargement est terminé
        }
    };

    return (
        <div className="unique-form-container1">
            <Header /> {/* Affiche le composant Header */}
            <h2><b>Ajouter une News</b></h2> {/* Titre du formulaire */}
            <form onSubmit={handleSubmit} className="reservation-form">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="title"><h3>Titre</h3></label></td> {/* Champ de saisie pour le titre */}
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
                            <td><label htmlFor="content"><h3>Contenu</h3></label></td> {/* Champ de saisie pour le contenu */}
                            <td>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="date"><h3>Date</h3></label></td> {/* Champ de saisie pour la date */}
                            <td>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit" className="extraordinary-button" disabled={isLoading}>
                    {isLoading ? 'Ajout en cours...' : 'Ajouter une news'} {/* Bouton de soumission du formulaire */}
                </Button>
                <Link to="/admin">
                  <Button className="extraordinary-button" variant="primary">
                    Ajouter un terrain {/* Bouton pour retourner à la page d'administration */}
                  </Button>
                </Link>
            </form>
            {message && <p>{message}</p>} {/* Affiche le message d'erreur ou de succès */}
            <Footer /> {/* Affiche le composant Footer */}
        </div>
    );
};

export default CreateNews; // Exportation du composant CreateNews
