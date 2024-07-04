import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { contractABI, contractAddress } from '../contracts/contractInfo';
import '../Style/searchterrain.scss';

const TerrainList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [terrains, setTerrains] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state && location.state.terrains) {
            const formattedTerrains = location.state.terrains.map(terrain => ({
                ...terrain,
                id: ethers.BigNumber.from(terrain.id).toString(),
                capacity: ethers.BigNumber.from(terrain.capacity).toString(),
            }));
            setTerrains(formattedTerrains);
        } else {
            setError('Aucun terrain disponible pour les critères spécifiés.');
        }
    }, [location]);

    const handleReservation = async (terrainId) => {
        try {
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const { startTime, endTime } = location.state;
            if (!startTime || !endTime) {
                throw new Error("Start time or end time is missing");
            }

            const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
            const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

            await contract.makeReservation(terrainId, startTimestamp, endTimestamp);

            navigate('/confirmation', {
                state: {
                    terrainId,
                    startTime,
                    endTime
                }
            });
        } catch (error) {
            setError(`Erreur: ${error.message}`);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header />
            <h1 style={{ textAlign: 'center' }}>Liste des terrains adéquats</h1>
            <div className="terrain-list-container">
                {terrains.map((terrain, index) => (
                    <div key={index} className="terrain-card">
                        <h2>{terrain.title}</h2>
                        <div className="terrain-details">
                            <div className="terrain-info">
                                <p><strong>Capacité :</strong> {terrain.capacity}</p>
                                <p><strong>Description :</strong> {terrain.description}</p>
                            </div>
                            <div className="terrain-actions">
                                <button
                                    className="extraordinary-button"
                                    onClick={() => handleReservation(terrain.id)}
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default TerrainList;
