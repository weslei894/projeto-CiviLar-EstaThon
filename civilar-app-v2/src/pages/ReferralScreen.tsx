import { useState } from 'react';
import { ArrowLeft, Gift, Send, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function ReferralScreen({ onBack, onToast }: Props) {
  const [referralData, setReferralData] = useState({
    name: '',
    phone: '',
    category: '',
    yourName: '',
    yourPhone: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralData.name || !referralData.phone || !referralData.category) {
      onToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }
    setSent(true);
    onToast(`Indicação enviada para ${referralData.name}!`, 'success');
  };

  const categories = [
    'Pedreiro', 'Eletricista', 'Faxina', 'Pintura', 'Costura', 
    'Jardinagem', 'Encanamento', 'Marcenaria', 'Cuidados', 'Outro'
  ];

  if (sent) {
    return (
      <div className="page-section" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--primary-light)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <CheckCircle size={40} color="var(--primary)" />
        </div>
        <h2 className="text-xl font-bold mb-2">Indicação Enviada!</h2>
        <p className="text-secondary" style={{ maxWidth: '300px', margin: '0 auto 32px' }}>
          {referralData.name} receberá um SMS com seu convite. Quando ele se cadastrar e for aprovado, você ganhará o selo "Embaixador do Bairro"!
        </p>
        <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
          <h4 className="font-semibold text-sm mb-2">Próximos passos:</h4>
          <div style={{ textAlign: 'left', fontSize: '0.875rem', color: 'var(--primary-dark)' }}>
            <p>1. {referralData.name} recebe seu convite por SMS</p>
            <p>2. Ele faz o cadastro completo no app</p>
            <p>3. Nossa equipe aprova seu perfil</p>
            <p>4. Você ganha o selo "Embaixador" 🎉</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '24px' }}>
          Fazer outra indicação
        </button>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Indicar Vizinho</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Gift size={24} color="var(--primary)" />
          <div>
            <h3 className="font-semibold text-sm">Indique e ganhe benefícios</h3>
            <p className="text-xs" style={{ color: 'var(--primary-dark)', marginTop: '2px' }}>
              A cada 3 indicações aprovadas, você ganha o selo "Embaixador do Bairro" e destaque especial no app!
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold mb-3">Dados do Vizinho</h3>
        
        <label className="label">Nome completo *</label>
        <input
          type="text"
          className="input"
          placeholder="Nome do vizinho"
          value={referralData.name}
          onChange={(e) => setReferralData({...referralData, name: e.target.value})}
          required
        />

        <label className="label">Telefone *</label>
        <input
          type="tel"
          className="input"
          placeholder="(11) 99999-9999"
          value={referralData.phone}
          onChange={(e) => setReferralData({...referralData, phone: e.target.value})}
          required
        />

        <label className="label">Categoria de serviço *</label>
        <select
          className="select"
          value={referralData.category}
          onChange={(e) => setReferralData({...referralData, category: e.target.value})}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <h3 className="font-semibold mb-3 mt-4">Seus Dados</h3>
        
        <label className="label">Seu nome</label>
        <input
          type="text"
          className="input"
          placeholder="Seu nome completo"
          value={referralData.yourName}
          onChange={(e) => setReferralData({...referralData, yourName: e.target.value})}
        />

        <label className="label">Seu telefone</label>
        <input
          type="tel"
          className="input"
          placeholder="(11) 99999-9999"
          value={referralData.yourPhone}
          onChange={(e) => setReferralData({...referralData, yourPhone: e.target.value})}
        />

        <div className="card" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <strong>Mensagem que será enviada:</strong><br/>
            "Olá {referralData.name || '[Nome]'}! Seu vizinho {referralData.yourName || '[Seu Nome]'} te indicou para o CiviLar! 
            Cadastre-se e ofereça seus serviços de {referralData.category || '[categoria]'} para o seu bairro. 
            Baixe o app: civilar.app"
          </p>
        </div>

        <button type="submit" className="btn btn-primary mt-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Send size={18} /> Enviar Indicação
        </button>
      </form>
    </div>
  );
}
