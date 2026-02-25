// components/Charts.jsx
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
          LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement,BarElement,Title,Tooltip, Legend);


export default function Charts() {

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    datasets: [
      {
        label: "Sensor 1",
        data: [12, 19, 10, 15, 22, 4, 12, 19, 10, 15, 22, 30],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6"
      }
    ]
  };

  const doughnutData = {
    labels: ["Sensor 1", "Sensor 2", "Sensor 3"],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"]
      }
    ]
  };

  const barData = {
    labels: ["Sensor 1", "Sensor 2", "Sensor 3"],
    datasets: [
      {
        label: "Data",
        data: [15, 25, 18],
        backgroundColor: "#6366f1"
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <Line data={lineData} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <Doughnut data={doughnutData} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <Bar data={barData} />
      </div>
    </div>
  );
}