import { dadosIBGE } from '../data';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function DadosScreen({ onBack }: Props) {
  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Dados e Insights</h1>
        <div style={{ width: '76px' }} />
      </div>

      <h2 className="text-lg font-bold mb-3">Números do Mercado</h2>
      <div className="stats-grid mb-4">
        <div className="stat-box">
          <div className="stat-box-value">{dadosIBGE.informalidadeBrasil}%</div>
          <div className="stat-box-label">Informalidade Brasil</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">{dadosIBGE.informalidadeSP}%</div>
          <div className="stat-box-label">Informalidade SP</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">{dadosIBGE.trabalhadoresInformaisMilhoes}M</div>
          <div className="stat-box-label">Trabalhadores informais</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">{dadosIBGE.autonomosInformaisMilhoes}M</div>
          <div className="stat-box-label">Autônomos informais</div>
        </div>
      </div>
      <p className="text-xs text-secondary mb-4 text-center">Fonte: IBGE, Agência Brasil, Genyo 2024/2025</p>

      <div className="card">
        <h3 className="font-semibold text-sm mb-2">Freelancers no Brasil — Crescimento</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dadosIBGE.evolucaoAnual.map(d => (
            <div key={d.ano} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm font-semibold">{d.ano}</span>
              <div style={{ flex: 1, margin: '0 12px', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(d.brasil / 45) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.5s' }} />
              </div>
              <span className="text-sm" style={{ color: 'var(--primary)', fontWeight: 700, minWidth: '45px', textAlign: 'right' }}>{d.brasil}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-sm mb-2">Serviços Mais Solicitados Online</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
          {dadosIBGE.servicosMaisSolicitados.map(s => (
            <div key={s.servico} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm">{s.servico}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '80px', height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.percentual * 3}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px' }} />
                </div>
                <span className="text-xs font-semibold" style={{ minWidth: '32px', textAlign: 'right' }}>{s.percentual}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
