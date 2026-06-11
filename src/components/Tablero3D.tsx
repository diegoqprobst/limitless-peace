import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Celda, Herramienta, TipoEdificio } from '../builder/types';
import { POR_TIPO } from '../builder/catalogo';

/**
 * Tablero 3D del modo Territorio: escena isométrica low-poly (estética
 * Terra Nil) construida solo con primitivas — sin assets externos, costo 0.
 * La lógica del juego vive en builder/engine.ts; esto solo pinta y reporta clics.
 */

interface Props {
  celdas: Celda[][];
  herramienta: Herramienta | null;
  onCelda: (f: number, c: number) => void;
}

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

const MUERTA = new THREE.Color('#46413a');
const VIVA = new THREE.Color('#5d9c64');

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

function Casa({ poblada }: { poblada: boolean }) {
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
    </>
  );
  return poblada ? <Brote>{cuerpo}</Brote> : <group rotation={[0, 0.12, 0.04]}>{cuerpo}</group>;
}

function Edificio({ tipo }: { tipo: TipoEdificio }) {
  let cuerpo: React.ReactNode;
  switch (tipo) {
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
  return <Brote>{cuerpo}</Brote>;
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
  const color =
    celda.tipo === 'minado'
      ? '#4d3038'
      : celda.tipo === 'escombros'
        ? '#3f3b34'
        : MUERTA.clone().lerp(VIVA, celda.vitalidad / 100);

  return (
    <group position={[x, 0, z]}>
      {esRio ? (
        <Agua />
      ) : (
        <mesh
          receiveShadow
          position={[0, -0.15, 0]}
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
          <boxGeometry args={[0.96, 0.3, 0.96]} />
          <meshStandardMaterial
            color={color}
            emissive={hovered ? '#e8b04b' : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>
      )}

      {celda.tipo === 'escombros' && <Escombros f={f} c={c} />}
      {celda.tipo === 'minado' && <SenalMinas />}
      {celda.tipo === 'casa' && <Casa poblada={celda.poblada} />}
      {celda.edificio && <Edificio tipo={celda.edificio} />}
      {celda.tipo === 'tierra' && !celda.edificio && (
        <Vegetacion f={f} c={c} vitalidad={celda.vitalidad} />
      )}
    </group>
  );
}

export function Tablero3D({ celdas, herramienta, onCelda }: Props) {
  const [hovered, setHovered] = useState<[number, number] | null>(null);
  const filas = celdas.length;
  const cols = celdas[0].length;

  const esEdificio = herramienta && herramienta !== 'limpiar' && herramienta !== 'desminar';
  const radioAura = esEdificio ? POR_TIPO[herramienta as TipoEdificio].radio : 0;

  return (
    <div className="tablero3d">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [6.5, 8.5, 9.5], fov: 38 }}
        onPointerMissed={() => setHovered(null)}
      >
        <color attach="background" args={['#11141d']} />
        <fog attach="fog" args={['#11141d', 17, 32]} />
        <ambientLight intensity={0.75} />
        <hemisphereLight args={['#aab8d4', '#4a4438', 0.55]} />
        <directionalLight
          castShadow
          position={[7, 11, 5]}
          intensity={1.6}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
        />

        {/* terreno base bajo el tablero */}
        <mesh position={[0, -0.36, 0]} receiveShadow>
          <boxGeometry args={[cols + 1.2, 0.12, filas + 1.2]} />
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

        {/* previsualización del aura del edificio seleccionado */}
        {hovered && esEdificio && (
          <mesh
            position={[hovered[1] - (cols - 1) / 2, 0.02, hovered[0] - (filas - 1) / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[radioAura * 2 + 0.96, radioAura * 2 + 0.96]} />
            <meshBasicMaterial color="#e8b04b" transparent opacity={0.13} depthWrite={false} />
          </mesh>
        )}

        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={18}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI / 2.7}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
