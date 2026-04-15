
import axios from "axios";
import { useEffect, useState } from "react";

export default function SensorDevice(){
    // save Sensor device
    const [sensor, setSensor] = useState(null)

    // GET Sensor device from Django
    useEffect(() => {
        axios.get(`/api/device/sensor/`).
        then((response) => {
            setSensor(response.data)
        })
    }, [])
    
    return sensor
}