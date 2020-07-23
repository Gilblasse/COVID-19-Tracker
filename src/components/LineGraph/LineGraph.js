import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import {historicalURL} from '../../constants/APIS'



function LineGraph() {
    const [data , setData] = useState({})

    useEffect(() => {
        getHistoricalData()
    }, [])


    const getHistoricalData = async ()=>{
        const res = await fetch(historicalURL)
        const historicalData = await res.json()

        setData(historicalData)
    }

    const buildChartData = ()=>{
        
    }

    console.log('Data: ',data)
    return (
        <div>
            <Line 
            />
        </div>
    )
}

export default LineGraph
