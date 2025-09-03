"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Helper to normalize to local date-only string (YYYY-MM-DD)
const ymd = (d: Date) => d.toISOString().split("T")[0];

type SeasonalRate = { start: string; end: string; multiplier: number };
type Tier = { label: string; price: number };
type DepartureLite = {
  id: number;
  date: string;           // ISO
  startTime?: string | null;
  priceOverride?: number | null;
  seatsAvailable: number;
};

export default function BookingWidget({
  currency,
  basePrice,
  seasonalRates,
  pricingTiers,
  bookingCutoffHrs,
  openDepartures,
}: {
  currency: string;
  basePrice: number;
  seasonalRates?: SeasonalRate[];
  pricingTiers?: Tier[];
  bookingCutoffHrs: number;
  openDepartures: DepartureLite[];
}) {
  const today = new Date();
  const cutoffMs = bookingCutoffHrs * 60 * 60 * 1000;

  // Build a set of selectable y-m-d strings from OPEN departures that are future + beyond cutoff.
  const selectable = useMemo(() => {
    const now = Date.now();
    return new Set(
      openDepartures
        .filter(d => {
          const dt = new Date(d.date).getTime();
          return dt > now + cutoffMs; // block past + inside cutoff
        })
        .map(d => ymd(new Date(d.date)))
    );
  }, [openDepartures, bookingCutoffHrs]);

  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const selectedDeparture = useMemo(() => {
    if (!selected) return undefined;
    const key = ymd(selected);
    return openDepartures.find(d => ymd(new Date(d.date)) === key);
  }, [selected, openDepartures]);

  // Pricing calculator
  const perAdult = useMemo(() => {
    if (!selectedDeparture) return null;
    if (selectedDeparture.priceOverride) return selectedDeparture.priceOverride;
    let price = basePrice;
    if (seasonalRates && seasonalRates.length) {
      const sel = new Date(selectedDeparture.date);
      for (const r of seasonalRates) {
        const s = new Date(r.start);
        const e = new Date(r.end);
        if (sel >= s && sel <= e) {
          price = Math.round(price * r.multiplier);
          break;
        }
      }
    }
    return price;
  }, [selectedDeparture, basePrice, seasonalRates]);

  const perChild = useMemo(() => {
    if (!pricingTiers) return perAdult;
    const child = pricingTiers.find(t => /child/i.test(t.label));
    return child ? child.price : perAdult;
  }, [pricingTiers, perAdult]);

  const total = useMemo(() => {
    if (perAdult == null || perChild == null) return null;
    return perAdult * adults + perChild * children;
  }, [perAdult, perChild, adults, children]);

  // DayPicker config: disable everything except our selectable set
  const disabled = [
    { before: new Date() }, // block past (visual)
    (day: Date) => !selectable.has(ymd(day)), // block anything not an open departure outside cutoff
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4 font-outfit">
      <h3 className="text-lg font-kanit font-bold">Book This Trip</h3>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        fromMonth={new Date(new Date().getFullYear(), 0)}
        toMonth={new Date(new Date().getFullYear(), 11)}
        disabled={disabled as any}
        modifiers={{
          available: (day) => selectable.has(ymd(day)),
        }}
        modifiersStyles={{
          available: { backgroundColor: "#e0f2fe", borderRadius: "50%" },
        }}
      />

      {/* Travelers */}
      <div className="flex items-center justify-between text-sm">
        <label>Adults</label>
        <input
          type="number" min={1} value={adults}
          onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || "1")))}
          className="w-16 border rounded-md px-2 py-1"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label>Children</label>
        <input
          type="number" min={0} value={children}
          onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value || "0")))}
          className="w-16 border rounded-md px-2 py-1"
        />
      </div>

      {/* Price + CTA */}
      {selectedDeparture ? (
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-600">
            {new Date(selectedDeparture.date).toLocaleDateString()} {selectedDeparture.startTime ? `• ${selectedDeparture.startTime}` : ""}
            {` • Seats: ${selectedDeparture.seatsAvailable}`}
          </p>
          {total != null && (
            <p className="text-xl font-exo font-bold text-blue-700">
              {currency} {total}
            </p>
          )}
          <button
            className="mt-2 w-full px-4 py-2 bg-yellow-400 text-black rounded-lg font-kanit font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
            disabled={!selectedDeparture || total == null}
            onClick={() => {
              // Hook to your booking route; keep auth later.
              const params = new URLSearchParams({
                depId: String(selectedDeparture.id),
                adults: String(adults),
                children: String(children),
              });
              window.location.href = `/booking/start?${params.toString()}`;
            }}
          >
            Proceed to Book
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-500 text-center">Select an available date to see price.</p>
      )}
    </div>
  );
}
