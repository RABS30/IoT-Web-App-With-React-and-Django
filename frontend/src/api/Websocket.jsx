import { useEffect, useRef } from "react";

export default function Websocket(){

    const socket = useRef(null)

    useEffect(() => {
        // Connect to WebSocket
        socket.current = new WebSocket("ws://127.0.0.1:8000/ws/websocket-server/")

        // Function when websocket connected
        socket.current.onopen = () => {
            console.log("WebSocket Connected")
        }

        // Function when react get data from websocket
        socket.current.onmessage = (e) => {
            console.log(e.data)
        }

        // Function when websocket error
        socket.current.onerror = (err) => {
            console.log("WebSocket Error", err)
        }

        // Function when websocket closed 
        socket.current.onclose = () => {
            console.log("WebSocket Closed")
        }

        // Close Connection when page refresh or move to other page
        return () => {
            if(socket.current && socket.current.readyState === WebSocket.OPEN){
                socket.current.close()
            }
        }

    }, [])
}