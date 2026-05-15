import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, XCircle, Briefcase, Calendar, DollarSign, MessageCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenChat: (id: number) => void;
  userRole?: 'prestador' | 'solicitante' | 'ambos';
}

type Status = 'ativo' | 'concluido' | 'cancelado';

interface Servico {
  id: number;
  prestadorId: number;
  prestadorNome: string;
  prestadorInitials: string;
  servico: string;
  valor: string;
  data: string;
  status: Status;
  avaliacaoFeita: boolean;
}

const mockServicos: Servico[] = [
  { id: 1, prestadorId: 2, prestadorNome: 'Maria Oliveira', prestadorInitials: 'MO', servico: 'Faxina Completa', valor: 'R$ 180,00', data: '2026-05-10', status: 'concluido', avaliacaoFeita: true },
  { id: 2, prestadorId: 3, prestadorNome: 'Carlos Mendes', prestadorInitials: 'CM', servico: 'Instalação Elétrica', valor: 'R$ 350,00', data: '2026-05-20', status: 'ativo', avaliacaoFeita: false },
  { id: 3, prestadorId: 5, prestadorNome: 'Pedro Santos', prestadorInitials: 'PS', servico: 'Poda de Jardim', valor: 'R$ 220,00', data: '2026-04-28', status: 'concluido', avaliacaoFeita: false },
  { id: 4, prestadorId: 8, prestadorNome: 'Roberto Almeida', prestadorInitials: 'RA', servico: 'Reparo Hidráulico', valor: 'R$ 150,00', data: '2026-04-15', status: 'cancelado', avaliacaoFeita: false },
];

const statusConfig = {
  ativo:     { label: 'Em andamento', color: '#3b82f6', bg: '#eff6ff', icon: Clock },
  concluido: { label: 'Concluído',    color: '#10b981', bg: '#ecfdf5', icon: CheckCircle },
  cancelado: { label: 'Cancelado',    color: '#ef4444', bg: '#fef2f2', icon: XCircle },
};

export default function MeusServicosScreen({ onBack, onOpenChat, userRole }: Props) {
  const [filter, setFilter] = useState<Status | 'todos'>('todos');
  const isPrestador = userRole === 'prestador' || userRole === 'ambos';

  const filtered = mockServicos.filter(s => filter === 'todos' || s.status === filter);

  const counts = {
    todos: mockServicos.length,
    ativo: mockServicos.filter(s => s.status === 'ativo').length,
    concluido: mockServicos.filter(s => s.status === 'concluido').length,
    cancelado: mockServicos.filter(s => s.status === 'cancelado').length,
  };

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Meus Serviços</h1>
        <div style={{ width: 80 }} />
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {(['ativo', 'concluido', 'cancelado'] as Status[]).map(s => {
          const cfg = statusConfig[s];
          const Icon = cfg.icon;
          return (
            <div key={s} className="card" style={{ textAlign: 'center', padding: '14px 8px', background: cfg.bg, border: `1px solid ${cfg.color}33` }}>
              <Icon size={20} color={cfg.color} style={{ margin: '0 auto 6px' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: cfg.color }}>{counts[s]}</div>
              <div style={{ fontSize: '0.7rem', color: cfg.color, fontWeight: 600 }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="category-scroll" style={{ marginBottom: '16px' }}>
        {(['todos', 'ativo', 'concluido', 'cancelado'] as const).map(f => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'todos' ? `Todos (${counts.todos})` : `${statusConfig[f].label} (${counts[f]})`}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Briefcase size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
          <h3 className="font-semibold mb-2">Nenhum serviço encontrado</h3>
          <p className="text-sm text-secondary">Seus serviços {isPrestador ? 'contratados' : 'realizados'} aparecerão aqui.</p>
        </div>
      ) : (
        filtered.map(s => {
          const cfg = statusConfig[s.status];
          const Icon = cfg.icon;
          return (
            <div key={s.id} className="card" style={{ marginBottom: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="avatar avatar-md" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', flexShrink: 0 }}>
                    {s.prestadorInitials}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ fontSize: '0.95rem' }}>{s.prestadorNome}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {isPrestador ? 'Cliente' : 'Prestador'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: cfg.bg, color: cfg.color, borderRadius: '20px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, border: `1px solid ${cfg.color}33` }}>
                  <Icon size={12} />
                  {cfg.label}
                </div>
              </div>

              <div style={{ background: 'var(--bg)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Briefcase size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.servico}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={14} color="#10b981" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>{s.valor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {new Date(s.data + 'T12:00:00').toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onOpenChat(s.prestadorId)}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem' }}
                >
                  <MessageCircle size={16} /> Chat
                </button>
                {s.status === 'concluido' && !s.avaliacaoFeita && (
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
                    onClick={() => onOpenChat(s.prestadorId)}
                  >
                    ⭐ Avaliar
                  </button>
                )}
                {s.status === 'concluido' && s.avaliacaoFeita && (
                  <div style={{ flex: 1, padding: '10px', background: '#ecfdf5', color: '#10b981', borderRadius: '12px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #bbf7d0' }}>
                    ✅ Avaliado
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
