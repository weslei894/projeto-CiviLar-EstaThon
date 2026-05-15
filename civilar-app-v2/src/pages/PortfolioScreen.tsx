import { useState } from 'react';
import { ArrowLeft, X, Plus } from 'lucide-react';

interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function PortfolioScreen({ onBack, onToast }: Props) {
  const [portfolio, setPortfolio] = useState<string[]>([]);

  const handleAddPhoto = () => {
    if (portfolio.length >= 6) {
      onToast('Máximo de 6 fotos permitidas', 'error');
      return;
    }
    // Simulação de upload
    const newPhoto = `https://picsum.photos/seed/${Date.now()}/300/300.jpg`;
    setPortfolio([...portfolio, newPhoto]);
    onToast('Foto adicionada!', 'success');
  };



  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Meu Portfólio</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Fotos do seu trabalho</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {portfolio.map((photo, index) => (
            <div key={index} style={{ position: 'relative', aspectRatio: 1 }}>
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
              <button
                onClick={() => setPortfolio(portfolio.filter((_, i) => i !== index))}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '24px',
                  height: '24px',
                  background: 'var(--danger)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {portfolio.length < 6 && (
            <button
              onClick={handleAddPhoto}
              style={{
                aspectRatio: 1,
                border: '2px dashed var(--border)',
                borderRadius: '8px',
                background: 'var(--bg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)'
              }}
            >
              <Plus size={24} color="var(--text-muted)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Adicionar foto
              </span>
            </button>
          )}
        </div>

        <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
          <h4 className="font-semibold text-sm mb-2">Dicas para seu portfólio</h4>
          <ul style={{ fontSize: '0.875rem', color: 'var(--primary-dark)', paddingLeft: '16px', lineHeight: 1.6 }}>
            <li>Fotos bem iluminadas e nítidas</li>
            <li>Mostre o antes e depois quando possível</li>
            <li>Inclua detalhes do trabalho realizado</li>
            <li>Evite fotos com pessoas sem autorização</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-3">Estatísticas do Portfólio</h3>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-box-value">{portfolio.length}</div>
            <div className="stat-box-label">Fotos</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-value">6</div>
            <div className="stat-box-label">Máximo</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-value">{6 - portfolio.length}</div>
            <div className="stat-box-label">Disponíveis</div>
          </div>
          <div className="stat-box">
            <div className="stat-box-value">+45%</div>
            <div className="stat-box-label">Mais contatos</div>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={() => onToast('Portfólio salvo com sucesso!', 'success')}
        disabled={portfolio.length === 0}
        style={{ 
          opacity: portfolio.length === 0 ? 0.5 : 1,
          cursor: portfolio.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        Salvar Portfólio
      </button>
    </div>
  );
}
