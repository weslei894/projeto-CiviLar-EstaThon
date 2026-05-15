import { useState } from 'react';
import { ArrowLeft, Star, Calendar, Camera, X } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function AvaliacoesScreen({ onBack }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);

  const [avaliacoes, setAvaliacoes] = useState([
    {
      id: 1,
      cliente: 'Maria Silva',
      avatarClass: 'avatar-2',
      rating: 5,
      data: '15/04/2026',
      comentario: 'Excelente profissional! Muito atenciosa e fez um trabalho impecável na faxina da minha casa. Super recomendo!',
      servico: 'Faxina'
    },
    {
      id: 2,
      cliente: 'João Santos',
      avatarClass: 'avatar-3',
      rating: 5,
      data: '10/04/2026',
      comentario: 'Chegou no horário combinado, trabalhou com dedicação e deixou tudo perfeito. Preço justo também.',
      servico: 'Faxina'
    },
    {
      id: 3,
      cliente: 'Ana Costa',
      avatarClass: 'avatar-4',
      rating: 4,
      data: '05/04/2026',
      comentario: 'Bom trabalho, mas poderia ter sido mais rápido no geral. A qualidade ficou ótima.',
      servico: 'Organização'
    },
    {
      id: 4,
      cliente: 'Pedro Lima',
      avatarClass: 'avatar-5',
      rating: 5,
      data: '28/03/2026',
      comentario: 'Profissional muito competente. Já contratei várias vezes e sempre satisfeito.',
      servico: 'Cozinha'
    },
    {
      id: 5,
      cliente: 'Carla Mendes',
      avatarClass: 'avatar-6',
      rating: 5,
      data: '20/03/2026',
      comentario: 'Atenciosa, pontual e faz tudo com carinho. Minha casa ficou brilhando!',
      servico: 'Faxina'
    }
  ]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = () => {
    if (newRating === 0 || !newComment.trim()) return;
    const review = {
      id: Date.now(),
      cliente: 'Você',
      avatarClass: 'avatar-1',
      rating: newRating,
      data: new Date().toLocaleDateString('pt-BR'),
      comentario: newComment,
      servico: 'Serviço Recente',
      imagem: newImage
    };
    setAvaliacoes([review, ...avaliacoes]);
    setShowForm(false);
    setNewRating(0);
    setNewComment('');
    setNewImage(null);
  };

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Avaliações</h1>
        <div style={{ width: '76px' }} />
      </div>

      <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'rgba(42,161,138,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            4.9
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: 'var(--primary-dark)' }}>Média de avaliações</div>
            <div className="text-sm" style={{ color: 'var(--primary)' }}>Baseado em 42 avaliações</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} size={16} fill={star <= 5 ? 'var(--primary)' : 'none'} color={star <= 5 ? 'var(--primary)' : 'var(--border)'} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h2 className="text-lg font-bold">Todas as avaliações</h2>
        <button className="btn btn-sm btn-primary" style={{ padding: '6px 12px' }} onClick={() => setShowForm(!showForm)}>
          + Avaliar
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '16px', background: 'var(--bg)', border: '2px dashed var(--primary)' }}>
          <h3 className="font-semibold mb-3">Deixe sua avaliação</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={24} 
                fill={star <= newRating ? 'var(--primary)' : 'none'} 
                color={star <= newRating ? 'var(--primary)' : 'var(--border)'} 
                onClick={() => setNewRating(star)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <textarea 
            className="input mb-3" 
            placeholder="Como foi o serviço? Escreva sua experiência..." 
            rows={3} 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            {newImage ? (
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <img src={newImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                <button 
                  onClick={() => setNewImage(null)}
                  style={{ position: 'absolute', top: -6, right: -6, background: 'var(--danger)', color: 'white', borderRadius: '50%', border: 'none', padding: '2px', cursor: 'pointer' }}
                ><X size={12} /></button>
              </div>
            ) : (
              <label className="btn btn-sm btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Camera size={16} /> Adicionar Foto
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAddImage} />
              </label>
            )}
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSubmitReview} disabled={newRating === 0 || !newComment.trim()}>
            Publicar Avaliação
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {avaliacoes.map(avaliacao => (
          <div key={avaliacao.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div className={`avatar avatar-md ${avaliacao.avatarClass}`}>
                {avaliacao.cliente.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="font-semibold text-sm">{avaliacao.cliente}</div>
                <div className="text-xs text-secondary">{avaliacao.servico}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} color="var(--text-muted)" />
                <span className="text-xs text-secondary">{avaliacao.data}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={14} fill={star <= avaliacao.rating ? 'var(--primary)' : 'none'} color={star <= avaliacao.rating ? 'var(--primary)' : 'var(--border)'} />
              ))}
            </div>
            <p className="text-sm" style={{ lineHeight: 1.6, color: 'var(--text)' }}>
              {avaliacao.comentario}
            </p>
            {/* @ts-ignore */}
            {avaliacao.imagem && (
              <div style={{ marginTop: '12px' }}>
                {/* @ts-ignore */}
                <img src={avaliacao.imagem} alt="Foto do serviço" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
