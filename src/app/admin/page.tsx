"use client";

import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

// Helper to store token
const setToken = (token: string) => localStorage.setItem("lockme_token", token);
const getToken = () => localStorage.getItem("lockme_token");

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState<{ total_users: number; total_tribes: number; recent_users: any[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const BACKEND_URL = "http://127.0.0.1:8000"; // Assuming local dev for now

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = async () => {
        const token = getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Try to fetch stats directly to verify token & admin status
            const res = await axios.get(`${BACKEND_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStats(res.data);
            setIsAdmin(true);
        } catch (err) {
            console.error(err);
            // Token might be expired or user not admin
            setError("Session expired or unauthorized.");
        } finally {
            setLoading(false);
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
                // Fetch stats immediately
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

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
                <h1 className="text-3xl font-bold mb-8">LockMe Admin</h1>
                <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => console.log('Login Failed')}
                        theme="filled_black"
                        shape="pill"
                    />
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <button onClick={() => { localStorage.removeItem("lockme_token"); window.location.reload(); }} className="text-sm text-gray-400 hover:text-white transition">Sign Out</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                        <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Users</h2>
                        <p className="text-6xl font-bold text-white">{stats?.total_users || 0}</p>
                    </div>

                    <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                        <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Tribes</h2>
                        <p className="text-6xl font-bold text-white">{stats?.total_tribes || 0}</p>
                    </div>
                </div>

                <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6">Recent Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-gray-400 border-b border-gray-800">
                                <tr>
                                    <th className="pb-4 pl-4">ID</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Name</th>
                                    <th className="pb-4">Provider</th>
                                    <th className="pb-4">Joined At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {stats?.recent_users?.map((u: any) => (
                                    <tr key={u.id} className="hover:bg-white/5 transition">
                                        <td className="py-4 pl-4 text-gray-500">#{u.id}</td>
                                        <td className="py-4">{u.email}</td>
                                        <td className="py-4 font-medium">{u.full_name || "-"}</td>
                                        <td className="py-4 capitalize text-gray-400">{u.provider}</td>
                                        <td className="py-4 text-gray-400">
                                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
