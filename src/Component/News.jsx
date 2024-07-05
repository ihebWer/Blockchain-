import { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React pour gérer l'état et les effets secondaires
import { ethers } from 'ethers'; // Importation de ethers pour interagir avec le réseau Ethereum
import { contractABI, contractAddress } from '../contracts/NewsContract'; // Importation de l'ABI et de l'adresse du contrat NewsContract
import NewsItem from './NewsItem'; // Importation du composant NewsItem pour afficher chaque élément de news

// Composant principal News
const News = () => {
  // Déclaration des états locaux pour stocker les news, l'état de chargement et les erreurs
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation du hook useEffect pour exécuter le fetchNews au montage du composant
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Vérification de la connexion à un portefeuille Ethereum
        if (!window.ethereum) {
          throw new Error("Ethereum wallet is not connected");
        }

        // Initialisation du fournisseur Ethereum à partir de window.ethereum
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Initialisation d'une instance du contrat NewsContract à partir de son ABI et de son adresse
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        // Récupération des news en appelant la fonction getNews du contrat
        const newsArray = await contract.getNews();
        // Mise à jour de l'état news avec les news récupérées
        setNews(newsArray.map((newsItem, index) => ({
          id: index,
          title: newsItem.title,
          content: newsItem.content,
          date: new Date(newsItem.date.toNumber() * 1000).toLocaleDateString()
        })));
      } catch (error) { // Gestion des erreurs
        console.error("Erreur lors de la récupération des news:", error);
        setError(error.message);
      } finally { // Arrêt de l'affichage de chargement
        setLoading(false);
      }
    };

    fetchNews(); // Appel de la fonction fetchNews
  }, []);

  // Affichage conditionnel pendant la récupération des news
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Affichage conditionnel en cas d'erreur
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Rendu du composant
  return (
    <div>
      <ul className="news">
        {/* Itération sur les news et rendu du composant NewsItem pour chaque élément */}
        {news.map(item => (
          <NewsItem
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
          />
        ))}
      </ul>
    </div>
  );
};

export default News; // Exportation du composant News
