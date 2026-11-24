/**
 * Hardware-Inspired SVG Schematics for Project Cards
 * All visuals use CSS theme variables so they adapt seamlessly to Dark & Light modes.
 */

export function getProjectVisualSvg(visualType = "generic", repoTitle = "Project") {
  switch (visualType) {
    case "riscv":
      return `
        <svg viewBox="0 0 460 250" aria-hidden="true">
          <defs>
            <pattern id="rv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--svg-stroke)" stroke-opacity="0.25" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="460" height="250" fill="url(#rv-grid)"/>

          <!-- Bus wires -->
          <path d="M 88 122 H 116 M 184 122 H 214 M 292 108 H 316 M 292 138 H 316 M 384 122 H 410" stroke="var(--accent)" stroke-width="2" fill="none" class="wave-animate"/>
          <path d="M 150 74 V 96 M 253 74 V 92 M 350 74 V 96" stroke="var(--emerald)" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
          <path d="M 410 122 V 196 H 54 V 154" stroke="var(--cyan)" stroke-width="1.6" fill="none" stroke-opacity="0.75"/>

          <!-- Control Unit -->
          <rect x="128" y="42" width="244" height="32" rx="6" fill="var(--svg-node)" stroke="var(--emerald)" stroke-width="1.6"/>
          <text x="250" y="62" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="var(--emerald)">CONTROL UNIT + SVA ASSERTIONS</text>

          <!-- PC -->
          <rect x="26" y="96" width="62" height="58" rx="6" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.5"/>
          <text x="57" y="122" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--svg-text)">PC</text>
          <text x="57" y="138" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">3-WAY MUX</text>

          <!-- RegFile -->
          <rect x="116" y="96" width="68" height="58" rx="6" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.5"/>
          <text x="150" y="120" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--svg-text)">REGFILE</text>
          <text x="150" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">32×32-BIT</text>

          <!-- ALU -->
          <polygon points="214,88 292,102 292,146 214,160 214,132 226,124 214,116" fill="var(--svg-node)" stroke="var(--accent)" stroke-width="1.8"/>
          <text x="258" y="128" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--accent)">ALU</text>

          <!-- Data Memory -->
          <rect x="316" y="96" width="68" height="58" rx="6" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.5"/>
          <text x="350" y="120" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--svg-text)">DMEM</text>
          <text x="350" y="136" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">LB/LH/LW</text>

          <!-- Footer annotation -->
          <text x="230" y="218" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="var(--svg-muted)">WRITEBACK &amp; BRANCH FEEDBACK BUS [31:0]</text>
        </svg>
      `;

    case "siliconlog":
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <rect x="24" y="42" width="372" height="142" rx="10" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.4"/>
          <!-- 95°C threshold line -->
          <line x1="42" y1="82" x2="378" y2="82" stroke="#ef4444" stroke-width="1.3" stroke-dasharray="5 4"/>
          <text x="46" y="75" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="8.5" fill="#ef4444">THERMAL LIMIT 95°C</text>

          <!-- Thermal trace -->
          <path d="M 44 156 L 88 142 L 132 130 L 176 112 L 220 120 L 264 96 L 308 72 L 352 104 L 376 114" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round"/>
          <circle cx="308" cy="72" r="5" fill="#ef4444"/>
          <text x="308" y="61" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700" fill="#ef4444">CORNER FAIL</text>

          <!-- Unit coverage bars -->
          <g font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--svg-muted)">
            <text x="46" y="175">ALU 98%</text>
            <text x="128" y="175">FPU 94%</text>
            <text x="210" y="175">DDR 96%</text>
            <text x="292" y="175">PCIe 92%</text>
          </g>
          <rect x="46" y="160" width="60" height="4" rx="2" fill="var(--emerald)"/>
          <rect x="128" y="160" width="54" height="4" rx="2" fill="var(--emerald)"/>
          <rect x="210" y="160" width="58" height="4" rx="2" fill="var(--cyan)"/>
          <rect x="292" y="160" width="52" height="4" rx="2" fill="var(--accent)"/>
        </svg>
      `;

    case "snake":
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <rect x="34" y="42" width="352" height="142" rx="8" fill="#07120c" stroke="var(--emerald)" stroke-opacity="0.55" stroke-width="1.6"/>
          <!-- VGA text cells grid -->
          <g stroke="#10b981" stroke-opacity="0.14" stroke-width="1">
            <line x1="34" y1="70" x2="386" y2="70"/>
            <line x1="34" y1="98" x2="386" y2="98"/>
            <line x1="34" y1="126" x2="386" y2="126"/>
            <line x1="34" y1="154" x2="386" y2="154"/>
          </g>
          <!-- Snake body blocks -->
          <rect x="92" y="114" width="18" height="18" rx="3" fill="#059669"/>
          <rect x="114" y="114" width="18" height="18" rx="3" fill="#059669"/>
          <rect x="136" y="114" width="18" height="18" rx="3" fill="#10b981"/>
          <rect x="158" y="114" width="18" height="18" rx="3" fill="#10b981"/>
          <rect x="158" y="92" width="18" height="18" rx="3" fill="#34d399"/>
          <rect x="180" y="92" width="18" height="18" rx="3" fill="#6ee7b7"/>
          <!-- Food -->
          <rect x="268" y="92" width="18" height="18" rx="4" fill="#f59e0b"/>
          <text x="50" y="61" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#34d399">SEG 0B800h :: INT 1Ch :: PORT 0x60</text>
          <text x="50" y="173" font-family="JetBrains Mono, monospace" font-size="8.5" fill="#6ee7b7">REAL-MODE 16-BIT x86 ENGINE</text>
        </svg>
      `;

    case "cache":
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <!-- Address decomposition bar -->
          <rect x="38" y="48" width="146" height="30" rx="5" fill="var(--svg-node)" stroke="var(--accent)" stroke-width="1.5"/>
          <text x="111" y="67" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--accent)">TAG [31:12]</text>
          <rect x="188" y="48" width="104" height="30" rx="5" fill="var(--svg-node)" stroke="var(--cyan)" stroke-width="1.5"/>
          <text x="240" y="67" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--cyan)">INDEX [11:6]</text>
          <rect x="296" y="48" width="86" height="30" rx="5" fill="var(--svg-node)" stroke="var(--emerald)" stroke-width="1.5"/>
          <text x="339" y="67" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--emerald)">OFF [5:0]</text>

          <!-- Arrows down -->
          <path d="M 111 78 V 104 M 240 78 V 104" stroke="var(--svg-stroke)" stroke-width="1.6"/>

          <!-- Set associative cache ways -->
          <rect x="38" y="106" width="166" height="72" rx="8" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.4"/>
          <text x="52" y="126" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="var(--svg-text)">WAY 0 · LRU=0</text>
          <text x="52" y="146" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--emerald)">V=1  TAG=0x4F2A  [HIT]</text>
          <text x="52" y="164" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--svg-muted)">V=1  TAG=0x10B8</text>

          <rect x="216" y="106" width="166" height="72" rx="8" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.4"/>
          <text x="230" y="126" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="var(--svg-text)">WAY 1 · LRU=1</text>
          <text x="230" y="146" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--svg-muted)">V=1  TAG=0x8C01</text>
          <text x="230" y="164" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--accent)">EVICT CANDIDATE</text>
        </svg>
      `;

    case "robdd":
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <!-- Edges: solid = high (1), dashed = low (0) -->
          <line x1="210" y1="62" x2="146" y2="108" stroke="var(--svg-muted)" stroke-width="1.7" stroke-dasharray="4 3"/>
          <line x1="210" y1="62" x2="274" y2="108" stroke="var(--accent)" stroke-width="2"/>
          <line x1="146" y1="108" x2="146" y2="164" stroke="var(--svg-muted)" stroke-width="1.7" stroke-dasharray="4 3"/>
          <line x1="146" y1="108" x2="274" y2="164" stroke="var(--emerald)" stroke-width="1.9"/>
          <line x1="274" y1="108" x2="146" y2="164" stroke="var(--svg-muted)" stroke-width="1.7" stroke-dasharray="4 3"/>
          <line x1="274" y1="108" x2="274" y2="164" stroke="var(--emerald)" stroke-width="2"/>

          <!-- Decision nodes -->
          <circle cx="210" cy="62" r="18" fill="var(--svg-node)" stroke="var(--accent)" stroke-width="2"/>
          <text x="210" y="66" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--svg-text)">x₁</text>

          <circle cx="146" cy="110" r="17" fill="var(--svg-node)" stroke="var(--cyan)" stroke-width="1.8"/>
          <text x="146" y="114" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--svg-text)">x₂</text>

          <circle cx="274" cy="110" r="17" fill="var(--svg-node)" stroke="var(--cyan)" stroke-width="1.8"/>
          <text x="274" y="114" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--svg-text)">x₃</text>

          <!-- Terminal boxes -->
          <rect x="128" y="152" width="36" height="28" rx="5" fill="var(--svg-node)" stroke="var(--svg-stroke)" stroke-width="1.6"/>
          <text x="146" y="170" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--svg-muted)">0</text>

          <rect x="256" y="152" width="36" height="28" rx="5" fill="var(--svg-node)" stroke="var(--emerald)" stroke-width="1.8"/>
          <text x="274" y="170" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="var(--emerald)">1</text>

          <text x="36" y="182" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">--- LOW (0)   ─── HIGH (1)</text>
        </svg>
      `;

    case "garminbot":
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <!-- Pipeline arrows -->
          <path d="M 118 112 H 154 M 266 112 H 302" stroke="var(--violet)" stroke-width="2" class="wave-animate"/>
          <path d="M 210 144 V 164" stroke="var(--emerald)" stroke-width="1.8"/>

          <!-- Garmin Telemetry Node -->
          <rect x="24" y="80" width="94" height="64" rx="9" fill="var(--svg-node)" stroke="var(--cyan)" stroke-width="1.6"/>
          <text x="71" y="106" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--cyan)">FENIX 8</text>
          <text x="71" y="124" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">HRV · SPLITS</text>

          <!-- Gemini Agent Node -->
          <rect x="154" y="72" width="112" height="72" rx="10" fill="var(--svg-node)" stroke="var(--accent)" stroke-width="1.8"/>
          <text x="210" y="102" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="var(--accent)">GEMINI AI</text>
          <text x="210" y="120" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">TOOL AGENT</text>
          <text x="210" y="133" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7.5" fill="var(--emerald)">AUTO-SLEEP</text>

          <!-- Telegram Output Node -->
          <rect x="302" y="80" width="94" height="64" rx="9" fill="var(--svg-node)" stroke="var(--violet)" stroke-width="1.6"/>
          <text x="349" y="106" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="var(--violet)">TELEGRAM</text>
          <text x="349" y="124" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">COACH CHAT</text>

          <!-- SQLite + GH Actions footer pill -->
          <rect x="128" y="164" width="164" height="24" rx="6" fill="var(--svg-node)" stroke="var(--emerald)" stroke-width="1.3"/>
          <text x="210" y="180" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8.5" fill="var(--emerald)">SQLITE MEMORY · GH ACTIONS</text>
        </svg>
      `;

    default: {
      const safeLabel = String(repoTitle || "MODULE").slice(0, 22).toUpperCase();
      return `
        <svg viewBox="0 0 420 210" aria-hidden="true">
          <rect x="64" y="56" width="292" height="108" rx="10" fill="var(--svg-node)" stroke="var(--cyan)" stroke-width="1.6"/>
          <path d="M 36 86 H 64 M 36 110 H 64 M 36 134 H 64 M 356 86 H 384 M 356 110 H 384 M 356 134 H 384" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
          <text x="210" y="106" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="var(--svg-text)">${escapeXml(safeLabel)}</text>
          <text x="210" y="130" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="var(--svg-muted)">SYNCED GITHUB REPOSITORY</text>
        </svg>
      `;
    }
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
