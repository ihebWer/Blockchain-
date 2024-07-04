import { useState } from 'react';
import { ethers } from 'ethers';
import Header from './Header';
import Footer from './Footer';
import '../Style/admin.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contractABI, contractAddress } from '../contracts/NewsContract';

const CreateNews = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, date } = formData;
        if (!title || !content || !date) {
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

            // Convert date to timestamp
            const dateTimestamp = Math.floor(new Date(date).getTime() / 1000);

            const transaction = await contract.addNews(title, content, dateTimestamp);
            await transaction.wait();

            setMessage('News ajoutée avec succès.');
            setFormData({ title: '', content: '', date: '' });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la news:", error);
            setMessage(`Échec de l'ajout de la news: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="unique-form-container1">
            <Header />
            <h2><b>Ajouter une News</b></h2>
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
                            <td><label htmlFor="content"><h3>Contenu</h3></label></td>
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
                            <td><label htmlFor="date"><h3>Date</h3></label></td>
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
                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                </Button>
                <Link to="/admin">
                  <Button className="extraordinary-button" variant="primary">
                    Retour
                  </Button>
                </Link>
            </form>
            {message && <p>{message}</p>}
            <Footer />
        </div>
    );
};

export default CreateNews;
