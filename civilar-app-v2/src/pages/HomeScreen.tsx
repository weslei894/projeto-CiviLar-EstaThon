import ProviderCard from '../components/ProviderCard';
import { categorias, getPrestadores } from '../data';
import { MapPin, Star, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
  onShowPrestador: (id: number) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function HomeScreen({ onNavigate, onShowPrestador, onToast }: Props) {
  const todos = getPrestadores().slice(0, 4);

  return (
    <div className="page-section">
      <div className="app-header">
        <div className="logo">
          <img src="/logo-civilar.png?v=2" alt="CiviLar" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <h1>CiviLar</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
          <MapPin size={16} />
          <span>Vila Mariana, SP</span>
        </div>
      </div>

      <div className="card hero-card" style={{ marginTop: '16px' }}>
        <h2 className="text-xl font-bold mb-2">Bem-vindo ao CiviLar</h2>
        <p className="text-sm" style={{ opacity: 0.9 }}>Encontre prestadores de confiança no seu bairro. Todos validados pela nossa equipe.</p>
        <div className="stats-grid mt-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>{getPrestadores().length}</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Prestadores</div>
          </div>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>10</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Bairros</div>
          </div>
          <div className="stat-box" style={{ background: 'rgba(255,255,255,0.15)', border: 'none' }}>
            <div className="stat-box-value" style={{ color: 'white', fontSize: '1.25rem' }}>100%</div>
            <div className="stat-box-label" style={{ color: 'rgba(255,255,255,0.85)' }}>Validados</div>
          </div>
        </div>
      </div>

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
          <div className="font-semibold text-sm" style={{ color: '#92400E' }}>Prestadores Premium</div>
          <div className="text-xs mt-1" style={{ color: '#B45309', opacity: 0.9 }}>Profissionais destaque com maior visibilidade</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h2 className="text-lg font-bold">Destaques da sua região</h2>
        <button className="text-sm font-semibold" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => onNavigate('explorar')}>
          Ver todos <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
      </div>
      {todos.map(p => (
        <ProviderCard key={p.id} provider={p} onPress={() => onShowPrestador(p.id)} />
      ))}

      <h2 className="text-lg font-bold mb-3 mt-4">Como funciona</h2>
      <div className="step-card">
        <div className="step-number">1</div>
        <div>
          <div className="font-semibold text-sm">Cadastre-se</div>
          <div className="text-xs text-secondary mt-1">Crie seu perfil como prestador ou solicitante</div>
        </div>
      </div>
      <div className="step-card">
        <div className="step-number">2</div>
        <div>
          <div className="font-semibold text-sm">Validação</div>
          <div className="text-xs text-secondary mt-1">Nossa equipe verifica seus dados e documentos</div>
        </div>
      </div>
      <div className="step-card">
        <div className="step-number">3</div>
        <div>
          <div className="font-semibold text-sm">Conecte-se</div>
          <div className="text-xs text-secondary mt-1">Encontre vizinhos e feche negócio diretamente</div>
        </div>
      </div>
    </div>
  );
}
