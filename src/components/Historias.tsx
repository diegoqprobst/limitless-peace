import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { HISTORIAS, type Historia } from '../data/historias';
import { useLang } from '../i18n/LanguageContext';
import { HistoriaModal } from './HistoriaModal';

/**
 * EL JARDÍN DE LA MEMORIA — modo de historias reales.
 * Un jardín 3D nocturno: una estela con llama por cada artesano/a de la paz.
 * Clic en una llama → se abre su historia (modal DOM, legible).
 */

interface Props {
  onVolverMenu: () => void;
}

function hash(i: number, k: number): number {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Placa con el nombre, dibujada en canvas (sin fuentes externas). */
function PlacaNombre({ nombre, y }: { nombre: string; y: number }) {
  const textura = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 512, 96);
    ctx.font = 'italic 40px Georgia, serif';
    ctx.fillStyle = '#e8e4d9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText(nombre, 256, 48);
    const t = new THREE.CanvasTexture(canvas);
    t.anisotropy = 4;
    return t;
  }, [nombre]);

  return (
    <sprite position={[0, y, 0]} scale={[2.6, 0.5, 1]}>
      <spriteMaterial map={textura} transparent depthWrite={false} />
    </sprite>
  );
}

/** Llama que titila sobre la estela. */
function Llama({ semilla, encendida }: { semilla: number; encendida: boolean }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const luz = useRef<THREE.PointLight>(null);
  useFrame((estado) => {
    const t = estado.clock.elapsedTime;
    const titileo =
      0.75 + Math.sin(t * 9 + semilla * 17) * 0.15 + Math.sin(t * 23 + semilla * 7) * 0.1;
    if (mat.current) mat.current.emissiveIntensity = (encendida ? 2.4 : 1.4) * titileo;
    if (mesh.current) mesh.current.scale.setScalar((encendida ? 1.25 : 1) * (0.9 + titileo * 0.15));
    if (luz.current) luz.current.intensity = (encendida ? 2.6 : 1.2) * titileo;
  });
  return (
    <group position={[0, 1.18, 0]}>
      <mesh ref={mesh}>
        <coneGeometry args={[0.07, 0.22, 8]} />
        <meshStandardMaterial
          ref={mat}
          color="#ffc46b"
          emissive="#ff9d3c"
          emissiveIntensity={2}
        />
      </mesh>
      <pointLight ref={luz} color="#ffaa55" intensity={1.5} distance={3.2} decay={2} />
    </group>
  );
}

function Estela({
  historia,
  posicion,
  rotacionY,
  indice,
  hovered,
  setHovered,
  onAbrir,
}: {
  historia: Historia;
  posicion: [number, number, number];
  rotacionY: number;
  indice: number;
  hovered: boolean;
  setHovered: (id: string | null) => void;
  onAbrir: (id: string) => void;
}) {
  return (
    <group position={posicion} rotation={[0, rotacionY, 0]}>
      {/* interacción */}
      <mesh
        visible={false}
        position={[0, 0.8, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onAbrir(historia.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(historia.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={[1.1, 2.2, 1.1]} />
      </mesh>

      {/* base */}
      <mesh castShadow receiveShadow position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.18, 8]} />
        <meshStandardMaterial color="#5a564e" />
      </mesh>
      {/* estela de piedra */}
      <mesh castShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.22]} />
        <meshStandardMaterial
          color={hovered ? '#cdc6b4' : '#a8a294'}
          emissive={hovered ? '#e8b04b' : '#000000'}
          emissiveIntensity={hovered ? 0.18 : 0}
        />
      </mesh>
      {/* cuenco de la llama */}
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.13, 0.09, 0.1, 8]} />
        <meshStandardMaterial color="#6e675e" />
      </mesh>
      <Llama semilla={indice} encendida={hovered} />
      <PlacaNombre nombre={historia.nombre} y={1.75} />
    </group>
  );
}

/** Luciérnagas flotando en el jardín. */
function Luciernagas() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const datos = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: (hash(i, 1) - 0.5) * 12,
        z: (hash(i, 2) - 0.5) * 9 - 1,
        y: 0.4 + hash(i, 3) * 1.6,
        vel: 0.3 + hash(i, 4) * 0.5,
        fase: hash(i, 5) * Math.PI * 2,
      })),
    [],
  );
  useFrame((estado) => {
    const t = estado.clock.elapsedTime;
    datos.forEach((d, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.position.set(
        d.x + Math.sin(t * d.vel + d.fase) * 0.8,
        d.y + Math.sin(t * d.vel * 1.7 + d.fase) * 0.35,
        d.z + Math.cos(t * d.vel * 0.8 + d.fase) * 0.8,
      );
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.2 + Math.sin(t * 2.5 + d.fase * 3) * 1.1;
    });
  });
  return (
    <>
      {datos.map((d, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#d8e8a0" emissive="#c8e87a" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </>
  );
}

function Jardin({
  hovered,
  setHovered,
  onAbrir,
}: {
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onAbrir: (id: string) => void;
}) {
  const n = HISTORIAS.length;
  return (
    <>
      <color attach="background" args={['#101219']} />
      <fog attach="fog" args={['#101219', 10, 24]} />
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#5a6a8a', '#2a2620', 0.35]} />
      <directionalLight position={[4, 8, 2]} intensity={0.25} color="#aab8d4" />

      {/* suelo del jardín */}
      <mesh receiveShadow position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[9.5, 48]} />
        <meshStandardMaterial color="#27302a" />
      </mesh>
      {/* sendero central */}
      <mesh position={[0, 0.005, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 5.5]} />
        <meshStandardMaterial color="#3a382f" />
      </mesh>

      {/* estelas en semicírculo mirando al centro */}
      {HISTORIAS.map((h, i) => {
        const ang = Math.PI * (0.18 + (0.64 * i) / (n - 1)); // arco frontal
        const radio = 4.4;
        const x = Math.cos(ang) * radio * 1.25;
        const z = -Math.sin(ang) * radio + 1.2;
        return (
          <Estela
            key={h.id}
            historia={h}
            posicion={[x, 0, z]}
            rotacionY={Math.atan2(x, 4 - z)}
            indice={i}
            hovered={hovered === h.id}
            setHovered={setHovered}
            onAbrir={onAbrir}
          />
        );
      })}

      {/* árboles de fondo */}
      {Array.from({ length: 9 }, (_, i) => {
        const ang = Math.PI * (0.05 + (0.9 * i) / 8);
        const radio = 7.2 + hash(i, 8) * 1.5;
        const x = Math.cos(ang) * radio;
        const z = -Math.sin(ang) * radio + 1.2;
        const alto = 1.6 + hash(i, 9) * 1.2;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh castShadow position={[0, alto * 0.3, 0]}>
              <cylinderGeometry args={[0.06, 0.09, alto * 0.6, 5]} />
              <meshStandardMaterial color="#4a3f30" />
            </mesh>
            <mesh castShadow position={[0, alto * 0.75, 0]}>
              <coneGeometry args={[0.55 + hash(i, 10) * 0.25, alto, 7]} />
              <meshStandardMaterial color={i % 2 ? '#33523a' : '#2c4833'} />
            </mesh>
          </group>
        );
      })}

      <Luciernagas />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={0.6}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 0.9, 0]}
      />
    </>
  );
}

export function Historias({ onVolverMenu }: Props) {
  const { lang } = useLang();
  const es = lang === 'es';
  const [hovered, setHovered] = useState<string | null>(null);
  const [abierta, setAbierta] = useState<string | null>(null);
  const historia = HISTORIAS.find((h) => h.id === abierta);

  return (
    <main className="pantalla historias">
      <div className="territorio-cabecera">
        <button className="boton-volver" onClick={onVolverMenu}>
          ← {es ? 'Menú' : 'Menu'}
        </button>
        <div className="historias-titulo">
          <span className="sobretitulo-jardin">
            {es ? 'Historias reales' : 'True stories'}
          </span>
          <h1>{es ? 'El Jardín de la Memoria' : 'The Garden of Memory'}</h1>
        </div>
        <span className="historias-contador">
          🕯️ {HISTORIAS.length}
        </span>
      </div>

      <div className="tablero3d jardin3d">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2.6, 7.5], fov: 42 }}>
          <Jardin hovered={hovered} setHovered={setHovered} onAbrir={setAbierta} />
        </Canvas>
      </div>

      <p className="territorio-mensaje">
        {hovered
          ? HISTORIAS.find((h) => h.id === hovered)?.titulo
          : es
            ? 'Cada llama guarda la historia real de alguien que construyó la paz. Tócala.'
            : 'Each flame holds the true story of someone who built peace. Touch it.'}
      </p>

      {historia && <HistoriaModal historia={historia} onCerrar={() => setAbierta(null)} />}
    </main>
  );
}
