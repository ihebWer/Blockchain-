import { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React pour gérer l'état et les effets secondaires
import { ethers } from 'ethers'; // Importation de ethers pour interagir avec le réseau Ethereum
import { reviewContractABI, reviewContractAddress } from '../contracts/ReviewManager'; // Importation des ABI et de l'adresse du contrat ReviewManager
import Header from './Header'; // Importation des composants Header pour l'interface utilisateur
import Footer from './Footer'; // Importation des composants Footer pour l'interface utilisateur
import '../Style/avis.scss'; // Importation des styles spécifiques pour ce composant

// Composant principal Avis
const Avis = () => {
    // Déclaration des états locaux
    const [reviews, setReviews] = useState([]); // reviews : stocke les avis récupérés depuis le contrat
    const [loading, setLoading] = useState(true); // loading : gère l'état de chargement
    const [error, setError] = useState(null); // error : gère les erreurs

    // Fonction pour récupérer les avis depuis le contrat
    const fetchReviews = async () => {
        try {
            // Vérifie si un portefeuille Ethereum est connecté
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            // Initialise un fournisseur Ethereum à partir de window.ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Envoie une demande de connexion au portefeuille
            const contract = new ethers.Contract(reviewContractAddress, reviewContractABI, provider); // Initialise une instance du contrat ReviewManager à partir de son ABI et de son adresse

            // Récupère les avis en appelant la fonction getReviews du contrat
            const reviews = await contract.getReviews();
            setReviews(reviews); // Met à jour l'état reviews avec les avis récupérés
            setLoading(false); // Arrête l'affichage de chargement
        } catch (error) {
            setError(error.message); // Met à jour l'état error avec le message d'erreur
            setLoading(false); // Arrête l'affichage de chargement
        }
    };

    // Effet useEffect
    useEffect(() => {
        fetchReviews(); // Exécute fetchReviews au montage du composant pour récupérer les avis
    }, []); // Le tableau vide [] indique que cet effet s'exécute une seule fois au montage

    // Fonction getStars
    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                // Génère un tableau de composants étoiles (<span>) en fonction de la notation (rating) passée en paramètre
                stars.push(<span key={i} style={{color:'#ffd700'}}>&#9733;</span>); // Utilise des étoiles pleines pour les notes jusqu'à rating
            } else {
                stars.push(<span key={i}>&#9734;</span>); // Utilise des étoiles vides pour les notes au-dessus
            }
        }
        return stars;
    };

    // Affichage conditionnel
    if (loading) {
        return <div>Loading...</div>; // Affiche un message de chargement pendant la récupération des avis
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Affiche un message d'erreur en cas d'erreur
    }

    return (
        <div className="avis-container">
            <Header /> {/* Affiche le composant Header */}
            <h2>Client Reviews</h2> {/* Titre de la section */}
            <div className="reviews-grid">
                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <h3>Utilisateur: {review.user}</h3> {/* Affiche le nom de l'utilisateur */}
                        <div>Rating: {getStars(review.rating)}</div> {/* Affiche les étoiles de notation */}
                        <p>Commentaire: {review.comment}</p> {/* Affiche le commentaire */}
                    </div>
                ))}
            </div>
            <Footer/> {/* Affiche le composant Footer */}
        </div>
    );
};

export default Avis; // Exportation du composant Avis
