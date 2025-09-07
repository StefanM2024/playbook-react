import React from "react";

type StatsDto = {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
};

type PlayerDto = {
  id: string;
  name: string;
  country: string;       // e.g., "England"
  overallRating: number; // e.g., 99
  position: string;      // e.g., "Striker" or "ST"
  stats: StatsDto;
  photoKey?: string | null; // if you have image URLs later
};

type Props = {
  player: PlayerDto;
  width?: number | string;          // CSS width (e.g., 320 or "20rem")
  backgroundSrc?: string;           // optional override for the card background
  headshotUrl?: string | null;      // optional direct URL for avatar/headshot
};

// (Optional) map your Position string to short code on the card
const positionToShort = (pos: string) => {
  const map: Record<string, string> = {
    Goalkeeper: "GK",
    RightBack: "RB",
    CenterBack: "CB",
    LeftBack: "LB",
    DefensiveMidfielder: "CDM",
    CentralMidfielder: "CM",
    AttackingMidfielder: "CAM",
    RightWinger: "RW",
    LeftWinger: "LW",
    Striker: "ST",
  };
  return map[pos] ?? pos?.toUpperCase()?.slice(0, 3);
};

// (Optional) “nice” ISO mapping for flag-icons
// flag-icons uses iso2, e.g. 'gb' for UK; it also supports 'gb-eng' for England specifically.
// Adjust/add as you need.
const countryToFlagCode = (country: string) => {
  const map: Record<string, string> = {
    England: "gb-eng",
    Scotland: "gb-sct",
    Wales: "gb-wls",
    United_Kingdom: "gb",
    UK: "gb",
    Croatia: "hr",
    Romania: "ro",
    // add more as needed
  };
  // fallback: try country name to ISO2 manually if you like; default to 'un' (UN flag)
  return map[country] ?? "un";
};

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  letterSpacing: "0.03em",
  textShadow: "0 1px 2px rgba(0,0,0,.6)",
};

const valueStyle: React.CSSProperties = {
  fontWeight: 800,
  textShadow: "0 2px 4px rgba(0,0,0,.7)",
};

const PlayerCard: React.FC<Props> = ({
  player,
  width = 320,
  backgroundSrc,
  headshotUrl,
}) => {
  const POS = positionToShort(player.position);
  const flagCode = countryToFlagCode(player.country);

  // use provided headshotUrl first, else (future) photoKey mapping, else a placeholder
  const photo =
    headshotUrl ??
    (player.photoKey ? player.photoKey : null);

  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        aspectRatio: "420 / 606", // keeps the same proportions as your example
        position: "relative",
        userSelect: "none",
        fontFamily:
          "'Bebas Neue', 'Impact', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* Background */}
      <img
        src={backgroundSrc ?? "/cards-silver.png"} 
        alt="card background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      {/* Big overall rating (top-left) */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "8%",
          color: "white",
          fontSize: "clamp(28px, 9vw, 44px)",
          ...valueStyle,
        }}
      >
        {player.overallRating}
      </div>

      {/* Position (under overall) */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "18%",
          color: "white",
          fontSize: "clamp(14px, 4vw, 22px)",
          ...labelStyle,
        }}
      >
        {POS}
      </div>

      {/* Country flag (small square) */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "26%",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
        title={player.country}
      >
        {/* flag-icons uses .fi and .fi-<code> */}
        <span
          className={`fi fi-${flagCode}`}
          style={{ width: "28px", height: "20px", boxShadow: "0 1px 2px rgba(0,0,0,.6)" }}
        />
      </div>

      {/* Headshot / silhouette circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "33%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          aspectRatio: "1 / 1",
          borderRadius: "9999px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,.35)",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,.25), rgba(0,0,0,.2))",
          display: "grid",
          placeItems: "center",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={player.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          /* Minimal placeholder silhouette */
          <svg viewBox="0 0 128 128" width="100%" height="100%">
            <circle cx="64" cy="44" r="28" fill="rgba(255,255,255,.75)" />
            <rect x="24" y="76" width="80" height="44" rx="22" fill="rgba(255,255,255,.75)" />
          </svg>
        )}
      </div>

      {/* Name (centered lower area) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "66%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "clamp(16px, 5vw, 26px)",
          textTransform: "uppercase",
          textAlign: "center",
          width: "86%",
          ...valueStyle,
        }}
        title={player.name}
      >
        {player.name}
      </div>

      {/* Stats grid (two columns) */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          bottom: "8%",
          color: "white",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "6px",
          columnGap: "12px",
          fontSize: "clamp(12px, 3.8vw, 18px)",
          fontWeight: 700,
          textShadow: "0 1px 2px rgba(0,0,0,.6)",
        }}
      >
        {/* Left column */}
        <div style={{ display: "grid", rowGap: "6px" }}>
          <div><span style={valueStyle}>{player.stats.pace}</span> <span style={labelStyle}>PAC</span></div>
          <div><span style={valueStyle}>{player.stats.shooting}</span> <span style={labelStyle}>SHO</span></div>
          <div><span style={valueStyle}>{player.stats.passing}</span> <span style={labelStyle}>PAS</span></div>
        </div>

        {/* Right column */}
        <div style={{ display: "grid", rowGap: "6px" }}>
          <div><span style={valueStyle}>{player.stats.dribbling}</span> <span style={labelStyle}>DRI</span></div>
          <div><span style={valueStyle}>{player.stats.defending}</span> <span style={labelStyle}>DEF</span></div>
          <div><span style={valueStyle}>{player.stats.physical}</span> <span style={labelStyle}>PHY</span></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
