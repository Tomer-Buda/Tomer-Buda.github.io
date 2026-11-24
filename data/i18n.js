/**
 * Bilingual UI Strings & Hebrew Content Translations (EN / HE)
 * Technical terms (Verilog, SVA, RV32I, FPGA, LRU, ROBDD, etc.) are intentionally
 * kept in standard industry English alongside natural Israeli engineering Hebrew.
 */

export const uiStrings = {
  en: {
    pageTitle: "Tomer I. Buda — Computer Engineering Portfolio",
    skipToProjects: "Skip to projects",
    nav: {
      projects: "Projects",
      skills: "Skills",
      background: "Background",
      contact: "Contact",
    },
    header: {
      resume: "Resume",
      langBtnLabel: "עב",
      langBtnTitle: "Switch to Hebrew (עברית)",
      themeTitle: "Switch theme",
    },
    hero: {
      viewProjects: "View Projects",
      resumePdf: "Resume (PDF)",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    projects: {
      heading: "Selected Projects",
      sub: "Hardware design, formal verification, systems programming, and applied automation.",
      refresh: "Refresh",
      refreshTitle: "Refresh repository metadata from GitHub",
      searchPlaceholder: "Search projects...",
      sortFeatured: "Featured",
      sortRecent: "Recently updated",
      sortName: "Alphabetical",
      emptyTitle: "No matching projects",
      emptySub: "Adjust your search query or switch back to All.",
      resetFilters: "Reset Filters",
      detailsBtn: "Details",
      githubBtn: "GitHub",
      privateRepo: "Private repository",
      privateSource: "Private source",
      syncedTag: "Synced from GitHub",
      curatedStatus: "Curated projects",
      syncingStatus: "Syncing with GitHub...",
      syncedStatus: (user) => `Synced with @${user}`,
      syncedNewStatus: (n) => `Synced with GitHub (+${n} new)`,
      autoSummary: "Public repository automatically synced from GitHub.",
      autoOverview: "This repository was automatically discovered via the GitHub API.",
    },
    categories: {
      all: "All",
      rtl: "RTL & Hardware",
      verification: "Verification",
      systems: "Systems",
      ai: "AI & Automation",
    },
    categoryDisplay: {
      rtl: "RTL & Formal Verification",
      verification: "Verification & Formal Methods",
      systems: "Low-Level Systems & Architecture",
      ai: "Applied AI & Automation",
    },
    skills: {
      heading: "Technical Skills",
      sub: "Languages, EDA toolchains, verification methodologies, and bench instrumentation.",
    },
    background: {
      heading: "Education & Experience",
      sub: "Academic foundation, international exchange, and technical support leadership.",
      educationLabel: "Education",
      experienceLabel: "Experience",
      languagesHeading: "Languages",
    },
    contact: {
      heading: "Resume & Contact",
      sub: "Open to student and junior engineering roles in RTL design, formal/pre-silicon verification, post-silicon validation, and low-level systems.",
      resumeLabel: "Resume",
      pdfReady: "PDF (1 page)",
      webSummary: "Web Summary",
      openPdf: "Open PDF",
      download: "Download",
      emailLabel: "Email",
      copy: "Copy",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      visit: "Visit",
    },
    modal: {
      overview: "Overview",
      highlights: "Key Highlights",
      modules: "Architecture & Modules",
      evidence: "Verification Evidence & Captures",
      buildAndRun: "Build & Run",
      access: "Access",
      viewOnGithub: "View on GitHub",
      liveDemo: "Live Demo",
      privateFooter: "Private personal repository — source withheld for privacy.",
      close: "Close",
      copy: "Copy",
    },
    resumeModal: {
      eyebrow: "Curriculum Vitae",
      title: "Tomer I. Buda — Resume",
      printBtn: "Print / Save PDF",
      relevantCourses: "Relevant Courses:",
      education: "Education",
      projects: "Projects",
      experience: "Experience",
      skillsAndLangs: "Skills & Languages",
      languages: "Languages:",
    },
    toast: {
      copiedEmail: (email) => `Copied ${email}`,
      copiedCommand: "Command copied",
      refreshed: "GitHub metadata refreshed",
      syncFailed: "Could not reach GitHub API",
    },
    arrow: "↗",
  },

  he: {
    pageTitle: "תומר י. בודה — פורטפוליו הנדסת מחשבים",
    skipToProjects: "דלג לפרויקטים",
    nav: {
      projects: "פרויקטים",
      skills: "מיומנויות",
      background: "השכלה וניסיון",
      contact: "יצירת קשר",
    },
    header: {
      resume: "קורות חיים",
      langBtnLabel: "EN",
      langBtnTitle: "Switch to English",
      themeTitle: "החלפת ערכת נושא",
    },
    hero: {
      viewProjects: "לפרויקטים",
      resumePdf: "קורות חיים (PDF)",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    projects: {
      heading: "פרויקטים נבחרים",
      sub: "תכנון חומרה (RTL), אימות פורמלי, תכנות מערכות ברמה נמוכה ואוטומציה.",
      refresh: "רענון",
      refreshTitle: "רענון נתוני מאגרים מ-GitHub",
      searchPlaceholder: "חיפוש פרויקטים...",
      sortFeatured: "מומלצים",
      sortRecent: "עודכנו לאחרונה",
      sortName: "לפי א'-ב'",
      emptyTitle: "לא נמצאו פרויקטים מתאימים",
      emptySub: "נסה לשנות את החיפוש או לחזור להצגת כל הפרויקטים.",
      resetFilters: "איפוס סינון",
      detailsBtn: "פרטים",
      githubBtn: "GitHub",
      privateRepo: "מאגר פרטי",
      privateSource: "קוד פרטי",
      syncedTag: "סונכרן מ-GitHub",
      curatedStatus: "פרויקטים נבחרים",
      syncingStatus: "מסנכרן מול GitHub...",
      syncedStatus: (user) => `מסונכרן עם @${user}`,
      syncedNewStatus: (n) => `סונכרן עם GitHub (+${n} חדשים)`,
      autoSummary: "מאגר ציבורי שסונכרן אוטומטית מ-GitHub.",
      autoOverview: "מאגר זה זוהה אוטומטית דרך ממשק ה-API של GitHub.",
    },
    categories: {
      all: "הכל",
      rtl: "RTL וחומרה",
      verification: "אימות",
      systems: "מערכות",
      ai: "AI ואוטומציה",
    },
    categoryDisplay: {
      rtl: "RTL ואימות פורמלי",
      verification: "אימות ושיטות פורמליות",
      systems: "מערכות וארכיטקטורת מחשבים",
      ai: "AI ואוטומציה",
    },
    skills: {
      heading: "מיומנויות טכניות",
      sub: "שפות תכנות וחומרה, כלי EDA, מתודולוגיות אימות וציוד מעבדה.",
    },
    background: {
      heading: "השכלה וניסיון",
      sub: "רקע אקדמי, סמסטר חילופין בינלאומי וניסיון בתמיכה טכנית וחונכות.",
      educationLabel: "השכלה",
      experienceLabel: "ניסיון תעסוקתי",
      languagesHeading: "שפות",
    },
    contact: {
      heading: "קורות חיים ויצירת קשר",
      sub: "פתוח למשרות סטודנט וג'וניור בתכנון RTL, אימות פורמלי ופרה-סיליקון, ולידציית פוסט-סיליקון ומערכות Low-Level.",
      resumeLabel: "קורות חיים",
      pdfReady: "קובץ PDF (עמוד אחד)",
      webSummary: "תקציר אינטרנטי",
      openPdf: "פתיחת PDF",
      download: "הורדה",
      emailLabel: "דוא״ל",
      copy: "העתקה",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      visit: "פתיחה",
    },
    modal: {
      overview: "סקירה כללית",
      highlights: "נקודות הנדסיות מרכזיות",
      modules: "ארכיטקטורה ומודולים",
      evidence: "ראיות אימות ותצלומי מסך",
      buildAndRun: "בנייה והרצה",
      access: "גישה",
      viewOnGithub: "צפייה ב-GitHub",
      liveDemo: "הדגמה חיה",
      privateFooter: "מאגר אישי פרטי — קוד המקור אינו ציבורי מטעמי פרטיות.",
      close: "סגירה",
      copy: "העתקה",
    },
    resumeModal: {
      eyebrow: "קורות חיים",
      title: "תומר י. בודה — קורות חיים",
      printBtn: "הדפסה / שמירה כ-PDF",
      relevantCourses: "קורסים רלוונטיים:",
      education: "השכלה",
      projects: "פרויקטים",
      experience: "ניסיון",
      skillsAndLangs: "מיומנויות ושפות",
      languages: "שפות:",
    },
    toast: {
      copiedEmail: (email) => `הועתק: ${email}`,
      copiedCommand: "הפקודה הועתקה",
      refreshed: "נתוני GitHub עודכנו",
      syncFailed: "לא ניתן להתחבר ל-GitHub API",
    },
    arrow: "↖",
  },
};

export const hebrewSiteContent = {
  name: "תומר י. בודה",
  kicker: "הנדסת מחשבים (מגמת חומרה) · אוניברסיטת בר-אילן",
  location: "גבעת שמואל, ישראל",
  bio:
    "סטודנט שנה ד׳ להנדסת מחשבים במגמת חומרה באוניברסיטת בר-אילן, המתמקד בתכנון חומרה ספרתית (FPGA, RTL, VLSI), אימות פורמלי (SVA, nuXmv) ותוכנת מערכות ברמה נמוכה.",

  skillGroups: [
    {
      title: "חומרה ספרתית ו-RTL",
      items: [
        "Verilog HDL ו-SystemVerilog",
        "ארכיטקטורת RISC-V (RV32I)",
        "תכנון FPGA, RTL ומעגלים ייעודיים",
        "Cadence Virtuoso",
        "מעגלים משולבים ספרתיים (VLSI)",
        "Icarus Verilog",
      ],
    },
    {
      title: "אימות ושיטות פורמליות",
      items: [
        "SystemVerilog Assertions (SVA)",
        "אימות מבוסס טענות (ABV)",
        "nuXmv (אימות פורמלי)",
        "Aldec Riviera-PRO",
        "ולידציית פוסט-סיליקון (MDV)",
        "ROBDD ושיטות לוגיות פורמליות",
      ],
    },
    {
      title: "מערכות ו-Embedded",
      items: [
        "שפת סף x86 16-bit (Real Mode)",
        "C ו-++C (STL)",
        "Keil uVision ומיקרו-מעבדים",
        "טיפול בפסיקות (ISR), זיכרון VGA ו-Port I/O",
        "היררכיית זיכרון ומטמון (Cache)",
        "מערכות הפעלה",
      ],
    },
    {
      title: "אוטומציה, AI וציוד מעבדה",
      items: [
        "Python, Pandas ו-Streamlit",
        "MATLAB ו-Git",
        "Google Gemini API ו-GitHub Actions",
        "אוסצילוסקופים ומחוללי אותות",
        "מולטימטרים ספרתיים (DMM)",
        "ספקי כוח מעבדתיים",
      ],
    },
  ],

  education: [
    {
      degree: "תואר ראשון (B.Sc.) בהנדסת מחשבים — מגמת חומרת מחשבים",
      institution: "אוניברסיטת בר-אילן",
      period: "2023 – 2027",
      location: "רמת גן, ישראל",
      meta: "ממוצע: 86",
      courses: [
        "תכנות בפייתון (100)",
        "מבוא למעגלים (95)",
        "תכנון מעגלים ספרתיים ייעודיים (93)",
        "מעגלים משולבים ספרתיים (92)",
        "מערכות הפעלה (92)",
        "תכנות מונחה עצמים והנדסת תוכנה (92)",
        "מיקרו-מעבדים ושפת סף (89)",
        "מערכות ספרתיות (87)",
      ],
    },
    {
      degree: "סמסטר חילופין Erasmus+",
      institution: "אוניברסיטת פרידריך-אלכסנדר ארלנגן-נירנברג (FAU)",
      period: "03/2026 – 08/2026",
      location: "ארלנגן, גרמניה",
      meta: "מלגה תחרותית",
      summary:
        "נבחר למלגת Erasmus+ תחרותית; השתלבות מהירה בסביבה אקדמית הנדסית בינלאומית תובענית.",
    },
  ],

  experience: [
    {
      role: "מומחה תמיכה טכנית (TOMAX)",
      org: "אוניברסיטת בר-אילן",
      period: "2025 – היום",
      bullets: [
        "מתן פתרונות טכניים בזמן אמת לבחינות דיגיטליות קריטיות, תוך פתרון תקלות מערכת הפעלה וחומרה תחת אילוצי זמן מחמירים.",
        "שמירה על יציבות המערכת ועמידה בנהלים באמצעות אבחון מהיר של תקלות קישוריות וציוד היקפי בסביבת לחץ גבוהה.",
      ],
    },
    {
      role: "חונך אקדמי",
      org: "אוניברסיטת בר-אילן",
      period: "2024 – 2025",
      bullets: [
        "ליווי וחניכת סטודנטים בשנה א׳ להנדסה, חיזוק הבנת יסודות המקצוע ועידוד חשיבה הנדסית יצירתית לפתרון בעיות.",
      ],
    },
  ],

  spokenLanguages: [
    { name: "עברית", level: "שפת אם" },
    { name: "אנגלית", level: "שוטפת" },
    { name: "גרמנית", level: "B1" },
    { name: "ספרדית", level: "A2" },
  ],
};

export const hebrewProjects = {
  "RISC-V-CPU": {
    title: "מעבד RISC-V חד-מחזורי ואימות פורמלי (RV32I)",
    summary:
      "ליבת מעבד RISC-V חד-מחזורית מלאה וניתנת לסינתזה ב-Verilog, משולבת עם סביבת אימות פורמלי מבוססת SystemVerilog Assertions (SVA) שאומתה ב-Aldec Riviera-PRO.",
    overview:
      "מאגר המכסה את מחזור החיים ההנדסי המלא של מעבד RISC-V בן 32 ביט — מתכנון RTL מלא של סט הפקודות הבסיסי RV32I ועד סביבת Assertion-Based Verification (ABV) המוכיחה מתמטית תכונות בטיחות ונכונות על פני כלל מרחב הקלטים האפשרי.",
    highlights: [
      "תמיכה מלאה בסט פקודות הבסיס RV32I בכל הפורמטים: R, I, S, B, U ו-J.",
      "יחידת ALU אוניברסלית ל-10 פעולות, כולל השוואות עם ובלי סימן (SLT/SLTU) והזזות אריתמטיות (SRA).",
      "זיכרון נתונים בכתובת בית (Byte-addressable) בנפח 1KB התומך בגישות Word, Half-Word ו-Byte עם הרחבת סימן מלאה.",
      "הוכחות פורמליות ב-SVA למניעה הדדית ובטיחות מצבים (לדוגמה: MemRead ו-MemWrite אינם פעילים יחד; פקודות STORE ו-BRANCH לעולם אינן מפעילות RegWrite).",
      "אימות עמידות באמצעות הזרקת תקלות יזומה — טענות ה-SVA זיהו מיידית תקלות RegWrite ב-STORE ושגיאת סימן ב-SRA עד להשגת 100% כיסוי ל-ALU.",
    ],
    modules: [
      { name: "datapath.v", role: "אינטגרציה עליונה המחברת את ה-PC, ה-ALU, קובץ האוגרים והזיכרון" },
      { name: "control_unit.v", role: "יחידת בקרה המפענחת Opcode/Funct3/Funct7 ומייצרת אותות בקרה" },
      { name: "register_file.v", role: "קובץ 32 אוגרים בני 32 ביט עם שתי יציאות קריאה וכניסת כתיבה אחת" },
      { name: "data_memory.v", role: "זיכרון RAM עם לוגיקת Read-Modify-Write לגישות תת-מילה" },
      { name: "imm_gen.v", role: "לוגיקה קומבינטורית לחילוץ והרחבת סימן של ערכי Immediate בני 12 ו-20 ביט" },
      { name: "Verification/", role: "סביבות אימות ו-Testbenches מבוססי SVA ליחידת הבקרה ול-ALU" },
    ],
    evidenceImages: [
      {
        title: "יחידת בקרה — איתור תקלה בהזרקת שגיאה",
        caption: "הזרקת RegWrite=1 בזמן פקודת STORE נתפסה מיידית ע״י הטענה check_store_logic.",
      },
      {
        title: "יחידת בקרה — אישור אימות פורמלי",
        caption: "כל תכונות הבטיחות והמניעה ההדדית אומתו בהצלחה במודל הזהב.",
      },
      {
        title: "ALU — איתור שגיאת סימן ב-SRA",
        caption: "הזרקת שגיאה שהחליפה >>> ב->> נתפסה מיידית ע״י הטענה check_sra.",
      },
      {
        title: "ALU — מעבר אימות בכיסוי 100%",
        caption: "מעבר מלא של כלל טענות ה-ALU כולל לוגיקת signed/unsigned ודגל Zero.",
      },
    ],
  },

  SiliconLog: {
    title: "SiliconLog — לוח בקרה לאימות פוסט-סיליקון",
    summary:
      "כלי אנליטיקה לאימות חומרה המנתח לוגי רגרסיה, מחשב מדדי כיסוי פונקציונלי (MDV) באמצעות Pandas, ומאתר כשלי קצה תרמיים.",
    overview:
      "נבנה כדי לגשר בין פלטי סימולציית חומרה ברמה נמוכה (SystemVerilog/UVM) לבין תובנות ולידציה גבוהות. המערכת מייצרת תעבורת בדיקה אקראית ליחידות חומרה שונות, מנתחת לוגים גולמיים, עוקבת אחר כיסוי פונקציונלי ומציגה טלמטריה אינטראקטיבית ב-Streamlit.",
    highlights: [
      "מנוע Metric-Driven Verification (MDV) מבוסס Pandas לחישוב כיסוי פונקציונלי לפי מגוון יחידות, עומס תרמי ומשך בדיקה.",
      "זיהוי אוטומטי של כשלי קצה המתאם בין חריגות טמפרטורה (> 95°C) ו-Throttling לבין שגיאות לוגיות.",
      "לוח בקרה אינטראקטיבי ב-Streamlit לניטור רגרסיות וקיצור זמן ניתוח תקלות (Root-Cause Analysis).",
      "ייצוא דוחות CSV נקיים לדיווח ושיתוף בין צוותי הנדסה.",
    ],
    modules: [
      { name: "tb_gen2.py", role: "מחולל תעבורה המדמה טרנזקציות אקראיות ביחידות ALU, FPU, DDR ו-PCIe תחת אילוצי חום" },
      { name: "log_parse2.py", role: "מוניטור ו-Scoreboard המנתח לוגים לא-מובנים ומחשב ציוני כיסוי" },
      { name: "app.py", role: "ממשק ויזואליזציה ב-Streamlit ומנגנון ייצוא CSV" },
    ],
  },

  "Snake-Game": {
    title: "משחק Snake ב-Bare-Metal בשפת סף x86 (16-bit)",
    summary:
      "מנוע זמן-אמת בשפת סף x86 ב-Real Mode הכולל יירוט פסיקת טיימר (INT 1Ch), רינדור ישיר לזיכרון וידאו VGA (0B800h) ותקשורת פורטים ישירה לחומרה.",
    overview:
      "רץ ב-Real Mode ועוקף את שירותי מערכת ההפעלה ופסיקות הווידאו של ה-BIOS כדי לתקשר ישירות עם רכיבי החומרה. כל פריים, קליטת מקש והגרלת מיקום מבוצעים באסמבלי ידני הניגש ישירות לווקטורי פסיקות, לזיכרון VRAM ולפורטי I/O.",
    highlights: [
      "שגרת פסיקה מותאמת (ISR) הלוכדת את טיימר ה-BIOS (INT 1Ch) עם שמירת הקשר ידנית במחסנית (PUSHF/POPF).",
      "מתזמן משימות א-סינכרוני ולא-חוסם (Non-blocking) המבטיח קצב עקבי שאינו תלוי במהירות המעבד.",
      "רינדור ישיר לזיכרון הווידאו VGA במקטע 0B800h באמצעות חישוב כתובת ליניארית (Offset = Y × 160 + X × 2).",
      "גישה ישירה לפורטי חומרה: דגימת בקר המקלדת (0x60/0x64) להשהיה אפסית וקריאת שעון ה-CMOS RTC (0x70/0x71) לאתחול מחולל מספרים אקראיים.",
    ],
    modules: [
      { name: "snake.asm", role: "מנוע x86 מלא ב-16-bit: מתזמן ISR, מנוע רינדור VGA, גישת פורטים ולוגיקת משחק" },
    ],
    evidenceImages: [
      {
        title: "צילום הרצה חי",
        caption: "הרצת המשחק ב-Real Mode 16-bit עם כתיבה ישירה לבאפר הטקסט של VGA בכתובת 0B800h.",
      },
    ],
    runCommand: "הידור snake.asm באמצעות MASM/TASM/NASM והרצה ב-DOSBox (מקשים: W/A/S/D, T ליציאה)",
  },

  "cpp-cache-simulator": {
    title: "סימולטור זיכרון מטמון (Cache) קונפיגורבילי ב-++C",
    summary:
      "סימולטור Cache מונחה עקבות (Trace-driven) ב-++C המדמה גאומטריות מטמון מגוונות, מדיניות החלפה LRU, פענוח כתובות ברמת הביטים ולוקאליות זיכרון.",
    overview:
      "פותח לצורך ניתוח ביצועים בארכיטקטורת מחשבים. הסימולטור ממדל זיכרון מטמון Set-Associative קונפיגורבילי, מייצר עקבות גישה לזיכרון המדמות לוקאליות מרחבית וזמנית, ומפיק סטטיסטיקות Hit/Miss מדויקות.",
    highlights: [
      "קונפיגורציה מלאה של גודל המטמון, גודל הבלוק והאסוציאטיביות דרך קובץ config.ini.",
      "פענוח כתובות זיכרון באמצעות פעולות Bitwise לחילוץ שדות Tag, Set Index ו-Block Offset.",
      "מימוש מדיניות החלפה Least Recently Used (LRU) לפינוי בלוקים בתוך סטים אסוציאטיביים.",
      "מחולל עקבות דינמי המדמה דפוסי גישה בעלי לוקאליות מרחבית וזמנית בכל הרצה.",
    ],
    modules: [
      { name: "main.cpp", role: "קריאת תצורה, מחולל עקבות, פענוח Bitwise וסימולציית LRU" },
      { name: "config.ini", role: "הגדרת פרמטרי המטמון (גודל מטמון, גודל בלוק ואסוציאטיביות)" },
      { name: "CacheSimulator.sln", role: "קובץ פתרון של Visual Studio ל-++C" },
    ],
    runCommand: "פתיחת CacheSimulator.sln ב-Visual Studio, בנייה, הצבת config.ini בתיקיית הפלט והרצה",
  },

  "formula-to-robdd": {
    title: "מחולל ומציג ROBDD מנוסחאות לוגיות",
    summary:
      "חבילת Python המפענחת נוסחאות בוליאניות תחת סדר משתנים מוגדר ומפיקה תמונה של דיאגרמת ההחלטה הקנונית המצומצמת (ROBDD).",
    overview:
      "מממשת ייצוג קנוני של פונקציות בוליאניות המשמש בבדיקת שקילות פורמלית ובסינתזה לוגית. הכלי מקבל נוסחה בוליאנית וסדר משתנים, בונה ומצמצם את עץ ההחלטות תוך הסרת צמתים מיותרים ומיזוג תתי-גרפים איזומורפיים, ומייצא תרשים גרפי ברור.",
    highlights: [
      "מנתח (Parser) ייעודי לנוסחאות לוגיות בוליאניות עם תמיכה בסדר משתנים מותאם אישית.",
      "אלגוריתם צמצום ROBDD קנוני המסיר בדיקות מיותרות ומשתף תתי-גרפים זהים.",
      "צינור רינדור גרפים אוטומטי הממיר את ה-ROBDD לתמונה קריאה.",
      "מבנה חבילה מודולרי המפריד בין פענוח הנוסחה, בניית ה-BDD והצגת הגרף.",
    ],
    modules: [
      { name: "formula_parser.py", role: "פענוח נוסחאות בוליאניות למבני ביטוי ניתנים להערכה" },
      { name: "bdd.py", role: "מנוע בנייה וצמצום קנוני של ה-ROBDD" },
      { name: "visualise.py", role: "פריסת הגרף וייצוא תמונת ה-ROBDD המצומצם" },
      { name: "main.py", role: "נקודת כניסה ב-CLI לקבלת הנוסחה וסדר המשתנים" },
    ],
  },

  GarminBot: {
    title: "מאמן סיבולת מבוסס AI לשעון Garmin Fenix 8",
    summary:
      "סוכן אימון אישי ללא שרת (Serverless) ב-Telegram המשלב טלמטריה מ-Garmin Connect, קריאת כלים מרובת-מודלים ב-Google Gemini, זיכרון מתמשך ב-SQLite והרצה ב-GitHub Actions.",
    overview:
      "מתוכנן לרוץ באופן Serverless מלא ללא עלות שרת קבועה. הסוכן מתעורר לפי לוח זמנים או לפי דרישה ב-GitHub Actions, שולף מדדים פיזיולוגיים ואימונים מ-Garmin Connect, מנתח זמנים/דופק/HRV באמצעות Gemini, שומר זיכרון ארוך-טווח ב-SQLite ונכנס אוטומטית לשינה בעת חוסר פעילות.",
    highlights: [
      "תדריך מוכנות בוקר אוטומטי המסכם איכות שינה, HRV לילי, Body Battery, דופק מנוחה, סטרס והאימון המתוכנן.",
      "מנוע ניתוח לאחר אימון המזהה אימונים חדשים ומנתח קצב, ספליטים, אזורי דופק, מיקום GPS ומזג אוויר.",
      "סוכן Gemini מרובה-כלים עם Fallback אוטומטי בין מודלים השולף VO2 Max, תחזיות מרוץ, קילומטראז׳ נעליים ושיאים אישיים.",
      "זיכרון אימון מתמשך ב-SQLite השומר יעדי מרוצים, הערות פציעה והעדפות מתאמן בין ריצות.",
      "מנגנון Auto-Sleep מבוסס חוסר פעילות השומר באופן נקי את מצב האימות והמסד ל-Cache של GitHub Actions בסיום.",
    ],
    modules: [
      { name: "coach_agent.py", role: "ליבת סוכן Telegram + Gemini, לקוח טלמטריית Garmin ומנגנון שינה אוטומטית" },
      { name: "שכבת SQLite", role: "שמירת זיכרון אימון מתמשך ומניעת כפילויות בין אימונים" },
      { name: "GitHub Actions Runner", role: "תזמון תדריכים והתעוררות לפי דרישה ללא שרת קבוע" },
      { name: "tests/", role: "חבילת בדיקות יחידה ב-Python unittest לאימות התנהגות הסוכן והכלים" },
    ],
    runCommand: "מאגר אישי פרטי — קוד המקור אינו ציבורי לשמירה על פרטיות נתוני הבריאות.",
  },
};
