"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Helper to get token
const getToken = () => localStorage.getItem("lockme_token");

interface TribeMember {
    user_id: number;
    user_name: string;
    user_email: string;
    avatar_url: string | null;
    joined_at: string | null;
    total_focus_minutes: number;
    current_streak: number;
}

interface TribeDetail {
    tribe_id: number;
    tribe_name: string;
    invite_code: string;
    created_at: string | null;
    total_members: number;
    page: number;
    page_size: number;
    total_pages: number;
    members: TribeMember[];
}

export default function TribeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const tribeId = params.id as string;
    
    const [tribe, setTribe] = useState<TribeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const BACKEND_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        fetchTribeDetail(currentPage);
    }, [tribeId, currentPage]);

    const fetchTribeDetail = async (page: number) => {
        const token = getToken();
        if (!token) {
            router.push('/admin');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get(
                `${BACKEND_URL}/admin/tribes/${tribeId}?page=${page}&page_size=${pageSize}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTribe(res.data);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                router.push('/admin');
            } else {
                setError("Failed to load tribe details");
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper to format focus minutes
    const formatFocusTime = (minutes: number) => {
        if (minutes < 60) return `${Math.round(minutes)}m`;
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    // Pagination handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= (tribe?.total_pages || 1)) {
            setCurrentPage(page);
        }
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        if (!tribe) return [];
        const pages: (number | string)[] = [];
        const total = tribe.total_pages;
        const current = tribe.page;
        
        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > 3) pages.push('...');
            for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                pages.push(i);
            }
            if (current < total - 2) pages.push('...');
            pages.push(total);
        }
        return pages;
    };

    if (loading && !tribe) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                    onClick={() => router.push('/admin')}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                    Back to Admin
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/admin')}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                        >
                            <span>←</span>
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <div className="flex-1">
                            <h1 className="text-xl sm:text-2xl font-bold">{tribe?.tribe_name}</h1>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                <span className="font-mono bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">
                                    {tribe?.invite_code}
                                </span>
                                <span>•</span>
                                <span>{tribe?.total_members} member{tribe?.total_members !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                        <h2 className="font-semibold">Members</h2>
                        <span className="text-sm text-gray-400">
                            Page {tribe?.page} of {tribe?.total_pages}
                        </span>
                    </div>

                    {/* Table - Desktop */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900/50 text-left text-sm text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 font-medium">#</th>
                                    <th className="px-4 py-3 font-medium">User</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">Focus Time</th>
                                    <th className="px-4 py-3 font-medium">Streak</th>
                                    <th className="px-4 py-3 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {tribe?.members.map((member, idx) => {
                                    const rank = (tribe.page - 1) * pageSize + idx + 1;
                                    return (
                                        <tr key={member.user_id} className="hover:bg-gray-750 transition">
                                            <td className="px-4 py-3">
                                                <span className="text-lg">
                                                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {member.avatar_url ? (
                                                        <img 
                                                            src={member.avatar_url} 
                                                            alt="" 
                                                            className="w-8 h-8 rounded-full bg-gray-700"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                                                            {member.user_name[0].toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-medium">{member.user_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400">{member.user_email}</td>
                                            <td className="px-4 py-3">
                                                <span className="text-blue-400 font-semibold">
                                                    {formatFocusTime(member.total_focus_minutes)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-orange-400">🔥 {member.current_streak}d</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400">
                                                {member.joined_at 
                                                    ? new Date(member.joined_at).toLocaleDateString() 
                                                    : '-'
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Card Layout - Mobile */}
                    <div className="md:hidden divide-y divide-gray-700">
                        {tribe?.members.map((member, idx) => {
                            const rank = (tribe.page - 1) * pageSize + idx + 1;
                            return (
                                <div key={member.user_id} className="p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg w-8 text-center">
                                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                                        </span>
                                        {member.avatar_url ? (
                                            <img 
                                                src={member.avatar_url} 
                                                alt="" 
                                                className="w-10 h-10 rounded-full bg-gray-700"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                                                {member.user_name[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{member.user_name}</p>
                                            <p className="text-sm text-gray-400 truncate">{member.user_email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-3 ml-11 text-sm">
                                        <span className="text-blue-400">⏱️ {formatFocusTime(member.total_focus_minutes)}</span>
                                        <span className="text-orange-400">🔥 {member.current_streak}d</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {tribe && tribe.total_pages > 1 && (
                        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
                            >
                                ← Prev
                            </button>

                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, idx) => (
                                    typeof page === 'number' ? (
                                        <button
                                            key={idx}
                                            onClick={() => goToPage(page)}
                                            className={`w-8 h-8 rounded-lg text-sm transition ${
                                                page === currentPage
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 hover:bg-gray-600'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ) : (
                                        <span key={idx} className="px-2 text-gray-500">...</span>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage >= tribe.total_pages}
                                className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {tribe?.members.length === 0 && (
                        <div className="p-8 text-center text-gray-400">
                            No members in this tribe
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
