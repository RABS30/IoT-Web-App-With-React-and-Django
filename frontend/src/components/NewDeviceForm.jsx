import { useState } from "react"

export default function NewDeviceForm({showAddModal, setShowAddModal, submitNewDeviceHandler, handleFormChange, newDevice, sensorList}){
    return (
        <>
            {showAddModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                <div className="bg-white w-[420px] rounded-xl shadow-xl p-6" onClick={(e)=>e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-4">
                    Tambah Device
                </h2>

                <form onSubmit={submitNewDeviceHandler} className="flex flex-col gap-3">

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
                        <input name="maxValue"      type="number"  value={newDevice.maxValue} onChange={handleFormChange} placeholder="Max Value" className="border rounded p-2"/>
                        <input name="threshold"     type="number"  value={newDevice.threshold} onChange={handleFormChange} placeholder="Threshold" className="border rounded p-2"/>
                        <input name="measurement"   value={newDevice.measurement} onChange={handleFormChange} placeholder="Measurement (°C / % / cm)" className="border rounded p-2"/>
                        <select name="status"       value={newDevice.status} onChange={handleFormChange} className="border rounded p-2">
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
                            {sensorList.map((device) => (
                                device.type === "sensor" ? 
                                
                                <option key={device.idDevice} value={device.idDevice}> 
                                    {device.name} : {device.idDevice}
                                </option> : <></>
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
        </>
    )
}