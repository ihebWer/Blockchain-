import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Style/searchterrain.scss';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { terrainId, startTime, endTime } = location.state || {};

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <Header />
            <div className="unique-form-container1">
                <h2>Confirmation de Réservation</h2>
                {terrainId ? (
                    <div>
                        <p>Votre réservation a été confirmée pour le terrain ID: {terrainId}</p>
                        <p>Heure de début: {new Date(startTime).toLocaleString()}</p>
                        <p>Heure de fin: {new Date(endTime).toLocaleString()}</p>
                        <button onClick={handleBackToHome} className="extraordinary-button">
                            Retour à l'accueil
                        </button>
                    </div>
                ) : (
                    <p>Aucune réservation trouvée.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Confirmation;
