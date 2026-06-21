/**
 * Test de los sistemas de tensión del modo Territorio (motor puro, sin UI).
 * Ejecutar: node --experimental-strip-types scripts/test-tension.ts
 */
import {
  actuar,
  aplicarTickMensual,
  avanzarMes,
  cerrarEvento,
  contarFamilias,
  crearEstado,
  ingresoMensual,
  resolverEvento,
} from '../src/builder/engine.ts';
import type { OpcionEvento } from '../src/builder/types.ts';
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
e = { ...e, herramienta: 'salud' };
e = actuar(e, NIVEL_VALLE, 3, 4);
check('edificio colocado', e.celdas[3][4].edificio === 'salud');
check('fondos descontados', e.fondos === 120 - 40, `fondos=${e.fondos}`);

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



// ── Primera familia: vuelve con 35 (la esperanza no espera) ──
let e7 = crearEstado(NIVEL_VALLE);
e7 = { ...e7, fase: 'jugando', fondos: 200 };
// dos edificios cerca de la casa (1,4): escuela (2,4 no... usar (2,3)) + salud (2,5)
e7 = { ...e7, herramienta: 'escuela' };
e7 = actuar(e7, NIVEL_VALLE, 2, 3);
const fam7a = contarFamilias(e7.celdas).pobladas;
e7 = { ...e7, herramienta: 'salud' };
e7 = actuar(e7, NIVEL_VALLE, 1, 5);
const fam7b = contarFamilias(e7.celdas).pobladas;
check('primera familia retorna con vitalidad ≥35 (dos edificios)', fam7b >= 1, `antes=${fam7a} después=${fam7b}`);
check('solo UNA familia con la regla de la primera', fam7b === 1, `pobladas=${fam7b}`);

// ── Bono del mercado: ingresos 1.5× ──
let e8 = crearEstado(NIVEL_VALLE);
e8 = { ...e8, fase: 'jugando', fondos: 300 };
const ingresoSinMercado = ingresoMensual(NIVEL_VALLE, e8.celdas, 'libre');
e8 = { ...e8, herramienta: 'mercado' };
e8 = actuar(e8, NIVEL_VALLE, 0, 0);
check('mercado colocado', e8.celdas[0][0].edificio === 'mercado', `edif=${e8.celdas[0][0].edificio}`);
const ingresoConMercado = ingresoMensual(NIVEL_VALLE, e8.celdas, 'libre');
// base 20 + 10 mercado - 2 mant = 28; con bono ×1.5 = 42
check('mercado da bono comunitario 1.5×', ingresoConMercado === Math.round((20 + 10 - 2) * 1.5),
  `sin=${ingresoSinMercado} con=${ingresoConMercado}`);

// ── Eventos aleatorios: el pool existe, caen en partida y no se repiten ──
check('hay al menos 25 eventos aleatorios en el pool', NIVEL_VALLE.eventosAleatorios.length >= 25,
  `pool=${NIVEL_VALLE.eventosAleatorios.length}`);
const idsAleatorios = new Set(NIVEL_VALLE.eventosAleatorios.map((ev) => ev.id));
let e9 = crearEstado(NIVEL_VALLE, 'libre', 12345);
e9 = { ...e9, fase: 'jugando' };
const aleatoriosVistos: string[] = [];
for (let i = 0; i < 24 && e9.fase === 'jugando'; i++) {
  e9 = avanzarMes(e9, NIVEL_VALLE);
  if (e9.eventoActivo) {
    if (idsAleatorios.has(e9.eventoActivo.id)) aleatoriosVistos.push(e9.eventoActivo.id);
    e9 = resolverEvento(e9, e9.eventoActivo.opciones[0]);
    e9 = cerrarEvento(e9, NIVEL_VALLE);
  }
}
check('caen varios eventos aleatorios en una partida', aleatoriosVistos.length >= 5,
  `vistos=${aleatoriosVistos.length}`);
check('ningún evento aleatorio se repite en la misma partida',
  aleatoriosVistos.length === new Set(aleatoriosVistos).size);

// ── Salud: motor concreto (producción mensual + erosión por necesidades) ──
// Producción: con puesto de salud, agua y alimentos, la salud sube cada mes.
let eSalud = crearEstado(NIVEL_VALLE);
eSalud = { ...eSalud, fase: 'jugando', fondos: 300 };
eSalud = actuar({ ...eSalud, herramienta: 'salud' }, NIVEL_VALLE, 3, 4);
eSalud = actuar({ ...eSalud, herramienta: 'agua' }, NIVEL_VALLE, 2, 2);
eSalud = actuar({ ...eSalud, herramienta: 'alimentos' }, NIVEL_VALLE, 0, 0);
const tickProd = aplicarTickMensual(eSalud);
check('salud sube con salud+agua+alimentos', tickProd.salud > eSalud.salud,
  `${eSalud.salud}→${tickProd.salud}`);

// Erosión: con población retornada y SIN agua ni alimentos, salud y confianza caen.
let eCarencia = crearEstado(NIVEL_VALLE);
// forzar una casa poblada
const celdasPobl = eCarencia.celdas.map((fila) =>
  fila.map((c) => (c.tipo === 'casa' ? { ...c, poblada: true } : c)),
);
eCarencia = { ...eCarencia, fase: 'jugando', celdas: celdasPobl, salud: 25 };
const confAntes = eCarencia.indicadores.confianza;
const tickEros = aplicarTickMensual(eCarencia);
check('sin agua/alimentos la salud se erosiona', tickEros.salud < 25, `salud=${tickEros.salud}`);
check('sin agua/alimentos la confianza se erosiona', tickEros.indicadores.confianza < confAntes,
  `${confAntes}→${tickEros.indicadores.confianza}`);
check('el tick reporta las carencias', tickEros.carencias.length >= 2,
  tickEros.carencias.join(', '));

// ── Cadena causal: encadena fuerza el evento de consecuencia el mes siguiente ──
const evEmisora = NIVEL_VALLE.eventosCondicionales.find((e) => e.id === 'emisora-odio')!;
const opCeder = evEmisora.opciones.find((o: OpcionEvento) => o.encadena === 'brote-violencia')!;
let eCad = crearEstado(NIVEL_VALLE);
eCad = { ...eCad, fase: 'jugando', eventoActivo: evEmisora };
eCad = resolverEvento(eCad, opCeder);
eCad = cerrarEvento(eCad, NIVEL_VALLE);
eCad = avanzarMes(eCad, NIVEL_VALLE);
check('encadena fuerza el evento de consecuencia (brote-violencia)',
  eCad.eventoActivo?.id === 'brote-violencia', `evento=${eCad.eventoActivo?.id ?? 'ninguno'}`);

// ── efectoEspecial brote-salud: desploma la salud ──
const evPozo = NIVEL_VALLE.eventosAleatorios.find((e) => e.id === 'pozo-roto')!;
const opBrote = evPozo.opciones.find((o: OpcionEvento) => o.efectoEspecial === 'brote-salud')!;
let ePozo = crearEstado(NIVEL_VALLE);
ePozo = { ...ePozo, fase: 'jugando', eventoActivo: evPozo, salud: 50 };
ePozo = resolverEvento(ePozo, opBrote);
check('brote-salud desploma la salud', ePozo.salud === 25, `salud=${ePozo.salud}`);

// ── Etapas (Terra Nil): reconstrucción → vida → retirada → victoria ──
let eF = crearEstado(NIVEL_VALLE, 'principiante', 777);
check('arranca en etapa reconstrucción', eF.etapa === 'reconstruccion' && eF.hitos.length === 0);
eF = { ...eF, fase: 'jugando', fondos: 99999 };
// llenar toda la tierra para reverdecer el valle entero
const rotF = ['salud', 'agua', 'alimentos', 'escuela', 'memorial', 'emisora', 'cancha', 'mercado'];
let kF = 0;
for (let f = 0; f < eF.celdas.length; f++) {
  for (let c = 0; c < eF.celdas[0].length; c++) {
    if (eF.celdas[f][c].tipo === 'tierra' && !eF.celdas[f][c].edificio) {
      eF = actuar({ ...eF, herramienta: rotF[kF++ % rotF.length] as never, fondos: 99999 }, NIVEL_VALLE, f, c);
    }
  }
}
for (let i = 0; i < 20 && eF.fase === 'jugando' && eF.etapa !== 'retirada'; i++) {
  eF = { ...eF, fondos: 99999 };
  eF = avanzarMes(eF, NIVEL_VALLE);
  if (eF.eventoActivo) {
    eF = resolverEvento(eF, eF.eventoActivo.opciones[0]);
    eF = cerrarEvento(eF, NIVEL_VALLE);
  }
}
check('descubre los 4 hitos combinando factores', eF.hitos.length === 4, `hitos=${eF.hitos.join(',')}`);
check('con 4 hitos + valle repoblado entra en retirada', eF.etapa === 'retirada', `etapa=${eF.etapa}`);

// retirar antes de la retirada se rechaza
const eAntes = crearEstado(NIVEL_VALLE);
const eRechazo = actuar({ ...eAntes, fase: 'jugando', herramienta: 'retirar' }, NIVEL_VALLE, 3, 5);
check('no se puede retirar fuera de la etapa retirada', eRechazo.etapa !== 'retirada' && eRechazo.celdas[3][5].edificio === 'base');

// en retirada: entregar TODOS los edificios → victoria, con las familias intactas
if (eF.etapa === 'retirada') {
  const famAntes = contarFamilias(eF.celdas).pobladas;
  let guard = 0;
  while (eF.fase === 'jugando' && guard++ < 120) {
    let pos: [number, number] | null = null;
    eF.celdas.forEach((fila, f) => fila.forEach((cel, c) => { if (cel.edificio && !pos) pos = [f, c]; }));
    if (!pos) break;
    eF = actuar({ ...eF, herramienta: 'retirar' }, NIVEL_VALLE, pos[0], pos[1]);
  }
  check('retirar todo deja 0 edificios del equipo', eF.celdas.flat().filter((c) => c.edificio).length === 0);
  check('la retirada completa = victoria', eF.fase === 'victoria', `fase=${eF.fase}`);
  check('las familias se quedan tras la retirada (tejido comunitario)',
    contarFamilias(eF.celdas).pobladas >= famAntes, `${famAntes}→${contarFamilias(eF.celdas).pobladas}`);
}

console.log(fallos === 0 ? '\nTodo pasó ✓' : `\n${fallos} fallos ✗`);
process.exit(fallos === 0 ? 0 : 1);
