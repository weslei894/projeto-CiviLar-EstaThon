const app = document.getElementById('app');
const bottomNav = document.getElementById('bottom-nav');
let currentPage = 'welcome';

function init() {
    createToastContainer();
    renderPage('welcome');
    setupNavigation();
}

function createToastContainer() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : 
              type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
              '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
        </svg>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page) {
                setActiveNav(page);
                renderPage(page);
            }
        });
    });
}

function setActiveNav(page) {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
}

function renderPage(page) {
    currentPage = page;
    window.scrollTo(0, 0);
    
    if (page === 'welcome') {
        bottomNav.classList.add('hidden');
        renderWelcome();
    } else {
        bottomNav.classList.remove('hidden');
        switch(page) {
            case 'home': renderHome(); break;
            case 'explorar': renderExplorar(); break;
            case 'cadastrar': renderCadastrar(); break;
            case 'dados': renderDados(); break;
            case 'perfil': renderPerfil(); break;
            case 'prestador': renderPrestadorDetail(); break;
            default: renderHome();
        }
    }
}

function renderWelcome() {
    app.innerHTML = `
        <div class="welcome-screen">
            <div class="welcome-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
            <h1>CiviLar</h1>
            <p>Conectando moradores do mesmo bairro para troca de serviços. Encontre quem mora perto e sabe fazer o que você precisa.</p>
            
            <div class="welcome-features">
                <div class="welcome-feature">
                    <div class="welcome-feature-icon">
                        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <span>Validado</span>
                </div>
                <div class="welcome-feature">
                    <div class="welcome-feature-icon">
                        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <span>Comunitário</span>
                </div>
                <div class="welcome-feature">
                    <div class="welcome-feature-icon">
                        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <span>Seguro</span>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="renderPage('home'); setActiveNav('home'); bottomNav.classList.remove('hidden');">
                Entrar no App
            </button>
            <p class="text-xs text-secondary mt-3">Projeto FIAP - EstaTum 2026</p>
        </div>
    `;
}

function renderHome() {
    const prestadores = getPrestadores().slice(0, 4);
    const html = prestadores.map(p => createServiceCard(p)).join('');
    
    app.innerHTML = `
        <div class="page-section">
            <div class="app-header">
                <div class="logo">
                    <div class="logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <h1>CiviLar</h1>
                </div>
                <span class="text-sm text-secondary">São Paulo</span>
            </div>
            
            <div class="card hero-card mb-4">
                <h2 class="text-xl font-bold mb-2">Bem-vindo ao CiviLar</h2>
                <p class="text-sm" style="opacity: 0.95;">Encontre prestadores de confiança no seu bairro. Todos os profissionais são validados pela nossa equipe.</p>
                <div class="stats-grid mt-4" style="grid-template-columns: repeat(3, 1fr); gap: 8px;">
                    <div class="stat-box" style="background: rgba(255,255,255,0.15); border: none;">
                        <div class="stat-box-value" style="color: white; font-size: 1.25rem;">${APP_DATA.users.filter(u=>u.tipo==='prestador').length}</div>
                        <div class="stat-box-label" style="color: rgba(255,255,255,0.85);">Prestadores</div>
                    </div>
                    <div class="stat-box" style="background: rgba(255,255,255,0.15); border: none;">
                        <div class="stat-box-value" style="color: white; font-size: 1.25rem;">${APP_DATA.bairros.length}</div>
                        <div class="stat-box-label" style="color: rgba(255,255,255,0.85);">Bairros</div>
                    </div>
                    <div class="stat-box" style="background: rgba(255,255,255,0.15); border: none;">
                        <div class="stat-box-value" style="color: white; font-size: 1.25rem;">100%</div>
                        <div class="stat-box-label" style="color: rgba(255,255,255,0.85);">Validados</div>
                    </div>
                </div>
            </div>
            
            <h2 class="text-lg font-bold mb-3">Categorias</h2>
            <div class="category-scroll mb-4">
                ${APP_DATA.categorias.map(cat => `
                    <div class="category-item" onclick="renderPage('explorar'); setActiveNav('explorar'); showToast('Filtrando: ${cat.nome}', 'info', 1500);">
                        <div class="category-icon" style="background: ${cat.bg}; color: ${cat.cor}">${cat.icon}</div>
                        <span class="category-label">${cat.nome}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="banner-destaque">
                <div class="banner-destaque-icon">⭐</div>
                <div>
                    <div class="font-semibold text-sm" style="color: #92400E;">Prestadores Premium</div>
                    <div class="text-xs mt-1" style="color: #B45309; opacity: 0.9;">Profissionais destaque com maior visibilidade</div>
                </div>
            </div>
            
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-bold">Destaques da sua região</h2>
                <button class="text-sm text-primary font-semibold" style="background:none;border:none;cursor:pointer;font-family:inherit" onclick="renderPage('explorar'); setActiveNav('explorar');">Ver todos</button>
            </div>
            ${html}
            
            <h2 class="text-lg font-bold mb-3 mt-4">Como funciona</h2>
            <div class="step-card">
                <div class="step-number">1</div>
                <div>
                    <div class="font-semibold text-sm">Cadastre-se</div>
                    <div class="text-xs text-secondary mt-1">Crie seu perfil como prestador ou solicitante</div>
                </div>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <div>
                    <div class="font-semibold text-sm">Validação</div>
                    <div class="text-xs text-secondary mt-1">Nossa equipe verifica seus dados e documentos</div>
                </div>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <div>
                    <div class="font-semibold text-sm">Conecte-se</div>
                    <div class="text-xs text-secondary mt-1">Encontre vizinhos e feche negócio diretamente</div>
                </div>
            </div>
        </div>
    `;
}

function createServiceCard(p) {
    return `
        <div class="card service-card" onclick="showPrestador(${p.id})">
            <div class="card-header">
                <div class="avatar ${p.avatarClass || 'avatar-1'}">${p.initials}</div>
                <div style="flex:1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-semibold">${p.name}</span>
                        ${p.verified ? `<span class="badge badge-verified">Validado</span>` : ''}
                        ${p.premium ? `<span class="badge badge-premium">Premium</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1 mt-1">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span class="text-xs text-secondary">${p.bairro}, ${p.cidade}</span>
                    </div>
                    <div class="stars text-sm mt-2">
                        ${getStars(p.avaliacao)}
                        <span class="text-muted" style="margin-left:4px;font-size:0.75rem">${p.avaliacao} · ${p.avaliacoesCount} avaliações</span>
                    </div>
                </div>
            </div>
            <div class="service-tags">
                ${p.servicos.slice(0, 3).map(s => `<span class="badge badge-service">${s}</span>`).join('')}
            </div>
        </div>
    `;
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) stars += '★';
        else if (i - 0.5 <= rating) stars += '½';
        else stars += '☆';
    }
    return stars;
}

function showPrestador(id) {
    const p = getUserById(id);
    if (!p) return;
    
    app.innerHTML = `
        <div class="page-section">
            <div class="app-header">
                <button class="btn btn-sm btn-outline" style="width:auto;padding:8px 14px;" onclick="renderPage('explorar'); setActiveNav('explorar');">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
                    Voltar
                </button>
                <h1>Perfil</h1>
                <div style="width:76px"></div>
            </div>
            
            <div class="profile-header">
                <div class="avatar avatar-lg ${p.avatarClass || 'avatar-1'}" style="margin:0 auto">${p.initials}</div>
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <div class="flex items-center justify-center gap-2 mt-2 flex-wrap">
                    ${p.verified ? `<span class="badge badge-verified">Validado pela equipe CiviLar</span>` : ''}
                    ${p.premium ? `<span class="badge badge-premium">Premium</span>` : ''}
                </div>
                <div class="flex items-center justify-center gap-1 mt-2">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span class="text-sm text-secondary">${p.bairro}, ${p.cidade}</span>
                </div>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="profile-stat-value">${p.avaliacao}</div>
                        <div class="profile-stat-label">Avaliação</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">${p.avaliacoesCount}</div>
                        <div class="profile-stat-label">Serviços</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">${p.servicos.length}</div>
                        <div class="profile-stat-label">Especialidades</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3 class="font-semibold mb-2">Sobre</h3>
                <p class="text-sm text-secondary" style="line-height:1.7">${p.bio || 'Sem descrição.'}</p>
            </div>
            
            <div class="card">
                <h3 class="font-semibold mb-3">Serviços oferecidos</h3>
                <div class="service-tags">
                    ${p.servicos.map(s => `<span class="badge badge-service">${s}</span>`).join('')}
                </div>
            </div>
            
            <div class="card">
                <h3 class="font-semibold mb-3">Validação do prestador</h3>
                <div class="verify-list">
                    <div class="verify-item">
                        <div class="verify-icon">✓</div>
                        <span class="text-sm">Foto obrigatória e visível no perfil</span>
                    </div>
                    <div class="verify-item">
                        <div class="verify-icon">✓</div>
                        <span class="text-sm">Bairro confirmado manualmente pela equipe</span>
                    </div>
                    <div class="verify-item">
                        <div class="verify-icon">✓</div>
                        <span class="text-sm">Telefone verificado via código SMS</span>
                    </div>
                    <div class="verify-item">
                        <div class="verify-icon">✓</div>
                        <span class="text-sm">Documento validado antes da ativação</span>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="showToast('Em breve: contato direto via WhatsApp!', 'info', 3000)">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.94 12.94 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.94 12.94 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Entrar em contato
            </button>
            <p class="text-xs text-center text-secondary mt-2">Telefone: ${p.telefone}</p>
        </div>
    `;
}

function renderExplorar() {
    let selectedBairro = null;
    let selectedServico = null;
    
    function updateList() {
        const prestadores = getPrestadores(selectedBairro, selectedServico);
        const listEl = document.getElementById('explorar-list');
        if (prestadores.length === 0) {
            listEl.innerHTML = `
                <div class="text-center text-secondary p-4">
                    <p>Nenhum prestador encontrado.</p>
                    <p class="text-sm">Tente outro bairro ou serviço.</p>
                </div>
            `;
        } else {
            listEl.innerHTML = prestadores.map(p => createServiceCard(p)).join('');
        }
    }
    
    app.innerHTML = `
        <div class="page-section" style="padding-top:0">
            <div class="app-header">
                <h1>Explorar</h1>
            </div>
            <div class="search-bar">
                <div class="search-input">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" class="input" placeholder="Buscar serviço..." id="search-servico">
                </div>
            </div>
            
            <div class="filter-chips" id="bairro-chips">
                <button class="chip active" data-bairro="">Todos</button>
                ${APP_DATA.bairros.map(b => `<button class="chip" data-bairro="${b}">${b}</button>`).join('')}
            </div>
            
            <div id="explorar-list" style="padding:0 16px">
                ${getPrestadores().map(p => createServiceCard(p)).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('search-servico').addEventListener('input', (e) => {
        selectedServico = e.target.value;
        updateList();
    });
    
    document.getElementById('bairro-chips').addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            document.querySelectorAll('#bairro-chips .chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            selectedBairro = e.target.dataset.bairro || null;
            updateList();
        }
    });
}

function renderCadastrar() {
    app.innerHTML = `
        <div class="page-section">
            <div class="app-header">
                <h1>Cadastrar</h1>
            </div>
            
            <h2 class="text-lg font-bold mb-3">Criar perfil</h2>
            <form id="cadastro-form">
                <label class="label">Nome completo</label>
                <input type="text" class="input" placeholder="Seu nome" required>
                
                <label class="label">Tipo de perfil</label>
                <select class="select" id="tipo-perfil" required>
                    <option value="">Selecione...</option>
                    <option value="prestador">Prestador de serviços</option>
                    <option value="solicitante">Solicitante</option>
                </select>
                
                <label class="label">Bairro</label>
                <select class="select" required>
                    <option value="">Selecione...</option>
                    ${APP_DATA.bairros.map(b => `<option value="${b}">${b}</option>`).join('')}
                </select>
                
                <label class="label">Telefone (com DDD)</label>
                <input type="tel" class="input" placeholder="(11) 98765-4321" required>
                
                <label class="label">Serviços oferecidos (prestador)</label>
                <div class="flex flex-wrap gap-2 mb-3" id="servicos-check">
                    ${APP_DATA.servicos.map(s => `
                        <label style="display:flex;align-items:center;gap:6px;font-size:0.875rem;cursor:pointer;padding:6px 10px;background:white;border-radius:8px;border:1.5px solid var(--border)">
                            <input type="checkbox" value="${s}">
                            ${s}
                        </label>
                    `).join('')}
                </div>
                
                <label class="label">Sobre você</label>
                <textarea class="input" rows="3" placeholder="Conte um pouco sobre sua experiência..."></textarea>
                
                <div class="card" style="background: var(--primary-light); border: 1px solid var(--primary)">
                    <div class="flex items-center gap-2 mb-2">
                        <svg width="20" height="20" fill="none" stroke="var(--primary-dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        <span class="font-semibold text-sm" style="color:var(--primary-dark)">Validação obrigatória</span>
                    </div>
                    <p class="text-xs" style="color:var(--primary-dark);opacity:0.9">Seu perfil só será ativado após nossa equipe validar seus documentos e confirmar seu bairro. Isso garante confiança para todos.</p>
                </div>
                
                <button type="submit" class="btn btn-primary mt-3">Enviar para validação</button>
            </form>
        </div>
    `;
    
    document.getElementById('cadastro-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Cadastro enviado para validação! Em breve nossa equipe entrará em contato.', 'success', 4000);
        renderPage('home');
        setActiveNav('home');
    });
}

function renderDados() {
    app.innerHTML = `
        <div class="page-section">
            <div class="app-header">
                <h1>Dados e Insights</h1>
            </div>
            
            <p class="text-sm text-secondary mb-3">Referências reais do mercado de trabalho informal no Brasil e em São Paulo.</p>
            
            <div class="card chart-card">
                <h3 class="font-semibold text-sm mb-1">Taxa de Informalidade - Brasil vs São Paulo</h3>
                <p class="text-xs text-secondary mb-2">Fonte: IBGE PNAD Contínua 2020-2024</p>
                <div class="chart-container">
                    <canvas id="chart-evolucao"></canvas>
                </div>
            </div>
            
            <div class="card chart-card">
                <h3 class="font-semibold text-sm mb-1">Serviços Mais Solicitados Online</h3>
                <p class="text-xs text-secondary mb-2">Baseado em dados de marketplaces de serviços</p>
                <div class="chart-container">
                    <canvas id="chart-servicos"></canvas>
                </div>
            </div>
            
            <h2 class="text-lg font-bold mb-3">Números do Mercado</h2>
            <div class="stats-grid mb-4">
                <div class="stat-box">
                    <div class="stat-box-value">${APP_DATA.dadosIBGE.informalidadeBrasil}%</div>
                    <div class="stat-box-label">Informalidade Brasil</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-value">${APP_DATA.dadosIBGE.informalidadeSP}%</div>
                    <div class="stat-box-label">Informalidade SP</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-value">${APP_DATA.dadosIBGE.trabalhadoresInformaisMilhoes}M</div>
                    <div class="stat-box-label">Trabalhadores informais</div>
                </div>
                <div class="stat-box">
                    <div class="stat-box-value">${APP_DATA.dadosIBGE.autonomosInformaisMilhoes}M</div>
                    <div class="stat-box-label">Autônomos informais</div>
                </div>
            </div>
            <p class="text-xs text-secondary mb-4 text-center">Fonte: IBGE, Agência Brasil, Genyo 2024/2025</p>
            
            <h2 class="text-lg font-bold mb-3 mt-4">Referências Reais</h2>
            ${APP_DATA.referencias.map(ref => `
                <div class="card ref-card">
                    <h4>${ref.nome}</h4>
                    <p class="mb-2">${ref.descricao}</p>
                    <div class="service-tags">
                        ${ref.tags.map(t => `<span class="badge badge-service">${t}</span>`).join('')}
                    </div>
                    <a href="${ref.link}" target="_blank" rel="noopener" class="mt-2 inline-block">Acessar referência →</a>
                </div>
            `).join('')}
        </div>
    `;
    
    setTimeout(() => initCharts(), 100);
}

function initCharts() {
    const ctxEvo = document.getElementById('chart-evolucao');
    if (ctxEvo) {
        new Chart(ctxEvo, {
            type: 'line',
            data: {
                labels: APP_DATA.dadosIBGE.evolucaoAnual.map(d => d.ano),
                datasets: [
                    {
                        label: 'Brasil',
                        data: APP_DATA.dadosIBGE.evolucaoAnual.map(d => d.brasil),
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16,185,129,0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'São Paulo',
                        data: APP_DATA.dadosIBGE.evolucaoAnual.map(d => d.sp),
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
                scales: { y: { beginAtZero: false, min: 25, max: 45, ticks: { callback: v => v + '%', font: { size: 10 } } }, x: { ticks: { font: { size: 10 } } } }
            }
        });
    }
    
    const ctxServ = document.getElementById('chart-servicos');
    if (ctxServ) {
        new Chart(ctxServ, {
            type: 'doughnut',
            data: {
                labels: APP_DATA.dadosIBGE.servicosMaisSolicitados.map(d => d.servico),
                datasets: [{
                    data: APP_DATA.dadosIBGE.servicosMaisSolicitados.map(d => d.percentual),
                    backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 }, padding: 8 } } }
            }
        });
    }
}

function renderPerfil() {
    const user = APP_DATA.currentUser || APP_DATA.users[5];
    app.innerHTML = `
        <div class="page-section">
            <div class="app-header">
                <h1>Meu Perfil</h1>
            </div>
            
            <div class="profile-header">
                <div class="avatar avatar-lg ${user.avatarClass || 'avatar-4'}" style="margin:0 auto">${user.initials}</div>
                <h2 class="text-xl font-bold mt-3">${user.name}</h2>
                <div class="text-sm text-secondary mt-1">${user.bairro}, ${user.cidade}</div>
                <div class="text-sm text-muted mt-1">${user.tipo === 'prestador' ? 'Prestador de serviços' : 'Solicitante'}</div>
                ${user.tipo === 'prestador' ? `
                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="profile-stat-value">${user.avaliacao || '-'}</div>
                        <div class="profile-stat-label">Avaliação</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">${user.avaliacoesCount || 0}</div>
                        <div class="profile-stat-label">Serviços</div>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="card">
                <h3 class="font-semibold mb-2">Configurações</h3>
                <div class="settings-item" onclick="showToast('Em breve!', 'info')">
                    <span class="text-sm">Editar perfil</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                </div>
                <div class="settings-item" onclick="showToast('Em breve!', 'info')">
                    <span class="text-sm">Meus serviços</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                </div>
                <div class="settings-item" onclick="showToast('Em breve!', 'info')">
                    <span class="text-sm">Avaliações recebidas</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                </div>
                <div class="settings-item" onclick="showToast('Em breve!', 'info')">
                    <span class="text-sm">Privacidade</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                </div>
            </div>
            
            <button class="btn btn-outline mt-3" onclick="renderPage('welcome'); bottomNav.classList.add('hidden');">
                Sair da conta
            </button>
        </div>
    `;
}

function renderPrestadorDetail() {
    renderExplorar();
}

init();
