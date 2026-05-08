import { getUserById } from '../data';
import VerifiedBadge from '../components/VerifiedBadge';
import { ArrowLeft, MapPin, Phone, Share2 } from 'lucide-react';

interface Props {
  prestadorId: number;
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function PrestadorDetailScreen({ prestadorId, onBack, onToast }: Props) {
  const p = getUserById(prestadorId);
  if (!p) return null;

  return (
    <div className="page-slide-left">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Perfil</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="profile-header">
        <div className={`avatar avatar-lg ${p.avatarClass}`} style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}>{p.initials}</div>
        <h2 className="text-xl font-bold mt-3" style={{ position: 'relative', zIndex: 1 }}>{p.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <VerifiedBadge verified={p.verified} />
          {p.premium && <span className="badge badge-premium">Premium</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '8px', position: 'relative', zIndex: 1 }}>
          <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
          <span className="text-sm text-secondary">{p.bairro}, {p.cidade}</span>
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-value">{p.avaliacao}</div>
            <div className="profile-stat-label">Avaliação</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{p.avaliacoesCount}</div>
            <div className="profile-stat-label">Serviços</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{p.servicos.length}</div>
            <div className="profile-stat-label">Especialidades</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Sobre</h3>
        <p className="text-sm text-secondary" style={{ lineHeight: 1.7 }}>{p.bio || 'Sem descrição.'}</p>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Serviços oferecidos</h3>
        <div className="service-tags">
          {p.servicos.map(s => <span key={s} className="badge badge-service">{s}</span>)}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Validação do prestador</h3>
        <div className="verify-list">
          <div className="verify-item"><div className="verify-icon">✓</div><span className="text-sm">Foto obrigatória e visível no perfil</span></div>
          <div className="verify-item"><div className="verify-icon">✓</div><span className="text-sm">Bairro confirmado manualmente pela equipe</span></div>
          <div className="verify-item"><div className="verify-icon">✓</div><span className="text-sm">Telefone verificado via código SMS</span></div>
          <div className="verify-item"><div className="verify-icon">✓</div><span className="text-sm">Documento validado antes da ativação</span></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button className="btn btn-primary flex-1" onClick={() => onToast('Em breve: contato direto via WhatsApp!', 'info')}>
          <Phone size={20} /> Entrar em contato
        </button>
        <button className="btn btn-outline" style={{ width: '56px', padding: 0 }} onClick={() => onToast('Link copiado!', 'success')}>
          <Share2 size={20} />
        </button>
      </div>
      <p className="text-xs text-center text-secondary mt-2">Telefone: {p.telefone}</p>
    </div>
  );
}
