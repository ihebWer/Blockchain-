import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const HEXAMarker = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'red',
        padding: '10px 15px',
        borderRadius: '50px',
        textAlign: 'center'
    }}>
        {text}
    </div>
);

HEXAMarker.propTypes = {
    text: PropTypes.string.isRequired,
};

const MapComponent = () => {
    const defaultProps = {
        center: {
            lat: 48.8049, // Latitude pour Versailles
            lng: 2.1204   // Longitude pour Versailles
        },
        zoom: 14
    };

    return (
        <div style={{ 
          height: '350px',  // Adjusted to match calendar height
          width: '670px',   // Adjusted to match calendar width
          marginTop: '20px',
          marginBottom: '20px',
          display: 'flex', 
          border: '2px solid black',
          borderRadius: '6px'
        }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBMGABu0S0MQj6KotRYeyG_v84UYcxSDcc' }} // Remplacez par votre clé API
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={defaultProps.center}
            >
                <HEXAMarker
                    lat={48.8049} // Latitude pour Versailles
                    lng={2.1204}  // Longitude pour Versailles
                    text="Versailles"
                />
            </GoogleMapReact>
        </div>
    );
}

export default MapComponent;
