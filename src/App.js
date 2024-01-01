import { useState, useEffect } from "react";
import ListView from "./components/ListView";
import MapView from "./components/MapView";

const RANGE = "A1:G1000";

export default function App() {
  const [data, setData] = useState();
  const [activeTab, setActiveTab] = useState('map'); 

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values/${RANGE}?key=${process.env.REACT_APP_API_KEY}`
    )
    .then((response) => response.json())
    .then((result) => {
      if (result.values && result.values.length > 0) {
        const keys = result.values[0];
        const transformedData = result.values.slice(1).map(row => {
          const obj = {};
          keys.forEach((key, index) => {
            obj[key] = row[index];
          });
          return obj;
        });
        setData(transformedData);
      }
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Find Happy Hour Deals!</h1>
      <button onClick={() => setActiveTab('map')}>Map View</button>
      <button onClick={() => setActiveTab('list')}>List View</button>
      <button onClick={() => setActiveTab('add')}>Add Happy Hours!</button>
      <div style={{marginTop: "16px"}}></div>

      {activeTab === 'list' && (
        <ListView data={data} />
      )}

      {activeTab === 'map' && (
        <MapView data={data} />
      )}

      {activeTab === 'add' && (
        <div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScqs9dI6Z55EyHo6qbTqKv60GbojVEevVc0CHDDgARcw-wr1w/viewform?embedded=true"
          width="640"
          height="922"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >Loading…</iframe>
        </div>
      )}
    </div>
  );
}



