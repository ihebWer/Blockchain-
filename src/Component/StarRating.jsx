
import PropTypes from 'prop-types';
import '../Style/starrating.scss';

const StarRating = ({ count, value, onChange, size, color1, color2 }) => {
  const stars = [];

  for (let i = 1; i <= count; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= value ? 'selected' : ''}`}
        style={{ fontSize: size, color: i <= value ? color1 : color2 }}
        onClick={() => onChange(i)}
        onMouseEnter={() => onChange(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

StarRating.propTypes = {
  count: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

StarRating.defaultProps = {
  size: 24,
  color1: '#ffd700',
  color2: '#000000',
};

export default StarRating;
