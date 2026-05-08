import { useState } from 'react';
import ProviderCard from '../components/ProviderCard';
import { getPrestadores, bairros } from '../data';
import { Search, ArrowLeft } from 'lucide-react';

interface Props {
  onShowPrestador: (id: number) => void;
  onNavigate: (page: string) => void;
}

export default function ExplorarScreen({ onShowPrestador, onNavigate }: Props) {
  const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const lista = getPrestadores(selectedBairro, search || null);

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={() => onNavigate('home')}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Explorar</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="search-bar">
        <div className="search-input">
          <Search size={18} />
          <input
            type="text"
            className="input"
            placeholder="Buscar por serviço..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-chips">
        <button className={`chip ${selectedBairro === null ? 'active' : ''}`} onClick={() => setSelectedBairro(null)}>
          Todos
        </button>
        {bairros.slice(0, 6).map(b => (
          <button key={b} className={`chip ${selectedBairro === b ? 'active' : ''}`} onClick={() => setSelectedBairro(b)}>
            {b}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '8px' }}>
        {lista.length === 0 ? (
          <div className="card text-center">
            <p className="text-secondary">Nenhum prestador encontrado.</p>
          </div>
        ) : (
          lista.map(p => (
            <ProviderCard key={p.id} provider={p} onPress={() => onShowPrestador(p.id)} />
          ))
        )}
      </div>
    </div>
  );
}
