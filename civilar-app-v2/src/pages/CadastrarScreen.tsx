import { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const steps = ['Dados', 'Serviço', 'Documento'];

export default function CadastrarScreen({ onBack, onToast }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setSubmitted(true);
    onToast('Cadastro enviado para validação! Em breve nossa equipe entrará em contato.', 'success');
  };

  if (submitted) {
    return (
      <div className="page-section" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle size={40} color="var(--primary)" />
        </div>
        <h2 className="text-xl font-bold mb-2">Perfil em análise</h2>
        <p className="text-secondary" style={{ maxWidth: '300px', margin: '0 auto 32px' }}>
          Estamos analisando seu perfil. Você receberá uma notificação em até 24h.
        </p>
        <button className="btn btn-primary" onClick={onBack}>Entendido</button>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Cadastrar</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="progress-steps">
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`progress-step ${i < step ? 'completed' : i === step ? 'active' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`progress-line ${i < step ? 'completed' : ''}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <label className="label">Nome completo</label>
            <input type="text" className="input" placeholder="Seu nome" required />
            <label className="label">Telefone</label>
            <input type="tel" className="input" placeholder="(11) 99999-9999" required />
            <label className="label">Bairro</label>
            <input type="text" className="input" placeholder="Seu bairro" required />
            <label className="label">Cidade</label>
            <input type="text" className="input" defaultValue="São Paulo" required />
          </>
        )}
        {step === 1 && (
          <>
            <label className="label">Categorias de serviço</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {['Pedreiro', 'Eletricista', 'Faxina', 'Pintura', 'Costura', 'Jardinagem', 'Encanamento'].map(cat => (
                <button key={cat} type="button" className="chip">{cat}</button>
              ))}
            </div>
            <label className="label">Descrição dos serviços</label>
            <textarea className="input" rows={3} placeholder="Descreva o que você faz..." />
            <label className="label">Faixa de preço estimada</label>
            <input type="text" className="input" placeholder="Ex: R$ 50-100/hora" />
          </>
        )}
        {step === 2 && (
          <>
            <label className="label">Foto de perfil (obrigatória)</label>
            <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '32px', cursor: 'pointer' }}>
              <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p className="text-sm font-semibold">Clique para enviar foto</p>
              <p className="text-xs text-secondary mt-1">Câmera ou galeria</p>
            </div>
            <label className="label" style={{ marginTop: '16px' }}>Documento (CPF ou RG)</label>
            <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '32px', cursor: 'pointer' }}>
              <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p className="text-sm font-semibold">Envie uma foto do seu CPF ou RG</p>
              <p className="text-xs text-secondary mt-1">Para validação da equipe</p>
            </div>
            <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
              <p className="text-xs" style={{ color: 'var(--primary-dark)', opacity: 0.9 }}>
                Seu perfil só será ativado após nossa equipe validar seus documentos e confirmar seu bairro.
              </p>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          {step < 2 ? 'Continuar' : 'Enviar para validação'}
        </button>
      </form>
    </div>
  );
}
