// React Utilities
import { useEffect, useState } from "react"
import axios from "axios"


// Component
import SearchAndFilter  from "../components/SearchAndFilter"
import SensorCards      from "../components/SensorCards"
import ActuatorCards    from "../components/ActuatorCards"
import Toast            from "../components/Toast"




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
            getFilteredDataHandler(null, 'Berhasil update data');

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
    const getFilteredDataHandler = (e, messageCustom='Berhasil mengambil data') => {
        axios.get(URL_BACKEND+'device/', {
            params: filterOption
        })
        .then(response => {
            // Kirim notifikasi melalui toast
            setShowToast(prev => ({
                ...prev,
                showToast   : true,
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
                showToast   : true,
                type        : 'error',
                status      : error.status,
                message     : error.message
            }))
        })
    }


// ========== ADD NEW DEVICE ==========
    


// ========== TOAST ==========
    // Message default for toast
    const [showToast, setShowToast] = useState({
        showToast   : false,
        type        : 'success',
        status      : 'Success',
        message     : 'Berhasil'

    })



    return (
        <>
            {/* Toast */}
            <Toast showToast={showToast['showToast']} setShowToast={setShowToast} type={showToast['type']} message={showToast['message']} status={showToast['status']}/>

            {/* Search and Filter  */}
            <SearchAndFilter changeFilterOptionHandler={changeFilterOptionHandler} filterOption={filterOption} getFilteredDataHandler={getFilteredDataHandler} showPopUpAddDevice={showPopUpAddDevice} />
            
            {/* Device Cards */}
            <div className="grid grid-cols-1 rounded-2xl  md:grid-cols-5 gap-6 p-6 bg-gray-100">   
                {deviceList?.map((device) => (
                    device.type === 'sensor' ? (
                        <SensorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler}/>
                    ) : device.type === 'actuator' ? (
                        <ActuatorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler} />
                    ) : null
                ))}
            </div>

        </>
    )
}