(() => {
  const barra = document.querySelector('.nexo-barra');
  if (!barra) return;
  activarBuscador(barra, document.currentScript.src);
  const boton = barra.querySelector('[aria-controls="nexo-barra-panel"]');
  const panel = barra.querySelector('#nexo-barra-panel');
  function abrir(activo) {
    panel.hidden = !activo;
    boton.setAttribute('aria-expanded', String(activo));
    boton.setAttribute('aria-label', activo ? 'Cerrar menú' : 'Abrir menú');
  }
  boton.addEventListener('click', () => abrir(panel.hidden));
  document.addEventListener('click', ({ target }) => {
    if (!panel.contains(target) && !boton.contains(target)) abrir(false);
  });
  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape' && !panel.hidden) { abrir(false); boton.focus(); }
  });

  const cuenta = barra.querySelector('[data-nexo-barra-cuenta]');
  const favoritos = barra.querySelector('[data-nexo-barra-favoritos]');
  function mostrarFavoritos() {
    if (location.hash !== '#favoritos' || !location.pathname.endsWith('/mi-cuenta.html')) return;
    document.querySelector('[data-seccion="favoritos"]')?.click();
  }
  window.addEventListener('hashchange', mostrarFavoritos);
  document.addEventListener('DOMContentLoaded', mostrarFavoritos);
  favoritos.addEventListener('click', mostrarFavoritos);
  const cliente = window.supabase?.createClient(
    'https://bbszahuoeclszmivgnyy.supabase.co',
    'sb_publishable_VLTfpjdin94_xmYSA-Y-yg_-q8_e_Ii'
  );
  if (!cliente) return;
  cliente.auth.onAuthStateChange((_evento, sesion) => {
    cuenta.textContent = sesion ? 'Mi cuenta' : 'Iniciar sesión';
    cuenta.href = sesion ? cuenta.dataset.nexoBarraCuenta : favoritos.dataset.login;
    favoritos.href = sesion ? favoritos.dataset.nexoBarraFavoritos : favoritos.dataset.login;
  });
})();

function activarBuscador(barra, rutaScript) {
  const anterior = barra.querySelector('.nexo-header-buscador');
  if (!anterior) return;
  // El encabezado común gestiona este formulario. Los buscadores del contenido
  // conservan los controladores propios de sus páginas.
  const formulario = anterior.cloneNode(false);
  formulario.className = 'nexo-barra-buscador';
  formulario.removeAttribute('data-nexo-autocomplete');
  const entrada = anterior.querySelector('input[name="q"]').cloneNode(false);
  entrada.id = 'nexo-barra-busqueda';
  entrada.setAttribute('aria-controls', 'nexo-barra-sugerencias');
  entrada.setAttribute('aria-expanded', 'false');
  entrada.setAttribute('aria-autocomplete', 'list');
  const enviar = anterior.querySelector('button[type="submit"]').cloneNode(true);
  const lista = document.createElement('div');
  lista.className = 'nexo-barra-sugerencias';
  lista.id = 'nexo-barra-sugerencias';
  lista.setAttribute('role', 'group');
  lista.setAttribute('aria-label', 'Sugerencias de búsqueda');
  lista.hidden = true;
  formulario.append(entrada, enviar, lista);
  anterior.replaceWith(formulario);

  const talento = {
        "Cantantes y solistas": ["Solista femenino", "Solista masculino", "Dúos vocales", "Cantantes con banda", "Cantantes de música versátil"],
        "Bandas y grupos musicales": ["Grupos de covers", "Grupos versátiles", "Bandas de rock", "Grupos pop", "Bandas de música original", "Grupos de música regional"],
        "Música tradicional y ensambles": ["Mariachis", "Tríos románticos", "Norteños", "Bandas sinaloenses", "Rondallas", "Orquestas", "Big Bands", "Cuartetos", "Ensambles"],
        "Músicos e instrumental": ["Pianistas y tecladistas", "Violinistas", "Saxofonistas", "Guitarristas", "Bajistas", "Bateristas y percusionistas", "Trompetistas", "Flautistas", "Violonchelistas", "Arpistas", "Música clásica e instrumental"],
        "DJ y experiencias musicales": ["DJ para bodas", "DJ para eventos corporativos", "DJ para fiestas privadas", "DJ con performance", "Música electrónica", "Música versátil"],
        "Comedia y humor": ["Stand-up comedy", "Comediantes", "Improvisación", "Comedia musical", "Shows de humor"],
        "Magia y espectáculos": ["Magos", "Ilusionistas", "Mentalistas", "Hipnotistas", "Imitadores", "Shows temáticos"],
        "Danza y performance": ["Bailarines profesionales", "Compañías de danza", "Shows coreográficos", "Performance artístico", "Espectáculos circenses"],
        "Conferencistas": ["Motivacionales", "Empresariales", "Liderazgo", "Desarrollo personal", "Tecnología e innovación", "Bienestar"],
        "Conductores y presentadores": ["Maestros de ceremonias", "Conductoras", "Conductores", "Presentadores corporativos", "Animadores de eventos"],
        "Entretenimiento infantil": ["Shows infantiles", "Payasos", "Magos infantiles", "Personajes temáticos", "Cuentacuentos", "Animadores infantiles"],
        "Actores y talento escénico": ["Actrices", "Actores", "Talento para eventos", "Personajes caracterizados", "Teatro en vivo"]
      };
      const produccion = ["Audio profesional", "Iluminación profesional", "Pantallas LED", "Escenarios", "Backline", "Producción integral", "Montaje de escenarios"];
      const artistas = [
        ["Trendline", "Bandas y grupos musicales"], ["Mr. Loxley", "DJ y experiencias musicales"],
        ["Two Souls", "Cantantes y solistas"], ["Andreas Zanetti", "Músicos e instrumental"],
        ["Michelle Rodríguez", "Comedia y humor"], ["Tr3mens", "Músicos e instrumental"],
        ["Percy", "Cantantes y solistas"]
      ];
      
  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const carpetaPaginas = new URL('./', formulario.action);
  const catalogo = new Map();
  function agregar(nombre, categoria, ruta) {
    catalogo.set(normalizar(nombre), { nombre, categoria, ruta });
  }

  const perfiles = ['trendline', 'mr-loxley', 'two-souls', 'andreas-zanetti', 'michelle-rodriguez', 'tr3mens', 'percy'];
  artistas.forEach(([nombre, categoria], indice) => agregar(nombre, categoria, perfiles[indice] + '.html'));
  for (const [categoria, opciones] of Object.entries(talento)) {
    agregar(categoria, 'Categoría de talento');
    opciones.forEach(nombre => agregar(nombre, categoria));
  }
  produccion.forEach(nombre => agregar(nombre, 'Producción y servicios'));

  function cerrar() {
    lista.hidden = true;
    entrada.setAttribute('aria-expanded', 'false');
  }

  function mostrar() {
    const consulta = normalizar(entrada.value);
    lista.replaceChildren();
    if (!consulta) { cerrar(); return; }
    const puntaje = ({ nombre, categoria }) => {
      const texto = normalizar(nombre);
      if (texto === consulta) return 0;
      if (texto.startsWith(consulta)) return 1;
      if (texto.includes(consulta)) return 2;
      return normalizar(categoria).includes(consulta) ? 3 : Infinity;
    };
    const coincidencias = [...catalogo.values()].filter(item => Number.isFinite(puntaje(item)));
    coincidencias.sort((a, b) => puntaje(a) - puntaje(b));
    function opcion(titulo, detalle, activar) {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.textContent = titulo;
      if (detalle) {
        const etiqueta = document.createElement('small');
        etiqueta.textContent = detalle;
        boton.append(etiqueta);
      }
      boton.addEventListener('click', activar);
      lista.append(boton);
    }

    coincidencias.slice(0, 7).forEach(({ nombre, categoria, ruta }) => {
      opcion(nombre, categoria, () => {
        if (ruta) {
          location.assign(new URL(ruta, carpetaPaginas));
          return;
        }
        entrada.value = nombre;
        formulario.requestSubmit();
      });
    });
    opcion('Ver resultados para “' + entrada.value.trim() + '” →', '', () => formulario.requestSubmit());
    lista.hidden = false;
    entrada.setAttribute('aria-expanded', 'true');
  }

  entrada.addEventListener('input', mostrar);
  entrada.addEventListener('focus', mostrar);
  formulario.addEventListener('submit', cerrar);
  formulario.addEventListener('focusout', evento => {
    if (!formulario.contains(evento.relatedTarget)) cerrar();
  });
  formulario.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && !lista.hidden) {
      entrada.focus();
      cerrar();
    }
    if (lista.hidden || !['ArrowDown', 'ArrowUp'].includes(evento.key)) return;
    const opciones = [entrada, ...lista.querySelectorAll('button')];
    const indice = opciones.indexOf(document.activeElement);
    if (indice === -1) return;
    evento.preventDefault();
    const paso = evento.key === 'ArrowDown' ? 1 : -1;
    opciones[(indice + paso + opciones.length) % opciones.length].focus();
  });

  async function cargarPublicados() {
    if (!window.supabase) return;
    if (!window.NexoTalentos) {
      await new Promise((resolver, rechazar) => {
        const script = document.createElement('script');
        script.src = new URL('talentos-publicos.js', rutaScript);
        script.onload = resolver;
        script.onerror = rechazar;
        document.head.append(script);
      });
    }
    const publicados = await window.NexoTalentos.opcionesExplorar({ conFotos: false });
    for (const perfil of publicados) {
      const existente = catalogo.get(normalizar(perfil.nombre));
      if (existente?.ruta) continue;
      agregar(perfil.nombre, perfil.categoria, perfil.url);
    }
    if (document.activeElement === entrada && !lista.hidden) mostrar();
  }

  cargarPublicados().catch(error => console.warn('No se cargaron los perfiles publicados para el buscador.', error));
}
