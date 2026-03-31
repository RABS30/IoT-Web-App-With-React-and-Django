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
  Legend,
  Filler
} from "chart.js";
import { useRef, useState, useEffect } from "react";
import SensorConfig from "../components/hooks/SensorConfig";
import SensorLatestData from "../components/hooks/SensorLatestData";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
);

export default function Charts() {
  const { sensorConfig, loading } = SensorConfig();
  const latestData = SensorLatestData();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollAmount = 300; // Ukuran scroll disesuaikan dengan card yang lebih kecil

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, [sensorConfig]);

  if (loading && !latestData) {
    return <div className="text-indigo-400 p-6 animate-pulse font-medium text-center">Retrieving sensor intelligence...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></span>
          Data Sensor Real-Time
        </h2>

        <div className="relative group">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-indigo-600/90 text-white shadow-lg hover:bg-indigo-500 ${!canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {"<"}
          </button>
          <button 
            onClick={() => scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-indigo-600/90 text-white shadow-lg hover:bg-indigo-500 ${!canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {">"}
          </button>

          <div ref={scrollRef} className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory py-2">
            {sensorConfig.map((data) => {
              const value = Number(latestData?.[data.idDevice] ?? 0);
              const maxVal = data.maxValue || 100;
              const isAlert = value > (data.threshold || 80);

              const commonScales = {
                y: {
                  beginAtZero: true,
                  max: maxVal,
                  grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
                  ticks: { color: "#94a3b8", font: { size: 9 }, stepSize: maxVal / 4 }
                },
                x: {
                  grid: { display: false },
                  ticks: { display: false }
                }
              };

              return (
                <div key={data.idDevice} className="bg-white/5 border border-white/10 p-5 rounded-xl min-w-[75vw] sm:min-w-[40vw] md:min-w-[30vw] lg:min-w-[20vw] aspect-square flex flex-col snap-start hover:border-indigo-500/50 transition-all group/card">
                  
                  {/* Header Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-[11px] font-black text-white uppercase tracking-wider leading-tight">
                        {data.name}
                      </h3>
                      <span className="text-[9px] text-indigo-300/60 font-mono mt-0.5">
                        {data.idDevice}
                      </span>
                    </div>
                    <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${isAlert ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                       {value} {data.measurement}
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="flex-1 flex items-center justify-center relative w-full h-full overflow-hidden">
                    {data.chart === "line" && (
                      <Line
                        data={{
                          labels: ["", "", "", "", ""],
                          datasets: [{
                            data: [value - 1.5, value + 0.8, value - 0.5, value + 1.2, value],
                            borderColor: isAlert ? "#f43f5e" : "#6366f1",
                            backgroundColor: "rgba(99, 102, 241, 0.05)",
                            fill: true,
                            tension: 0.4,
                            pointRadius: 2,
                            borderWidth: 2
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: commonScales
                        }}
                      />
                    )}

                    {data.chart === "doughnut" && (
                      <div className="relative w-full h-full p-1">
                        <Doughnut
                          data={{
                            datasets: [{
                              data: [value, Math.max(0, maxVal - value)],
                              backgroundColor: isAlert ? ["#f43f5e", "rgba(255,255,255,0.03)"] : ["#10b981", "rgba(255,255,255,0.03)"],
                              borderWidth: 0,
                              cutout: "78%"
                            }]
                          }}
                          options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-black text-white leading-none">{value}</span>
                          <span className="text-[8px] text-gray-500 font-bold uppercase mt-1">{data.measurement}</span>
                        </div>
                      </div>
                    )}

                    {data.chart === "bar" && (
                      <Bar
                        data={{
                          labels: ["DATA"],
                          datasets: [{
                            data: [value],
                            backgroundColor: isAlert ? "#f43f5e" : "#6366f1",
                            borderRadius: 6,
                            barPercentage: 0.6, // Membuat bar lebih lebar mengisi ruang
                            categoryPercentage: 1.0
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: commonScales
                        }}
                      />
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="py-2 text-[9px] font-bold uppercase rounded-lg text-gray-400 bg-white/5 border border-white/5 hover:bg-white/10 transition-all">Details</button>
                    <button className="py-2 text-[9px] font-bold uppercase rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all">Edit</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}