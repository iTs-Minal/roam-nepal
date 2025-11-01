"use client";

import { useState } from "react";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  pricePerNight: number;
  bedType: string;
  images: string[];
  description: string;
}

interface Accommodation {
  id: number;
  name: string;
  slug: string;
  rooms: Room[];
}

interface BookingFormProps {
  accommodation: Accommodation;
}

export default function BookingForm({ accommodation }: BookingFormProps) {
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRoomSelect = (roomId: number) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !checkInDate || !checkOutDate || selectedRooms.length === 0) {
      setError("Please fill all required fields and select at least one room.");
      return;
    }

    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accommodationId: accommodation.id,
        rooms: selectedRooms,
        fullName,
        email,
        phone,
        address,
        country,
        guests,
        checkInDate,
        checkOutDate,
        message,
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setError("");
      setSelectedRooms([]);
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCountry("");
      setGuests(1);
      setCheckInDate("");
      setCheckOutDate("");
      setMessage("");
    } else {
      setError("Failed to submit booking request. Try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Rooms */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Select Room(s)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {accommodation.rooms.map((room) => (
            <div
              key={room.id}
              className={`border rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer ${
                selectedRooms.includes(room.id) ? "border-blue-600 ring-2 ring-blue-300" : ""
              }`}
              onClick={() => handleRoomSelect(room.id)}
            >
              <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden">
                <Image
                  src={room.images?.[0] || "/placeholder.jpg"}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{room.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{room.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">${room.pricePerNight}/night</span>
                <span className="text-gray-500 text-sm">{room.bedType}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Details */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of Guests *</label>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Check-in *</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Check-out *</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded-lg p-3 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Special Requests / Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-3"
            rows={4}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">Booking request submitted successfully!</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Submit Booking Request
        </button>
      </section>
    </div>
  );
}
