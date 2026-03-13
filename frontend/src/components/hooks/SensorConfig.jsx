import axios from "axios";
import { useEffect, useState } from "react";

export default function SensorConfig(){
    const [sensorConfig, setSensorConfig] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/device/sensor/")
        .then(response => {
            setSensorConfig(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return {sensorConfig, loading}
}