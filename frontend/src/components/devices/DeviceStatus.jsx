import axios from "axios";
import { useEffect, useState } from "react";
import ActuatorDevice from "../hooks/ActuatorDevice";

export default function DeviceStatus({ onOffButtonClicked }) {
  const actuator = ActuatorDevice();

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]"></span>
          Aktuator Control Center
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {actuator?.map((device) => (
            <div key={device.idDevice} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col justify-between group hover:border-fuchsia-500/50 transition-all">
              {/* Info Device */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-fuchsia-400 transition-colors">{device.name}</h3>
                  <div className={`w-2 h-2 rounded-full mt-1 ${device.status_actuator ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"}`}></div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-gray-500">Mode</span>
                    <span className="text-gray-200">{device.activation}</span>
                  </div>



<div className="flex justify-between items-start text-[10px] uppercase font-bold tracking-widest pt-2 border-t border-white/5 group/target">
  <span className="text-gray-500">Target</span>
  
  <span 
    title={device.sensorTarget || "Manual"} 
    className="text-blue-400 text-right ml-2 max-w-[80px] leading-tight cursor-help transition-colors hover:text-blue-300
               display-webkit-box overflow-hidden"
    style={{
      display: '-webkit-box',
      WebkitLineClamp: '2',         // Membatasi maksimal 2 baris
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      wordBreak: 'break-word'      // Memastikan kata panjang mau turun ke bawah
    }}
  >
    {device.sensorTarget || "Manual"}
  </span>
</div>





                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-6">
                <button
                  onClick={() => onOffButtonClicked(device.idDevice, 'actuator', device.status_actuator)}
                  className={`w-full py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
                    device.status_actuator 
                      ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white" 
                      : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white"
                  }`}
                >
                  {device.status_actuator ? "Turn Off" : "Turn On"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}