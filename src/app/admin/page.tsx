"use client";

import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import axios from "axios";

// Helper to store token
const setToken = (token: string) => localStorage.setItem("lockme_token", token);
const getToken = () => localStorage.getItem("lockme_token");

// Types for admin data
interface AdminUser {
    id: number;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    provider: string;
    created_at: string | null;
    is_active: boolean;
    tribes_count: number;
    total_focus_minutes: number;
    current_streak: number;
}

interface AdminTribe {
    id: number;
    name: string;
    invite_code: string;
    created_at: string | null;
    member_count: number;
}

// Sidebar menu items
const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👤' },
    { id: 'tribes', label: 'Tribes', icon: '👥' },
];

export default function AdminPage() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState<{ total_users: number; total_tribes: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    
    // Active menu: 'dashboard', 'users', or 'tribes'
    const [activeMenu, setActiveMenu] = useState<'dashboard' | 'users' | 'tribes'>('dashboard');
    
    // Data for pages
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [tribes, setTribes] = useState<AdminTribe[]>([]);
    const [dataLoading, setDataLoading] = useState(false);

    const BACKEND_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        checkAdminStatus();
    }, []);

    // Fetch data when menu changes
    useEffect(() => {
        if (isAdmin) {
            fetchPageData();
        }
    }, [activeMenu, isAdmin]);

    // Close mobile sidebar when clicking menu item
    const handleMenuClick = (menuId: 'dashboard' | 'users' | 'tribes') => {
        setActiveMenu(menuId);
        setSidebarOpen(false); // Close mobile sidebar
    };

    const checkAdminStatus = async () => {
        const token = getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`${BACKEND_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStats(res.data);
            setIsAdmin(true);
        } catch (err) {
            console.error(err);
            setError("Session expired or unauthorized.");
        } finally {
            setLoading(false);
        }
    };

    const fetchPageData = async () => {
        const token = getToken();
        if (!token) return;
        
        setDataLoading(true);
        try {
            if (activeMenu === 'users') {
                const res = await axios.get(`${BACKEND_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } else if (activeMenu === 'tribes') {
                const res = await axios.get(`${BACKEND_URL}/admin/tribes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTribes(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDataLoading(false);
        }
    };

    const handleLoginSuccess = async (credentialResponse: any) => {
        if (!credentialResponse.credential) return;

        try {
            const res = await axios.post(`${BACKEND_URL}/auth/google`, {
                id_token: credentialResponse.credential,
            });

            if (res.data.is_admin) {
                setToken(res.data.access_token);
                setIsAdmin(true);
                const statsRes = await axios.get(`${BACKEND_URL}/admin/stats`, {
                    headers: { Authorization: `Bearer ${res.data.access_token}` },
                });
                setStats(statsRes.data);
            } else {
                alert("You are not an admin!");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed.");
        }
    };

    // Helper to format focus minutes as hours/minutes
    const formatFocusTime = (minutes: number) => {
        if (minutes < 60) return `${Math.round(minutes)}m`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    // Loading screen
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    // Login screen
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-8">LockMe Admin</h1>
                <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700">
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => console.log('Login Failed')}
                        theme="filled_black"
                        shape="pill"
                    />
                </div>
                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </div>
        );
    }

    // Main Dashboard with Sidebar
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-30
                bg-gray-800 border-r border-gray-700
                transform transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
                w-64
            `}>
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
                    {!sidebarCollapsed && (
                        <h1 className="text-lg font-bold text-white">LockMe Admin</h1>
                    )}
                    {/* Collapse button - desktop only */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:flex items-center justify-center w-8 h-8 rounded hover:bg-gray-700 text-gray-400"
                    >
                        {sidebarCollapsed ? '→' : '←'}
                    </button>
                    {/* Close button - mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden flex items-center justify-center w-8 h-8 rounded hover:bg-gray-700 text-gray-400"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-2 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id as 'dashboard' | 'users' | 'tribes')}
                            className={`
                                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition
                                ${activeMenu === item.id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                                ${sidebarCollapsed ? 'lg:justify-center' : ''}
                            `}
                            title={sidebarCollapsed ? item.label : undefined}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!sidebarCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Sign Out - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
                    <button
                        onClick={() => { localStorage.removeItem("lockme_token"); window.location.reload(); }}
                        className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition
                            text-gray-400 hover:bg-gray-700 hover:text-white
                            ${sidebarCollapsed ? 'lg:justify-center' : ''}
                        `}
                        title={sidebarCollapsed ? 'Sign Out' : undefined}
                    >
                        <span className="text-lg">🚪</span>
                        {!sidebarCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 text-gray-400"
                    >
                        <span className="text-xl">☰</span>
                    </button>

                    {/* Page Title */}
                    <h2 className="text-lg font-semibold capitalize">
                        {activeMenu === 'dashboard' ? 'Dashboard' : activeMenu}
                    </h2>

                    {/* Spacer */}
                    <div className="w-10 lg:hidden" />
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    {/* Dashboard Page */}
                    {activeMenu === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Total Users</p>
                                            <p className="text-3xl font-bold mt-1">{stats?.total_users || 0}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-2xl">
                                            👤
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Total Tribes</p>
                                            <p className="text-3xl font-bold mt-1">{stats?.total_tribes || 0}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-2xl">
                                            👥
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Avg Users/Tribe</p>
                                            <p className="text-3xl font-bold mt-1">
                                                {stats?.total_tribes ? (stats.total_users / stats.total_tribes).toFixed(1) : '0'}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">
                                            📈
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-400 text-sm">Active</p>
                                            <p className="text-3xl font-bold mt-1 text-green-400">Live</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center text-2xl">
                                            🟢
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button 
                                        onClick={() => setActiveMenu('users')}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm"
                                    >
                                        View All Users
                                    </button>
                                    <button 
                                        onClick={() => setActiveMenu('tribes')}
                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-sm"
                                    >
                                        View All Tribes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users Page */}
                    {activeMenu === 'users' && (
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="font-semibold">All Users ({users.length})</h3>
                            </div>
                            
                            {dataLoading ? (
                                <div className="p-8 text-center text-gray-400 animate-pulse">Loading users...</div>
                            ) : (
                                <div className="divide-y divide-gray-700">
                                    {users.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400">No users found</div>
                                    ) : (
                                        users.map((user) => (
                                            <div key={user.id} className="p-4 hover:bg-gray-750 transition">
                                                <div className="flex items-start gap-3">
                                                    {/* Avatar */}
                                                    <div className="shrink-0">
                                                        {user.avatar_url ? (
                                                            <img 
                                                                src={user.avatar_url} 
                                                                alt="" 
                                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                                                                {user.full_name?.[0] || user.email[0].toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* User Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-medium truncate">{user.full_name || "Anonymous"}</span>
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 capitalize">
                                                                {user.provider}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                                        
                                                        {/* Stats Row */}
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm">
                                                            <span className="text-gray-500">
                                                                🏠 {user.tribes_count} tribe{user.tribes_count !== 1 ? 's' : ''}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                ⏱️ {formatFocusTime(user.total_focus_minutes)}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                🔥 {user.current_streak} day streak
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* ID Badge */}
                                                    <span className="text-xs text-gray-600">#{user.id}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tribes Page */}
                    {activeMenu === 'tribes' && (
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="font-semibold">All Tribes ({tribes.length})</h3>
                            </div>
                            
                            {dataLoading ? (
                                <div className="p-8 text-center text-gray-400 animate-pulse">Loading tribes...</div>
                            ) : tribes.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">No tribes found</div>
                            ) : (
                                <>
                                    {/* Table - Desktop */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-900/50 text-left text-sm text-gray-400">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium">ID</th>
                                                    <th className="px-4 py-3 font-medium">Name</th>
                                                    <th className="px-4 py-3 font-medium">Invite Code</th>
                                                    <th className="px-4 py-3 font-medium">Members</th>
                                                    <th className="px-4 py-3 font-medium">Created</th>
                                                    <th className="px-4 py-3 font-medium"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {tribes.map((tribe) => (
                                                    <tr 
                                                        key={tribe.id} 
                                                        className="hover:bg-gray-750 transition cursor-pointer"
                                                        onClick={() => router.push(`/admin/tribes/${tribe.id}`)}
                                                    >
                                                        <td className="px-4 py-3 text-gray-500">#{tribe.id}</td>
                                                        <td className="px-4 py-3 font-medium">{tribe.name}</td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-mono text-sm bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">
                                                                {tribe.invite_code}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-blue-400">{tribe.member_count}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-400">
                                                            {tribe.created_at 
                                                                ? new Date(tribe.created_at).toLocaleDateString() 
                                                                : '-'
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-400">→</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Card Layout - Mobile */}
                                    <div className="md:hidden divide-y divide-gray-700">
                                        {tribes.map((tribe) => (
                                            <button
                                                key={tribe.id}
                                                onClick={() => router.push(`/admin/tribes/${tribe.id}`)}
                                                className="w-full p-4 hover:bg-gray-750 transition text-left"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="font-semibold">{tribe.name}</span>
                                                            <span className="text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 font-mono">
                                                                {tribe.invite_code}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-3 mt-1 text-sm text-gray-400">
                                                            <span>👥 {tribe.member_count}</span>
                                                            {tribe.created_at && (
                                                                <span>
                                                                    {new Date(tribe.created_at).toLocaleDateString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-400 ml-2">→</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
