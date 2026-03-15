
import axios from "axios";
import { useEffect, useState } from "react";

export default function SensorDevice(){
    // save Sensor device
    const [sensor, setSensor] = useState(null)

    // GET Sensor device from Django
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/device/sensor/').
        then((response) => {
            setSensor(response.data)
        })
    }, [])
    
    return sensor
}