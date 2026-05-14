'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  UserCheck, 
  ArrowLeft, 
  Cpu, 
  Activity, 
  Wifi, 
  Clock, 
  MapPin, 
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle,
  Database,
  Smartphone,
  Shield
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function SwipeManagementPage() {
  const [swipes, setSwipes] = useState([
    { id: '1', name: 'John Smith', time: '09:15:22', device: 'Main Entry B1', status: 'In', type: 'Face ID' },
    { id: '2', name: 'Emily Davis', time: '09:12:05', device: 'Lobby Gate 2', status: 'In', type: 'Fingerprint' },
    { id: '3', name: 'Mike Wilson', time: '09:08:44', device: 'Mobile App', status: 'In', type: 'GPS Geofence' }
  ])

  const [devices, setDevices] = useState([
    { id: 'D1', name: 'Main Entry B1', status: 'Online', battery: '98%', signal: 'Excellent' },
    { id: 'D2', name: 'Lobby Gate 2', status: 'Online', battery: '82%', signal: 'Good' },
    { id: 'D3', name: 'Cafeteria Exit', status: 'Offline', battery: '0%', signal: 'None' }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/leave-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Swipe Management</h1>
            <p className="text-gray-600">Raw biometric data and hardware health monitoring</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold flex items-center shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All Devices
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Hardware Status */}
        <div className="lg:col-span-1 space-y-6">
           <h3 className="text-lg font-bold text-gray-900 ml-2">Device Status</h3>
           {devices.map((device) => (
             <div key={device.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-2xl ${device.status === 'Online' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      <Wifi className="h-5 w-5" />
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${device.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                      {device.status}
                   </span>
                </div>
                <h4 className="font-bold text-gray-900">{device.name}</h4>
                <p className="text-xs text-gray-400 mt-1">ID: {device.id} • Signal: {device.signal}</p>
                <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                   <div className={`h-full ${device.status === 'Online' ? 'bg-green-500' : 'bg-gray-200'}`} style={{ width: device.battery }} />
                </div>
             </div>
           ))}
        </div>

        {/* Swipe Logs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                 <Activity className="h-5 w-5 mr-2 text-blue-600" />
                 Live Swipe Feed
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100">
                 <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                 <span>Receiving Data</span>
              </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-gray-50/30 border-b border-gray-50">
                     <tr>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Employee</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Time</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Device</th>
                        <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Method</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {swipes.map((swipe) => (
                       <tr key={swipe.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-5">
                             <div className="flex items-center">
                                <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs mr-3">
                                   {swipe.name[0]}
                                </div>
                                <span className="font-bold text-gray-900">{swipe.name}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-sm font-mono text-gray-600">{swipe.time}</td>
                          <td className="px-8 py-5">
                             <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1 opacity-50" />
                                {swipe.device}
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <span className="inline-flex items-center text-[10px] font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded-lg">
                                {swipe.type === 'GPS Geofence' ? <Smartphone className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
                                {swipe.type}
                             </span>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2rem] text-white shadow-xl flex items-center justify-between overflow-hidden relative">
                <Database className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10" />
                <div>
                   <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Database Buffer</p>
                   <h4 className="text-2xl font-black">2.4k Swipes</h4>
                   <p className="text-slate-500 text-xs mt-2">Awaiting processing engine...</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all relative z-10">
                   Purge Cache
                </button>
             </div>

             <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex items-center space-x-6">
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0">
                   <Clock className="h-8 w-8" />
                </div>
                <div>
                   <h4 className="font-bold text-blue-900">Auto-Processing</h4>
                   <p className="text-sm text-blue-700 opacity-70">The system runs a sync every 15 minutes to reconcile raw swipes with attendance records.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
