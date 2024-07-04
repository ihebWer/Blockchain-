import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../contracts/NewsContract';
import NewsItem from './NewsItem';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("Ethereum wallet is not connected");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const newsArray = await contract.getNews();
        setNews(newsArray.map((newsItem, index) => ({
          id: index,
          title: newsItem.title,
          content: newsItem.content,
          date: new Date(newsItem.date.toNumber() * 1000).toLocaleDateString()
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération des news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      <ul className="news">
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

export default News;
