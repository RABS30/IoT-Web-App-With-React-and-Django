
import axios from "axios";
import { useEffect, useState } from "react";

export default function SensorDevice(){
    // save Sensor device
    const [sensor, setSensor] = useState(null)

    // GET Sensor device from Django
    useEffect(() => {
        const sensor = async () => {
            try {
                const response = await axios.get(`/api/device/sensor/`);
                setSensor(response.data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };
        sensor();
    }, [])
    
    return sensor
}