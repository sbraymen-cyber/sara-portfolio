import { useState } from 'react';

export default function VideoBackground({ src = '/hero-bg.mp4' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.8s ease',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Light overlay — text stays readable, mountains stay visible */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,24,22,0.18) 0%, rgba(26,24,22,0.35) 45%, rgba(26,24,22,0.85) 80%, rgba(26,24,22,1) 100%)',
      }} />

      {/* Left vignette only — protects text, leaves right side open */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(26,24,22,0.65) 0%, rgba(26,24,22,0.2) 45%, transparent 70%)',
      }} />
    </div>
  );
}
