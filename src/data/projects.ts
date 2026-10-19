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
    title: 'Vehicle Identification OCR',
    eyebrow: 'A.W. ROSTAMANI · INTERNSHIP',
    description: 'Evaluating ways to extract vehicle identification numbers from document images with OCR and vision-language models.',
    category: 'Computer Vision',
    tags: ['Python', 'PaddleOCR', 'Qwen2.5-VL-3B'],
    kind: 'ocr',
    status: 'Professional case study',
    featured: true,
    verifiedResults: [
      { label: 'Images evaluated', value: '147', note: 'Initial PaddleOCR baseline' },
      { label: 'Exact VIN matches', value: '22', note: 'Exact-string comparison' },
      { label: 'Initial exact-match rate', value: '14.97%', note: 'Not the final internship result' },
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
