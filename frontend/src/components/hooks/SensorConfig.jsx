import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";

export default function SensorConfig(){
    const [sensorConfig, setSensorConfig] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`device/sensor/`)
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