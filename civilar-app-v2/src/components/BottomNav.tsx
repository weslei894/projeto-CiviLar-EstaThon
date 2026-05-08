import { Home, Search, PlusCircle, BarChart3, User } from 'lucide-react';
import type { Page } from '../types';

interface Props {
  active: Page;
  onNavigate: (page: Page) => void;
}

const items: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: 'Início', icon: Home },
  { page: 'explorar', label: 'Explorar', icon: Search },
  { page: 'cadastrar', label: '', icon: PlusCircle },
  { page: 'dados', label: 'Dados', icon: BarChart3 },
  { page: 'perfil', label: 'Perfil', icon: User },
];

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav className="bottom-nav">
      {items.map(item => {
        if (item.page === 'cadastrar') {
          return (
            <button key={item.page} className="nav-item" onClick={() => onNavigate('cadastrar')}>
              <div className="nav-add-btn">
                <PlusCircle size={24} />
              </div>
            </button>
          );
        }
        const Icon = item.icon;
        return (
          <button
            key={item.page}
            className={`nav-item ${active === item.page ? 'active' : ''}`}
            onClick={() => onNavigate(item.page)}
          >
            <Icon size={22} strokeWidth={active === item.page ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
