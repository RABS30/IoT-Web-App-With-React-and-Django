// components/RealTimeTable.jsx
import { useEffect, useState } from "react";

export default function RealTimeTable() {
  const [data, setData] = useState({
    sensor1: 0,
    sensor2: 0,
    sensor3: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        sensor1: Math.floor(Math.random() * 100),
        sensor2: Math.floor(Math.random() * 100),
        sensor3: Math.floor(Math.random() * 100)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Data Real-Time</h2>

        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 border">Sensor 1</th>
              <th className="p-2 border">Sensor 2</th>
              <th className="p-2 border">Sensor 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">{data.sensor1}</td>
              <td className="p-2 border">{data.sensor2}</td>
              <td className="p-2 border">{data.sensor3}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}