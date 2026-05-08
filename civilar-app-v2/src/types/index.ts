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

export type Page = 'welcome' | 'home' | 'explorar' | 'cadastrar' | 'dados' | 'perfil' | 'prestador';
