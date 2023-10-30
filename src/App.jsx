import { useState } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    const res = await axios.get(API);

    setLocation(res.data[0]);
  }

  return (
    <>
      <h1>City Explorer!!!</h1>
      <form onSubmit={getLocation}>
        <input onChange={handleChange} required placeholder="Location" />
        <button>Explore!</button>
      </form>

      <h2>Location: {location.display_name}</h2>
      <h3>Latitute: {location.lat}</h3>
      <h3>Longitude: {location.lon}</h3>

      {/* //Display name
    //Latitude
    //Longitude */}
    </>
  );
}

export default App;
