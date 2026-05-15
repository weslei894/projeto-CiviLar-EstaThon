import { ArrowLeft, Shield, Eye, Lock, Database, Smartphone } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function PrivacidadeScreen({ onBack }: Props) {
  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Privacidade</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            background: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <Shield size={24} color="white" />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: 'var(--primary-dark)' }}>Seus dados estão seguros</div>
            <div className="text-xs" style={{ color: 'var(--primary)' }}>Segurança de ponta a ponta</div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-3">Como protegemos seus dados</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Eye size={20} color="var(--primary)" />
            </div>
            <div className="font-semibold text-sm">Visibilidade controlada</div>
          </div>
          <p className="text-sm text-secondary">
            Seu telefone é compartilhado apenas com quem você autorizar. Você decide quem pode ver suas informações de contato.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Lock size={20} color="var(--primary)" />
            </div>
            <div className="font-semibold text-sm">Criptografia de ponta</div>
          </div>
          <p className="text-sm text-secondary">
            Todas as comunicações são criptografadas. Seus dados pessoais são protegidos com os mais altos padrões de segurança.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Database size={20} color="var(--primary)" />
            </div>
            <div className="font-semibold text-sm">Armazenamento seguro</div>
          </div>
          <p className="text-sm text-secondary">
            Seus dados são armazenados em servidores seguros com backups automáticos. Nunca vendemos suas informações.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Smartphone size={20} color="var(--primary)" />
            </div>
            <div className="font-semibold text-sm">Controle total</div>
          </div>
          <p className="text-sm text-secondary">
            Você pode excluir seus dados a qualquer momento. Gerencie suas preferências de privacidade diretamente no app.
          </p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-3 mt-4">Suas preferências</h2>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="font-semibold text-sm">Mostrar telefone no perfil</div>
            <div className="text-xs text-secondary">Permitir que outros vejam seu número</div>
          </div>
          <button 
            className="toggle-switch"
            style={{ 
              width: '48px', 
              height: '28px', 
              background: 'var(--primary)', 
              borderRadius: '14px', 
              position: 'relative',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              right: '4px', 
              top: '4px', 
              width: '20px', 
              height: '20px', 
              background: 'white', 
              borderRadius: '50%' 
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div className="font-semibold text-sm">Receber notificações</div>
            <div className="text-xs text-secondary">Alertas sobre novos serviços</div>
          </div>
          <button 
            className="toggle-switch"
            style={{ 
              width: '48px', 
              height: '28px', 
              background: 'var(--primary)', 
              borderRadius: '14px', 
              position: 'relative',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              right: '4px', 
              top: '4px', 
              width: '20px', 
              height: '20px', 
              background: 'white', 
              borderRadius: '50%' 
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="font-semibold text-sm">Perfil público</div>
            <div className="text-xs text-secondary">Visível para todos os usuários</div>
          </div>
          <button 
            className="toggle-switch"
            style={{ 
              width: '48px', 
              height: '28px', 
              background: 'var(--border)', 
              borderRadius: '14px', 
              position: 'relative',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              left: '4px', 
              top: '4px', 
              width: '20px', 
              height: '20px', 
              background: 'white', 
              borderRadius: '50%' 
            }} />
          </button>
        </div>
      </div>

      <button className="btn btn-outline mt-3" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
        Excluir minha conta e dados
      </button>
    </div>
  );
}
