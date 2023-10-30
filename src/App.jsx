import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState("");
  const [mapImgUrl, setMapImgUrl] = useState("");

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

    //   const MapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=12`;
    //   setMapImgUrl(MapUrl);
    // } else {
    //   setLocation({});
    //   setMapImgUrl("");
    // }

    // const res = await axios.get(API);
    // setLocation(res.data[0]);

    // if (locationData.length > 0) {
    //   const latitude = locationData[0].lat;
    //   const longitude = locationData[0].lon;

    //   const staticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&zoom=12`;

    //   setLocation(locationData[0]);
    //   setMapUrl(staticMapUrl);
    // } else {
    //   setLocation({});
    //   setMapUrl("");
    // }
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

      {mapImgUrl && <img src={mapImgUrl} alt="City Map" />}
    </>
  );
}

export default App;
