import { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, MoreVertical } from 'lucide-react';
import { getUserById } from '../data';

interface Props {
  onBack: () => void;
  onChatSelect: (chatId: number) => void;
  activeChatIds?: number[];
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: 'prestador' | 'solicitante';
}

export default function ChatListScreen({ onBack, onChatSelect, activeChatIds = [] }: Props) {
  const [search, setSearch] = useState('');

  // Dynamically create chats from activeChatIds
  const chats: Chat[] = activeChatIds.map(id => {
    const user = getUserById(id);
    return {
      id,
      name: user?.name || 'Desconhecido',
      avatar: user?.initials || '??',
      lastMessage: 'Última mensagem enviada...',
      time: 'Agora',
      unread: 0,
      online: true,
      type: user?.tipo || 'solicitante'
    } as Chat;
  });

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Conversas</h1>
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Busca */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input"
            placeholder="Buscar conversas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      {/* Lista de conversas */}
      <div style={{ padding: '0 20px' }}>
        {filteredChats.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <MessageCircle size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 className="font-semibold mb-2">Nenhuma conversa encontrada</h3>
            <p className="text-sm text-secondary">Comece uma conversa com prestadores ou solicitantes.</p>
          </div>
        ) : (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              className="card"
              style={{
                padding: '16px',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onClick={() => onChatSelect(chat.id)}
            >
              <div style={{ position: 'relative' }}>
                <div
                  className="avatar avatar-md"
                  style={{
                    background: 'var(--primary-light)',
                    color: 'var(--primary-dark)'
                  }}
                >
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="font-semibold text-sm">{chat.name}</span>
                  <span className="text-xs text-secondary">{chat.time}</span>
                </div>
                <p className="text-sm text-secondary" style={{ 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  marginBottom: '4px'
                }}>
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    minWidth: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {chat.unread}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
