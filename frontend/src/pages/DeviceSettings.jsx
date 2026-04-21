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
    const [sensorList, setSensorList] = useState([]); // Untuk dropdown di NewDeviceForm
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state untuk tombol
    
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

    // Fungsi Fetch Data (Gunakan useCallback agar bisa dipanggil di useEffect & handler lain)
    const fetchDevices = useCallback(async (showNotification = false, message = 'Data diperbarui') => {
        try {
            const response = await api.get('device/', { params: filterOption });
            setDeviceList(response.data);
            
            // Juga update sensorList jika tipenya sensor (untuk dropdown form)
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

    // Ambil data pertama kali saat mount
    useEffect(() => {
        fetchDevices();
    }, []); // Run sekali saja

    // Update status (Optimistic Update agar UI tidak delay)
    const statusDeviceChangeHandler = async (idDevice, type, status) => {
        // Kita tambahkan pengecekan loading agar tidak bisa klik berkali-kali dalam waktu singkat
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const response = await api.post('device/', {
                post: "statusUpdate",
                idDevice: idDevice,
                type: type,
                status: !status // Mengirim kebalikan dari status saat ini
            });

            // HANYA refresh data jika request POST berhasil (200 OK)
            // Gunakan fungsi fetch yang sudah ada agar UI terupdate sesuai DB
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
    }

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
            fetchDevices(); // Refresh list
            // Reset Form
            setNewDeviceData({ ...newDeviceData, name: "", maxValue: "", threshold: "", measurement: "" });
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

    // Trigger filter saat filterOption berubah
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
                    setShowToast={(val) => setShowToast(prev => ({ ...prev, showToast: val }))} 
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