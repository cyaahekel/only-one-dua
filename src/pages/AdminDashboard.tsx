import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Lock, BarChart3, Users, Download, Activity, LogOut, TrendingUp, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

const mockChartData = [
  { name: 'Mon', downloads: 400 },
  { name: 'Tue', downloads: 300 },
  { name: 'Wed', downloads: 900 },
  { name: 'Thu', downloads: 500 },
  { name: 'Fri', downloads: 1200 },
  { name: 'Sat', downloads: 1500 },
  { name: 'Sun', downloads: 1100 },
];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'logs'>('overview');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { passcode });
      if (res.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', res.data.token);
      }
    } catch (err) {
      setError('ACCESS DENIED. WRONG PASSCODE.');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
      const interval = setInterval(fetchStats, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-20 px-6">
        <form onSubmit={handleLogin} className="bg-white dark:bg-black border-4 border-black p-10 neo-shadow-lg space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#FF4911] border-4 border-black neo-shadow flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-center">ADMIN GATEWAY</h1>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">Passcode</label>
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-4 bg-gray-100 dark:bg-zinc-900 border-4 border-black neo-shadow outline-none font-bold"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 font-black text-center uppercase text-xs">{error}</p>}

          <button className="w-full py-4 bg-black text-white dark:bg-[#FFDE00] dark:text-black font-black uppercase border-4 border-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            UNCAGE ACCESS
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
      <div className="bg-white dark:bg-black border-4 border-black neo-shadow-lg overflow-hidden">
        <div className="p-8 flex justify-between items-end border-b-4 border-black">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">CONTROL HUB</h1>
            <p className="font-bold text-lg uppercase">System Status: <span className="text-green-500">OPTIMAL</span></p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              setIsLoggedIn(false);
            }}
            className="p-4 bg-[#FF4911] text-white border-4 border-black neo-shadow font-black uppercase active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <LogOut />
          </button>
        </div>
        
        <div className="flex bg-gray-50 dark:bg-zinc-900 border-b-4 border-black">
          {['overview', 'logs', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-8 py-4 font-black uppercase tracking-widest text-sm border-r-4 border-black transition-all",
                activeTab === tab ? "bg-black text-white dark:bg-[#FFDE00] dark:text-black" : "hover:bg-[#FFDE00] hover:text-black"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Total Downloads", val: stats?.totalDownloads || 0, icon: Download, color: "bg-[#FFDE00]" },
                  { label: "Active Sessions", val: "1 User (You)", icon: Users, color: "bg-[#2D31FA]", text: "text-white" },
                  { label: "Uptime", val: "99.9%", icon: Activity, color: "bg-green-400" }
                ].map((item, i) => (
                  <div key={i} className={`p-8 border-4 border-black neo-shadow ${item.color} ${item.text || 'text-black'}`}>
                    <item.icon size={48} className="mb-4" />
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-2">{item.label}</p>
                    <p className="text-5xl font-black tracking-tighter">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 border-4 border-black p-8 bg-white dark:bg-black neo-shadow">
                  <div className="flex items-center gap-4 mb-8">
                    <TrendingUp size={32} />
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Usage Velocity</h2>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                        <XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '4px solid #000', 
                            borderRadius: '0px',
                            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                            fontFamily: 'Inter',
                            fontWeight: '900'
                          }} 
                        />
                        <Area type="monotone" dataKey="downloads" stroke="#2D31FA" strokeWidth={4} fill="#FFDE00" fillOpacity={1} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-black border-4 border-black p-8 neo-shadow flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Cpu size={32} />
                      <h2 className="text-3xl font-black uppercase tracking-tighter">Sys Health</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b-2 border-black pb-2 text-sm font-black uppercase">
                        <span>CPU Load</span>
                        <span className="text-green-500">1.2%</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-black pb-2 text-sm font-black uppercase">
                        <span>Memory</span>
                        <span className="text-yellow-500">421MB</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-black pb-2 text-sm font-black uppercase">
                        <span>Network</span>
                        <span className="text-green-500">Normal</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-black pb-2 text-sm font-black uppercase">
                        <span>Spotify API</span>
                        <span className="text-yellow-500 italic">WAITING FOR KEY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tighter">System Logs</h2>
              <div className="bg-black text-green-500 p-6 font-mono text-sm border-4 border-black neo-shadow h-[500px] overflow-y-auto space-y-2">
                <p>[{new Date().toISOString()}] SERVER BOOT SUCCESSFUL</p>
                <p>[{new Date().toISOString()}] VITE MIDDLEWARE READY</p>
                <p>[{new Date().toISOString()}] CONNECTED TO INSTAGRAM API</p>
                <p>[{new Date().toISOString()}] CONNECTED TO TIKTOK API</p>
                <p>[{new Date().toISOString()}] LISTENING ON PORT 3000</p>
                <p>[{new Date(Date.now() - 5000).toISOString()}] NEW DOWNLOAD REQUEST: tiktok_v123</p>
                <p>[{new Date(Date.now() - 2000).toISOString()}] ADMIN LOGIN SUCCESS: {localStorage.getItem('adminToken')?.slice(0, 8)}...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Global Settings</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border-4 border-black bg-white dark:bg-black neo-shadow space-y-4">
                  <h3 className="font-black uppercase tracking-widest text-sm">Download Limits</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Requests per IP / Hour</span>
                    <input type="number" defaultValue={50} className="w-20 p-2 border-2 border-black bg-gray-50 dark:bg-zinc-900 font-bold" />
                  </div>
                </div>
                <div className="p-6 border-4 border-black bg-white dark:bg-black neo-shadow space-y-4">
                  <h3 className="font-black uppercase tracking-widest text-sm">API Toggles</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">TikTok Scraper</span>
                    <div className="w-12 h-6 bg-green-500 border-2 border-black relative">
                      <div className="absolute right-1 top-1 w-3 h-2 bg-black"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
