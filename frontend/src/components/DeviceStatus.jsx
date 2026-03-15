import axios from "axios";
import { useEffect, useState } from "react";
import ActuatorDevice from "./hooks/ActuatorDevice";


export default function DeviceStatus() {
  // Get actuator device
  const actuator = ActuatorDevice()

  // 🔥 Toggle Power
  const togglePower = (id) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.idDevice === id ? { ...device, status_actuator: !device.status_actuator } : device
      )
    );
  };

  const getStatusColor = (status) => {
    if (status === "online") return "bg-green-500";
    if (status === "offline") return "bg-red-500";
    return "bg-yellow-500";
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return "bg-green-500";
    if (battery > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
  <div className="p-3 sm:p-4 md:p-6">
    <div className="bg-white shadow rounded-xl p-3 sm:p-4">
      <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-4">
        Aktuator 
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-100">
        {actuator?.map((device) => (
          <div key={device.idDevice} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {device.name}
                </h2>

                <span
                  className={`w-3 h-3 rounded-full ${getStatusColor(
                    device.status_actuator
                  )}`}
                ></span>
              </div>

              <p className="text-sm mb-2">
                Status:
                <span className="ml-2 font-medium capitalize">
                  {device.status_actuator ? 'On' : 'Off'} 
                </span>
              </p>

              <p className="text-sm mb-4">
                Aktivasi Actuator:
                <span className="ml-2 font-medium">
                  { device.activation === "manual" ? "Manual" : "Sensor"} 
                </span>
              </p>

              <p className="text-sm mb-4">
                Last Active:
                <span className="ml-2 font-medium">
                  { device.last_activation ? device.last_activation : "Not Active"} 
                </span>
              </p>

              <p className="text-sm mb-4">
                Sensor Target :
                <span className="ml-2 font-medium">
                  { device.activation === "manual" ? "Manual" : `${device.sensorTarget} ${device.id_sensor}`} 
                </span>
              </p>
            </div>

            {/* 🔥 Power Button */}
            <button
              onClick={() => togglePower(device.idDevice)}
              disabled={device.status === "offline"}
              className={`mt-4 py-2 rounded-xl font-semibold text-white transition ${
                device.power
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-500 hover:bg-gray-600"
              } ${
                device.status === "offline" &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {device.status_actuator ? "Turn OFF" : "Turn ON"}
            </button>
          </div>
        ))}
      </div>
      
    </div>
  </div>
  );
}