import { useState } from "react";
import { MapPin, LocateFixed, X } from "lucide-react";

const LocationModal = ({ isOpen, onClose, onSave }) => {
  const [manualLocation, setManualLocation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported in this browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const address = data.address;
          const detectedLocation =
            address.city ||
            address.town ||
            address.village ||
            address.state ||
            "Current Location";

          localStorage.setItem("selectedLocation", detectedLocation);
          localStorage.setItem(
            "userCoordinates",
            JSON.stringify({ latitude, longitude })
          );

          onSave(detectedLocation);
          setLoading(false);
          onClose();
        } catch (error) {
          setLoading(false);
          alert("Unable to fetch location name");
        }
      },
      () => {
        alert("Unable to detect location. Please allow location permission.");
        setLoading(false);
      }
    );
  };

  const saveManualLocation = () => {
    if (!manualLocation.trim()) return;

    localStorage.setItem("selectedLocation", manualLocation);
    onSave(manualLocation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl bg-[#0b1220] border border-white/10 p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Choose Location
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select your delivery location to find nearby restaurants.
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <button
          onClick={detectLocation}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] py-4 font-bold flex items-center justify-center gap-2 transition disabled:opacity-70"
        >
          <LocateFixed size={18} />
          {loading ? "Detecting..." : "Detect Current Location"}
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff7a00]"
          />

          <input
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="Enter city, area or address"
            className="w-full rounded-2xl bg-[#111827] border border-white/10 pl-12 pr-4 py-4 text-white outline-none focus:border-[#ff7a00]"
          />
        </div>

        <button
          onClick={saveManualLocation}
          className="mt-4 w-full rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 py-4 font-bold transition"
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default LocationModal;