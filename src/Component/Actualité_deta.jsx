import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { contractABI, contractAddress } from '../contracts/NewsContract';

const Actualité_deta = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("Ethereum wallet is not connected");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const newsItem = await contract.getNewsById(parseInt(id));
        setNews({
          title: newsItem.title,
          content: newsItem.content,
          date: new Date(newsItem.date.toNumber() * 1000).toLocaleDateString()
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!news) {
    return <div>Aucune actualité trouvée.</div>;
  }

  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.content}</p>
      <small className="date">{news.date}</small>
    </div>
  );
};

export default Actualité_deta;
