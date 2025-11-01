'use client';
import { useState } from 'react';
import AccommodationBookings from '../accommodation-booking';

type Tab = 'blogs' | 'accommodation' | 'itinerary' | 'activity';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('blogs');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛠 Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['blogs', 'accommodation', 'itinerary', 'activity'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab as Tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {/* {activeTab === 'blogs' && <AdminBlogs />} */}
        {activeTab === 'accommodation' && <AccommodationBookings />}
         {/* {activeTab === 'itinerary' && <ItineraryBookings />} */}
        {/* // {activeTab === 'activity' && <ActivityBookings />} */}
      </div>
    </div>
  );
}
