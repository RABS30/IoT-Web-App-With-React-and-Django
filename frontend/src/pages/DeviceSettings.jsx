// React Utilities
import { useEffect, useState } from "react"
import axios from "axios"


// Component
import SearchAndFilter  from "../components/devices/SearchAndFilter"
import SensorCards      from "../components/devices/SensorCards"
import ActuatorCards    from "../components/devices/ActuatorCards"
import NewDeviceForm    from "../components/devices/NewDeviceForm"
import Toast            from "../utils/Toast"


export default function DeviceSettings(){
// ========== SUPPORTING VARIABLE ==========
    const URL_BACKEND = "http://127.0.0.1:8000/"


// ========== DEVICE ==========
    // Device List
    const [deviceList, setDeviceList] = useState()

    // Pop up add new device
    const [showForm, setShowForm] = useState(false)

    // Device Status Update
    const statusDeviceChangeHandler = (idDevice, type, status) => {
        // Update data using POST
        axios.post(URL_BACKEND+'device/', {
            post    : "statusUpdate",
            idDevice: idDevice,
            type    : type, 
            status  : !status 
        })
        .then(response => {
            // refresh list data
            getFilteredDataHandler(null, true, 'Berhasil update data');

        })
        .catch(error => {
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : error.status,
                message     : error.message
            }))
        })

    } 

    // Get First time data list
    useEffect(() => {
        axios.get(URL_BACKEND+'device/')
        .then(response => {
             // Kirim notifikasi melalui toast
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'success',
                status      : 'Success',
                message     : 'Berhasil mengambil data'
            }))

            // Menyimpan data list device
            setDeviceList(response.data)
        })
        .catch(error => {
            // Mengirim notifikasi error menggunakan toast
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : error.status,
                message     : error.message
            }))
        })
    }, [])

    // Active pop up form to add new device
    const showPopUpAddDevice = (show) => {
        setShowForm(show)
    }

// ========== FILTER ==========
    // Filter default option
    const filterOptionDefault = {
        type    : 'all',
        status  : 'all',
        search  : ''
    } 
    // Filter option
    const [filterOption, setFilterOption] = useState(filterOptionDefault)
    // Handler for change value in filterOption
    const changeFilterOptionHandler = (e) => {
        const {id, value} = e.target

        setFilterOption(prev => ({
            ...prev, [id]: value
        }))
    }
    // Get filtered data from django
    const getFilteredDataHandler = (e, show=false, messageCustom='Berhasil mengambil data', filter=filterOption) => {
        axios.get(URL_BACKEND+'device/', {
            params: filter
        })
        .then(response => {
            // Kirim notifikasi melalui toast
            setShowToast(prev => ({
                ...prev,
                showToast   : show,
                type        : 'success',
                status      : 'Success',
                message     : messageCustom
            }))

            // Menyimpan list device yang sudah di filter
            setDeviceList(response.data)
        })
        .catch(error => {
            setShowToast(prev => ({
                ...prev,
                showToast   : show,
                type        : 'error',
                status      : error.status,
                message     : error.message
            }))
        })
    }


// ========== ADD NEW DEVICE ==========
    // Default new device data
    const newDevice = {
        post: "new",
        name: "",
        status: true,
        type: "sensor",
        maxValue: "",
        threshold: "",
        measurement: "",
        activation: "manual",
        comparison: ">=",
        sensorTarget: "",
        activationValue: 0
    }

    // Show pop up 
    const [showAddModal, setShowAddModal] = useState(false)
    
    // New device configuration
    const [newDeviceData, setNewDeviceData] = useState(newDevice)
    
    // List Sensor Device
    const [sensorList, setSensorList] = useState(null) 

    // Create new data post to django
    const submitNewDeviceHandler = () => {
        axios.post(URL_BACKEND+'device/', newDeviceData)
        .then(response => {
            // Send Notification success add data 
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : 'Success',
                message     : 'Data berhasil ditambahkan'
            }))

            // get new data list updated
            getFilteredDataHandler(false)
        })
        .catch((error) => {
            // Send Notification failed add data 
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
                type        : 'error',
                status      : 'Success',
                message     : 'Data berhasil ditambahkan'
            }))

            // get data list 
            getFilteredDataHandler(false)
        })
    }

    // Change form value
    const handleFormChange = (e) => {
        const {name, value} = e.target

        setNewDeviceData(prev => ({
            ...prev, [name]: (value === 'true' ? true : value === 'false' ? false : value)
        }))
    }

    // Get device sensor for first time
    useEffect(() => {
        axios.get(URL_BACKEND+"device/sensor/")
        .then(response => {
            setSensorList(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    

// ========== TOAST ==========
    // Message default for toast
    const [showToast, setShowToast] = useState({
        showToast   : false,
        type        : 'success',
        status      : 'Success',
        message     : 'Berhasil'

    })

    return (
        <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center p-4 relative overflow-hidden">
            {/* ===== Background Decorative Blobs ===== */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-20 blur-[120px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-7xl space-y-6">
                {/* Toast */}
                <Toast showToast={showToast['showToast']} setShowToast={setShowToast} type={showToast['type']} message={showToast['message']} status={showToast['status']}/>
                
                {/* Add New Device Form */}
                <NewDeviceForm showAddModal={showAddModal} setShowAddModal={setShowAddModal} submitNewDeviceHandler={submitNewDeviceHandler} handleFormChange={handleFormChange} newDevice={newDeviceData} sensorList={sensorList} />

                {/* Search and Filter - Dibungkus container transparan agar senada */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
                    <SearchAndFilter changeFilterOptionHandler={changeFilterOptionHandler} filterOption={filterOption} getFilteredDataHandler={getFilteredDataHandler} setShowAddModal={setShowAddModal} />
                </div>
                
                {/* Device Cards - Mengubah bg-gray-100 menjadi transparan/glassmorphism */}
                <div className="grid grid-cols-1 rounded-2xl md:grid-cols-5 gap-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">   
                    {deviceList?.map((device) => (
                        device.type === 'sensor' ? (
                            <SensorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler}/>
                        ) : device.type === 'actuator' ? (
                            <ActuatorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler} />
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    )
}