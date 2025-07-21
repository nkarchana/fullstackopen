const Country = ({ country, showWeatherInd, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>{`Capital ${country.capital[0]}`}</div>
      <div>{`Area ${country.area}`}</div>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png} />
      {showWeatherInd && weather && (
        <>
          <h2>{`Weather in ${country.capital[0]}`}</h2>
          <div>{`Temperature ${weather.main.temp} Celsius`}</div>
          <img
            alt={weather.weather[0].description}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>{`Wind ${weather.wind.speed} m/s`}</div>
        </>
      )}
    </div>
  );
};

export default Country;
