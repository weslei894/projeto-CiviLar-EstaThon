import { CheckCircle, Users, Shield } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: Props) {
  return (
    <div className="welcome-screen">
      <div style={{ 
        width: '160px', 
        height: '160px', 
        borderRadius: '50%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        boxShadow: '0 16px 48px rgba(42,161,138,0.4)'
      }}>
        <img 
          src="/logo-civilar.png?v=2" 
          alt="CiviLar" 
          style={{ 
            width: '120px', 
            height: '120px', 
            objectFit: 'contain' 
          }} 
        />
      </div>
      <h1>CiviLar</h1>
      <p>O bairro resolve o bairro. Conectando moradores para troca de serviços com confiança e validação.</p>

      <div className="welcome-features">
        <div className="welcome-feature">
          <div className="welcome-feature-icon"><CheckCircle size={22} color="var(--primary)" /></div>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Validado</span>
        </div>
        <div className="welcome-feature">
          <div className="welcome-feature-icon"><Users size={22} color="var(--primary)" /></div>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Comunitário</span>
        </div>
        <div className="welcome-feature">
          <div className="welcome-feature-icon"><Shield size={22} color="var(--primary)" /></div>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Seguro</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
        <button className="btn btn-primary" onClick={onEnter}>
          ENTRAR
        </button>
      </div>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', marginTop: '24px' }}>Projeto FIAP · EstaTHon 2026</p>
    </div>
  );
}
