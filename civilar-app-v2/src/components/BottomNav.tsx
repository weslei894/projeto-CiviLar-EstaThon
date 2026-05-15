import { Home, Search, Map, Plus, User, MessageCircle } from 'lucide-react';

interface Props {
  active: string;
  onNavigate: (page: string) => void;
  userRole?: 'prestador' | 'solicitante' | 'ambos';
  unreadChats?: number;
}

export default function BottomNav({ active, onNavigate, userRole, unreadChats = 0 }: Props) {
  const isSolicitante = userRole === 'solicitante' || userRole === 'ambos';
  const isPrestador = userRole === 'prestador' || userRole === 'ambos';

  const tabs = [
    { page: 'home', label: 'Início', icon: Home },
    { page: 'explorar', label: 'Explorar', icon: Search },
    ...(isSolicitante ? [{ page: 'mapa', label: 'Mapa', icon: Map }] : []),
    ...(isPrestador ? [{ page: 'publicar', label: 'Publicar', icon: Plus }] : []),
    { page: 'chat-list', label: 'Chat', icon: MessageCircle, badge: unreadChats },
    { page: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(item => {
        if (item.page === 'publicar') {
          return (
            <button key={item.page} className="nav-item" onClick={() => onNavigate('publicar')}>
              <div className="nav-add-btn">
                <Plus size={24} strokeWidth={1.5} />
              </div>
            </button>
          );
        }
        const Icon = item.icon;
        const badge = 'badge' in item ? item.badge : 0;
        return (
          <button
            key={item.page}
            className={`nav-item ${active === item.page ? 'active' : ''}`}
            onClick={() => onNavigate(item.page)}
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon size={22} strokeWidth={active === item.page ? 2 : 1.5} />
              {badge && badge > 0 ? (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-8px',
                  background: '#ef4444', color: 'white', borderRadius: '50%',
                  width: '16px', height: '16px', fontSize: '0.65rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white'
                }}>
                  {badge > 9 ? '9+' : badge}
                </span>
              ) : null}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
