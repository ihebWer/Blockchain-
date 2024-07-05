import { useState } from 'react'; // Importation du hook useState de React pour gérer l'état local
import { Link } from 'react-router-dom'; // Importation du composant Link de react-router-dom pour la navigation entre les pages
import StarRating from './StarRating'; // Importation du composant StarRating pour afficher et manipuler les étoiles de notation
import Header from './Header'; // Importation du composant Header pour l'interface utilisateur
import Footer from './Footer'; // Importation du composant Footer pour l'interface utilisateur
import { ethers } from 'ethers'; // Importation de ethers pour interagir avec le réseau Ethereum
import { reviewContractABI, reviewContractAddress } from '../contracts/ReviewManager'; // Importation de l'ABI et de l'adresse du contrat ReviewManager
import '../Style/Evaluation.scss'; // Importation des styles spécifiques pour ce composant

// Composant principal Evaluation
const Evaluation = () => {
  // Déclaration des états locaux pour stocker la note, le commentaire et l'adresse du portefeuille
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Vérification que l'adresse du portefeuille est saisie
    if (!walletAddress) {
      alert('Veuillez saisir une adresse de portefeuille.');
      return;
    }

    // Validation de l'adresse de portefeuille Ethereum
    if (!ethers.utils.isAddress(walletAddress)) {
      alert('Adresse de portefeuille invalide.');
      return;
    }

    // Vérification que soit un commentaire soit une note est fourni
    if (!comment && rating === 0) {
      alert('Veuillez fournir un commentaire ou choisir une note.');
      return;
    }

    try {
      // Vérification de la connexion à un portefeuille Ethereum
      if (window.ethereum) {
        // Initialisation du fournisseur Ethereum à partir de window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Envoie une demande de connexion au portefeuille
        const signer = provider.getSigner(); // Récupération du signataire
        // Initialisation d'une instance du contrat ReviewManager à partir de son ABI et de son adresse
        const contract = new ethers.Contract(reviewContractAddress, reviewContractABI, signer);

        // Appel de la fonction addReview du contrat avec la note et le commentaire
        const tx = await contract.addReview(rating, comment);
        await tx.wait(); // Attend la confirmation de la transaction

        alert('Évaluation soumise avec succès'); // Affiche un message de succès

        // Réinitialise les champs du formulaire après la soumission
        setRating(0);
        setComment('');
        setWalletAddress('');
      } else {
        alert('Ethereum wallet is not connected');
      }
    } catch (error) { // Gère les erreurs
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="evaluation-container">
      <Header /> {/* Affiche le composant Header */}
      <h2>Saisir une évaluation</h2> {/* Titre de la section d'évaluation */}
      
      <form onSubmit={handleSubmit} className="evaluation-form"> {/* Formulaire d'évaluation */}
        <div className="form-block">
          <label>
            <b>Note :</b>
            {/* Composant StarRating pour sélectionner la note */}
            <StarRating
              count={5}
              value={rating}
              onChange={(value) => setRating(value)}
              size={24}
              color1={'#ffd700'}
              color2={'#000000'}
            />
          </label>
        </div>
        <div className="form-block">
          <div>
            <label>
              <b>Wallet :</b>
              {/* Champ de saisie pour l'adresse du portefeuille */}
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              <b>Commentaire :</b>
              {/* Champ de saisie pour le commentaire */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </div>
        </div>
        
      </form>
      {/* Bouton pour soumettre le formulaire */}
      <button className='evaluation-button1'><b>Soumettre</b></button>
      <div className="center-link">
        {/* Lien pour voir la liste des avis */}
        <Link to="/avis"><b><u>Voir la liste des avis</u></b></Link>
      </div>
      <Footer /> {/* Affiche le composant Footer */}
    </div>
  );
};

export default Evaluation; // Exportation du composant Evaluation
