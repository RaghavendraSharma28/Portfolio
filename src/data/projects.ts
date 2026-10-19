export type ProjectKind = 'ocr' | 'fpga' | 'embedded' | 'robotics' | 'software';

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type VerifiedFact = {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  category: string;
  tags: string[];
  kind: ProjectKind;
  status?: string;
  featured?: boolean;
  repositoryUrl?: string;
  repositoryLabel?: string;
  screenshots?: ProjectScreenshot[];
  videoDemoUrl?: string;
  technicalDocumentationUrl?: string;
  verifiedResults?: VerifiedFact[];
};

export const projects: Project[] = [
  {
    slug: 'vehicle-identification-ocr',
    title: 'UAE Mulkiya VIN Extraction System',
    eyebrow: 'A.W. ROSTAMANI · INTERNSHIP',
    description: 'A local OCR pipeline for UAE Mulkiya cards, combining candidate generation, VIN-specific validation, and conservative review.',
    category: 'Computer Vision',
    tags: ['Python', 'RapidOCR', 'VIN validation'],
    kind: 'ocr',
    status: 'Professional case study',
    featured: true,
    verifiedResults: [
      { label: 'Production benchmark accuracy', value: '99.09%', note: 'RapidOCR pipeline · cleaned 110-image benchmark', highlight: true },
      { label: 'Production benchmark matches', value: '109 / 110', note: 'Exact chassis-number matches' },
      { label: 'Initial PaddleOCR baseline', value: '14.97%', note: '22 / 147 exact matches · different evaluation context', highlight: true },
      { label: 'Separate EasyOCR experiment', value: '~15%', note: 'Early result documented in the internship report' },
      { label: 'Clean labelled dataset', value: '935 images', note: 'Prepared for supervised model experimentation' },
      { label: 'Documented data split', value: '748 / 93 / 94', note: 'Training / validation / test; not the 110-image benchmark' },
    ],
  },
  {
    slug: 'fpga-digital-systems',
    title: 'FSM-Controlled ALU & Sequential Multiplier',
    eyebrow: 'DIGITAL DESIGN · VIRGINIA TECH',
    description: 'A 14-state Moore controller sequences a 14-operation Verilog datapath and an eight-step shift-and-add multiplier.',
    category: 'FPGA & Digital Design',
    tags: ['Verilog', 'Moore FSM', 'Shift-and-add'],
    kind: 'fpga',
    status: 'RTL implementation',
    repositoryUrl: 'https://github.com/RaghavendraSharma28/verilog-fsm-alu',
    repositoryLabel: 'View Verilog source and testbench',
    verifiedResults: [
      { label: 'Moore controller', value: '14 states' },
      { label: 'Datapath operations', value: '14 opcodes' },
      { label: 'Sequential multiply', value: '8 steps' },
      { label: 'Product register', value: '17 bits' },
    ],
  },
  {
    slug: 'embedded-systems',
    title: 'Embedded Systems',
    eyebrow: 'ACADEMIC PROJECTS',
    description: 'Microcontroller applications exploring peripherals, event-driven firmware, and hardware/software integration.',
    category: 'Embedded Systems',
    tags: ['C', 'MSP432', 'DriverLib'],
    kind: 'embedded',
    status: 'Academic project collection',
  },
  {
    slug: 'cpp-ai-workspace',
    title: 'C++ AI Workspace',
    eyebrow: 'SOFTWARE SYSTEMS',
    description: 'A modular document-processing concept for text tokenization, chunking, and organized workspace management.',
    category: 'Software Engineering',
    tags: ['C++', 'CMake', 'Testing'],
    kind: 'software',
    status: 'Architecture concept',
  },
  {
    slug: 'robotics-mechatronics',
    title: 'Robotics & Mechatronics',
    eyebrow: 'ROBOTICS',
    description: 'Robotics team experience and a keypad-controlled servo lock prototype built around analog input and actuation.',
    category: 'Robotics',
    tags: ['Arduino', 'C++', 'Servo'],
    kind: 'robotics',
    status: 'Academic prototype',
  },
];

export const getProject = (slug: string) => projects.find(project => project.slug === slug);
