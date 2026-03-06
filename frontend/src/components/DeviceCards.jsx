import { useEffect, useRef, useState } from "react";

import axios from "axios"; 

export default function DeviceCards() {

  const [devices, setDevices] = useState([])

//   const 

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/device/')
    .then(function (response) {
        // handle success
      setDevices(response.data)
      console.log(response.data)
      })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
  }, [])

  // 🔥 Toggle Power
  const togglePower = (id) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id
          ? { ...device, power: !device.power }
          : device
      )
    );

    // 🔥 Di sini nanti publish MQTT`
    console.log("Publish MQTT control...");
  };

  const buttonClicked = (idDevice, type, status) => {
    axios.post("http://127.0.0.1:8000/device/", {
      idDevice: idDevice,
      type: type,
      status: !status,
    })
    .then((res) => {
      console.log("INi RES DATA : ", res.data) 
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  const getStatusColor = (status) => {
    if (status === true) return "bg-green-500";
    if (status === false) return "bg-red-500";
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
        device.type === "sensor" ?
        // Sensor Cards 
        <div key={device.idDevice} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            {/* Nama dan status color */}
            <div className="flex justify-between items-center mb-4">             
              <h2 className="text-lg font-semibold">
                {device.name}
              </h2>
              <span className={`w-3 h-3 rounded-full ${getStatusColor(device.sensor.status)}`}></span>
            </div>

            {/* Jenis */}
            <p className="text-sm mb-2">
              Jenis :
              <span className="ml-2 font-medium capitalize">
              {device.type}
              </span>
            </p>

            {/* Status */}
            <p className="text-sm mb-2">
              Status:
              <span className="ml-2 font-medium capitalize">
                {device.sensor.status ? "On" : "Off"}
              </span>
            </p>

            {/* Max Value */}
            <p className="text-sm mb-2">
              Nilai maks data :
              <span className="ml-2 font-medium capitalize">
                {device.sensor.maxValue} {device.sensor.measurement}
              </span>
            </p>

            {/* Terakhir dilihat */}
            <p className="text-sm mb-2">
              Batas aman data :
              <span className="ml-2 font-medium capitalize">
                {device.sensor.threshold} {device.sensor.measurement}
              </span>
            </p>
          </div>
            {/* BUTTON AREA */}
            <div className="flex gap-3 mt-6">
              {/* On Off Button */}
              <button  onClick={() => buttonClicked(device.idDevice, device.type, device.sensor.status)}  className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.sensor.status ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                {device.sensor.status ? "Turn OFF" : "Turn ON"}
              </button>
              {/* Edit Button */}
              <button className="flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition">
                Edit
              </button>
            </div>
        </div> 
        : 
        // Actuator Cards
        <div key={device.id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">  
          <div>
            {/* Nama dan status color */}
            <div className="flex justify-between items-center mb-4">             
              <h2 className="text-lg font-semibold">
                {device.name}
              </h2>
              <span className={`w-3 h-3 rounded-full ${getStatusColor(device.actuator.status)}`}></span>
            </div>

            {/* Jenis */}
            <p className="text-sm mb-2">
              Jenis :
              <span className="ml-2 font-medium capitalize">
                {device.type}
              </span>
            </p>

            {/* Status */}
            <p className="text-sm mb-2">
              Status:
              <span className="ml-2 font-medium capitalize">
                {device.actuator.status ?  "On" : "Off"}
              </span>
            </p>

            {/* Aktifasi */}
            <p className="text-sm mb-2">
              Aktifasi Aktuator :
              <span className="ml-2 font-medium capitalize">
                {device.actuator.compararison} {device.actuator.activation}
              </span>
            </p>

            {/* Jenis Aktifasi Aktuator */}
            {device.actuator.activation === "sensor" && <>
              <p className="text-sm mb-4">
                Sensor Target :
                <span className="ml-2 font-medium">
                  {device.actuator.sensorTarget.device} 
                </span>
              </p>
            </>}
          </div>

            {/* BUTTON AREA */}
            <div className="flex gap-3 mt-6">

              {/* On Off Button */}
              <button onClick={() => buttonClicked(device.idDevice, device.type, device.actuator.status)} className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.actuator.status ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                {device.actuator.status ? "Turn OFF": "Turn ON"}
              </button>

              {/* Edit Button */}
              <button
                className="flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Edit
              </button>

            </div>
        </div> 
      ))}
    </div>
  );
}