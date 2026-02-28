import { useState } from "react";

export default function DeviceStatus() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Temperature Sensor",
      status: "online",
      power: true,
      lastSeen: "2026-02-27 10:45:22",
      rssi: -65,
      battery: 78
    },
    {
      id: 2,
      name: "Water Pump",
      status: "offline",
      power: false,
      lastSeen: "2026-02-27 09:12:10",
      rssi: -90,
      battery: 20
    },
    {
      id: 3,
      name: "Water Pump",
      status: "offline",
      power: false,
      lastSeen: "2026-02-27 09:12:10",
      rssi: -90,
      battery: 20
    },
    {
      id: 4,
      name: "Water Pump",
      status: "offline",
      power: false,
      lastSeen: "2026-02-27 09:12:10",
      rssi: -90,
      battery: 20
    },
    {
      id: 5,
      name: "Water Pump",
      status: "offline",
      power: false,
      lastSeen: "2026-02-27 09:12:10",
      rssi: -90,
      battery: 20
    }
  ]);

  // 🔥 Toggle Power
  const togglePower = (id) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id
          ? { ...device, power: !device.power }
          : device
      )
    );

    // 🔥 Di sini nanti publish MQTT
    console.log("Publish MQTT control...");
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-100">
      {devices.map((device) => (
        <div key={device.id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {device.name}
              </h2>

              <span
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  device.status
                )}`}
              ></span>
            </div>

            <p className="text-sm mb-2">
              Status:
              <span className="ml-2 font-medium capitalize">
                {device.status}
              </span>
            </p>

            <p className="text-sm mb-2">
              Last Seen:
              <span className="ml-2 text-gray-500">
                {device.lastSeen}
              </span>
            </p>

            <p className="text-sm mb-4">
              RSSI:
              <span className="ml-2 font-medium">
                {device.rssi} dBm
              </span>
            </p>

            {/* Battery */}
            <div className="mb-4">
              <p className="text-sm mb-1">Battery</p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full ${getBatteryColor(
                    device.battery
                  )}`}
                  style={{ width: `${device.battery}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1">
                {device.battery}%
              </p>
            </div>
          </div>

          {/* 🔥 Power Button */}
          <button
            onClick={() => togglePower(device.id)}
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
            {device.power ? "Turn OFF" : "Turn ON"}
          </button>
        </div>
      ))}
    </div>
  );
}