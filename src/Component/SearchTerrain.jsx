import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Style/searchterrain.scss';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../contracts/contractInfo';

const SearchTerrain = () => {
    const [formData, setFormData] = useState({
        numberOfPlayers: 1,
        reservationDate: '',
        startTime: '',
        endTime: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startTime') {
            const [hours, minutes] = value.split(':');
            const startTime = new Date(2000, 0, 1, hours, minutes);
            startTime.setMinutes(startTime.getMinutes() + 90); // Ajoute 90 minutes
            const endTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
            setFormData({ ...formData, [name]: value, endTime });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.numberOfPlayers || !formData.reservationDate || !formData.startTime) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        const numberOfPlayers = parseInt(formData.numberOfPlayers);
        if (isNaN(numberOfPlayers) || numberOfPlayers <= 1) {
            setMessage('Le nombre de joueurs doit être un entier strictement positif.');
            return;
        }

        const startTimeForm = new Date(`2000-01-01T${formData.startTime}`);
        const debutIntervalStart = new Date(`2000-01-01T06:00:00`);
        const debutIntervalEnd = new Date(`2000-01-01T18:00:00`);
        if (startTimeForm < debutIntervalStart || startTimeForm > debutIntervalEnd) {
            setMessage('L\'heure de début doit être entre 06:00 et 18:00.');
            return;
        }

        const currentDate = new Date();
        const reservationDate = new Date(formData.reservationDate);

        if (reservationDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) {
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();

            if (startTimeForm.getHours() < currentHour || (startTimeForm.getHours() === currentHour && startTimeForm.getMinutes() < currentMinute)) {
                const currentHourStr = currentHour < 10 ? '0' + currentHour : currentHour.toString();
                const currentMinuteStr = currentMinute < 10 ? '0' + currentMinute : currentMinute.toString();
                const errorMessage = `L'heure de début de réservation doit être postérieure à ${currentHourStr}:${currentMinuteStr}`;
                setMessage(errorMessage);
                return;
            }
        }

        try {
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const startTimestamp = Math.floor(new Date(`${formData.reservationDate}T${formData.startTime}`).getTime() / 1000);
            const endTimestamp = Math.floor(new Date(`${formData.reservationDate}T${formData.endTime}`).getTime() / 1000);

            console.log('startTimestamp:', startTimestamp);
            console.log('endTimestamp:', endTimestamp);

            const terrains = await contract.listAvailableTerrains(startTimestamp, endTimestamp);

            const formattedTerrains = terrains.map(terrain => ({
                id: ethers.BigNumber.from(terrain.id).toString(),
                title: terrain.title,
                description: terrain.description,
                capacity: ethers.BigNumber.from(terrain.capacity).toString(),
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
            });
        } catch (error) {
            setMessage(`Erreur: ${error.message}`);
        }
    };

    return (
        <div className="unique-form-container1">
            <Header />
            <h2><b>Recherche de terrain</b></h2>
            <form onSubmit={handleSubmit}>
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
                                />
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
                                />
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
                                />
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
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className="extraordinary-button" variant="primary" type="submit">Chercher</Button>
            </form>
            {message && <p>{message}</p>}
            <Footer />
        </div>
    );
};

export default SearchTerrain;
