export type CaseSection = { title: string; body: string };
export type CaseStudy = { title: string; subtitle: string; flow: string[]; sections: CaseSection[] };

export const caseStudies: Record<string, CaseStudy> = {
  'vehicle-identification-ocr': {
    title: 'Automated Vehicle Identification Using Computer Vision',
    subtitle: 'Investigating OCR and vision-language approaches for extracting vehicle identifiers from document images.',
    flow: ['Document image', 'Preprocessing', 'OCR / vision model', 'Text extraction', 'VIN validation', 'Output'],
    sections: [
      { title: 'The problem', body: 'Vehicle registration documents vary in layout, text size, image quality, lighting, and clarity. The goal was to investigate methods for finding and extracting a 17-character Vehicle Identification Number (VIN) from document images.' },
      { title: 'Experimental methodology', body: 'PaddleOCR was evaluated against 147 document images by comparing extracted VIN strings with expected outputs. Exact-string matches established the initial baseline. The public-facing example uses synthetic content and does not reproduce the source documents.' },
      { title: 'Error analysis', body: 'Relevant failure categories include visually similar characters, missed or duplicated characters, image noise, blur, and text detection or grouping. These categories are illustrative; category frequencies were not measured here.' },
      { title: 'Alternative approach', body: 'Qwen2.5-VL-3B was explored as an alternative for visual document understanding. A directly comparable measured result is not documented here, so no accuracy comparison is claimed.' },
      { title: 'VIN constraints', body: 'A VIN uses 17 characters and excludes the letters I, O, and Q. These constraints can help flag implausible candidates; this portfolio does not claim a complete production validation system.' },
      { title: 'Engineering lessons', body: 'Document OCR is a pipeline problem: image quality, text localization, character recognition, and exact-match evaluation all matter. A useful next step is a controlled comparison of preprocessing and model approaches against the same evaluation set.' },
    ],
  },
  'fpga-digital-systems': {
    title: 'FSM-Controlled ALU & Sequential Multiplier',
    subtitle: 'A Verilog digital system that pairs a 14-state Moore controller with a 14-operation datapath and a manually stepped 8 × 8 multiplier.',
    flow: ['Switches & Enter', 'Moore FSM', 'Operand registers', 'ALU / multiplier', 'Displays & LEDs'],
    sections: [
      { title: 'System overview', body: 'The Virginia Tech ECE 3544 project connects an 8-bit operand datapath, a finite-state controller, a sequential multiplier, push-button input, seven-segment displays, and LEDs. The top-level project targets interactive FPGA use.' },
      { title: 'Controller and datapath', body: 'A 14-state Moore-style FSM sequences opcode capture, operand loading, execution, and result presentation. It issues distinct load and execution controls to a separate datapath. A debounced Enter event advances the interaction.' },
      { title: 'Fourteen operations', body: 'The opcode set covers bitwise logic, signed addition and subtraction, complement and negation, arithmetic and circular shifts, sequential multiplication, and an operand-inspection mode. One operation also combines the operands with a coursework-specific constant.' },
      { title: 'Sequential multiplication', body: 'An 8-bit multiplicand and a 17-bit product register implement unsigned shift-and-add multiplication. On each of eight controller steps, the design conditionally adds the multiplicand to the product’s upper portion when the low product bit is set, then shifts the product right. The displayed result uses the lower 16 bits.' },
      { title: 'Testbench architecture', body: 'The repository contains a self-checking top-level testbench with a clock, button-press helpers, expected-result checks, and pass/fail counters. Its scenarios cover the operation codes and arithmetic, shift, multiply, and debug examples. The repository documentation says a complete simulation run has not been independently confirmed; no pass result is claimed here.' },
    ],
  },
  'embedded-systems': {
    title: 'Embedded Systems',
    subtitle: 'Academic MSP432 microcontroller projects connecting C firmware to real peripheral behavior.',
    flow: ['Application logic', 'Hardware abstraction', 'DriverLib / registers', 'MSP432 peripherals'],
    sections: [
      { title: 'Firmware behavior', body: 'Representative academic work includes GPIO input and output, button debouncing, LED control, timer-driven behavior, UART configuration, peripheral initialization, and finite-state-machine applications.' },
      { title: 'Hardware and software layers', body: 'Applications use C with MSP432 peripherals through TI DriverLib or register-level access where appropriate. Keeping application logic separate from device-specific setup makes peripheral changes easier to reason about.' },
      { title: 'Events and timing', body: 'Timers and interrupts provide event-driven alternatives to continuously polling hardware. Button debouncing stabilizes input before it changes application state; UART configuration connects firmware to serial communication.' },
      { title: 'Debugging in context', body: 'A useful debugging pass checks peripheral initialization, signal state, interrupt or timer behavior, and the application state transition that consumes each event. These are coursework and academic projects, not commercial products.' },
    ],
  },
  'robotics-mechatronics': {
    title: 'Robotics & Mechatronics',
    subtitle: 'Connecting input sensing, control decisions, electronics, and physical motion.',
    flow: ['Resistor-ladder keypad', 'Analog input / ADC', 'Key threshold', 'Servo actuation'],
    sections: [
      { title: 'Keypad-controlled servo lock', body: 'This academic prototype reads a resistor-ladder keypad through an Arduino analog input. ADC thresholds distinguish key presses, and control logic requests servo movement for lock and unlock behavior.' },
      { title: 'Signal-to-actuation path', body: 'The input voltage is sampled, mapped to a key event, interpreted by the program, and translated into a servo command. This diagram describes the known components and behavior rather than a measured electrical schematic.' },
      { title: 'Robotics experience', body: 'My background includes World Robot Olympiad, FIRST LEGO League, FIRST Tech Challenge, and VEXU robotics. I have participated in robotics and engineering teams involving electrical systems and programming.' },
      { title: 'Hands-on integration', body: 'This kind of prototype makes sensor thresholds, software decisions, and mechanical response part of one debugging loop. No competition awards, rankings, or commercial deployments are claimed.' },
    ],
  },
  'cpp-ai-workspace': {
    title: 'C++ AI Workspace',
    subtitle: 'A modular software project exploring document processing and workspace organization in C++.',
    flow: ['Document', 'TextProcessor', 'Chunker', 'Workspace'],
    sections: [
      { title: 'Component architecture', body: 'The project concepts center on Document, Workspace, TextProcessor, and Chunker components. They separate document representation, text preparation, segmentation, and workspace organization.' },
      { title: 'Text processing', body: 'Tokenization and chunking turn larger text inputs into smaller organized pieces that can be handled by later retrieval-oriented workflows. This describes a project direction, not a complete production RAG system.' },
      { title: 'Software engineering focus', body: 'The work emphasizes modular interfaces, ownership and data structures, unit testing, and a repeatable build workflow with CMake, Git, and Docker.' },
      { title: 'Scope', body: 'This is an academic software engineering and systems project. No production deployment or end-to-end AI retrieval quality is claimed.' },
    ],
  },
};
