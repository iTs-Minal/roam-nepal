'use client';
import { useEffect, useState } from 'react';

interface Booking {
  id: number;
  accommodationName: string;
  rooms: string[];
  userFullName: string;
  userEmail: string;
  userPhone: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message?: string;
  status: string;
}

export default function AccommodationBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/admin/bookings/accommodation');
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    const res = await fetch(`/api/bookings/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBookings(bookings.map(b => (b.id === id ? { ...b, status } : b)));
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No accommodation bookings.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="border p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-1">
            <p className="font-semibold">{b.userFullName} ({b.userEmail})</p>
            <p>Phone: {b.userPhone}</p>
            <p>Accommodation: {b.accommodationName}</p>
            {/* <p>Rooms: {b.rooms.join(',')}</p> */}
            <p>Guests: {b.guests}</p>
            <p>Check-in: {new Date(b.checkIn).toLocaleDateString()}</p>
            <p>Check-out: {new Date(b.checkOut).toLocaleDateString()}</p>
            {b.message && <p>Message: {b.message}</p>}
            <p>Status: <span className={b.status === 'pending' ? 'text-yellow-600' : b.status === 'approved' ? 'text-green-600' : 'text-red-600'}>{b.status}</span></p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            {b.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusUpdate(b.id, 'approved')}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusUpdate(b.id, 'rejected')}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
