import { useEffect } from 'react';

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src="/logo-civilar.png?v=2" alt="CiviLar" style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '24px', filter: 'drop-shadow(0 8px 24px rgba(42,161,138,0.3))' }} />
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white' }}>CiviLar</h1>
      <p className="splash-tagline">O bairro resolve o bairro.</p>
    </div>
  );
}
