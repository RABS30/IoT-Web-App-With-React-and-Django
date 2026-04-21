import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../api/AxiosConfig";

export default function ActuatorDevice(){
    // save actuator device
    const [actuator, setActuator] = useState(null)

    // GET actuator device from Django
    useEffect(() => {
        api.get(`device/actuator/`).
        then((response) => {
            setActuator(response.data)
        })
    }, [])
    
    return actuator
}