// CONFIGURAÇÕES GLOBAIS DE ESTADO E PERSISTÊNCIA
const STATE_KEY = 'prudencio_checklist_state_v1';

// Dados padrões de inicialização
const defaultState = {
  currentUser: {
    reg: 'BRF-001',
    name: 'Prudêncio',
    role: 'Operador Sênior'
  },
  operators: [
    { reg: 'PRU-902', name: 'José Prudêncio', role: 'Operador Sênior', photo: 'assets/mascote.jpg', productionHours: 120, avarias: 0, trainingsCompleted: 3, checklistsCount: 5 },
    { reg: 'PRU-314', name: 'Marcos Lima', role: 'Operador Pleno', photo: '', productionHours: 95, avarias: 1, trainingsCompleted: 2, checklistsCount: 4 },
    { reg: 'PRU-789', name: 'Julia Souza', role: 'Operador Júnior', photo: '', productionHours: 85, avarias: 0, trainingsCompleted: 1, checklistsCount: 3 },
    { reg: 'PRU-456', name: 'Roberto Silva', role: 'Operador Pleno', photo: '', productionHours: 105, avarias: 2, trainingsCompleted: 2, checklistsCount: 4 }
  ],
  currentScreen: 'screen-splash',
  forklifts: [
    { id: 'EMP-01', model: 'Toyota 8FG25', status: 'Ativa', horometer: 320 },
    { id: 'EMP-02', model: 'Hyster H50FT', status: 'Manutenção', horometer: 640 },
    { id: 'EMP-05', model: 'Hyster XT-30', status: 'Ativa', horometer: 480 },
    { id: 'EMP-07', model: 'Yale GP050VX', status: 'Ativa', horometer: 150 },
    { id: 'EMP-09', model: 'Still RX70-30', status: 'Ativa', horometer: 890 }
  ],
  shifts: [
    '08:00 as 17:00',
    '10:00 as 20:00',
    '21:00 as 05:00'
  ],
  autoShift: true,
  checklistStart: [
    { id: 'buzina', name: 'Buzina Operacional', status: null, icon: 'volume-2' },
    { id: 'freios', name: 'Freios de Serviço e Estacionamento', status: null, icon: 'shield-alert' },
    { id: 'luzes', name: 'Luzes Dianteiras e Traseiras', status: null, icon: 'lightbulb' },
    { id: 'giroflex', name: 'Giroflex / Luz de Advertência', status: null, icon: 'beacon' },
    { id: 'alarme_re', name: 'Alarme de Ré Sonoro', status: null, icon: 'bell-ring' },
    { id: 'extintor', name: 'Extintor de Incêndio', status: null, icon: 'flame' },
    { id: 'cinto', name: 'Cinto de Segurança de 3 Pontos', status: null, icon: 'shield' },
    { id: 'retrovisores', name: 'Retrovisores Limpos e Regulados', status: null, icon: 'eye' },
    { id: 'garfos', name: 'Garfos e Pontas sem Trincas', status: null, icon: 'split' },
    { id: 'corrente', name: 'Corrente de Elevação Lubrificada', status: null, icon: 'link' },
    { id: 'pneus', name: 'Pneus e Rodas Integridade', status: null, icon: 'disc' },
    { id: 'vazamentos', name: 'Ausência de Vazamentos de Óleo/Fluido', status: null, icon: 'droplet' },
    { id: 'hidraulico', name: 'Nível de Óleo Hidráulico', status: null, icon: 'activity' },
    { id: 'bateria', name: 'Nível e Conectores de Bateria', status: null, icon: 'battery-charging' },
    { id: 'painel', name: 'Instrumentos do Painel de Controle', status: null, icon: 'sliders' },
    { id: 'direcao', name: 'Folga do Sistema de Direção', status: null, icon: 'compass' },
    { id: 'capacidade_carga', name: 'Placa de Capacidade Visível', status: null, icon: 'scale' },
    { id: 'movimentacao', name: 'Movimentação Geral Macia', status: null, icon: 'move' },
    { id: 'elevacao', name: 'Elevação de Garfos Correta', status: null, icon: 'chevrons-up' },
    { id: 'inclinacao', name: 'Inclinação da Torre sem Ruídos', status: null, icon: 'iteration-cw' },
    { id: 'estabilidade', name: 'Estabilizadores Laterais Perfeitos', status: null, icon: 'grid' }
  ],
  checklistEnd: [
    { id: 'danos', name: 'Novos danos encontrados na carcaça', status: null, icon: 'alert-triangle' },
    { id: 'abastecimento', name: 'Nível de combustível ou carga da bateria', status: null, icon: 'battery-charging' },
    { id: 'limpeza', name: 'Cabine higienizada e livre de detritos', status: null, icon: 'sparkles' },
    { id: 'horas', name: 'Horas totais registradas no horímetro', status: null, icon: 'clock' },
    { id: 'ocorrencias', name: 'Ausência de ocorrências de segurança', status: null, icon: 'shield-alert' },
    { id: 'impactos', name: 'Nenhum impacto físico registrado', status: null, icon: 'zap-off' },
    { id: 'falhas_novas', name: 'Novas falhas observadas durante o dia', status: null, icon: 'wrench' },
    { id: 'observacoes', name: 'Observações gerais relatadas', status: null, icon: 'message-square' }
  ],
  blockedForklifts: 2,
  conformityScore: 94,
  tickets: [
    { id: 't1', forklift: 'EMP-02', desc: 'Mangueira Rompida', openedBy: 'Marcos Lima', time: 'Há 2 horas', sla: 'Restam 1h 15min', status: 'EM ANÁLISE', type: 'critical' },
    { id: 't2', forklift: 'EMP-07', desc: 'Giroflex Trincado', openedBy: 'Julia Souza', time: 'Ontem', sla: 'Confortável', status: 'AGUARDANDO PEÇA', type: 'warning' }
  ],
  reports: [
    { id: 'r1', name: 'Checklists Operacionais - Geral', period: '01/05 - 22/05', format: 'PDF', isDefault: true },
    { id: 'r2', name: 'Horas Trabalhadas e Ocorrências', period: '15/05 - 22/05', format: 'XLS', isDefault: true }
  ],
  auditLogs: [
    { id: 'l1', time: 'Hoje, 13:10', operator: 'José Prudêncio', desc: 'Checklist Início de Jornada concluído sem pendências críticas na empilhadeira Hyster EMP-05.', type: 'info' },
    { id: 'l2', time: 'Ontem, 16:45', operator: 'Marcos Lima', desc: 'Vazamento hidráulico detectado nos garfos. Empilhadeira EMP-02 foi bloqueada operacionalmente automaticamente.', type: 'danger' }
  ],
  checklistHistory: [
    {
      id: 'h1',
      type: 'start',
      operator: 'José Prudêncio',
      operatorReg: 'PRU-902',
      forkliftId: 'EMP-05',
      forkliftModel: 'Hyster XT-30',
      horometer: 480,
      shift: '08:00 as 17:00',
      dateTime: '22/05/2026 08:15',
      items: [
        { id: 'buzina', name: 'Buzina Operacional', status: 'ok' },
        { id: 'freios', name: 'Freios de Serviço e Estacionamento', status: 'ok' },
        { id: 'luzes', name: 'Luzes Dianteiras e Traseiras', status: 'ok' },
        { id: 'giroflex', name: 'Giroflex / Luz de Advertência', status: 'warning', photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23222"/><text x="50" y="55" fill="%23FFC107" font-size="12" text-anchor="middle">Giroflex Trincado</text></svg>' },
        { id: 'alarme_re', name: 'Alarme de Ré Sonoro', status: 'ok' }
      ],
      signature: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
  ]
};

// Declaração do estado mutável do app
let state = { ...defaultState };

// SALVA O ESTADO NO LOCALSTORAGE
function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Erro ao salvar estado no LocalStorage:", e);
  }
}

// CARREGA O ESTADO DO LOCALSTORAGE
function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Mescla o estado carregado para garantir integridade caso novos campos sejam adicionados
      state = { ...defaultState, ...parsed };
    } else {
      state = JSON.parse(JSON.stringify(defaultState)); // Cópia profunda do padrão
      saveState();
    }
  } catch (e) {
    console.error("Erro ao ler LocalStorage, revertendo para dados padrões:", e);
    state = JSON.parse(JSON.stringify(defaultState));
  }
}

// MAPEAMENTO DE TÍTULOS DA APPBAR
const screenTitles = {
  'screen-dashboard': 'Painel de Controle',
  'screen-pre-checklist': 'Preparar Jornada',
  'screen-checklist-start': 'Checklist de Início',
  'screen-checklist-end': 'Checklist de Saída',
  'screen-maintenance': 'Ordem de Serviço',
  'screen-reports': 'Central de Relatórios',
  'screen-ranking': 'Ranking Operacional',
  'screen-trainings': 'Capacitação & DDS',
  'screen-profile': 'Perfil do Operador',
  'screen-admin': 'Painel do Administrador'
};

// INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', () => {
  // Registra o Service Worker para suporte a PWA (Funcionamento Offline e Instalação)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[PWA] Service Worker registrado com sucesso para o escopo:', reg.scope))
      .catch((err) => console.error('[PWA] Falha ao registrar Service Worker:', err));
  }

  // Carrega persistência
  loadState();

  // Inicializa os ícones do Lucide
  lucide.createIcons();
  
  // Garante que a tela inicial exibida seja a Splash Screen para evitar travamentos de estado
  state.currentScreen = 'screen-splash';
  navigateTo('screen-splash');
  
  // Timer de Splash Screen para ir à tela de Login automaticamente em 4 segundos
  setTimeout(() => {
    if (state.currentScreen === 'screen-splash') {
      navigateTo('screen-login');
    }
  }, 4000);

  // Sincroniza dados estáticos e dinâmicos do Estado com a Interface
  syncStateToUI();

  // Renderiza checklists
  renderChecklist('checklist-start-items', state.checklistStart, 'start');
  renderChecklist('checklist-end-items', state.checklistEnd, 'end');

  // Renderiza chamados de manutenção, relatórios e logs
  renderTickets();
  renderReports();
  renderAuditLogs();

  // Renderiza novas seções de administração (Frota, Turnos e Operadores)
  renderAdminForklifts();
  renderAdminShifts();
  renderAdminOperators();
  renderAdminTickets();
  renderChecklistHistory();
  renderRanking();

  // Inicializa o Velocímetro (Gauge)
  updateGauge(state.conformityScore);
});

// MOTOR DE CÁLCULO E AVATARES OPERACIONAIS
function calculateOperatorScore(op) {
  const prod = (op.productionHours || 0) * 10;
  const av = (op.avarias || 0) * 150;
  const tr = (op.trainingsCompleted || 0) * 50;
  const ch = (op.checklistsCount || 0) * 5;
  return prod - av + tr + ch;
}

function getInitialsAvatarSvg(name) {
  const nameParts = name.trim().split(/\s+/);
  let initials = '';
  if (nameParts.length >= 2) {
    initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];
  } else if (nameParts.length === 1 && nameParts[0].length > 0) {
    initials = nameParts[0].slice(0, 2);
  } else {
    initials = 'OP';
  }
  initials = initials.toUpperCase();
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231E1E1E;stop-opacity:1" /><stop offset="100%" style="stop-color:%230D0D0D;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="46" fill="url(%23avatarGrad)" stroke="%23FFC107" stroke-width="3" /><text x="50" y="55" dominant-baseline="middle" text-anchor="middle" fill="%23FFC107" font-family="'Bebas Neue', 'Inter', sans-serif" font-size="40" font-weight="bold" letter-spacing="1">${initials}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + svg;
}

function getOperatorAvatarUrl(op) {
  if (op.photo && op.photo.trim() !== '') {
    return op.photo;
  }
  return getInitialsAvatarSvg(op.name);
}

// SINCRONIZA DADOS DO ESTADO COM COMPONENTES DA TELA
function syncStateToUI() {
  // Garantir que a lista de operadores existe
  if (!state.operators) {
    state.operators = JSON.parse(JSON.stringify(defaultState.operators));
  }

  // Buscar operador ativo
  let activeOp = state.operators.find(op => op.reg === state.currentUser.reg);
  if (!activeOp) {
    activeOp = {
      reg: state.currentUser.reg || 'PRU-902',
      name: state.currentUser.name || 'José Prudêncio',
      role: 'Operador Pleno',
      photo: '',
      productionHours: 0,
      avarias: 0,
      trainingsCompleted: 0,
      checklistsCount: 0
    };
    state.operators.push(activeOp);
    saveState();
  }

  // Nome do Operador no Painel
  const opNameEl = document.getElementById('operator-name');
  if (opNameEl) opNameEl.innerText = activeOp.name;

  document.querySelectorAll('.operator-profile-name').forEach(el => {
    el.innerText = activeOp.name;
  });

  // KPIs
  const blockedKpi = document.getElementById('kpi-blocked-count');
  if (blockedKpi) blockedKpi.innerText = state.blockedForklifts;

  const conformityKpi = document.getElementById('kpi-conformity-value');
  if (conformityKpi) conformityKpi.innerText = `${state.conformityScore}%`;

  const gaugePercent = document.getElementById('gauge-percent');
  if (gaugePercent) gaugePercent.innerText = `${state.conformityScore}%`;

  // Avatar e cabeçalhos do operador
  const avatarUrl = getOperatorAvatarUrl(activeOp);
  
  const avatarEl = document.getElementById('appbar-avatar');
  if (avatarEl) {
    avatarEl.src = avatarUrl;
    avatarEl.style.filter = 'none'; // Limpa filtros antigos
  }

  const profileAvatar = document.querySelector('.profile-avatar-large');
  if (profileAvatar) {
    profileAvatar.src = avatarUrl;
    profileAvatar.style.filter = 'none';
  }

  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    profileName.innerText = activeOp.name;
  }

  const profileRole = document.querySelector('.profile-role');
  if (profileRole) {
    profileRole.innerText = `${activeOp.role} • Matrícula: ${activeOp.reg}`;
  }

  // Ficha de Desempenho (Scorecard)
  const profileHours = document.getElementById('profile-hours');
  if (profileHours) profileHours.innerText = `${activeOp.productionHours}h`;

  const profileAvarias = document.getElementById('profile-avarias');
  if (profileAvarias) profileAvarias.innerText = activeOp.avarias;

  const profileTrainings = document.getElementById('profile-trainings');
  if (profileTrainings) profileTrainings.innerText = activeOp.trainingsCompleted;

  const profileChecklists = document.getElementById('profile-checklists');
  if (profileChecklists) profileChecklists.innerText = activeOp.checklistsCount;

  const totalScore = calculateOperatorScore(activeOp);
  const profileTotalScore = document.getElementById('profile-total-score');
  if (profileTotalScore) profileTotalScore.innerText = `${totalScore} pts`;

  // Calcular posição no ranking
  const sortedOps = [...state.operators].sort((a, b) => calculateOperatorScore(b) - calculateOperatorScore(a));
  const rankIndex = sortedOps.findIndex(op => op.reg === activeOp.reg);
  const profileRankPosition = document.getElementById('profile-rank-position');
  if (profileRankPosition) {
    profileRankPosition.innerText = rankIndex !== -1 ? `${rankIndex + 1}º` : '--';
  }

  // Renderizar o Status das Empilhadeiras no Painel de Controle (Dashboard)
  renderDashboardFleet();
}

// RENDERIZA STATUS DA FROTA NO DASHBOARD (VERDE PARA LIBERADA, VERMELHO PARA BLOQUEADA)
function renderDashboardFleet() {
  const container = document.getElementById('dashboard-fleet-list');
  if (!container) return;
  container.innerHTML = '';
  
  state.forklifts.forEach(f => {
    const isMaintenance = f.status === 'Manutenção';
    const card = document.createElement('div');
    card.className = `fleet-status-card ${isMaintenance ? 'status-bloqueada' : 'status-liberada'}`;
    
    // Suporte ao clique para carregar o checklist de forma rápida e intuitiva se estiver ativa/liberada
    card.onclick = () => {
      if (isMaintenance) {
        alert(`A empilhadeira ${f.id} está bloqueada para manutenção e não pode ser operada no momento.`);
      } else {
        preparePreChecklist(f.id);
      }
    };
    card.style.cursor = 'pointer';
    card.title = isMaintenance ? 'Bloqueada para Manutenção' : 'Clique para Iniciar o Checklist';
    
    card.innerHTML = `
      <div class="fleet-card-header">
        <span class="fleet-card-id">${f.id}</span>
        <span class="fleet-card-dot"></span>
      </div>
      <div class="fleet-card-info">
        <span class="fleet-card-model">${f.model}</span>
        <span class="fleet-card-status-text">${isMaintenance ? 'Bloqueada' : 'Liberada'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// NAVEGADOR SPA (ROTEAMENTO)
function navigateTo(screenId) {
  // Intercepta para forçar a tela preparatória de Pré-Checklist antes do checklist real
  if (screenId === 'screen-checklist-start' && !state.selectedShift) {
    const forklift = state.forklifts.find(f => f.id === state.selectedForkliftId) || state.forklifts[2] || { id: 'EMP-05' };
    preparePreChecklist(forklift.id);
    return;
  }

  const currentActive = document.querySelector('.screen.active');
  if (currentActive) {
    currentActive.classList.remove('active');
  }

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    state.currentScreen = screenId;
    targetScreen.scrollTop = 0;
    saveState();
    
    // Rerenderizações dinâmicas sob demanda ao entrar na tela
    if (screenId === 'screen-ranking') {
      renderRanking();
    } else if (screenId === 'screen-admin') {
      renderAdminOperators();
      renderAdminForklifts();
      renderAdminShifts();
      renderAdminTickets();
    } else if (screenId === 'screen-reports') {
      renderChecklistHistory();
      renderReports();
    } else if (screenId === 'screen-checklist-start') {
      setTimeout(() => setupSignatureCanvas('start'), 100);
    } else if (screenId === 'screen-checklist-end') {
      setTimeout(() => setupSignatureCanvas('end'), 100);
    }
  }

  // Controle de visibilidade de AppBar e NavBar global
  const appBar = document.getElementById('global-appbar');
  const navBar = document.getElementById('global-navbar');

  if (screenId === 'screen-splash' || screenId === 'screen-login') {
    appBar.style.display = 'none';
    navBar.style.display = 'none';
  } else {
    appBar.style.display = 'flex';
    navBar.style.display = 'flex';
    
    // Atualiza título da tela na AppBar
    const titleEl = document.getElementById('appbar-title');
    if (titleEl && screenTitles[screenId]) {
      titleEl.innerText = screenTitles[screenId];
    }

    // Atualiza aba selecionada no menu inferior
    updateActiveNavItem(screenId);
  }

  // Recria os ícones Lucide da tela
  lucide.createIcons();
}

// INICIAR APLICAÇÃO A PARTIR DA SPLASH SCREEN (MANUALMENTE)
function startApp() {
  navigateTo('screen-login');
}

// ATUALIZA A SELEÇÃO DA NAVBAR
function updateActiveNavItem(screenId) {
  // Remove classe ativa de todos
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Mapeia telas específicas para os botões do menu inferior
  let navBtnId = '';
  if (screenId === 'screen-dashboard') navBtnId = 'nav-dashboard';
  else if (screenId === 'screen-checklist-start' || screenId === 'screen-checklist-end') navBtnId = 'nav-checklists';
  else if (screenId === 'screen-maintenance') navBtnId = 'nav-maintenance';
  else if (screenId === 'screen-ranking') navBtnId = 'nav-ranking';
  else if (screenId === 'screen-trainings') navBtnId = 'nav-trainings';

  if (navBtnId) {
    const activeBtn = document.getElementById(navBtnId);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

// CONTROLE DE SIMULAÇÃO DE LOGIN
function handleLogin(event) {
  event.preventDefault();
  
  const userVal = document.getElementById('login-user').value.trim();
  
  if (userVal) {
    if (!state.operators) {
      state.operators = JSON.parse(JSON.stringify(defaultState.operators));
    }
    
    let op = state.operators.find(o => o.reg.toUpperCase() === userVal.toUpperCase());
    if (!op) {
      // Cadastro automático de novo operador se não existir (para facilidade de testes)
      op = {
        reg: userVal.toUpperCase(),
        name: `Operador ${userVal}`,
        role: 'Operador Pleno',
        photo: '',
        productionHours: 0,
        avarias: 0,
        trainingsCompleted: 0,
        checklistsCount: 0
      };
      state.operators.push(op);
    }
    
    state.currentUser.reg = op.reg;
    state.currentUser.name = op.name;
    state.currentUser.role = op.role;
    
    saveState();
    syncStateToUI();

    navigateTo('screen-dashboard');
  }
}

// SIMULAR LOGIN BIOMÉTRICO
function simulateFingerprint() {
  alert("Autenticando biometria... Acesso permitido para José Prudêncio.");
  state.currentUser.reg = 'PRU-902';
  state.currentUser.name = 'José Prudêncio';
  saveState();
  syncStateToUI();
  navigateTo('screen-dashboard');
}

// SIMULAR SCAN DE QR CODE
function openScanner() {
  toggleModal('modal-scanner');
}

function simulateScanSuccess() {
  toggleModal('modal-scanner');
  const forklift = state.forklifts[2] || { id: 'EMP-05' };
  alert(`Código QR Lido: ${forklift.id} vinculada com sucesso!`);
  preparePreChecklist(forklift.id);
}

// LOGOUT
function handleLogout() {
  if (confirm("Deseja realmente sair do sistema operacional?")) {
    // Redefine checklists ao deslogar para iniciar de forma limpa no próximo login
    resetChecklistsOnly();
    navigateTo('screen-login');
  }
}

// LIMPA CHECKLISTS APENAS (Mantém relatórios e chamados abertos)
function resetChecklistsOnly() {
  state.checklistStart.forEach(item => item.status = null);
  state.checklistEnd.forEach(item => item.status = null);
  state.conformityScore = 94;
  state.blockedForklifts = 2;
  state.selectedShift = null;
  saveState();
  
  // Atualiza render
  renderChecklist('checklist-start-items', state.checklistStart, 'start');
  renderChecklist('checklist-end-items', state.checklistEnd, 'end');
  syncStateToUI();
  updateGauge(state.conformityScore);
}

// RENDERIZAÇÃO DINÂMICA DE CHECKLISTS
function renderChecklist(containerId, itemsList, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  itemsList.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `glass-card checklist-item-card`;
    
    // Aplica a classe de resposta correta baseada no estado salvo
    if (item.status === 'ok') card.classList.add('answered-ok');
    else if (item.status === 'warning') card.classList.add('answered-warning');
    else if (item.status === 'danger') card.classList.add('answered-danger');

    card.id = `${type}-item-card-${item.id}`;

    card.innerHTML = `
      <div class="checklist-item-info" onclick="toggleExpandItem('${type}', '${item.id}')">
        <div class="checklist-item-name">
          <i data-lucide="${item.icon}"></i>
          <span>${index + 1}. ${item.name}</span>
        </div>
        <i data-lucide="chevron-down" id="${type}-arrow-${item.id}"></i>
      </div>
      
      <div class="status-button-group" id="${type}-expand-${item.id}" style="display: none;">
        <button class="status-btn status-btn-ok ${item.status === 'ok' ? 'active' : ''}" id="${type}-btn-ok-${item.id}" onclick="setChecklistItemStatus('${type}', '${item.id}', 'ok')">
          <i data-lucide="check"></i> OK
        </button>
        <button class="status-btn status-btn-warning ${item.status === 'warning' ? 'active' : ''}" id="${type}-btn-warning-${item.id}" onclick="setChecklistItemStatus('${type}', '${item.id}', 'warning')">
          <i data-lucide="alert-triangle"></i> ALERTA
        </button>
        <button class="status-btn status-btn-danger ${item.status === 'danger' ? 'active' : ''}" id="${type}-btn-danger-${item.id}" onclick="setChecklistItemStatus('${type}', '${item.id}', 'danger')">
          <i data-lucide="x-circle"></i> CRÍTICO
        </button>
      </div>

      <!-- Anexo Dinâmico de Evidência Fotográfica (Provas/Contra-Provas) -->
      <div class="evidence-photo-container" id="${type}-photo-container-${item.id}" style="display: ${item.status === 'warning' || item.status === 'danger' ? 'block' : 'none'}; margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.08);">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <button class="btn-secondary" type="button" style="height: 38px; font-size: 13px; flex: 1; padding: 0 10px;" onclick="triggerPhotoUpload('${type}', '${item.id}')">
            <i data-lucide="camera" style="width: 16px; height: 16px; margin-right: 4px;"></i> Anexar Evidência Visual
          </button>
          <input type="file" id="${type}-file-input-${item.id}" accept="image/*" style="display: none;" onchange="handlePhotoUpload(event, '${type}', '${item.id}')">
        </div>
        <div id="${type}-photo-preview-${item.id}" style="margin-top: 8px; display: ${item.photo ? 'flex' : 'none'}; align-items: center; gap: 10px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <img id="${type}-preview-img-${item.id}" src="${item.photo || ''}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover; border: 1.5px solid var(--color-primary);">
          <div style="flex: 1; font-size: 11px; color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Imagem de evidência anexada</div>
          <button type="button" class="btn-secondary" style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; border-color: var(--color-danger); color: var(--color-danger);" onclick="removePhoto('${type}', '${item.id}')">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

// EXPANDIR/COLLAPSE ITENS DO CHECKLIST
function toggleExpandItem(type, itemId) {
  const panel = document.getElementById(`${type}-expand-${itemId}`);
  const arrow = document.getElementById(`${type}-arrow-${itemId}`);
  
  if (panel.style.display === 'grid') {
    panel.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    panel.style.display = 'grid';
    arrow.style.transform = 'rotate(180deg)';
  }
}

// CLIQUE NOS BOTÕES DO CHECKLIST
function setChecklistItemStatus(type, itemId, status) {
  const list = type === 'start' ? state.checklistStart : state.checklistEnd;
  const item = list.find(i => i.id === itemId);
  
  if (!item) return;
  item.status = status;

  // Limpa classes anteriores dos botões
  const btnOk = document.getElementById(`${type}-btn-ok-${itemId}`);
  const btnWarning = document.getElementById(`${type}-btn-warning-${itemId}`);
  const btnDanger = document.getElementById(`${type}-btn-danger-${itemId}`);
  const card = document.getElementById(`${type}-item-card-${itemId}`);

  btnOk.classList.remove('active');
  btnWarning.classList.remove('active');
  btnDanger.classList.remove('active');
  card.classList.remove('answered-ok', 'answered-warning', 'answered-danger');

  if (status === 'ok') {
    btnOk.classList.add('active');
    card.classList.add('answered-ok');
  } else if (status === 'warning') {
    btnWarning.classList.add('active');
    card.classList.add('answered-warning');
  } else if (status === 'danger') {
    btnDanger.classList.add('active');
    card.classList.add('answered-danger');
    
    // SE FOR CRÍTICO: Dispara modal e bloqueio!
    triggerCriticalBlock(item.name);
  }

  // Gerenciamento dinâmico da caixa de foto
  const photoContainer = document.getElementById(`${type}-photo-container-${itemId}`);
  if (photoContainer) {
    if (status === 'warning' || status === 'danger') {
      photoContainer.style.display = 'block';
    } else {
      photoContainer.style.display = 'none';
      removePhoto(type, itemId);
    }
  }

  // Salva no LocalStorage
  saveState();

  // Fecha item suave após seleção
  setTimeout(() => {
    if (status !== 'danger') {
      const panel = document.getElementById(`${type}-expand-${itemId}`);
      const arrow = document.getElementById(`${type}-arrow-${itemId}`);
      if (panel) panel.style.display = 'none';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  }, 400);
}

// DISPARA BLOQUEIO OPERACIONAL POR ITEM CRÍTICO
function triggerCriticalBlock(itemName) {
  document.getElementById('failed-item-name').innerText = itemName;
  
  // Atualiza contagem de bloqueadas no painel
  state.blockedForklifts = 3;
  
  // Reduz pontuação de conformidade
  state.conformityScore = 86;

  // Adiciona log de auditoria do admin no início do array
  const newLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: state.currentUser.name,
    desc: `Bloqueio emergencial acionado no item crítico: ${itemName}. Equipamento EMP-05 interditado.`,
    type: 'danger'
  };
  state.auditLogs.unshift(newLog);

  // Abre Chamado Corretivo Automaticamente no estado
  const autoTicket = {
    id: 'ticket_' + Date.now(),
    forklift: 'EMP-05',
    desc: `Item Crítico Detectado: ${itemName}`,
    openedBy: state.currentUser.name,
    time: 'Agora mesmo',
    sla: 'Imediato (Urgente)',
    status: 'BLOQUEADO',
    type: 'critical'
  };
  state.tickets.unshift(autoTicket);

  saveState();
  syncStateToUI();
  updateGauge(state.conformityScore);
  
  // Rerenderiza logs e chamados
  renderTickets();
  renderAuditLogs();

  // Abre Modal
  toggleModal('modal-critical-block');
}

function closeCriticalBlock() {
  toggleModal('modal-critical-block');
}

// ENVIAR / FINALIZAR CHECKLIST
function submitChecklist(type) {
  const list = type === 'start' ? state.checklistStart : state.checklistEnd;
  const unanswered = list.filter(item => item.status === null);

  if (unanswered.length > 0) {
    alert(`Por favor, responda todos os itens. Restam ${unanswered.length} itens.`);
    
    // Abre o primeiro item pendente para ajudar o operador
    const firstPending = unanswered[0];
    const panel = document.getElementById(`${type}-expand-${firstPending.id}`);
    const arrow = document.getElementById(`${type}-arrow-${firstPending.id}`);
    if (panel) {
      panel.style.display = 'grid';
      arrow.style.transform = 'rotate(180deg)';
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  const criticalIssues = list.filter(item => item.status === 'danger');
  if (criticalIssues.length > 0) {
    alert("Checklist não pode ser finalizado! Equipamento bloqueado por defeito crítico de segurança.");
    return;
  }

  // Validação obrigatória da Assinatura Digital
  const hasSig = signatureStates[type] && signatureStates[type].hasSignature;
  if (!hasSig) {
    alert("Por favor, assine digitalmente no painel de assinatura antes de enviar.");
    return;
  }

  // Obter o Base64 da assinatura
  const canvas = document.getElementById(`signature-${type}-canvas`);
  const signatureBase64 = canvas ? canvas.toDataURL() : '';

  // Cria log de sucesso
  const newSuccessLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: state.currentUser.name,
    desc: type === 'start' 
      ? `Checklist Inicial de Turno concluído na empilhadeira ${state.selectedForkliftId || 'EMP-05'}.`
      : `Checklist de Encerramento (Final) enviado. Equipamento liberado em bom estado de conservação.`,
    type: 'info'
  };
  state.auditLogs.unshift(newSuccessLog);
  
  // Incrementa a contagem de checklists do operador ativo
  if (state.operators) {
    const activeOp = state.operators.find(op => op.reg === state.currentUser.reg);
    if (activeOp) {
      activeOp.checklistsCount = (activeOp.checklistsCount || 0) + 1;
    }
  }

  // Salvar no histórico de checklists persistido
  if (!state.checklistHistory) {
    state.checklistHistory = [];
  }
  
  const completedChecklist = {
    id: 'ch_' + Date.now(),
    type: type,
    operator: state.currentUser.name,
    operatorReg: state.currentUser.reg,
    forkliftId: state.selectedForkliftId || 'EMP-05',
    forkliftModel: document.getElementById('pre-machine-model').value || 'Hyster XT-30',
    horometer: parseInt(document.getElementById('pre-horometer').value) || 480,
    shift: state.selectedShift || '08:00 as 17:00',
    dateTime: new Date().toLocaleString('pt-BR'),
    items: JSON.parse(JSON.stringify(list)),
    signature: signatureBase64
  };
  
  state.checklistHistory.unshift(completedChecklist);
  renderChecklistHistory();

  // Alerta condicional explicativo premium
  if (type === 'start') {
    alert("Checklist Inicial enviado com sucesso!\n\n⚠️ ATENÇÃO: Lembre-se de realizar o CHECKLIST FINAL (de Encerramento) ao término da sua jornada para registrar se houve qualquer alteração ou avaria no estado da empilhadeira.");
  } else {
    alert("Checklist de Encerramento (Final) enviado com sucesso!\n\nDados de fim de jornada transmitidos e salvos na nuvem Prudêncio Safety.");
  }

  // Se concluímos a jornada, vamos resetar as respostas em storage para o próximo turno
  if (type === 'end') {
    resetChecklistsOnly();
    navigateTo('screen-login');
  } else {
    saveState();
    syncStateToUI();
    renderAuditLogs();
    navigateTo('screen-dashboard');
  }
}

// RENDERIZAR CHAMADOS DE MANUTENÇÃO DINAMICAMENTE
function renderTickets() {
  const container = document.getElementById('tickets-list');
  if (!container) return;

  container.innerHTML = '';

  state.tickets.forEach(ticket => {
    const card = document.createElement('div');
    card.className = `glass-card alert-item ${ticket.type === 'critical' ? 'critical' : ''}`;
    if (ticket.status === 'BLOQUEADO') {
      card.style.borderLeftColor = 'var(--color-danger)';
    }

    card.innerHTML = `
      <div class="alert-info">
        <div class="alert-item-title">${ticket.desc} (${ticket.forklift})</div>
        <div class="alert-item-desc">Aberto por: ${ticket.openedBy} • ${ticket.time}</div>
        <div style="font-size: 11px; color: ${ticket.type === 'critical' || ticket.status === 'BLOQUEADO' ? 'var(--color-danger)' : 'var(--color-primary)'}; margin-top: 4px; font-weight: 500;">
          SLA: ${ticket.sla}
        </div>
      </div>
      <span class="alert-badge" style="background-color: ${ticket.status === 'BLOQUEADO' || ticket.status === 'EM ANÁLISE' ? 'rgba(234, 84, 85, 0.1)' : 'rgba(255,193,7,0.1)'}; color: ${ticket.status === 'BLOQUEADO' || ticket.status === 'EM ANÁLISE' ? 'var(--color-danger)' : 'var(--color-primary)'};">
        ${ticket.status}
      </span>
    `;
    container.appendChild(card);
  });
}

// RENDERIZAR RELATÓRIOS DINAMICAMENTE
function renderReports() {
  const container = document.getElementById('reports-list');
  if (!container) return;

  container.innerHTML = '';

  state.reports.forEach(report => {
    const card = document.createElement('div');
    card.className = 'glass-card report-card';

    const isPdf = report.format === 'PDF';
    const iconColor = isPdf ? 'var(--color-primary)' : 'var(--color-success)';
    const bgColor = isPdf ? 'rgba(255, 193, 7, 0.1)' : 'rgba(46, 204, 113, 0.1)';

    card.innerHTML = `
      <div class="report-left">
        <div class="report-icon-box" style="color: ${iconColor}; background-color: ${bgColor};">
          <i data-lucide="${isPdf ? 'file-text' : 'file-spreadsheet'}"></i>
        </div>
        <div class="report-info">
          <span class="report-name">${report.name}</span>
          <span class="report-meta">Período: ${report.period} • ${report.format}</span>
        </div>
      </div>
      <button class="share-btn" onclick="shareReport('${report.name}')"><i data-lucide="share-2"></i></button>
    `;
    container.appendChild(card);
  });

  lucide.createIcons();
}

// RENDERIZAR LOGS DE AUDITORIA DINAMICAMENTE
function renderAuditLogs() {
  const container = document.getElementById('admin-audit-logs');
  if (!container) return;

  container.innerHTML = '';

  state.auditLogs.forEach(log => {
    const card = document.createElement('div');
    card.className = 'audit-log-item';
    if (log.type === 'danger') {
      card.style.borderLeftColor = 'var(--color-danger)';
    } else {
      card.style.borderLeftColor = 'var(--color-primary)';
    }

    card.innerHTML = `
      <div class="audit-log-meta">
        <span>${log.time}</span>
        <span>Operador: ${log.operator}</span>
      </div>
      <div class="audit-log-desc" style="color: ${log.type === 'danger' ? 'var(--color-danger)' : 'var(--color-text-main)'};">
        ${log.desc}
      </div>
    `;
    container.appendChild(card);
  });
}

// GESTÃO DE MODAIS GLOBAIS
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
  } else {
    modal.classList.add('active');
  }
}

// CONTROLE DE VELOCÍMETRO (GAUGE CIRCULAR)
function updateGauge(percent) {
  const gauge = document.getElementById('conformity-gauge');
  if (!gauge) return;

  // Circunferência total de half gauge = 282.7 (stroke-dasharray)
  const totalOffset = 282.7;
  const offset = totalOffset - (totalOffset * percent / 100);
  
  gauge.style.strokeDashoffset = offset;
}

// TABS DE MANUTENÇÃO
function switchMaintenanceTab(tabName, btn) {
  // Inativa botões
  btn.parentElement.querySelectorAll('.sub-tab-btn').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Oculta seções
  document.querySelectorAll('.maintenance-section').forEach(sec => {
    sec.classList.remove('active');
  });

  // Mostra seção selecionada
  const targetSec = document.getElementById(`maintenance-${tabName}`);
  if (targetSec) targetSec.classList.add('active');

  lucide.createIcons();
}

// FILTRAR HISTÓRICO DE MANUTENÇÃO
function filterHistory(query) {
  const lowercase = query.toLowerCase();
  const items = document.querySelectorAll('#history-list .glass-card');
  
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(lowercase)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// NOVO CHAMADO DE MANUTENÇÃO (CORRETIVA)
function handleNewTicket(event) {
  event.preventDefault();
  const forklift = document.getElementById('ticket-forklift').value;
  const desc = document.getElementById('ticket-desc').value.trim();

  if (!desc) return;

  // Adiciona no início do array no estado
  const newTicket = {
    id: 'ticket_' + Date.now(),
    forklift: forklift,
    desc: desc,
    openedBy: state.currentUser.name,
    time: 'Agora mesmo',
    sla: 'Em análise de risco',
    status: 'NOVO',
    type: 'warning'
  };

  state.tickets.unshift(newTicket);
  saveState();

  // Rerenderiza
  renderTickets();
  
  // Limpa formulário e fecha modal
  document.getElementById('ticket-desc').value = '';
  toggleModal('modal-new-ticket');
  
  alert("Chamado operacional de corretiva aberto com sucesso!");
  lucide.createIcons();
}

// CENTRAL DE RELATÓRIOS
function shareReport(name) {
  if (navigator.share) {
    navigator.share({
      title: `Prudêncio Checklist - Relatório ${name}`,
      text: 'Confira as métricas operacionais e o checklist do pátio logístico.',
      url: window.location.href
    }).catch(console.error);
  } else {
    alert(`Compartilhando Relatório ${name} via e-mail e Teams corporativo! Link copiado para área de transferência.`);
  }
}

// NOVO RELATÓRIO
function handleGenerateReport(event) {
  event.preventDefault();
  const name = document.getElementById('report-name-input').value.trim();
  const format = document.getElementById('report-format-input').value;

  if (!name) return;

  // Adiciona ao estado
  const newReport = {
    id: 'report_' + Date.now(),
    name: name,
    period: 'Hoje',
    format: format
  };

  state.reports.unshift(newReport);
  saveState();

  // Rerenderiza
  renderReports();

  // Limpa formulário e fecha modal
  document.getElementById('report-name-input').value = '';
  toggleModal('modal-new-report');
  
  alert("Novo relatório gerado com sucesso e salvo em storage!");
  lucide.createIcons();
}

// TREINAMENTOS - ACCORDION E SIMULADORES
function toggleAccordion(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const arrow = el.querySelector('.accordion-header i');

  if (el.classList.contains('active')) {
    el.classList.remove('active');
    arrow.style.transform = 'rotate(0deg)';
  } else {
    // Fecha outros accordions
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      const itemArrow = item.querySelector('.accordion-header i');
      if (itemArrow) itemArrow.style.transform = 'rotate(0deg)';
    });

    el.classList.add('active');
    arrow.style.transform = 'rotate(180deg)';
  }
}

function openPDF(name) {
  alert(`Abrindo documento técnico oficial em PDF: ${name}\nEste documento detalha o Procedimento Operacional Padrão da empilhadeira.`);
}

function playVideo(title) {
  alert(`Reproduzindo treinamento corporativo em vídeo: "${title}"\nAssista até o fim para pontuar na campanha de segurança.`);
}

// Seleciona o tipo de checklist (Inicial / Final) dinamicamente com feedback de cor verde/vermelha
function selectChecklistType(type) {
  const hiddenInput = document.getElementById('pre-checklist-type');
  if (!hiddenInput) return;
  hiddenInput.value = type;
  
  const optStart = document.getElementById('type-opt-start');
  const optEnd = document.getElementById('type-opt-end');
  
  if (type === 'start') {
    optStart.classList.add('active');
    optEnd.classList.remove('active');
  } else {
    optStart.classList.remove('active');
    optEnd.classList.add('active');
  }
}

// ------------------- TELA DE PRÉ-CHECKLIST E PREPARAÇÃO -------------------
function preparePreChecklist(machineId) {
  const forklift = state.forklifts.find(f => f.id === machineId) || { id: machineId, model: 'Hyster H50FT', horometer: 480 };
  state.selectedForkliftId = machineId;
  
  document.getElementById('pre-operator-name').value = state.currentUser.name;
  document.getElementById('pre-machine-id').value = machineId;
  document.getElementById('pre-machine-model').value = forklift.model;
  document.getElementById('pre-horometer').value = forklift.horometer;
  
  // Reseta a seleção visual para Inicial (Verde) por padrão
  selectChecklistType('start');
  
  // Renderiza turnos
  renderPreChecklistShifts();
  
  // Auto shift detection setup
  document.getElementById('pre-auto-shift').checked = state.autoShift;
  handleAutoShiftToggle(state.autoShift);
  
  navigateTo('screen-pre-checklist');
}

function renderPreChecklistShifts() {
  const select = document.getElementById('pre-shift');
  if (!select) return;
  select.innerHTML = state.shifts.map(s => `<option value="${s}">${s}</option>`).join('');
}

function handleAutoShiftToggle(checked) {
  state.autoShift = checked;
  saveState();
  
  const select = document.getElementById('pre-shift');
  if (!select) return;
  
  if (checked) {
    select.disabled = true;
    autoDetectAndSetShift(select);
  } else {
    select.disabled = false;
  }
}

function autoDetectAndSetShift(select) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMinute;
  
  let bestMatch = state.shifts[0] || '08:00 as 17:00';
  let bestDiff = Infinity;
  
  state.shifts.forEach(s => {
    try {
      const parts = s.split(' as ');
      if (parts.length === 2) {
        const startParts = parts[0].split(':');
        const endParts = parts[1].split(':');
        
        const startMin = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
        const endMin = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
        
        if (startMin > endMin) { // Turno da noite cruzando meia-noite
          if (currentTimeVal >= startMin || currentTimeVal <= endMin) {
            bestMatch = s;
            bestDiff = 0;
          }
        } else {
          if (currentTimeVal >= startMin && currentTimeVal <= endMin) {
            bestMatch = s;
            bestDiff = 0;
          }
        }
        
        if (bestDiff > 0) {
          let diff = Math.min(
            Math.abs(currentTimeVal - startMin),
            Math.abs(currentTimeVal + 1440 - startMin),
            Math.abs(currentTimeVal - 1440 - startMin)
          );
          if (diff < bestDiff) {
            bestDiff = diff;
            bestMatch = s;
          }
        }
      }
    } catch (err) {
      console.error("Erro ao analisar turno:", s, err);
    }
  });
  
  select.value = bestMatch;
}

function startChecklistFromPrep(event) {
  event.preventDefault();
  
  const opName = document.getElementById('pre-operator-name').value.trim();
  const model = document.getElementById('pre-machine-model').value.trim();
  const horometer = parseInt(document.getElementById('pre-horometer').value) || 0;
  const shift = document.getElementById('pre-shift').value;
  const type = document.getElementById('pre-checklist-type').value || 'start';
  
  if (!opName || !model || horometer < 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  
  // Atualiza nome do operador ativo
  state.currentUser.name = opName;
  
  // Atualiza na frota
  const fIndex = state.forklifts.findIndex(f => f.id === state.selectedForkliftId);
  if (fIndex !== -1) {
    state.forklifts[fIndex].model = model;
    state.forklifts[fIndex].horometer = horometer;
  }
  
  state.selectedShift = shift;
  saveState();
  
  // Atualiza headers nas telas do checklist
  updateChecklistHeaders(state.selectedForkliftId, model, opName, shift);
  
  // Inicia o checklist real dependendo do tipo selecionado
  if (type === 'start') {
    navigateTo('screen-checklist-start');
  } else {
    navigateTo('screen-checklist-end');
  }
}

function updateChecklistHeaders(id, model, opName, shift) {
  const titleText = `Empilhadeira ${model} (${id})`;
  const opText = `Operador: ${opName} • Turno: ${shift}`;
  
  const startHeader = document.querySelector('#screen-checklist-start .checklist-header-info');
  if (startHeader) {
    startHeader.innerHTML = `
      <h3 class="checklist-header-title">${titleText}</h3>
      <div class="checklist-header-subtitle">${opText}</div>
      <div class="checklist-header-subtitle">Status: <span style="color: var(--color-warning);">Início de Turno</span></div>
    `;
  }
  
  const endHeader = document.querySelector('#screen-checklist-end .checklist-header-info');
  if (endHeader) {
    endHeader.innerHTML = `
      <h3 class="checklist-header-title">${titleText}</h3>
      <div class="checklist-header-subtitle">${opText}</div>
      <div class="checklist-header-subtitle">Status: <span style="color: var(--color-danger);">Término de Turno</span></div>
    `;
  }
  
  syncStateToUI();
}

// ------------------- SEGURANÇA E PORTÃO DE SENHA DO ADMIN -------------------
let pendingAdminAction = null;

function runWithAdminAuth(actionCallback) {
  pendingAdminAction = actionCallback;
  document.getElementById('admin-auth-pass').value = '';
  document.getElementById('admin-auth-error').style.display = 'none';
  toggleModal('modal-admin-auth');
  
  // Foca no campo de senha após abrir modal
  setTimeout(() => {
    document.getElementById('admin-auth-pass').focus();
  }, 300);
}

function submitAdminAuth(event) {
  event.preventDefault();
  const pass = document.getElementById('admin-auth-pass').value;
  
  if (pass === 'adm415263') {
    toggleModal('modal-admin-auth');
    if (pendingAdminAction) {
      pendingAdminAction();
      pendingAdminAction = null;
    }
  } else {
    document.getElementById('admin-auth-error').style.display = 'block';
    const formCard = document.querySelector('#modal-admin-auth .block-modal-content');
    formCard.classList.add('shake');
    setTimeout(() => {
      formCard.classList.remove('shake');
    }, 450);
  }
}

function cancelAdminAuth() {
  toggleModal('modal-admin-auth');
  pendingAdminAction = null;
}

// ------------------- GESTÃO DE FROTA E MÁQUINAS (ADMIN) -------------------
function renderAdminForklifts() {
  const container = document.getElementById('admin-forklifts-list');
  if (!container) return;
  container.innerHTML = '';
  
  state.forklifts.forEach(f => {
    const item = document.createElement('div');
    item.className = 'user-management-item';
    
    const isMaintenance = f.status === 'Manutenção';
    const badgeColor = isMaintenance ? 'var(--color-danger)' : 'var(--color-success)';
    
    item.innerHTML = `
      <div class="user-mgmt-left">
        <img src="assets/forklift.png" alt="Empilhadeira" class="forklift-thumb" style="width: 40px; height: 40px; border-radius: 8px; margin-bottom: 0;">
        <div class="user-mgmt-info">
          <span class="user-mgmt-name" style="font-size: 14px; font-weight: bold; color: var(--color-primary);">${f.id}</span>
          <span class="user-mgmt-role" style="font-size: 11px;">${f.model} • ${f.horometer}h</span>
        </div>
      </div>
      <div class="fleet-action-btns">
        <span style="color: ${badgeColor}; font-size: 10px; font-weight: bold; margin-right: 4px;">${f.status.toUpperCase()}</span>
        <button class="fleet-action-btn" onclick="downloadForkliftQRCode('${f.id}')" title="Gerar QR Code (JPG)">
          <i data-lucide="qr-code"></i>
        </button>
        <button class="fleet-action-btn delete" onclick="requestDeleteForklift('${f.id}')" title="Excluir da Frota">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
  
  lucide.createIcons();
}

function requestDeleteForklift(id) {
  runWithAdminAuth(() => {
    if (confirm(`Deseja realmente remover a empilhadeira ${id} da frota?`)) {
      state.forklifts = state.forklifts.filter(f => f.id !== id);
      
      const newLog = {
        id: 'log_' + Date.now(),
        time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        operator: 'Administrador',
        desc: `Equipamento ${id} foi desativado e removido da frota logístico.`,
        type: 'danger'
      };
      state.auditLogs.unshift(newLog);
      
      saveState();
      syncStateToUI();
      renderAdminForklifts();
      renderAuditLogs();
      alert(`Empilhadeira ${id} removida com sucesso!`);
    }
  });
}

function requestAddForklift() {
  runWithAdminAuth(() => {
    document.getElementById('add-forklift-id').value = '';
    document.getElementById('add-forklift-model').value = '';
    document.getElementById('add-forklift-horometer').value = '';
    toggleModal('modal-add-forklift');
  });
}

function submitAddForklift(event) {
  event.preventDefault();
  const id = document.getElementById('add-forklift-id').value.trim().toUpperCase();
  const model = document.getElementById('add-forklift-model').value.trim();
  const horometer = parseInt(document.getElementById('add-forklift-horometer').value) || 0;
  const status = document.getElementById('add-forklift-status').value;
  
  if (!id || !model || horometer < 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  
  if (state.forklifts.some(f => f.id === id)) {
    alert(`Já existe um equipamento cadastrado com o código ${id}!`);
    return;
  }
  
  const newForklift = { id, model, status, horometer };
  state.forklifts.push(newForklift);
  
  const newLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: 'Administrador',
    desc: `Novo equipamento cadastrado: ${id} (${model}) com horímetro inicial ${horometer}h.`,
    type: 'info'
  };
  state.auditLogs.unshift(newLog);
  
  saveState();
  syncStateToUI();
  renderAdminForklifts();
  renderAuditLogs();
  
  toggleModal('modal-add-forklift');
  alert(`Empilhadeira ${id} adicionada à frota com sucesso!`);
}

// ------------------- GERAÇÃO AUTOMÁTICA DE QR CODE (JPG EM CANVAS) -------------------
function downloadForkliftQRCode(id) {
  const forklift = state.forklifts.find(f => f.id === id) || { id, model: 'Empilhadeira Industrial' };
  
  // Criar elemento canvas off-screen
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 520;
  const ctx = canvas.getContext('2d');
  
  // 1. Fundo Preto Carbono
  ctx.fillStyle = '#0D0D0D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 2. Borda Dupla Amarela de Segurança (Industrial)
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#FFC107';
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#FFC107';
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  
  // 3. Cabeçalho "PRUDÊNCIO SAFETY"
  ctx.fillStyle = '#FFC107';
  ctx.font = 'bold 28px "Bebas Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PRUDÊNCIO SAFETY', canvas.width / 2, 58);
  
  // Subtítulo
  ctx.fillStyle = '#F2F2F2';
  ctx.font = '10px "Inter", Arial, sans-serif';
  ctx.fillText('CHECKLIST DE SEGURANÇA MANDATÓRIO', canvas.width / 2, 78);
  
  // 4. Desenha o QR Code via biblioteca QRious
  const tempQrCanvas = document.createElement('canvas');
  new QRious({
    element: tempQrCanvas,
    value: id,
    size: 240,
    background: '#0D0D0D',
    foreground: '#FFC107',
    level: 'H'
  });
  
  // Desenha no canvas off-screen principal
  ctx.drawImage(tempQrCanvas, canvas.width / 2 - 120, 115, 240, 240);
  
  // 5. Linha divisória
  ctx.beginPath();
  ctx.moveTo(35, 385);
  ctx.lineTo(canvas.width - 35, 385);
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // 6. Dados da Empilhadeira no sticker
  ctx.fillStyle = '#FFC107';
  ctx.font = 'bold 36px "Bebas Neue", Arial, sans-serif';
  ctx.fillText(id, canvas.width / 2, 428);
  
  ctx.fillStyle = 'rgba(242, 242, 242, 0.7)';
  ctx.font = '13px "Inter", Arial, sans-serif';
  ctx.fillText(`Modelo: ${forklift.model}`, canvas.width / 2, 452);
  
  ctx.fillStyle = 'rgba(242, 242, 242, 0.4)';
  ctx.font = '9px "Inter", Arial, sans-serif';
  ctx.fillText('Aponte a câmera do celular para liberar a operação', canvas.width / 2, 488);
  
  // 7. Salvar e Baixar JPG
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const link = document.createElement('a');
  link.download = `QR_CODE_${id}.jpg`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ------------------- GESTÃO DE TURNOS (ADMIN) -------------------
function renderAdminShifts() {
  const container = document.getElementById('admin-shifts-list');
  if (!container) return;
  container.innerHTML = '';
  
  state.shifts.forEach(s => {
    const item = document.createElement('div');
    item.className = 'user-management-item';
    item.innerHTML = `
      <div class="user-mgmt-left">
        <div class="report-icon-box" style="width: 32px; height: 32px; font-size: 12px; background-color: rgba(255,193,7,0.05); border-radius: 8px; color: var(--color-primary);">
          <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
        </div>
        <div class="user-mgmt-info">
          <span class="user-mgmt-name" style="font-size: 13px;">${s}</span>
        </div>
      </div>
      <button class="fleet-action-btn delete" onclick="handleDeleteShift('${s}')" title="Excluir Turno">
        <i data-lucide="trash-2"></i>
      </button>
    `;
    container.appendChild(item);
  });
  
  lucide.createIcons();
}

function handleAddShift() {
  const input = document.getElementById('new-shift-input');
  const val = input.value.trim();
  if (!val) return;
  
  const regex = /^\d{2}:\d{2}\s+as\s+\d{2}:\d{2}$/;
  if (!regex.test(val)) {
    alert("Por favor, insira o turno no formato de exemplo:\n08:00 as 17:00");
    return;
  }
  
  if (state.shifts.includes(val)) {
    alert("Este turno já está cadastrado!");
    return;
  }
  
  state.shifts.push(val);
  saveState();
  renderAdminShifts();
  renderPreChecklistShifts();
  
  input.value = '';
  alert(`Turno "${val}" cadastrado com sucesso!`);
}

function handleDeleteShift(shift) {
  if (confirm(`Deseja realmente remover o turno "${shift}"?`)) {
    state.shifts = state.shifts.filter(s => s !== shift);
    saveState();
    renderAdminShifts();
    renderPreChecklistShifts();
  }
}

// ------------------- GESTÃO E RANKING DE OPERADORES (DYNAMIC) -------------------
function renderRanking() {
  const podiumContainer = document.getElementById('ranking-podium');
  const listContainer = document.getElementById('ranking-table-list');
  if (!podiumContainer || !listContainer) return;

  if (!state.operators) {
    state.operators = JSON.parse(JSON.stringify(defaultState.operators));
  }

  // Ordena operadores decrescente por score calculado
  const sorted = [...state.operators].sort((a, b) => calculateOperatorScore(b) - calculateOperatorScore(a));

  // 1. Pódio Dinâmico: Top 3
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  podiumContainer.innerHTML = '';

  // Renderiza segundo lugar
  if (second) {
    const avatarUrl = getOperatorAvatarUrl(second);
    const score = calculateOperatorScore(second);
    podiumContainer.innerHTML += `
      <div class="podium-column second">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${second.name}" class="podium-avatar">
          <span class="podium-badge">2</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${second.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

  // Renderiza primeiro lugar
  if (first) {
    const avatarUrl = getOperatorAvatarUrl(first);
    const score = calculateOperatorScore(first);
    podiumContainer.innerHTML += `
      <div class="podium-column first">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${first.name}" class="podium-avatar">
          <span class="podium-badge">1</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${first.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

  // Renderiza terceiro lugar
  if (third) {
    const avatarUrl = getOperatorAvatarUrl(third);
    const score = calculateOperatorScore(third);
    podiumContainer.innerHTML += `
      <div class="podium-column third">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${third.name}" class="podium-avatar">
          <span class="podium-badge">3</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${third.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

  // 2. Tabela de classificação para TODOS os operadores
  listContainer.innerHTML = '';
  const maxScore = sorted.length > 0 ? calculateOperatorScore(sorted[0]) : 1;

  sorted.forEach((op, index) => {
    const score = calculateOperatorScore(op);
    const avatarUrl = getOperatorAvatarUrl(op);
    const pct = Math.max(0, Math.min(100, Math.round((score / (maxScore || 1)) * 100)));

    const item = document.createElement('div');
    item.className = 'glass-card ranking-item';
    item.innerHTML = `
      <div class="ranking-left">
        <span class="ranking-position">${index + 1}º</span>
        <img src="${avatarUrl}" alt="${op.name}" class="ranking-item-avatar">
        <div class="ranking-item-info">
          <span class="ranking-item-name">${op.name}</span>
          <div class="ranking-progress-bg">
            <div class="ranking-progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      </div>
      <div class="ranking-right">
        <span class="ranking-score">${score} pts</span>
      </div>
    `;
    listContainer.appendChild(item);
  });

  lucide.createIcons();
}

function renderAdminOperators() {
  const container = document.getElementById('admin-operators-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.operators) {
    state.operators = JSON.parse(JSON.stringify(defaultState.operators));
  }

  state.operators.forEach(op => {
    const avatarUrl = getOperatorAvatarUrl(op);
    const score = calculateOperatorScore(op);
    const item = document.createElement('div');
    item.className = 'user-management-item';
    item.innerHTML = `
      <div class="user-mgmt-left">
        <img src="${avatarUrl}" alt="${op.name}" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--color-primary); cursor: default; margin-bottom: 0;">
        <div class="user-mgmt-info">
          <span class="user-mgmt-name" style="font-size: 14px; font-weight: bold; color: var(--color-text-main);">${op.name}</span>
          <span class="user-mgmt-role" style="font-size: 11px;">${op.role} • ${op.reg} • <strong>${score} pts</strong></span>
        </div>
      </div>
      <div class="fleet-action-btns">
        <button class="fleet-action-btn" onclick="requestLogMetric('${op.reg}')" title="Lançar Métricas">
          <i data-lucide="plus-circle"></i>
        </button>
        <button class="fleet-action-btn delete" onclick="deleteOperator('${op.reg}')" title="Excluir Operador">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });

  lucide.createIcons();
}

function requestAddOperator() {
  runWithAdminAuth(() => {
    document.getElementById('add-operator-name').value = '';
    document.getElementById('add-operator-reg').value = '';
    document.getElementById('add-operator-role').value = 'Operador Pleno';
    document.getElementById('add-operator-photo-base64').value = '';
    document.getElementById('add-operator-photo-preview').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231E1E1E' stroke='%23FFC107' stroke-width='2'/><text x='50' y='55' text-anchor='middle' fill='%23FFC107' font-size='10' font-family='sans-serif'>CLIQUE AQUI</text></svg>";
    document.getElementById('add-operator-hours').value = '0';
    toggleModal('modal-add-operator');
  });
}

function submitAddOperator(event) {
  event.preventDefault();
  const name = document.getElementById('add-operator-name').value.trim();
  const reg = document.getElementById('add-operator-reg').value.trim().toUpperCase();
  const role = document.getElementById('add-operator-role').value;
  const photo = document.getElementById('add-operator-photo-base64').value;
  const hours = parseInt(document.getElementById('add-operator-hours').value) || 0;

  if (!name || !reg) {
    alert("Por favor, preencha o Nome e a Matrícula.");
    return;
  }

  if (state.operators.some(op => op.reg === reg)) {
    alert(`Já existe um operador cadastrado com a matrícula ${reg}!`);
    return;
  }

  const newOp = {
    reg,
    name,
    role,
    photo,
    productionHours: hours,
    avarias: 0,
    trainingsCompleted: 0,
    checklistsCount: 0
  };

  state.operators.push(newOp);

  const newLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: 'Administrador',
    desc: `Novo operador cadastrado: ${name} (${reg}) com ${hours}h de produção inicial.`,
    type: 'info'
  };
  state.auditLogs.unshift(newLog);

  saveState();
  syncStateToUI();
  renderAdminOperators();
  renderRanking();
  renderAuditLogs();

  toggleModal('modal-add-operator');
  alert(`Operador ${name} cadastrado com sucesso!`);
}

function deleteOperator(regCode) {
  if (regCode === 'PRU-902') {
    alert("Atenção: O operador José Prudêncio é o mascote/garoto propaganda principal da marca e não pode ser excluído do sistema!");
    return;
  }

  runWithAdminAuth(() => {
    const opToDelete = state.operators.find(op => op.reg === regCode);
    if (!opToDelete) return;

    if (confirm(`Deseja realmente remover o operador ${opToDelete.name} (${regCode}) do sistema?`)) {
      state.operators = state.operators.filter(op => op.reg !== regCode);

      const newLog = {
        id: 'log_' + Date.now(),
        time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        operator: 'Administrador',
        desc: `Operador ${opToDelete.name} (${regCode}) foi desativado e removido do banco de dados.`,
        type: 'danger'
      };
      state.auditLogs.unshift(newLog);

      if (state.currentUser.reg === regCode) {
        state.currentUser.reg = 'PRU-902';
        state.currentUser.name = 'José Prudêncio';
        state.currentUser.role = 'Operador Sênior';
      }

      saveState();
      syncStateToUI();
      renderAdminOperators();
      renderRanking();
      renderAuditLogs();

      alert(`Operador ${opToDelete.name} removido com sucesso!`);
    }
  });
}

function requestLogMetric(regCode) {
  const op = state.operators.find(o => o.reg === regCode);
  if (!op) return;

  document.getElementById('log-metric-operator-reg').value = regCode;
  document.getElementById('log-metric-subtitle').innerText = `Operador: ${op.name} (${regCode})`;
  document.getElementById('log-metric-type').value = 'horas';
  document.getElementById('log-metric-value').value = '1';
  updateMetricLabel('horas');

  toggleModal('modal-log-metric');
}

function updateMetricLabel(type) {
  const label = document.getElementById('log-metric-value-label');
  const valueInput = document.getElementById('log-metric-value');
  
  if (!label || !valueInput) return;

  if (type === 'horas') {
    label.innerText = 'Quantidade de Horas de Produção';
    valueInput.min = '1';
    valueInput.placeholder = 'Ex: 8';
  } else if (type === 'avarias') {
    label.innerText = 'Quantidade de Avarias Registradas';
    valueInput.min = '1';
    valueInput.placeholder = 'Ex: 1';
  } else if (type === 'trainings') {
    label.innerText = 'Quantidade de Treinamentos Concluídos';
    valueInput.min = '1';
    valueInput.placeholder = 'Ex: 1';
  }
}

function submitLogMetric(event) {
  event.preventDefault();
  
  const regCode = document.getElementById('log-metric-operator-reg').value;
  const type = document.getElementById('log-metric-type').value;
  const value = parseInt(document.getElementById('log-metric-value').value) || 0;

  if (value <= 0) {
    alert("Por favor, insira um valor válido maior do que zero.");
    return;
  }

  const op = state.operators.find(o => o.reg === regCode);
  if (!op) {
    alert("Operador não encontrado!");
    return;
  }

  let desc = '';
  if (type === 'horas') {
    op.productionHours = (op.productionHours || 0) + value;
    desc = `Lançamento de ${value}h de produção para o operador ${op.name} (${regCode}).`;
  } else if (type === 'avarias') {
    op.avarias = (op.avarias || 0) + value;
    desc = `Registro de ${value} avaria(s) externa(s) para o operador ${op.name} (${regCode}).`;
  } else if (type === 'trainings') {
    op.trainingsCompleted = (op.trainingsCompleted || 0) + value;
    desc = `Lançamento de ${value} treinamento(s) concluído(s) para o operador ${op.name} (${regCode}).`;
  }

  const newLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: 'Administrador',
    desc: desc,
    type: type === 'avarias' ? 'danger' : 'info'
  };
  state.auditLogs.unshift(newLog);

  saveState();
  syncStateToUI();
  renderAdminOperators();
  renderRanking();
  renderAuditLogs();

  toggleModal('modal-log-metric');
  alert("Métrica registrada com sucesso!");
}

// =================== NOVOS CONTROLLERS INTEGRADOS ===================

// 1. Assinatura Digital Canvas Controllers
const signatureStates = {
  start: { drawing: false, context: null, canvas: null, hasSignature: false },
  end: { drawing: false, context: null, canvas: null, hasSignature: false }
};

function setupSignatureCanvas(type) {
  const canvas = document.getElementById(`signature-${type}-canvas`);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Estilização do pincel de escrita branca
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Resolução dinâmica ajustada ao cliente
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 300;
  canvas.height = rect.height || 120;
  
  // Preenche fundo com preto profundo
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  signatureStates[type].canvas = canvas;
  signatureStates[type].context = ctx;
  signatureStates[type].hasSignature = false;
  
  // Evitar múltiplos escutadores duplicados
  if (canvas.dataset.listenersAttached === 'true') return;
  canvas.dataset.listenersAttached = 'true';
  
  const getPos = (e) => {
    const r = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - r.left,
        y: e.touches[0].clientY - r.top
      };
    }
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  };
  
  const startDrawing = (e) => {
    e.preventDefault();
    const pos = getPos(e);
    signatureStates[type].drawing = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };
  
  const draw = (e) => {
    if (!signatureStates[type].drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    signatureStates[type].hasSignature = true;
  };
  
  const stopDrawing = (e) => {
    if (!signatureStates[type].drawing) return;
    e.preventDefault();
    signatureStates[type].drawing = false;
  };
  
  // Listeners de mouse (Desktop)
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
  
  // Listeners de toque (Mobile/Tablet)
  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDrawing, { passive: false });
}

function clearSignature(type) {
  const state = signatureStates[type];
  if (!state || !state.canvas || !state.context) return;
  
  const ctx = state.context;
  const canvas = state.canvas;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  state.hasSignature = false;
}

// 2. Anexo Dinâmico de Evidências (Provas/Contra-Provas)
function triggerPhotoUpload(type, itemId) {
  const input = document.getElementById(`${type}-file-input-${itemId}`);
  if (input) input.click();
}

function handlePhotoUpload(event, type, itemId) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    
    const list = type === 'start' ? state.checklistStart : state.checklistEnd;
    const item = list.find(i => i.id === itemId);
    if (item) {
      item.photo = base64Data;
      saveState();
      
      const previewDiv = document.getElementById(`${type}-photo-preview-${itemId}`);
      const previewImg = document.getElementById(`${type}-preview-img-${itemId}`);
      if (previewDiv && previewImg) {
        previewDiv.style.display = 'flex';
        previewImg.src = base64Data;
      }
    }
  };
  reader.readAsDataURL(file);
}

function removePhoto(type, itemId) {
  const list = type === 'start' ? state.checklistStart : state.checklistEnd;
  const item = list.find(i => i.id === itemId);
  if (item) {
    delete item.photo;
    saveState();
    
    const previewDiv = document.getElementById(`${type}-photo-preview-${itemId}`);
    if (previewDiv) {
      previewDiv.style.display = 'none';
    }
    
    const input = document.getElementById(`${type}-file-input-${itemId}`);
    if (input) input.value = '';
  }
}

// 3. Captura & Compressão da Foto do Operador (Canvas Off-screen 150x150)
function triggerOperatorPhotoInput() {
  const input = document.getElementById('add-operator-photo-input');
  if (input) input.click();
}

function handleOperatorPhotoSelection(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = 150;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');
      
      // Recorte quadrado perfeito e centralizado (evita distorções visuais)
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 150, 150);
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
      
      const hiddenInput = document.getElementById('add-operator-photo-base64');
      const previewImg = document.getElementById('add-operator-photo-preview');
      
      if (hiddenInput) hiddenInput.value = compressedBase64;
      if (previewImg) previewImg.src = compressedBase64;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 4. Manutenção Corretiva Avançada (Gestão exclusiva de OS)
function renderAdminTickets() {
  const container = document.getElementById('admin-tickets-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (!state.tickets || state.tickets.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-muted); padding: 16px; font-size: 12px;">
        Nenhuma ordem de serviço corretiva ativa registrada.
      </div>
    `;
    return;
  }
  
  state.tickets.forEach(ticket => {
    const item = document.createElement('div');
    item.className = 'user-management-item';
    item.style.cursor = 'pointer';
    item.onclick = () => openAdminEditTicketModal(ticket.id);
    
    const isCritical = ticket.type === 'critical' || ticket.status === 'BLOQUEADO';
    const statusColor = isCritical ? 'var(--color-danger)' : 'var(--color-primary)';
    
    item.innerHTML = `
      <div class="user-mgmt-left">
        <div class="report-icon-box" style="width: 32px; height: 32px; font-size: 12px; background-color: rgba(255,193,7,0.05); border-radius: 8px; color: ${statusColor};">
          <i data-lucide="wrench" style="width: 14px; height: 14px;"></i>
        </div>
        <div class="user-mgmt-info" style="max-width: 180px;">
          <span class="user-mgmt-name" style="font-size: 13px; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${ticket.desc}</span>
          <span class="user-mgmt-role" style="font-size: 10px;">${ticket.forklift} • SLA: ${ticket.sla}</span>
        </div>
      </div>
      <div class="fleet-action-btns">
        <span style="color: ${statusColor}; font-size: 9px; font-weight: bold; margin-right: 4px;">${ticket.status}</span>
        <button class="fleet-action-btn" title="Gerenciar Chamado">
          <i data-lucide="edit-3"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
  
  lucide.createIcons();
}

function openAdminEditTicketModal(id) {
  const ticket = state.tickets.find(t => t.id === id);
  if (!ticket) return;
  
  document.getElementById('admin-edit-ticket-id').value = ticket.id;
  document.getElementById('admin-edit-ticket-subtitle').innerText = `Equipamento: ${ticket.forklift} • Aberto por: ${ticket.openedBy}`;
  document.getElementById('admin-edit-ticket-desc').value = ticket.desc;
  document.getElementById('admin-edit-ticket-tech').value = ticket.tech || '';
  document.getElementById('admin-edit-ticket-sla').value = ticket.sla || '';
  document.getElementById('admin-edit-ticket-status').value = ticket.status;
  
  toggleModal('modal-edit-ticket-admin');
}

function submitAdminEditTicket(event) {
  event.preventDefault();
  
  const id = document.getElementById('admin-edit-ticket-id').value;
  const desc = document.getElementById('admin-edit-ticket-desc').value.trim();
  const tech = document.getElementById('admin-edit-ticket-tech').value.trim();
  const sla = document.getElementById('admin-edit-ticket-sla').value.trim();
  const status = document.getElementById('admin-edit-ticket-status').value;
  
  if (!desc || !tech || !sla) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }
  
  const ticket = state.tickets.find(t => t.id === id);
  if (!ticket) return;
  
  ticket.desc = desc;
  ticket.tech = tech;
  ticket.sla = sla;
  ticket.status = status;
  
  // Se concluído, altera status da empilhadeira para Ativa
  if (status === 'CONCLUÍDO') {
    const fIndex = state.forklifts.findIndex(f => f.id === ticket.forklift);
    if (fIndex !== -1) {
      state.forklifts[fIndex].status = 'Ativa';
    }
    
    state.blockedForklifts = Math.max(0, state.blockedForklifts - 1);
    state.conformityScore = Math.min(100, state.conformityScore + 4);
    
    const newLog = {
      id: 'log_' + Date.now(),
      time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      operator: 'Administrador',
      desc: `Ordem de Serviço Corretiva Concluída. Equipamento ${ticket.forklift} liberado operacionalmente.`,
      type: 'info'
    };
    state.auditLogs.unshift(newLog);
  }
  
  saveState();
  syncStateToUI();
  renderTickets();
  renderAdminTickets();
  renderAuditLogs();
  
  toggleModal('modal-edit-ticket-admin');
  alert("Chamado operacional atualizado com sucesso!");
}

// 5. Relatórios & Histórico de Checklists (Visualizador Dinâmico)
function renderChecklistHistory() {
  const container = document.getElementById('checklist-history-list');
  if (!container) return;
  
  if (!state.checklistHistory) {
    state.checklistHistory = [];
  }
  
  container.innerHTML = '';
  
  if (state.checklistHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--color-text-muted); padding: 24px; font-size: 14px;">
        Nenhum checklist registrado no histórico local.
      </div>
    `;
    return;
  }
  
  state.checklistHistory.forEach(h => {
    const card = document.createElement('div');
    card.className = 'glass-card option-item';
    card.style.cursor = 'pointer';
    card.onclick = () => openChecklistDetail(h.id);
    
    const isStart = h.type === 'start';
    const statusColor = isStart ? 'var(--color-success)' : 'var(--color-danger)';
    const statusLabel = isStart ? 'INICIAL' : 'FINAL';
    
    card.innerHTML = `
      <div class="option-left">
        <div class="option-icon-box" style="color: ${statusColor}; background: rgba(255,255,255,0.03); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <i data-lucide="${isStart ? 'clipboard-check' : 'log-out'}"></i>
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="font-weight: 600; font-size: 14px; color: var(--color-text-main);">${h.forkliftId} - Checklist ${statusLabel}</span>
          <span style="font-size: 11px; color: var(--color-text-muted);">${h.dateTime} • ${h.operator}</span>
        </div>
      </div>
      <i data-lucide="chevron-right" style="color: var(--color-text-muted);"></i>
    `;
    container.appendChild(card);
  });
  
  lucide.createIcons();
}

function openChecklistDetail(id) {
  const h = state.checklistHistory.find(item => item.id === id);
  if (!h) return;
  
  // Metadados Gerais
  const metaContainer = document.getElementById('detail-checklist-meta');
  metaContainer.innerHTML = `
    <div><strong>Operador:</strong><br>${h.operator}</div>
    <div><strong>Matrícula:</strong><br>${h.operatorReg}</div>
    <div><strong>Equipamento:</strong><br>${h.forkliftId}</div>
    <div><strong>Modelo:</strong><br>${h.forkliftModel}</div>
    <div><strong>Horímetro:</strong><br>${h.horometer}h</div>
    <div><strong>Turno:</strong><br>${h.shift}</div>
    <div><strong>Tipo:</strong><br><span style="color: ${h.type === 'start' ? 'var(--color-success)' : 'var(--color-danger)'}; font-weight: bold;">Checklist ${h.type === 'start' ? 'Inicial' : 'Final'}</span></div>
    <div><strong>Data/Hora:</strong><br>${h.dateTime}</div>
  `;
  
  // Itens Inspecionados
  const itemsContainer = document.getElementById('detail-checklist-items');
  itemsContainer.innerHTML = '';
  h.items.forEach(item => {
    let statusText = 'OK';
    let statusColor = 'var(--color-success)';
    if (item.status === 'warning') {
      statusText = 'ALERTA';
      statusColor = 'var(--color-primary)';
    } else if (item.status === 'danger') {
      statusText = 'CRÍTICO';
      statusColor = 'var(--color-danger)';
    }
    
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justify = 'space-between';
    div.style.alignItems = 'center';
    div.style.padding = '8px 0';
    div.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
    div.innerHTML = `
      <span style="font-weight: 500;">${item.name}</span>
      <span style="color: ${statusColor}; font-weight: bold; font-size: 11px;">${statusText}</span>
    `;
    itemsContainer.appendChild(div);
  });
  
  // Registro Fotográfico
  const photosContainer = document.getElementById('detail-checklist-photos');
  const photosTitle = document.getElementById('detail-checklist-photos-title');
  photosContainer.innerHTML = '';
  
  const photos = h.items.filter(item => item.photo);
  if (photos.length > 0) {
    photosTitle.style.display = 'flex';
    photosContainer.style.display = 'flex';
    photos.forEach(p => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '4px';
      wrapper.style.alignItems = 'center';
      wrapper.innerHTML = `
        <img src="${p.photo}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 1.5px solid var(--color-primary);">
        <span style="font-size: 9px; color: var(--color-text-muted); width: 80px; overflow: hidden; text-overflow: ellipsis; text-align: center; white-space: nowrap;">${p.name}</span>
      `;
      photosContainer.appendChild(wrapper);
    });
  } else {
    photosTitle.style.display = 'none';
    photosContainer.style.display = 'none';
  }
  
  // Assinatura Digital
  const signatureImg = document.getElementById('detail-checklist-signature');
  signatureImg.src = h.signature || '';
  
  // Abre o visualizador
  toggleModal('modal-checklist-detail');
}

// 6. Exportação Premium A4 PDF
function printChecklistDetail() {
  window.print();
}
