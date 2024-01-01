export default function ListView({ data }) {
    // Render the data in a list format
    return (
      <div>
        {data?.map(each => {
            return <div>
                <RestaurantInfo info={each}/>
            </div>
        })}
      </div>
    );
  }

const RestaurantInfo = ({ info }) => {
    return (
      <div style={{ margin: '20px', padding: '10px', paddingBottom: '24px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>{info.name}</h2>
        <p><strong>Address:</strong> {info.address}</p>
        <p><strong>Deal:</strong> {info.deal}</p>
        <p><strong>Coordinates:</strong> Latitude: {info.lat}, Longitude: {info.lng}</p>
        <a href={info.website} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
          Visit Website
        </a>
      </div>
    );
  };