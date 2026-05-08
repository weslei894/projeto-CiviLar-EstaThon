const APP_DATA = {
    currentUser: null,
    users: [
        {
            id: 1,
            name: "João Silva",
            initials: "JS",
            avatarClass: "avatar-1",
            bairro: "Vila Mariana",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Pedreiro", "Pintura", "Pequenos Reparos"],
            avaliacao: 4.8,
            avaliacoesCount: 12,
            verified: true,
            premium: false,
            telefone: "(11) 98765-4321",
            bio: "Pedreiro com 15 anos de experiência. Faço reparos, pinturas e pequenas reformas. Atendo Vila Mariana e região.",
            photo: null,
            since: "2026-01"
        },
        {
            id: 2,
            name: "Maria Oliveira",
            initials: "MO",
            avatarClass: "avatar-2",
            bairro: "Pinheiros",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Diarista", "Faxina", "Lavar Louça"],
            avaliacao: 4.9,
            avaliacoesCount: 28,
            verified: true,
            premium: true,
            telefone: "(11) 91234-5678",
            bio: "Diarista dedicada e pontual. Trabalho com produtos de qualidade e cuidado especial com cada cantinho.",
            photo: null,
            since: "2025-11"
        },
        {
            id: 3,
            name: "Carlos Mendes",
            initials: "CM",
            avatarClass: "avatar-3",
            bairro: "Moema",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Eletricista", "Instalações"],
            avaliacao: 4.7,
            avaliacoesCount: 8,
            verified: true,
            premium: false,
            telefone: "(11) 94567-8901",
            bio: "Eletricista residencial e predial. Instalações, reparos e manutenção elétrica com segurança.",
            photo: null,
            since: "2026-02"
        },
        {
            id: 4,
            name: "Ana Costa",
            initials: "AC",
            avatarClass: "avatar-4",
            bairro: "Vila Mariana",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Costura", "Consertos", "Ajustes"],
            avaliacao: 5.0,
            avaliacoesCount: 6,
            verified: true,
            premium: false,
            telefone: "(11) 99876-5432",
            bio: "Costureira com experiência em roupas sociais, jeans e vestidos de festa. Faço ajustes e consertos rápidos.",
            photo: null,
            since: "2026-03"
        },
        {
            id: 5,
            name: "Pedro Santos",
            initials: "PS",
            avatarClass: "avatar-5",
            bairro: "Jardins",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Jardineiro", "Paisagismo", "Podas"],
            avaliacao: 4.6,
            avaliacoesCount: 15,
            verified: true,
            premium: true,
            telefone: "(11) 92345-6789",
            bio: "Cuido do seu jardim com carinho. Podas, replantio, adubação e paisagismo residencial.",
            photo: null,
            since: "2025-09"
        },
        {
            id: 7,
            name: "Luciana Pereira",
            initials: "LP",
            avatarClass: "avatar-6",
            bairro: "Itaim Bibi",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Marceneiro", "Móveis Planejados", "Restauração"],
            avaliacao: 4.9,
            avaliacoesCount: 22,
            verified: true,
            premium: true,
            telefone: "(11) 91111-2222",
            bio: "Marceneira especializada em móveis planejados e restauração de peças antigas. Qualidade e acabamento impecável.",
            photo: null,
            since: "2025-07"
        },
        {
            id: 8,
            name: "Roberto Almeida",
            initials: "RA",
            avatarClass: "avatar-7",
            bairro: "Santana",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Encanador", "Reparos Hidráulicos", "Instalação de Chuveiro"],
            avaliacao: 4.5,
            avaliacoesCount: 18,
            verified: true,
            premium: false,
            telefone: "(11) 93333-4444",
            bio: "Encanador com 20 anos de experiência. Atendo emergências e faço orçamento sem compromisso.",
            photo: null,
            since: "2025-12"
        },
        {
            id: 9,
            name: "Juliana Martins",
            initials: "JM",
            avatarClass: "avatar-8",
            bairro: "Tatuapé",
            cidade: "São Paulo",
            tipo: "prestador",
            servicos: ["Babá", "Cuidadora", "Acompanhante"],
            avaliacao: 4.9,
            avaliacoesCount: 35,
            verified: true,
            premium: false,
            telefone: "(11) 95555-6666",
            bio: "Cuidadora infantil e de idosos com formação em enfermagem. Amor e responsabilidade em cada atendimento.",
            photo: null,
            since: "2025-05"
        },
        {
            id: 6,
            name: "Fernanda Lima",
            initials: "FL",
            avatarClass: "avatar-4",
            bairro: "Brooklin",
            cidade: "São Paulo",
            tipo: "solicitante",
            servicos: [],
            avaliacao: 0,
            avaliacoesCount: 0,
            verified: false,
            premium: false,
            telefone: "(11) 93456-7890",
            bio: "",
            photo: null,
            since: "2026-04"
        }
    ],
    bairros: [
        "Vila Mariana",
        "Pinheiros",
        "Moema",
        "Jardins",
        "Brooklin",
        "Itaim Bibi",
        "Perdizes",
        "Santana",
        "Tatuapé",
        "Liberdade"
    ],
    categorias: [
        { nome: "Reformas", icon: "🔨", cor: "#F59E0B", bg: "#FEF3C7" },
        { nome: "Limpeza", icon: "🧹", cor: "#10B981", bg: "#ECFDF5" },
        { nome: "Elétrica", icon: "⚡", cor: "#3B82F6", bg: "#EFF6FF" },
        { nome: "Encanamento", icon: "🚿", cor: "#06B6D4", bg: "#ECFEFF" },
        { nome: "Jardinagem", icon: "🌿", cor: "#84CC16", bg: "#F7FEE7" },
        { nome: "Costura", icon: "🧵", cor: "#EC4899", bg: "#FDF2F8" },
        { nome: "Marcenaria", icon: "🪚", cor: "#8B5CF6", bg: "#F5F3FF" },
        { nome: "Cuidados", icon: "❤️", cor: "#EF4444", bg: "#FEF2F2" }
    ],
    servicos: [
        "Pedreiro",
        "Pintura",
        "Eletricista",
        "Encanador",
        "Diarista",
        "Faxina",
        "Jardineiro",
        "Costura",
        "Marceneiro",
        "Serralheiro",
        "Gesseiro",
        "Pequenos Reparos",
        "Instalações",
        "Paisagismo",
        "Consertos",
        "Ajustes",
        "Lavar Louça",
        "Passar Roupa",
        "Babá",
        "Cuidadora",
        "Acompanhante"
    ],
    referencias: [
        {
            nome: "Tesouros do Bairro (LelloLAB + Stoom)",
            descricao: "Plataforma que conecta vizinhos de condomínios para divulgação de serviços e produtos. Iniciativa social voltada para empreendedorismo local.",
            link: "https://www.sindiconet.com.br/informese/app-para-divulgacao-de-servicos-em-condominios-noticias-radar-lello",
            tags: ["App", "Condomínios", "São Paulo"]
        },
        {
            nome: "Nok Nok",
            descricao: "Aplicativo que conecta vizinhos do mesmo bairro e pequenos comerciantes. Surgiu durante a pandemia e opera no Rio e São Paulo.",
            link: "https://extra.globo.com/economia/financas/castelar/plataformas-na-internet-criam-conexao-entre-vizinhos-comerciantes-locais-24429509.html",
            tags: ["App", "Bairro", "Rio e SP"]
        },
        {
            nome: "Mão na Roda (MRV)",
            descricao: "Plataforma colaborativa da MRV que conecta mais de 300 mil famílias em seus empreendimentos para troca de serviços e produtos.",
            link: "https://extra.globo.com/economia/financas/castelar/plataformas-na-internet-criam-conexao-entre-vizinhos-comerciantes-locais-24429509.html",
            tags: ["Plataforma", "Habitação", "Brasil"]
        },
        {
            nome: "GetNinjas",
            descricao: "Maior aplicativo de serviços da América Latina, com mais de 200 tipos de serviços. Conecta profissionais a clientes em todo o Brasil.",
            link: "https://www.getninjas.com.br",
            tags: ["Marketplace", "Serviços", "Brasil"]
        },
        {
            nome: "Vizinhos App",
            descricao: "Aplicativo com Feed da Vizinhança, indicações de comércio local e conexão entre moradores do mesmo bairro.",
            link: "https://apps.apple.com/us/app/vizinhos-app/id6742664695",
            tags: ["App", "Comunidade", "iOS/Android"]
        }
    ],
    dadosIBGE: {
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
            { servico: "Reformas/Reparos", percentual: 28 },
            { servico: "Limpeza/Domésticos", percentual: 24 },
            { servico: "Beleza/Bem-estar", percentual: 18 },
            { servico: "Aulas/Educação", percentual: 12 },
            { servico: "Eventos", percentual: 10 },
            { servico: "Outros", percentual: 8 }
        ],
        fonte: "IBGE - PNAD Contínua 2024/2025"
    }
};

function getPrestadores(bairro = null, servico = null) {
    let prestadores = APP_DATA.users.filter(u => u.tipo === 'prestador');
    if (bairro) {
        prestadores = prestadores.filter(u => u.bairro === bairro);
    }
    if (servico) {
        prestadores = prestadores.filter(u => u.servicos.some(s => s.toLowerCase().includes(servico.toLowerCase())));
    }
    return prestadores;
}

function getUserById(id) {
    return APP_DATA.users.find(u => u.id === id);
}
