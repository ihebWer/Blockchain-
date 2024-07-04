import { useState } from 'react';
// import { Link } from 'react-router-dom';

const NewsItem = ({ id, title, date, content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <li>
      <small className="date">{date}</small>
      <h2 className="entry-title">
        {title}
        {expanded && <span> {content}</span>}
        <button onClick={handleToggle} className="read-more-button">
          {expanded ? "Lire moins" : "Lire la suite"}
        </button>
      </h2>
    </li>
  );
};

export default NewsItem;
