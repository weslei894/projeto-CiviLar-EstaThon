import { useState } from 'react';
import { ArrowLeft, TrendingUp, Eye, MessageCircle, Star, DollarSign, Calendar, Award, Clock } from 'lucide-react';

interface Props {
  onBack: () => void;
  currentUser: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' } | null;
}

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const viewsData = [12, 19, 8, 24, 31, 18, 22];
const maxViews = Math.max(...viewsData);

export default function DashboardScreen({ onBack, currentUser }: Props) {
  const [availDays, setAvailDays] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const [availStart, setAvailStart] = useState('08:00');
  const [availEnd, setAvailEnd] = useState('18:00');
  const [saved, setSaved] = useState(false);

  const handleSaveAvail = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stats = [
    { label: 'Visualizações', value: '134', sub: '+22% essa semana', icon: Eye, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Contatos', value: '18', sub: 'esse mês', icon: MessageCircle, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Propostas', value: '7', sub: '3 aguardando', icon: Award, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Faturamento', value: 'R$1.4k', sub: 'esse mês', icon: DollarSign, color: '#10b981', bg: '#ecfdf5' },
  ];

  const recentActivity = [
    { text: 'Maria S. visualizou seu perfil', time: 'há 20min', icon: Eye, color: '#3b82f6' },
    { text: 'Nova proposta recebida de João L.', time: 'há 1h', icon: MessageCircle, color: '#8b5cf6' },
    { text: 'Avaliação ⭐⭐⭐⭐⭐ de Ana P.', time: 'há 3h', icon: Star, color: '#f59e0b' },
    { text: 'Serviço concluído com Carlos M.', time: 'ontem', icon: Award, color: '#10b981' },
    { text: 'Fernanda R. iniciou conversa', time: 'ontem', icon: MessageCircle, color: '#3b82f6' },
  ];

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Dashboard</h1>
        <div style={{ width: 80 }} />
      </div>

      {/* Greeting */}
      <div className="card hero-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="avatar avatar-lg avatar-1" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', flexShrink: 0 }}>
            {currentUser?.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>Bem-vindo de volta,</div>
            <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>{currentUser?.name.split(' ')[0]} 👋</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', marginTop: '2px' }}>{currentUser?.bairro}, SP</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px 14px' }}>
          <TrendingUp size={18} color="white" />
          <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>Seu perfil teve 22% mais visualizações essa semana!</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card" style={{ background: s.bg, border: `1px solid ${s.color}22`, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</span>
                <Icon size={16} color={s.color} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: s.color, opacity: 0.7, marginTop: '2px' }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Views chart */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Eye size={18} color="var(--primary)" />
          <span className="font-semibold">Visualizações por dia</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
          {viewsData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '100%', background: 'var(--primary)', borderRadius: '6px 6px 0 0', height: `${(v / maxViews) * 70}px`, opacity: i === 6 ? 1 : 0.6, transition: 'height 0.5s' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{weekDays[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Calendar size={18} color="var(--primary)" />
          <span className="font-semibold">Minha Disponibilidade</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
          {weekDays.map((d, i) => (
            <button
              key={d}
              onClick={() => setAvailDays(prev => prev.map((v, idx) => idx === i ? !v : v))}
              style={{
                padding: '8px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                background: availDays[i] ? 'var(--primary)' : 'var(--bg)',
                color: availDays[i] ? 'white' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />INÍCIO
            </label>
            <input type="time" className="input" value={availStart} onChange={e => setAvailStart(e.target.value)} style={{ fontSize: '0.9rem' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />FIM
            </label>
            <input type="time" className="input" value={availEnd} onChange={e => setAvailEnd(e.target.value)} style={{ fontSize: '0.9rem' }} />
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSaveAvail}
          style={{ width: '100%', padding: '12px', background: saved ? '#10b981' : undefined }}
        >
          {saved ? '✅ Disponibilidade salva!' : 'Salvar disponibilidade'}
        </button>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <TrendingUp size={18} color="var(--primary)" />
          <span className="font-semibold">Atividade recente</span>
        </div>
        {recentActivity.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: a.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={a.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{a.text}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{a.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
