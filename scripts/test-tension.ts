/**
 * Test de los sistemas de tensión del modo Territorio (motor puro, sin UI).
 * Ejecutar: node --experimental-strip-types scripts/test-tension.ts
 */
import {
  actuar,
  avanzarMes,
  cerrarEvento,
  contarFamilias,
  crearEstado,
  ingresoMensual,
  resolverEvento,
} from '../src/builder/engine.ts';
import { NIVEL_VALLE } from '../src/builder/nivel-valle.ts';

let fallos = 0;
function check(nombre: string, cond: boolean, detalle?: string) {
  console.log(`${cond ? '✓' : '✗'} ${nombre}${detalle ? ` — ${detalle}` : ''}`);
  if (!cond) fallos++;
}

// ── Partida con seguridad baja: debe llegar la incursión y destruir el edificio ──
let e = crearEstado(NIVEL_VALLE);
e = { ...e, fase: 'jugando' };

// Colocar espacio de culto en (3,4) (tierra)
e = { ...e, herramienta: 'encuentro' };
e = actuar(e, NIVEL_VALLE, 3, 4);
check('edificio colocado', e.celdas[3][4].edificio === 'encuentro');
check('fondos descontados', e.fondos === 120 - 25, `fondos=${e.fondos}`);

// Mantenimiento: ingreso neto = base 20 + 0 mercados − 2 mantenimiento = 18
check('mantenimiento aplicado al ingreso', ingresoMensual(NIVEL_VALLE, e.celdas) === 18);

// Mes 2: evento fijo de excombatientes
e = avanzarMes(e, NIVEL_VALLE);
check('mes 2: evento excombatientes', e.eventoActivo?.id === 'retorno-excombatientes');
check('evento trae eco histórico (Mandela)', e.eventoActivo?.eco?.historiaId === 'mandela');
e = resolverEvento(e, e.eventoActivo!.opciones[1]); // pedirles esperar (−confianza, −seguridad)
e = cerrarEvento(e, NIVEL_VALLE);

// Mes 3: seguridad sigue < 40 → incursión condicional
e = avanzarMes(e, NIVEL_VALLE);
check('mes 3: incursión disparada por seguridad baja', e.eventoActivo?.id === 'incursion');
check('incursión trae eco histórico (Hume)', e.eventoActivo?.eco?.historiaId === 'hume');

// Opción B: no ceder → destruye el edificio más caro (el encuentro, único)
e = resolverEvento(e, e.eventoActivo!.opciones[1]);
check('edificio destruido', e.celdas[3][4].edificio === undefined);
check('celda quedó en escombros', e.celdas[3][4].tipo === 'escombros');
check('mensaje de consecuencia', (e.mensaje ?? '').includes('destruyó'), e.mensaje ?? '');
e = cerrarEvento(e, NIVEL_VALLE);
check('sigue jugando (no derrota aún)', e.fase === 'jugando');

// ── Minas sin desminar a partir del mes 6 → accidente ──
let e2 = e;
while (e2.mes < 6) {
  e2 = avanzarMes(e2, NIVEL_VALLE);
  if (e2.eventoActivo) {
    e2 = resolverEvento(e2, e2.eventoActivo.opciones[0]);
    e2 = cerrarEvento(e2, NIVEL_VALLE);
  }
}
let encontroAccidente = false;
for (let i = 0; i < 4 && !encontroAccidente; i++) {
  e2 = avanzarMes(e2, NIVEL_VALLE);
  if (e2.eventoActivo?.id === 'accidente-mina') encontroAccidente = true;
  else if (e2.eventoActivo) {
    e2 = resolverEvento(e2, e2.eventoActivo.opciones[0]);
    e2 = cerrarEvento(e2, NIVEL_VALLE);
  }
}
check('accidente de mina ocurre con minas activas tras mes 6', encontroAccidente, `mes=${e2.mes}`);

// ── Derrota: un indicador ≤ 10 al cerrar un evento ──
let e3 = { ...e, indicadores: { ...e.indicadores, confianza: 8 }, eventoActivo: NIVEL_VALLE.eventos[0], retroEvento: NIVEL_VALLE.eventos[0].opciones[0] };
e3 = cerrarEvento(e3, NIVEL_VALLE);
check('derrota cuando un indicador cae a ≤10', e3.fase === 'fracaso');

// ── Familias huyen si la vitalidad cae (vía destrucción) ──
const fam = contarFamilias(e.celdas);
check('conteo de familias coherente', fam.total === 6, `total=${fam.total}`);


// ── Cadenas causales nuevas ──
// Brote: lluvias vistas + sin agua + mes>=7
let e4 = crearEstado(NIVEL_VALLE);
e4 = { ...e4, fase: 'jugando', mes: 6, eventosVistos: ['lluvias', 'retorno-excombatientes', 'rumor-memorial', 'incursion', 'accidente-mina'], indicadores: { ...e4.indicadores, seguridad: 80 } };
e4 = avanzarMes(e4, NIVEL_VALLE);
check('cadena aluvión→brote se dispara sin potabilizadora', e4.eventoActivo?.id === 'brote');

// Brote PREVENIDO si hay planta de agua
let e5 = crearEstado(NIVEL_VALLE);
e5 = { ...e5, fase: 'jugando', mes: 6, fondos: 200, herramienta: 'agua', eventosVistos: ['lluvias', 'retorno-excombatientes', 'rumor-memorial', 'incursion', 'accidente-mina'], indicadores: { ...e5.indicadores, seguridad: 80 } };
e5 = actuar(e5, NIVEL_VALLE, 2, 2);
e5 = avanzarMes(e5, NIVEL_VALLE);
check('la potabilizadora PREVIENE el brote', e5.eventoActivo?.id !== 'brote', `evento=${e5.eventoActivo?.id ?? 'ninguno'}`);

// Reclutamiento: sin escuela/cancha a mes>=9
let e6 = crearEstado(NIVEL_VALLE);
e6 = { ...e6, fase: 'jugando', mes: 8, eventosVistos: ['lluvias', 'brote', 'retorno-excombatientes', 'rumor-memorial', 'incursion', 'accidente-mina', 'retorno-fragil'], indicadores: { ...e6.indicadores, seguridad: 80 } };
e6 = avanzarMes(e6, NIVEL_VALLE);
check('cadena juventud→reclutamiento sin escuela ni cancha', e6.eventoActivo?.id === 'reclutamiento');

console.log(fallos === 0 ? '\nTodo pasó ✓' : `\n${fallos} fallos ✗`);
process.exit(fallos === 0 ? 0 : 1);
