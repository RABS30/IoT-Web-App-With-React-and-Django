// components/SummaryChart.jsx
import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function SummaryChart() {
  const [period, setPeriod] = useState("24jam");

  const generateData = () => {
    let labels = [];
    let values = [];

    if (period === "24jam") {
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    } else if (period === "harian") {
      labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    } else if (period === "bulanan") {
      labels = Array.from({ length: 30 }, (_, i) => `Tgl ${i+1}`);
    } else {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }

    values = labels.map(() => Math.floor(Math.random() * 100));

    return {
      labels,
      datasets: [
        {
          label: `Rangkuman ${period}`,
          data: values,
          borderColor: "#ef4444"
        }
      ]
    };
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Rangkuman Sensor
          </h2>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="24jam">24 Jam</option>
            <option value="harian">Harian</option>
            <option value="bulanan">Bulanan</option>
            <option value="tahunan">Tahunan</option>
          </select>
        </div>

        <Line data={generateData()} />
      </div>
    </div>
  );
}