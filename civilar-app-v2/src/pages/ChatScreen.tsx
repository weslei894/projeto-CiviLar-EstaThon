import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Phone, Check, CheckCheck, FileText, X, Camera, Star } from 'lucide-react';
import { getUserById } from '../data';

interface Props {
  onBack: () => void;
  chatId: number;
}

type NegotiationStatus = 'pending' | 'accepted' | 'refused';
type ServiceStatus = 'negotiating' | 'contracted' | 'confirming' | 'done';

interface Negotiation {
  servico: string;
  valor: string;
  data: string;
  obs: string;
  status: NegotiationStatus;
  sentByMe: boolean;
}

interface Message {
  id: number;
  text?: string;
  sent: boolean;
  time: string;
  read: boolean;
  type: 'text' | 'negotiation' | 'system';
  negotiation?: Negotiation;
}

export default function ChatScreen({ onBack, chatId }: Props) {
  const prestador = getUserById(chatId);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showNegForm, setShowNegForm] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>('negotiating');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [confirmPhoto, setConfirmPhoto] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [negForm, setNegForm] = useState({ servico: '', valor: '', data: '', obs: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatName = prestador?.name || 'Desconhecido';
  const chatAvatar = prestador?.initials || '??';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (prestador && messages.length === 0) {
      setMessages([{
        id: 1,
        text: `Olá ${prestador.name}! Vi seu perfil no CiviLar e gostaria de conversar sobre seus serviços.`,
        sent: true, time: now(), read: false, type: 'text'
      }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 2, text: 'Olá! Fico feliz em ajudar. Me conta mais sobre o que você precisa!',
          sent: false, time: now(), read: true, type: 'text'
        }]);
      }, 1200);
    }
  }, [prestador, messages.length]);

  function now() {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const msg: Message = { id: Date.now(), text: message, sent: true, time: now(), read: false, type: 'text' };
    setMessages(prev => [...prev, msg]);
    setMessage('');
    setIsTyping(true);
    setTimeout(() => {
      const resps = ['Entendi! Vou verificar.', 'Perfeito, combinado!', 'Ok, sem problemas.', 'Ótimo!', 'Claro, posso fazer isso.'];
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, text: resps[Math.floor(Math.random() * resps.length)],
        sent: false, time: now(), read: true, type: 'text'
      }]);
    }, 2000);
  };

  const handleSendNegotiation = () => {
    if (!negForm.servico || !negForm.valor || !negForm.data) return;
    const neg: Negotiation = { ...negForm, status: 'pending', sentByMe: true };
    setMessages(prev => [...prev, { id: Date.now(), sent: true, time: now(), read: false, type: 'negotiation', negotiation: neg }]);
    setShowNegForm(false);
    setNegForm({ servico: '', valor: '', data: '', obs: '' });
    // Simula o outro lado aceitando após 3s
    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.type === 'negotiation' && m.negotiation?.status === 'pending'
          ? { ...m, negotiation: { ...m.negotiation!, status: 'accepted' } }
          : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now() + 1, type: 'system', sent: false, time: now(), read: true,
        text: '🤝 Proposta aceita! Serviço contratado com sucesso.'
      }]);
      setServiceStatus('contracted');
    }, 3000);
  };

  const handleRespondNeg = (accept: boolean) => {
    setMessages(prev => prev.map(m =>
      m.type === 'negotiation' && m.negotiation?.status === 'pending'
        ? { ...m, negotiation: { ...m.negotiation!, status: accept ? 'accepted' : 'refused' } }
        : m
    ));
    if (accept) {
      setMessages(prev => [...prev, {
        id: Date.now(), type: 'system', sent: true, time: now(), read: true,
        text: '🤝 Você aceitou a proposta! Serviço contratado.'
      }]);
      setServiceStatus('contracted');
    } else {
      setMessages(prev => [...prev, {
        id: Date.now(), type: 'system', sent: true, time: now(), read: true,
        text: '❌ Proposta recusada. Continuem negociando.'
      }]);
    }
  };

  const handlePhotoConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setConfirmPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmService = () => {
    setShowConfirmModal(false);
    setServiceStatus('done');
    setMessages(prev => [...prev, {
      id: Date.now(), type: 'system', sent: true, time: now(), read: true,
      text: '✅ Serviço confirmado! Você já pode avaliar o prestador.'
    }]);
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    setShowReviewModal(false);
    setMessages(prev => [...prev, {
      id: Date.now(), type: 'system', sent: true, time: now(), read: true,
      text: `⭐ Avaliação publicada! Você deu ${rating} estrelas para ${chatName}.`
    }]);
  };

  const hasPendingNeg = messages.some(m => m.type === 'negotiation' && m.negotiation?.status === 'pending' && !m.sent);

  return (
    <div className="page-section" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 0 }}>
      {/* Header */}
      <div className="app-header" style={{ background: 'var(--navy)' }}>
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div className="avatar avatar-md" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
              {chatAvatar}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid white' }} />
          </div>
          <div>
            <div className="font-semibold" style={{ color: 'white', fontSize: '1rem' }}>{chatName}</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {serviceStatus === 'contracted' ? '🤝 Serviço contratado' : serviceStatus === 'done' ? '✅ Concluído' : 'Online'}
            </div>
          </div>
        </div>
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
          <Phone size={18} />
        </button>
      </div>

      {/* Status banner when contracted */}
      {serviceStatus === 'contracted' && (
        <div style={{ background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>🤝 Serviço contratado!</span>
          <button
            onClick={() => setShowConfirmModal(true)}
            style={{ background: 'white', color: '#059669', border: 'none', borderRadius: '20px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Confirmar Realização
          </button>
        </div>
      )}

      {serviceStatus === 'done' && (
        <div style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: 'white', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>✅ Serviço concluído!</span>
          <button
            onClick={() => setShowReviewModal(true)}
            style={{ background: 'white', color: '#4f46e5', border: 'none', borderRadius: '20px', padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Avaliar Prestador
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', background: 'var(--bg)' }}>
        {messages.map(msg => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '6px 16px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {msg.text}
                </span>
              </div>
            );
          }
          if (msg.type === 'negotiation' && msg.negotiation) {
            const neg = msg.negotiation;
            const statusColor = neg.status === 'accepted' ? '#10b981' : neg.status === 'refused' ? '#ef4444' : '#f59e0b';
            const statusLabel = neg.status === 'accepted' ? '✅ Aceita' : neg.status === 'refused' ? '❌ Recusada' : '⏳ Aguardando resposta';
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sent ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
                <div style={{ maxWidth: '85%', background: 'white', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: `2px solid ${statusColor}`, overflow: 'hidden' }}>
                  <div style={{ background: `linear-gradient(135deg,${statusColor}22,${statusColor}11)`, padding: '12px 16px', borderBottom: `1px solid ${statusColor}33` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={18} color={statusColor} />
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: statusColor }}>Proposta de Serviço</span>
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '0.75rem', color: statusColor, fontWeight: 600 }}>{statusLabel}</div>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>SERVIÇO</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{neg.servico}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>VALOR</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>{neg.valor}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>DATA</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{neg.data}</div>
                      </div>
                    </div>
                    {neg.obs && (
                      <div style={{ background: 'var(--bg)', borderRadius: '8px', padding: '8px 10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        {neg.obs}
                      </div>
                    )}
                    {neg.status === 'pending' && !msg.sent && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button onClick={() => handleRespondNeg(true)} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}>
                          ✓ Aceitar
                        </button>
                        <button onClick={() => handleRespondNeg(false)} style={{ flex: 1, background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '10px', padding: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}>
                          ✗ Recusar
                        </button>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '6px 16px 10px', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right' }}>{msg.time}</div>
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sent ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
              <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: '18px', background: msg.sent ? 'var(--primary)' : 'white', color: msg.sent ? 'white' : 'var(--text)', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>{msg.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{msg.time}</span>
                  {msg.sent && (msg.read ? <CheckCheck size={12} style={{ opacity: 0.7 }} /> : <Check size={12} style={{ opacity: 0.7 }} />)}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
            <div style={{ padding: '10px 16px', borderRadius: '18px', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>Digitando...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Negotiation Form */}
      {showNegForm && (
        <div style={{ background: 'white', borderTop: '2px solid var(--primary)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Nova Proposta</span>
            </div>
            <button onClick={() => setShowNegForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input className="input" placeholder="Descrição do serviço *" value={negForm.servico} onChange={e => setNegForm({ ...negForm, servico: e.target.value })} style={{ fontSize: '0.9rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input className="input" placeholder="Valor (ex: R$ 200)" value={negForm.valor} onChange={e => setNegForm({ ...negForm, valor: e.target.value })} style={{ fontSize: '0.9rem' }} />
              <input className="input" type="date" value={negForm.data} onChange={e => setNegForm({ ...negForm, data: e.target.value })} style={{ fontSize: '0.9rem' }} />
            </div>
            <textarea className="input" placeholder="Observações (opcional)" value={negForm.obs} onChange={e => setNegForm({ ...negForm, obs: e.target.value })} rows={2} style={{ resize: 'none', fontSize: '0.9rem' }} />
            <button className="btn btn-primary" onClick={handleSendNegotiation} disabled={!negForm.servico || !negForm.valor || !negForm.data} style={{ padding: '12px' }}>
              Enviar Proposta
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      {!showNegForm && (
        <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid var(--border)' }}>
          {hasPendingNeg && (
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '10px', padding: '8px 12px', marginBottom: '10px', fontSize: '0.8rem', color: '#92400e', fontWeight: 600 }}>
              ⏳ Aguardando sua resposta à proposta acima
            </div>
          )}
          {serviceStatus === 'negotiating' && (
            <button
              onClick={() => setShowNegForm(true)}
              style={{ width: '100%', marginBottom: '10px', background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', color: 'white', border: 'none', borderRadius: '12px', padding: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FileText size={16} /> Enviar Proposta de Negociação
            </button>
          )}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <textarea className="input" placeholder="Digite sua mensagem..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} rows={1} style={{ resize: 'none', minHeight: '44px', maxHeight: '100px', paddingTop: '12px', paddingBottom: '12px' }} />
            </div>
            <button className="btn btn-primary" onClick={handleSendMessage} disabled={!message.trim()} style={{ width: '44px', height: '44px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Confirm Realization Modal */}
      {showConfirmModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0' }}>
          <div style={{ background: 'white', borderRadius: '24px 24px 0 0', padding: '28px 24px', width: '100%', maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Confirmar Realização</h2>
              <button onClick={() => setShowConfirmModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Adicione uma foto do serviço realizado para confirmar a conclusão. Isso libera a avaliação mútua.
            </p>
            <label style={{ display: 'block', border: '2px dashed var(--border)', borderRadius: '16px', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: '16px', background: confirmPhoto ? 'transparent' : 'var(--bg)' }}>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoConfirm} />
              {confirmPhoto ? (
                <img src={confirmPhoto} alt="Confirmação" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px' }} />
              ) : (
                <div>
                  <Camera size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-secondary)' }}>Toque para adicionar foto</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, PNG até 10MB</p>
                </div>
              )}
            </label>
            <button className="btn btn-primary" onClick={handleConfirmService} style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
              {confirmPhoto ? '✅ Confirmar Serviço Realizado' : 'Confirmar sem foto'}
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '24px 24px 0 0', padding: '28px 24px', width: '100%', maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Avaliar {chatName}</h2>
              <button onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px' }}>Sua avaliação ficará visível no perfil do prestador.</p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ fontWeight: 600, marginBottom: '12px' }}>Nota geral</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setRating(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '2rem', opacity: s <= rating ? 1 : 0.3, transform: s <= rating ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.15s' }}>
                    <Star fill={s <= rating ? '#f59e0b' : 'none'} stroke="#f59e0b" />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="input"
              placeholder="Conte como foi o serviço... (opcional)"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={3}
              style={{ resize: 'none', marginBottom: '16px' }}
            />
            <button className="btn btn-primary" onClick={handleSubmitReview} style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
              ⭐ Publicar Avaliação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
