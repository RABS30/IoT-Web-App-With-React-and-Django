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


import SensorConfig from "./hooks/SensorConfig";
import SensorLatestData from "./hooks/SensorLatestData";




export default function Charts(){
    const {sensorConfig, loading} = SensorConfig()
    const latestData  = SensorLatestData()


    if(loading && !latestData){
        return (
            <div>Get data sensor...</div>
        )
    }else{
     return (
        <>
          <div className="p-6">
            <div className="bg-white shadow rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4">Data Real-Time</h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-100 h-auto">
                  {/* === Card Sensor Chart === */}
                  {sensorConfig.map((data) => (
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
                                labels: [data.name, ""],
                                datasets: [
                                  {
                                    data: [latestData?.[data.idDevice] ?? 0, 100 - latestData?.[data.idDevice] ?? 0],
                                    backgroundColor: (latestData?.[data.idDevice] ?? 0) < 70 ? ["#10b981", "#e5e7eb"] : ["#c60000", "#e5e7eb"] 
                                  }
                                ]
                              }}
                              options={{                              
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                    position: "top"
                                    }}
                              }}
                            />
                          )}

                          {/* BAR */}
                          {data.sensor.chart === "bar" && (
                            <Bar
                              data={{
                                labels: [latestData?.[data.idDevice] ?? 0],
                                datasets: [
                                  {
                                    label: data.name,
                                    data: [latestData?.[data.idDevice] ?? 0],
                                    backgroundColor: (latestData?.[data.idDevice] ?? 0) < 50 ? ["#6366f1"] : ["#ce0101"]
                                    
                                  }
                                ]
                              }}
                              options={{
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
                                    max: data.sensor.maxValue
                                    }
                                }
                                }}
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
    }
}