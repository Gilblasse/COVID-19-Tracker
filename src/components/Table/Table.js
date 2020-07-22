import React from 'react'
import './Table.css'


function Table({countries}) {

    // const sortCountriesByCases = ()=>{
    //     return countries.sort((countryA,countryB) => {
    //         return countryA.cases - countryB.cases
    //     }).reverse()
    // }




    return (
        <div className="table">
            
            {
                countries.map(({country,cases}) =>(
                    <tr>
                        <td>{country}</td>
                        <td><strong>{cases}</strong></td>
                    </tr>
                ))
            }

        </div>
    )
}

export default Table
