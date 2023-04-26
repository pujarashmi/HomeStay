import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

    // search the formattedCountries map, and going to find an item which value matched the value which we pass to this function in future
  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;