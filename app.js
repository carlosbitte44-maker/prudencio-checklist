// app.js - COMPLETO COM PERSONALIZAÇÃO E QR CODE REAL

// CONFIGURAÇÕES GLOBAIS DE ESTADO E PERSISTÊNCIA
const STATE_KEY = 'prudencio_checklist_state_v2';

// Configurações de personalização da empresa
const defaultCompanySettings = {
  companyName: 'PRUDÊNCIO',
  primaryColor: '#FFC107',  // Amarelo padrão
  secondaryColor: '#1a1a1a'
};

// Dados padrões de inicialização
const defaultState = {
  currentUser: {
    reg: 'BRF-001',
    name: 'Operador',
    role: 'Operador Pleno'
  },
  companySettings: { ...defaultCompanySettings },
  operators: [
    { reg: 'BRF-001', name: 'Operador', role: 'Operador Pleno', photo: 'assets/mascote.jpg', productionHours: 120, avarias: 0, trainingsCompleted: 3, checklistsCount: 5 },
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
      operator: 'Operador',
      operatorReg: 'BRF-001',
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
      state = { ...defaultState, ...parsed };
      // Aplica as cores salvas
      applyCompanyTheme();
    } else {
      state = JSON.parse(JSON.stringify(defaultState));
      saveState();
    }
  } catch (e) {
    console.error("Erro ao ler LocalStorage, revertendo para dados padrões:", e);
    state = JSON.parse(JSON.stringify(defaultState));
  }
}

// APLICA O TEMA DA EMPRESA (cores personalizadas)
function applyCompanyTheme() {
  const root = document.documentElement;
  const settings = state.companySettings;
  
  if (settings.primaryColor) {
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--color-primary-dark', settings.primaryColor);
  }
  
  // Atualiza o nome da empresa em todos os lugares
  const companyNameElements = document.querySelectorAll('.company-name, .logo, .splash-title-app');
  companyNameElements.forEach(el => {
    if (el && !el.classList.contains('no-replace')) {
      el.innerText = settings.companyName + ' CHECKLIST';
    }
  });
  
  // Atualiza o título da página
  if (settings.companyName) {
    document.title = `${settings.companyName} Checklist - Segurança Operacional`;
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
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('[PWA] Service Worker registrado:', reg.scope))
      .catch((err) => console.error('[PWA] Falha:', err));
  }

  loadState();
  applyCompanyTheme();

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
  
  state.currentScreen = 'screen-splash';
  navigateTo('screen-splash');
  
  // Timer para login automático (opcional)
  setTimeout(() => {
    if (state.currentScreen === 'screen-splash') {
      navigateTo('screen-login');
    }
  }, 4000);

  syncStateToUI();

  renderChecklist('checklist-start-items', state.checklistStart, 'start');
  renderChecklist('checklist-end-items', state.checklistEnd, 'end');

  renderTickets();
  renderReports();
  renderAuditLogs();

  renderAdminForklifts();
  renderAdminShifts();
  renderAdminOperators();
  renderAdminTickets();
  renderChecklistHistory();
  renderRanking();
  renderDashboardAlerts();

  updateGauge(state.conformityScore);
});

// RENDERIZA ALERTAS NO DASHBOARD
function renderDashboardAlerts() {
  const container = document.getElementById('dashboard-alerts-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  const recentAlerts = state.tickets.slice(0, 2);
  recentAlerts.forEach(alert => {
    const card = document.createElement('div');
    card.className = `glass-card alert-item ${alert.type === 'critical' ? 'critical' : ''}`;
    card.innerHTML = `
      <div class="alert-info">
        <div class="alert-item-title">${alert.desc}</div>
        <div class="alert-item-desc">Equipamento: ${alert.forklift} • ${alert.time}</div>
      </div>
      <span class="alert-badge">${alert.type === 'critical' ? 'CRÍTICO' : 'ATENÇÃO'}</span>
    `;
    container.appendChild(card);
  });
  
  if (recentAlerts.length === 0) {
    container.innerHTML = '<div class="glass-card" style="text-align: center;">Nenhum alerta ativo no momento</div>';
  }
}

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
  
  const primaryColor = state.companySettings.primaryColor || '#FFC107';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231E1E1E;stop-opacity:1" /><stop offset="100%" style="stop-color:%230D0D0D;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="46" fill="url(%23avatarGrad)" stroke="${primaryColor.replace('#', '%23')}" stroke-width="3" /><text x="50" y="55" dominant-baseline="middle" text-anchor="middle" fill="${primaryColor.replace('#', '%23')}" font-family="'Bebas Neue', 'Inter', sans-serif" font-size="40" font-weight="bold" letter-spacing="1">${initials}</text></svg>`;
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
  if (!state.operators) {
    state.operators = JSON.parse(JSON.stringify(defaultState.operators));
  }

  let activeOp = state.operators.find(op => op.reg === state.currentUser.reg);
  if (!activeOp) {
    activeOp = {
      reg: state.currentUser.reg || 'BRF-001',
      name: state.currentUser.name || 'Operador',
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

  const opNameEl = document.getElementById('operator-name');
  if (opNameEl) opNameEl.innerText = activeOp.name;

  document.querySelectorAll('.operator-profile-name').forEach(el => {
    el.innerText = activeOp.name;
  });

  const blockedKpi = document.getElementById('kpi-blocked-count');
  if (blockedKpi) blockedKpi.innerText = state.blockedForklifts;

  const conformityKpi = document.getElementById('kpi-conformity-value');
  if (conformityKpi) conformityKpi.innerText = `${state.conformityScore}%`;

  const gaugePercent = document.getElementById('gauge-percent');
  if (gaugePercent) gaugePercent.innerText = `${state.conformityScore}%`;

  const avatarUrl = getOperatorAvatarUrl(activeOp);
  
  const avatarEl = document.getElementById('appbar-avatar');
  if (avatarEl) {
    avatarEl.src = avatarUrl;
  }

  const profileAvatar = document.getElementById('profile-avatar');
  if (profileAvatar) {
    profileAvatar.src = avatarUrl;
  }

  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    profileName.innerText = activeOp.name;
  }

  const profileRole = document.querySelector('.profile-role');
  if (profileRole) {
    profileRole.innerText = `${activeOp.role} • Matrícula: ${activeOp.reg}`;
  }

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

  const sortedOps = [...state.operators].sort((a, b) => calculateOperatorScore(b) - calculateOperatorScore(a));
  const rankIndex = sortedOps.findIndex(op => op.reg === activeOp.reg);
  const profileRankPosition = document.getElementById('profile-rank-position');
  if (profileRankPosition) {
    profileRankPosition.innerText = rankIndex !== -1 ? `${rankIndex + 1}º` : '--';
  }

  renderDashboardFleet();
  applyCompanyTheme();
}

// RENDERIZA STATUS DA FROTA NO DASHBOARD
function renderDashboardFleet() {
  const container = document.getElementById('dashboard-fleet-list');
  if (!container) return;
  container.innerHTML = '';
  
  state.forklifts.forEach(f => {
    const isMaintenance = f.status === 'Manutenção';
    const card = document.createElement('div');
    card.className = `fleet-status-card ${isMaintenance ? 'status-bloqueada' : 'status-liberada'}`;
    
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

// LEITURA REAL DE QR CODE (ativa a câmera)
function openScanner() {
  // Verifica se o navegador suporta a API de câmera
  if (typeof window !== 'undefined' && 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    toggleModal('modal-scanner-real');
    startRealScanner();
  } else {
    // Fallback para simulação se não suportar câmera
    alert("Seu navegador não suporta acesso à câmera. Usando modo de simulação.");
    toggleModal('modal-scanner');
  }
}

let currentStream = null;

function startRealScanner() {
  const video = document.getElementById('scanner-video');
  if (!video) return;
  
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      video.setAttribute('playsinline', true);
      video.play();
      
      // Inicia a leitura do QR Code
      startQRCodeReading();
    })
    .catch(err => {
      console.error("Erro ao acessar câmera:", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
      toggleModal('modal-scanner-real');
      toggleModal('modal-scanner');
    });
}

function startQRCodeReading() {
  const video = document.getElementById('scanner-video');
  if (!video) return;
  
  // Função para capturar e analisar o frame
  const scanFrame = () => {
    if (!video.videoWidth || !video.videoHeight) {
      setTimeout(scanFrame, 500);
      return;
    }
    
    // Cria um canvas para capturar o frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Usa a biblioteca jsQR para ler QR Code
    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code && code.data) {
        // QR Code encontrado!
        handleQRCodeResult(code.data);
        stopRealScanner();
        toggleModal('modal-scanner-real');
        return;
      }
    }
    
    // Continua escaneando
    requestAnimationFrame(scanFrame);
  };
  
  setTimeout(scanFrame, 1000);
}

function handleQRCodeResult(qrData) {
  // Procura a empilhadeira pelo ID
  const forklift = state.forklifts.find(f => f.id === qrData);
  if (forklift) {
    alert(`QR Code lido: ${forklift.id} - ${forklift.model}`);
    preparePreChecklist(forklift.id);
  } else {
    alert(`QR Code lido: ${qrData}\nEquipamento não encontrado na frota.`);
  }
}

function stopRealScanner() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  const video = document.getElementById('scanner-video');
  if (video) {
    video.srcObject = null;
  }
}

function simulateScanSuccess() {
  toggleModal('modal-scanner');
  const forklift = state.forklifts[2] || { id: 'EMP-05' };
  alert(`Código QR Lido: ${forklift.id} vinculada com sucesso!`);
  preparePreChecklist(forklift.id);
}

// NAVEGADOR SPA (ROTEAMENTO)
function navigateTo(screenId) {
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
    
    if (screenId === 'screen-ranking') {
      renderRanking();
    } else if (screenId === 'screen-admin') {
      verificarAcessoAdmin();
    } else if (screenId === 'screen-reports') {
      renderChecklistHistory();
      renderReports();
    } else if (screenId === 'screen-checklist-start') {
      setTimeout(() => setupSignatureCanvas('start'), 100);
    } else if (screenId === 'screen-checklist-end') {
      setTimeout(() => setupSignatureCanvas('end'), 100);
    } else if (screenId === 'screen-dashboard') {
      renderDashboardAlerts();
      renderDashboardFleet();
    }
  }

  const appBar = document.getElementById('global-appbar');
  const navBar = document.getElementById('global-navbar');

  if (screenId === 'screen-splash' || screenId === 'screen-login') {
    if (appBar) appBar.style.display = 'none';
    if (navBar) navBar.style.display = 'none';
  } else {
    if (appBar) appBar.style.display = 'flex';
    if (navBar) navBar.style.display = 'flex';
    
    const titleEl = document.getElementById('appbar-title');
    if (titleEl && screenTitles[screenId]) {
      titleEl.innerText = screenTitles[screenId];
    }

    updateActiveNavItem(screenId);
  }

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// VERIFICA ACESSO AO ADMIN
function verificarAcessoAdmin() {
  const senhaAdmin = prompt("🔐 ACESSO RESTRITO\n\nDigite a senha do Administrador para acessar o Painel ADM:");
  
  if (senhaAdmin === 'adm415263') {
    // Carrega o admin
    renderAdminOperators();
    renderAdminForklifts();
    renderAdminShifts();
    renderAdminTickets();
    renderAuditLogs();
    renderCompanySettings();
  } else {
    alert("❌ Senha incorreta! Acesso negado ao Painel do Administrador.");
    navigateTo('screen-dashboard');
  }
}

// RENDERIZA CONFIGURAÇÕES DA EMPRESA NO ADMIN
function renderCompanySettings() {
  const container = document.getElementById('admin-company-settings');
  if (!container) return;
  
  const settings = state.companySettings;
  
  container.innerHTML = `
    <div class="glass-card" style="margin-bottom: 20px;">
      <h3 style="color: var(--color-primary); margin-bottom: 16px;">🎨 Personalização da Empresa</h3>
      
      <div class="input-group">
        <label class="input-label">Nome da Empresa</label>
        <div class="input-field-wrapper">
          <input type="text" class="input-field" id="company-name-input" value="${settings.companyName}" placeholder="Ex: PRUDÊNCIO, FEDEX, etc.">
          <i data-lucide="building-2"></i>
        </div>
      </div>
      
      <div class="input-group">
        <label class="input-label">Cor Principal</label>
        <div class="input-field-wrapper">
          <input type="color" class="input-field" id="company-color-input" value="${settings.primaryColor}" style="padding: 4px; height: 50px;">
          <i data-lucide="palette"></i>
        </div>
      </div>
      
      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button class="btn-primary" onclick="saveCompanySettings()">
          <i data-lucide="save"></i> Salvar Alterações
        </button>
        <button class="btn-secondary" onclick="resetCompanySettings()">
          <i data-lucide="refresh-cw"></i> Restaurar Padrão
        </button>
      </div>
      
      <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 8px;">
        <p style="font-size: 12px; color: var(--color-text-muted);">
          <i data-lucide="info"></i> A senha para alterações é: <strong>415263</strong>
        </p>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

// SALVA CONFIGURAÇÕES DA EMPRESA (com senha)
function saveCompanySettings() {
  const senha = prompt("🔐 Confirme a senha para salvar as alterações:");
  
  if (senha !== '415263') {
    alert("❌ Senha incorreta! Alterações NÃO foram salvas.");
    return;
  }
  
  const newCompanyName = document.getElementById('company-name-input')?.value.trim().toUpperCase() || 'PRUDÊNCIO';
  const newPrimaryColor = document.getElementById('company-color-input')?.value || '#FFC107';
  
  state.companySettings = {
    companyName: newCompanyName,
    primaryColor: newPrimaryColor
  };
  
  saveState();
  applyCompanyTheme();
  
  alert(`✅ Configurações salvas com sucesso!\n\nEmpresa: ${newCompanyName}\nCor: ${newPrimaryColor}`);
  
  // Recarrega as configurações
  renderCompanySettings();
}

// RESETA CONFIGURAÇÕES DA EMPRESA
function resetCompanySettings() {
  const senha = prompt("🔐 Confirme a senha para restaurar as configurações padrão:");
  
  if (senha !== '415263') {
    alert("❌ Senha incorreta! Configurações NÃO foram restauradas.");
    return;
  }
  
  state.companySettings = {
    companyName: 'PRUDÊNCIO',
    primaryColor: '#FFC107'
  };
  
  saveState();
  applyCompanyTheme();
  
  alert("✅ Configurações restauradas para o padrão (PRUDÊNCIO/Amarelo)");
  renderCompanySettings();
}

// INICIAR APLICAÇÃO
function startApp() {
  const splash = document.getElementById('screen-splash');
  if (splash) {
    splash.style.display = 'none';
  }
  navigateTo('screen-login');
}

// ATUALIZA A SELEÇÃO DA NAVBAR
function updateActiveNavItem(screenId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  let navBtnId = '';
  if (screenId === 'screen-dashboard') navBtnId = 'nav-dashboard';
  else if (screenId === 'screen-checklist-start' || screenId === 'screen-checklist-end') navBtnId = 'nav-checklists';
  else if (screenId === 'screen-maintenance') navBtnId = 'nav-maintenance';
  else if (screenId === 'screen-ranking') navBtnId = 'nav-ranking';
  else if (screenId === 'screen-trainings') navBtnId = 'nav-trainings';
  else if (screenId === 'screen-profile') navBtnId = 'nav-profile';
  else if (screenId === 'screen-admin') navBtnId = 'nav-admin';

  if (navBtnId) {
    const activeBtn = document.getElementById(navBtnId);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

// CONTROLE DE SIMULAÇÃO DE LOGIN
function handleLogin(event) {
  event.preventDefault();
  
  const userVal = document.getElementById('login-user').value.trim();
  const passVal = document.getElementById('login-pass').value;
  
  if (userVal) {
    if (!state.operators) {
      state.operators = JSON.parse(JSON.stringify(defaultState.operators));
    }
    
    let op = state.operators.find(o => o.reg.toUpperCase() === userVal.toUpperCase());
    if (!op) {
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
  alert("Autenticando biometria... Acesso permitido.");
  state.currentUser.reg = 'BRF-001';
  state.currentUser.name = 'Operador';
  saveState();
  syncStateToUI();
  navigateTo('screen-dashboard');
}

// LOGOUT
function handleLogout() {
  if (confirm("⚠️ ATENÇÃO: Deseja realmente sair do sistema operacional?")) {
    resetChecklistsOnly();
    navigateTo('screen-login');
  }
}

// LIMPA CHECKLISTS APENAS
function resetChecklistsOnly() {
  state.checklistStart.forEach(item => item.status = null);
  state.checklistEnd.forEach(item => item.status = null);
  state.conformityScore = 94;
  state.blockedForklifts = 2;
  state.selectedShift = null;
  saveState();
  
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

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// EXPANDIR/COLLAPSE ITENS DO CHECKLIST
function toggleExpandItem(type, itemId) {
  const panel = document.getElementById(`${type}-expand-${itemId}`);
  const arrow = document.getElementById(`${type}-arrow-${itemId}`);
  
  if (panel && arrow) {
    if (panel.style.display === 'grid') {
      panel.style.display = 'none';
      arrow.style.transform = 'rotate(0deg)';
    } else {
      panel.style.display = 'grid';
      arrow.style.transform = 'rotate(180deg)';
    }
  }
}

// CLIQUE NOS BOTÕES DO CHECKLIST
function setChecklistItemStatus(type, itemId, status) {
  const list = type === 'start' ? state.checklistStart : state.checklistEnd;
  const item = list.find(i => i.id === itemId);
  
  if (!item) return;
  item.status = status;

  const btnOk = document.getElementById(`${type}-btn-ok-${itemId}`);
  const btnWarning = document.getElementById(`${type}-btn-warning-${itemId}`);
  const btnDanger = document.getElementById(`${type}-btn-danger-${itemId}`);
  const card = document.getElementById(`${type}-item-card-${itemId}`);

  if (btnOk) btnOk.classList.remove('active');
  if (btnWarning) btnWarning.classList.remove('active');
  if (btnDanger) btnDanger.classList.remove('active');
  if (card) card.classList.remove('answered-ok', 'answered-warning', 'answered-danger');

  if (status === 'ok') {
    if (btnOk) btnOk.classList.add('active');
    if (card) card.classList.add('answered-ok');
  } else if (status === 'warning') {
    if (btnWarning) btnWarning.classList.add('active');
    if (card) card.classList.add('answered-warning');
  } else if (status === 'danger') {
    if (btnDanger) btnDanger.classList.add('active');
    if (card) card.classList.add('answered-danger');
    triggerCriticalBlock(item.name);
  }

  const photoContainer = document.getElementById(`${type}-photo-container-${itemId}`);
  if (photoContainer) {
    if (status === 'warning' || status === 'danger') {
      photoContainer.style.display = 'block';
    } else {
      photoContainer.style.display = 'none';
      removePhoto(type, itemId);
    }
  }

  saveState();

  setTimeout(() => {
    if (status !== 'danger') {
      const panel = document.getElementById(`${type}-expand-${itemId}`);
      const arrow = document.getElementById(`${type}-arrow-${itemId}`);
      if (panel) panel.style.display = 'none';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  }, 400);
}

// DISPARA BLOQUEIO OPERACIONAL
function triggerCriticalBlock(itemName) {
  const failedItemEl = document.getElementById('failed-item-name');
  if (failedItemEl) failedItemEl.innerText = itemName;
  
  state.blockedForklifts = 3;
  state.conformityScore = 86;

  const newLog = {
    id: 'log_' + Date.now(),
    time: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    operator: state.currentUser.name,
    desc: `Bloqueio emergencial acionado no item crítico: ${itemName}. Equipamento EMP-05 interditado.`,
    type: 'danger'
  };
  state.auditLogs.unshift(newLog);

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
  
  renderTickets();
  renderAuditLogs();
  renderAdminTickets();

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
    
    const firstPending = unanswered[0];
    const panel = document.getElementById(`${type}-expand-${firstPending.id}`);
    const arrow = document.getElementById(`${type}-arrow-${firstPending.id}`);
    if (panel) {
      panel.style.display = 'grid';
      if (arrow) arrow.style.transform = 'rotate(180deg)';
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  const criticalIssues = list.filter(item => item.status === 'danger');
  if (criticalIssues.length > 0) {
    alert("Checklist não pode ser finalizado! Equipamento bloqueado por defeito crítico de segurança.");
    return;
  }

  const hasSig = signatureStates[type] && signatureStates[type].hasSignature;
  if (!hasSig) {
    alert("Por favor, assine digitalmente no painel de assinatura antes de enviar.");
    return;
  }

  const canvas = document.getElementById(`signature-${type}-canvas`);
  const signatureBase64 = canvas ? canvas.toDataURL() : '';

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
  
  if (state.operators) {
    const activeOp = state.operators.find(op => op.reg === state.currentUser.reg);
    if (activeOp) {
      activeOp.checklistsCount = (activeOp.checklistsCount || 0) + 1;
    }
  }

  if (!state.checklistHistory) {
    state.checklistHistory = [];
  }
  
  const completedChecklist = {
    id: 'ch_' + Date.now(),
    type: type,
    operator: state.currentUser.name,
    operatorReg: state.currentUser.reg,
    forkliftId: state.selectedForkliftId || 'EMP-05',
    forkliftModel: document.getElementById('pre-machine-model')?.value || 'Hyster XT-30',
    horometer: parseInt(document.getElementById('pre-horometer')?.value) || 480,
    shift: state.selectedShift || '08:00 as 17:00',
    dateTime: new Date().toLocaleString('pt-BR'),
    items: JSON.parse(JSON.stringify(list)),
    signature: signatureBase64
  };
  
  state.checklistHistory.unshift(completedChecklist);
  renderChecklistHistory();

  if (type === 'start') {
    alert("Checklist Inicial enviado com sucesso!\n\n⚠️ ATENÇÃO: Lembre-se de realizar o CHECKLIST FINAL (de Encerramento) ao término da sua jornada.");
  } else {
    alert("Checklist de Encerramento (Final) enviado com sucesso!\n\nDados de fim de jornada transmitidos e salvos na nuvem Prudêncio Safety.");
  }

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

// RENDERIZAR CHAMADOS DE MANUTENÇÃO
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

// RENDERIZAR RELATÓRIOS
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

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// RENDERIZAR LOGS DE AUDITORIA
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

// GESTÃO DE MODAIS
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    if (modalId === 'modal-scanner-real') {
      stopRealScanner();
    }
  } else {
    modal.classList.add('active');
  }
}

// CONTROLE DE VELOCÍMETRO
function updateGauge(percent) {
  const gauge = document.getElementById('conformity-gauge');
  if (!gauge) return;

  const totalOffset = 282.7;
  const offset = totalOffset - (totalOffset * percent / 100);
  
  gauge.style.strokeDashoffset = offset;
}

// TABS DE MANUTENÇÃO
function switchMaintenanceTab(tabName, btn) {
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('.sub-tab-btn').forEach(b => {
      b.classList.remove('active');
    });
  }
  btn.classList.add('active');

  document.querySelectorAll('.maintenance-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSec = document.getElementById(`maintenance-${tabName}`);
  if (targetSec) targetSec.classList.add('active');

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// ALTERNAR ABAS DO ADMIN
function switchAdminTab(tabName, btn) {
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('.sub-tab-btn').forEach(b => {
      b.classList.remove('active');
    });
  }
  btn.classList.add('active');

  document.querySelectorAll('.admin-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSec = document.getElementById(`admin-${tabName}`);
  if (targetSec) targetSec.classList.add('active');

  if (tabName === 'audit') {
    renderAuditLogs();
  } else if (tabName === 'reports') {
    renderChecklistHistory();
    renderReports();
  } else if (tabName === 'settings') {
    renderCompanySettings();
  }

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// FILTRAR HISTÓRICO
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

// NOVO CHAMADO
function handleNewTicket(event) {
  event.preventDefault();
  const forklift = document.getElementById('ticket-forklift')?.value;
  const desc = document.getElementById('ticket-desc')?.value.trim();

  if (!desc) return;

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

  renderTickets();
  renderAdminTickets();
  renderDashboardAlerts();
  
  const ticketDesc = document.getElementById('ticket-desc');
  if (ticketDesc) ticketDesc.value = '';
  toggleModal('modal-new-ticket');
  
  alert("Chamado operacional de corretiva aberto com sucesso!");
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// RELATÓRIOS
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

function openGenerateReportModal() {
  const reportName = document.getElementById('report-name-input');
  if (reportName) reportName.value = '';
  const reportFormat = document.getElementById('report-format-input');
  if (reportFormat) reportFormat.value = 'PDF';
  toggleModal('modal-new-report');
}

function handleGenerateReport(event) {
  event.preventDefault();
  const name = document.getElementById('report-name-input')?.value.trim();
  const format = document.getElementById('report-format-input')?.value;

  if (!name) return;

  const newReport = {
    id: 'report_' + Date.now(),
    name: name,
    period: 'Hoje',
    format: format
  };

  state.reports.unshift(newReport);
  saveState();

  renderReports();

  const reportNameInput = document.getElementById('report-name-input');
  if (reportNameInput) reportNameInput.value = '';
  toggleModal('modal-new-report');
  
  alert("Novo relatório gerado com sucesso e salvo em storage!");
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// TREINAMENTOS
function toggleAccordion(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const arrow = el.querySelector('.accordion-header i');

  if (el.classList.contains('active')) {
    el.classList.remove('active');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  } else {
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      const itemArrow = item.querySelector('.accordion-header i');
      if (itemArrow) itemArrow.style.transform = 'rotate(0deg)';
    });

    el.classList.add('active');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

function openPDF(name) {
  alert(`Abrindo documento técnico oficial em PDF: ${name}\nEste documento detalha o Procedimento Operacional Padrão da empilhadeira.`);
}

function playVideo(title) {
  alert(`Reproduzindo treinamento corporativo em vídeo: "${title}"\nAssista até o fim para pontuar na campanha de segurança.`);
}

// SELEÇÃO DO TIPO DE CHECKLIST
function selectChecklistType(type) {
  const hiddenInput = document.getElementById('pre-checklist-type');
  if (hiddenInput) hiddenInput.value = type;
  
  const optStart = document.getElementById('type-opt-start');
  const optEnd = document.getElementById('type-opt-end');
  
  if (optStart && optEnd) {
    if (type === 'start') {
      optStart.classList.add('active');
      optEnd.classList.remove('active');
    } else {
      optStart.classList.remove('active');
      optEnd.classList.add('active');
    }
  }
}

// TELA DE PRÉ-CHECKLIST
function preparePreChecklist(machineId) {
  const forklift = state.forklifts.find(f => f.id === machineId) || { id: machineId, model: 'Hyster H50FT', horometer: 480 };
  state.selectedForkliftId = machineId;
  
  const preOperator = document.getElementById('pre-operator-name');
  const preMachineId = document.getElementById('pre-machine-id');
  const preMachineModel = document.getElementById('pre-machine-model');
  const preHorometer = document.getElementById('pre-horometer');
  
  if (preOperator) preOperator.value = state.currentUser.name;
  if (preMachineId) preMachineId.value = machineId;
  if (preMachineModel) preMachineModel.value = forklift.model;
  if (preHorometer) preHorometer.value = forklift.horometer;
  
  selectChecklistType('start');
  
  renderPreChecklistShifts();
  
  const autoShiftCheck = document.getElementById('pre-auto-shift');
  if (autoShiftCheck) {
    autoShiftCheck.checked = state.autoShift;
    handleAutoShiftToggle(state.autoShift);
  }
  
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
        
        if (startMin > endMin) {
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
  
  const opName = document.getElementById('pre-operator-name')?.value.trim();
  const model = document.getElementById('pre-machine-model')?.value.trim();
  const horometer = parseInt(document.getElementById('pre-horometer')?.value) || 0;
  const shift = document.getElementById('pre-shift')?.value;
  const type = document.getElementById('pre-checklist-type')?.value || 'start';
  
  if (!opName || !model || horometer < 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  
  state.currentUser.name = opName;
  
  const fIndex = state.forklifts.findIndex(f => f.id === state.selectedForkliftId);
  if (fIndex !== -1) {
    state.forklifts[fIndex].model = model;
    state.forklifts[fIndex].horometer = horometer;
  }
  
  state.selectedShift = shift;
  saveState();
  
  updateChecklistHeaders(state.selectedForkliftId, model, opName, shift);
  
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
      <div class="checklist-header-subtitle">Status: <span style="color: var(--color-success);">INÍCIO DE JORNADA</span></div>
    `;
  }
  
  const endHeader = document.querySelector('#screen-checklist-end .checklist-header-info');
  if (endHeader) {
    endHeader.innerHTML = `
      <h3 class="checklist-header-title">${titleText}</h3>
      <div class="checklist-header-subtitle">${opText}</div>
      <div class="checklist-header-subtitle">Status: <span style="color: var(--color-danger);">FIM DE JORNADA</span></div>
    `;
  }
  
  syncStateToUI();
}

// SEGURANÇA ADMIN
let pendingAdminAction = null;

function runWithAdminAuth(actionCallback) {
  const senha = prompt("🔐 ACESSO RESTRITO - ADMIN\n\nDigite a senha do Administrador:");
  
  if (senha === 'adm415263') {
    actionCallback();
  } else {
    alert("❌ Senha incorreta! Acesso negado.");
  }
}

// GESTÃO DE FROTA
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
        <div class="report-icon-box" style="width: 40px; height: 40px; margin-bottom: 0;">
          <i data-lucide="truck"></i>
        </div>
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
  
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
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
      renderDashboardFleet();
      renderAuditLogs();
      alert(`Empilhadeira ${id} removida com sucesso!`);
    }
  });
}

function requestAddForklift() {
  runWithAdminAuth(() => {
    const addId = document.getElementById('add-forklift-id');
    const addModel = document.getElementById('add-forklift-model');
    const addHorometer = document.getElementById('add-forklift-horometer');
    if (addId) addId.value = '';
    if (addModel) addModel.value = '';
    if (addHorometer) addHorometer.value = '';
    toggleModal('modal-add-forklift');
  });
}

function submitAddForklift(event) {
  event.preventDefault();
  const id = document.getElementById('add-forklift-id')?.value.trim().toUpperCase();
  const model = document.getElementById('add-forklift-model')?.value.trim();
  const horometer = parseInt(document.getElementById('add-forklift-horometer')?.value) || 0;
  const status = document.getElementById('add-forklift-status')?.value;
  
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
  renderDashboardFleet();
  renderAuditLogs();
  
  toggleModal('modal-add-forklift');
  alert(`Empilhadeira ${id} adicionada à frota com sucesso!`);
}

// GERAÇÃO DE QR CODE
function downloadForkliftQRCode(id) {
  const forklift = state.forklifts.find(f => f.id === id) || { id, model: 'Empilhadeira Industrial' };
  
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 520;
  const ctx = canvas.getContext('2d');
  
  const primaryColor = state.companySettings.primaryColor || '#FFC107';
  
  ctx.fillStyle = '#0D0D0D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.lineWidth = 8;
  ctx.strokeStyle = primaryColor;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = primaryColor;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  
  ctx.fillStyle = primaryColor;
  ctx.font = 'bold 28px "Bebas Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${state.companySettings.companyName} SAFETY`, canvas.width / 2, 58);
  
  ctx.fillStyle = '#F2F2F2';
  ctx.font = '10px "Inter", Arial, sans-serif';
  ctx.fillText('CHECKLIST DE SEGURANÇA MANDATÓRIO', canvas.width / 2, 78);
  
  const tempQrCanvas = document.createElement('canvas');
  new QRious({
    element: tempQrCanvas,
    value: id,
    size: 240,
    background: '#0D0D0D',
    foreground: primaryColor,
    level: 'H'
  });
  
  ctx.drawImage(tempQrCanvas, canvas.width / 2 - 120, 115, 240, 240);
  
  ctx.beginPath();
  ctx.moveTo(35, 385);
  ctx.lineTo(canvas.width - 35, 385);
  ctx.strokeStyle = `${primaryColor}4D`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  ctx.fillStyle = primaryColor;
  ctx.font = 'bold 36px "Bebas Neue", Arial, sans-serif';
  ctx.fillText(id, canvas.width / 2, 428);
  
  ctx.fillStyle = 'rgba(242, 242, 242, 0.7)';
  ctx.font = '13px "Inter", Arial, sans-serif';
  ctx.fillText(`Modelo: ${forklift.model}`, canvas.width / 2, 452);
  
  ctx.fillStyle = 'rgba(242, 242, 242, 0.4)';
  ctx.font = '9px "Inter", Arial, sans-serif';
  ctx.fillText('Aponte a câmera do celular para liberar a operação', canvas.width / 2, 488);
  
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const link = document.createElement('a');
  link.download = `QR_CODE_${id}.jpg`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// GESTÃO DE TURNOS
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
  
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function handleAddShift() {
  runWithAdminAuth(() => {
    const input = document.getElementById('new-shift-input');
    const val = input?.value.trim();
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
    
    if (input) input.value = '';
    alert(`Turno "${val}" cadastrado com sucesso!`);
  });
}

function handleDeleteShift(shift) {
  runWithAdminAuth(() => {
    if (confirm(`Deseja realmente remover o turno "${shift}"?`)) {
      state.shifts = state.shifts.filter(s => s !== shift);
      saveState();
      renderAdminShifts();
      renderPreChecklistShifts();
    }
  });
}

// RANKING
function renderRanking() {
  const podiumContainer = document.getElementById('ranking-podium');
  const listContainer = document.getElementById('ranking-table-list');
  if (!podiumContainer || !listContainer) return;

  if (!state.operators) {
    state.operators = JSON.parse(JSON.stringify(defaultState.operators));
  }

  const sorted = [...state.operators].sort((a, b) => calculateOperatorScore(b) - calculateOperatorScore(a));

  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  podiumContainer.innerHTML = '';

  if (second) {
    const avatarUrl = getOperatorAvatarUrl(second);
    const score = calculateOperatorScore(second);
    podiumContainer.innerHTML += `
      <div class="podium-column second">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${second.name}" class="podium-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%231E1E1E%27 stroke=%27%23FFC107%27 stroke-width=%272%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%23FFC107%27 font-size=%2720%27%3E${second.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
          <span class="podium-badge">2</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${second.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

  if (first) {
    const avatarUrl = getOperatorAvatarUrl(first);
    const score = calculateOperatorScore(first);
    podiumContainer.innerHTML += `
      <div class="podium-column first">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${first.name}" class="podium-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%231E1E1E%27 stroke=%27%23FFC107%27 stroke-width=%272%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%23FFC107%27 font-size=%2720%27%3E${first.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
          <span class="podium-badge">1</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${first.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

  if (third) {
    const avatarUrl = getOperatorAvatarUrl(third);
    const score = calculateOperatorScore(third);
    podiumContainer.innerHTML += `
      <div class="podium-column third">
        <div class="podium-avatar-wrapper">
          <img src="${avatarUrl}" alt="${third.name}" class="podium-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%231E1E1E%27 stroke=%27%23FFC107%27 stroke-width=%272%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%23FFC107%27 font-size=%2720%27%3E${third.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
          <span class="podium-badge">3</span>
        </div>
        <div class="podium-block">
          <span class="podium-name">${third.name.split(' ')[0]}</span>
          <span class="podium-points">${score} pts</span>
        </div>
      </div>
    `;
  }

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
        <img src="${avatarUrl}" alt="${op.name}" class="ranking-item-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%231E1E1E%27 stroke=%27%23FFC107%27 stroke-width=%272%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%23FFC107%27 font-size=%2720%27%3E${op.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
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

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// ADMIN OPERADORES
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
        <img src="${avatarUrl}" alt="${op.name}" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--color-primary); cursor: default; margin-bottom: 0; object-fit: cover;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%231E1E1E%27 stroke=%27%23FFC107%27 stroke-width=%272%27/%3E%3Ctext x=%2750%27 y=%2755%27 text-anchor=%27middle%27 fill=%27%23FFC107%27 font-size=%2720%27%3E${op.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
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

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function requestAddOperator() {
  runWithAdminAuth(() => {
    const addName = document.getElementById('add-operator-name');
    const addReg = document.getElementById('add-operator-reg');
    const addRole = document.getElementById('add-operator-role');
    const addPhotoBase64 = document.getElementById('add-operator-photo-base64');
    const addPhotoPreview = document.getElementById('add-operator-photo-preview');
    const addHours = document.getElementById('add-operator-hours');
    
    if (addName) addName.value = '';
    if (addReg) addReg.value = '';
    if (addRole) addRole.value = 'Operador Pleno';
    if (addPhotoBase64) addPhotoBase64.value = '';
    if (addPhotoPreview) addPhotoPreview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%231E1E1E' stroke='%23FFC107' stroke-width='2'/><text x='50' y='55' text-anchor='middle' fill='%23FFC107' font-size='10' font-family='sans-serif'>CLIQUE AQUI</text></svg>";
    if (addHours) addHours.value = '0';
    toggleModal('modal-add-operator');
  });
}

function submitAddOperator(event) {
  event.preventDefault();
  const name = document.getElementById('add-operator-name')?.value.trim();
  const reg = document.getElementById('add-operator-reg')?.value.trim().toUpperCase();
  const role = document.getElementById('add-operator-role')?.value;
  const photo = document.getElementById('add-operator-photo-base64')?.value || '';
  const hours = parseInt(document.getElementById('add-operator-hours')?.value) || 0;

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
  if (regCode === 'BRF-001') {
    alert("Atenção: Este é o operador principal e não pode ser excluído do sistema!");
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
        state.currentUser.reg = 'BRF-001';
        state.currentUser.name = 'Operador';
        state.currentUser.role = 'Operador Pleno';
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

  const logMetricReg = document.getElementById('log-metric-operator-reg');
  const logMetricSubtitle = document.getElementById('log-metric-subtitle');
  const logMetricType = document.getElementById('log-metric-type');
  const logMetricValue = document.getElementById('log-metric-value');
  
  if (logMetricReg) logMetricReg.value = regCode;
  if (logMetricSubtitle) logMetricSubtitle.innerText = `Operador: ${op.name} (${regCode})`;
  if (logMetricType) logMetricType.value = 'horas';
  if (logMetricValue) logMetricValue.value = '1';
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
  
  const regCode = document.getElementById('log-metric-operator-reg')?.value;
  const type = document.getElementById('log-metric-type')?.value;
  const value = parseInt(document.getElementById('log-metric-value')?.value) || 0;

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

// ASSINATURA DIGITAL
const signatureStates = {
  start: { drawing: false, context: null, canvas: null, hasSignature: false },
  end: { drawing: false, context: null, canvas: null, hasSignature: false }
};

function setupSignatureCanvas(type) {
  const canvas = document.getElementById(`signature-${type}-canvas`);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 300;
  canvas.height = rect.height || 120;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  signatureStates[type].canvas = canvas;
  signatureStates[type].context = ctx;
  signatureStates[type].hasSignature = false;
  
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
  
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
  
  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDrawing, { passive: false });
}

function clearSignature(type) {
  const sigState = signatureStates[type];
  if (!sigState || !sigState.canvas || !sigState.context) return;
  
  const ctx = sigState.context;
  const canvas = sigState.canvas;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sigState.hasSignature = false;
}

// EVIDÊNCIAS FOTOGRÁFICAS
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

// FOTO DO OPERADOR
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

// ADMIN TICKETS (OS CORRETIVAS)
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
  
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function openAdminEditTicketModal(id) {
  const ticket = state.tickets.find(t => t.id === id);
  if (!ticket) return;
  
  const editId = document.getElementById('admin-edit-ticket-id');
  const editSubtitle = document.getElementById('admin-edit-ticket-subtitle');
  const editDesc = document.getElementById('admin-edit-ticket-desc');
  const editTech = document.getElementById('admin-edit-ticket-tech');
  const editSla = document.getElementById('admin-edit-ticket-sla');
  const editStatus = document.getElementById('admin-edit-ticket-status');
  
  if (editId) editId.value = ticket.id;
  if (editSubtitle) editSubtitle.innerText = `Equipamento: ${ticket.forklift} • Aberto por: ${ticket.openedBy}`;
  if (editDesc) editDesc.value = ticket.desc;
  if (editTech) editTech.value = ticket.tech || '';
  if (editSla) editSla.value = ticket.sla || '';
  if (editStatus) editStatus.value = ticket.status;
  
  toggleModal('modal-edit-ticket-admin');
}

function submitAdminEditTicket(event) {
  event.preventDefault();
  
  const id = document.getElementById('admin-edit-ticket-id')?.value;
  const desc = document.getElementById('admin-edit-ticket-desc')?.value.trim();
  const tech = document.getElementById('admin-edit-ticket-tech')?.value.trim();
  const sla = document.getElementById('admin-edit-ticket-sla')?.value.trim();
  const status = document.getElementById('admin-edit-ticket-status')?.value;
  
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
  renderDashboardFleet();
  renderDashboardAlerts();
  
  toggleModal('modal-edit-ticket-admin');
  alert("Chamado operacional atualizado com sucesso!");
}

// HISTÓRICO DE CHECKLISTS
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
  
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

function openChecklistDetail(id) {
  const h = state.checklistHistory.find(item => item.id === id);
  if (!h) return;
  
  const metaContainer = document.getElementById('detail-checklist-meta');
  if (metaContainer) {
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
  }
  
  const itemsContainer = document.getElementById('detail-checklist-items');
  if (itemsContainer) {
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
      div.style.justifyContent = 'space-between';
      div.style.alignItems = 'center';
      div.style.padding = '8px 0';
      div.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
      div.innerHTML = `
        <span style="font-weight: 500;">${item.name}</span>
        <span style="color: ${statusColor}; font-weight: bold; font-size: 11px;">${statusText}</span>
      `;
      itemsContainer.appendChild(div);
    });
  }
  
  const photosContainer = document.getElementById('detail-checklist-photos');
  const photosTitle = document.getElementById('detail-checklist-photos-title');
  if (photosContainer && photosTitle) {
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
  }
  
  const signatureImg = document.getElementById('detail-checklist-signature');
  if (signatureImg) signatureImg.src = h.signature || '';
  
  toggleModal('modal-checklist-detail');
}

// EXPORTAÇÃO/IMPRESSÃO
function printChecklistDetail() {
  window.print();
}