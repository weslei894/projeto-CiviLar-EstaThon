import { ChevronRight, User, Briefcase, Star, Lock, LogOut, MessageCircle, Crown, BarChart2, ClipboardList } from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentUser: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' } | null;
  publicacoes?: any[];
}

export default function PerfilScreen({ onLogout, onNavigate, currentUser }: Props) {
  if (!currentUser) {
    return (
      <div className="page-section">
        <div className="app-header"><h1>Perfil</h1></div>
        <div className="card"><p className="text-center text-secondary">Faça login para ver seu perfil</p></div>
      </div>
    );
  }

  const isPrestador = currentUser.role === 'prestador' || currentUser.role === 'ambos';
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const tipoLabel = currentUser.role === 'ambos' ? 'Prestador e Solicitante' : currentUser.role === 'prestador' ? 'Prestador' : 'Solicitante';

  const menuItems = [
    { icon: ClipboardList, label: 'Meus Serviços', page: 'meus-servicos', color: '#3b82f6', always: true },
    { icon: MessageCircle, label: 'Conversas', page: 'chat-list', color: 'var(--text-muted)', always: true },
    { icon: BarChart2, label: 'Dashboard', page: 'dashboard', color: '#8b5cf6', prestador: true },
    { icon: Crown, label: 'CiviRei — Seja destaque', page: 'assinatura', color: 'var(--primary)', prestador: true, highlight: true },
    { icon: Star, label: 'Avaliações recebidas', page: 'avaliacoes', color: 'var(--text-muted)', prestador: true },
    { icon: Briefcase, label: 'Meu Portfólio', page: 'portfolio', color: 'var(--text-muted)', prestador: true },
    { icon: User, label: 'Indicar vizinho', page: 'referral', color: 'var(--text-muted)', always: true },
    { icon: Lock, label: 'Privacidade', page: 'privacidade', color: 'var(--text-muted)', always: true },
  ];

  const visible = menuItems.filter(m => m.always || (m.prestador && isPrestador));

  return (
    <div className="page-section">
      <div className="app-header"><h1>Meu Perfil</h1></div>

      <div className="profile-header">
        <div className="avatar avatar-lg avatar-1" style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}>{initials}</div>
        <h2 className="text-xl font-bold mt-3" style={{ position: 'relative', zIndex: 1 }}>{currentUser.name}</h2>
        <div className="text-sm text-secondary mt-1" style={{ position: 'relative', zIndex: 1 }}>{currentUser.bairro}, São Paulo</div>
        <div className="text-sm text-muted mt-1" style={{ position: 'relative', zIndex: 1 }}>{tipoLabel}</div>
        <div className="card mt-3" style={{ position: 'relative', zIndex: 1, background: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="text-sm" style={{ color: 'black', fontWeight: 500, lineHeight: 1.6 }}>
            "Morador do bairro há 5 anos, sempre disposto a ajudar vizinhos e contratar serviços de confiança."
          </div>
        </div>
      </div>

      {isPrestador && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
          {[
            { value: '7', label: 'Serviços' },
            { value: '4.8', label: 'Avaliação' },
            { value: '134', label: 'Visitas' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3 className="font-semibold mb-2">Menu</h3>
        {visible.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.page}
              className="settings-item"
              onClick={() => onNavigate(item.page)}
              style={item.highlight ? { background: 'linear-gradient(135deg,rgba(42,161,138,0.1),rgba(42,161,138,0.05))', borderColor: 'rgba(42,161,138,0.3)', borderTop: i > 0 ? '1px solid var(--border)' : 'none' } : { borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color={item.color} />
                <span className="text-sm" style={item.highlight ? { color: 'var(--primary-dark)', fontWeight: 600 } : {}}>{item.label}</span>
              </div>
              <ChevronRight size={18} color={item.color} />
            </div>
          );
        })}
      </div>

      <button className="btn btn-outline mt-3" onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LogOut size={18} /> Sair da conta
      </button>
    </div>
  );
}
