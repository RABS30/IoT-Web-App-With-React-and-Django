import axios from "axios";
import { useEffect, useState } from "react";

export default function ActuatorDevice(){
    // save actuator device
    const [actuator, setActuator] = useState(null)

    // GET actuator device from Django
    useEffect(() => {
        axios.get(`/api/device/actuator/`).
        then((response) => {
            setActuator(response.data)
        })
    }, [])
    
    return actuator
}