import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table/Table";
import Map from "./components/Map";
import { sortData } from './util';



function App() {
  const baseURL = 'https://disease.sh/v3/covid-19'
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState("worldWide");
  const [ countryInfo, setCountryInfo ] = useState({})
  const [ tableData, setTableData ] = useState([])


  useEffect(() => {
    worldwideData()
    getCountriesData()
  }, [])


  const getCountriesData = async ()=> {
    const data = await fetch(`${baseURL}/countries`)
    const countiresData = await data.json()
    const countries = countiresData.map(country => {
      return (
        {
          name: country.country,
          value: country.countryInfo.iso2,
          flag: country.countryInfo.flag
        }
      )
    })

    setTableData(sortData(countiresData))
    setCountries(countries)
  }

  const worldwideData = async ()=> {
    const res = await fetch(`${baseURL}/all`)
    const data = await res.json()
    setCountryInfo(data)
  }

  const handleCountrySelection = async (e)=> {
    const selectedCountry = e.target.value
    const urlExtention = selectedCountry === 'worldwide' ? 'all' : `countries/${selectedCountry}`
    const data = await fetch(`${baseURL}/${urlExtention}`)
    const countryData = await data.json()


    setCountryInfo(countryData)
    setCountry(selectedCountry)
  }


  return (
    <div className="app">
      
      <div className="app__left">
        <div className="app__header">

          <h1>COVID - 19 TRACKER </h1>
          
          <FormControl className="app__dropdown"> 
            <Select variant='outlined' value={country} onChange={handleCountrySelection}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

        </div>

        <div className="app__stats">
          <InfoBox key={1} title="CornaVirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
          <InfoBox key={2} title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
          <InfoBox key={3} title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
        </div>

        <Map/>
      </div>


      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>



    </div>
  );
}

export default App;