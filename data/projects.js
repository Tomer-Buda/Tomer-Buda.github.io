/**
 * Curated Projects Registry
 * -------------------------
 * Each entry enriches a GitHub repository (or adds a standalone/private project)
 * with architecture highlights, module breakdowns, visuals, and evidence images.
 *
 * To add a new project manually, copy the template block at the bottom of this file
 * and append it to the `curatedProjects` array.
 *
 * Note: Public GitHub repositories pushed in the future are also auto-discovered
 * automatically when `siteConfig.githubSync.autoDiscoverNewRepos` is enabled.
 */

export const curatedProjects = [
  {
    id: "RISC-V-CPU",
    repoName: "RISC-V-CPU",
    title: "Single-Cycle RISC-V Processor & Formal Verification",
    shortTag: "RV32I CORE · RTL + SVA",
    category: "rtl",
    featured: true,
    visibility: "public",
    githubUrl: "https://github.com/Tomer-Buda/RISC-V-CPU",
    homepageUrl: "",
    primaryLanguage: "Verilog",
    languages: ["Verilog", "SystemVerilog"],
    stars: 1,
    forks: 1,
    pushedAt: "2026-02-21T18:01:54Z",
    visualType: "riscv",
    summary:
      "A complete synthesizable Single-Cycle RISC-V (RV32I) processor core in Verilog paired with a SystemVerilog Assertions (SVA) formal verification environment proved in Aldec Riviera-PRO.",
    overview:
      "Hosts the full hardware engineering lifecycle for a 32-bit RISC-V processor — from synthesizable RTL implementation of the entire RV32I Base Integer Instruction Set to an Assertion-Based Verification (ABV) suite that mathematically proves safety properties across all possible input spaces.",
    highlights: [
      "Complete RV32I base integer ISA support across R, I, S, B, U, and J instruction formats.",
      "Universal 10-operation ALU supporting signed/unsigned comparisons (SLT/SLTU) and arithmetic right shifts (SRA).",
      "Byte-addressable 1KB data memory supporting Word (LW/SW), Half-Word (LH/SH), and Byte (LB/SB) loads/stores with sign-extension.",
      "Formal mutual-exclusion and state-safety SVA proofs (e.g., MemRead/MemWrite exclusivity; STORE/BRANCH never asserting RegWrite).",
      "Validated via deliberate fault injection — SVA assertions caught injected STORE RegWrite bugs and SRA signedness bugs before reaching 100% ALU coverage.",
    ],
    modules: [
      { name: "datapath.v", role: "Top-level core wiring PC, ALU, Register File, and Memory" },
      { name: "control_unit.v", role: "Main opcode/funct3/funct7 decoder generating control signals" },
      { name: "register_file.v", role: "32×32-bit dual-read, single-write register bank" },
      { name: "data_memory.v", role: "Byte-addressable RAM with read-modify-write sub-word logic" },
      { name: "imm_gen.v", role: "Combinational 12-bit & 20-bit immediate unscrambler + sign extension" },
      { name: "Verification/", role: "SystemVerilog Assertion (SVA) testbenches for Control Unit & ALU" },
    ],
    techStack: [
      "Verilog",
      "SystemVerilog (SVA)",
      "RV32I",
      "Aldec Riviera-PRO",
      "Icarus Verilog",
      "Formal Verification",
    ],
    evidenceImages: [
      {
        title: "Control Unit — SVA Fault Injection Catch",
        caption: "Injected RegWrite=1 during STORE caught immediately by check_store_logic.",
        url: "https://raw.githubusercontent.com/Tomer-Buda/RISC-V-CPU/main/Verification/control_unit/BUG_found_control_unit.png",
      },
      {
        title: "Control Unit — Formal Verification Pass",
        caption: "All temporal safety and mutual-exclusion properties verified on the golden model.",
        url: "https://raw.githubusercontent.com/Tomer-Buda/RISC-V-CPU/main/Verification/control_unit/Verification_pass_control_unit.png",
      },
      {
        title: "ALU — SRA Signedness Bug Caught",
        caption: "Fault injection replacing >>> with >> caught by check_sra assertion.",
        url: "https://raw.githubusercontent.com/Tomer-Buda/RISC-V-CPU/main/Verification/alu/BUG_FOUND_ALU.jpeg",
      },
      {
        title: "ALU — 100% Verification Coverage Pass",
        caption: "Full ALU assertion pass including signed/unsigned logic and zero-flag checks.",
        url: "https://raw.githubusercontent.com/Tomer-Buda/RISC-V-CPU/main/Verification/alu/ALU_PASS.jpeg",
      },
    ],
    runCommand: "iverilog -o cpu_core rtl/*.v tb_datapath.v && vvp cpu_core",
  },
  {
    id: "SiliconLog",
    repoName: "SiliconLog",
    title: "SiliconLog — Post-Silicon Validation Dashboard",
    shortTag: "POST-SILICON · MDV + COVERAGE",
    category: "verification",
    featured: true,
    visibility: "public",
    githubUrl: "https://github.com/Tomer-Buda/SiliconLog",
    homepageUrl: "",
    primaryLanguage: "Python",
    languages: ["Python"],
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-25T20:48:20Z",
    visualType: "siliconlog",
    summary:
      "Full-stack hardware verification analytics tool that parses regression simulation logs, computes Metric-Driven Verification (MDV) coverage scores, and flags thermal corner-case failures.",
    overview:
      "Built to bridge the gap between low-level SystemVerilog/UVM simulation outputs and high-level validation insights. SiliconLog generates multi-unit hardware stress traffic, parses unstructured regression logs, tracks functional coverage, and presents live telemetry in a Streamlit dashboard.",
    highlights: [
      "Metric-Driven Verification (MDV) engine using Pandas to compute functional coverage across unit variety, thermal stress, and test duration.",
      "Automated corner-case failure detector correlating hardware thermal throttling (> 95°C) with unit-specific logic errors.",
      "Interactive Streamlit dashboard for live regression monitoring, log aggregation, and faster root-cause analysis.",
      "One-click clean CSV reporting formatted for cross-team engineering review.",
    ],
    modules: [
      { name: "tb_gen2.py", role: "Traffic Generator simulating randomized ALU, FPU, DDR, and PCIe stress transactions" },
      { name: "log_parse2.py", role: "Monitor & Scoreboard parsing raw logs into structured coverage scores" },
      { name: "app.py", role: "Streamlit frontend visualization engine & CSV export pipeline" },
    ],
    techStack: ["Python", "Pandas", "Streamlit", "VLSI Verification", "MDV", "Post-Silicon"],
    evidenceImages: [],
    runCommand: "pip install -r requirements.txt && streamlit run app.py",
  },
  {
    id: "Snake-Game",
    repoName: "Snake-Game",
    title: "Bare-Metal 16-Bit x86 Assembly Snake",
    shortTag: "REAL-MODE x86 · ISR + VGA VRAM",
    category: "systems",
    featured: true,
    visibility: "public",
    githubUrl: "https://github.com/Tomer-Buda/Snake-Game",
    homepageUrl: "",
    primaryLanguage: "Assembly",
    languages: ["Assembly"],
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-25T10:25:43Z",
    visualType: "snake",
    summary:
      "A bare-metal Real-Mode 16-bit x86 Assembly game engine featuring custom BIOS timer ISR hooking (INT 1Ch), direct VGA video memory rendering (0B800h), and hardware port-mapped I/O.",
    overview:
      "Runs in x86 Real Mode and bypasses high-level OS and BIOS video interrupts to talk directly to PC hardware. Every frame, tick, keypress, and pseudo-random food spawn is driven by hand-written assembly touching interrupt vectors, VRAM segments, and hardware I/O ports.",
    highlights: [
      "Custom Interrupt Service Routine (ISR) hooking BIOS timer INT 1Ch with manual PUSHF/POPF CPU context preservation.",
      "Non-blocking asynchronous game scheduler running game ticks independently of the main execution loop.",
      "Direct VGA VRAM rendering at segment 0B800h using linear cell addressing (Offset = Y × 160 + X × 2) for zero-overhead graphics.",
      "Direct hardware port I/O: polls Keyboard Controller ports 0x60/0x64 for raw scan codes and reads CMOS RTC ports 0x70/0x71 to seed RNG.",
    ],
    modules: [
      { name: "snake.asm", role: "Complete 16-bit x86 assembly engine: ISR scheduler, VGA renderer, port I/O, and game logic" },
    ],
    techStack: ["16-bit x86 Assembly", "Real Mode", "INT 1Ch ISR", "VGA 0B800h", "Port I/O (0x60/0x70)"],
    evidenceImages: [
      {
        title: "Live Gameplay Capture",
        caption: "Real-Mode 16-bit x86 Snake rendered directly into VGA text buffer 0B800h.",
        url: "https://github.com/user-attachments/assets/742100dd-2004-472c-9e04-6f32cc630a9f",
      },
    ],
    runCommand: "Assemble snake.asm with MASM/TASM/NASM and run in DOSBox (Controls: W/A/S/D, T to exit)",
  },
  {
    id: "cpp-cache-simulator",
    repoName: "cpp-cache-simulator",
    title: "Configurable C++ Cache Simulator",
    shortTag: "MEMORY HIERARCHY · LRU",
    category: "systems",
    featured: false,
    visibility: "public",
    githubUrl: "https://github.com/Tomer-Buda/cpp-cache-simulator",
    homepageUrl: "",
    primaryLanguage: "C++",
    languages: ["C++"],
    stars: 0,
    forks: 0,
    pushedAt: "2025-11-12T21:27:13Z",
    visualType: "cache",
    summary:
      "A configurable, trace-driven CPU cache simulator in C++ modeling arbitrary cache geometries, LRU eviction, bitwise address decoding, and spatial/temporal locality traces.",
    overview:
      "Designed for computer architecture performance analysis. Models a configurable set-associative cache hierarchy, synthesizes realistic memory access traces exhibiting spatial and temporal locality, and computes exact hit/miss statistics.",
    highlights: [
      "Fully configurable cache size, block size, and set associativity driven via config.ini.",
      "Bitwise address decomposition extracting Tag, Set Index, and Block Offset fields cleanly.",
      "Implements Least Recently Used (LRU) block replacement policy across associative sets.",
      "Dynamic randomized trace generator modeling spatial and temporal memory locality on every run.",
    ],
    modules: [
      { name: "main.cpp", role: "Cache geometry parser, trace generator, bitwise address decoder, and LRU simulator" },
      { name: "config.ini", role: "Declarative cache parameters (cache size, block size, associativity)" },
      { name: "CacheSimulator.sln", role: "Visual Studio C++ project configuration" },
    ],
    techStack: ["C++", "STL", "Computer Architecture", "LRU Policy", "Bitwise Decoding"],
    evidenceImages: [],
    runCommand: "Open CacheSimulator.sln in Visual Studio, build, place config.ini in output dir, and run",
  },
  {
    id: "formula-to-robdd",
    repoName: "formula-to-robdd",
    title: "Formula-to-ROBDD Visualizer",
    shortTag: "FORMAL METHODS · BDD GRAPH",
    category: "verification",
    featured: false,
    visibility: "public",
    githubUrl: "https://github.com/Tomer-Buda/formula-to-robdd",
    homepageUrl: "",
    primaryLanguage: "Python",
    languages: ["Python"],
    stars: 0,
    forks: 0,
    pushedAt: "2026-01-25T12:25:58Z",
    visualType: "robdd",
    summary:
      "A Python package that parses arbitrary Boolean logic formulas under a user-specified variable ordering and renders the canonical Reduced Ordered Binary Decision Diagram (ROBDD) as an image.",
    overview:
      "Implements canonical Boolean function representation used in formal equivalence checking and logic synthesis. Given a propositional logic formula and an explicit variable ordering, the tool parses the AST, constructs and reduces the decision diagram by eliminating redundant nodes and merging isomorphic subgraphs, and exports a clean graph visualization.",
    highlights: [
      "Custom Boolean formula parser supporting arbitrary logic expressions and user-defined variable ordering.",
      "Canonical ROBDD reduction algorithm eliminating redundant tests and sharing isomorphic subgraphs.",
      "Automated graph rendering pipeline turning reduced decision trees into readable diagram images.",
      "Clean modular Python package layout separating parsing, BDD construction, and visualization.",
    ],
    modules: [
      { name: "formula_parser.py", role: "Parses input Boolean formulas into evaluable expression structures" },
      { name: "bdd.py", role: "Core ROBDD construction and canonical reduction engine" },
      { name: "visualise.py", role: "Graph layout and image rendering for the reduced BDD" },
      { name: "main.py", role: "CLI entry point accepting formula input and variable ordering" },
    ],
    techStack: ["Python", "Formal Methods", "ROBDD", "Logic Synthesis", "Graph Visualization"],
    evidenceImages: [],
    runCommand: "python main.py",
  },
  {
    id: "GarminBot",
    repoName: "GarminBot",
    title: "Garmin Fenix 8 AI Endurance Coach",
    shortTag: "SERVERLESS AI · TELEMETRY AGENT",
    category: "ai",
    featured: true,
    visibility: "private",
    githubUrl: "",
    homepageUrl: "",
    primaryLanguage: "Python",
    languages: ["Python"],
    stars: 0,
    forks: 0,
    pushedAt: "2026-11-24T17:08:50Z",
    visualType: "garminbot",
    summary:
      "An on-demand, zero-server personal endurance coaching agent on Telegram combining Garmin Connect biometric telemetry, Google Gemini multi-model tool calling, SQLite coach memory, and GitHub Actions.",
    overview:
      "Architected to run completely serverless with zero always-on cloud cost. Wakes on schedule or on-demand via GitHub Actions, queries live physiological & workout metrics from Garmin Connect, reasons over splits/HRV/readiness with Google Gemini tool calling, persists long-term goals and injury memory in SQLite, and auto-sleeps cleanly when chat goes idle.",
    highlights: [
      "Automated Morning Readiness Briefings synthesizing sleep stages, overnight HRV, Body Battery, resting HR, stress, and scheduled workouts.",
      "Post-workout breakdown engine detecting unseen sessions and analyzing pace, lap splits, HR zones, GPS location, and weather.",
      "Multi-tool Gemini agent with automatic model fallback querying VO2 Max, race predictions, gear mileage, PRs, and training calendars.",
      "Persistent SQLite long-term coach memory tracking race goals, injury notes, and athlete preferences across stateless runs.",
      "Idle-based auto-sleep lifecycle that saves refreshed auth state and database snapshots cleanly to workflow cache on exit.",
    ],
    modules: [
      { name: "coach_agent.py", role: "Core Telegram + Gemini tool-calling agent, Garmin telemetry client, and idle sleep loop" },
      { name: "SQLite State Layer", role: "Persistent cross-session coaching memory and workout deduplication" },
      { name: "GitHub Actions Runner", role: "Serverless scheduled briefings and on-demand wake orchestration" },
      { name: "tests/", role: "Automated Python unittest suite validating agent behavior and tool handlers" },
    ],
    techStack: [
      "Python",
      "Google Gemini API",
      "Garmin Connect Telemetry",
      "Telegram Bot",
      "GitHub Actions",
      "SQLite",
    ],
    evidenceImages: [],
    runCommand: "Private personal repository — source code withheld for personal telemetry privacy.",
  },

  /* ============================================================================
   * TEMPLATE — Copy & uncomment this block to add any new or non-GitHub project:
   * ============================================================================
  {
    id: "my-new-project",
    repoName: "", // Leave empty if not on GitHub, or set to the exact GitHub repo name to sync stars/dates
    title: "My New Engineering Project",
    shortTag: "DOMAIN · SUBSYSTEM",
    category: "rtl", // Options: "rtl" | "verification" | "systems" | "ai"
    featured: false,
    visibility: "public", // Options: "public" | "private" | "local"
    githubUrl: "https://github.com/Tomer-Buda/my-new-project",
    homepageUrl: "", // Optional live demo URL
    primaryLanguage: "Verilog",
    languages: ["Verilog", "Python"],
    stars: 0,
    forks: 0,
    pushedAt: "2026-12-01T00:00:00Z",
    visualType: "generic", // Options: "riscv" | "siliconlog" | "snake" | "cache" | "robdd" | "garminbot" | "generic"
    summary: "One-to-two sentence technical summary of the project.",
    overview: "Detailed explanation shown inside the Inspect Architecture modal.",
    highlights: [
      "Key engineering achievement #1",
      "Key engineering achievement #2",
    ],
    modules: [
      { name: "src/main.v", role: "Short description of what this module does" },
    ],
    techStack: ["Verilog", "Python"],
    evidenceImages: [],
    runCommand: "make test",
  },
  */
];

export const categoryLabels = {
  all: "All Projects",
  rtl: "RTL & Hardware",
  verification: "Verification & Formal",
  systems: "Systems & Low-Level",
  ai: "AI & Automation",
};
