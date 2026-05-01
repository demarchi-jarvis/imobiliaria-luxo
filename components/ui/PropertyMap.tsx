"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  neighborhood: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Dark luxury Mapbox style
const MAP_STYLE = "mapbox://styles/mapbox/dark-v11";

export default function PropertyMap({ lat, lng, title, neighborhood }: PropertyMapProps) {
  const mapRef     = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [loaded, setLoaded]   = useState(false);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapRef.current || mapInstance.current) return;

    let map: any = null;

    import("mapbox-gl").then((mapboxgl) => {
      const lib = mapboxgl.default ?? mapboxgl;
      lib.accessToken = MAPBOX_TOKEN;

      map = new lib.Map({
        container: mapRef.current!,
        style:     MAP_STYLE,
        center:    [lng, lat],
        zoom:      15,
        interactive: true,
        attributionControl: false,
      });

      // Custom gold marker
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.cssText = `
        width: 48px; height: 48px;
        background: rgba(12, 10, 9, 0.9);
        border: 2px solid #C5A059;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 24px rgba(197, 160, 89, 0.4);
        cursor: pointer;
      `;
      const inner = document.createElement("div");
      inner.style.cssText = `
        width: 12px; height: 12px;
        background: #C5A059;
        border-radius: 50%;
        transform: rotate(45deg);
      `;
      el.appendChild(inner);

      new lib.Marker({ element: el, anchor: "bottom-left" })
        .setLngLat([lng, lat])
        .addTo(map);

      map.on("load", () => {
        // Subtle custom layer tint
        map.setPaintProperty("land", "background-color", "#0C0A09");
        setLoaded(true);
      });

      mapInstance.current = map;
    }).catch(() => setError(true));

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lng]);

  // Fallback for missing token
  if (!MAPBOX_TOKEN || error) {
    return (
      <div className="relative h-72 bg-stone-900 border border-stone-800 flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 border border-gold-400/30 flex items-center justify-center">
          <MapPin size={22} strokeWidth={1.0} className="text-gold-400" />
        </div>
        <div className="text-center">
          <p className="font-display text-lg text-stone-200">{neighborhood}</p>
          <p className="font-sans text-xs text-stone-500 mt-1 tracking-wide">{title}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(neighborhood + ', Rio de Janeiro')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 border border-stone-700 hover:border-gold-400/50 text-stone-400 hover:text-gold-400 transition-all duration-300 font-sans text-xs tracking-[0.15em] uppercase"
        >
          <Navigation size={13} strokeWidth={1.25} />
          Ver no Google Maps
        </a>
        <p className="absolute bottom-2 left-3 font-sans text-[10px] text-stone-700">
          Configure NEXT_PUBLIC_MAPBOX_TOKEN para mapa interativo
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 z-10 skeleton flex items-center justify-center">
          <MapPin size={24} strokeWidth={1.25} className="text-gold-400/40 animate-pulse_slow" />
        </div>
      )}
      <div
        ref={mapRef}
        className="h-72 w-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}
        aria-label={`Mapa da localização: ${neighborhood}`}
      />

      {/* Overlay badge */}
      <div className="absolute bottom-3 left-3 glass border border-stone-700/60 px-3 py-2 flex items-center gap-2">
        <MapPin size={13} strokeWidth={1.25} className="text-gold-400" />
        <span className="font-sans text-xs text-stone-300">{neighborhood}</span>
      </div>
    </div>
  );
}
