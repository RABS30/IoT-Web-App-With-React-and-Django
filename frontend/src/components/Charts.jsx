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


const broker         = "wss://broker.emqx.io:8084/mqtt" 
const frontendTopic  = "monitoring/frontend"


export default function Charts() {
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

  // Message from MQTT
  const [message , setMessage] = useState(null)

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




  if(message != null){
    return (
        <>
          <div className="p-6">
            <div className="bg-white shadow rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4">Data Real-Time</h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-100 h-auto">
                  {/* === Card Sensor Chart === */}
                  {message.map((data) => (
                    <>
                      <div key={data.id} className="bg-white p-4 rounded-xl shadow-md aspect-square flex flex-col">
                        {/* === Nama Sensor === */}
                        <h2 className="text-lg font-semibold mb-3">
                          {data.name}
                        </h2>

                        {/* === Wrapper dengan tinggi tetap === */}
                        <div className="h-full w-full">

                          {/* === LINE === */}
                          {data.chart === "line" && (
                            <Line
                              data={{
                                labels: ["Jan"],
                                datasets: [
                                  {
                                    label: data.name,
                                    data: data.data,
                                    borderColor: "#3b82f6",
                                    backgroundColor: "#3b82f6"
                                  }
                                ]
                              }}
                              options={chartOptions}
                            />
                          )}

                          {/* DOUGHNUT */}
                          {data.chart === "doughnut" && (
                            <Doughnut
                              data={{
                                labels: ["Used", ""],
                                datasets: [
                                  {
                                    data: [data.data, 100 - data.data],
                                    backgroundColor: data.data < 70 ? ["#10b981", "#e5e7eb"] : ["#c60000", "#e5e7eb"] 
                                  }
                                ]
                              }}
                              options={chartOptions}
                            />
                          )}

                          {/* BAR */}
                          {data.chart === "bar" && (
                            <Bar
                              data={{
                                labels: [data.name],
                                datasets: [
                                  {
                                    label: "Value",
                                    data: [data.data],
                                    backgroundColor: data.data < 50 ? ["#6366f1"] : ["#ce0101"]
                                    
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
                    </>
                    
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