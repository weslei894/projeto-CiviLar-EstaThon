import { prestadores } from '../data';
import { ChevronRight, User, Briefcase, Star, Lock, LogOut } from 'lucide-react';

interface Props {
  onLogout: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function PerfilScreen({ onLogout, onToast }: Props) {
  const user = prestadores[5]; // Fernanda Lima (solicitante)

  return (
    <div className="page-section">
      <div className="app-header">
        <h1>Meu Perfil</h1>
      </div>

      <div className="profile-header">
        <div className={`avatar avatar-lg ${user.avatarClass}`} style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}>{user.initials}</div>
        <h2 className="text-xl font-bold mt-3" style={{ position: 'relative', zIndex: 1 }}>{user.name}</h2>
        <div className="text-sm text-secondary mt-1" style={{ position: 'relative', zIndex: 1 }}>{user.bairro}, {user.cidade}</div>
        <div className="text-sm text-muted mt-1" style={{ position: 'relative', zIndex: 1 }}>Solicitante</div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Configurações</h3>
        <div className="settings-item" onClick={() => onToast('Em breve!', 'info')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User size={18} color="var(--text-muted)" />
            <span className="text-sm">Editar perfil</span>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
        <div className="settings-item" onClick={() => onToast('Em breve!', 'info')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Briefcase size={18} color="var(--text-muted)" />
            <span className="text-sm">Meus serviços</span>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
        <div className="settings-item" onClick={() => onToast('Em breve!', 'info')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Star size={18} color="var(--text-muted)" />
            <span className="text-sm">Avaliações recebidas</span>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
        <div className="settings-item" onClick={() => onToast('Em breve!', 'info')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lock size={18} color="var(--text-muted)" />
            <span className="text-sm">Privacidade</span>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      <button className="btn btn-outline mt-3" onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LogOut size={18} /> Sair da conta
      </button>
    </div>
  );
}
