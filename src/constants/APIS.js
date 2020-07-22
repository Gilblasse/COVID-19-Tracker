const baseURL = 'https://disease.sh/v3/covid-19'
const historicalURL = `${baseURL}/historical/all?lastdays=120`
const countriesURL = `${baseURL}/countries`
const countryURL = country => `${baseURL}/countries/${country}`
const worldWideURL = `${baseURL}/all`


export{
    baseURL,
    historicalURL,
    countriesURL,
    countryURL,
    worldWideURL
}