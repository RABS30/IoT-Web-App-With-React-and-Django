import { useEffect, useRef, useState } from "react";

import axios from "axios"; 

import Toast from "./Toast";

export default function DeviceCards() {
{/* ================= VARIABLE AND STATE ================= */}
  // Data Device
  const [devices, setDevices] = useState([])

  // Rules Filter
  const [filterSearch, setFilterSearch]   = useState({
    type    : "all", 
    status  : "all",
    search  : ""
  })

  // On off Pop up
  const [showAddModal, setShowAddModal]   = useState(false)

  // Turn on/off notification
  const [toast, setToast] = useState(false)

  // Message for notification
  const [messageToast, setMessageToast] = useState({
    type    :"",
    status  :"",
    message :""
  })

  // Data for new device
  const [newDevice, setNewDevice] = useState({
    post  : "new",
    status: true,

    // Device fields
    name: "",
    type: "sensor",

    // sensor fields
    maxValue: "",
    threshold: "",
    measurement: "",
    chart:"",

    // actuator fields
    activation: "manual",
    comparison: ">",
    sensorTarget: "",
    activationValue: 0
  })

{/* ================= GET API FIRST TIME ================= */}
  // GET Data Device first time
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/device/', {
      params: filterSearch
    })
    .then(function (response) {
      triggerToast(true, "success", "Success!!", "Data berhasil diambil")
      // handle success
      setDevices(response.data)
      })
    .catch(function (error) {
        // handle error
        triggerToast(true, "error", `${error.status} ${error.message}`, "Data gagal diambil")
    })
    .finally(function () {
        // always executed
    });
  }, [])

{/* ================= REST API  ================= */}
  // GET = Get data filter and search
  const filterButtonClicked = () => {
    axios.get("http://127.0.0.1:8000/device/", {
      params: filterSearch
    })
    .then((res) => {
      setDevices(res.data)
      setFilterSearch({...filterSearch, search: ""})
    })
    .catch((err) => {
      console.log(err)
    })
  }  

// POST = Turn On/Off status Device
  const onOffButtonClicked = (idDevice, type, status) => {
    axios.post("http://127.0.0.1:8000/device/", {
      post: "statusUpdate",
      idDevice: idDevice,
      type: type,
      status: !status,
    })
    .then((res) => {
      filterButtonClicked()
      triggerToast(true, "success", "Success", "Data berhasil diperbarui")
    })
    .catch((error) => {
      <div id="alert-1" class="flex sm:items-center p-4 mb-4 text-sm text-fg-brand-strong rounded-base bg-brand-softer" role="alert">
        <svg class="w-4 h-4 shrink-0 mt-0.5 md:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
        <span class="sr-only">Info</span>
        <div class="ms-2 text-sm">
          A simple info alert with an <a href="#" class="font-medium underline hover:no-underline">example link</a>. Give it a click if you like.
        </div>
          <button type="button" class="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 focus:ring-brand-medium hover:bg-brand-soft inline-flex items-center justify-center h-8 w-8 shrink-0 shrink-0" data-dismiss-target="#alert-1" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
        </button>
      </div>
      triggerToast(true, "error", `${error.status} ${error.message}`, "Data gagal diperbarui")

    })
  }

  // POST = Create New Device
  const submitNewDevice = () => {
    axios.post("http://127.0.0.1:8000/device/", newDevice).then((res) => {
      triggerToast(true, "success", "Success", "Data berhasil ditambah")

      // GET data filtered
      filterButtonClicked()
      // Show off pop up
      setShowAddModal(false)
      // Reset default data for new Device
      setNewDevice({
        post: "new",
        name: "",
        status: true,
        type: "sensor",
        maxValue: "",
        threshold: "",
        measurement: "",
        activation: "manual",
        comparison: ">",
        sensorTarget: "",
        activationValue: 0
      })

    }).catch((error) => {
      triggerToast(true, "error", `${error.status} ${error.message}`, "Data gagal ditambahkan")

    })
  }

{/* ================= FUNCTION UTILITIES ================= */}
  // Filter = Type
  const typeFilterChange = (e) => {
    setFilterSearch({...filterSearch, type: e.target.value})

  }

  // Filter = Status
  const statusFilterChange = (e) => {
    setFilterSearch({...filterSearch, status: e.target.value})
  }

  // Filter = Search
  const searchFilterChange = (e) => {
    setFilterSearch({...filterSearch, search: e.target.value})
  }
  


  // Change Color on device cards
  const getStatusColor = (status) => {
    if (status === true) return "bg-green-500";
    if (status === false) return "bg-red-500";
    return "bg-yellow-500";
  };

  // Menampilkan Pop Up for add new device
  const showPopUpAddDevice = (show) => {
    setShowAddModal(show)
  }

  // Update data for new device
  const handleFormChange = (e) => {
    const { name, value } = e.target

    setNewDevice({
      ...newDevice,
      [name]: name === "status" ? value === "true" : value
    })
  }


  // Trigger notification
  const triggerToast = (toast, type, status, message) => {
    setMessageToast({
      type    : type,
      status  : status,
      message : message
    })
    setToast(toast)
  }



  return (
    <>
{/* ================= TOAST ALERT ================= */}
      <Toast toast={toast} setToast={setToast} type={messageToast["type"]} status={messageToast["status"]} message={messageToast["message"]}/>


{/* ================= POP UP ADD NEW DEVICE ================= */}
      {showAddModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
        <div className="bg-white w-[420px] rounded-xl shadow-xl p-6" onClick={(e)=>e.stopPropagation()}>
          <h2 className="text-lg font-semibold mb-4">
            Tambah Device
          </h2>

          <form onSubmit={submitNewDevice} className="flex flex-col gap-3">

            {/* DEVICE NAME */}
            <input name="name" value={newDevice.name} onChange={handleFormChange} placeholder="Device Name" className="border rounded p-2"/>
            {/* TYPE */}
            <select name="type" value={newDevice.type} onChange={handleFormChange} className="border rounded p-2">
              <option value="sensor">Sensor</option>
              <option value="actuator">Actuator</option>
            </select>


            {/* ================= SENSOR FORM ================= */}
            {newDevice.type === "sensor" && (
              <>
                <input name="maxValue" type="number"  value={newDevice.maxValue} onChange={handleFormChange} placeholder="Max Value" className="border rounded p-2"/>
                <input name="threshold" type="number"  value={newDevice.threshold} onChange={handleFormChange} placeholder="Threshold" className="border rounded p-2"/>
                <input name="measurement" value={newDevice.measurement} onChange={handleFormChange} placeholder="Measurement (°C / % / cm)" className="border rounded p-2"/>
                <select name="status" value={newDevice.status} onChange={handleFormChange} className="border rounded p-2">
                  <option value="true">On</option>
                  <option value="false">Off</option>
                </select>
                <select name="chart" value={newDevice.chart} onChange={handleFormChange} className="border rounded p-2">
                  <option value="line">Line Chart</option>
                  <option value="doughnut">Doughnut Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>
              </>
            )}

            {/* ================= ACTUATOR FORM ================= */}
            {newDevice.type === "actuator" && (
              <>
                <select name="activation" value={newDevice.activation} onChange={handleFormChange} className="border rounded p-2" >
                  <option value="manual">Manual</option>
                  <option value="sensor">Sensor</option>
                </select>

                <input name="activationValue" type="number"  value={newDevice.activationValue} onChange={handleFormChange} placeholder="Max Value" className="border rounded p-2"/>

                <select name="comparison" value={newDevice.comparison} onChange={handleFormChange} className="border rounded p-2">
                  <option value=">=">Greater Than</option>
                  <option value="<=">Less Than</option>
                  <option value="==">Equal Than</option>
                </select>

                <select name="status" value={newDevice.status} onChange={handleFormChange} className="border rounded p-2">
                  <option value="true">On</option>
                  <option value="false">Off</option>
                </select>



                <select name="sensorTarget" value={newDevice.sensorTarget} onChange={handleFormChange} className="border rounded p-2">
                  <option>-----</option>
                  {devices.map((device) => (
                    device.type === "sensor" ? <option key={device.idDevice} value={device.idDevice}>{device.name} : {device.idDevice}</option> : <></>
                    ))}
                </select>
              </>

            )}

            {/* ================= BUTTON ================= */}
            <div className="flex justify-end gap-2 mt-4">

              <button type="button" onClick={()=>setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>

              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
                Save Device
              </button>
            </div>
          </form>

        </div>

      </div>
      )}


{/* ================= SEARCH BAR, AND FILTER ================= */}
      <div className="p-6">
        {/* Filter and Search */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
    
        {/* Filter */}
        <div className="flex items-center gap-3">
          {/* Filter : Type */}
          <select onChange={typeFilterChange} value={filterSearch["type"]} className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="all">All Type</option>
            <option value="sensor">Sensor</option>
            <option value="actuator">Actuator</option>
          </select>

          {/* Filter : Status */}
          <select onChange={statusFilterChange} value={filterSearch["filter"]} className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="all">All Status</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>

          {/* Button untuk tambah device baru */}
          <button onClick={showPopUpAddDevice} className="px-4 py-2 rounded-lg border text-white bg-green-600 hover:bg-green-700 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          Tambah device baru
          </button>
        </div>

        <div className="relative">
          {/* Search bar */}
          <input onChange={searchFilterChange} type="text" value={filterSearch["search"]} placeholder="Search device..." className="pl-10 pr-24 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
          {/* Search icon */}
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/>
          </svg>
          {/* Search and apply filter button */}
          <button type="button" onClick={filterButtonClicked} className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-xs px-3 py-1.5">
            Apply & Search
          </button>
        </div>
      </div>

        

{/* ================= DEVICE LIST ================= */}
        <div className="grid grid-cols-1 rounded-2xl  md:grid-cols-5 gap-6 p-6 bg-gray-100">   
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
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(device.status_sensor)}`}></span>
                </div>

                {/* ID */}
                <p className="text-sm mb-2">
                  Device ID :
                  <span className="ml-2 font-medium capitalize">
                  {device.idDevice}
                  </span>
                </p>

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
                    {device.status_sensor ? "On" : "Off"}
                  </span>
                </p>

                {/* Max Value */}
                <p className="text-sm mb-2">
                  Nilai maks data :
                  <span className="ml-2 font-medium capitalize">
                    {device.maxValue} {device.measurement}
                  </span>
                </p>

                {/* Terakhir dilihat */}
                <p className="text-sm mb-2">
                  Batas aman data :
                  <span className="ml-2 font-medium capitalize">
                    {device.threshold} {device.measurement}
                  </span>
                </p>

                {/*  Chart Type */}
                <p className="text-sm mb-2">
                  Chart :
                  <span className="ml-2 font-medium capitalize">
                    {device.chart} Chart
                  </span>
                </p>
              </div>
                {/* BUTTON AREA */}
                <div className="flex gap-3 mt-6">
                  {/* On Off Button */}
                  <button  onClick={() => onOffButtonClicked(device.idDevice, device.type, device.status_sensor)}  className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.status_sensor ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                    {device.status_sensor ? "Turn OFF" : "Turn ON"}
                  </button>
                  {/* Edit Button */}
                  <button className="flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition">
                    Edit
                  </button>
                </div>
            </div> 
            : 
            // Actuator Cards
            <div key={device.idDevice} className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">  
              <div>
                {/* Nama dan status color */}
                <div className="flex justify-between items-center mb-4">             
                  <h2 className="text-lg font-semibold">
                    {device.name}
                  </h2>
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(device.status_actuator)}`}></span>
                </div>

                {/* ID */}
                <p className="text-sm mb-2">
                  Device ID :
                  <span className="ml-2 font-medium capitalize">
                  {device.idDevice}
                  </span>
                </p>

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
                    {device.status_actuator ?  "On" : "Off"}
                  </span>
                </p>

                {/* Aktifasi */}
                <p className="text-sm mb-2">
                  Aktifasi Aktuator :
                  <span className="ml-2 font-medium capitalize">
                    {device.compararison} {device.activation}
                  </span>
                </p>

                {/* Jenis Aktifasi Aktuator */}
                {device.activation === "sensor" && <>
                  <p className="text-sm mb-4">
                    Sensor Target :
                    <span className="ml-2 font-medium">
                      {device.sensorTarget.device} 
                    </span>
                  </p>
                </>}
              </div>

                {/* BUTTON AREA */}
                <div className="flex gap-3 mt-6">
                  {/* On Off Button */}
                  <button onClick={() => onOffButtonClicked(device.idDevice, device.type, device.status_actuator)} className={`flex-1 py-2 rounded-lg text-sm font-semibold text-white transition ${device.status_actuator ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                    {device.status_actuator ? "Turn OFF": "Turn ON"}
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
      </div>
    </>
  
  );
}