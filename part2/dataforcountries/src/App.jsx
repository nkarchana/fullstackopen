import { useState } from "react";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [countryValue, setCountryValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleCountries = (event) => {
    setCountryValue(event.target.value);
    if (!event.target.value) {
      setCountries([]);
      return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const countries = response.data;
        const filteredCountries = countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        );
        setCountries(
          filteredCountries.map((country) => {
            return { ...country, showInd: false };
          })
        );
        if (filteredCountries.length === 1) {
          const [lat, lon] = filteredCountries[0].capitalInfo.latlng;
          const apiKey = import.meta.env.VITE_WEATHER_KEY;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            )
            .then((weatherResponse) => {
              setWeather(weatherResponse.data);
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
            });
        }
      });
  };

  const handleShow = (id) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.cca2 === id ? { ...country, showInd: true } : country
      )
    );
  };

  return (
    <>
      <div>
        find countries <input value={countryValue} onChange={handleCountries} />
      </div>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countries.length > 1 &&
        countries.length <= 10 &&
        countries.map((country) => (
          <div key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={() => handleShow(country.cca2)}>Show</button>
            {country.showInd && <Country country={country} />}
          </div>
        ))}
      {countries.length === 1 && (
        <Country country={countries[0]} showWeatherInd weather={weather} />
      )}
    </>
  );
}

export default App;
