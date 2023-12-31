import { useState, useEffect } from "react";

const SPREADSHEET_ID = "15LaPp45nyGFhK-do1EpMoSs9pdgy_2bdQzje485Yb-Y";
const RANGE = "A2:G1000";

export default function App() {
  const [data, setData] = useState();


  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.values)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <pre>
      {JSON.stringify(data, null, 4)}
    </pre>
  );
}