import { Cpu, CircuitBoard, ScanLine, Bot, Braces, ArrowDown, ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectVisual({ kind, compact = false }: { kind: Project['kind']; compact?: boolean }) {
  const Icon = { ocr: ScanLine, fpga: CircuitBoard, embedded: Cpu, robotics: Bot, software: Braces }[kind];
  return <div className={`project-visual visual-${kind}${compact ? ' compact' : ''}`} aria-hidden="true">
    <div className="visual-grid" />
    {kind === 'ocr' && <div className="doc-visual"><span>VEHICLE REGISTRATION · SYNTHETIC</span><i /><i /><i className="highlight" /><i /><small>VIN&nbsp;&nbsp; 1A2BC3D4E5F6G7H8J</small></div>}
    {kind === 'fpga' && <div className="logic-visual"><span>14-STATE MOORE FSM</span><div><b>14-OP ALU</b><b>8-STEP MUL</b></div><small>8-BIT OPERANDS · 16-BIT DISPLAY</small></div>}
    {kind === 'embedded' && <div className="chip-visual"><span>MSP432</span><i>GPIO</i><i>UART</i><i>TIMER</i></div>}
    {kind === 'robotics' && <div className="robot-visual"><span className="signal-node">ANALOG<br/>KEYPAD</span><b className="signal-arrow">→</b><span className="signal-node signal-mcu">ADC<br/>THRESHOLDS</span><b className="signal-arrow">→</b><span className="signal-node signal-servo">SERVO</span></div>}
    {kind === 'software' && <div className="code-visual"><span>Document</span><b>→</b><span>TextProcessor</span><b>→</b><span>Chunker</span><b>→</b><span>Workspace</span></div>}
    <Icon className="visual-icon" strokeWidth={1.15} />
  </div>;
}

export function Pipeline({ items }: { items: string[] }) { return <div className="pipeline" aria-label={items.join(' then ')}>{items.map((item, index) => <div className="pipeline-step" key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b>{index < items.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>; }

export function MultiplierDiagram() {
  return <figure className="multiplier-diagram" aria-labelledby="multiplier-caption">
    <div className="fpga-controls"><span>Debounced Enter pulse</span><ArrowDown/></div>
    <div className="fpga-flow">
      <div className="fpga-block fpga-input"><b>Inputs</b><span>opcode · A[7:0] · B[7:0]</span></div>
      <ArrowRight className="fpga-arrow" aria-hidden="true"/>
      <div className="fpga-block fpga-datapath"><b>Datapath registers</b><span>opcode · operand A · operand B</span></div>
      <ArrowRight className="fpga-arrow" aria-hidden="true"/>
      <div className="fpga-block fpga-result"><b>Result / display</b><span>16-bit result · HEX · LEDs</span></div>
    </div>
    <div className="fpga-lower-flow">
      <div className="fpga-block fpga-mul"><b>Sequential multiplier</b><span>8-bit multiplicand register</span><span>17-bit product register</span><small>if product[0]: add · then shift right</small></div>
      <div className="fpga-block fpga-controller"><b>14-state Moore FSM</b><span>load · execute · mul_step</span><small>8 manual multiply steps</small></div>
    </div>
    <figcaption id="multiplier-caption">The FSM controls register loads and multiplier steps; the multiplier exposes its lower 16 bits to the result/display path.</figcaption>
  </figure>;
}
