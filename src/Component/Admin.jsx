import { useState } from 'react';
import { ethers } from 'ethers';
import Header from './Header';
import Footer from './Footer';
import '../Style/admin.scss';
import { Button } from 'react-bootstrap';
import { contractABI, contractAddress } from '../contracts/contractInfo';

const Admin = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        capacity: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, capacity } = formData;
        if (!title || !description || !capacity) {
            setMessage("Tous les champs doivent être remplis.");
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            if (!window.ethereum) {
                throw new Error("Ethereum wallet is not connected");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.addTerrain(title, description, Number(capacity));
            await transaction.wait();

            setMessage('Terrain ajouté avec succès.');
            setFormData({ title: '', description: '', capacity: '' });
        } catch (error) {
            console.error("Erreur lors de l'ajout du terrain:", error);
            setMessage(`Échec de l'ajout du terrain: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

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
                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                </Button>
            </form>
            {message && <p>{message}</p>}
            <Footer />
        </div>
    );
};

export default Admin;
