import ProviderCard from '../components/ProviderCard';
import { categorias, getPrestadores, bairros } from '../data';
import { MapPin, Star, ChevronRight, BarChart2, ClipboardList } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
  onShowPrestador: (id: number) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  userRole?: 'prestador' | 'solicitante' | 'ambos';
  userBairro?: string;
}

export default function HomeScreen({ onNavigate, onShowPrestador, onToast, userRole, userBairro }: Props) {
  const allProviders = getPrestadores(userBairro || null);
  // CiviRei (premium) first, then the rest
  const destaques = [
    ...allProviders.filter(p => p.premium),
    ...allProviders.filter(p => !p.premium),
  ].slice(0, 5);

  const isPrestador = userRole === 'prestador' || userRole === 'ambos';
  const isSolicitante = userRole === 'solicitante' || userRole === 'ambos';

  return (
    <div className="page-section">
      <div className="app-header">
        <div className="logo">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <img src="/logo-civilar.png?v=2" alt="CiviLar" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <h1>CiviLar</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
          <MapPin size={16} />
          <span>{userBairro || 'Vila Mariana'}, SP</span>
        </div>
      </div>

      <div className="card hero-card" style={{ marginTop: '16px' }}>
        <h2 className="text-xl font-bold mb-2">
          {isPrestador ? 'Gerencie seus serviços' : 'Encontre prestadores perto de você'}
        </h2>
        <p className="text-sm" style={{ opacity: 0.9 }}>
          {isPrestador
            ? 'Ofereça seus serviços para o bairro. Todos validados pela nossa equipe.'
            : 'Prestadores de confiança no seu bairro. Todos verificados pelo CiviLar.'}
        </p>
        <div className="stats-grid mt-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>{getPrestadores().length}</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Prestadores</div>
          </div>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>{bairros.length}</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Bairros</div>
          </div>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>100%</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Validados</div>
          </div>
        </div>
      </div>

      {/* Quick actions for provider */}
      {isPrestador && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => onNavigate('dashboard')}
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', cursor: 'pointer', textAlign: 'left' }}
          >
            <BarChart2 size={22} style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Dashboard</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '2px' }}>Estatísticas e disponibilidade</div>
          </button>
          <button
            onClick={() => onNavigate('meus-servicos')}
            style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', cursor: 'pointer', textAlign: 'left' }}
          >
            <ClipboardList size={22} style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Serviços</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '2px' }}>Histórico e contratos</div>
          </button>
        </div>
      )}

      {isSolicitante && (
        <>
          <h2 className="text-lg font-bold mb-3">Categorias</h2>
          <div className="category-scroll mb-4">
            {categorias.map(cat => (
              <div key={cat.nome} className="category-item" onClick={() => { onNavigate('explorar'); onToast(`Filtrando: ${cat.nome}`, 'info'); }}>
                <div className="category-icon" style={{ background: cat.bg, color: cat.cor }}>{cat.icon}</div>
                <span className="category-label">{cat.nome}</span>
              </div>
            ))}
          </div>

          <div className="banner-destaque">
            <div className="banner-destaque-icon"><Star size={22} color="#B45309" /></div>
            <div>
              <div className="font-semibold text-sm" style={{ color: '#92400E' }}>CiviRei em destaque 👑</div>
              <div className="text-xs mt-1" style={{ color: '#B45309', opacity: 0.9 }}>Profissionais premium aparecem primeiro</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 className="text-lg font-bold">Destaques da sua região</h2>
            <button className="text-sm font-semibold" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => onNavigate('explorar')}>
              Ver todos <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </button>
          </div>
          {destaques.map(p => (
            <ProviderCard key={p.id} provider={p} onPress={() => onShowPrestador(p.id)} />
          ))}
        </>
      )}

      {!isSolicitante && isPrestador && (
        <div className="card" style={{ marginTop: '8px' }}>
          <h3 className="font-semibold mb-2">Solicitações recentes</h3>
          <p className="text-sm text-secondary">Você ainda não recebeu solicitações de serviço.</p>
        </div>
      )}
    </div>
  );
}
