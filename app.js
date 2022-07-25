const cityInput = document.querySelector("#cities");
const showCityButton = document.querySelector("#showCityData");
const showCityContainer = document.querySelector("#cityData");

function sceleton(
  stateName,
  stateRepublic,
  stateCurrency,
  stateCurrencySymbol,
  stateSubregion,
  stateLanguage,
  stateArea,
  stateGoogleMap,
  statePopulation,
  stateFlag
) {
  return `
    <div class="cityContainer">
        <h1>State: ${stateName}</h1>
        <h2>Republic: ${stateRepublic}</h2>
        <h2>Subregion: ${stateSubregion}</h2>
        <h2>Language: ${stateLanguage}</h2>
        <img
        src=${stateFlag}
        alt=""
        width="320px"
        height="192px"
      />
        <h3>Population: ${statePopulation} Residents</h3>
        <h3>Area: ${stateArea} m<sup>2</sup></h3>
        <h3>Currency: ${stateCurrency} (${stateCurrencySymbol})</h3>
        <a href=${stateGoogleMap} target="_blank"><button id="map">Google Map</button></a >
    </div>
    `;
}

const citySet = new Set();
const handleApi = () => {
  const city = cityInput.value;
  if (citySet.has(city)) {
    return;
  }
  citySet.add(city);
  fetch(`https://restcountries.com/v3.1/capital/${city}`)
    .then((res) => res.json())
    .then((data) => {
      const [currentData] = data;
      const {
        name,
        subregion,
        languages,
        flags,
        population,
        area,
        currencies,
        maps,
      } = currentData;
      const currencyValues = Object.values(currencies);
      const languageValues = Object.values(languages);
      const { name: stateCurrency, symbol: stateCurrencySymbol } =
        currencyValues[0];
      const { common, official } = name;
      const { png } = flags;
      const { googleMaps } = maps;
      showCityContainer.innerHTML += sceleton(
        common,
        official,
        stateCurrency,
        stateCurrencySymbol,
        subregion,
        languageValues,
        area,
        googleMaps,
        population,
        png
      );
      cityInput.value = "";
    });
};
document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    handleApi();
  }
});
showCityButton.addEventListener("click", handleApi);
