import PropTypes from 'prop-types'; // Importation de PropTypes pour vérifier les types des props
import '../Style/starrating.scss'; // Importation des styles spécifiques pour ce composant

// Composant principal StarRating
const StarRating = ({ count, value, onChange, size, color1, color2 }) => {
  const stars = []; // Tableau pour stocker les éléments étoiles

  // Boucle pour créer les éléments étoiles
  for (let i = 1; i <= count; i++) {
    stars.push(
      <span
        key={i} // Clé unique pour chaque élément de la liste
        className={`star ${i <= value ? 'selected' : ''}`} // Classe conditionnelle pour appliquer des styles différents
        style={{ fontSize: size, color: i <= value ? color1 : color2 }} // Style en ligne pour la taille et la couleur des étoiles
        onClick={() => onChange(i)} // Gestionnaire d'événement pour le clic sur une étoile
        onMouseEnter={() => onChange(i)} // Gestionnaire d'événement pour le survol d'une étoile
      >
        &#9733; {/* Symbole Unicode pour une étoile */}
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>; // Rendu des étoiles dans un conteneur div
};

// Définition des types de props avec PropTypes
StarRating.propTypes = {
  count: PropTypes.number.isRequired, // Nombre total d'étoiles
  value: PropTypes.number.isRequired, // Valeur actuelle de la note
  onChange: PropTypes.func.isRequired, // Fonction de rappel pour gérer le changement de la note
  size: PropTypes.number, // Taille des étoiles
  color1: PropTypes.string, // Couleur des étoiles sélectionnées
  color2: PropTypes.string, // Couleur des étoiles non sélectionnées
};

// Valeurs par défaut pour les props
StarRating.defaultProps = {
  size: 24, // Taille par défaut des étoiles
  color1: '#ffd700', // Couleur par défaut des étoiles sélectionnées (doré)
  color2: '#000000', // Couleur par défaut des étoiles non sélectionnées (noir)
};

export default StarRating; // Exportation du composant StarRating
