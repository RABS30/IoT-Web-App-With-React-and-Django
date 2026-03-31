import { useState } from "react"
import { X, PlusCircle } from "@phosphor-icons/react" // Pastikan phosphor-icons terinstall

export default function NewDeviceForm({showAddModal, setShowAddModal, submitNewDeviceHandler, handleFormChange, newDevice, sensorList}){
    return (
        <>
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setShowAddModal(false)}>
                    
                    {/* Modal Container dengan Glassmorphism */}
                    <div 
                        className="bg-gray-900/90 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl p-8 relative overflow-hidden" 
                        onClick={(e)=>e.stopPropagation()}
                    >
                        {/* Background Decoration inside Modal */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600 rounded-full opacity-20 blur-[60px] pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <PlusCircle size={24} weight="bold" className="text-blue-500" />
                                    Tambah Device
                                </h2>
                                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition">
                                    <X size={24} weight="bold" />
                                </button>
                            </div>

                            <form onSubmit={submitNewDeviceHandler} className="flex flex-col gap-4">
                                
                                {/* SECTION: BASIC INFO */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nama</label>
                                    <input 
                                        name="name" 
                                        value={newDevice.name} 
                                        onChange={handleFormChange} 
                                        placeholder="Contoh: Lampu Ruang Tamu" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tipe</label>

                                    <select 
                                        name="type" 
                                        value={newDevice.type} 
                                        onChange={handleFormChange} 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="sensor" className="bg-gray-900 text-white">Sensor</option>
                                        <option value="actuator" className="bg-gray-900 text-white">Actuator</option>
                                    </select>
                                </div>

                                {/* SECTION: DYNAMIC FORM BASED ON TYPE */}
                                <div className="space-y-4 pt-2 border-t border-white/5">
                                    
                                    {/* SENSOR FORM */}
                                    {newDevice.type === "sensor" && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Satuan Pengukuran</label>
                                                <input name="measurement" value={newDevice.measurement} onChange={handleFormChange} placeholder="°C / % / cm" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all"/>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Max Value</label>
                                                <input name="maxValue" type="number" value={newDevice.maxValue} onChange={handleFormChange} placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all"/>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Threshold</label>
                                                <input name="threshold" type="number" value={newDevice.threshold} onChange={handleFormChange} placeholder="70" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all"/>
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Visualisasi Chart</label>
                                                <select name="chart" value={newDevice.chart} onChange={handleFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                                                    <option value="line" className="bg-gray-900 text-white">Line Chart</option>
                                                    <option value="doughnut" className="bg-gray-900 text-white">Doughnut Chart</option>
                                                    <option value="bar" className="bg-gray-900 text-white">Bar Chart</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* ACTUATOR FORM */}
                                    {newDevice.type === "actuator" && (
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Metode Aktifasi</label>
                                                <select name="activation" value={newDevice.activation} onChange={handleFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                                                    <option value="manual" className="bg-gray-900 text-white">Manual Control</option>
                                                    <option value="sensor" className="bg-gray-900 text-white">Otomatis (By Sensor)</option>
                                                </select>
                                            </div>

                                            {newDevice.activation === "sensor" && (
                                                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Sensor Target</label>
                                                        <select name="sensorTarget" value={newDevice.sensorTarget} onChange={handleFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                                                            <option className="bg-gray-900 text-white">Pilih Sensor...</option>
                                                            {sensorList.map((device) => (
                                                                device.type === "sensor" && (
                                                                    <option key={device.idDevice} value={device.idDevice} className="bg-gray-900 text-white"> 
                                                                        {device.name} ({device.idDevice})
                                                                    </option>
                                                                )
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Kondisi</label>
                                                            <select name="comparison" value={newDevice.comparison} onChange={handleFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                                                                <option value=">=" className="bg-gray-900 text-white">Lebih Besar dari (&gt;=)</option>
                                                                <option value="<=" className="bg-gray-900 text-white">Lebih Kecil dari (&lt;=)</option>
                                                                <option value="==" className="bg-gray-900 text-white">Sama dengan (==)</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nilai Pemicu</label>
                                                            <input name="activationValue" type="number" value={newDevice.activationValue} onChange={handleFormChange} placeholder="Value" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* COMMON STATUS */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Initial Status</label>
                                        <select name="status" value={newDevice.status} onChange={handleFormChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                                            <option value="true" className="bg-gray-900 text-green-400 font-bold">ON (Aktif)</option>
                                            <option value="false" className="bg-gray-900 text-red-400 font-bold">OFF (Mati)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* BUTTONS */}
                                <div className="flex gap-3 mt-6 pt-4 border-t border-white/5">
                                    <button 
                                        type="button" 
                                        onClick={()=>setShowAddModal(false)} 
                                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>

                                    <button 
                                        type="submit" 
                                        className="flex-[2] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform active:scale-95" 
                                    >
                                        Save Device
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}