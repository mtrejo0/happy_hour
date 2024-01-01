import React, { useRef, useState } from 'react';
import GoogleMap from 'google-maps-react-markers';


const Marker = ({ name }) => (
    <div style={{
      color: 'white', 
      background: 'black',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transform: 'translate(-50%, -50%)'
    }}>
      {name}
    </div>
  );

const MapView = ({data}) => {
    console.log(data)
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  
  const mapOptions = {
    // Add any specific options you want for the map
  };

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId);
    mapRef.current.setCenter({ lat, lng });
  };

  return (
    <>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Use your API key here
        defaultCenter={{ lat: 32.78407, lng: -96.78555 }}
        defaultZoom={11}
        options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
        {data?.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            name={name}
            onClick={onMarkerClick}
          />
        ))}
      </GoogleMap>
    </>
  );
};


export default MapView