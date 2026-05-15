import { MapPin, Star, MessageCircle } from 'lucide-react';
import type { Prestador } from '../types';

interface Props {
  provider: Prestador;
  onPress: () => void;
  onChat?: () => void;
}

export default function ProviderCard({ provider, onPress, onChat }: Props) {
  const mockDistance = (provider.id * 0.15 % 5 + 0.5).toFixed(1);

  return (
    <div className="card service-card">
      <div style={{ display: 'flex', gap: '14px' }} onClick={onPress}>
        <div className={`avatar ${provider.avatarClass}`}>{provider.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="font-semibold">{provider.name}</span>
            {provider.verified && <span className="badge badge-verified">Validado</span>}
            {provider.premium && <span className="badge badge-premium">CiviRei</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs text-secondary">{provider.bairro}, {provider.cidade} • a {mockDistance} km</span>
          </div>
          <div className="stars" style={{ marginTop: '8px' }}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={16} fill={i <= Math.round(provider.avaliacao) ? "currentColor" : "none"} strokeWidth={2} />
            ))}
            <span className="text-muted" style={{ marginLeft: '4px', fontSize: '0.75rem' }}>
              {provider.avaliacao} · {provider.avaliacoesCount} avaliações
            </span>
          </div>
        </div>
      </div>
      <div className="service-tags">
        {provider.servicos.slice(0, 3).map(s => (
          <span key={s} className="badge badge-service">{s}</span>
        ))}
      </div>
      {onChat && (
        <button
          onClick={(e) => { e.stopPropagation(); onChat(); }}
          className="btn btn-primary"
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <MessageCircle size={18} />
          Iniciar conversa
        </button>
      )}
    </div>
  );
}
