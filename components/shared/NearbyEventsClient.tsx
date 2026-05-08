"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, LocateFixed, Loader2, X, Search } from "lucide-react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type Props = {
  currentCity: string;
  totalEvents: number;
};

type GeoState = "idle" | "locating" | "geocoding" | "error";

export default function NearbyEventsClient({ currentCity, totalEvents }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [manualCity, setManualCity] = useState("");

  // Reset manual input when URL city changes
  useEffect(() => {
    setManualCity(currentCity);
  }, [currentCity]);

  const navigateToCity = (city: string) => {
    const url = formUrlQuery({
      params: searchParams.toString(),
      key: "city",
      value: city,
    });
    // Always reset page when city changes
    router.push(url.replace(/&?page=\d+/, ""), { scroll: false });
  };

  const clearCity = () => {
    const url = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["city", "page"],
    });
    router.push(url, { scroll: false });
    setManualCity("");
    setGeoState("idle");
    setGeoError(null);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoState("locating");
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setGeoState("geocoding");
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { headers: { "User-Agent": "VibeClub/1.0 (event-platform)" } }
          );
          if (!res.ok) throw new Error("Geocoding failed");
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            data.address?.state;

          if (!city) throw new Error("Could not determine city from coordinates.");
          setGeoState("idle");
          navigateToCity(city);
        } catch {
          setGeoState("error");
          setGeoError("Couldn't resolve your location. Try searching manually.");
        }
      },
      (err) => {
        setGeoState("error");
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError("Location permission denied. Please search manually.");
        } else {
          setGeoError("Unable to retrieve location. Try searching manually.");
        }
      },
      { timeout: 10000 }
    );
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualCity.trim();
    if (trimmed) navigateToCity(trimmed);
  };

  const isLocating = geoState === "locating" || geoState === "geocoding";

  return (
    <div className="flex flex-col gap-5">
      {/* City search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={handleManualSearch}
          className="flex-1 flex gap-2 items-center bg-white dark:bg-slate-800/80 border border-grey-400/20 dark:border-slate-700 rounded-full px-4 py-2 min-h-[54px]"
        >
          <Search className="h-5 w-5 text-grey-400 shrink-0" />
          <Input
            type="text"
            placeholder="Enter city or area (e.g. Mumbai, Delhi)"
            value={manualCity}
            onChange={(e) => setManualCity(e.target.value)}
            className="border-0 bg-transparent p-regular-16 placeholder:text-grey-400 dark:placeholder:text-grey-500 dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {manualCity && (
            <button
              type="button"
              onClick={clearCity}
              className="text-grey-400 hover:text-grey-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button
            type="submit"
            size="sm"
            className="rounded-full px-4 shrink-0 dark:text-white"
            disabled={!manualCity.trim()}
          >
            Search
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={detectLocation}
          disabled={isLocating}
          className="button shrink-0 gap-2 dark:border-slate-600 dark:text-white sm:w-fit"
        >
          {isLocating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {geoState === "locating" ? "Locating…" : "Resolving…"}
            </>
          ) : (
            <>
              <LocateFixed className="h-4 w-4" />
              Detect My Location
            </>
          )}
        </Button>
      </div>

      {/* Error message */}
      {geoError && (
        <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1.5">
          <X className="h-4 w-4" />
          {geoError}
        </p>
      )}

      {/* Active city badge */}
      {currentCity && (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-primary-500/10 dark:bg-primary-500/20 text-primary-500 rounded-full px-4 py-1.5 text-sm font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {currentCity}
            <button
              onClick={clearCity}
              className="ml-1 hover:text-primary-500/60 transition-colors"
              aria-label="Clear city filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="text-sm text-grey-500 dark:text-grey-400">
            {totalEvents === 0
              ? "No events found in this area"
              : `${totalEvents} event${totalEvents !== 1 ? "s" : ""} found`}
          </p>
        </div>
      )}
    </div>
  );
}
