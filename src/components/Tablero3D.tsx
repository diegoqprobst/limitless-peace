import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Celda, EfectoVisual, Herramienta, TipoEdificio } from '../builder/types';
import { POR_TIPO } from '../builder/catalogo';

/** Pop flotante "+N Indicador" sobre la celda donde se acaba de construir. */
export interface PopEfecto {
  f: number;
  c: number;
  efectos: Partial<Record<'confianza' | 'seguridad' | 'justicia' | 'legitimidad', number>>;
  /** Cambia cada vez para reiniciar la animación. */
  clave: number;
}

/**
 * Tablero 3D del modo Territorio: escena isométrica low-poly (estética
 * Terra Nil) construida solo con primitivas — sin assets externos, costo 0.
 * La lógica del juego vive en builder/engine.ts; esto solo pinta y reporta clics.
 */

interface Props {
  celdas: Celda[][];
  herramienta: Herramienta | null;
  onCelda: (f: number, c: number) => void;
  /** Efecto ambiental activo: lluvia sobre el valle, humo tras un ataque. */
  efecto?: EfectoVisual | null;
  /** Salud del proceso 0–1: el valle se ilumina cálido cuando va bien. */
  progreso?: number;
  /** Pop "+N Indicador" sobre la celda recién construida. */
  pop?: PopEfecto | null;
}

const IND_COLOR: Record<string, string> = {
  confianza: '#6ba3c7',
  seguridad: '#7fb585',
  justicia: '#b48ec9',
  legitimidad: '#ecb24f',
};
const IND_NOMBRE: Record<string, string> = {
  confianza: 'Confianza',
  seguridad: 'Seguridad',
  justicia: 'Justicia',
  legitimidad: 'Legitimidad',
};

/** Pseudo-aleatorio determinista por celda (sin Math.random: estable entre renders). */
function hash(f: number, c: number, k: number): number {
  const s = Math.sin(f * 127.1 + c * 311.7 + k * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/**
 * Contraste tierra muerta → viva más fuerte (Claude Design): curva de tres
 * paradas con realce no lineal — tierra quemada → ocre (vegetación incipiente)
 * → verde vivo. "Reverdecer" ahora se SIENTE como un cambio real.
 */
const MUERTA = new THREE.Color('#6b4a30');
const MEDIA = new THREE.Color('#9a8a44');
const VIVA = new THREE.Color('#4ea857');
function tierraColor(vit: number): THREE.Color {
  const t = Math.pow(Math.max(0, vit) / 100, 0.8);
  return t < 0.5 ? MUERTA.clone().lerp(MEDIA, t / 0.5) : MEDIA.clone().lerp(VIVA, (t - 0.5) / 0.5);
}

/** Paletas de ropa y piel para las figuras del valle. */
const ROPA = ['#b5563f', '#5a7da3', '#c79a4f', '#6f8f5a', '#a86a8e', '#7a6f95', '#c2784a'];
const PIEL = ['#caa07a', '#a87b53', '#e0bd97', '#8a6240'];

/** Una figura low-poly con balanceo de reposo: el valle se siente habitado. */
function Persona({
  ropa,
  piel,
  fase,
  vel,
}: {
  ropa: string;
  piel: string;
  fase: number;
  vel: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((estado) => {
    if (ref.current) ref.current.position.y = Math.sin(estado.clock.elapsedTime * vel + fase) * 0.015;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.065, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.045, 0.13, 6]} />
        <meshStandardMaterial color={ropa} />
      </mesh>
      <mesh position={[0, 0.155, 0]} castShadow>
        <sphereGeometry args={[0.034, 7, 6]} />
        <meshStandardMaterial color={piel} />
      </mesh>
    </group>
  );
}

/** Reparte n figuras alrededor del centro de una celda (sin pisar el edificio). */
function Gente({ n, seed, radio = 0.34 }: { n: number; seed: number; radio?: number }) {
  const gente = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => {
        const a = hash(seed, i, 11) * Math.PI * 2;
        const r = radio * (0.55 + hash(seed, i, 12) * 0.45);
        return {
          x: Math.cos(a) * r,
          z: Math.sin(a) * r,
          ry: hash(seed, i, 13) * Math.PI * 2,
          ropa: ROPA[Math.floor(hash(seed, i, 3) * ROPA.length)],
          piel: PIEL[Math.floor(hash(seed, i, 4) * PIEL.length)],
          fase: hash(seed, i, 5) * Math.PI * 2,
          vel: 0.8 + hash(seed, i, 6),
        };
      }),
    [n, seed, radio],
  );
  return (
    <>
      {gente.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]} rotation={[0, p.ry, 0]}>
          <Persona ropa={p.ropa} piel={p.piel} fase={p.fase} vel={p.vel} />
        </group>
      ))}
    </>
  );
}

/** Humo que sube de la chimenea de una casa con familia. */
function HumoChimenea() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((estado) => {
    const tg = estado.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const off = i / 3;
      const ph = (tg * 0.35 + off) % 1;
      m.position.y = ph * 0.32;
      m.position.x = Math.sin(ph * 6 + off * 6) * 0.04;
      (m.material as THREE.MeshStandardMaterial).opacity = 0.5 * (1 - ph);
      m.scale.setScalar(0.6 + ph * 1.1);
    });
  });
  return (
    <group position={[0.15, 0.6, -0.12]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)}>
          <sphereGeometry args={[0.05, 6, 5]} />
          <meshStandardMaterial color="#cfcabc" transparent opacity={0.5} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** Altura de cada escalón de relieve del terreno. */
const ESCALON = 0.34;

/** Grupo que "brota" al montarse (construcción de edificios, retorno de familias). */
function Brote({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const inicio = useRef(-1);
  useFrame((estado) => {
    if (!ref.current) return;
    if (inicio.current < 0) inicio.current = estado.clock.elapsedTime;
    const t = Math.min(1, (estado.clock.elapsedTime - inicio.current) / 0.6);
    const s = t >= 1 ? 1 : Math.max(0.001, easeOutBack(t));
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={ref} scale={0.001}>
      {children}
    </group>
  );
}

/** Ventana cálida que late en las casas repobladas. */
function VentanaViva() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((estado) => {
    if (mat.current) {
      mat.current.emissiveIntensity = 1.4 + Math.sin(estado.clock.elapsedTime * 2.2) * 0.5;
    }
  });
  return (
    <mesh position={[0, 0.16, 0.252]}>
      <boxGeometry args={[0.13, 0.13, 0.02]} />
      <meshStandardMaterial
        ref={mat}
        color="#ffb84d"
        emissive="#ffb84d"
        emissiveIntensity={1.4}
      />
    </mesh>
  );
}

function Casa({ poblada, seed }: { poblada: boolean; seed: number }) {
  const cuerpo = (
    <>
      <mesh castShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[0.52, 0.36, 0.52]} />
        <meshStandardMaterial color={poblada ? '#cdbe9a' : '#6e665c'} />
      </mesh>
      <mesh castShadow position={[0, 0.46, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.44, 0.3, 4]} />
        <meshStandardMaterial color={poblada ? '#a8543f' : '#524a42'} />
      </mesh>
      {poblada && <VentanaViva />}
      {poblada && (
        <>
          {/* chimenea humeante + la familia que volvió frente a su casa */}
          <mesh castShadow position={[0.15, 0.5, -0.12]}>
            <boxGeometry args={[0.07, 0.14, 0.07]} />
            <meshStandardMaterial color="#7a6a58" />
          </mesh>
          <HumoChimenea />
          <Gente n={1 + Math.floor(hash(seed, 0, 7) * 2)} seed={seed} radio={0.36} />
        </>
      )}
    </>
  );
  return poblada ? <Brote>{cuerpo}</Brote> : <group rotation={[0, 0.12, 0.04]}>{cuerpo}</group>;
}

/** Edificios cívicos a cuyo alrededor se reúne la gente. */
const EDIFICIOS_CON_GENTE: Partial<Record<TipoEdificio, number>> = {
  salud: 2,
  escuela: 3,
  alimentos: 2,
  mercado: 3,
  cancha: 2,
};

function Edificio({ tipo, seed }: { tipo: TipoEdificio; seed: number }) {
  let cuerpo: React.ReactNode;
  switch (tipo) {
    case 'base':
      cuerpo = (
        <>
          {/* carpa humanitaria (sin emblema: neutralidad y respeto legal) */}
          <mesh castShadow position={[0, 0.22, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.42, 0.44, 4]} />
            <meshStandardMaterial color="#ddd6c8" />
          </mesh>
          <mesh castShadow position={[0.28, 0.1, 0.22]}>
            <boxGeometry args={[0.16, 0.2, 0.16]} />
            <meshStandardMaterial color="#a3805a" />
          </mesh>
          <mesh castShadow position={[-0.05, 0.52, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.5, 5]} />
            <meshStandardMaterial color="#9a9a9a" />
          </mesh>
          <mesh position={[0.06, 0.7, 0]}>
            <boxGeometry args={[0.16, 0.1, 0.01]} />
            <meshStandardMaterial color="#ecb24f" emissive="#ecb24f" emissiveIntensity={0.5} />
          </mesh>
        </>
      );
      break;
    case 'agua':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.24, 0.26, 0.36, 10]} />
            <meshStandardMaterial color="#7d9bb5" />
          </mesh>
          <mesh castShadow position={[0.22, 0.12, 0.18]}>
            <cylinderGeometry args={[0.09, 0.09, 0.24, 8]} />
            <meshStandardMaterial color="#5e7d96" />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#9fc4e0" emissive="#6fa8c9" emissiveIntensity={0.7} />
          </mesh>
        </>
      );
      break;
    case 'alimentos':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.16, 0]}>
            <boxGeometry args={[0.6, 0.32, 0.46]} />
            <meshStandardMaterial color="#b08d57" />
          </mesh>
          {[
            [-0.16, 0.38, 0.05],
            [0.08, 0.38, -0.08],
            [0.2, 0.38, 0.12],
          ].map(([x, y, z], i) => (
            <mesh key={i} castShadow position={[x, y, z]}>
              <boxGeometry args={[0.14, 0.12, 0.14]} />
              <meshStandardMaterial color={i % 2 ? '#c9a36a' : '#8fae6b'} />
            </mesh>
          ))}
        </>
      );
      break;
    case 'salud':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.22, 0]}>
            <boxGeometry args={[0.6, 0.44, 0.55]} />
            <meshStandardMaterial color="#ddd6c8" />
          </mesh>
          <mesh position={[0, 0.34, 0.281]}>
            <boxGeometry args={[0.26, 0.07, 0.02]} />
            <meshStandardMaterial color="#c4453c" />
          </mesh>
          <mesh position={[0, 0.34, 0.281]}>
            <boxGeometry args={[0.07, 0.26, 0.02]} />
            <meshStandardMaterial color="#c4453c" />
          </mesh>
        </>
      );
      break;
    case 'escuela':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.2, 0]}>
            <boxGeometry args={[0.62, 0.4, 0.5]} />
            <meshStandardMaterial color="#b08d57" />
          </mesh>
          <mesh castShadow position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.66, 6]} />
            <meshStandardMaterial color="#8a6f4d" />
          </mesh>
          <mesh castShadow position={[0.22, 0.62, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} />
            <meshStandardMaterial color="#9a9a9a" />
          </mesh>
          <mesh position={[0.31, 0.8, 0]}>
            <boxGeometry args={[0.16, 0.1, 0.01]} />
            <meshStandardMaterial color="#e8b04b" emissive="#e8b04b" emissiveIntensity={0.4} />
          </mesh>
        </>
      );
      break;
    case 'encuentro':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.2, 0]}>
            <boxGeometry args={[0.55, 0.4, 0.55]} />
            <meshStandardMaterial color="#c9bfa8" />
          </mesh>
          <mesh castShadow position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.26, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#7d9bb5" />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#e8b04b" emissive="#e8b04b" emissiveIntensity={0.6} />
          </mesh>
        </>
      );
      break;
    case 'mercado':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.14, 0]}>
            <boxGeometry args={[0.62, 0.28, 0.5]} />
            <meshStandardMaterial color="#a3805a" />
          </mesh>
          <mesh castShadow position={[0, 0.36, 0.12]} rotation={[-0.5, 0, 0]}>
            <boxGeometry args={[0.68, 0.02, 0.4]} />
            <meshStandardMaterial color="#c97f4f" />
          </mesh>
          <mesh position={[-0.18, 0.32, 0.26]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#8fae6b" />
          </mesh>
          <mesh position={[0.12, 0.32, 0.26]}>
            <boxGeometry args={[0.12, 0.08, 0.1]} />
            <meshStandardMaterial color="#c4453c" />
          </mesh>
        </>
      );
      break;
    case 'memorial':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.06, 0]}>
            <boxGeometry args={[0.5, 0.12, 0.5]} />
            <meshStandardMaterial color="#8d8a82" />
          </mesh>
          <mesh castShadow position={[0, 0.45, 0]}>
            <boxGeometry args={[0.14, 0.66, 0.14]} />
            <meshStandardMaterial color="#b5b2a8" />
          </mesh>
          {[-0.17, 0.17].map((x) => (
            <mesh key={x} position={[x, 0.16, 0.18]}>
              <cylinderGeometry args={[0.025, 0.03, 0.09, 6]} />
              <meshStandardMaterial
                color="#ffd9a0"
                emissive="#ff9d3c"
                emissiveIntensity={1.6}
              />
            </mesh>
          ))}
        </>
      );
      break;
    case 'emisora':
      cuerpo = (
        <>
          <mesh castShadow position={[0, 0.16, 0]}>
            <boxGeometry args={[0.5, 0.32, 0.42]} />
            <meshStandardMaterial color="#7d8a96" />
          </mesh>
          <mesh castShadow position={[0.12, 0.55, 0]}>
            <cylinderGeometry args={[0.018, 0.03, 0.5, 6]} />
            <meshStandardMaterial color="#9a9a9a" />
          </mesh>
          <mesh position={[0.12, 0.84, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#ff5544" emissive="#ff5544" emissiveIntensity={1.8} />
          </mesh>
        </>
      );
      break;
    case 'cancha':
      cuerpo = (
        <>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.78, 0.05, 0.6]} />
            <meshStandardMaterial color="#4f7d4a" />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.04, 0.012, 0.6]} />
            <meshStandardMaterial color="#ddd6c8" />
          </mesh>
          {[-0.36, 0.36].map((x) => (
            <mesh key={x} castShadow position={[x, 0.14, 0]}>
              <boxGeometry args={[0.03, 0.18, 0.3]} />
              <meshStandardMaterial color="#ddd6c8" />
            </mesh>
          ))}
        </>
      );
      break;
  }
  const gente = EDIFICIOS_CON_GENTE[tipo];
  return (
    <Brote>
      {cuerpo}
      {gente ? <Gente n={gente} seed={seed} radio={0.42} /> : null}
    </Brote>
  );
}

/** Árboles que brotan en celdas vivas: la restauración se VE crecer. */
function Vegetacion({ f, c, vitalidad }: { f: number; c: number; vitalidad: number }) {
  const cantidad = Math.min(4, Math.floor(vitalidad / 25));
  if (cantidad === 0) return null;
  return (
    <>
      {Array.from({ length: cantidad }, (_, i) => {
        const x = (hash(f, c, i * 2) - 0.5) * 0.7;
        const z = (hash(f, c, i * 2 + 1) - 0.5) * 0.7;
        const alto = 0.22 + hash(f, c, i + 9) * 0.22;
        return (
          <Brote key={i}>
            <group position={[x, 0, z]}>
              <mesh castShadow position={[0, alto * 0.25, 0]}>
                <cylinderGeometry args={[0.025, 0.035, alto * 0.5, 5]} />
                <meshStandardMaterial color="#6d5a43" />
              </mesh>
              <mesh castShadow position={[0, alto * 0.65, 0]}>
                <coneGeometry args={[0.12 + hash(f, c, i + 5) * 0.05, alto, 6]} />
                <meshStandardMaterial color={i % 2 ? '#5d9c64' : '#4f8a56'} />
              </mesh>
            </group>
          </Brote>
        );
      })}
    </>
  );
}

function Escombros({ f, c }: { f: number; c: number }) {
  return (
    <>
      {Array.from({ length: 4 }, (_, i) => (
        <mesh
          key={i}
          castShadow
          position={[(hash(f, c, i) - 0.5) * 0.6, 0.07, (hash(f, c, i + 4) - 0.5) * 0.6]}
          rotation={[hash(f, c, i + 8) * 0.8, hash(f, c, i + 12) * Math.PI, 0]}
        >
          <boxGeometry args={[0.16 + hash(f, c, i + 16) * 0.12, 0.12, 0.14]} />
          <meshStandardMaterial color="#6e675e" />
        </mesh>
      ))}
    </>
  );
}

function SenalMinas() {
  return (
    <group>
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.4, 6]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]} rotation={[0, 0.6, Math.PI / 4]}>
        <boxGeometry args={[0.22, 0.22, 0.02]} />
        <meshStandardMaterial color="#c4453c" emissive="#c4453c" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

/** Lluvia sobre el valle (evento "Las lluvias se llevan el vado"). */
function Lluvia({ cols, filas }: { cols: number; filas: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const gotas = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        x: (hash(i, 0, 1) - 0.5) * (cols + 2),
        z: (hash(i, 0, 2) - 0.5) * (filas + 2),
        y: hash(i, 0, 3) * 6,
        vel: 5 + hash(i, 0, 4) * 4,
      })),
    [cols, filas],
  );
  useFrame((_, delta) => {
    gotas.forEach((g, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.y -= g.vel * delta;
      if (m.position.y < 0) m.position.y = 5 + hash(i, 0, 7);
    });
  });
  return (
    <>
      {gotas.map((g, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={[g.x, g.y, g.z]}>
          <boxGeometry args={[0.012, 0.3, 0.012]} />
          <meshBasicMaterial color="#7d9bb5" transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

/** Humo y brasas sobre el edificio recién destruido (incursión). */
function Humo({ x, z }: { x: number; z: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const nubes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        dx: (hash(i, 0, 11) - 0.5) * 0.3,
        dz: (hash(i, 0, 12) - 0.5) * 0.3,
        vel: 0.35 + hash(i, 0, 13) * 0.3,
        fase: hash(i, 0, 14) * 2,
        escala: 0.07 + hash(i, 0, 15) * 0.08,
      })),
    [],
  );
  useFrame((estado) => {
    const t = estado.clock.elapsedTime;
    nubes.forEach((n, i) => {
      const m = refs.current[i];
      if (!m) return;
      const ciclo = ((t * n.vel + n.fase) % 1.6) / 1.6;
      m.position.set(x + n.dx + ciclo * 0.15, 0.15 + ciclo * 1.1, z + n.dz);
      m.scale.setScalar(n.escala * (1 + ciclo * 1.6));
      (m.material as THREE.MeshStandardMaterial).opacity = 0.55 * (1 - ciclo);
    });
  });
  return (
    <>
      {nubes.map((_n, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={[x, 0.2, z]}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshStandardMaterial color="#5a5a5a" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}
      <pointLight position={[x, 0.25, z]} color="#ff6a3c" intensity={1.6} distance={2.2} />
    </>
  );
}

function Agua() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((estado) => {
    if (mat.current) {
      mat.current.emissiveIntensity = 0.18 + Math.sin(estado.clock.elapsedTime * 1.4) * 0.08;
    }
  });
  return (
    <mesh position={[0, -0.21, 0]} receiveShadow>
      <boxGeometry args={[1, 0.18, 1]} />
      <meshStandardMaterial ref={mat} color="#2b4f6e" emissive="#3a6e96" emissiveIntensity={0.2} />
    </mesh>
  );
}

interface CeldaTileProps {
  celda: Celda;
  f: number;
  c: number;
  x: number;
  z: number;
  hovered: boolean;
  setHovered: (v: [number, number] | null) => void;
  onCelda: (f: number, c: number) => void;
}

function CeldaTile({ celda, f, c, x, z, hovered, setHovered, onCelda }: CeldaTileProps) {
  const esRio = celda.tipo === 'rio';
  const elev = celda.elevacion ?? 0;
  const yTop = elev * ESCALON; // altura de la superficie de esta celda
  const altura = 0.3 + elev * ESCALON; // el pilar baja hasta la base común
  const color =
    celda.tipo === 'minado'
      ? '#4d3038'
      : celda.tipo === 'escombros'
        ? '#3f3b34'
        : tierraColor(celda.vitalidad);

  return (
    <group position={[x, yTop, z]}>
      {esRio ? (
        <Agua />
      ) : (
        <mesh
          receiveShadow
          position={[0, -altura / 2, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onCelda(f, c);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered([f, c]);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(null);
            document.body.style.cursor = 'auto';
          }}
        >
          <boxGeometry args={[0.96, altura, 0.96]} />
          <meshStandardMaterial
            color={color}
            emissive={hovered ? '#e8b04b' : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>
      )}

      {celda.tipo === 'escombros' && <Escombros f={f} c={c} />}
      {celda.tipo === 'minado' && <SenalMinas />}
      {celda.tipo === 'casa' && <Casa poblada={celda.poblada} seed={f * 31 + c * 7 + 1} />}
      {celda.edificio && <Edificio tipo={celda.edificio} seed={f * 31 + c * 7 + 1} />}
      {celda.tipo === 'tierra' && !celda.edificio && (
        <Vegetacion f={f} c={c} vitalidad={celda.vitalidad} />
      )}
    </group>
  );
}

/**
 * El mundo alrededor del valle (Claude Design, jun 2026): el tablero se vuelve
 * un diorama sobre un pedestal, abrazado por colinas y montañas en capas que se
 * pierden en la niebla, con un lago al que desemboca el río. Escenografía pura
 * (no recibe clics) — la mecánica del valle no cambia.
 */
function Entorno({ cols, filas }: { cols: number; filas: number }) {
  const env = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed % 2147483647;
      if (s <= 0) s += 2147483646;
      return () => (s = (s * 16807) % 2147483647) / 2147483647;
    };
    const anillo = (radio: number, n: number, aMin: number, aMax: number, seed: number) => {
      const rr = rng(seed);
      return Array.from({ length: n }, (_, i) => {
        const ang = (i / n) * Math.PI * 2 + rr() * 0.3;
        const rad = radio + (rr() - 0.5) * radio * 0.18;
        const alto = aMin + (aMax - aMin) * rr();
        return {
          x: Math.cos(ang) * rad,
          z: Math.sin(ang) * rad,
          alto,
          base: alto * (0.7 + rr() * 0.5),
          ry: rr() * Math.PI,
        };
      });
    };
    const m1 = anillo(28, 22, 6, 12, 11);
    const m2 = anillo(44, 26, 9, 18, 21);
    const m3 = anillo(64, 22, 14, 26, 31);

    const rh = rng(55);
    const colinas = Array.from({ length: 15 }, () => {
      const ang = rh() * Math.PI * 2;
      const rad = 11 + rh() * 9;
      const alto = 0.5 + rh() * 1.1;
      const ancho = 2.6 + rh() * 2.4;
      const cx = Math.cos(ang) * rad;
      const cz = Math.sin(ang) * rad;
      const pinos = Array.from({ length: 2 + Math.floor(rh() * 3) }, () => {
        const pa = rh() * Math.PI * 2;
        const pd = rh() * ancho * 0.7;
        const ph = 0.8 + rh() * 1;
        return { x: cx + Math.cos(pa) * pd, y: -1.4 + alto * 0.6 + ph / 2, z: cz + Math.sin(pa) * pd, ph };
      });
      return { cx, cz, ancho, alto, pinos };
    });

    const rp = rng(77);
    const pinosLejos = Array.from({ length: 64 }, () => {
      const ang = rp() * Math.PI * 2;
      const rad = 22 + rp() * 16;
      const ph = 1.4 + rp() * 2.4;
      return { x: Math.cos(ang) * rad, y: -1.4 + ph / 2, z: Math.sin(ang) * rad, ph };
    });

    // terreno desplazado: se hunde bajo el tablero, ondula y sube hacia el horizonte
    const terreno = new THREE.PlaneGeometry(190, 190, 52, 52);
    terreno.rotateX(-Math.PI / 2);
    const pos = terreno.attributes.position;
    const rt = rng(99);
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      const d = Math.hypot(px, pz);
      const hueco = Math.max(0, 1 - d / 7) * 1.2;
      const ondas = (Math.sin(px * 0.18 + 1) + Math.cos(pz * 0.16)) * 0.5 + rt() * 0.4;
      const subeLejos = Math.min(1, d / 56) * 2.4;
      pos.setY(i, -1.0 - hueco + ondas * (d > 9 ? 1 : 0) + subeLejos);
    }
    terreno.computeVertexNormals();

    return { m1, m2, m3, colinas, pinosLejos, terreno };
  }, []);

  const Montanas = ({ datos, color }: { datos: typeof env.m1; color: string }) => (
    <>
      {datos.map((m, i) => (
        <mesh key={i} position={[m.x, m.alto / 2 - 1.5, m.z]} rotation={[0, m.ry, 0]}>
          <coneGeometry args={[m.base, m.alto, 4]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      ))}
    </>
  );

  const lago: [number, number, number] = [cols * 0.85, -0.95, filas * 1.0];

  return (
    <group>
      {/* terreno hasta el horizonte */}
      <mesh geometry={env.terreno} position={[0, -0.05, 0]} receiveShadow>
        <meshStandardMaterial color="#2c3330" flatShading />
      </mesh>

      {/* montañas en capas (profundidad atmosférica) */}
      <Montanas datos={env.m3} color="#28303c" />
      <Montanas datos={env.m2} color="#2f3845" />
      <Montanas datos={env.m1} color="#39434f" />

      {/* colinas cercanas con pinos */}
      {env.colinas.map((h, i) => (
        <group key={i}>
          <mesh position={[h.cx, -1.4, h.cz]} scale={[1, h.alto / h.ancho, 1]} receiveShadow>
            <sphereGeometry args={[h.ancho, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#313a33" flatShading />
          </mesh>
          {h.pinos.map((p, j) => (
            <mesh key={j} position={[p.x, p.y, p.z]}>
              <coneGeometry args={[0.26, p.ph, 5]} />
              <meshStandardMaterial color="#2c3b30" flatShading />
            </mesh>
          ))}
        </group>
      ))}

      {/* bosque lejano */}
      {env.pinosLejos.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <coneGeometry args={[0.5, p.ph, 5]} />
          <meshStandardMaterial color="#2c3b30" flatShading />
        </mesh>
      ))}

      {/* lago al que desemboca el río */}
      <mesh position={lago} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 40]} />
        <meshStandardMaterial
          color="#2b4f6e"
          emissive="#3a6e96"
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/** Mezcla dos colores hex (t de 0 a 1). */
function lerpHex(a: string, b: string, t: number): string {
  return '#' + new THREE.Color(a).lerp(new THREE.Color(b), t).getHexString();
}

export function Tablero3D({ celdas, herramienta, onCelda, efecto, progreso = 0, pop }: Props) {
  const [hovered, setHovered] = useState<[number, number] | null>(null);
  const filas = celdas.length;
  const cols = celdas[0].length;

  const esEdificio = herramienta && herramienta !== 'limpiar' && herramienta !== 'desminar';
  const radioAura = esEdificio ? POR_TIPO[herramienta as TipoEdificio].radio : 0;

  // El valle se entibia a medida que sana: de la noche fría de la guerra al
  // amanecer cálido de la paz (recompensa visual atada al progreso real).
  const t = Math.max(0, Math.min(1, progreso));
  const fondo = lerpHex('#11141d', '#1e1722', t);
  const ambColor = lerpHex('#9aa6c0', '#ffe0ad', t);
  const cieloHemi = lerpHex('#aab8d4', '#ffd9a8', t);
  const solColor = lerpHex('#dfe6f2', '#ffd29a', t);

  return (
    <div className="tablero3d">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [6.5, 8.5, 9.5], fov: 38 }}
        onPointerMissed={() => setHovered(null)}
      >
        <color attach="background" args={[fondo]} />
        <fog attach="fog" args={[fondo, 24, 88]} />
        <ambientLight intensity={0.72 + t * 0.15} color={ambColor} />
        <hemisphereLight args={[cieloHemi, '#4a4438', 0.55]} />
        <directionalLight
          castShadow
          position={[7, 11, 5]}
          intensity={1.6}
          color={solColor}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
        />

        {/* el mundo alrededor del valle (diorama sobre pedestal) */}
        <Entorno cols={cols} filas={filas} />

        {/* pedestal grueso que sostiene el valle */}
        <mesh position={[0, -0.55, 0]} receiveShadow castShadow>
          <boxGeometry args={[cols + 1.2, 0.5, filas + 1.2]} />
          <meshStandardMaterial color="#23252e" />
        </mesh>

        {celdas.map((fila, f) =>
          fila.map((celda, c) => (
            <CeldaTile
              key={`${f}-${c}`}
              celda={celda}
              f={f}
              c={c}
              x={c - (cols - 1) / 2}
              z={f - (filas - 1) / 2}
              hovered={hovered?.[0] === f && hovered?.[1] === c}
              setHovered={setHovered}
              onCelda={onCelda}
            />
          )),
        )}

        {/* efectos ambientales de los eventos */}
        {efecto?.tipo === 'lluvia' && <Lluvia cols={cols} filas={filas} />}
        {efecto?.tipo === 'ataque' && (
          <Humo x={efecto.c - (cols - 1) / 2} z={efecto.f - (filas - 1) / 2} />
        )}

        {/* previsualización del aura del edificio seleccionado (a la altura del terreno) */}
        {hovered && esEdificio && (
          <mesh
            position={[
              hovered[1] - (cols - 1) / 2,
              (celdas[hovered[0]][hovered[1]].elevacion ?? 0) * ESCALON + 0.02,
              hovered[0] - (filas - 1) / 2,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[radioAura * 2 + 0.96, radioAura * 2 + 0.96]} />
            <meshBasicMaterial color="#e8b04b" transparent opacity={0.13} depthWrite={false} />
          </mesh>
        )}

        {/* pop "+N Indicador" flotante sobre la celda recién construida */}
        {pop && (
          <Html
            key={pop.clave}
            position={[
              pop.c - (cols - 1) / 2,
              (celdas[pop.f]?.[pop.c]?.elevacion ?? 0) * ESCALON + 1,
              pop.f - (filas - 1) / 2,
            ]}
            center
            distanceFactor={9}
            pointerEvents="none"
            zIndexRange={[20, 0]}
          >
            <div className="pop-efecto">
              {Object.entries(pop.efectos)
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <span key={k} style={{ color: IND_COLOR[k] }}>
                    +{v} {IND_NOMBRE[k]}
                  </span>
                ))}
            </div>
          </Html>
        )}

        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={40}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.4}
          enableDamping
          dampingFactor={0.07}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
