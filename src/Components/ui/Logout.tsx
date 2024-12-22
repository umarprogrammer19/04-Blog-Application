"use client";
import React, { useState } from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Logout() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/user/logout", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
            });

            if (!response.ok) {
                return toast.error("Failed to logout");
            }

            toast.success("Logged out successfully!");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to Logout");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    )
}

export default Logout;
