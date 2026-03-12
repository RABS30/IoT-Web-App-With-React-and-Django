// React Components 
import { useState, useEffect } from "react";
// Charts Components
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
// MQTT Client
import mqtt from "mqtt";
import axios from "axios";

// Configuration Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function Charts() {
  
// ===== Variable and Data =====
  // MQTT Variable 
  const broker         = "wss://broker.emqx.io:8084/mqtt" 
  const frontendTopic  = "monitoring/frontend"  
  // Device List
  const [Device , setDevice] = useState(
      [
        
        
        
        
{
  actuator: null,
  id: 1,
  idDevice: "KC5D1TK2O8",
  name: "Sensor Suhu",
  sensor : {
    chart: "doughnut",
    device: "Sensor Suhu",
    id: 1,
    maxValue: 100,
    measurement: "Celcius",
    status: true ,
    threshold: 50,
    type : "sensor"}}
      ]
  )

  // Message from MQTT
  // const [message , setMessage] = useState(
  //     [
  //         {
  //             "id"   : "1",
  //             "name" : "Sensor 1",
  //             "data" : 50,
  //             "chart": "doughnut"
  //         },
  //         {
  //             "id"   : "2",
  //             "name" : "Sensor 2",
  //             "data" : 50,
  //             "chart": "bar"
  //         },
  //         {
  //             "id"   : "3",
  //             "name" : "Sensor 3",
  //             "data" : 50,
  //             "chart": "bar"
  //         },
  //         {
  //             "id"   : "4",
  //             "name" : "Sensor 1",
  //             "data" : 50,
  //             "chart": "doughnut"
  //         },
  //         {
  //             "id"   : "5",
  //             "name" : "Sensor 2",
  //             "data" : 50,
  //             "chart": "bar"
  //         }

  //     ]
  // )

  
// ===== REST API =====
  // GET = > Get data device from Django
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/device/sensor/")
    .then((response) => {
      setDevice(response.data)
      console.log(response.data)
    })
    .catch((response) => {
      console.log("error : ", response)
    })
  },[])


// ===== Chart Settings =====
  // Doughnut Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  // Bar Options
  const barChartsOption = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }

  
  // Connect to MQTT
  useEffect(() => {
    // Hubungkan MQTT
    const client = mqtt.connect(broker)
  
    client.on("connect", () => {
      console.log("Connect to MQTT...")
      client.subscribe(frontendTopic)
    })

    // Saat menerima message
    client.on("message",  (topic, payload) => {
            // byte to JSON
            let dataString  = payload.toString()
            let dataJSON    = JSON.parse(dataString)
            setMessage(dataJSON)
            console.log("message masuk : ", dataString, " from topic : ", topic)
        })
    
    

    // Putuskan koneksi saat pindah halaman atau mounting ulang
    return () => {
        client.end()
    }
  
  }, [])



// ===== HTML Components =====
  if(Device != null){
    return (
        <>
          <div className="p-6">
            <div className="bg-white shadow rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4">Data Real-Time</h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-100 h-auto">
                  {/* === Card Sensor Chart === */}
                  {Device.map((data) => (
                      <div key={data.id} className="bg-white p-4 rounded-xl shadow-md aspect-square flex flex-col">
                        {/* === Nama Sensor === */}
                        <h2 className="text-lg font-semibold mb-3">
                          {data.name}
                        </h2>

                        {/* === Wrapper dengan tinggi tetap === */}
                        <div className="h-full w-full">

                          {/* === LINE === */}
                          {data.sensor.chart === "line" && (
                            <Line
                              data={{
                                labels: ["Jan"],
                                datasets: [
                                  {
                                    label: data.name,
                                    data: [50, 100],
                                    borderColor: "#3b82f6",
                                    backgroundColor: "#3b82f6"
                                  }
                                ]
                              }}
                              options={chartOptions}
                            />
                          )}

                          {/* DOUGHNUT */}
                          {data.sensor.chart === "doughnut" && (
                            <Doughnut
                              data={{
                                labels: [50, ""],
                                datasets: [
                                  {
                                    data: [50, 100 - 50],
                                    backgroundColor: data.data < 70 ? ["#10b981", "#e5e7eb"] : ["#c60000", "#e5e7eb"] 
                                  }
                                ]
                              }}
                              options={chartOptions}
                            />
                          )}

                          {/* BAR */}
                          {data.sensor.chart === "bar" && (
                            <Bar
                              data={{
                                labels: [50],
                                datasets: [
                                  {
                                    label: data.name,
                                    data: [50],
                                    backgroundColor: 50 < 50 ? ["#6366f1"] : ["#ce0101"]
                                    
                                  }
                                ]
                              }}
                              options={barChartsOption}
                            />
                          )}

                        </div>        
                      
                        <div key={data.id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
                          <button
                            onClick={() => togglePower(data.id)}
                            disabled={data.status === "offline"}
                            className={`mt-4 py-2 rounded-xl font-semibold text-white transition bg-green-600 hover:bg-green-700`}>
                            Turn ON
                          </button>

                          <button
                            onClick={() => togglePower(data.id)}
                            disabled={data.status === "offline"}
                            className={`mt-4 py-2 rounded-xl font-semibold text-white transition bg-gray-500 hover:bg-gray-600`}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                  ))}

              </div>
              
              </div>
          </div>
        </>
      );
  }else{
    <h1>Loading.....</h1>
  }
  
}