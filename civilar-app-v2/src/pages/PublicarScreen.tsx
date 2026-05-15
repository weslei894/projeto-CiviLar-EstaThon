import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onPublicar?: (publicacao: any) => void;
}

export default function PublicarScreen({ onBack, onToast, onPublicar }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [imagens, setImagens] = useState<string[]>([]);

  const categorias = [
    'Encanador', 'Eletricista', 'Pintor', 'Marceneiro', 
    'Jardineiro', 'Faxineiro', 'Pedreiro', 'Serralheiro',
    'Arquiteto', 'Engenheiro', 'Diarista', 'Cozinheiro'
  ];

  const handlePublicar = () => {
    if (!titulo || !descricao || !categoria) {
      onToast('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    const novaPublicacao = {
      id: Date.now(),
      titulo,
      descricao,
      categoria,
      preco,
      imagens,
      data: new Date().toISOString()
    };

    // Simular publicação
    onPublicar?.(novaPublicacao);
    onToast('Serviço publicado com sucesso!', 'success');
    onBack();
  };

  const handleAddImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagens(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  return (
    <div className="page-section">
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Publicar Serviço</h1>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ padding: '20px' }}>
        <div className="card">
          <h3 className="font-semibold mb-4">Informações do serviço</h3>

          {/* Título */}
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Título *</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: Reparo hidráulico completo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          {/* Categoria */}
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Categoria *</label>
            <select
              className="input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Descrição */}
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Descrição *</label>
            <textarea
              className="input"
              placeholder="Descreva o serviço que você oferece..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Preço */}
          <div style={{ marginBottom: '16px' }}>
            <label className="label">Preço (opcional)</label>
            <input
              type="text"
              className="input"
              placeholder="Ex: R$ 150,00 ou A combinar"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>

          {/* Imagens */}
          <div style={{ marginBottom: '16px' }}>
            <label className="label mb-2">Imagens (opcional)</label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {imagens.map((img, index) => (
                <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <img
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <button
                    onClick={() => handleRemoveImagem(index)}
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
                    <X size={14} />
                  </button>
                </div>
              ))}
              {imagens.length < 5 && (
                <label
                  style={{
                    width: '80px',
                    height: '80px',
                    border: '2px dashed var(--border)',
                    borderRadius: '8px',
                    background: 'var(--bg)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)'
                  }}
                >
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAddImagem} />
                  <Plus size={24} />
                </label>
              )}
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handlePublicar}
            style={{ width: '100%', marginTop: '8px' }}
          >
            Publicar Serviço
          </button>
        </div>

        {/* Informações */}
        <div className="card" style={{ marginTop: '16px', background: 'var(--bg)' }}>
          <h4 className="font-semibold mb-2" style={{ fontSize: '0.9rem' }}>Dicas para publicar:</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem' }}>
            <li style={{ marginBottom: '8px' }}>• Use um título claro e descritivo</li>
            <li style={{ marginBottom: '8px' }}>• Detalhe bem o serviço oferecido</li>
            <li style={{ marginBottom: '8px' }}>• Adicione fotos do seu trabalho</li>
            <li>• Defina um preço justo para o mercado</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
