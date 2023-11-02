import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [mapImgUrl, setMapImgUrl] = useState("");
  const [weather, setWeather] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getLocation(event) {
    event.preventDefault();

    const API = `https://eu1.locationiq.com/v1/search?q=${search}&key=${API_KEY}&format=json`;

    const res = await fetch(API);
    const data = await res.json();

    if (data.length > 0) {
      const latitude = data[0].lat;
      const longitude = data[0].lon;

      const MapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=12`;

      setLocation(data[0]);
      setMapImgUrl(MapUrl);
    } else {
      setLocation({});
      setMapImgUrl("");
    }

    async function getWeather(tempLocation) {
      const API = `http://localhost:8080/weather?lat=${tempLocation.lat}&lon=${tempLocation.lon}&searchQuery=${search}`;
      const res = await axios.get(API);
      setWeather(res.data);
    }
  }

  function handleNumber(mod) {
    setNumber(number + mod);
  }

  return (
    <>
      <h1>City Explorer!!!</h1>
      <form onSubmit={getLocation} id="mapForm">
        <input
          onChange={handleChange}
          required
          placeholder="Location"
          id="formInput"
        />
        <button id="formButton">Explore!</button>
      </form>

      <h2>Location: {location.display_name}</h2>
      <h3>Latitute: {location.lat}</h3>
      <h3>Longitude: {location.lon}</h3>

      {location.lat && (
        <div>
          <button onClick={() => handleNumber(-1)}>-</button>
          <span>{number}</span>
          <button onClick={() => handleNumber(1)}>+</button>

          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${number}&format=png`}
          />
        </div>
      )}

      {/* {mapImgUrl && <img src={mapImgUrl} alt="City Map" />} */}

      {weather.map((day) => {
        return (
          <p key={day.date}>
            The weather on {day.date} is {day.description}
          </p>
        );
      })}
    </>
  );
}

export default App;
