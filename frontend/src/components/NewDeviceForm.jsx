import { useState } from "react"


export default function NewDeviceForm(){
    
// ===== VARIABLE AND DATA =====
    // default data for new device
    const [newDevice, setNewDevice] = useState({
        post: "new",
        status: true,
    
        name: "",
        type: "sensor",
    
        // sensor fields
        maxValue: "",
        threshold: "",
        measurement: "",
        chart:"",
    
        // actuator fields
        activation: "manual",
        comparison: ">",
        sensorTarget: "",
        activationValue: 0
    })
      
    

}


