import { useState } from 'react';
import { getPrestadores, categorias } from '../data';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Props {
  onShowPrestador: (id: number) => void;
  onBack: () => void;
}

export default function MapScreen({ onShowPrestador, onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Pegamos todos para popular o mapa, independentemente do bairro do usuário atual
  const prestadores = getPrestadores(null, null);

  // Posições reais no mapa (baseado nos bairros de SP)
  const mapPositions = [
    { id: 1, lat: -23.589, lng: -46.634, bairro: 'Vila Mariana' },
    { id: 2, lat: -23.561, lng: -46.695, bairro: 'Pinheiros' },
    { id: 3, lat: -23.602, lng: -46.662, bairro: 'Moema' },
    { id: 4, lat: -23.567, lng: -46.666, bairro: 'Jardins' },
    { id: 5, lat: -23.611, lng: -46.693, bairro: 'Brooklin' },
    { id: 6, lat: -23.585, lng: -46.678, bairro: 'Itaim Bibi' },
    { id: 7, lat: -23.504, lng: -46.624, bairro: 'Santana' },
    { id: 8, lat: -23.540, lng: -46.576, bairro: 'Tatuapé' },
    { id: 9, lat: -23.568, lng: -46.635, bairro: 'Liberdade' },
  ];

  const filteredPositions = mapPositions.filter(pos => {
    const prestador = prestadores.find(p => p.id === pos.id);
    if (!prestador) return false;
    
    if (!selectedCategory) return true;
    
    // Mapeia categorias gerais (UI) para serviços específicos (Dados)
    const categoryMap: Record<string, string[]> = {
      'Reformas': ['Pedreiro', 'Pintura', 'Gesseiro', 'Construção'],
      'Limpeza': ['Diarista', 'Faxina', 'Limpeza', 'Lavar'],
      'Elétrica': ['Eletricista', 'Instalações'],
      'Encanamento': ['Encanador', 'Hidráulica', 'Chuveiro'],
      'Jardinagem': ['Jardineiro', 'Paisagismo', 'Podas'],
      'Costura': ['Costura', 'Alfaiataria', 'Ajustes'],
      'Marcenaria': ['Marceneiro', 'Móveis', 'Restauração'],
      'Cuidados': ['Babá', 'Cuidadora', 'Acompanhante']
    };
    
    const validServices = categoryMap[selectedCategory] || [selectedCategory];
    return prestador.servicos.some(s => 
      validServices.some(vs => s.toLowerCase().includes(vs.toLowerCase()))
    );
  });

  return (
    <div className="page-section" style={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="app-header">
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={onBack}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <h1>Mapa</h1>
        <button className="btn btn-sm btn-outline" style={{ width: 'auto', padding: '8px 14px', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
          <Filter size={18} />
        </button>
      </div>

      {/* Filtros de categoria */}
      <div style={{ background: 'var(--bg)', padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="category-scroll" style={{ marginBottom: '8px' }}>
          <button 
            className={`chip ${selectedCategory === null ? 'active' : ''}`} 
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button 
              key={cat.nome} 
              className={`chip ${selectedCategory === cat.nome ? 'active' : ''}`} 
              onClick={() => setSelectedCategory(cat.nome)}
              style={!selectedCategory || selectedCategory !== cat.nome ? { background: cat.bg, color: cat.cor, borderColor: cat.bg } : {}}
            >
              <span style={{ marginRight: '4px' }}>{cat.icon}</span>
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Mapa interativo */}
      <div style={{ flex: 1, position: 'relative', zIndex: 0 }}>
        <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPositions.map(pos => {
            const prestador = prestadores.find(p => p.id === pos.id);
            if (!prestador) return null;
            
            const userIcon = L.divIcon({
              className: 'custom-user-marker',
              html: `
                <div style="
                  width: 44px; height: 44px; border-radius: 50%;
                  background: ${prestador.premium ? 'linear-gradient(135deg, #F59E0B, #B45309)' : 'var(--primary)'}; 
                  border: 3px solid white;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                  display: flex; align-items: center; justify-content: center;
                  color: white; font-weight: bold; font-size: 14px;
                  position: relative;
                ">
                  ${prestador.initials}
                  ${prestador.premium ? '<div style="position:absolute; top:-6px; right:-6px; background:white; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center; font-size:10px;">👑</div>' : ''}
                </div>
              `,
              iconSize: [44, 44],
              iconAnchor: [22, 22],
              popupAnchor: [0, -22]
            });

            return (
              <Marker key={pos.id} position={[pos.lat, pos.lng]} icon={userIcon}>
                <Popup>
                  <div style={{ textAlign: 'center', minWidth: '120px' }}>
                    <strong style={{ fontSize: '1rem' }}>{prestador.name}</strong><br/>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{prestador.bairro}</span><br/>
                    <div style={{ marginTop: '4px', marginBottom: '8px', fontSize: '0.8rem' }}>
                      ⭐ {prestador.avaliacao} ({prestador.avaliacoesCount} avaliações)
                    </div>
                    <button 
                      className="btn btn-sm btn-primary" 
                      style={{ padding: '6px 12px', width: '100%' }}
                      onClick={() => onShowPrestador(prestador.id)}
                    >
                      Ver Perfil
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Info do mapa */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255,255,255,0.95)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <MapPin size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              {filteredPositions.length} prestadores na região
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {selectedCategory ? `Filtrando: ${selectedCategory}` : 'Mostrando todos'}
          </span>
        </div>
      </div>
    </div>
  );
}
