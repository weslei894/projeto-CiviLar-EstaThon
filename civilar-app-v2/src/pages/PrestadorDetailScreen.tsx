import { getUserById } from '../data';
import VerifiedBadge from '../components/VerifiedBadge';
import { ArrowLeft, MapPin, MessageCircle, Share2 } from 'lucide-react';

interface Props {
  prestadorId: number;
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onChatStart: (prestadorId: number) => void;
}

export default function PrestadorDetailScreen({ prestadorId, onBack, onToast, onChatStart }: Props) {
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
          {p.premium && <span className="badge badge-premium">CiviRei</span>}
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
        <div className="card mt-3" style={{ background: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="text-sm" style={{ color: 'black', fontWeight: 500, lineHeight: 1.6 }}>
            "Profissional dedicado com mais de 10 anos de experiência, sempre entregando qualidade e confiança em cada serviço."
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Serviços oferecidos</h3>
        <div className="service-tags">
          {p.servicos.map(s => <span key={s} className="badge badge-service">{s}</span>)}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Serviços realizados</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
                src={`https://picsum.photos/seed/${prestadorId}-${i}/200/200.jpg`}
                alt={`Serviço ${i}`}
                style={{ width: '100%', aspectRatio: 1, objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '8px', 
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                borderRadius: '0 0 8px 8px'
              }}>
                <div className="text-xs text-white">Serviço {i}</div>
              </div>
            </div>
          ))}
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
        <button 
          className="btn btn-primary flex-1" 
          onClick={() => onChatStart(prestadorId)}
        >
          <MessageCircle size={20} /> Chat
        </button>
        <button className="btn btn-outline" style={{ width: '56px', padding: 0 }} onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          onToast('Link copiado!', 'success');
        }}>
          <Share2 size={20} />
        </button>
      </div>
      <p className="text-xs text-center text-secondary mt-2">Telefone: {p.telefone}</p>
    </div>
  );
}
