import React, { useRef, useState } from 'react';
import GoogleMap from 'google-maps-react-markers';


const Marker = ({ name }) => (
    <div style={{
        position: 'relative',
        color: 'white',
        background: 'black',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        textWrap: "nowrap",
        justifyContent: 'center',
        borderRadius: '4px',
        transform: 'translate(0%, -120%)' // Adjusted to align the bottom of the div with the marker location
      }}>
        {name}
        <div style={{
          position: 'absolute',
          bottom: '-10px', // Adjust the position as needed
          left: '0',
          width: '0',
          height: '0',
          borderStyle: 'solid',
          borderWidth: '10px 10px 0 0', // Adjust to change the size of the triangular point
          borderColor: 'black transparent transparent transparent', // The first color is the color of the triangle
        }} />
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