'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, ShoppingBag, Heart, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function DashboardPage() {
    const router = useRouter();
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        // Check authentication status and get User ID from sessionStorage
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const storedUserId = sessionStorage.getItem('userId');

        if (!isLoggedIn || !storedUserId) {
            // Redirect to login if not authenticated
            router.push('/login');
            return;
        }

        setUserId(storedUserId);
    }, [router]);

    const handleLogout = () => {
        // Clear session data and redirect to login
        sessionStorage.clear();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">FASHION STORE</h1>
                            <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                                <User className="size-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">ID: {userId}</span>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <LogOut className="size-4" />
                            Log out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome to FASHION STORE
                            </h2>
                            <p className="text-gray-600">Your user ID: <span className="font-mono font-semibold text-black">{userId}</span></p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-gradient-to-br from-black to-gray-700 text-white px-6 py-4 rounded-lg">
                                <p className="text-sm opacity-80">Member Rank</p>
                                <p className="text-2xl font-bold">STANDARD</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="bg-black text-white p-3 rounded-full">
                                <ShoppingBag className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Shopping</h3>
                                <p className="text-sm text-gray-600">View latest collection</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="bg-red-500 text-white p-3 rounded-full">
                                <Heart className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Favorites</h3>
                                <p className="text-sm text-gray-600">Saved items</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 text-white p-3 rounded-full">
                                <Settings className="size-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Settings</h3>
                                <p className="text-sm text-gray-600">Account management</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Collection Banner */}
                <div 
                    className="relative rounded-lg overflow-hidden shadow-lg mb-8"
                    style={{ height: '400px' }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvcHBpbmclMjBsdXh1cnl8ZW58MXx8fHwxNzY4ODA5NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    <div className="relative h-full flex flex-col justify-center items-center text-white text-center p-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">NEW COLLECTION</h2>
                        <p className="text-xl mb-6">2026 Spring/Summer</p>
                        <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
                            Shop Now
                        </Button>
                    </div>
                </div>

                {/* Account Info Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Account Information</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">User ID</span>
                            <span className="font-mono font-semibold text-black">{userId}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Member Rank</span>
                            <span className="font-semibold text-black">STANDARD</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Registration Date</span>
                            <span className="font-semibold text-black">{new Date().toLocaleDateString('en-US')}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-gray-600">Status</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 Tech Wear. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}