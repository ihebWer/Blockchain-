import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Header from './Header';
import Footer from './Footer';
import { ethers } from 'ethers';
import { reviewContractABI, reviewContractAddress } from '../contracts/ReviewManager';
import '../Style/Evaluation.scss';

const Evaluation = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert('Veuillez saisir une adresse de portefeuille.');
      return;
    }

    // Validation de l'adresse de portefeuille Ethereum
    if (!ethers.utils.isAddress(walletAddress)) {
      alert('Adresse de portefeuille invalide.');
      return;
    }

    if (!comment && rating === 0) {
      alert('Veuillez fournir un commentaire ou choisir une note.');
      return;
    }

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(reviewContractAddress, reviewContractABI, signer);

        const tx = await contract.addReview(rating, comment);
        await tx.wait();

        alert('Évaluation soumise avec succès');

        setRating(0);
        setComment('');
        setWalletAddress('');
      } else {
        alert('Ethereum wallet is not connected');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="evaluation-container">
      <Header />
      <h2>Saisir une évaluation</h2>
      
      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-block">
          <label>
            <b>Note :</b>
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
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
          </div>
        </div>
        
      </form>
      <button className='evaluation-button1'><b>Soumettre</b></button>
      <div className="center-link">
        <Link to="/avis"><b><u>Voir la liste des avis</u></b></Link>
      </div>
      <Footer />
    </div>
  );
};

export default Evaluation;
