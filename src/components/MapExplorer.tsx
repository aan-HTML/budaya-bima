"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowLeft,
  Landmark,
  Layers,
  Search,
  UtensilsCrossed,
  Mountain,
  MapPin,
  X,
  Plus,
  Minus,
} from "lucide-react";

type Location = {
  id: number;
  name: string;
  category: "sejarah" | "tenun" | "kuliner" | "alam";
  coords: [number, number];
  desc: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Museum Asi Mbojo",
    category: "sejarah",
    coords: [-8.4606, 118.7265],
    desc: "Istana Kesultanan Bima yang kini menjadi museum budaya.",
  },
  {
    id: 2,
    name: "Desa Ntobo",
    category: "tenun",
    coords: [-8.44000, 118.83000],
    desc: "Pusat penghasil kain tenun Tembe Nggoli terbaik di Bima.",
  },
  {
    id: 3,
    name: "Pantai Lawata",
    category: "alam",
    coords: [-8.485, 118.731],
    desc: "Pantai ikonik di tepi Kota Bima dengan pemandangan teluk.",
  },
  {
    id: 4,
    name: "Desa Maria Wawo",
    category: "tenun",
    coords: [-8.58, 118.82],
    desc: "Desa adat penghasil kerajinan dan tenun tradisional.",
  },
  {
    id: 5,
    name: "Gunung Tambora",
    category: "alam",
    coords: [-8.25, 117.996],
    desc: "Gunung berapi legendaris, lokasi letusan terdahsyat 1815.",
  },
  {
    id: 6,
    name: "Pasar Raya Bima",
    category: "kuliner",
    coords: [-8.462, 118.724],
    desc: "Pusat kuliner otentik Bima, temukan Uta Palumara dan Mina Sarua.",
  },
  {
    id: 7,
    name: "Istana Dalam Loka",
    category: "sejarah",
    coords: [-8.82, 117.53],
    desc: "Istana kayu Kesultanan Sumbawa, warisan arsitektur Nusantara.",
  },
];

const CATEGORY_COLORS: Record<Location["category"], string> = {
  sejarah: "#d4af37",
  tenun: "#a855f7",
  kuliner: "#f97316",
  alam: "#22c55e",
};

const CATEGORY_BADGE_STYLES: Record<Location["category"], { bg: string; text: string }> = {
  sejarah: { bg: "#1a1400", text: "#d4af37" },
  tenun: { bg: "#1a0a2e", text: "#a855f7" },
  kuliner: { bg: "#1a0a00", text: "#f97316" },
  alam: { bg: "#001a0a", text: "#22c55e" },
};

const categoryStyles: Record<Location["category"], { dot: string; iconBg: string; badgeBg: string; badgeColor: string }> = {
  sejarah: { dot: "#d4af37", iconBg: "#1a1400", badgeBg: "#1a1400", badgeColor: "#d4af37" },
  tenun: { dot: "#a855f7", iconBg: "#1a0a2e", badgeBg: "#1a0a2e", badgeColor: "#a855f7" },
  kuliner: { dot: "#f97316", iconBg: "#1a0a00", badgeBg: "#1a0a00", badgeColor: "#f97316" },
  alam: { dot: "#22c55e", iconBg: "#001a0a", badgeBg: "#001a0a", badgeColor: "#22c55e" },
};

const CATEGORY_ICONS = {
  sejarah: Landmark,
  tenun: Layers,
  kuliner: UtensilsCrossed,
  alam: Mountain,
};

const INLINE_SVGS: Record<Location["category"], (color: string) => string> = {
  sejarah: (color) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2L2 7h20z"/></svg>`,
  tenun: (color) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  kuliner: (color) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
  alam: (color) => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>`,
};

function createDotIcon(dotColor: string, muted = false) {
  const opacity = muted ? 0.5 : 1;
  const html = `<div style="opacity:${opacity};width:14px;height:14px;border-radius:50%;background:${dotColor};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5);cursor:pointer;"></div>`;
  return L.divIcon({ html, className: "", iconSize: [14, 14], iconAnchor: [7, 7] });
}

function createPinCardIcon(loc: Location, isMobile: boolean) {
  const { dot, iconBg, badgeBg, badgeColor } = categoryStyles[loc.category];
  const svgIcon = INLINE_SVGS[loc.category](badgeColor);
  const width = isMobile ? 160 : 175;
  const anchorX = isMobile ? 80 : 87;
  const totalHeight = isMobile ? 220 : 225;
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
      <div style="background:#111;border:1px solid #d4af37;border-radius:12px;width:${width}px;padding:10px 12px;box-shadow:0 8px 28px rgba(0,0,0,0.7);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
          <div style="width:28px;height:28px;border-radius:8px;background:${iconBg};display:flex;align-items:center;justify-content:center;">${svgIcon}</div>
          <div class=\"pin-close\" data-id=\"${loc.id}\" style="width:18px;height:18px;background:#1e1e1e;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#555;font-size:10px;">✕</div>
        </div>
        <div style="color:#e5e5e5;font-size:12px;font-weight:700;line-height:1.3;margin-bottom:5px;">${loc.name}</div>
        <div style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:9px;font-weight:600;background:${badgeBg};color:${badgeColor};margin-bottom:7px;">${svgIcon} ${loc.category}</div>
        <div style="height:1px;background:#222;margin-bottom:7px;"></div>
        <div style="color:#888;font-size:9px;line-height:1.5;margin-bottom:6px;">${loc.desc}</div>
        <div style="display:flex;align-items:center;gap:4px;padding-top:6px;border-top:1px solid #1e1e1e;">
          <span style="color:#444;font-size:8px;font-family:monospace;">${loc.coords[0].toFixed(4)}, ${loc.coords[1].toFixed(4)}</span>
        </div>
      </div>
      <div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #d4af37;"></div>
      <div style="width:2px;height:16px;background:#d4af37;"></div>
      <div style="width:16px;height:16px;border-radius:50%;background:${dot};border:2.5px solid #d4af37;box-shadow:0 2px 8px rgba(0,0,0,0.5);"></div>
    </div>
  `;
  return L.divIcon({ html, className: "", iconSize: [width, totalHeight], iconAnchor: [anchorX, totalHeight] });
}

function MapBridge({ onMapReady, onMapClick }: { onMapReady: (map: L.Map) => void; onMapClick: () => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  useMapEvents({ click: () => onMapClick() });
  return null;
}

export default function MapExplorer({ onClose }: { onClose: () => void }) {
  const mapRef = useRef<L.Map | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [activeFilter, setActiveFilter] = useState<"semua" | Location["category"]>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const filteredLocations = useMemo(
    () =>
      locations.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeFilter === "semua" || item.category === activeFilter;
        return matchesQuery && matchesCategory;
      }),
    [activeFilter, searchQuery]
  );

  const selectedCount = filteredLocations.length;

  useEffect(() => {
    if (selectedId === null) return;
    const card = cardRefs.current[selectedId];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedId]);

  useEffect(() => {
    const updateMobile = () => setIsMobileView(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.classList.contains("pin-close")) return;
      event.stopPropagation();
      setSelectedId(null);
    };

    document.querySelectorAll<HTMLElement>(".pin-close").forEach((el) => el.addEventListener("click", handler));
    return () => {
      document.querySelectorAll<HTMLElement>(".pin-close").forEach((el) => el.removeEventListener("click", handler));
    };
  }, [selectedId]);

  function handleMapReady(map: L.Map) {
    mapRef.current = map;
    window.setTimeout(() => {
      map.invalidateSize();
    }, 120);
  }

  function closePopup() {
    setSelectedId(null);
  }

  function handleMarkerClick(e: L.LeafletMouseEvent, loc: Location) {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(loc.coords as L.LatLngExpression, 13, { duration: 0.7 });
    setSelectedId(loc.id);
  }

  function handleCardSelect(loc: Location) {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(loc.coords as L.LatLngExpression, 13, { duration: 0.7 });
    setSelectedId(loc.id);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        {isMobileView ? (
          <div className="relative z-[1001] flex flex-col h-[100dvh] w-full overflow-hidden bg-[#0d0d0d]">
            <div className="flex-shrink-0 flex items-center gap-2.5 border-b border-[#222] bg-[#111] px-3.5 py-2.5">
            <button
              type="button"
              aria-label="Kembali"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-[#aaa]"
            >
              <ArrowLeft size={13} />
            </button>
            <div className="flex flex-1 min-w-0 items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-[6px]">
              <Search size={11} className="text-[#555]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi budaya..."
                className="w-full bg-transparent border-none outline-none text-[10px] text-[#e5e5e5] placeholder:text-[#444]"
              />
            </div>
            <button
              type="button"
              aria-label="Tutup"
              onClick={onClose}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-[#666]"
            >
              <X size={12} />
            </button>
          </div>
          <div className="flex-shrink-0 border-b border-[#1a1a1a] bg-[#0d0d0d] px-3 py-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5">
              {(["semua", "sejarah", "tenun", "kuliner", "alam"] as const).map((cat) => {
                const isActive = activeFilter === cat;
                const Icon = cat !== "semua" ? CATEGORY_ICONS[cat] : null;
                const color = cat === "semua" ? "#d4af37" : CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`flex items-center gap-1 rounded-full border px-[10px] py-[4px] text-[10px] font-semibold transition ${
                      isActive ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-transparent"
                    }`}
                    style={isActive ? undefined : { borderColor: color, color }}
                  >
                    {Icon ? <Icon size={12} /> : null}
                    {cat === "semua" ? "Semua" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex-1 min-h-0 overflow-hidden bg-[#0d0d0d]">
            <MapContainer center={[-8.4606, 118.7265]} zoom={10} zoomControl={false} className="w-full h-full">
              <MapBridge onMapReady={handleMapReady} onMapClick={closePopup} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredLocations.map((loc) => {
                const isSelected = selectedId === loc.id;
                const styles = categoryStyles[loc.category];
                const icon = isSelected ? createPinCardIcon(loc, true) : createDotIcon(styles.dot, selectedId !== null);
                return (
                  <Marker
                    key={loc.id}
                    position={loc.coords as L.LatLngExpression}
                    icon={icon}
                    eventHandlers={{ click: (e) => handleMarkerClick(e as any, loc) }}
                  />
                );
              })}
            </MapContainer>

            <div className="absolute right-2.5 top-1/2 z-[1001] -translate-y-1/2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => mapRef.current?.zoomIn()}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#2a2a2a] bg-[rgba(13,13,13,0.9)] text-[#bbb]"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => mapRef.current?.zoomOut()}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#2a2a2a] bg-[rgba(13,13,13,0.9)] text-[#bbb]"
              >
                <Minus size={14} />
              </button>
            </div>

            <div className="absolute left-2.5 bottom-2.5 z-[1001] rounded-lg border border-[#222] bg-[rgba(13,13,13,0.92)] px-2.5 py-2 flex flex-col gap-1 text-[9px] text-[#aaa]">
              {(["sejarah", "tenun", "kuliner", "alam"] as Location["category"][]).map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <span style={{ width: 7, height: 7, background: CATEGORY_COLORS[c], borderRadius: 999 }} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-[#222] bg-[#111] rounded-t-[16px]">
            <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-[#333]" />
            <div className="flex items-center justify-between border-b border-[#1e1e1e] px-3.5 py-2">
              <span className="text-[9px] uppercase tracking-widest text-[#555] font-semibold">LOKASI BUDAYA</span>
              <span className="text-[9px] font-semibold text-[#d4af37]">{filteredLocations.length} lokasi</span>
            </div>
            <div className="flex gap-2 px-3 pb-3.5 pt-2 overflow-x-auto scrollbar-hide">
              {filteredLocations.map((loc) => {
                const isActive = selectedId === loc.id;
                const Icon = CATEGORY_ICONS[loc.category];
                return (
                  <div
                    key={loc.id}
                    ref={(el) => {
                      cardRefs.current[loc.id] = el;
                    }}
                    onClick={() => handleCardSelect(loc)}
                    className={`flex-shrink-0 w-[120px] cursor-pointer rounded-xl border p-2.5 transition ${
                      isActive ? "border-[#d4af37] bg-[#1a1600]" : "border-[#2a2a2a] bg-[#161616]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[#111]">
                        <Icon size={12} className="text-[#ccc]" />
                      </div>
                      <div className="text-[10px] font-semibold leading-[1.2] text-[#e5e5e5] truncate">{loc.name}</div>
                    </div>
                    <div
                      className="mt-2 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-semibold"
                      style={{
                        background: CATEGORY_BADGE_STYLES[loc.category].bg,
                        color: CATEGORY_BADGE_STYLES[loc.category].text,
                      }}
                    >
                      {loc.category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        ) : (
          <div className="relative flex h-[90vh] max-h-[700px] w-full max-w-[1600px] flex-col overflow-hidden rounded-3xl border border-[#222] bg-[#0d0d0d] shadow-2xl">
            <div className="flex items-center gap-3 bg-[#111] border-b border-[#1e1e1e] px-4 h-[52px] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] text-[#d4af37]">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-lg font-semibold text-[#d4af37]">Peta Budaya Bima</div>
              </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-[260px] mx-auto">
              <div className="flex w-full items-center gap-2 rounded-[20px] border border-[#2a2a2a] bg-[#1a1a1a] px-3 text-[#ccc] h-[34px] focus-within:border-[#d4af37]">
                <Search size={13} className="text-[#555]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari lokasi..."
                  className="w-full bg-transparent border-none outline-none text-[#ccc] text-[12px] placeholder:text-[#444]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#666]">{selectedCount} lokasi ditemukan</span>
              <button
                aria-label="Tutup peta"
                onClick={onClose}
                className="z-[1002] inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1e1e1e] border border-[#333] text-[#888] transition hover:bg-[#252525]"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex gap-2 bg-[#111] border-b border-[#1e1e1e] px-4 py-2 flex-shrink-0 overflow-x-auto">
            {(["semua", "sejarah", "tenun", "kuliner", "alam"] as const).map((cat) => {
              const isActive = activeFilter === cat;
              const Icon = cat !== "semua" ? CATEGORY_ICONS[cat] : null;
              const color = cat === "semua" ? "#d4af37" : CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-transparent"
                  }`}
                  style={isActive ? undefined : { borderColor: color, color }}
                >
                  {Icon ? <Icon size={14} /> : null}
                  {cat === "semua" ? "Semua" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 relative overflow-hidden bg-[#0d0d0d]">
  
              <div className="absolute inset-0">
                <MapContainer
                  center={[-8.4606, 118.7265]}
                  zoom={10}
                  zoomControl={false}
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                >
                  <MapBridge onMapReady={handleMapReady} onMapClick={closePopup} />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {filteredLocations.map((loc) => {
                    const isSelected = selectedId === loc.id;
                    const styles = categoryStyles[loc.category];
                    const icon = isSelected
                      ? createPinCardIcon(loc, false)
                      : createDotIcon(styles.dot, selectedId !== null);
                    return (
                      <Marker
                        key={loc.id}
                        position={loc.coords as L.LatLngExpression}
                        icon={icon}
                        eventHandlers={{ click: (e) => handleMarkerClick(e as any, loc) }}
                      />
                    );
                  })}
                </MapContainer>
              </div>

              <div className="absolute top-3 right-3 z-[1001] flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => mapRef.current?.zoomIn()}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#0d0d0d] border border-[#2a2a2a] text-[#ccc] hover:bg-[#161616]"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => mapRef.current?.zoomOut()}
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#0d0d0d] border border-[#2a2a2a] text-[#ccc] hover:bg-[#161616]"
                >
                  <Minus size={16} />
                </button>
              </div>

              <div className="hidden md:block absolute left-3 bottom-3 z-[1001] rounded-lg border border-[#222] bg-[#0d0d0d]/95 px-3 py-2 text-sm text-[#aaa]">
                <div className="space-y-2">
                  {(["sejarah", "tenun", "kuliner", "alam"] as Location["category"][]).map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <span style={{ width: 10, height: 10, background: CATEGORY_COLORS[c], borderRadius: 999 }} />
                      <span className="capitalize">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex w-[200px] flex-shrink-0 bg-[#111] border-l border-[#1e1e1e] flex flex-col">
              <div className="px-4 py-3 border-b border-[#1e1e1e] flex items-center justify-between flex-shrink-0">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#555]">LOKASI BUDAYA</span>
                <span className="text-[10px] font-bold text-[#d4af37]">{selectedCount} lokasi</span>
              </div>
              <div className="overflow-y-auto flex-1 px-4 py-3">
                <div className="space-y-2">
                  {filteredLocations.length === 0 ? (
                    <div className="text-center text-[#555] text-[12px] py-8">Tidak ada lokasi ditemukan</div>
                  ) : (
                    filteredLocations.map((loc) => {
                      const isActive = selectedId === loc.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => handleCardSelect(loc)}
                          className={`group w-full rounded-xl p-3 text-left transition ${
                            isActive ? "bg-[#1a1600]" : "bg-transparent hover:bg-[#161616]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span style={{ width: 10, height: 10, background: CATEGORY_COLORS[loc.category], borderRadius: 999 }} />
                              <span className="text-[12px] font-semibold text-[#e5e5e5]">{loc.name}</span>
                            </div>
                            <span style={{ color: CATEGORY_COLORS[loc.category] }} className="text-[10px] font-semibold uppercase">
                              {loc.category}
                            </span>
                          </div>
                          {isActive && <p className="mt-2 text-[10px] leading-[1.4] text-[#aaa]">{loc.desc}</p>}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        )}

        <style jsx global>{`
          .leaflet-popup-content-wrapper {
            display: none !important;
          }
          .leaflet-tooltip {
            display: none !important;
          }
          .leaflet-control-zoom {
            display: none !important;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
