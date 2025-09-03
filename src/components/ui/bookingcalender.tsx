"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingCalendar({
  availableMonths,
  basePrice,
  seasonalRates,
  currency,
}: {
  availableMonths: string[];
  basePrice: number;
  seasonalRates?: { start: string; end: string; multiplier: number }[];
  currency: string;
}) {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [travelers, setTravelers] = useState(1);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);

    if (!date) return;

    let price = basePrice;

    if (seasonalRates) {
      for (const rate of seasonalRates) {
        const start = new Date(rate.start);
        const end = new Date(rate.end);
        if (date >= start && date <= end) {
          price = basePrice * rate.multiplier;
        }
      }
    }

    setFinalPrice(price * travelers);
  };

  const handleTravelersChange = (value: number) => {
    setTravelers(value);
    if (selected) handleSelect(selected);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4 font-outfit">
      <h3 className="text-lg font-kanit font-bold">Book This Trip</h3>

      {/* Calendar */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        fromMonth={new Date(new Date().getFullYear(), 0)}
        toMonth={new Date(new Date().getFullYear(), 11)}
        modifiers={{
          available: (day) =>
            availableMonths.includes(
              day.toLocaleString("default", { month: "long" })
            ),
        }}
        modifiersStyles={{
          available: { backgroundColor: "#e0f2fe", borderRadius: "50%" },
        }}
      />

      {/* Travelers */}
      <div className="flex items-center justify-between">
        <label className="text-sm">Travelers:</label>
        <input
          type="number"
          min={1}
          value={travelers}
          onChange={(e) => handleTravelersChange(parseInt(e.target.value))}
          className="w-16 border rounded-md px-2 py-1 text-sm"
        />
      </div>

      {/* Price */}
      {selected && finalPrice && (
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">
            Selected: {selected.toDateString()}
          </p>
          <p className="text-xl font-exo font-bold text-blue-700">
            {currency} {finalPrice}
          </p>
          <button className="mt-2 w-full px-4 py-2 bg-yellow-400 text-black rounded-lg font-kanit font-semibold hover:bg-yellow-300 transition">
            Proceed to Book
          </button>
        </div>
      )}
    </div>
  );
}
