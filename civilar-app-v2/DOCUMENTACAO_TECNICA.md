# Documentação Técnica - CiviLar App v2

**Versão:** 1.0.0  
**Data:** 12/05/2026  
**Autor:** Equipe CiviLar  
**Tecnologia:** React + TypeScript + Vite

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tecnologias e Dependências](#tecnologias-e-dependências)
4. [Tipos e Interfaces](#tipos-e-interfaces)
5. [Dados Mockados](#dados-mockados)
6. [Componentes Reutilizáveis](#componentes-reutilizáveis)
7. [Telas do Aplicativo](#telas-do-aplicativo)
8. [Hooks Customizados](#hooks-customizados)
9. [Estilos CSS](#estilos-css)
10. [Arquitetura do App](#arquitetura-do-app)
11. [Fluxos de Navegação](#fluxos-de-navegação)
12. [Funcionalidades Principais](#funcionalidades-principais)
13. [Instruções para Recriar o App](#instruções-para-recriar-o-app)

---

## Visão Geral

O **CiviLar App v2** é um aplicativo web que conecta prestadores de serviços com solicitantes em bairros de São Paulo. O app permite que usuários encontrem prestadores de serviços locais, publiquem seus serviços, conversem via chat, e acessem dados do mercado informal.

**Características principais:**
- Login/cadastro com verificação OTP
- Busca de prestadores por bairro e categoria
- Chat em tempo real
- Publicação de serviços
- Sistema de avaliações
- Assinatura premium (CiviRei)
- Dados estatísticos do IBGE

---

## Estrutura do Projeto

```
civilar-app-v2/
├── public/                          # Assets estáticos
│   ├── logo-civilar.png            # Logo do app
│   └── vite.svg                   # Logo Vite
├── src/
│   ├── App.tsx                    # Componente principal
│   ├── App.css                    # Estilos globais
│   ├── index.css                  # Estilos base
│   ├── main.tsx                   # Entry point React
│   ├── assets/                    # Imagens e recursos
│   ├── components/                # Componentes reutilizáveis (6)
│   │   ├── BottomNav.tsx
│   │   ├── CategoryChip.tsx
│   │   ├── ProviderCard.tsx
│   │   ├── StarRating.tsx
│   │   ├── ToastContainer.tsx
│   │   └── VerifiedBadge.tsx
│   ├── data/                      # Dados mockados
│   │   └── index.ts
│   ├── hooks/                     # Hooks customizados
│   │   └── useToast.ts
│   ├── pages/                     # Telas do app (18)
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ExplorarScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── PrestadorDetailScreen.tsx
│   │   ├── CadastrarScreen.tsx
│   │   ├── PortfolioScreen.tsx
│   │   ├── DadosScreen.tsx
│   │   ├── ReferralScreen.tsx
│   │   ├── PerfilScreen.tsx
│   │   ├── AvaliacoesScreen.tsx
│   │   ├── PrivacidadeScreen.tsx
│   │   ├── ChatListScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── AssinaturaScreen.tsx
│   │   └── PublicarScreen.tsx
│   └── types/                    # Tipos TypeScript
│       └── index.ts
├── package.json                   # Dependências
├── vite.config.ts                 # Configuração Vite
├── tsconfig.json                  # Configuração TypeScript
└── index.html                     # HTML entry point
```

---

## Tecnologias e Dependências

### Dependências Principais (package.json)

```json
{
  "dependencies": {
    "chart.js": "^4.4.1",              // Gráficos
    "lucide-react": "^0.300.0",       // Ícones
    "react": "^18.2.0",                // Framework UI
    "react-chartjs-2": "^5.2.0",      // Gráficos React
    "react-dom": "^18.2.0"            // DOM React
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1", // Plugin React Vite
    "electron": "^28.2.0",            // Desktop app
    "electron-builder": "^24.9.1",    // Builder Electron
    "vite": "^5.0.0"                  // Build tool
  }
}
```

### Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run lint` - Executa ESLint
- `npm run preview` - Preview do build
- `npm run dist` - Build para Electron

---

## Tipos e Interfaces

### Arquivo: `src/types/index.ts`

```typescript
export interface Prestador {
  id: number;
  name: string;
  initials: string;
  avatarClass: string;
  bairro: string;
  cidade: string;
  tipo: 'prestador' | 'solicitante';
  servicos: string[];
  avaliacao: number;
  avaliacoesCount: number;
  verified: boolean;
  premium: boolean;
  telefone: string;
  bio: string;
  since: string;
}

export interface Categoria {
  nome: string;
  icon: string;
  cor: string;
  bg: string;
}

export interface Referencia {
  nome: string;
  descricao: string;
  link: string;
  tags: string[];
}

export interface DadosIBGE {
  informalidadeBrasil: number;
  informalidadeSP: number;
  trabalhadoresInformaisMilhoes: number;
  autonomosInformaisMilhoes: number;
  evolucaoAnual: { ano: number; brasil: number; sp: number }[];
  servicosMaisSolicitados: { servico: string; percentual: number }[];
  fonte: string;
}

export type Page = 
  | 'welcome' 
  | 'login' 
  | 'home' 
  | 'explorar' 
  | 'mapa' 
  | 'cadastrar' 
  | 'portfolio' 
  | 'dados' 
  | 'referral' 
  | 'perfil' 
  | 'prestador' 
  | 'avaliacoes' 
  | 'privacidade' 
  | 'chat-list' 
  | 'chat' 
  | 'assinatura' 
  | 'publicar';
```

---

## Dados Mockados

### Arquivo: `src/data/index.ts`

#### Bairros (60+ bairros de São Paulo)
```typescript
export const bairros = [
  'Vila Mariana', 'Pinheiros', 'Moema', 'Jardins', 'Brooklin',
  'Itaim Bibi', 'Perdizes', 'Santana', 'Tatuapé', 'Liberdade',
  // ... mais 50 bairros
];
```

#### Lista de Serviços (18 tipos)
```typescript
export const servicosLista = [
  'Pedreiro', 'Pintura', 'Eletricista', 'Encanador', 'Diarista',
  'Faxina', 'Jardineiro', 'Costura', 'Marceneiro', 'Serralheiro',
  'Gesseiro', 'Pequenos Reparos', 'Instalações', 'Paisagismo',
  'Consertos', 'Ajustes', 'Lavar Louça', 'Passar Roupa',
  'Babá', 'Cuidadora', 'Acompanhante'
];
```

#### Categorias (8 categorias com cores)
```typescript
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
```

#### Prestadores (Array de Prestador)
```typescript
export const prestadores: Prestador[] = [
  {
    id: 1, name: 'João Silva', initials: 'JS', avatarClass: 'avatar-1',
    bairro: 'Vila Mariana', cidade: 'São Paulo', tipo: 'prestador',
    servicos: ['Pedreiro', 'Pintura', 'Pequenos Reparos'],
    avaliacao: 4.8, avaliacoesCount: 12, verified: true, premium: false,
    telefone: '(11) 98765-4321',
    bio: 'Pedreiro com 15 anos de experiência...',
    since: '2026-01'
  },
  // ... mais prestadores
];
```

#### Funções Auxiliares
```typescript
export function getPrestadores(bairro?: string | null, search?: string | null): Prestador[]
export function getUserById(id: number): Prestador | undefined
export const dadosIBGE: DadosIBGE
```

---

## Componentes Reutilizáveis

### 1. BottomNav (`src/components/BottomNav.tsx`)

**Props:**
```typescript
interface Props {
  active: Page;
  onNavigate: (page: string) => void;
  userRole?: 'prestador' | 'solicitante' | 'ambos';
}
```

**Funcionalidade:**
- Navegação inferior com 4 tabs principais
- Botão central "+" para publicar (só para prestador/ambos)
- Tabs: Home, Explorar, Publicar, Perfil
- Ícones: Home, Search, PlusCircle, User

### 2. CategoryChip (`src/components/CategoryChip.tsx`)

**Props:**
```typescript
interface Props {
  categoria: Categoria;
  onPress: () => void;
}
```

**Funcionalidade:**
- Chip clicável com categoria
- Exibe ícone, nome e cor da categoria
- Usado em HomeScreen para seleção de categoria

### 3. ProviderCard (`src/components/ProviderCard.tsx`)

**Props:**
```typescript
interface Props {
  provider: Prestador;
  onPress: () => void;
  onChat?: () => void;
}
```

**Funcionalidade:**
- Card de prestador com avatar, nome, bairro, avaliação
- Exibe badges: Verified, Premium
- Lista de serviços (até 3)
- Botão "Iniciar conversa" (opcional)

### 4. StarRating (`src/components/StarRating.tsx`)

**Props:**
```typescript
interface Props {
  rating: number;
  size?: number;
}
```

**Funcionalidade:**
- Exibe avaliação com estrelas (1-5)
- Usa ícones Star do lucide-react
- Preenche estrelas baseado na avaliação

### 5. ToastContainer (`src/components/ToastContainer.tsx`)

**Props:**
```typescript
interface Props {
  toasts: Toast[];
}
```

**Funcionalidade:**
- Container para notificações toast
- Exibe toasts com animação
- Tipos: success, error, info
- Auto-remove após 3 segundos

### 6. VerifiedBadge (`src/components/VerifiedBadge.tsx`)

**Props:**
```typescript
interface Props {
  verified: boolean;
}
```

**Funcionalidade:**
- Badge de verificação
- Exibe "✓ Validado" se verified=true
- Cor verde para verificados

---

## Telas do Aplicativo

### 1. SplashScreen (`src/pages/SplashScreen.tsx`)

**Props:**
```typescript
interface Props {
  onFinish: () => void;
}
```

**Funcionalidade:**
- Tela de splash com logo CiviLar
- Animação de fade-in
- Auto-avança após 2 segundos
- Background azul escuro (--navy)

### 2. WelcomeScreen (`src/pages/WelcomeScreen.tsx`)

**Props:**
```typescript
interface Props {
  onEnter: () => void;
}
```

**Funcionalidade:**
- Tela de boas-vindas
- Logo CiviLar
- Tagline: "O bairro resolve o bairro"
- Botão único "ENTRAR"
- Background azul escuro

### 3. LoginScreen (`src/pages/LoginScreen.tsx`)

**Props:**
```typescript
interface Props {
  onLogin: (userData: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' }) => void;
  onBack: () => void;
}
```

**Estado Interno:**
```typescript
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
```

**Funcionalidade:**
- Toggle entre login e cadastro
- Seleção de role: Prestador, Solicitante, Ambos
- Máscara de telefone brasileiro: (XX) XXXXX-XXXX
- Campo de nome e bairro (só cadastro)
- Campo de profissão (só para prestador/ambos)
- Validação de experiência (só para prestador/ambos)
- Upload de fotos de serviços (só para prestador/ambos)
- OTP de 6 dígitos
- Reset de campos ao trocar role

### 4. HomeScreen (`src/pages/HomeScreen.tsx`)

**Props:**
```typescript
interface Props {
  onNavigate: (page: string) => void;
  onShowPrestador: (id: number) => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  userRole?: 'prestador' | 'solicitante' | 'ambos';
  userBairro?: string;
}
```

**Funcionalidade:**
- Banner de categorias (8 categorias)
- Chips de bairro (6 bairros próximos)
- Lista de prestadores filtrados
- Cards de prestadores
- Botão "Ver todos" para Explorar

### 5. ExplorarScreen (`src/pages/ExplorarScreen.tsx`)

**Props:**
```typescript
interface Props {
  onShowPrestador: (id: number) => void;
  onNavigate: (page: string) => void;
  onChatSelect?: (id: number) => void;
}
```

**Estado Interno:**
```typescript
const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null);
const [search, setSearch] = useState('');
const [showFilters, setShowFilters] = useState(false);
```

**Funcionalidade:**
- Barra de busca
- Botão de filtros expansível
- Filtros por bairro (6 bairros)
- Filtros por categoria (6 categorias)
- Lista de prestadores filtrados
- Botão "Iniciar conversa" em cada card
- Navegação para detalhes do prestador

### 6. MapScreen (`src/pages/MapScreen.tsx`)

**Props:**
```typescript
interface Props {
  onShowPrestador: (id: number) => void;
  onBack: () => void;
  userBairro?: string;
}
```

**Funcionalidade:**
- Mapa com marcadores de prestadores
- Filtro por bairro do usuário
- Marcadores clicáveis
- Navegação para detalhes do prestador

### 7. PrestadorDetailScreen (`src/pages/PrestadorDetailScreen.tsx`)

**Props:**
```typescript
interface Props {
  prestadorId: number;
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}
```

**Funcionalidade:**
- Avatar grande com iniciais
- Nome e badges (Verified, CiviRei)
- Bairro e cidade
- Estatísticas: Avaliação, Serviços, Especialidades
- Seção "Sobre" com bio e resumo
- Seção "Serviços oferecidos" (tags)
- Seção "Serviços realizados" (grid 2x2 com imagens)
- Seção "Validação do prestador"
- Botão WhatsApp
- Botão compartilhar

### 8. CadastrarScreen (`src/pages/CadastrarScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}
```

**Funcionalidade:**
- Formulário de cadastro de serviço
- Campos: título, categoria, descrição, preço
- Upload de imagens
- Preview de imagens
- Botão publicar

### 9. PortfolioScreen (`src/pages/PortfolioScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  publicacoes?: any[];
}
```

**Funcionalidade:**
- Lista de publicações do usuário
- Cards com imagens, título, categoria, descrição, preço
- Botão editar/excluir
- Estado: pendente, aprovado

### 10. DadosScreen (`src/pages/DadosScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
}
```

**Funcionalidade:**
- Gráficos do IBGE
- Dados de informalidade
- Evolução anual
- Serviços mais solicitados
- Fonte dos dados

### 11. ReferralScreen (`src/pages/ReferralScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}
```

**Funcionalidade:**
- Lista de referências
- Cards com nome, descrição, link, tags
- Botão compartilhar link
- Benefícios de indicar

### 12. PerfilScreen (`src/pages/PerfilScreen.tsx`)

**Props:**
```typescript
interface Props {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentUser: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' } | null;
  publicacoes?: any[];
}
```

**Funcionalidade:**
- Avatar com iniciais
- Nome, bairro, tipo
- Seção "Sobre" com resumo
- Configurações:
  - Conversas
  - CiviRei (só prestador/ambos)
  - Indicar vizinho
  - Avaliações recebidas (só prestador/ambos)
  - Privacidade
- Seção "Serviços realizados" com imagens
- Botão sair

### 13. AvaliacoesScreen (`src/pages/AvaliacoesScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
}
```

**Funcionalidade:**
- Lista de avaliações recebidas
- Cards com nome, data, avaliação, comentário
- Média geral
- Filtro por período

### 14. PrivacidadeScreen (`src/pages/PrivacidadeScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
}
```

**Funcionalidade:**
- Política de privacidade
- Coleta de dados
- Uso de informações
- Opções de privacidade
- Botão excluir conta

### 15. ChatListScreen (`src/pages/ChatListScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onChatSelect: (id: number) => void;
  currentUser?: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' };
}
```

**Funcionalidade:**
- Lista de conversas
- Cards com avatar, nome, última mensagem, horário
- Indicador de não lido
- Busca de conversas
- Swipe para excluir

### 16. ChatScreen (`src/pages/ChatScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  chatId: number;
  currentUser?: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' };
}
```

**Estado Interno:**
```typescript
const [message, setMessage] = useState('');
const [messages, setMessages] = useState<Message[]>([]);
```

**Funcionalidade:**
- Header com avatar, nome, status online
- Lista de mensagens (enviadas/recebidas)
- Indicadores de lido (✓, ✓✓)
- Input de mensagem
- Botão enviar
- Resposta automática simulada
- Mensagem inicial automática ao abrir chat

### 17. AssinaturaScreen (`src/pages/AssinaturaScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  currentUser?: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' };
}
```

**Funcionalidade:**
- Planos: Gratuito, Premium, CiviRei
- Cards com benefícios
- Preços
- Botão assinar
- Mensagem de sucesso

### 18. PublicarScreen (`src/pages/PublicarScreen.tsx`)

**Props:**
```typescript
interface Props {
  onBack: () => void;
  onToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onPublicar: (pub: any) => void;
  currentUser?: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' };
}
```

**Estado Interno:**
```typescript
const [titulo, setTitulo] = useState('');
const [categoria, setCategoria] = useState('');
const [descricao, setDescricao] = useState('');
const [preco, setPreco] = useState('');
const [imagens, setImagens] = useState<string[]>([]);
```

**Funcionalidade:**
- Formulário de publicação
- Campos: título, categoria, descrição, preço
- Upload de imagens (até 3)
- Preview de imagens
- Botão publicar
- Adiciona ao estado de publicações

---

## Hooks Customizados

### useToast (`src/hooks/useToast.ts`)

**Interface:**
```typescript
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    // ...
  }, []);
  return { toasts, showToast };
}
```

**Funcionalidade:**
- Gerencia notificações toast
- Auto-remove após duração configurável
- Tipos: success, error, info
- ID único para cada toast

---

## Estilos CSS

### Arquivo: `src/App.css`

#### Variáveis CSS
```css
:root {
  --primary: #2AA18A;
  --primary-dark: #1E7A66;
  --primary-light: #E8F5F2;
  --navy: #1E293B;
  --surface: #FFFFFF;
  --bg: #F8FAFC;
  --text: #1E293B;
  --text-muted: #64748B;
  --border: #E2E8F0;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --radius-sm: 12px;
  --transition: all 0.2s ease;
}
```

#### Animações
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slideLeft {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Classes Principais
- `.page-section` - Container de página com animação slideUp
- `.page-slide-left` - Container com animação slideLeft
- `.avatar` - Avatar circular (56px)
- `.avatar-lg` - Avatar grande (96px)
- `.avatar-sm` - Avatar pequeno (40px)
- `.card` - Card com sombra e borda
- `.badge` - Badge arredondado
- `.btn` - Botão base
- `.btn-primary` - Botão primário (verde)
- `.btn-outline` - Botão outline
- `.input` - Input de formulário
- `.chip` - Chip pequeno
- `.service-tags` - Container de tags de serviço
- `.stars` - Container de estrelas de avaliação
- `.settings-item` - Item de configurações
- `.bottom-nav` - Navegação inferior
- `.search-bar` - Barra de busca
- `.filter-chips` - Chips de filtro
- `.profile-header` - Header de perfil
- `.profile-stats` - Estatísticas de perfil
- `.verify-list` - Lista de verificação
- `.verify-item` - Item de verificação

---

## Arquitetura do App

### Componente Principal: `src/App.tsx`

**Estado Global:**
```typescript
const [phase, setPhase] = useState<'splash' | 'welcome' | 'login' | 'app'>('splash');
const [page, setPage] = useState<Page>('home');
const [prestadorId, setPrestadorId] = useState<number | null>(null);
const [currentUser, setCurrentUser] = useState<{ name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' } | null>(null);
const [chatId, setChatId] = useState<number | null>(null);
const [publicacoes, setPublicacoes] = useState<any[]>([]);
```

**Handlers:**
```typescript
const handleNavigate = useCallback((target: string) => {
  const p = target as Page;
  setPage(p);
  window.scrollTo(0, 0);
}, []);

const handleLogin = useCallback((userData: { name: string; phone: string; bairro: string; role: 'prestador' | 'solicitante' | 'ambos' }) => {
  setCurrentUser(userData);
  setPhase('app');
  setPage('home');
  window.scrollTo(0, 0);
}, []);

const handleShowPrestador = useCallback((id: number) => {
  setPrestadorId(id);
  setPage('prestador');
  window.scrollTo(0, 0);
}, []);

const handleBack = useCallback(() => {
  setPage('explorar');
  window.scrollTo(0, 0);
}, []);

const handleLogout = useCallback(() => {
  setCurrentUser(null);
  setPhase('welcome');
  setPage('home');
}, []);
```

**Fases do App:**
1. **splash** - Tela de splash (2 segundos)
2. **welcome** - Tela de boas-vindas
3. **login** - Tela de login/cadastro
4. **app** - Aplicativo principal

**Navegação:**
- Tabs principais: home, explorar, publicar, perfil
- Páginas secundárias: prestador, mapa, cadastrar, portfolio, dados, referral, avaliacoes, privacidade, chat-list, chat, assinatura

---

## Fluxos de Navegação

### Fluxo Principal
```
SplashScreen (2s)
  ↓
WelcomeScreen
  ↓ (botão ENTRAR)
LoginScreen
  ↓ (login/cadastro)
App (fase 'app')
  ↓
HomeScreen (tab inicial)
```

### Fluxo de Exploração
```
HomeScreen
  ↓ (clicar em prestador)
PrestadorDetailScreen
  ↓ (botão voltar)
HomeScreen

HomeScreen
  ↓ (botão Explorar)
ExplorarScreen
  ↓ (filtros)
ExplorarScreen (filtrado)
  ↓ (clicar em prestador)
PrestadorDetailScreen
  ↓ (botão voltar)
ExplorarScreen
```

### Fluxo de Chat
```
HomeScreen
  ↓ (botão Perfil)
PerfilScreen
  ↓ (botão Conversas)
ChatListScreen
  ↓ (clicar em conversa)
ChatScreen
  ↓ (botão voltar)
ChatListScreen
```

### Fluxo de Publicação
```
HomeScreen
  ↓ (botão +)
PublicarScreen
  ↓ (publicar)
HomeScreen
  ↓ (botão Perfil)
PerfilScreen
  ↓ (Serviços realizados)
PerfilScreen (com publicação)
```

### Fluxo de Assinatura
```
PerfilScreen
  ↓ (botão CiviRei)
AssinaturaScreen
  ↓ (assinar)
PerfilScreen (com badge CiviRei)
```

---

## Funcionalidades Principais

### 1. Login/Cadastro com OTP
- Toggle entre login e cadastro
- Seleção de role (prestador/solicitante/ambos)
- Máscara de telefone brasileiro
- Campo de nome e bairro (só cadastro)
- Campo de profissão (só prestador/ambos)
- Validação de experiência (só prestador/ambos)
- Upload de fotos de serviços (só prestador/ambos)
- OTP de 6 dígitos
- Reset de campos ao trocar role

### 2. Busca de Prestadores
- Busca por texto
- Filtro por bairro
- Filtro por categoria
- Cards com avatar, nome, bairro, avaliação
- Badges: Verified, CiviRei
- Lista de serviços
- Botão "Iniciar conversa"

### 3. Detalhes do Prestador
- Avatar grande com iniciais
- Nome e badges
- Bairro e cidade
- Estatísticas: Avaliação, Serviços, Especialidades
- Seção "Sobre" com bio e resumo
- Seção "Serviços oferecidos"
- Seção "Serviços realizados" (grid 2x2)
- Seção "Validação do prestador"
- Botão WhatsApp
- Botão compartilhar

### 4. Chat em Tempo Real
- Lista de conversas
- Chat individual
- Mensagens enviadas/recebidas
- Indicadores de lido (✓, ✓✓)
- Mensagem inicial automática
- Resposta automática simulada
- Avatar e nome do prestador

### 5. Publicação de Serviços
- Formulário de publicação
- Campos: título, categoria, descrição, preço
- Upload de imagens (até 3)
- Preview de imagens
- Adiciona ao estado de publicações
- Exibe em "Serviços realizados" do perfil

### 6. Sistema de Avaliações
- Lista de avaliações recebidas
- Cards com nome, data, avaliação, comentário
- Média geral
- Filtro por período

### 7. Assinatura CiviRei (Premium)
- Planos: Gratuito, Premium, CiviRei
- Cards com benefícios
- Preços
- Badge "CiviRei" no perfil
- Acesso a recursos exclusivos

### 8. Dados do Mercado (IBGE)
- Gráficos de informalidade
- Evolução anual
- Serviços mais solicitados
- Fonte dos dados
- Visualização com Chart.js

### 9. Indicações de Vizinhos
- Lista de referências
- Cards com nome, descrição, link, tags
- Botão compartilhar link
- Benefícios de indicar

### 10. Privacidade
- Política de privacidade
- Coleta de dados
- Uso de informações
- Opções de privacidade
- Botão excluir conta

---

## Instruções para Recriar o App

### 1. Configuração Inicial

```bash
# Criar projeto
npm create vite@latest civilar-app-v2 -- --template react-ts
cd civilar-app-v2

# Instalar dependências
npm install lucide-react chart.js react-chartjs-2
npm install -D @vitejs/plugin-react electron electron-builder

# Instalar dependências de desenvolvimento
npm install
```

### 2. Estrutura de Arquivos

Criar a seguinte estrutura:
```
src/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
├── assets/
├── components/
│   ├── BottomNav.tsx
│   ├── CategoryChip.tsx
│   ├── ProviderCard.tsx
│   ├── StarRating.tsx
│   ├── ToastContainer.tsx
│   └── VerifiedBadge.tsx
├── data/
│   └── index.ts
├── hooks/
│   └── useToast.ts
├── pages/
│   ├── SplashScreen.tsx
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ExplorarScreen.tsx
│   ├── MapScreen.tsx
│   ├── PrestadorDetailScreen.tsx
│   ├── CadastrarScreen.tsx
│   ├── PortfolioScreen.tsx
│   ├── DadosScreen.tsx
│   ├── ReferralScreen.tsx
│   ├── PerfilScreen.tsx
│   ├── AvaliacoesScreen.tsx
│   ├── PrivacidadeScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── ChatScreen.tsx
│   ├── AssinaturaScreen.tsx
│   └── PublicarScreen.tsx
└── types/
    └── index.ts
```

### 3. Tipos TypeScript

Criar `src/types/index.ts` com as interfaces:
- Prestador
- Categoria
- Referencia
- DadosIBGE
- Page (union type)

### 4. Dados Mockados

Criar `src/data/index.ts` com:
- Lista de bairros (60+)
- Lista de serviços (18)
- Categorias (8)
- Prestadores mockados
- Funções auxiliares (getPrestadores, getUserById)
- Dados IBGE

### 5. Hooks Customizados

Criar `src/hooks/useToast.ts` com:
- Interface Toast
- Hook useToast
- Função showToast

### 6. Componentes Reutilizáveis

Criar os 6 componentes em `src/components/`:
- BottomNav
- CategoryChip
- ProviderCard
- StarRating
- ToastContainer
- VerifiedBadge

### 7. Telas do Aplicativo

Criar as 18 telas em `src/pages/`:
- SplashScreen
- WelcomeScreen
- LoginScreen
- HomeScreen
- ExplorarScreen
- MapScreen
- PrestadorDetailScreen
- CadastrarScreen
- PortfolioScreen
- DadosScreen
- ReferralScreen
- PerfilScreen
- AvaliacoesScreen
- PrivacidadeScreen
- ChatListScreen
- ChatScreen
- AssinaturaScreen
- PublicarScreen

### 8. Componente Principal

Criar `src/App.tsx` com:
- Estado global (phase, page, prestadorId, currentUser, chatId, publicacoes)
- Handlers (handleNavigate, handleLogin, handleShowPrestador, handleBack, handleLogout)
- Renderização condicional por fase
- Renderização condicional por página
- BottomNav para tabs principais
- ToastContainer

### 9. Estilos CSS

Criar `src/App.css` com:
- Variáveis CSS
- Animações (slideUp, slideLeft, fadeIn)
- Classes principais (avatar, card, badge, button, input, chip, etc.)
- Layout responsivo
- Bottom navigation
- Toast notifications

### 10. Entry Point

Criar `src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 11. Configuração Vite

Criar `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 12. Configuração TypeScript

Criar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 13. Executar o App

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### 14. Considerações Importantes

1. **Estado Global:** O App.tsx gerencia todo o estado global com useState
2. **Navegação:** A navegação é baseada em estado, não em router
3. **Dados Mockados:** Todos os dados estão em `src/data/index.ts`
4. **Ícones:** Usar lucide-react para todos os ícones
5. **Estilos:** Usar variáveis CSS para consistência
6. **Animações:** Animações CSS para transições suaves
7. **Responsividade:** Design mobile-first
8. **Acessibilidade:** Usar tags semânticas e ARIA quando necessário
9. **Performance:** Usar useCallback para handlers
10. **TypeScript:** Usar tipos estritos para segurança

### 15. Conversão para PDF

Para converter este arquivo Markdown para PDF:
1. Usar ferramenta como Pandoc: `pandoc DOCUMENTACAO_TECNICA.md -o DOCUMENTACAO_TECNICA.pdf`
2. Ou usar editor Markdown com exportação PDF
3. Ou usar ferramentas online de conversão Markdown para PDF

---

## Conclusão

Esta documentação técnica detalha todos os aspectos do CiviLar App v2, incluindo estrutura, tecnologias, componentes, telas, fluxos e funcionalidades. Com esta documentação, outra IA pode recriar o app igual ou melhor, mantendo a mesma arquitetura e funcionalidades.

Para dúvidas ou esclarecimentos, consulte o código fonte em `src/` ou entre em contato com a equipe de desenvolvimento.
