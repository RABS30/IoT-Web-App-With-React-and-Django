import mqtt from "mqtt";
import { useEffect, useState } from "react";

const broker         = "wss://broker.emqx.io:8084/mqtt" 
const frontendTopic  = "monitoring/frontend"

export default function ClientMQTT(){
    // Menyimpan data yang diterima dari MQTT
    const [message, setMessage] = useState(null)

    useEffect(() => {
        // Hubungkan MQTT
        const client = mqtt.connect(broker)

        // Saat terhubung  
        client.on("connect", () => {
            console.log("Connect to MQTT")
            // subscribe topic
            client.subscribe(frontendTopic)
        })

        // Saat menerima pesan 
        client.on("message",  (topic, payload) => {
            // byte to JSON
            let dataString  = payload.toString()
            let dataJSON    = JSON.parse(dataString)
            setMessage(dataJSON)
            console.log("Get message : ", dataString, " from topic : ", topic)
        })

        // Putuskan koneksi saat pindah halaman atau mounting ulang
        return () => {
            client.end()
        }
    
    }, [])


return (
    <>
        <div>
            <h1>MQTT Test</h1>
            <p>Message : {JSON.stringify(message)}</p>
        </div>
    </>
)
}