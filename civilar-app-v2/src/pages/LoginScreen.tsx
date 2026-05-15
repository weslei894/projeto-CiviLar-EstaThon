import { useState } from 'react';
import { ArrowLeft, CheckCircle, User, Briefcase, Users, Star } from 'lucide-react';
import { bairros } from '../data';

interface Props {
  onLogin: (userData: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' }) => void;
  onBack: () => void;
}

export default function LoginScreen({ onLogin, onBack }: Props) {
  const [isLogin, setIsLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'prestador' | 'solicitante' | 'ambos' | null>(null);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [bairro, setBairro] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [temExperiencia, setTemExperiencia] = useState<boolean | null>(null);
  const [fotosServicos, setFotosServicos] = useState<string[]>([]);
  const [profissao, setProfissao] = useState('');

  const profissoes = [
    'Encanador', 'Eletricista', 'Pintor', 'Marceneiro',
    'Jardineiro', 'Faxineiro', 'Pedreiro', 'Serralheiro',
    'Arquiteto', 'Engenheiro', 'Diarista', 'Cozinheiro',
    'Mecânico', 'Chaveiro', 'Técnico em informática', 'Personal trainer'
  ];

  const handleSendOTP = () => {
    if (phone.length < 14) return;
    setOtpSent(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
    }
    setPhone(value);
  };

  const handleVerifyOTP = () => {
    if (otp.join('').length === 6) {
      if (isLogin) {
        // Login existente - usa dados mockados
        onLogin({ 
          name: 'Usuário CiviLar', 
          phone, 
          bairro: 'Vila Mariana', 
          role: selectedRole || 'solicitante' 
        });
      } else {
        // Novo cadastro - usa dados do formulário
        if (selectedRole && name && bairro) {
          onLogin({ name, phone, bairro, role: selectedRole });
        }
      }
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  return (
    <div className="page-section" style={{ background: 'var(--navy)', minHeight: '100vh', padding: 0 }}>
      <div style={{ padding: '20px', paddingTop: '40px' }}>
        <button 
          className="btn btn-sm btn-outline" 
          style={{ 
            width: 'auto', 
            padding: '8px 14px', 
            borderColor: 'rgba(255,255,255,0.2)', 
            color: 'white',
            marginBottom: '32px'
          }} 
          onClick={onBack}
        >
          <ArrowLeft size={18} /> Voltar
        </button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '180px', 
            height: '180px', 
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 16px 48px rgba(42,161,138,0.4)'
          }}>
            <img 
              src="/logo-civilar.png?v=2" 
              alt="CiviLar" 
              style={{ 
                width: '140px', 
                height: '140px', 
                objectFit: 'contain' 
              }} 
            />
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            color: 'white',
            marginBottom: '12px'
          }}>
            CiviLar
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255,255,255,0.75)', 
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            O bairro resolve o bairro.<br/>
            Conecte-se com quem precisa de você.
          </p>
          
          {/* Toggle Login/Cadastro */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '24px', 
            padding: '4px',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                background: !isLogin ? 'var(--primary)' : 'transparent',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              Criar conta
            </button>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                background: isLogin ? 'var(--primary)' : 'transparent',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              Entrar
            </button>
          </div>
        </div>

        {!otpSent ? (
          <>
            {!isLogin && (
              <div style={{ marginBottom: '32px' }}>
                <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                  Como você quer usar o CiviLar?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  className={`card ${selectedRole === 'prestador' ? 'active' : ''}`}
                  style={{
                    background: selectedRole === 'prestador' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    border: selectedRole === 'prestador' ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    color: selectedRole === 'prestador' ? 'white' : 'white'
                  }}
                  onClick={() => {
                    setSelectedRole('prestador');
                    setTemExperiencia(null);
                    setExperiencia('');
                    setFotosServicos([]);
                    setProfissao('');
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: selectedRole === 'prestador' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Briefcase size={24} color={selectedRole === 'prestador' ? 'white' : 'var(--primary)'} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>
                        Prestador de Serviços
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        Ofereço meus serviços para o bairro
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  className={`card ${selectedRole === 'solicitante' ? 'active' : ''}`}
                  style={{
                    background: selectedRole === 'solicitante' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    border: selectedRole === 'solicitante' ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    color: selectedRole === 'solicitante' ? 'white' : 'white'
                  }}
                  onClick={() => {
                    setSelectedRole('solicitante');
                    setTemExperiencia(null);
                    setExperiencia('');
                    setFotosServicos([]);
                    setProfissao('');
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: selectedRole === 'solicitante' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={24} color={selectedRole === 'solicitante' ? 'white' : 'var(--primary)'} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>
                        Solicitante
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        Preciso contratar serviços
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  className={`card ${selectedRole === 'ambos' ? 'active' : ''}`}
                  style={{
                    background: selectedRole === 'ambos' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    border: selectedRole === 'ambos' ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    color: selectedRole === 'ambos' ? 'white' : 'white'
                  }}
                  onClick={() => {
                    setSelectedRole('ambos');
                    setTemExperiencia(null);
                    setExperiencia('');
                    setFotosServicos([]);
                    setProfissao('');
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: selectedRole === 'ambos' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Users size={24} color={selectedRole === 'ambos' ? 'white' : 'var(--primary)'} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>
                        Ambos
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        Quero oferecer e contratar serviços
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                    Seu nome completo
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '1.1rem',
                      padding: '18px'
                    }}
                  />
                </div>

                <div>
                  <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                    Seu bairro
                  </label>
                  <select
                    className="input"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '1.1rem',
                      padding: '18px',
                      width: '100%'
                    }}
                  >
                    <option value="" style={{ color: '#333' }}>Selecione seu bairro</option>
                    {bairros.map(b => (
                      <option key={b} value={b} style={{ color: '#333' }}>{b}</option>
                    ))}
                  </select>
                </div>

                {(selectedRole === 'prestador' || selectedRole === 'ambos') && (
                  <div>
                    <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                      Sua profissão
                    </label>
                    <select
                      className="input"
                      value={profissao}
                      onChange={(e) => setProfissao(e.target.value)}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '1.1rem',
                        padding: '18px',
                        width: '100%'
                      }}
                    >
                      <option value="" style={{ color: '#333' }}>Selecione sua profissão</option>
                      {profissoes.map(p => (
                        <option key={p} value={p} style={{ color: '#333' }}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Validação para trabalhadores */}
            {!isLogin && (selectedRole === 'prestador' || selectedRole === 'ambos') && (
              <>
                <div>
                  <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                    Você já trabalhou como {selectedRole === 'ambos' ? 'prestador' : selectedRole}?
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setTemExperiencia(true)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: temExperiencia === true ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.2)',
                        background: temExperiencia === true ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => setTemExperiencia(false)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: temExperiencia === false ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.2)',
                        background: temExperiencia === false ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      Não
                    </button>
                  </div>
                </div>

                {temExperiencia === true && (
                  <div>
                    <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                      Conte sobre sua experiência
                    </label>
                    <textarea
                      className="input"
                      placeholder="Descreva sua experiência profissional..."
                      value={experiencia}
                      onChange={(e) => setExperiencia(e.target.value)}
                      rows={3}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '1rem',
                        padding: '14px',
                        resize: 'none'
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                    Fotos de seus serviços (opcional)
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {fotosServicos.map((foto, index) => (
                      <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                        <img
                          src={foto}
                          alt={`Foto ${index + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setFotosServicos(fotosServicos.filter((_, i) => i !== index))}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '24px',
                            height: '24px',
                            background: 'var(--danger)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {fotosServicos.length < 3 && (
                      <button
                        type="button"
                        onClick={() => {
                          const novaFoto = `https://via.placeholder.com/150?text=Foto+${fotosServicos.length + 1}`;
                          setFotosServicos([...fotosServicos, novaFoto]);
                        }}
                        style={{
                          width: '80px',
                          height: '80px',
                          border: '2px dashed rgba(255,255,255,0.3)',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.05)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '2rem'
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                    Máximo 3 fotos
                  </p>
                </div>
              </>
            )}

            <div>
              <label className="label" style={{ color: 'white', marginBottom: '12px' }}>
                Seu telefone
              </label>
              <input
                type="tel"
                className="input"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '18px'
                }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleSendOTP}
              disabled={isLogin ? phone.length < 14 : (!selectedRole || !name || !bairro || phone.length < 14 || ((selectedRole === 'prestador' || selectedRole === 'ambos') && (temExperiencia === null || !profissao)))}
              style={{
                background: isLogin ? (phone.length >= 14 ? 'var(--primary)' : 'rgba(255,255,255,0.1)') : (selectedRole && name && bairro && phone.length >= 14 && !((selectedRole === 'prestador' || selectedRole === 'ambos') && (temExperiencia === null || !profissao)) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'),
                border: 'none',
                color: isLogin ? (phone.length >= 14 ? 'white' : 'rgba(255,255,255,0.5)') : (selectedRole && name && bairro && phone.length >= 14 && !((selectedRole === 'prestador' || selectedRole === 'ambos') && (temExperiencia === null || !profissao)) ? 'white' : 'rgba(255,255,255,0.5)'),
                padding: '18px',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginTop: '24px'
              }}
            >
              {isLogin ? 'Entrar' : 'Continuar'}
            </button>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'var(--primary-light)', 
                borderRadius: '50%',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle size={32} color="var(--primary)" />
              </div>
              <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '8px' }}>
                Código enviado!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem' }}>
                Enviamos um código para {phone}
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label className="label" style={{ color: 'white', marginBottom: '16px', textAlign: 'center', display: 'block' }}>
                Digite o código de 6 dígitos
              </label>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    style={{
                      width: '48px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.1)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      transition: 'var(--transition)'
                    }}
                  />
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleVerifyOTP}
              disabled={otp.join('').length !== 6}
              style={{
                background: otp.join('').length === 6 ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                color: otp.join('').length === 6 ? 'white' : 'rgba(255,255,255,0.5)',
                padding: '18px',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '16px'
              }}
            >
              Entrar
            </button>

            <button 
              className="btn btn-outline" 
              onClick={() => {
                setOtpSent(false);
                setOtp(['', '', '', '', '', '']);
              }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
                padding: '16px',
                fontSize: '1rem'
              }}
            >
              Voltar
            </button>
          </>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(42,161,138,0.2)', 
                borderRadius: '12px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 8px'
              }}>
                <CheckCircle size={20} color="var(--primary)" />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Validado</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(42,161,138,0.2)', 
                borderRadius: '12px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 8px'
              }}>
                <Users size={20} color="var(--primary)" />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Comunitário</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(42,161,138,0.2)', 
                borderRadius: '12px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 8px'
              }}>
                <Star size={20} color="var(--primary)" />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Seguro</span>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
            Projeto FIAP · EstaTHon 2026
          </p>
        </div>
      </div>
    </div>
  );
}
