/**
 * Hardware-Inspired SVG Schematics & Interactive Hero Logic Analyzer
 * All visuals use CSS theme variables so they adapt seamlessly to Dark & Light modes.
 */

export const waveformPresets = {
  riscv: {
    caption: "RV32I Single-Cycle: Fetch → Decode → ALU → Writeback",
    badge: "SVA: 100% PASS",
    badgeTone: "emerald",
    channels: [
      {
        label: "CLK",
        color: "var(--text-muted)",
        path: "M 92 28 L 116 28 L 116 12 L 140 12 L 140 28 L 164 28 L 164 12 L 188 12 L 188 28 L 212 28 L 212 12 L 236 12 L 236 28 L 260 28 L 260 12 L 284 12 L 284 28 L 308 28 L 308 12 L 332 12 L 332 28 L 356 28 L 356 12 L 380 12 L 380 28 L 410 28",
        type: "signal",
      },
      {
        label: "INSTR[31:0]",
        color: "var(--accent)",
        blocks: [
          { x: 92, w: 96, text: "LW x5,0(x2)" },
          { x: 188, w: 96, text: "SRA x6,x5,2" },
          { x: 284, w: 126, text: "BEQ x6,x0,+16" },
        ],
        type: "bus",
      },
      {
        label: "ALU_OP",
        color: "var(--cyan)",
        blocks: [
          { x: 92, w: 96, text: "ADD (EA)" },
          { x: 188, w: 96, text: ">>> SIGNED" },
          { x: 284, w: 126, text: "SUB (ZERO=1)" },
        ],
        type: "bus",
      },
      {
        label: "SVA_SAFE",
        color: "var(--emerald)",
        path: "M 92 24 L 112 12 L 410 12",
        note: "!(MemRead && MemWrite)",
        type: "signal",
      },
    ],
  },
  sva: {
    caption: "Fault Injection Proof: check_store_logic & check_sra",
    badge: "FAULT CAUGHT",
    badgeTone: "amber",
    channels: [
      {
        label: "OPCODE",
        color: "var(--accent)",
        blocks: [
          { x: 92, w: 110, text: "SW (0100011)" },
          { x: 202, w: 100, text: "FIX GOLDEN" },
          { x: 302, w: 108, text: "SRA (0110011)" },
        ],
        type: "bus",
      },
      {
        label: "RegWrite",
        color: "var(--violet)",
        path: "M 92 28 L 122 28 L 122 12 L 194 12 L 194 28 L 310 28 L 310 12 L 410 12",
        type: "signal",
      },
      {
        label: "ASSERT_ERR",
        color: "#ef4444",
        path: "M 92 28 L 126 28 L 126 12 L 194 12 L 194 28 L 410 28",
        note: "BUG CAUGHT @ t=12ns",
        type: "signal",
      },
      {
        label: "COVERAGE",
        color: "var(--emerald)",
        blocks: [
          { x: 92, w: 110, text: "INJECTED" },
          { x: 202, w: 100, text: "REVERTED" },
          { x: 302, w: 108, text: "100% PROVED" },
        ],
        type: "bus",
      },
    ],
  },
  x86: {
    caption: "Real-Mode x86: INT 1Ch ISR → Port 0x60 → VGA 0B800h",
    badge: "BARE-METAL",
    badgeTone: "cyan",
    channels: [
      {
        label: "INT 1Ch",
        color: "var(--accent)",
        path: "M 92 28 L 136 28 L 136 12 L 154 12 L 154 28 L 244 28 L 244 12 L 262 12 L 262 28 L 352 28 L 352 12 L 370 12 L 370 28 L 410 28",
        type: "signal",
      },
      {
        label: "PORT 0x60",
        color: "var(--cyan)",
        blocks: [
          { x: 92, w: 104, text: "SCAN 0x11 (W)" },
          { x: 196, w: 106, text: "SCAN 0x20 (D)" },
          { x: 302, w: 108, text: "IDLE POLL" },
        ],
        type: "bus",
      },
      {
        label: "VRAM B800h",
        color: "var(--emerald)",
        blocks: [
          { x: 92, w: 152, text: "OFF=Y*160+X*2" },
          { x: 244, w: 166, text: "WRITE CELL+ATTR" },
        ],
        type: "bus",
      },
      {
        label: "CMOS 0x70",
        color: "var(--violet)",
        blocks: [
          { x: 92, w: 130, text: "READ RTC" },
          { x: 222, w: 188, text: "PRNG SEED READY" },
        ],
        type: "bus",
      },
    ],
  },
};

export function renderHeroWaveform(container, presetKey = "riscv") {
  const preset = waveformPresets[presetKey] || waveformPresets.riscv;
  const rowHeight = 46;
  const startY = 18;
  const width = 430;
  const height = startY + preset.channels.length * rowHeight + 16;

  // Vertical time grid markers
  const gridCols = [92, 145, 198, 251, 304, 357, 410];
  const gridSvg = gridCols
    .map(
      (x, idx) => `
      <line x1="${x}" y1="8" x2="${x}" y2="${height - 16}" stroke="var(--svg-stroke)" stroke-opacity="0.45" stroke-dasharray="2 3" />
      <text x="${x}" y="${height - 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="var(--svg-muted)">${idx * 10}ns</text>
    `
    )
    .join("");

  const rowsSvg = preset.channels
    .map((ch, idx) => {
      const y = startY + idx * rowHeight;
      let traceSvg = "";

      if (ch.type === "signal") {
        traceSvg = `
          <g transform="translate(0, ${y})">
            <path d="${ch.path}" fill="none" stroke="${ch.color}" stroke-width="2" stroke-linejoin="round" />
            ${
              ch.note
                ? `<text x="255" y="25" font-family="JetBrains Mono, monospace" font-size="8.5" fill="${ch.color}">${ch.note}</text>`
                : ""
            }
          </g>
        `;
      } else {
        traceSvg = ch.blocks
          .map((b) => {
            const x1 = b.x;
            const x2 = b.x + b.w;
            const d = `M ${x1} ${y + 20} L ${x1 + 6} ${y + 10} L ${x2 - 6} ${y + 10} L ${x2} ${y + 20} L ${x2 - 6} ${y + 30} L ${x1 + 6} ${y + 30} Z`;
            return `
              <path d="${d}" fill="var(--svg-node)" stroke="${ch.color}" stroke-width="1.5" />
              <text x="${x1 + b.w / 2}" y="${y + 23}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="600" fill="var(--svg-text)">${b.text}</text>
            `;
          })
          .join("");
      }

      return `
        <text x="8" y="${y + 23}" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="600" fill="${ch.color}">${ch.label}</text>
        <line x1="92" y1="${y + 36}" x2="410" y2="${y + 36}" stroke="var(--svg-stroke)" stroke-opacity="0.25" />
        ${traceSvg}
      `;
    })
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${preset.caption}">
      ${gridSvg}
      <line class="scope-scanline" x1="251" y1="8" x2="251" y2="${height - 16}" stroke="var(--accent)" stroke-width="1.2" />
      ${rowsSvg}
    </svg>
  `;

  return preset;
}

/**
 * Project Card Architectural Schematics
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
