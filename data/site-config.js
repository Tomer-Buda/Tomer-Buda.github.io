/**
 * Site Configuration — Edit this file to update your profile, links, education, and resume.
 * No build step required: save the file and refresh your browser.
 */

export const siteConfig = {
  // Identity
  name: "Tomer I. Buda",
  monogram: "TB",
  role: "Computer Engineering (Hardware Major) · RTL, Verification & Systems",
  location: "Givat Shmuel, Israel",
  headline: "Designing silicon, proving correctness, and building close to the metal.",
  bio:
    "4th-year Computer Engineering student (Computer Hardware Major, Bar-Ilan University) focused on digital hardware design (FPGA, RTL, VLSI), formal verification (SVA, nuXmv), and low-level systems programming.",

  // External Links & Contact
  githubUsername: "Tomer-Buda",
  githubUrl: "https://github.com/Tomer-Buda",
  linkedinUrl: "https://www.linkedin.com/in/tomer-buda/",
  email: "tomerbuda214@gmail.com",

  // Optional static PDF Resume: drop your PDF at assets/Tomer_Buda_Resume.pdf to open it directly.
  // When absent, the Resume button opens the built-in print-ready CV modal populated from this config.
  resumeUrl: "assets/Tomer_Buda_Resume.pdf",
  resumeFileName: "Tomer_Buda_Resume.pdf",

  // Live GitHub API Sync
  githubSync: {
    enabled: true,
    autoDiscoverNewRepos: true,
    ignoredRepos: [
      "Tomer-Buda",
      "Tomer-Buda.github.io",
      "ProjectsWebsite",
    ],
    cacheTtlMs: 10 * 60 * 1000,
  },

  // Core Engineering Domains shown in the Stack Matrix
  skillGroups: [
    {
      code: "01 // RTL & VLSI",
      title: "Digital Hardware & RTL",
      accent: "amber",
      items: [
        "Verilog HDL & SystemVerilog",
        "RV32I RISC-V Architecture",
        "FPGA, RTL & Custom Circuit Design",
        "Cadence Virtuoso",
        "Digital Integrated Circuits",
        "Icarus Verilog",
      ],
    },
    {
      code: "02 // VERIF",
      title: "Verification & Formal Methods",
      accent: "emerald",
      items: [
        "SystemVerilog Assertions (SVA)",
        "Assertion-Based Verification (ABV)",
        "nuXmv (Formal Verification)",
        "Aldec Riviera-PRO",
        "Post-Silicon Validation (MDV)",
        "ROBDD & Boolean Formalisms",
      ],
    },
    {
      code: "03 // SYSTEMS",
      title: "Low-Level & Embedded",
      accent: "cyan",
      items: [
        "16-bit x86 Assembly (Real Mode)",
        "C & C++ (STL)",
        "Keil uVision & Microprocessors",
        "ISR Hooking, VGA VRAM & Port I/O",
        "Cache & Memory Hierarchy",
        "Operating Systems",
      ],
    },
    {
      code: "04 // TOOLS & LAB",
      title: "Automation, AI & Lab Bench",
      accent: "violet",
      items: [
        "Python, Pandas & Streamlit",
        "MATLAB & Git",
        "Google Gemini API & GitHub Actions",
        "Oscilloscopes & Waveform Generators",
        "Digital Multimeters (DMMs)",
        "Benchtop Power Supplies",
      ],
    },
  ],

  // Academic Background
  education: [
    {
      degree: "B.Sc. in Computer Engineering — Computer Hardware Major",
      institution: "Bar-Ilan University",
      period: "2023 – 2027",
      location: "Ramat Gan, Israel",
      meta: "GPA: 86",
      courses: [
        "Python Programming (100)",
        "Introduction to Circuits (95)",
        "Custom Digital Circuit Design (93)",
        "Digital Integrated Circuits (92)",
        "Operating Systems (92)",
        "OOP & Software Engineering (92)",
        "Microprocessors & Assembly (89)",
        "Digital Logic Systems (87)",
      ],
    },
    {
      degree: "Erasmus+ Exchange Semester",
      institution: "Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU)",
      period: "03/2026 – 08/2026",
      location: "Erlangen, Germany",
      meta: "Competitive Scholarship",
      summary:
        "Selected for a competitive Erasmus+ scholarship; adapted quickly to a rigorous international academic engineering environment.",
    },
  ],

  // Professional Experience
  experience: [
    {
      role: "Technical Support Specialist (TOMAX)",
      org: "Bar-Ilan University",
      period: "2025 – Present",
      bullets: [
        "Delivered real-time troubleshooting for high-stakes digital exams, resolving critical OS and hardware conflicts under strict time constraints.",
        "Ensured system reliability and user compliance by diagnosing connectivity and peripheral failures in a high-pressure environment.",
      ],
    },
    {
      role: "Academic Tutor",
      org: "Bar-Ilan University",
      period: "2024 – 2025",
      bullets: [
        "Mentored first-year engineering students, reinforcing core concepts and fostering creative problem-solving skills.",
      ],
    },
  ],

  // Spoken Languages
  spokenLanguages: [
    { name: "Hebrew", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "German", level: "B1" },
    { name: "Spanish", level: "A2" },
  ],
};
