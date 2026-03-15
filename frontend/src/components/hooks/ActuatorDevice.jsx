import axios from "axios";
import { useEffect, useState } from "react";

export default function ActuatorDevice(){
    // save actuator device
    const [actuator, setActuator] = useState(null)

    // GET actuator device from Django
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/device/actuator/').
        then((response) => {
            setActuator(response.data)
        })
    }, [])
    
    return actuator
}