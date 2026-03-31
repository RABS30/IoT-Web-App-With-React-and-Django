import { useState } from "react";
import { Line } from "react-chartjs-2";

export default function SummaryChart() {
  const [period, setPeriod] = useState("24jam");

  const generateData = () => {
    // Logika data Anda tetap di sini
    let labels = period === "24jam" ? Array.from({ length: 12 }, (_, i) => `${i*2}:00`) : ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    let values = labels.map(() => Math.floor(Math.random() * 100));

    return {
      labels,
      datasets: [
        {
          label: `Rangkuman ${period}`,
          data: values,
          borderColor: "#6366f1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          fill: true,
          pointBackgroundColor: "#fff",
          tension: 0.4
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
      x: { grid: { display: false }, ticks: { color: "#64748b" } }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
          System Intelligence Summary
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                  Metric Analytics {item}
                </h3>
                <select 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)} 
                  className="bg-gray-900/50 text-gray-300 text-[10px] font-bold uppercase border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="24jam">24 Hours</option>
                  <option value="harian">Weekly</option>
                  <option value="bulanan">Monthly</option>
                </select>
              </div>

              <div className="h-[180px] w-full">
                <Line data={generateData()} options={chartOptions} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}