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
import { useRef, useState, useEffect } from "react";


export default function Charts(){
    // ===== DATA SENSOR ===== 
    const {sensorConfig, loading} = SensorConfig()
    const latestData  = SensorLatestData()

    // ===== SCROLL HORIZONTAL SETUP =====
    const scrollRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(true)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const scrollAmount = 350
    const checkScroll = () => {
      const el = scrollRef.current
      if(!el) return

      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5)
    }
    const scrollLeft = () => {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      })
    }
    const scrollRight = () => {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      })
    }
    useEffect(()=>{
      const el = scrollRef.current
      if(!el) return

      checkScroll()

      el.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)

      return ()=>{
        el.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    },[])

    // ===== HTML COMPONENT =====
    if(loading && !latestData){
      return (
          <div>Get data sensor...</div>
      )
    }else{
      return (
      <>
        <div className="p-3 sm:p-4 md:p-6">
          <div className="bg-white shadow rounded-xl p-3 sm:p-4">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
              Data Sensor Real-Time
            </h2>

            <div className="relative">

              {/* BUTTON LEFT */}
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 
                w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow flex items-center justify-center
                ${canScrollLeft ? "bg-white hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"}`}
              >
                {"<"}
              </button>

              {/* BUTTON RIGHT */}
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 
                w-7 h-7 sm:w-9 sm:h-9 rounded-full shadow flex items-center justify-center
                ${canScrollRight ? "bg-white hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"}`}
              >
                {">"}
              </button>

              {/* SCROLL CONTAINER */}
              <div
                ref={scrollRef}
                className="
                flex gap-3 sm:gap-4 md:gap-6
                p-2 sm:p-3 md:p-4
                bg-gray-100
                overflow-x-auto
                scroll-smooth
                scrollbar-hide
                snap-x snap-mandatory
                touch-pan-x
                "
              >

                {sensorConfig.map((data) => {
                  const value = Number(latestData?.[data.idDevice] ?? 0)

                  return (
                    <div
                      key={data.idDevice}
                      className="
                      bg-white
                      p-2 sm:p-3
                      rounded-xl
                      shadow
                      min-w-[45vw] sm:min-w-[30vw] md:min-w-[23vw] lg:min-w-[18vw]
                      aspect-square
                      flex flex-col
                      flex-shrink-0
                      snap-start
                      "
                    >

                      {/* SENSOR TITLE */}
                      <h2 className="text-xs sm:text-sm md:text-base font-semibold mb-2">
                        {data.name}
                      </h2>

                      <div className="h-full w-full flex items-center justify-center">

                        {/* LINE */}
                        {data.chart === "line" && (
                          <Line
                            data={{
                              labels: ["Now"],
                              datasets: [
                                {
                                  label: data.name,
                                  data: [value],
                                  borderColor: "#3b82f6",
                                  backgroundColor: "#3b82f6"
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false
                            }}
                          />
                        )}

                        {/* DOUGHNUT */}
                        {data.chart === "doughnut" && (
                          <Doughnut
                            data={{
                              labels: [data.name, "difference"],
                              datasets: [
                                {
                                  data: [value, data.maxValue - value],
                                  backgroundColor:
                                    value < 70
                                      ? ["#10b981", "#e5e7eb"]
                                      : ["#c60000", "#e5e7eb"]
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: { position: "top" }
                              }
                            }}
                          />
                        )}

                        {/* BAR */}
                        {data.chart === "bar" && (
                          <Bar
                            data={{
                              labels: [value],
                              datasets: [
                                {
                                  label: data.name,
                                  data: [value],
                                  backgroundColor:
                                    value < 50 ? "#6366f1" : "#ce0101"
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: { position: "top" }
                              },
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  max: data.maxValue
                                }
                              }
                            }}
                          />
                        )}

                      </div>

                      {/* ACTION BUTTON */}
                      <div className="mt-2 flex flex-col gap-2">

                        <button
                          onClick={() => togglePower(data.id)}
                          disabled={data.status === "offline"}
                          className="py-1.5 text-xs sm:text-sm rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700"
                        >
                          Turn ON
                        </button>

                        <button
                          onClick={() => togglePower(data.id)}
                          disabled={data.status === "offline"}
                          className="py-1.5 text-xs sm:text-sm rounded-lg font-semibold text-white bg-gray-500 hover:bg-gray-600"
                        >
                          Edit
                        </button>

                      </div>

                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
      </>
      );   
    
    }
}