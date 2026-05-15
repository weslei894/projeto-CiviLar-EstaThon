import { useState } from 'react';
import { ArrowLeft, Crown, Check, Shield, CreditCard, Clock } from 'lucide-react';

interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  icon: React.ReactNode;
}

export default function AssinaturaScreen({ onBack, onToast }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      features: [
        'Perfil básico',
        'Aparece na lista',
        'Contato via chat',
        'Avaliações'
      ],
      popular: false,
      icon: <Shield size={24} />
    },
    {
      id: 'premium',
      name: 'CiviRei',
      price: 'R$ 10',
      period: '/mês',
      features: [
        'Aparece na frente de todos',
        'Destaque com coroa',
        'Prioridade nas buscas',
        'Contato via chat integrado',
        'Avaliações destacadas',
        'Suporte prioritário',
        'Badge CiviRei'
      ],
      popular: true,
      icon: <Crown size={24} />
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      onToast('Você já está no plano gratuito', 'info');
      return;
    }

    setProcessing(true);
    setSelectedPlan(planId);

    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessing(false);

    if (planId === 'premium') {
      setShowPixModal(true);
    } else {
      onToast('Assinatura ativada com sucesso!', 'success');
      onBack();
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913CiviLar Ltda6009Sao Paulo62070503***6304ABCD');
    onToast('Código PIX copiado!', 'success');
    setTimeout(() => {
      setShowPixModal(false);
      onToast('Pagamento confirmado! Você agora é CiviRei 👑', 'success');
      onBack();
    }, 3000);
  };

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Assinatura</h1>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ padding: '20px' }}>
        {/* Banner */}
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Crown size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Seja um CiviRei</h2>
              <p className="text-sm" style={{ opacity: 0.9 }}>
                Apareça na frente de todos e receba mais contratações!
              </p>
            </div>
          </div>
        </div>

        {/* Planos */}
        <h2 className="text-lg font-bold mb-3">Escolha seu plano</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className="card"
              style={{
                padding: '20px',
                cursor: 'pointer',
                border: selectedPlan === plan.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                position: 'relative',
                transition: 'var(--transition)'
              }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  MAIS POPULAR
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: plan.popular ? 'var(--primary-light)' : 'var(--bg)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: plan.popular ? 'var(--primary-dark)' : 'var(--text)'
                }}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span className="text-xl font-bold" style={{ color: plan.popular ? 'var(--primary)' : 'var(--text)' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-secondary">{plan.period}</span>
                  </div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Check size={16} color={plan.popular ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe(plan.id);
                }}
                disabled={processing}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '12px'
                }}
              >
                {processing && selectedPlan === plan.id ? (
                  <span>Processando...</span>
                ) : plan.id === 'free' ? (
                  'Plano Atual'
                ) : (
                  'Assinar Agora'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Informações */}
        <div className="card" style={{ marginTop: '24px', background: 'var(--bg)' }}>
          <h3 className="font-semibold mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--primary)" />
            Sobre a assinatura
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
            <li style={{ marginBottom: '8px' }}>• Renovação automática mensal</li>
            <li style={{ marginBottom: '8px' }}>• Cancele a qualquer momento</li>
            <li style={{ marginBottom: '8px' }}>• Pagamento seguro via cartão</li>
            <li>• Suporte prioritário via chat</li>
          </ul>
        </div>

        {/* Métodos de pagamento */}
        <div className="card" style={{ marginTop: '16px' }}>
          <h3 className="font-semibold mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--primary)" />
            Métodos de pagamento
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ 
              padding: '8px 16px', 
              background: 'var(--bg)', 
              borderRadius: '8px', 
              fontSize: '0.875rem',
              border: '1px solid var(--border)'
            }}>
              💳 Cartão de Crédito
            </div>
            <div style={{ 
              padding: '8px 16px', 
              background: 'var(--bg)', 
              borderRadius: '8px', 
              fontSize: '0.875rem',
              border: '1px solid var(--border)'
            }}>
              💵 PIX
            </div>
            <div style={{ 
              padding: '8px 16px', 
              background: 'var(--bg)', 
              borderRadius: '8px', 
              fontSize: '0.875rem',
              border: '1px solid var(--border)'
            }}>
              📱 Boleto
            </div>
          </div>
        </div>
      </div>

      {/* Modal PIX */}
      {showPixModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', background: 'white', textAlign: 'center', position: 'relative' }}>
            <h2 className="text-xl font-bold mb-2">Pagamento via PIX</h2>
            <p className="text-sm text-secondary mb-4">Escaneie o QR Code ou copie o código PIX Copia e Cola para finalizar sua assinatura CiviRei.</p>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CiviLarMockPixCode" alt="QR Code PIX" style={{ width: '200px', height: '200px' }} />
            </div>

            <div className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>R$ 10,00</div>

            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }} onClick={handleCopyPix}>
              Copiar código PIX
            </button>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setShowPixModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
