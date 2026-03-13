import { useEffect, useRef, useState } from 'react';

export default function SensorLatestData(){
    // Reference WebSocket object
    const socket = useRef(null)

    // Latest Sensor Data
    const [latestData, setLatestData] = useState(null)

    useEffect(() => {
        // Connect to Websocket
        socket.current  = new WebSocket('ws://127.0.0.1:8000/ws/websocket-server/')

        // When connected to WebSocket 
        socket.current.onopen = (e) => {
            console.log('Connected to Websocket')
        }

        // When get message from websocket
        socket.current.onmessage = (e) => {
            const message = JSON.parse(e.data)

            if (message.type === 'latest_data'){
                setLatestData(message.data)
            }
        }

        // When get error from websocket
        socket.current.onerror = (error) => {
            console.log('Websocket error', error)
        }

        // When unconnected from websocket
        socket.current.onclose = () => {
            console.log('Websocket Closed')
        }


        return () => {
            if(socket.current && socket.current.readyState === WebSocket.OPEN){
                socket.current.close()
            }
        }
    }, [])

    return latestData
}