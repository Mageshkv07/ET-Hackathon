// ==========================================
// SURAKSHA SAFETY INTEL - APP STATE & SIMULATION
// ==========================================

// Global application state
const state = {
  activeView: 'view-command',
  currentScenario: 'routine',
  emergencyActive: false,
  activePermits: [],
  workers: [],
  sensors: [],
  alerts: [],
  capaTasks: [],
  complianceScore: 94,
  chatMessages: [],
  currentSlide: 1
};

// ==========================================
// SCENARIO DATABASES
// ==========================================

const SCENARIOS = {
  routine: {
    riskIndex: '12%',
    riskClass: 'risk-low',
    riskIndicator: 'pulse-green',
    complianceScore: 94,
    sensors: [
      { id: 'SN-101', tag: 'Z1-TEMP', location: 'Z-01', name: 'Furnace Core Temp', value: '425 °C', threshold: '480 °C', status: 'OK', class: 'green-text' },
      { id: 'SN-102', tag: 'Z1-H2S', location: 'Z-01', name: 'H2S Gas concentration', value: '0.0 ppm', threshold: '10.0 ppm', status: 'OK', class: 'green-text' },
      { id: 'SN-103', tag: 'Z2-LEL', location: 'Z-02', name: 'HC Flammable Gas LEL', value: '0.2 % LEL', threshold: '10.0 % LEL', status: 'OK', class: 'green-text' },
      { id: 'SN-104', tag: 'Z3-CH4', location: 'Z-03', name: 'Compressor CH4 gas', value: '1.2 ppm', threshold: '20.0 ppm', status: 'OK', class: 'green-text' },
      { id: 'SN-105', tag: 'Z3-O2', location: 'Z-03', name: 'Reformer Vessel O2', value: '20.9 %', threshold: '19.5 - 23.0%', status: 'OK', class: 'green-text' }
    ],
    permits: [
      { id: 'PTW-2026-091', type: 'Cold Work', location: 'Z-03 (Compressor)', auth: 'A. K. Mehta', risk: 'Low', status: 'ACTIVE', class: 'success-bg' },
      { id: 'PTW-2026-092', type: 'Height Work', location: 'Z-04 (Storage)', auth: 'S. N. Sen', risk: 'Medium', status: 'ACTIVE', class: 'warning-bg' },
      { id: 'PTW-2026-093', type: 'Cold Work', location: 'Z-01 (Furnace)', auth: 'A. K. Mehta', risk: 'Low', status: 'ACTIVE', class: 'success-bg' }
    ],
    workers: [
      { id: 'W-301', name: 'Amit Kumar', zone: 'Z-03', x: 380, y: 320, task: 'Lube oil filter replacement' },
      { id: 'W-302', name: 'Rohan Patil', zone: 'Z-03', x: 450, y: 340, task: 'Lube oil filter replacement' },
      { id: 'W-303', name: 'Vikram Singh', zone: 'Z-04', x: 620, y: 300, task: 'Level gauge inspection' },
      { id: 'W-304', name: 'Devendra Gowda', zone: 'Z-04', x: 680, y: 280, task: 'Scaffolding setup' },
      { id: 'W-305', name: 'Sanjay Dutt', zone: 'Z-01', x: 120, y: 150, task: 'Furnace insulation check' }
    ],
    alerts: [],
    capa: [],
    compliance: {
      vent: { passed: true, icon: '✓', desc: 'Vessel entry ventilation checklist validated prior to worker access tags approval.' },
      simop: { passed: true, icon: '✓', desc: 'No hot work operations occurring inside active flammable gas boundaries.' }
    },
    chat: [
      { sender: 'SCADA Agent', time: '13:40', text: 'All IoT sensor feeds operating normally. Zone 1-4 telemetry within nominal ranges.' },
      { sender: 'PTW Agent', time: '13:42', text: 'Permit-to-work registry verified. Three active permits, no overlapping safety clearance issues.' },
      { sender: 'Compliance Agent', time: '13:43', text: 'Indian Factory Act 1948 checklist indicates 94% compliance. Minor training log gap noted.' }
    ]
  },
  simop: {
    riskIndex: '48%',
    riskClass: 'risk-medium',
    riskIndicator: 'pulse-orange',
    complianceScore: 81,
    sensors: [
      { id: 'SN-101', tag: 'Z1-TEMP', location: 'Z-01', name: 'Furnace Core Temp', value: '428 °C', threshold: '480 °C', status: 'OK', class: 'green-text' },
      { id: 'SN-102', tag: 'Z1-H2S', location: 'Z-01', name: 'H2S Gas concentration', value: '0.5 ppm', threshold: '10.0 ppm', status: 'OK', class: 'green-text' },
      { id: 'SN-103', tag: 'Z2-LEL', location: 'Z-02', name: 'HC Flammable Gas LEL', value: '2.8 % LEL', threshold: '10.0 % LEL', status: 'OK', class: 'green-text' },
      { id: 'SN-104', tag: 'Z3-CH4', location: 'Z-03', name: 'Compressor CH4 gas', value: '8.5 ppm', threshold: '20.0 ppm', status: 'WARNING', class: 'warning-text' },
      { id: 'SN-105', tag: 'Z3-O2', location: 'Z-03', name: 'Reformer Vessel O2', value: '20.9 %', threshold: '19.5 - 23.0%', status: 'OK', class: 'green-text' }
    ],
    permits: [
      { id: 'PTW-2026-091', type: 'Cold Work', location: 'Z-03 (Compressor)', auth: 'A. K. Mehta', risk: 'Low', status: 'ACTIVE', class: 'success-bg' },
      { id: 'PTW-2026-092', type: 'Height Work', location: 'Z-04 (Storage)', auth: 'S. N. Sen', risk: 'Medium', status: 'ACTIVE', class: 'warning-bg' },
      { id: 'PTW-2026-094', type: 'Hot Work (Welding)', location: 'Z-03 (Compressor)', auth: 'P. V. Reddy', risk: 'HIGH', status: 'ACTIVE', class: 'danger-bg' }
    ],
    workers: [
      { id: 'W-301', name: 'Amit Kumar', zone: 'Z-03', x: 350, y: 280, task: 'Lube oil filter replacement' },
      { id: 'W-306', name: 'Rahul Nair', zone: 'Z-03', x: 420, y: 300, task: 'Welding line connection' },
      { id: 'W-307', name: 'Kartik Iyer', zone: 'Z-03', x: 440, y: 310, task: 'Welding line connection' },
      { id: 'W-303', name: 'Vikram Singh', zone: 'Z-04', x: 620, y: 300, task: 'Level gauge inspection' },
      { id: 'W-304', name: 'Devendra Gowda', zone: 'Z-04', x: 680, y: 280, task: 'Scaffolding setup' }
    ],
    alerts: [
      {
        title: 'SIMOP Conflict Detected (PTW-094 vs SN-104)',
        desc: 'Hot Work (Welding) authorized in Zone 03 (Compressor Deck) while CH4 sensor reading is elevated at 8.5 ppm. Potential ignition threat.',
        time: '14:55:10',
        severity: 'warning-alert',
        icon: '⚠️',
        compliance: 'OISD-105 Clause 6.2 Violation'
      }
    ],
    capa: [
      { id: 'CAPA-401', priority: 'High', title: 'Suspend PTW-2026-094 (Hot Work)', desc: 'Cease welding in Compressor Zone immediately. Perform gas isolation and purge lines.', owner: 'P. V. Reddy (Ops Manager)', deadline: 'Immediate' }
    ],
    compliance: {
      vent: { passed: true, icon: '✓', desc: 'Vessel entry ventilation checklist validated prior to worker access tags approval.' },
      simop: { passed: false, icon: '✗', desc: 'FAIL: Hot work permit issued within overlapping perimeter of elevated CH4 gas reading.' }
    },
    chat: [
      { sender: 'SCADA Agent', time: '14:55', text: 'ALERT: CH4 sensor Z3-CH4 has risen to 8.5 ppm at the Compressor Deck. Purging cycle has not initiated.' },
      { sender: 'PTW Agent', time: '14:56', text: 'CRITICAL CONFLICT: Hot Work Permit (PTW-094) for welding is active in the same zone. This violates simultaneous operation isolation margins.' },
      { sender: 'Compliance Agent', time: '14:56', text: 'This is a violation of OISD-GDN-232 and Factory Act Section 37. Spark hazards must be isolated from combustible atmospheres.' },
      { sender: 'Response Agent', time: '14:57', text: 'Safety Manager notified. Automated advisory dispatched to Ops Room to suspend PTW-094. Standing by to escalate if concentration exceeds 15 ppm.' }
    ]
  },
  critical: {
    riskIndex: '94%',
    riskClass: 'risk-high',
    riskIndicator: 'pulse-red',
    complianceScore: 64,
    sensors: [
      { id: 'SN-101', tag: 'Z1-TEMP', location: 'Z-01', name: 'Furnace Core Temp', value: '475 °C', threshold: '480 °C', status: 'WARNING', class: 'warning-text' },
      { id: 'SN-102', tag: 'Z1-H2S', location: 'Z-01', name: 'H2S Gas concentration', value: '24.2 ppm', threshold: '10.0 ppm', status: 'CRITICAL', class: 'red-text' },
      { id: 'SN-103', tag: 'Z2-LEL', location: 'Z-02', name: 'HC Flammable Gas LEL', value: '1.5 % LEL', threshold: '10.0 % LEL', status: 'OK', class: 'green-text' },
      { id: 'SN-104', tag: 'Z3-CH4', location: 'Z-03', name: 'Compressor CH4 gas', value: '1.4 ppm', threshold: '20.0 ppm', status: 'OK', class: 'green-text' },
      { id: 'SN-105', tag: 'Z3-O2', location: 'Z-03', name: 'Reformer Vessel O2', value: '18.1 %', threshold: '19.5 - 23.0%', status: 'CRITICAL', class: 'red-text' }
    ],
    permits: [
      { id: 'PTW-2026-095', type: 'Confined Space Entry', location: 'Z-01 (Furnace)', auth: 'A. K. Mehta', risk: 'HIGH', status: 'ACTIVE', class: 'danger-bg' },
      { id: 'PTW-2026-092', type: 'Height Work', location: 'Z-04 (Storage)', auth: 'S. N. Sen', risk: 'Medium', status: 'ACTIVE', class: 'warning-bg' }
    ],
    workers: [
      { id: 'W-305', name: 'Sanjay Dutt', zone: 'Z-01', x: 90, y: 120, task: 'Vessel inspection (V-102)' },
      { id: 'W-308', name: 'Manning Singh', zone: 'Z-01', x: 130, y: 140, task: 'Vessel inspection (V-102)' },
      { id: 'W-303', name: 'Vikram Singh', zone: 'Z-04', x: 620, y: 300, task: 'Level gauge inspection' },
      { id: 'W-304', name: 'Devendra Gowda', zone: 'Z-04', x: 680, y: 280, task: 'Scaffolding setup' }
    ],
    alerts: [
      {
        title: 'TOXIC GAS ESCALATION & TRAPPED WORKERS',
        desc: 'H2S gas concentration at Reformer Furnace (Zone 01) is 24.2 ppm (Threshold: 10.0 ppm). Confined space permit PTW-095 is active inside. Two workers trapped.',
        time: '15:02:15',
        severity: 'critical-alert',
        icon: '🚨',
        compliance: 'Factory Act Sec 36 Violation - Confined space entry during oxygen deficiency (O2: 18.1%)'
      }
    ],
    capa: [
      { id: 'CAPA-402', priority: 'Critical', title: 'Activate Emergency Escape Routes', desc: 'Safety alarm triggered. Dispatch emergency response and rescue team to Reformer Furnace Zone 1.', owner: 'Rescue Team / Chief Safety Officer', deadline: 'Immediate' },
      { id: 'CAPA-403', priority: 'High', title: 'Shutdown Fuel Gas Valves', desc: 'Isolate SCADA RSV-301 valve to cut feed line gas pressures.', owner: 'SCADA Automator', deadline: '10 mins' }
    ],
    compliance: {
      vent: { passed: false, icon: '✗', desc: 'FAIL: Oxygen deficiency (18.1%) & high H2S (24.2ppm) in active confined space entry zone.' },
      simop: { passed: true, icon: '✓', desc: 'No hot work operations occurring inside active flammable gas boundaries.' }
    },
    chat: [
      { sender: 'SCADA Agent', time: '15:02', text: 'CRITICAL: Sensor Z1-H2S reports H2S leak in Reformer Furnace. Reading is 24.2 ppm. Oxygen levels are collapsing (18.1%).' },
      { sender: 'PTW Agent', time: '15:02', text: 'IMMEDIATE HAZARD: Permit PTW-095 for confined space entry is currently active. Sanjay Dutt and Manning Singh are checked in inside the vessel.' },
      { sender: 'Compliance Agent', time: '15:03', text: 'This violates Section 36 of the Indian Factory Act. Under toxic gas accumulation exceeding STEL, workers must be evacuated and LOTO secured.' },
      { sender: 'Response Agent', time: '15:03', text: 'EMERGENCY PROTOCOL INITIATED. Activating sirens, broadcasting evacuation route vectors, sending automated SMS alerts to emergency dispatchers.' }
    ]
  }
};

// ==========================================
// RAG CORPUS DATABASE
// ==========================================

const RAG_CORPUS = [
  {
    tags: ['visakhapatnam', 'vizag', 'steel plant', 'coke oven', 'explosion', '2025', 'dgfasli'],
    source: 'Visakhapatnam Steel Plant (VSP) Coke Oven Gas Explosion Investigation (Jan 2025)',
    content: 'In January 2025, eight workers lost their lives at Visakhapatnam Steel Plant due to a sudden explosion in the coke oven battery caused by entrapped gases. Though SCADA gas pressure sensors recorded warning signals prior to the explosion, gas detectors, permit-to-work controls, and operational decision layers were disconnected. DGFASLI & FICCI 2024 reports emphasize that over 60% of facilities rely on manual handovers. Root Cause: Absence of a unified multi-agent intelligence layer connecting gas pressure trends to immediate operational stops.'
  },
  {
    tags: ['oisd-105', 'permit', 'hot work', 'gas test'],
    source: 'OISD-STD-105 (Work Permit System), Clause 6.1-6.4',
    content: 'Work Permit System requirements: Hot Work is defined as any activity involving open flame, spark generation, or temperatures high enough to ignite combustible mixtures. No Hot Work shall be authorized in a process area unless: (a) Gas testing shows hydrocarbon level is 0% LEL, (b) All drain hubs within 15 meters are covered, (c) Fire watch is posted with gas detector, (d) Isolation list is checked and signed off.'
  },
  {
    tags: ['factory act', 'section 36', 'confined space', 'oxygen'],
    source: 'The Factories Act 1948 (Indian Law), Section 36: Precautions to be taken in relation to work in confined spaces',
    content: 'No person shall be allowed to enter any chamber, tank, vat, pipe, flue or other confined space in any factory in which any gas, fume, dust or vapour is likely to be present to such an extent as to involve risk to persons being overcome thereby, unless: (a) A certificate in writing has been given by a competent person after testing the air that it is free from dangerous gas, (b) The space is adequately ventilated, (c) Oxygen level is between 19.5% and 23.5%, (d) The worker wears suitable breathing apparatus and safety harness connected to a lifeline held by a person outside.'
  },
  {
    tags: ['h2s', 'toxic', 'threshold', 'ppm'],
    source: 'DGMS Safety Directive - H2S Gas Safety Protocols',
    content: 'Hydrogen Sulfide (H2S) is a highly toxic, corrosive gas. Threshold limits: (a) Time Weighted Average (TWA): 10 ppm - limit of safe occupational exposure for 8 hours. (b) Short Term Exposure Limit (STEL): 15 ppm - maximum exposure for 15 minutes. (c) Immediate Danger to Life or Health (IDLH): 100 ppm. Continuous gas monitoring transceivers must trigger local alarm strobe at 10 ppm, and automatic plant trip / valve isolation at 20 ppm.'
  },
  {
    tags: ['factory act', 'section 37', 'explosive gas', 'purging'],
    source: 'The Factories Act 1948, Section 37: Explosive or Inflammable Dust, Gas, etc.',
    content: 'Where in any factory, any manufacturing process produces dust, gas, fume or vapour of such character and to such extent as to be likely to explode on ignition, all practicable measures shall be taken to prevent such explosion by: (1) Effective enclosure of the plant, (2) Removal or prevention of accumulation of such dust/gas, (3) Exclusion of all sources of ignition, (4) Purging of pipe lines with nitrogen prior to welding.'
  },
  {
    tags: ['hpcl', 'visakhapatnam', 'leak', 'fire', 'simops'],
    source: 'Refinery Incident Case Study: HPCL Visakhapatnam LPG Leak & Explosion (1997)',
    content: 'On September 14, 1997, a major leak of liquefied petroleum gas (LPG) occurred during ship unloading. The vapor cloud spread and ignited, causing 60 fatalities. Key contributing factors: (1) Absence of automatic gas detection grid at boundaries, (2) Simultaneous maintenance and unloading operations (SIMOPs conflict), (3) Inadequate emergency response delay (>15 mins). Prevention requires automated SCADA interlocks to trip inlet valves upon gas detection.'
  },
  {
    tags: ['iocl', 'jaipur', 'oil tank', 'fire', 'leak'],
    source: 'Refinery Incident Case Study: IOCL Jaipur Terminal Fire (2009)',
    content: 'On October 29, 2009, a massive fire occurred at the petrol storage terminal, resulting in 12 deaths and complete asset loss. The incident began when petrol was leaked from a valve stem during pipeline transfer. Root causes: (1) Failure of workers to monitor level gauge warnings, (2) Shift changeover coordination failure (poor manual handover), (3) No gas detectors to trip valves. Prevention highlights the need for continuous multi-agent correlation of SCADA metrics during transfers.'
  }
];

// ==========================================
// INITIALIZATION & EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScenarioSelector();
  initPermitAnalyzer();
  initRAGSearch();
  initEmergencyOrchestration();
  initAgentChat();
  initPitchDeck();
  
  // Set default scenario to load data
  loadScenario('routine');
});

// Sidebar Navigation Router
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.view-panel');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all buttons
      navButtons.forEach(b => b.classList.remove('active'));
      // Activate clicked
      btn.classList.add('active');
      
      // Hide all views
      views.forEach(v => v.classList.remove('active'));
      // Show targeted view
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
      
      state.activeView = target;
      
      // Re-trigger map layout redraw if going to command center
      if (target === 'view-command') {
        renderMap();
      }
    });
  });
}

// ==========================================
// SCENARIO LIFECYCLE MANAGEMENT
// ==========================================

function initScenarioSelector() {
  const select = document.getElementById('scenario-select');
  select.addEventListener('change', (e) => {
    loadScenario(e.target.value);
  });
}

function loadScenario(scenarioKey) {
  // If emergency is active and we change scenario, reset it
  if (state.emergencyActive && scenarioKey !== 'critical') {
    resetEmergencyState();
  }

  state.currentScenario = scenarioKey;
  const data = SCENARIOS[scenarioKey];
  
  // Update state parameters
  state.complianceScore = data.complianceScore;
  state.sensors = JSON.parse(JSON.stringify(data.sensors));
  state.permits = JSON.parse(JSON.stringify(data.permits));
  state.workers = JSON.parse(JSON.stringify(data.workers));
  state.alerts = JSON.parse(JSON.stringify(data.alerts));
  state.capaTasks = JSON.parse(JSON.stringify(data.capa));
  
  // Update UI Elements
  updateTopBar();
  updateAlertsFeed();
  updateTelemetryTable();
  updatePermitsTable();
  updateComplianceScorecard(data.compliance);
  updateCapaTasks();
  
  // Load mock chat history
  state.chatMessages = [
    { sender: 'System', time: '13:30', text: `Loaded Scenario: ${scenarioKey.toUpperCase()}` },
    ...JSON.parse(JSON.stringify(data.chat))
  ];
  renderChatMessages();

  // Redraw Geospatial Heatmap
  renderMap();
  
  // If moving into critical scenario, prompt safety officer
  if (scenarioKey === 'critical') {
    document.getElementById('nav-btn-emergency').click();
  }
}

// Update TOP Header Bar Telemetry
function updateTopBar() {
  const data = SCENARIOS[state.currentScenario];
  
  const riskVal = document.getElementById('val-risk-index');
  const riskInd = document.getElementById('ind-risk-index');
  
  riskVal.innerText = state.emergencyActive ? '98%' : data.riskIndex;
  riskVal.className = 'value ' + (state.emergencyActive ? 'risk-high' : data.riskClass);
  
  riskInd.className = 'indicator ' + (state.emergencyActive ? 'pulse-red' : data.riskIndicator);
  
  document.getElementById('val-active-permits').innerText = state.permits.length;
  document.getElementById('val-workers-count').innerText = state.workers.length;
  
  // Dynamic sensors display in ticker
  const h2sSensor = state.sensors.find(s => s.tag === 'Z1-H2S');
  const o2Sensor = state.sensors.find(s => s.tag === 'Z3-O2');
  
  document.getElementById('val-scada-o2').innerText = o2Sensor ? o2Sensor.value : '20.9%';
  
  const valH2s = document.getElementById('val-scada-h2s');
  valH2s.innerText = h2sSensor ? h2sSensor.value : '0.0 ppm';
  if (h2sSensor && h2sSensor.status !== 'OK') {
    valH2s.className = 'value ' + (h2sSensor.status === 'CRITICAL' ? 'red-text' : 'warning-text');
  } else {
    valH2s.className = 'value';
  }
}

// Update Alerts panel
function updateAlertsFeed() {
  const container = document.getElementById('alert-feed');
  const badge = document.getElementById('alerts-count-badge');
  
  container.innerHTML = '';
  
  const activeAlerts = state.emergencyActive 
    ? [
        {
          title: '🚨 ERO CONSOLE BROADCAST ACTIVATED',
          desc: 'Evacuation protocol in progress. Reformer Furnace ventilation failure + toxic leakage.',
          time: 'Active',
          severity: 'critical-alert',
          icon: '🚨',
          compliance: 'Emergency Protocol OISD-150 / Factory Act Sec 36'
        },
        ...state.alerts
      ]
    : state.alerts;

  badge.innerText = `${activeAlerts.length} Alerts`;
  if (activeAlerts.length > 0) {
    badge.className = 'badge danger-bg blink-alert';
    
    activeAlerts.forEach(alert => {
      const div = document.createElement('div');
      div.className = `alert-item ${alert.severity}`;
      div.innerHTML = `
        <span class="alert-icon">${alert.icon}</span>
        <div class="alert-details">
          <div class="alert-title">${alert.title}</div>
          <div class="alert-desc">${alert.desc}</div>
          <div class="alert-meta">
            <span class="alert-compliance">${alert.compliance}</span>
            <span class="alert-time">${alert.time}</span>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  } else {
    badge.className = 'badge';
    container.innerHTML = `
      <div class="empty-state">
        <p>No safety violations detected. Monitoring SCADA and PTW logs...</p>
      </div>
    `;
  }
}

// Update SCADA Sensor Table
function updateTelemetryTable() {
  const tbody = document.getElementById('telemetry-rows');
  tbody.innerHTML = '';
  
  state.sensors.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${s.id}</strong></td>
      <td>${s.location}</td>
      <td>${s.name}</td>
      <td class="${s.class}"><strong>${s.value}</strong></td>
      <td>${s.threshold}</td>
      <td><span class="badge ${s.status === 'OK' ? 'success-bg' : s.status === 'WARNING' ? 'warning-bg' : 'danger-bg'}">${s.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Update Permit List
function updatePermitsTable() {
  const tbody = document.getElementById('permit-rows');
  tbody.innerHTML = '';
  
  state.permits.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${p.id}</strong></td>
      <td>${p.type}</td>
      <td>${p.location}</td>
      <td>${p.auth}</td>
      <td><span class="badge ${p.risk === 'Low' ? 'success-bg' : p.risk === 'Medium' ? 'warning-bg' : 'danger-bg'}">${p.risk}</span></td>
      <td><span class="badge success-bg">${p.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Update Compliance status
function updateComplianceScorecard(compState) {
  const scoreBadge = document.getElementById('compliance-index-badge');
  const compIndex = state.complianceScore;
  
  scoreBadge.innerText = `${compIndex}% Compliant`;
  if (compIndex > 90) {
    scoreBadge.className = 'badge success-bg';
  } else if (compIndex > 75) {
    scoreBadge.className = 'badge warning-bg';
  } else {
    scoreBadge.className = 'badge danger-bg';
  }

  // Update specific checkpoints
  const ventCard = document.getElementById('comp-ventilation');
  const ventIcon = document.getElementById('comp-vent-icon');
  const ventDesc = document.getElementById('comp-vent-desc');

  if (compState.vent.passed) {
    ventCard.className = 'compliance-item passed';
    ventIcon.innerText = '✓';
    ventDesc.innerText = compState.vent.desc;
  } else {
    ventCard.className = 'compliance-item failed';
    ventIcon.innerText = '✗';
    ventDesc.innerText = compState.vent.desc;
  }

  const simopCard = document.getElementById('comp-simop');
  const simopIcon = document.getElementById('comp-simop-icon');
  const simopDesc = document.getElementById('comp-simop-desc');

  if (compState.simop.passed) {
    simopCard.className = 'compliance-item passed';
    simopIcon.innerText = '✓';
    simopDesc.innerText = compState.simop.desc;
  } else {
    simopCard.className = 'compliance-item failed';
    simopIcon.innerText = '✗';
    simopDesc.innerText = compState.simop.desc;
  }
}

// Update CAPA tasks checklist
function updateCapaTasks() {
  const container = document.getElementById('capa-tasks');
  const badge = document.getElementById('capa-count-badge');
  
  container.innerHTML = '';
  
  const openTasks = state.emergencyActive 
    ? [
        { id: 'CAPA-ERO', priority: 'Critical', title: 'Evacuate all personnel', desc: 'Active siren. Verify RFID tags safe in Control Assembly Room.', owner: 'Safety Officer', deadline: 'Immediate' },
        ...state.capaTasks
      ]
    : state.capaTasks;

  badge.innerText = `${openTasks.length} Open Tasks`;
  
  if (openTasks.length > 0) {
    badge.className = 'badge danger-bg';
    
    openTasks.forEach(task => {
      const card = document.createElement('div');
      card.className = `capa-task-card ${task.priority === 'Critical' || task.priority === 'High' ? 'high-prio' : 'med-prio'}`;
      card.innerHTML = `
        <div class="capa-header">
          <span>TASK ID: ${task.id}</span>
          <span class="badge ${task.priority === 'Critical' ? 'danger-bg blink-alert' : task.priority === 'High' ? 'danger-bg' : 'warning-bg'}">${task.priority}</span>
        </div>
        <div class="capa-body">
          <h4>${task.title}</h4>
          <p>${task.desc}</p>
        </div>
        <div class="capa-meta">
          <span>Assigned: <strong class="capa-owner">${task.owner}</strong></span>
          <span>Timeline: <strong>${task.deadline}</strong></span>
        </div>
      `;
      container.appendChild(card);
    });
  } else {
    badge.className = 'badge';
    container.innerHTML = `
      <div class="empty-state">
        <p>Plant compliance metrics are fully satisfied. No outstanding CAPA requirements.</p>
      </div>
    `;
  }
}

// ==========================================
// GEOSPATIAL HEATMAP DRAW CONTROLLER
// ==========================================

function renderMap() {
  const svg = document.getElementById('plant-layout');
  if (!svg) return;
  
  // Clear dynamic layers
  document.getElementById('map-glows').innerHTML = '';
  document.getElementById('map-sensors').innerHTML = '';
  document.getElementById('map-workers').innerHTML = '';
  document.getElementById('map-permits').innerHTML = '';

  const glowsGroup = document.getElementById('map-glows');
  const sensorsGroup = document.getElementById('map-sensors');
  const workersGroup = document.getElementById('map-workers');
  const permitsGroup = document.getElementById('map-permits');
  const evacGroup = document.getElementById('evacuation-routes');

  // 1. Reset zone colors on SVG
  const zones = ['zone-reformer', 'zone-piperack', 'zone-compressor', 'zone-storage', 'zone-controlroom'];
  zones.forEach(z => {
    const el = document.getElementById(z);
    if (el) el.className.baseVal = 'map-zone' + (z === 'zone-controlroom' ? ' safe-zone' : '');
  });

  // 2. Setup zone classifications based on active scenario/sensor values
  if (state.currentScenario === 'simop') {
    // Compressor deck has elevated readings & SIMOP conflict
    const compEl = document.getElementById('zone-compressor');
    if (compEl) compEl.className.baseVal = 'map-zone zone-warning';
    
    // Add warning glow overlay on map
    glowsGroup.innerHTML += `<circle cx="420" cy="320" r="110" fill="url(#permit-glow)" />`;
  } else if (state.currentScenario === 'critical' || state.emergencyActive) {
    // Reformer furnace is leaking toxic gas
    const refEl = document.getElementById('zone-reformer');
    if (refEl) refEl.className.baseVal = 'map-zone zone-danger';
    
    // Compressor or tank storage might be warnings
    const compEl = document.getElementById('zone-compressor');
    if (compEl) compEl.className.baseVal = 'map-zone zone-warning';

    // Danger glow overlay
    glowsGroup.innerHTML += `<circle cx="160" cy="170" r="140" fill="url(#hazard-glow)" />`;
  }

  // 3. Render SCADA sensors as map tags
  const sensorCoords = {
    'SN-101': { x: 160, y: 170 }, // Reformer Furnace
    'SN-102': { x: 220, y: 130 }, // H2S sensor on furnace rack
    'SN-103': { x: 500, y: 120 }, // Gas Pipe rack
    'SN-104': { x: 420, y: 320 }, // Compressor Deck
    'SN-105': { x: 360, y: 280 }  // Reformer Vessel
  };

  state.sensors.forEach(s => {
    const coords = sensorCoords[s.id];
    if (!coords) return;
    
    const color = s.status === 'OK' ? '#10b981' : s.status === 'WARNING' ? '#f59e0b' : '#ef4444';
    const isPulsing = s.status !== 'OK';
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'sensor-marker');
    g.setAttribute('id', `map-sensor-${s.id}`);
    
    // Tooltip details on hover
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${s.id}: ${s.name}\nReading: ${s.value}\nStatus: ${s.status}`;
    g.appendChild(title);

    // Glowing animation ring if warning/danger
    if (isPulsing) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', coords.x);
      ring.setAttribute('cy', coords.y);
      ring.setAttribute('r', '14');
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', color);
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('opacity', '0.8');
      
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animate.setAttribute('attributeName', 'r');
      animate.setAttribute('values', '6;22');
      animate.setAttribute('dur', '1.8s');
      animate.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(animate);
      
      const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateOpacity.setAttribute('attributeName', 'opacity');
      animateOpacity.setAttribute('values', '1;0');
      animateOpacity.setAttribute('dur', '1.8s');
      animateOpacity.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(animateOpacity);
      
      g.appendChild(ring);
    }

    // Core sensor dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', coords.x);
    dot.setAttribute('cy', coords.y);
    dot.setAttribute('r', '6');
    dot.setAttribute('fill', color);
    dot.setAttribute('stroke', '#fff');
    dot.setAttribute('stroke-width', '1.5');
    g.appendChild(dot);
    
    // Sensor Tag text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', coords.x);
    text.setAttribute('y', coords.y - 10);
    text.setAttribute('fill', '#fff');
    text.setAttribute('font-size', '8px');
    text.setAttribute('font-weight', '700');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = s.tag;
    g.appendChild(text);

    sensorsGroup.appendChild(g);
  });

  // 4. Render Active Permits on map
  const permitZones = {
    'Z-01': { x: 100, y: 220 },
    'Z-02': { x: 620, y: 120 },
    'Z-03': { x: 470, y: 380 },
    'Z-04': { x: 680, y: 380 }
  };

  state.permits.forEach(p => {
    const loc = p.location.split(' ')[0]; // E.g., "Z-03" from "Z-03 (Compressor)"
    const coords = permitZones[loc];
    if (!coords) return;
    
    const color = p.risk === 'Low' ? '#10b981' : p.risk === 'Medium' ? '#f59e0b' : '#ef4444';
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'permit-marker');
    
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${p.id} (${p.type})\nRisk: ${p.risk}\nApprover: ${p.auth}`;
    g.appendChild(title);

    // Render as a little glowing shield/badge
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', coords.x - 18);
    rect.setAttribute('y', coords.y - 8);
    rect.setAttribute('width', '36');
    rect.setAttribute('height', '14');
    rect.setAttribute('rx', '4');
    rect.setAttribute('fill', '#090d16');
    rect.setAttribute('stroke', color);
    rect.setAttribute('stroke-width', '1.5');
    g.appendChild(rect);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', coords.x);
    txt.setAttribute('y', coords.y + 2);
    txt.setAttribute('fill', color);
    txt.setAttribute('font-size', '6.5px');
    txt.setAttribute('font-weight', '900');
    txt.setAttribute('text-anchor', 'middle');
    txt.textContent = p.id.split('-')[2]; // get the number part
    g.appendChild(txt);

    permitsGroup.appendChild(g);
  });

  // 5. Render Workers (RFID tags)
  state.workers.forEach(w => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'worker-marker');
    g.setAttribute('transform', `translate(0, 0)`); // for transition
    
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `Worker: ${w.name}\nID: ${w.id}\nTask: ${w.task}`;
    g.appendChild(title);

    // Glowing marker core
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', w.x);
    circle.setAttribute('cy', w.y);
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', '#06b6d4');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '1');
    g.appendChild(circle);

    // Little collar initials
    const initials = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    initials.setAttribute('x', w.x);
    initials.setAttribute('y', w.y + 11);
    initials.setAttribute('fill', '#9ca3af');
    initials.setAttribute('font-size', '7px');
    initials.setAttribute('font-weight', '500');
    initials.setAttribute('text-anchor', 'middle');
    initials.textContent = w.name.split(' ').map(n=>n[0]).join('');
    g.appendChild(initials);

    workersGroup.appendChild(g);
  });

  // 6. Handle Evacuation Paths
  if (state.emergencyActive || state.currentScenario === 'critical') {
    evacGroup.classList.remove('hidden');
  } else {
    evacGroup.classList.add('hidden');
  }
}

// ==========================================
// DIGITAL PERMIT AUDITOR ENGINE
// ==========================================

function initPermitAnalyzer() {
  const form = document.getElementById('permit-analyzer-form');
  const resultPane = document.getElementById('permit-audit-results');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const type = document.getElementById('p-type').value;
    const location = document.getElementById('p-location').value;
    const workers = document.getElementById('p-workers').value;
    
    const gasCheck = document.getElementById('chk-gas').checked;
    const fireCheck = document.getElementById('chk-fire').checked;
    const lotoCheck = document.getElementById('chk-loto').checked;

    // Run dynamic compliance check logic
    let score = 100;
    const warnings = [];
    const recommendations = [];

    // Check 1: LOTO compliance
    if ((type === 'Cold Work' || type === 'Confined Space Entry') && !lotoCheck) {
      score -= 30;
      warnings.push(`Factory Act Sec 36 Violation: Lockout/Tagout (LOTO) isolation certificates are not attached for electrical/mechanical feeds.`);
      recommendations.push(`Immediately verify electrical breaker lock tags before submitting permit.`);
    }

    // Check 2: Gas Safety for Hot Work
    if (type === 'Hot Work') {
      if (!gasCheck) {
        score -= 40;
        warnings.push(`OISD-105 Violation: Hot work requested without pre-execution flammable gas checks.`);
        recommendations.push(`Instruct certified inspector to perform chemical sniffing at LEL boundaries.`);
      }
      
      if (!fireCheck) {
        score -= 20;
        warnings.push(`OISD-105 Clause 5.3: Fire watch personnel must be explicitly posted on target level.`);
        recommendations.push(`Assign dedicated fire-watch marshal equipped with dry-chemical fire extinguisher.`);
      }
    }

    // Check 3: Real-time SCADA check against requested zone
    const targetZoneSensors = state.sensors.filter(s => s.location === location);
    const toxicSensor = targetZoneSensors.find(s => s.status !== 'OK');
    
    if (toxicSensor) {
      score -= 50; // Heavily penalize SIMOPs conflict
      warnings.push(`CRITICAL SIMOPS CONFLICT: Plant sensor ${toxicSensor.tag} inside ${location} is reporting elevated levels (${toxicSensor.value}). Sparks or physical entry will cause explosive ignition/toxic poisoning.`);
      recommendations.push(`Halt permit approvals. Vent and purge lines in ${location} until SCADA indicator reads NORMAL.`);
    }

    // Check 4: Overlapping Permit check in same zone
    const overlapping = state.permits.filter(p => p.location.includes(location));
    if (overlapping.length > 0 && type === 'Hot Work') {
      score -= 25;
      warnings.push(`SIMOP Overlap Warning: Zone ${location} has ${overlapping.length} active permits. Operating hot welding near existing maintenance lines increases hazard compound factor.`);
      recommendations.push(`Coordinate joint toolbox talk with owners of ${overlapping.map(p=>p.id).join(', ')}.`);
    }

    // Ensure score doesn't drop below 0
    score = Math.max(0, score);
    
    // Render Results
    resultPane.classList.remove('hidden');
    resultPane.className = `permit-audit-pane ${score >= 80 ? 'success-bg' : score >= 50 ? 'warning-bg' : 'danger-bg'}`;
    
    let colorClass = score >= 80 ? 'green-text' : score >= 50 ? 'yellow-text' : 'red-text';
    
    resultPane.innerHTML = `
      <div class="audit-header">
        <h4>AI Compliance Audit Score</h4>
        <div class="audit-score-box ${score >= 80 ? 'success-bg' : score >= 50 ? 'warning-bg' : 'danger-bg'}">
          <span class="score">${score}/100</span>
          <span class="label">${score >= 80 ? 'APPROVED' : score >= 50 ? 'RE-CHECK' : 'REJECTED'}</span>
        </div>
      </div>
      
      ${warnings.length > 0 
        ? `<strong>Safety Discrepancies Found:</strong>
           <div class="audit-warnings-list">
             ${warnings.map(w => `<div class="audit-warning-item red-text">${w}</div>`).join('')}
           </div>`
        : `<p class="green-text">✓ No SIMOPs conflicts or statutory deviations found. Permit satisfies all OISD and Factory Act standards.</p>`
      }
      
      ${recommendations.length > 0 
        ? `<div style="margin-top:12px;">
             <strong>Required CAPA Actions:</strong>
             <ul style="padding-left:15px; font-size:0.8rem; margin-top:4px;" class="${colorClass}">
               ${recommendations.map(r => `<li>${r}</li>`).join('')}
             </ul>
           </div>`
        : ''
      }

      ${score >= 50 
        ? `<button type="button" class="btn primary-btn btn-full small-btn" style="margin-top:15px;" onclick="deployMockPermit('${type}', '${location}', ${workers}, ${score})">Authorize & Deploy Permit</button>`
        : `<button type="button" class="btn secondary-btn btn-full small-btn" style="margin-top:15px;" disabled>Authorization Blocked due to Red Risk</button>`
      }
    `;
  });
}

// Deploy permit from form into live tables & map
window.deployMockPermit = function(type, locationCode, workerCount, auditScore) {
  const newId = `PTW-2026-${Math.floor(Math.random() * 900) + 100}`;
  const zoneName = locationCode === 'Z-01' ? 'Furnace' : locationCode === 'Z-02' ? 'Pipe Rack' : locationCode === 'Z-03' ? 'Compressor' : 'Chemical Storage';
  const riskLabel = auditScore >= 80 ? 'Low' : 'Medium';
  const riskClass = auditScore >= 80 ? 'success-bg' : 'warning-bg';

  // Add to active permits
  state.permits.push({
    id: newId,
    type: type,
    location: `${locationCode} (${zoneName})`,
    auth: 'Chief Safety Officer (CSO)',
    risk: riskLabel,
    status: 'ACTIVE',
    class: riskClass
  });

  // Spawn new worker tags corresponding to permit
  const baseNames = ['J. Patel', 'M. Deshmukh', 'K. Murthy', 'V. Joshi'];
  const mapCoords = {
    'Z-01': { x: 140, y: 220 },
    'Z-02': { x: 550, y: 140 },
    'Z-03': { x: 460, y: 350 },
    'Z-04': { x: 710, y: 350 }
  };
  
  for(let i=0; i<Math.min(workerCount, 2); i++) {
    const coords = mapCoords[locationCode];
    state.workers.push({
      id: `W-M${Math.floor(Math.random() * 80) + 10}`,
      name: baseNames[i] || 'P. Lal',
      zone: locationCode,
      x: coords.x + (i * 20) - 10,
      y: coords.y + (i * 15) - 10,
      task: `PTW assigned: ${type}`
    });
  }

  // Reload views
  updateTopBar();
  updatePermitsTable();
  renderMap();

  // Add system alert info
  state.alerts.unshift({
    title: `Permit Authorized: ${newId}`,
    desc: `AI-approved ${type} initialized in ${locationCode}. Audit score: ${auditScore}/100. Workers dispatched.`,
    time: new Date().toLocaleTimeString(),
    severity: auditScore >= 80 ? 'warning-alert' : 'critical-alert', // color indicator
    icon: '📋',
    compliance: 'OISD-105 Standard Cleared'
  });
  updateAlertsFeed();

  // Reset form
  document.getElementById('permit-analyzer-form').reset();
  document.getElementById('permit-audit-results').classList.add('hidden');

  // Direct notification message
  alert(`Permit ${newId} authorized successfully. SCADA grids and worker tags deployed on layout map.`);
};

// ==========================================
// RAG RETRIEVAL ENGINE MOCKUP
// ==========================================

function initRAGSearch() {
  const btn = document.getElementById('rag-search-btn');
  const input = document.getElementById('rag-search-input');
  
  btn.addEventListener('click', () => {
    performRAGQuery(input.value);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performRAGQuery(input.value);
    }
  });
}

// Quick chip search shortcuts
window.quickQuery = function(text) {
  document.getElementById('rag-search-input').value = text;
  performRAGQuery(text);
};

function performRAGQuery(queryText) {
  if (!queryText.trim()) return;

  const steps = document.getElementById('rag-steps');
  const output = document.getElementById('rag-output');

  // Trigger animations
  output.innerHTML = '';
  steps.classList.remove('hidden');

  // Fake short latency for retrieving vector embeds
  setTimeout(() => {
    steps.classList.add('hidden');
    
    // Perform keyword filter matching across tags
    const queryWords = queryText.toLowerCase().split(/[\s,]+/);
    let matches = [];

    RAG_CORPUS.forEach(doc => {
      let score = 0;
      doc.tags.forEach(t => {
        queryWords.forEach(qw => {
          if (qw.length > 2 && (t.includes(qw) || doc.source.toLowerCase().includes(qw) || doc.content.toLowerCase().includes(qw))) {
            score++;
          }
        });
      });
      if (score > 0) {
        matches.push({ doc, score });
      }
    });

    // Sort by best score matching
    matches.sort((a,b) => b.score - a.score);

    if (matches.length === 0) {
      // Return a general fallback compliance compliance answer if no specific match
      output.innerHTML = `
        <div class="rag-response-section">
          <div class="rag-section-title">Query Synthesis (Suraksha Safety AI)</div>
          <p>No exact records found matching the query. However, cross-referencing with standard <strong>OISD-STD-105</strong> and <strong>Factory Act Section 36</strong> dictates that any physical plant modifications, confined entry, or welding must be preceded by active gas sniffing, chemical isolations, physical lockouts (LOTO), and local fire-watch marshalling. Always verify that sensor parameters in the SCADA feed read NORMAL before signing permit clearances.</p>
        </div>
      `;
      return;
    }

    // Found matches! Format output
    let synthesizedHtml = `<div class="rag-response-section"><div class="rag-section-title">AI Knowledge Synthesis</div><p>Based on your query, here is the consolidated legal & historical safety checklist:</p><ul style="margin: 10px 0 15px 20px; font-size: 0.85rem; line-height:1.5;">`;
    
    // Synthesize bullets from retrieved documents
    matches.forEach(m => {
      const doc = m.doc;
      if (doc.content.includes('LEL')) {
        synthesizedHtml += `<li><strong>LEL Margin:</strong> Hot work is strictly prohibited unless gas sensors verify 0% LEL. Covering of drain basins within 15 meters is mandatory.</li>`;
      }
      if (doc.content.includes('confined space') || doc.content.includes('Section 36')) {
        synthesizedHtml += `<li><strong>Confined Space Protocol:</strong> Section 36 of the Factory Act requires written atmosphere analysis validation, continuous extraction fans ventilation, and harness lifelines overseen by an external supervisor.</li>`;
      }
      if (doc.content.includes('H2S')) {
        synthesizedHtml += `<li><strong>H2S Tolerances:</strong> Max continuous threshold is 10 ppm (8-hr TWA) and 15 ppm (STEL). Immediate lockdown of process streams is statutory if gas limits cross 20 ppm.</li>`;
      }
      if (doc.content.includes('HPCL')) {
        synthesizedHtml += `<li><strong>Historical Risk (HPCL 1997):</strong> Multi-operations conflict (unloading during maintenance) combined with lag in alarm sirens caused a catastrophic vapor cloud explosion. Highlights importance of immediate siren triggers and automated SCADA lock valves.</li>`;
      }
      if (doc.content.includes('Jaipur')) {
        synthesizedHtml += `<li><strong>Historical Risk (IOCL Jaipur 2009):</strong> Misaligned manual handovers during shift changeovers led to missed valve leaks. Emphasizes the need for continuous digital permit verification.</li>`;
      }
    });

    synthesizedHtml += `</ul></div>`;

    // Add Document citations
    synthesizedHtml += `
      <div class="citations-list">
        <strong>Retrieved Source Reference Documents (Vector Store matches):</strong>
        ${matches.map(m => `
          <div class="citation-card">
            <span class="cit-source">${m.doc.source}</span>
            <p style="color:#9ca3af; font-size:0.75rem;">"${m.doc.content}"</p>
          </div>
        `).join('')}
      </div>
    `;

    output.innerHTML = synthesizedHtml;

  }, 1200);
}

// ==========================================
// EMERGENCY RESPONSE ORCHESTRATOR FLOW
// ==========================================

function initEmergencyOrchestration() {
  const triggerBtn = document.getElementById('btn-trigger-emergency');
  const resetBtn = document.getElementById('btn-reset-emergency');
  const timeline = document.getElementById('ero-steps-timeline');

  triggerBtn.addEventListener('click', () => {
    activateEmergencyOrchestrator();
  });

  resetBtn.addEventListener('click', () => {
    resetEmergencyState();
  });
}

function activateEmergencyOrchestrator() {
  state.emergencyActive = true;
  
  // 1. Show flashing overlay
  const overlay = document.getElementById('alarm-overlay');
  const overlayDesc = document.getElementById('alarm-banner-desc');
  const type = document.getElementById('evac-trigger-type').value;
  
  overlayDesc.innerText = `${type} has tripped critical thresholds. System isolating inlet lines and initiating worker evacuation.`;
  overlay.classList.remove('hidden');

  // Flash siren overlay then close overlay automatically in 4.5 seconds so user can see dashboard
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 4500);

  // 2. Adjust safety buttons
  document.getElementById('btn-trigger-emergency').classList.add('hidden');
  document.getElementById('btn-reset-emergency').classList.remove('hidden');
  document.getElementById('critical-alert-sidebar').classList.remove('hidden');

  // 3. Enable download & PDF report print actions
  document.getElementById('btn-download-scada').disabled = false;
  document.getElementById('btn-print-report').disabled = false;
  document.getElementById('recovery-badge').innerText = 'CRITICAL REPORT READY';
  document.getElementById('recovery-badge').className = 'badge danger-bg';

  // 4. Update status labels to emergency
  state.complianceScore = 64; // drops compliance score
  updateTopBar();
  renderMap(); // light up evac routes

  // 5. Trigger Step-by-Step ERO Log execution timeline
  const timeline = document.getElementById('ero-steps-timeline');
  timeline.classList.remove('hidden');
  
  const steps = document.querySelectorAll('.t-step');
  steps.forEach(s => s.classList.remove('active')); // Reset active steps
  
  steps.forEach((step, idx) => {
    setTimeout(() => {
      step.classList.add('active');
      // Scroll to bottom of timeline
      step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, idx * 1000);
  });

  // 6. Pre-populate Factory Act Form 18 accident report template
  document.getElementById('report-datetime').innerText = new Date().toLocaleString();
  document.getElementById('report-occurrence').innerText = type;
  document.getElementById('report-workers').innerText = `${state.workers.length} workers successfully cleared via RFID reader boundaries.`;
  document.getElementById('report-remediation').innerText = 'Fuel inlet lock valves (RSV-301, RSV-302) isolated. Evacuation horn broadcasted. Safety dispatcher SMS dispatched.';

  // 7. Add critical warning to alerts feed
  updateAlertsFeed();

  // Setup download click handlers
  document.getElementById('btn-download-scada').onclick = () => {
    downloadScadaPreservationFile();
  };

  document.getElementById('btn-print-report').onclick = () => {
    printAccidentReport();
  };
}

function resetEmergencyState() {
  state.emergencyActive = false;
  
  // Hide overlays and logs
  document.getElementById('alarm-overlay').classList.add('hidden');
  document.getElementById('btn-trigger-emergency').classList.remove('hidden');
  document.getElementById('btn-reset-emergency').classList.add('hidden');
  document.getElementById('critical-alert-sidebar').classList.add('hidden');
  document.getElementById('ero-steps-timeline').classList.add('hidden');

  // Disable download buttons
  document.getElementById('btn-download-scada').disabled = true;
  document.getElementById('btn-print-report').disabled = true;
  document.getElementById('recovery-badge').innerText = 'Monitoring';
  document.getElementById('recovery-badge').className = 'badge';

  // Restore routine or selected scenario parameters
  loadScenario(state.currentScenario);
}

// Generate file download of SCADA logs snapshot (forensic compliance)
function downloadScadaPreservationFile() {
  const logData = {
    incident: document.getElementById('evac-trigger-type').value,
    timestamp: new Date().toISOString(),
    occupier: "Suraksha Heavy Chemical Corp Ltd.",
    sealedBy: "Safety Intelligence Agent Node 4 (Emergency Orchestrator)",
    sensorsRecord: state.sensors,
    activeWorkersSnapshot: state.workers,
    activePermitsSnapshot: state.permits
  };

  const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `SCADA_Preservation_Lockdown_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Print accident report Form 18 in custom printable window
function printAccidentReport() {
  const content = document.getElementById('form18-content').innerHTML;
  
  const w = window.open('', '_blank', 'width=800,height=600');
  w.document.write(`
    <html>
      <head>
        <title>Factory Act Accident Notice - print out</title>
        <style>
          body { font-family: 'Courier New', Courier, monospace; padding: 40px; color: #000; background: #fff; line-height:1.5; }
          .form-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
          .form-body { display: flex; flex-direction: column; gap: 15px; }
          .form-row { display: flex; border-bottom: 1px dashed #ccc; padding-bottom: 8px; }
          .f-label { font-weight: bold; width: 250px; }
          .f-val { color: #000; }
          .form18-watermark { display:none; }
          @media print {
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="text-align:right; margin-bottom:20px;">
          <button onclick="window.print()">Print Document</button>
        </div>
        ${content}
      </body>
    </html>
  `);
  w.document.close();
}

// ==========================================
// INTERACTIVE AGENTS CHAT CONSOLE
// ==========================================

function initAgentChat() {
  const sendBtn = document.getElementById('btn-chat-send');
  const chatInput = document.getElementById('chat-input');

  sendBtn.addEventListener('click', () => {
    handleChatSubmit();
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleChatSubmit();
    }
  });
}

function handleChatSubmit() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  // Add user message to chat
  state.chatMessages.push({
    sender: 'Safety Officer (You)',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: text,
    isUser: true
  });

  renderChatMessages();
  input.value = '';

  // Trigger agent logic response
  triggerAgentReasoning(text);
}

function renderChatMessages() {
  const box = document.getElementById('chat-messages-box');
  box.innerHTML = '';

  state.chatMessages.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${msg.isUser ? 'user-msg' : 'agent-msg'}`;
    
    // Assign specific styling border colors depending on agent sender
    if (!msg.isUser) {
      if (msg.sender.includes('SCADA')) bubble.style.borderLeft = '3px solid var(--secondary)';
      if (msg.sender.includes('PTW')) bubble.style.borderLeft = '3px solid var(--color-warning)';
      if (msg.sender.includes('Compliance')) bubble.style.borderLeft = '3px solid var(--primary)';
      if (msg.sender.includes('Response')) bubble.style.borderLeft = '3px solid var(--color-danger)';
    }

    bubble.innerHTML = `
      <div class="meta">
        <span class="msg-sender">${msg.sender}</span>
        <span class="msg-time">${msg.time}</span>
      </div>
      <div class="msg-text">${msg.text}</div>
    `;
    box.appendChild(bubble);
  });

  // Auto scroll to bottom
  box.scrollTop = box.scrollHeight;
}

function triggerAgentReasoning(userQuery) {
  const box = document.getElementById('chat-messages-box');
  
  // Show typing loader item
  const loader = document.createElement('div');
  loader.className = 'chat-bubble agent-msg';
  loader.id = 'chat-typing-loader';
  loader.innerHTML = `<span style="font-style:italic;" class="animate-evac">Safety Agents consulting...</span>`;
  box.appendChild(loader);
  box.scrollTop = box.scrollHeight;

  const queryLower = userQuery.toLowerCase();
  
  // Formulate response coordinates
  setTimeout(() => {
    // Remove loader
    const l = document.getElementById('chat-typing-loader');
    if (l) l.remove();

    let responses = [];

    // Scenario context routing
    if (queryLower.includes('status') || queryLower.includes('sensor') || queryLower.includes('scada')) {
      const activeWarning = state.sensors.find(s => s.status !== 'OK');
      responses.push({
        sender: 'SCADA Agent',
        text: activeWarning 
          ? `I am logging alerts on sensor ${activeWarning.tag} at ${activeWarning.location}. Telemetry is currently reading ${activeWarning.value} (Target threshold: ${activeWarning.threshold}). All other transceivers nominal.`
          : `All 5 SCADA streams are reporting normal. Furnace temperature is stable at 425°C, oxygen concentration at 20.9%, and toxic lines at 0.0 ppm.`
      });
    }
    
    else if (queryLower.includes('permit') || queryLower.includes('work') || queryLower.includes('simop')) {
      responses.push({
        sender: 'PTW Agent',
        text: `Active Permit Registry check complete: ${state.permits.length} authorization codes currently open. ${
          state.currentScenario === 'simop' 
            ? 'WARNING: Simultaneous Operations conflict detected in Zone 03. Hot Welding is overlapping with high-density SCADA gas sensors.'
            : 'No SIMOP perimeter violations recorded.'
        }`
      });
    }

    else if (queryLower.includes('compliance') || queryLower.includes('factory act') || queryLower.includes('law')) {
      responses.push({
        sender: 'Compliance Agent',
        text: `Safety Score Index: ${state.complianceScore}%. ${
          state.complianceScore < 90 
            ? `We have flagged compliance gaps on checkpoint standards. CAPA ticket issued to isolate active work permit lines in target zones.`
            : `Operation conforms to OISD-105 Permit isolations and Factory Act Clause 36/37 guidelines.`
        }`
      });
    }

    else if (queryLower.includes('emergency') || queryLower.includes('evacuate') || queryLower.includes('siren')) {
      responses.push({
        sender: 'Response Agent',
        text: `Evacuation Orchestrator state is: ${state.emergencyActive ? 'ACTIVE (evacuation routes rendered)' : 'STANDBY'}. Ready to loop PA speakers and seal SCADA logs if triggered.`
      });
    }

    else {
      // General agent dialogue
      responses.push({
        sender: 'Compliance Agent',
        text: `I have scanned our safety OISD directive Vector database. I can assist with auditing digital work permits, retrieving regulatory standards, or checking plant compliance statuses.`
      });
      responses.push({
        sender: 'SCADA Agent',
        text: `I can detail real-time sensor streams and RFID worker coordinates. Let me know if you require sensor tags parameters.`
      });
    }

    // Append mock responses with short delays to look organic
    responses.forEach((res, index) => {
      setTimeout(() => {
        state.chatMessages.push({
          sender: res.sender,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: res.text,
          isUser: false
        });
        renderChatMessages();
      }, index * 400);
    });

  }, 1000);
}

// ==========================================
// PITCH DECK & SLIDESHOW MODULE
// ==========================================

function initPitchDeck() {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('btn-prev-slide');
  const nextBtn = document.getElementById('btn-next-slide');
  const numLabel = document.getElementById('slide-number');

  function showSlide(num) {
    slides.forEach(s => s.classList.remove('active'));
    
    const target = document.querySelector(`.slide[data-slide="${num}"]`);
    if (target) {
      target.classList.add('active');
      state.currentSlide = num;
      numLabel.innerText = `${num} / ${slides.length}`;
    }
  }

  prevBtn.addEventListener('click', () => {
    let nextNum = state.currentSlide - 1;
    if (nextNum < 1) nextNum = slides.length;
    showSlide(nextNum);
  });

  nextBtn.addEventListener('click', () => {
    let nextNum = state.currentSlide + 1;
    if (nextNum > slides.length) nextNum = 1;
    showSlide(nextNum);
  });

  // Pitch Deck Tab toggle logic
  const tabs = document.querySelectorAll('[data-deck-tab]');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');

      const contentId = t.getAttribute('data-deck-tab');
      document.querySelectorAll('.deck-tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(contentId).classList.add('active');
    });
  });
}
