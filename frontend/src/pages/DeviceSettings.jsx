// React Utilities
import { useEffect, useState, useCallback } from "react"

// Component
import SearchAndFilter from "../components/devices/SearchAndFilter"
import SensorCards from "../components/devices/SensorCards"
import ActuatorCards from "../components/devices/ActuatorCards"
import NewDeviceForm from "../components/devices/NewDeviceForm"
import Toast from "../utils/Toast"
import api from "../api/AxiosConfig"

export default function DeviceSettings() {
    // ========== STATES ==========
    const [deviceList, setDeviceList] = useState([]);
    const [sensorList, setSensorList] = useState([]); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const [showToast, setShowToast] = useState({
        showToast: false,
        type: 'success',
        status: 'Success',
        message: 'Berhasil'
    });

    const [filterOption, setFilterOption] = useState({
        type: 'all',
        status: 'all',
        search: ''
    });

    const [newDeviceData, setNewDeviceData] = useState({
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
        activationValue: 0,
        chart: 'line',
    });

    // ========== HANDLERS ==========

    // Fungsi Reset Toast yang akan dilempar ke komponen Toast
    const closeToastHandler = useCallback(() => {
        setShowToast(prev => ({ ...prev, showToast: false }));
    }, []);

    // Auto-hide toast setelah 3 detik agar tidak mengganggu UI
    useEffect(() => {
        if (showToast.showToast) {
            const timer = setTimeout(() => {
                closeToastHandler();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast.showToast, closeToastHandler]);

    const fetchDevices = useCallback(async (showNotification = false, message = 'Data diperbarui') => {
        try {
            const response = await api.get('device/', { params: filterOption });
            setDeviceList(response.data);
            
            const sensorsOnly = response.data.filter(d => d.type === 'sensor');
            setSensorList(sensorsOnly);

            if (showNotification) {
                setShowToast({
                    showToast: true,
                    type: 'success',
                    status: 'Success',
                    message: message
                });
            }
        } catch (error) {
            setShowToast({
                showToast: true,
                type: 'error',
                status: `Error ${error.response?.status || 'Network'}`,
                message: error.message
            });
        }
    }, [filterOption]);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    const statusDeviceChangeHandler = async (idDevice, type, status) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            await api.post('device/', {
                post: "statusUpdate",
                idDevice: idDevice,
                type: type,
                status: !status 
            });

            await fetchDevices(true, 'Berhasil update status');

        } catch (error) {
            setShowToast({
                showToast: true,
                type: 'error',
                status: `Error ${error.response?.status || 'Unknown'}`,
                message: error.response?.data?.message || 'Gagal mengubah status'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitNewDeviceHandler = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await api.post('device/', newDeviceData);
            setShowAddModal(false);
            setShowToast({
                showToast: true,
                type: 'success',
                status: 'Success',
                message: 'Device baru berhasil ditambahkan'
            });
            fetchDevices(); 
            setNewDeviceData({ 
                post: "new", name: "", status: true, type: "sensor", 
                maxValue: "", threshold: "", measurement: "", 
                activation: "manual", comparison: ">=", sensorTarget: "", 
                activationValue: 0, chart: 'line' 
            });
        } catch (error) {
            setShowToast({
                showToast: true,
                type: 'error',
                status: 'Error',
                message: error.response?.data?.message || 'Gagal menambahkan device'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewDeviceData(prev => ({
            ...prev, 
            [name]: (value === 'true' ? true : value === 'false' ? false : value)
        }));
    };

    const changeFilterOptionHandler = (e) => {
        const { id, value } = e.target;
        setFilterOption(prev => ({ ...prev, [id]: value }));
    };

    const getFilteredDataHandler = (e) => {
        if (e) e.preventDefault();
        fetchDevices(true, 'Filter diterapkan');
    };

    return (
        <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-700 rounded-full opacity-30 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-fuchsia-600 rounded-full opacity-25 blur-[90px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-7xl space-y-6">
                <Toast 
                    showToast={showToast.showToast} 
                    setShowToast={closeToastHandler} 
                    type={showToast.type} 
                    message={showToast.message} 
                    status={showToast.status} 
                />
                
                <NewDeviceForm 
                    showAddModal={showAddModal} 
                    setShowAddModal={setShowAddModal} 
                    submitNewDeviceHandler={submitNewDeviceHandler} 
                    handleFormChange={handleFormChange} 
                    newDevice={newDeviceData} 
                    sensorList={sensorList}
                    loading={isSubmitting} 
                />

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
                    <SearchAndFilter 
                        changeFilterOptionHandler={changeFilterOptionHandler} 
                        filterOption={filterOption} 
                        getFilteredDataHandler={getFilteredDataHandler} 
                        setShowAddModal={setShowAddModal} 
                    />
                </div>
                
                <div className="grid grid-cols-1 rounded-2xl md:grid-cols-5 gap-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">   
                    {deviceList.length > 0 ? deviceList.map((device) => (
                        device.type === 'sensor' ? (
                            <SensorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler}/>
                        ) : (
                            <ActuatorCards key={device.idDevice} device={device} statusDeviceChangeHandler={statusDeviceChangeHandler} />
                        )
                    )) : (
                        <p className="text-white col-span-full text-center opacity-50">Tidak ada perangkat ditemukan.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
