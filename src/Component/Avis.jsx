import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { reviewContractABI, reviewContractAddress } from '../contracts/ReviewManager';
import Header from './Header';
import Footer from './Footer';
import '../Style/avis.scss';

const Avis = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const contract = new ethers.Contract(reviewContractAddress, reviewContractABI, provider);

            const reviews = await contract.getReviews();
            setReviews(reviews);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} style={{color:'#ffd700'}}>&#9733;</span>); // étoile pleine
            } else {
                stars.push(<span key={i}>&#9734;</span>); // étoile vide
            }
        }
        return stars;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="avis-container">
            <Header />
            <h2>Client Reviews</h2>
            <div className="reviews-grid">
                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <h3>Utilisateur: {review.user}</h3>
                        <div>Rating: {getStars(review.rating)}</div>
                        <p>Commentaire: {review.comment}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Avis;
