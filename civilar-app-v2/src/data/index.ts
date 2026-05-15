import type { Prestador, Categoria, Referencia, DadosIBGE } from '../types';

export const bairros = [
  'Vila Mariana', 'Pinheiros', 'Moema', 'Jardins', 'Brooklin',
  'Itaim Bibi', 'Perdizes', 'Santana', 'Tatuapé', 'Liberdade',
  'Bela Vista', 'Consolação', 'Higienópolis', 'Jardim América', 'Jardim Europa',
  'Jardim Paulista', 'Paraíso', 'Bixiga', 'Bom Retiro', 'Pari',
  'Barra Funda', 'Alto de Pinheiros', 'Jardim Paulistano', 'Pinheiros', 'Vila Madalena',
  'Sumaré', 'Pacaembu', 'Jardins', 'Cerqueira César', 'Bela Vista',
  'Vila Nova Conceição', 'Moema', 'Indianópolis', 'Planalto Paulista', 'Saúde',
  'Jabaquara', 'Santo Amaro', 'Campo Belo', 'Chácara Santo Antônio', 'Socorro',
  'Interlagos', 'Cidade Dutra', 'Grajaú', 'Pedreira', 'Cachoeirinha',
  'Freguesia do Ó', 'Brasilândia', 'Casa Verde', 'Limão', 'Vila Guilherme',
  'Vila Maria', 'Canindé', 'Barra Funda', 'Pompéia', 'Água Branca',
  'Lapa', 'Pinheiros', 'Alto de Pinheiros', 'Jardim Paulistano', 'Vila Madalena',
  'Sumaré', 'Pacaembu', 'Higienópolis', 'Consolação', 'Bela Vista',
  'Sé', 'República', 'Bom Retiro', 'Pari', 'Brás',
  'Mooca', 'Água Rasa', 'Tatuapé', 'Pari', 'Penha',
  'Vila Matilde', 'Artur Alvim', 'Carrão', 'Ponte Rasa', 'Vila Formosa',
  'Ipiranga', 'Sacomã', 'Jabaquara', 'Cursino', 'Saúde',
  'Jardim da Saúde', 'Planalto Paulista', 'Vila Prudente', 'São Lucas', 'Sapopemba',
  'São Miguel Paulista', 'Vila Jacuí', 'Jardim Helena', 'Itaim Paulista', 'Cidade Líder',
  'Guaianases', 'Lajeado', 'José Bonifácio', 'Cidade Tiradentes', 'Itaquera',
  'Artur Alvim', 'Carrão', 'Ponte Rasa', 'Vila Formosa', 'Vila Matilde'
];

export const servicosLista = [
  'Pedreiro', 'Pintura', 'Eletricista', 'Encanador', 'Diarista',
  'Faxina', 'Jardineiro', 'Costura', 'Marceneiro', 'Serralheiro',
  'Gesseiro', 'Pequenos Reparos', 'Instalações', 'Paisagismo',
  'Consertos', 'Ajustes', 'Lavar Louça', 'Passar Roupa',
  'Babá', 'Cuidadora', 'Acompanhante'
];

export const categorias: Categoria[] = [
  { nome: 'Reformas', icon: '🔨', cor: '#F59E0B', bg: '#FEF3C7' },
  { nome: 'Limpeza', icon: '🧹', cor: '#10B981', bg: '#ECFDF5' },
  { nome: 'Elétrica', icon: '⚡', cor: '#3B82F6', bg: '#EFF6FF' },
  { nome: 'Encanamento', icon: '🚿', cor: '#06B6D4', bg: '#ECFEFF' },
  { nome: 'Jardinagem', icon: '🌿', cor: '#84CC16', bg: '#F7FEE7' },
  { nome: 'Costura', icon: '🧵', cor: '#EC4899', bg: '#FDF2F8' },
  { nome: 'Marcenaria', icon: '🪚', cor: '#8B5CF6', bg: '#F5F3FF' },
  { nome: 'Cuidados', icon: '❤️', cor: '#EF4444', bg: '#FEF2F2' }
];

export const prestadores: Prestador[] = [
  {
    id: 1, name: 'João Silva', initials: 'JS', avatarClass: 'avatar-1',
    bairro: 'Vila Mariana', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Pintura', 'Pequenos Reparos'],
    avaliacao: 4.8, avaliacoesCount: 12, verified: true, premium: false,
    telefone: '(11) 98765-4321',
    bio: 'Pedreiro com 15 anos de experiência. Faço reparos, pinturas e pequenas reformas. Atendo Vila Mariana e região.',
    since: '2026-01'
  },
  {
    id: 2, name: 'Maria Oliveira', initials: 'MO', avatarClass: 'avatar-2',
    bairro: 'Pinheiros', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavar Louça'],
    avaliacao: 4.9, avaliacoesCount: 28, verified: true, premium: true,
    telefone: '(11) 91234-5678',
    bio: 'Diarista dedicada e pontual. Trabalho com produtos de qualidade e cuidado especial com cada cantinho.',
    since: '2025-11'
  },
  {
    id: 3, name: 'Carlos Mendes', initials: 'CM', avatarClass: 'avatar-3',
    bairro: 'Moema', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações'],
    avaliacao: 4.7, avaliacoesCount: 8, verified: true, premium: false,
    telefone: '(11) 94567-8901',
    bio: 'Eletricista residencial e predial. Instalações, reparos e manutenção elétrica com segurança.',
    since: '2026-02'
  },
  {
    id: 4, name: 'Ana Costa', initials: 'AC', avatarClass: 'avatar-4',
    bairro: 'Vila Mariana', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Consertos', 'Ajustes'],
    avaliacao: 5.0, avaliacoesCount: 6, verified: true, premium: false,
    telefone: '(11) 99876-5432',
    bio: 'Costureira com experiência em roupas sociais, jeans e vestidos de festa. Faço ajustes e consertos rápidos.',
    since: '2026-03'
  },
  {
    id: 5, name: 'Pedro Santos', initials: 'PS', avatarClass: 'avatar-5',
    bairro: 'Jardins', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Podas'],
    avaliacao: 4.6, avaliacoesCount: 15, verified: true, premium: true,
    telefone: '(11) 92345-6789',
    bio: 'Cuido do seu jardim com carinho. Podas, replantio, adubação e paisagismo residencial.',
    since: '2025-09'
  },
  {
    id: 6, name: 'Fernanda Lima', initials: 'FL', avatarClass: 'avatar-4',
    bairro: 'Brooklin', cidade: 'São Paulo', tipo: 'solicitante',
    servicos: [], avaliacao: 0, avaliacoesCount: 0,
    verified: false, premium: false,
    telefone: '(11) 93456-7890', bio: '', since: '2026-04'
  },
  {
    id: 7, name: 'Luciana Pereira', initials: 'LP', avatarClass: 'avatar-6',
    bairro: 'Itaim Bibi', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Móveis Planejados', 'Restauração'],
    avaliacao: 4.9, avaliacoesCount: 22, verified: true, premium: true,
    telefone: '(11) 91111-2222',
    bio: 'Marceneira especializada em móveis planejados e restauração de peças antigas. Qualidade e acabamento impecável.',
    since: '2025-07'
  },
  {
    id: 8, name: 'Roberto Almeida', initials: 'RA', avatarClass: 'avatar-7',
    bairro: 'Santana', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Reparos Hidráulicos', 'Instalação de Chuveiro'],
    avaliacao: 4.5, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 93333-4444',
    bio: 'Encanador com 20 anos de experiência. Atendo emergências e faço orçamento sem compromisso.',
    since: '2025-12'
  },
  {
    id: 9, name: 'Juliana Martins', initials: 'JM', avatarClass: 'avatar-8',
    bairro: 'Tatuapé', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Acompanhante'],
    avaliacao: 4.9, avaliacoesCount: 35, verified: true, premium: false,
    telefone: '(11) 95555-6666',
    bio: 'Cuidadora infantil e de idosos com formação em enfermagem. Amor e responsabilidade em cada atendimento.',
    since: '2025-05'
  },
  {
    id: 10, name: 'Ricardo Ferreira', initials: 'RF', avatarClass: 'avatar-1',
    bairro: 'Bela Vista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Gesseiro', 'Reformas'],
    avaliacao: 4.7, avaliacoesCount: 19, verified: true, premium: false,
    telefone: '(11) 97777-8888',
    bio: 'Pintor profissional com experiência em residências e comércios. Trabalho com acabamento de qualidade.',
    since: '2025-08'
  },
  {
    id: 11, name: 'Carla Rodrigues', initials: 'CR', avatarClass: 'avatar-2',
    bairro: 'Consolação', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Passar Roupa'],
    avaliacao: 4.8, avaliacoesCount: 31, verified: true, premium: true,
    telefone: '(11) 98888-9999',
    bio: 'Diarista experiente e confiável. Cuido da sua casa como se fosse minha.',
    since: '2025-06'
  },
  {
    id: 12, name: 'Paulo Henrique', initials: 'PH', avatarClass: 'avatar-3',
    bairro: 'Higienópolis', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Manutenção'],
    avaliacao: 4.6, avaliacoesCount: 14, verified: true, premium: false,
    telefone: '(11) 92222-3333',
    bio: 'Eletricista certificado. Atendo residências e empresas com agilidade e segurança.',
    since: '2026-01'
  },
  {
    id: 13, name: 'Beatriz Souza', initials: 'BS', avatarClass: 'avatar-4',
    bairro: 'Jardim América', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Ajustes', 'Bordado'],
    avaliacao: 4.9, avaliacoesCount: 27, verified: true, premium: true,
    telefone: '(11) 94444-5555',
    bio: 'Costureira especializada em roupas de festa e bordados. Trabalho com tecidos nobres.',
    since: '2025-04'
  },
  {
    id: 14, name: 'André Costa', initials: 'AC', avatarClass: 'avatar-5',
    bairro: 'Jardim Europa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Irrigação'],
    avaliacao: 4.5, avaliacoesCount: 11, verified: true, premium: false,
    telefone: '(11) 96666-7777',
    bio: 'Jardineiro com conhecimento em plantas nativas e sistemas de irrigação automatizados.',
    since: '2025-10'
  },
  {
    id: 15, name: 'Daniela Lima', initials: 'DL', avatarClass: 'avatar-6',
    bairro: 'Jardim Paulista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Aulas'],
    avaliacao: 5.0, avaliacoesCount: 42, verified: true, premium: true,
    telefone: '(11) 91111-0000',
    bio: 'Pedagoga com especialização em educação infantil. Cuido e ensino com amor.',
    since: '2025-03'
  },
  {
    id: 16, name: 'Marcos Antonio', initials: 'MA', avatarClass: 'avatar-7',
    bairro: 'Paraíso', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Reformas', 'Construção'],
    avaliacao: 4.4, avaliacoesCount: 23, verified: true, premium: false,
    telefone: '(11) 93333-1111',
    bio: 'Mestre de obras com 25 anos de experiência. Reformas completas e construções.',
    since: '2025-02'
  },
  {
    id: 17, name: 'Renata Gomes', initials: 'RG', avatarClass: 'avatar-8',
    bairro: 'Bixiga', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Organização'],
    avaliacao: 4.7, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 95555-2222',
    bio: 'Diarista que também cozinha e organiza a casa. Cardápios variados e limpeza completa.',
    since: '2025-09'
  },
  {
    id: 18, name: 'Felipe Santos', initials: 'FS', avatarClass: 'avatar-1',
    bairro: 'Bom Retiro', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Reparos'],
    avaliacao: 4.6, avaliacoesCount: 16, verified: true, premium: false,
    telefone: '(11) 97777-3333',
    bio: 'Encanador disponível para emergências 24h. Reparos rápidos e garantidos.',
    since: '2025-11'
  },
  {
    id: 19, name: 'Patricia Alves', initials: 'PA', avatarClass: 'avatar-2',
    bairro: 'Pari', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Alfaiataria', 'Ajustes'],
    avaliacao: 4.8, avaliacoesCount: 29, verified: true, premium: true,
    telefone: '(11) 98888-4444',
    bio: 'Alfaiate com experiência em ternos e vestidos de festa. Ajustes perfeitos.',
    since: '2025-07'
  },
  {
    id: 20, name: 'Gustavo Rocha', initials: 'GR', avatarClass: 'avatar-3',
    bairro: 'Barra Funda', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Chuveiros'],
    avaliacao: 4.5, avaliacoesCount: 13, verified: true, premium: false,
    telefone: '(11) 92222-5555',
    bio: 'Eletricista focado em instalações residenciais. Troca de chuveiros e fiação.',
    since: '2026-02'
  },
  {
    id: 21, name: 'Camila Dias', initials: 'CD', avatarClass: 'avatar-4',
    bairro: 'Alto de Pinheiros', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavanderia'],
    avaliacao: 4.9, avaliacoesCount: 34, verified: true, premium: true,
    telefone: '(11) 94444-6666',
    bio: 'Diarista premium com produtos de alta qualidade. Atendo famílias exigentes.',
    since: '2025-05'
  },
  {
    id: 22, name: 'Bruno Martins', initials: 'BM', avatarClass: 'avatar-5',
    bairro: 'Jardim Paulistano', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Restauração', 'Design'],
    avaliacao: 4.7, avaliacoesCount: 21, verified: true, premium: false,
    telefone: '(11) 96666-8888',
    bio: 'Marceneiro com visão de design. Móveis personalizados e restauração de antiguidades.',
    since: '2025-08'
  },
  {
    id: 23, name: 'Amanda Silva', initials: 'AS', avatarClass: 'avatar-6',
    bairro: 'Vila Madalena', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Recreação'],
    avaliacao: 4.8, avaliacoesCount: 26, verified: true, premium: false,
    telefone: '(11) 91111-9999',
    bio: 'Cuidadora infantil com atividades recreativas e educativas. Amor e paciência.',
    since: '2025-06'
  },
  {
    id: 24, name: 'Leonardo Oliveira', initials: 'LO', avatarClass: 'avatar-7',
    bairro: 'Sumaré', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Texturas', 'Decoração'],
    avaliacao: 4.6, avaliacoesCount: 17, verified: true, premium: false,
    telefone: '(11) 93333-4444',
    bio: 'Pintor especializado em texturas e efeitos decorativos. Transforme suas paredes.',
    since: '2025-10'
  },
  {
    id: 25, name: 'Juliana Ferreira', initials: 'JF', avatarClass: 'avatar-8',
    bairro: 'Pacaembu', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Eventos'],
    avaliacao: 4.9, avaliacoesCount: 38, verified: true, premium: true,
    telefone: '(11) 95555-7777',
    bio: 'Diarista que também cozinha para eventos. Buffets e jantares especiais.',
    since: '2025-04'
  },
  {
    id: 26, name: 'Rafael Carvalho', initials: 'RC', avatarClass: 'avatar-1',
    bairro: 'Cerqueira César', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Automação', 'Segurança'],
    avaliacao: 4.8, avaliacoesCount: 24, verified: true, premium: false,
    telefone: '(11) 97777-0000',
    bio: 'Eletricista com especialização em automação residencial. Casas inteligentes.',
    since: '2025-09'
  },
  {
    id: 27, name: 'Mariana Costa', initials: 'MC', avatarClass: 'avatar-2',
    bairro: 'Vila Nova Conceição', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Moda', 'Design'],
    avaliacao: 5.0, avaliacoesCount: 45, verified: true, premium: true,
    telefone: '(11) 98888-1111',
    bio: 'Designer de moda e costureira. Crio peças exclusivas e faço ajustes.',
    since: '2025-03'
  },
  {
    id: 28, name: 'Thiago Lima', initials: 'TL', avatarClass: 'avatar-3',
    bairro: 'Indianópolis', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Podas', 'Manutenção'],
    avaliacao: 4.5, avaliacoesCount: 12, verified: true, premium: false,
    telefone: '(11) 92222-6666',
    bio: 'Jardineiro com equipamentos próprios. Podas de árvores e manutenção de jardins.',
    since: '2025-11'
  },
  {
    id: 29, name: 'Vanessa Pereira', initials: 'VP', avatarClass: 'avatar-4',
    bairro: 'Planalto Paulista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Escolar'],
    avaliacao: 4.7, avaliacoesCount: 33, verified: true, premium: false,
    telefone: '(11) 94444-7777',
    bio: 'Cuidadora infantil com acompanhamento escolar. Ajudo nas tarefas.',
    since: '2025-07'
  },
  {
    id: 30, name: 'Diego Alves', initials: 'DA', avatarClass: 'avatar-5',
    bairro: 'Saúde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Reformas', 'Acabamento'],
    avaliacao: 4.6, avaliacoesCount: 20, verified: true, premium: false,
    telefone: '(11) 96666-9999',
    bio: 'Pedreiro com foco em acabamento de qualidade. Reformas completas.',
    since: '2025-08'
  },
  {
    id: 31, name: 'Fernanda Gomes', initials: 'FG', avatarClass: 'avatar-6',
    bairro: 'Jabaquara', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Organização'],
    avaliacao: 4.8, avaliacoesCount: 28, verified: true, premium: false,
    telefone: '(11) 91111-2222',
    bio: 'Diarista organizada e detalhista. Deixo tudo impecável.',
    since: '2025-06'
  },
  {
    id: 32, name: 'Lucas Rodrigues', initials: 'LR', avatarClass: 'avatar-7',
    bairro: 'Santo Amaro', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Instalações'],
    avaliacao: 4.5, avaliacoesCount: 15, verified: true, premium: false,
    telefone: '(11) 93333-5555',
    bio: 'Encanador com experiência em instalações completas. Banheiros e cozinhas.',
    since: '2025-10'
  },
  {
    id: 33, name: 'Carolina Mendes', initials: 'CM', avatarClass: 'avatar-8',
    bairro: 'Campo Belo', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Bordado', 'Patchwork'],
    avaliacao: 4.9, avaliacoesCount: 31, verified: true, premium: true,
    telefone: '(11) 95555-8888',
    bio: 'Costureira especializada em patchwork e bordados. Trabalhos artísticos.',
    since: '2025-05'
  },
  {
    id: 34, name: 'Gabriel Santos', initials: 'GS', avatarClass: 'avatar-1',
    bairro: 'Chácara Santo Antônio', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Design'],
    avaliacao: 4.7, avaliacoesCount: 19, verified: true, premium: false,
    telefone: '(11) 97777-1111',
    bio: 'Paisagista com projetos completos. Jardins residenciais e comerciais.',
    since: '2025-09'
  },
  {
    id: 35, name: 'Larissa Costa', initials: 'LC', avatarClass: 'avatar-2',
    bairro: 'Socorro', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Infantil'],
    avaliacao: 4.8, avaliacoesCount: 36, verified: true, premium: false,
    telefone: '(11) 98888-2222',
    bio: 'Cuidadora infantil com formação em pedagogia. Atividades lúdicas.',
    since: '2025-04'
  },
  {
    id: 36, name: 'Ricardo Junior', initials: 'RJ', avatarClass: 'avatar-3',
    bairro: 'Interlagos', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Reformas', 'Gesso'],
    avaliacao: 4.4, avaliacoesCount: 22, verified: true, premium: false,
    telefone: '(11) 92222-7777',
    bio: 'Pintor e gesseiro. Reformas completas com acabamento profissional.',
    since: '2025-08'
  },
  {
    id: 37, name: 'Aline Ferreira', initials: 'AF', avatarClass: 'avatar-4',
    bairro: 'Cidade Dutra', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavanderia'],
    avaliacao: 4.7, avaliacoesCount: 25, verified: true, premium: false,
    telefone: '(11) 94444-8888',
    bio: 'Diarista que também lava e passa roupa. Serviço completo.',
    since: '2025-07'
  },
  {
    id: 38, name: 'Felipe Augusto', initials: 'FA', avatarClass: 'avatar-5',
    bairro: 'Grajaú', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Manutenção'],
    avaliacao: 4.6, avaliacoesCount: 14, verified: true, premium: false,
    telefone: '(11) 96666-0000',
    bio: 'Eletricista disponível para reparos rápidos. Atendo emergências.',
    since: '2025-11'
  },
  {
    id: 39, name: 'Patricia Rocha', initials: 'PR', avatarClass: 'avatar-6',
    bairro: 'Pedreira', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Ajustes', 'Consertos'],
    avaliacao: 4.9, avaliacoesCount: 40, verified: true, premium: true,
    telefone: '(11) 91111-3333',
    bio: 'Costureira experiente em todos os tipos de conserto. Rápida e eficiente.',
    since: '2025-03'
  },
  {
    id: 40, name: 'André Luiz', initials: 'AL', avatarClass: 'avatar-7',
    bairro: 'Cachoeirinha', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Restauração', 'Móveis'],
    avaliacao: 4.5, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 93333-6666',
    bio: 'Marceneiro com oficina própria. Fabrico e restauro móveis.',
    since: '2025-10'
  },
  {
    id: 41, name: 'Camila Souza', initials: 'CS', avatarClass: 'avatar-8',
    bairro: 'Freguesia do Ó', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Idosos'],
    avaliacao: 4.8, avaliacoesCount: 29, verified: true, premium: false,
    telefone: '(11) 95555-9999',
    bio: 'Cuidadora de idosos com experiência em hospital. Cuidados especiais.',
    since: '2025-06'
  },
  {
    id: 42, name: 'Bruno Dias', initials: 'BD', avatarClass: 'avatar-1',
    bairro: 'Brasilândia', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Construção', 'Reformas'],
    avaliacao: 4.4, avaliacoesCount: 21, verified: true, premium: false,
    telefone: '(11) 97777-2222',
    bio: 'Pedreiro com equipe própria. Reformas completas e construções.',
    since: '2025-09'
  },
  {
    id: 43, name: 'Amanda Lima', initials: 'AL', avatarClass: 'avatar-2',
    bairro: 'Casa Verde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Cozinha'],
    avaliacao: 4.7, avaliacoesCount: 32, verified: true, premium: false,
    telefone: '(11) 98888-3333',
    bio: 'Diarista que também cozinha. Cardápios variados e limpeza.',
    since: '2025-05'
  },
  {
    id: 44, name: 'Gustavo Ferreira', initials: 'GF', avatarClass: 'avatar-3',
    bairro: 'Limão', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Reparos'],
    avaliacao: 4.6, avaliacoesCount: 16, verified: true, premium: false,
    telefone: '(11) 92222-8888',
    bio: 'Encanador com 15 anos de experiência. Reparos rápidos e garantidos.',
    since: '2025-10'
  },
  {
    id: 45, name: 'Juliana Alves', initials: 'JA', avatarClass: 'avatar-4',
    bairro: 'Vila Guilherme', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Moda', 'Alfaiataria'],
    avaliacao: 4.9, avaliacoesCount: 37, verified: true, premium: true,
    telefone: '(11) 94444-9999',
    bio: 'Costureira e alfaiate. Roupas sob medida e ajustes perfeitos.',
    since: '2025-04'
  },
  {
    id: 46, name: 'Rafael Costa', initials: 'RC', avatarClass: 'avatar-5',
    bairro: 'Vila Maria', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Automação', 'Iluminação'],
    avaliacao: 4.5, avaliacoesCount: 13, verified: true, premium: false,
    telefone: '(11) 96666-1111',
    bio: 'Eletricista especializado em iluminação. Projetos de luz.',
    since: '2025-11'
  },
  {
    id: 47, name: 'Mariana Santos', initials: 'MS', avatarClass: 'avatar-6',
    bairro: 'Canindé', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Organização', 'Eventos'],
    avaliacao: 4.8, avaliacoesCount: 27, verified: true, premium: false,
    telefone: '(11) 91111-4444',
    bio: 'Diarista organizadora. Organizo casas e preparo eventos.',
    since: '2025-07'
  },
  {
    id: 48, name: 'Thiago Rocha', initials: 'TR', avatarClass: 'avatar-7',
    bairro: 'Pompéia', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Texturas', 'Efeitos'],
    avaliacao: 4.6, avaliacoesCount: 19, verified: true, premium: false,
    telefone: '(11) 93333-7777',
    bio: 'Pintor artístico. Texturas, efeitos e pinturas decorativas.',
    since: '2025-08'
  },
  {
    id: 49, name: 'Vanessa Martins', initials: 'VM', avatarClass: 'avatar-8',
    bairro: 'Água Branca', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Jardins'],
    avaliacao: 4.7, avaliacoesCount: 23, verified: true, premium: false,
    telefone: '(11) 95555-0000',
    bio: 'Jardineira com projetos completos. Jardins verticais e horizontais.',
    since: '2025-06'
  },
  {
    id: 50, name: 'Diego Pereira', initials: 'DP', avatarClass: 'avatar-1',
    bairro: 'Lapa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Móveis', 'Restauração'],
    avaliacao: 4.5, avaliacoesCount: 17, verified: true, premium: false,
    telefone: '(11) 97777-3333',
    bio: 'Marceneiro com experiência em móveis de design. Fabricação sob medida.',
    since: '2025-10'
  },
  {
    id: 51, name: 'Fernanda Guedes', initials: 'FG', avatarClass: 'avatar-2',
    bairro: 'Sé', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Escolar'],
    avaliacao: 4.9, avaliacoesCount: 41, verified: true, premium: true,
    telefone: '(11) 98888-4444',
    bio: 'Cuidadora infantil com acompanhamento escolar completo. Tarefas e reforço.',
    since: '2025-03'
  },
  {
    id: 52, name: 'Lucas Almeida', initials: 'LA', avatarClass: 'avatar-3',
    bairro: 'República', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Reformas', 'Acabamento'],
    avaliacao: 4.4, avaliacoesCount: 24, verified: true, premium: false,
    telefone: '(11) 92222-9999',
    bio: 'Pedreiro com equipe. Reformas completas e acabamento fino.',
    since: '2025-09'
  },
  {
    id: 53, name: 'Carolina Silva', initials: 'CS', avatarClass: 'avatar-4',
    bairro: 'Bom Retiro', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavagem'],
    avaliacao: 4.7, avaliacoesCount: 30, verified: true, premium: false,
    telefone: '(11) 94444-0000',
    bio: 'Diarista com lavanderia inclusa. Lavo roupa e passo.',
    since: '2025-05'
  },
  {
    id: 54, name: 'Gabriel Costa', initials: 'GC', avatarClass: 'avatar-5',
    bairro: 'Pari', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Instalações'],
    avaliacao: 4.6, avaliacoesCount: 15, verified: true, premium: false,
    telefone: '(11) 96666-2222',
    bio: 'Encanador com equipamentos modernos. Instalações completas.',
    since: '2025-11'
  },
  {
    id: 55, name: 'Larissa Rodrigues', initials: 'LR', avatarClass: 'avatar-6',
    bairro: 'Brás', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Consertos', 'Ajustes'],
    avaliacao: 4.8, avaliacoesCount: 35, verified: true, premium: false,
    telefone: '(11) 91111-5555',
    bio: 'Costureira rápida e eficiente. Consertos em 24h.',
    since: '2025-06'
  },
  {
    id: 56, name: 'Ricardo Mendes', initials: 'RM', avatarClass: 'avatar-7',
    bairro: 'Mooca', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Segurança'],
    avaliacao: 4.5, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 93333-8888',
    bio: 'Eletricista com foco em segurança. Câmeras e alarmes.',
    since: '2025-10'
  },
  {
    id: 57, name: 'Aline Santos', initials: 'AS', avatarClass: 'avatar-8',
    bairro: 'Água Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Organização'],
    avaliacao: 4.7, avaliacoesCount: 26, verified: true, premium: false,
    telefone: '(11) 95555-1111',
    bio: 'Diarista que cozinha e organiza. Cardápios variados.',
    since: '2025-07'
  },
  {
    id: 58, name: 'Felipe Lima', initials: 'FL', avatarClass: 'avatar-1',
    bairro: 'Penha', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Gesso', 'Reformas'],
    avaliacao: 4.6, avaliacoesCount: 20, verified: true, premium: false,
    telefone: '(11) 97777-4444',
    bio: 'Pintor e gesseiro. Reformas com acabamento profissional.',
    since: '2025-08'
  },
  {
    id: 59, name: 'Patricia Ferreira', initials: 'PF', avatarClass: 'avatar-2',
    bairro: 'Vila Matilde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Podas'],
    avaliacao: 4.8, avaliacoesCount: 22, verified: true, premium: false,
    telefone: '(11) 98888-5555',
    bio: 'Jardineiro com equipamentos próprios. Podas e paisagismo.',
    since: '2025-06'
  },
  {
    id: 60, name: 'André Gomes', initials: 'AG', avatarClass: 'avatar-3',
    bairro: 'Artur Alvim', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Restauração', 'Design'],
    avaliacao: 4.5, avaliacoesCount: 16, verified: true, premium: false,
    telefone: '(11) 92222-0000',
    bio: 'Marceneiro com visão de design. Móveis personalizados.',
    since: '2025-11'
  },
  {
    id: 61, name: 'Camila Costa', initials: 'CC', avatarClass: 'avatar-4',
    bairro: 'Carrão', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Infantil'],
    avaliacao: 4.9, avaliacoesCount: 39, verified: true, premium: true,
    telefone: '(11) 94444-1111',
    bio: 'Cuidadora infantil com atividades recreativas. Amor e dedicação.',
    since: '2025-04'
  },
  {
    id: 62, name: 'Bruno Rocha', initials: 'BR', avatarClass: 'avatar-5',
    bairro: 'Ponte Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Construção', 'Reformas'],
    avaliacao: 4.4, avaliacoesCount: 23, verified: true, premium: false,
    telefone: '(11) 96666-3333',
    bio: 'Pedreiro com equipe. Reformas completas e construções.',
    since: '2025-09'
  },
  {
    id: 63, name: 'Amanda Alves', initials: 'AA', avatarClass: 'avatar-6',
    bairro: 'Vila Formosa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavanderia'],
    avaliacao: 4.7, avaliacoesCount: 31, verified: true, premium: false,
    telefone: '(11) 91111-6666',
    bio: 'Diarista completa. Faxina, lavanderia e organização.',
    since: '2025-05'
  },
  {
    id: 64, name: 'Gustavo Silva', initials: 'GS', avatarClass: 'avatar-7',
    bairro: 'Ipiranga', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Reparos'],
    avaliacao: 4.6, avaliacoesCount: 17, verified: true, premium: false,
    telefone: '(11) 93333-9999',
    bio: 'Encanador disponível para emergências. Reparos rápidos.',
    since: '2025-10'
  },
  {
    id: 65, name: 'Juliana Lima', initials: 'JL', avatarClass: 'avatar-8',
    bairro: 'Sacomã', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Ajustes', 'Consertos'],
    avaliacao: 4.8, avaliacoesCount: 33, verified: true, premium: false,
    telefone: '(11) 95555-2222',
    bio: 'Costureira experiente. Consertos rápidos e ajustes perfeitos.',
    since: '2025-06'
  },
  {
    id: 66, name: 'Rafael Ferreira', initials: 'RF', avatarClass: 'avatar-1',
    bairro: 'Cursino', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Manutenção'],
    avaliacao: 4.5, avaliacoesCount: 14, verified: true, premium: false,
    telefone: '(11) 97777-5555',
    bio: 'Eletricista com manutenção preventiva. Evite problemas.',
    since: '2025-11'
  },
  {
    id: 67, name: 'Mariana Rodrigues', initials: 'MR', avatarClass: 'avatar-2',
    bairro: 'Saúde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Eventos'],
    avaliacao: 4.7, avaliacoesCount: 28, verified: true, premium: false,
    telefone: '(11) 98888-6666',
    bio: 'Diarista que cozinha para eventos. Buffets e jantares.',
    since: '2025-07'
  },
  {
    id: 68, name: 'Thiago Santos', initials: 'TS', avatarClass: 'avatar-3',
    bairro: 'Jardim da Saúde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Texturas', 'Decoração'],
    avaliacao: 4.6, avaliacoesCount: 21, verified: true, premium: false,
    telefone: '(11) 92222-1111',
    bio: 'Pintor especializado em texturas. Efeitos decorativos.',
    since: '2025-08'
  },
  {
    id: 69, name: 'Vanessa Costa', initials: 'VC', avatarClass: 'avatar-4',
    bairro: 'Planalto Paulista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Irrigação'],
    avaliacao: 4.8, avaliacoesCount: 25, verified: true, premium: false,
    telefone: '(11) 94444-2222',
    bio: 'Jardineiro com sistemas de irrigação. Jardins automatizados.',
    since: '2025-06'
  },
  {
    id: 70, name: 'Diego Gomes', initials: 'DG', avatarClass: 'avatar-5',
    bairro: 'Vila Prudente', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Móveis', 'Restauração'],
    avaliacao: 4.5, avaliacoesCount: 19, verified: true, premium: false,
    telefone: '(11) 96666-4444',
    bio: 'Marceneiro com oficina. Fabrico e restauro móveis.',
    since: '2025-10'
  },
  {
    id: 71, name: 'Fernanda Alves', initials: 'FA', avatarClass: 'avatar-6',
    bairro: 'São Lucas', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Escolar'],
    avaliacao: 4.9, avaliacoesCount: 43, verified: true, premium: true,
    telefone: '(11) 91111-7777',
    bio: 'Cuidadora infantil com reforço escolar. Tarefas e estudos.',
    since: '2025-03'
  },
  {
    id: 72, name: 'Lucas Pereira', initials: 'LP', avatarClass: 'avatar-7',
    bairro: 'Sapopemba', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Reformas', 'Acabamento'],
    avaliacao: 4.4, avaliacoesCount: 22, verified: true, premium: false,
    telefone: '(11) 93333-0000',
    bio: 'Pedreiro com equipe. Reformas completas e acabamento.',
    since: '2025-09'
  },
  {
    id: 73, name: 'Carolina Lima', initials: 'CL', avatarClass: 'avatar-8',
    bairro: 'São Miguel Paulista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Organização'],
    avaliacao: 4.7, avaliacoesCount: 29, verified: true, premium: false,
    telefone: '(11) 95555-3333',
    bio: 'Diarista organizada. Deixo tudo impecável.',
    since: '2025-05'
  },
  {
    id: 74, name: 'Gabriel Ferreira', initials: 'GF', avatarClass: 'avatar-1',
    bairro: 'Vila Jacuí', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Instalações'],
    avaliacao: 4.6, avaliacoesCount: 16, verified: true, premium: false,
    telefone: '(11) 97777-6666',
    bio: 'Encanador com 15 anos de experiência. Reparos garantidos.',
    since: '2025-11'
  },
  {
    id: 75, name: 'Larissa Santos', initials: 'LS', avatarClass: 'avatar-2',
    bairro: 'Jardim Helena', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Moda', 'Design'],
    avaliacao: 4.8, avaliacoesCount: 34, verified: true, premium: false,
    telefone: '(11) 98888-7777',
    bio: 'Costureira e designer. Peças exclusivas e ajustes.',
    since: '2025-06'
  },
  {
    id: 76, name: 'Ricardo Costa', initials: 'RC', avatarClass: 'avatar-3',
    bairro: 'Itaim Paulista', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Automação', 'Iluminação'],
    avaliacao: 4.5, avaliacoesCount: 15, verified: true, premium: false,
    telefone: '(11) 92222-2222',
    bio: 'Eletricista especializado em iluminação. Projetos de luz.',
    since: '2025-10'
  },
  {
    id: 77, name: 'Aline Gomes', initials: 'AG', avatarClass: 'avatar-4',
    bairro: 'Cidade Líder', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Eventos'],
    avaliacao: 4.7, avaliacoesCount: 27, verified: true, premium: false,
    telefone: '(11) 94444-3333',
    bio: 'Diarista que cozinha para eventos. Buffets especiais.',
    since: '2025-07'
  },
  {
    id: 78, name: 'Felipe Rodrigues', initials: 'FR', avatarClass: 'avatar-5',
    bairro: 'Guaianases', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Gesso', 'Reformas'],
    avaliacao: 4.6, avaliacoesCount: 20, verified: true, premium: false,
    telefone: '(11) 96666-5555',
    bio: 'Pintor e gesseiro. Reformas com acabamento profissional.',
    since: '2025-08'
  },
  {
    id: 79, name: 'Patricia Lima', initials: 'PL', avatarClass: 'avatar-6',
    bairro: 'Lajeado', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Podas'],
    avaliacao: 4.8, avaliacoesCount: 24, verified: true, premium: false,
    telefone: '(11) 91111-8888',
    bio: 'Jardineiro com equipamentos. Podas e paisagismo.',
    since: '2025-06'
  },
  {
    id: 80, name: 'André Silva', initials: 'AS', avatarClass: 'avatar-7',
    bairro: 'José Bonifácio', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Restauração', 'Móveis'],
    avaliacao: 4.5, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 93333-1111',
    bio: 'Marceneiro com oficina. Fabrico e restauro móveis.',
    since: '2025-11'
  },
  {
    id: 81, name: 'Camila Mendes', initials: 'CM', avatarClass: 'avatar-8',
    bairro: 'Cidade Tiradentes', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Infantil'],
    avaliacao: 4.9, avaliacoesCount: 38, verified: true, premium: true,
    telefone: '(11) 95555-4444',
    bio: 'Cuidadora infantil com atividades lúdicas. Amor e dedicação.',
    since: '2025-04'
  },
  {
    id: 82, name: 'Bruno Costa', initials: 'BC', avatarClass: 'avatar-1',
    bairro: 'Itaquera', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Construção', 'Reformas'],
    avaliacao: 4.4, avaliacoesCount: 25, verified: true, premium: false,
    telefone: '(11) 97777-7777',
    bio: 'Pedreiro com equipe. Reformas completas e construções.',
    since: '2025-09'
  },
  {
    id: 83, name: 'Amanda Ferreira', initials: 'AF', avatarClass: 'avatar-2',
    bairro: 'Artur Alvim', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavanderia'],
    avaliacao: 4.7, avaliacoesCount: 30, verified: true, premium: false,
    telefone: '(11) 98888-8888',
    bio: 'Diarista completa. Faxina, lavanderia e organização.',
    since: '2025-05'
  },
  {
    id: 84, name: 'Gustavo Alves', initials: 'GA', avatarClass: 'avatar-3',
    bairro: 'Carrão', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Reparos'],
    avaliacao: 4.6, avaliacoesCount: 17, verified: true, premium: false,
    telefone: '(11) 92222-3333',
    bio: 'Encanador disponível para emergências. Reparos rápidos.',
    since: '2025-10'
  },
  {
    id: 85, name: 'Juliana Santos', initials: 'JS', avatarClass: 'avatar-4',
    bairro: 'Ponte Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Ajustes', 'Consertos'],
    avaliacao: 4.8, avaliacoesCount: 32, verified: true, premium: false,
    telefone: '(11) 94444-4444',
    bio: 'Costureira experiente. Consertos rápidos e ajustes.',
    since: '2025-06'
  },
  {
    id: 86, name: 'Rafael Lima', initials: 'RL', avatarClass: 'avatar-5',
    bairro: 'Vila Formosa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Instalações', 'Manutenção'],
    avaliacao: 4.5, avaliacoesCount: 14, verified: true, premium: false,
    telefone: '(11) 96666-6666',
    bio: 'Eletricista com manutenção preventiva. Evite problemas.',
    since: '2025-11'
  },
  {
    id: 87, name: 'Mariana Costa', initials: 'MC', avatarClass: 'avatar-6',
    bairro: 'Vila Matilde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Organização'],
    avaliacao: 4.7, avaliacoesCount: 26, verified: true, premium: false,
    telefone: '(11) 91111-9999',
    bio: 'Diarista que cozinha e organiza. Cardápios variados.',
    since: '2025-07'
  },
  {
    id: 88, name: 'Thiago Gomes', initials: 'TG', avatarClass: 'avatar-7',
    bairro: 'Mooca', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Texturas', 'Decoração'],
    avaliacao: 4.6, avaliacoesCount: 21, verified: true, premium: false,
    telefone: '(11) 93333-2222',
    bio: 'Pintor especializado em texturas. Efeitos decorativos.',
    since: '2025-08'
  },
  {
    id: 89, name: 'Vanessa Rodrigues', initials: 'VR', avatarClass: 'avatar-8',
    bairro: 'Água Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Irrigação'],
    avaliacao: 4.8, avaliacoesCount: 23, verified: true, premium: false,
    telefone: '(11) 95555-5555',
    bio: 'Jardineiro com sistemas de irrigação. Jardins automatizados.',
    since: '2025-06'
  },
  {
    id: 90, name: 'Diego Silva', initials: 'DS', avatarClass: 'avatar-1',
    bairro: 'Penha', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Móveis', 'Restauração'],
    avaliacao: 4.5, avaliacoesCount: 19, verified: true, premium: false,
    telefone: '(11) 97777-8888',
    bio: 'Marceneiro com oficina. Fabrico e restauro móveis.',
    since: '2025-10'
  },
  {
    id: 91, name: 'Fernanda Costa', initials: 'FC', avatarClass: 'avatar-2',
    bairro: 'Vila Matilde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Babá', 'Cuidadora', 'Escolar'],
    avaliacao: 4.9, avaliacoesCount: 40, verified: true, premium: true,
    telefone: '(11) 98888-9999',
    bio: 'Cuidadora infantil com reforço escolar. Tarefas e estudos.',
    since: '2025-03'
  },
  {
    id: 92, name: 'Lucas Alves', initials: 'LA', avatarClass: 'avatar-3',
    bairro: 'Artur Alvim', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Reformas', 'Acabamento'],
    avaliacao: 4.4, avaliacoesCount: 24, verified: true, premium: false,
    telefone: '(11) 92222-4444',
    bio: 'Pedreiro com equipe. Reformas completas e acabamento.',
    since: '2025-09'
  },
  {
    id: 93, name: 'Carolina Ferreira', initials: 'CF', avatarClass: 'avatar-4',
    bairro: 'Carrão', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Faxina', 'Lavanderia'],
    avaliacao: 4.7, avaliacoesCount: 31, verified: true, premium: false,
    telefone: '(11) 94444-5555',
    bio: 'Diarista completa. Faxina, lavanderia e organização.',
    since: '2025-05'
  },
  {
    id: 94, name: 'Gabriel Lima', initials: 'GL', avatarClass: 'avatar-5',
    bairro: 'Ponte Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Encanador', 'Hidráulica', 'Instalações'],
    avaliacao: 4.6, avaliacoesCount: 16, verified: true, premium: false,
    telefone: '(11) 96666-7777',
    bio: 'Encanador com 15 anos de experiência. Reparos garantidos.',
    since: '2025-11'
  },
  {
    id: 95, name: 'Larissa Costa', initials: 'LC', avatarClass: 'avatar-6',
    bairro: 'Vila Formosa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Costura', 'Moda', 'Design'],
    avaliacao: 4.8, avaliacoesCount: 33, verified: true, premium: false,
    telefone: '(11) 91111-0000',
    bio: 'Costureira e designer. Peças exclusivas e ajustes.',
    since: '2025-06'
  },
  {
    id: 96, name: 'Ricardo Santos', initials: 'RS', avatarClass: 'avatar-7',
    bairro: 'Mooca', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Eletricista', 'Automação', 'Iluminação'],
    avaliacao: 4.5, avaliacoesCount: 15, verified: true, premium: false,
    telefone: '(11) 93333-3333',
    bio: 'Eletricista especializado em iluminação. Projetos de luz.',
    since: '2025-10'
  },
  {
    id: 97, name: 'Aline Lima', initials: 'AL', avatarClass: 'avatar-8',
    bairro: 'Água Rasa', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Diarista', 'Cozinha', 'Eventos'],
    avaliacao: 4.7, avaliacoesCount: 28, verified: true, premium: false,
    telefone: '(11) 95555-6666',
    bio: 'Diarista que cozinha para eventos. Buffets especiais.',
    since: '2025-07'
  },
  {
    id: 98, name: 'Felipe Costa', initials: 'FC', avatarClass: 'avatar-1',
    bairro: 'Penha', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pintura', 'Gesso', 'Reformas'],
    avaliacao: 4.6, avaliacoesCount: 20, verified: true, premium: false,
    telefone: '(11) 97777-9999',
    bio: 'Pintor e gesseiro. Reformas com acabamento profissional.',
    since: '2025-08'
  },
  {
    id: 99, name: 'Patricia Gomes', initials: 'PG', avatarClass: 'avatar-2',
    bairro: 'Vila Matilde', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Jardineiro', 'Paisagismo', 'Podas'],
    avaliacao: 4.8, avaliacoesCount: 24, verified: true, premium: false,
    telefone: '(11) 98888-0000',
    bio: 'Jardineiro com equipamentos. Podas e paisagismo.',
    since: '2025-06'
  },
  {
    id: 100, name: 'André Ferreira', initials: 'AF', avatarClass: 'avatar-3',
    bairro: 'Artur Alvim', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Marceneiro', 'Restauração', 'Móveis'],
    avaliacao: 4.5, avaliacoesCount: 18, verified: true, premium: false,
    telefone: '(11) 92222-5555',
    bio: 'Marceneiro com oficina. Fabrico e restauro móveis.',
    since: '2025-11'
  }
];

export const referencias: Referencia[] = [
  {
    nome: 'Tesouros do Bairro (LelloLAB + Stoom)',
    descricao: 'Plataforma que conecta vizinhos de condomínios para divulgação de serviços e produtos. Iniciativa social voltada para empreendedorismo local em São Paulo.',
    link: 'https://www.sindiconet.com.br/informese/app-para-divulgacao-de-servicos-em-condominios-noticias-radar-lello',
    tags: ['App', 'Condomínios', 'São Paulo']
  },
  {
    nome: 'Nok Nok',
    descricao: 'Aplicativo que conecta vizinhos do mesmo bairro e pequenos comerciantes. Surgiu durante a pandemia e opera no Rio e São Paulo.',
    link: 'https://extra.globo.com/economia/financas/castelar/plataformas-na-internet-criam-conexao-entre-vizinhos-comerciantes-locais-24429509.html',
    tags: ['App', 'Bairro', 'Rio e SP']
  },
  {
    nome: 'Mão na Roda (MRV)',
    descricao: 'Plataforma colaborativa da MRV que conecta mais de 300 mil famílias em seus empreendimentos para troca de serviços e produtos.',
    link: 'https://extra.globo.com/economia/financas/castelar/plataformas-na-internet-criam-conexao-entre-vizinhos-comerciantes-locais-24429509.html',
    tags: ['Plataforma', 'Habitação', 'Brasil']
  },
  {
    nome: 'GetNinjas',
    descricao: 'Maior aplicativo de serviços da América Latina, com mais de 200 tipos de serviços. Conecta profissionais a clientes em todo o Brasil.',
    link: 'https://www.getninjas.com.br',
    tags: ['Marketplace', 'Serviços', 'Brasil']
  },
  {
    nome: 'Vizinhos App',
    descricao: 'Aplicativo com Feed da Vizinhança, indicações de comércio local e conexão entre moradores do mesmo bairro.',
    link: 'https://apps.apple.com/us/app/vizinhos-app/id6742664695',
    tags: ['App', 'Comunidade', 'iOS/Android']
  }
];

export const dadosIBGE: DadosIBGE = {
  informalidadeBrasil: 38.9,
  informalidadeSP: 31.1,
  trabalhadoresInformaisMilhoes: 39.5,
  autonomosInformaisMilhoes: 32.5,
  evolucaoAnual: [
    { ano: 2020, brasil: 38.5, sp: 32.8 },
    { ano: 2021, brasil: 40.1, sp: 33.5 },
    { ano: 2022, brasil: 39.2, sp: 32.1 },
    { ano: 2023, brasil: 38.8, sp: 31.5 },
    { ano: 2024, brasil: 39.0, sp: 31.1 }
  ],
  servicosMaisSolicitados: [
    { servico: 'Reformas/Reparos', percentual: 28 },
    { servico: 'Limpeza/Domésticos', percentual: 24 },
    { servico: 'Beleza/Bem-estar', percentual: 18 },
    { servico: 'Aulas/Educação', percentual: 12 },
    { servico: 'Eventos', percentual: 10 },
    { servico: 'Outros', percentual: 8 }
  ],
  fonte: 'IBGE - PNAD Contínua 2024/2025'
};

export function getPrestadores(bairro?: string | null, servico?: string | null): Prestador[] {
  let lista = prestadores.filter(u => u.tipo === 'prestador');
  if (bairro) {
    lista = lista.filter(u => u.bairro === bairro);
  }
  if (servico) {
    const term = servico.toLowerCase();
    lista = lista.filter(u =>
      u.servicos.some(s => s.toLowerCase().includes(term)) ||
      u.name.toLowerCase().includes(term) ||
      u.bairro.toLowerCase().includes(term)
    );
  }
  return lista;
}

export function getUserById(id: number): Prestador | undefined {
  return prestadores.find(u => u.id === id);
}
