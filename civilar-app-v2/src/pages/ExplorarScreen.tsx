import { useState } from 'react';
import ProviderCard from '../components/ProviderCard';
import { getPrestadores, bairros } from '../data';
import { Search, ArrowLeft, Filter } from 'lucide-react';

interface Props {
  onShowPrestador: (id: number) => void;
  onNavigate: (page: string) => void;
  onChatSelect?: (id: number) => void;
}

export default function ExplorarScreen({ onShowPrestador, onNavigate, onChatSelect }: Props) {
  const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categorias = ['Encanador', 'Eletricista', 'Pintor', 'Marceneiro', 'Jardineiro', 'Faxineiro', 'Pedreiro', 'Serralheiro', 'Arquiteto', 'Engenheiro', 'Diarista', 'Cozinheiro'];

  const lista = getPrestadores(selectedBairro, search || null).filter(p =>
    !selectedCategoria || p.servicos.some(s => s.toLowerCase().includes(selectedCategoria.toLowerCase()))
  );

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
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: showFilters ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Filter size={18} color={showFilters ? 'white' : 'rgba(255,255,255,0.5)'} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 className="font-semibold mb-3">Filtros</h3>
          <div style={{ marginBottom: '16px' }}>
            <label className="label mb-2">Bairro</label>
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
          </div>
          <div>
            <label className="label mb-2">Categoria</label>
            <div className="filter-chips">
              <button className={`chip ${selectedCategoria === null ? 'active' : ''}`} onClick={() => setSelectedCategoria(null)}>
                Todas
              </button>
              {categorias.slice(0, 6).map(c => (
                <button key={c} className={`chip ${selectedCategoria === c ? 'active' : ''}`} onClick={() => setSelectedCategoria(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '8px' }}>
        {lista.length === 0 ? (
          <div className="card text-center">
            <p className="text-secondary">Nenhum prestador encontrado.</p>
          </div>
        ) : (
          lista.map(p => (
            <ProviderCard
              key={p.id}
              provider={p}
              onPress={() => onShowPrestador(p.id)}
              onChat={onChatSelect ? () => onChatSelect(p.id) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
