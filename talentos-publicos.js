/* Perfil público de NEXO: solo consume los campos de la versión publicada. */
(() => {
  const db = window.supabase.createClient("https://bbszahuoeclszmivgnyy.supabase.co", "sb_publishable_VLTfpjdin94_xmYSA-Y-yg_-q8_e_Ii", {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
  const columnas = 'id,tipo,nombre,categoria,descripcion,servicio,generos,portada,avatar,galeria,video';
  const categorias = {
    cantante: ['cantantes', 'Cantante'], banda: ['bandas', 'Banda o grupo'],
    ensamble: ['tradicional', 'Ensamble'], musico: ['musicos', 'Música instrumental'],
    dj: ['dj', 'DJ'], comedia: ['comedia','Comedia'], magia: ['magia','Magia'],
    entretenimiento: ['magia','Entretenimiento'], danza: ['danza','Danza'],
    conductor: ['conductores','Conducción'], conferencista: ['conferencistas','Conferencias'],
    'show-especial': ['magia','Espectáculo']
  };
  const categoria = valor => categorias[(valor || '').toLowerCase()] || ['', valor || 'Talento'];
  const bucket = db.storage.from('nexo-perfiles-adjuntos');
  const urlFoto = async ruta => {
    if (!ruta) return '';
    const {data, error} = await bucket.createSignedUrl(ruta, 1800);
    return error ? '' : data?.signedUrl || '';
  };
  const urlPerfil = id => 'talento.html?id=' + encodeURIComponent(id);

  async function obtener(id) {
    if (!/^(?:[0-9]{1,20}|[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})$/i.test(id || '')) return null;
    const {data, error} = await db.from('nexo_talentos_publicos').select(columnas).eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  }

  async function listar(tipo = '') {
    const talentos = [];
    const pagina = 100;
    for (let desde = 0; ; desde += pagina) {
      let consulta = db.from('nexo_talentos_publicos')
        .select('id,tipo,nombre,categoria,descripcion,portada,avatar,generos');
      if (tipo) consulta = consulta.eq('tipo', tipo);
      const {data, error} = await consulta.order('publicado_en',{ascending:false}).order('id')
        .range(desde, desde + pagina - 1);
      if (error) throw error;
      talentos.push(...data);
      if (data.length < pagina) return talentos;
    }
  }

  async function opcionesExplorar() {
    const talentos = await listar();
    return Promise.all(talentos.map(async t => {
      const [clave, rotulo] = categoria(t.categoria);
      const entretenimiento = ['comedia','magia','danza','conferencistas','conductores'].includes(clave);
      return {
        nombre: t.nombre,
        descripcion: t.descripcion || rotulo,
        tags: [rotulo, t.categoria, ...(t.generos || [])].filter(Boolean).join(' '),
        grupo: t.tipo === 'proveedor' ? 'produccion' : entretenimiento ? 'entretenimiento' : 'musica',
        imagen: await urlFoto(t.portada || t.avatar),
        url: urlPerfil(t.id),
        perfilPublicado: true
      };
    }));
  }

  async function agregarAlCatalogo() {
    const grid = document.querySelector('.artistas-grid');
    if (!grid) return;
    try {
      const talentos = await listar('artista');

      const tarjetas = await Promise.all(talentos.map(async t => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'artista-card';
        const [clave, rotulo] = categoria(t.categoria);
        tarjeta.dataset.categoria = clave;
        tarjeta.dataset.generos = (t.generos || []).join(',');
        const imagen = document.createElement('div');
        imagen.className = 'artista-imagen';
        const url = await urlFoto(t.portada || t.avatar);
        if (url) {
          const foto = document.createElement('img');
          foto.loading = 'lazy';
          foto.src = url;
          foto.alt = t.nombre;
          imagen.append(foto);
        } else {
          imagen.classList.add('nexo-comedia-placeholder');
          const inicial = document.createElement('span');
          inicial.className = 'nexo-comedia-inicial';
          inicial.textContent = t.nombre.slice(0, 2).toUpperCase();
          imagen.append(inicial);
        }
        const info = document.createElement('div');
        info.className = 'artista-info';
        const tipo = document.createElement('span');
        tipo.className = 'artista-categoria';
        tipo.textContent = rotulo;
        const titulo = document.createElement('h3');
        titulo.textContent = t.nombre;
        const descripcion = document.createElement('p');
        const texto = t.descripcion || '';
        descripcion.textContent = texto.length > 160 ? texto.slice(0,157) + '…' : texto;
        const link = document.createElement('a');
        link.textContent = 'Ver perfil →';
        link.href = urlPerfil(t.id);
        info.append(tipo, titulo, descripcion, link);
        tarjeta.append(imagen, info);
        return tarjeta;
      }));
      grid.prepend(...tarjetas);
      window.dispatchEvent(new CustomEvent('nexo-talentos-cargados',{detail:tarjetas}));
    } catch (error) {
      console.error('No se pudieron cargar los perfiles publicados.', error);
    }
  }

  async function mostrarPerfil() {
    const estado = document.getElementById('carga-talento');
    const el = id => document.getElementById('perfil-talento-' + id);
    try {
      const perfil = await obtener(new URLSearchParams(location.search).get('id'));
      if (!perfil) { estado.textContent = 'Este perfil todavía no está disponible.'; return; }
      const {nombre, descripcion, servicio} = perfil;
      const [,tipo] = categoria(perfil.categoria);
      document.title = nombre + ' | NEXO';
      for (const [id, valor] of [
        ['titulo',nombre],['categoria',tipo],['tipo',tipo],['intro',descripcion],
        ['show',servicio?.nombre || 'Consultar formatos'],['sidebar',nombre],['sidebar-tipo',tipo],
        ['bio-titulo','Conoce a ' + nombre],['descripcion',descripcion],['video-titulo',nombre + ' en acción'],
        ['show-nombre',servicio?.nombre],['show-detalle',servicio?.incluye],
        ['duracion',servicio?.duracion ? 'Duración: ' + servicio.duracion : '']
      ]) el(id).textContent = valor || '';
      el('formatos').hidden = !servicio?.nombre;
      const cotizar = 'cotizar.html?talento=' + encodeURIComponent(perfil.id);
      document.querySelectorAll('.perfil-talento-cotizar').forEach(link => { link.href = cotizar; });
      const [portada,avatar,galeria] = await Promise.all([
        urlFoto(perfil.portada),urlFoto(perfil.avatar),Promise.all((perfil.galeria || []).map(urlFoto))
      ]);
      for (const [id,url] of [['portada',portada],['avatar',avatar]]) {
        if (url) { el(id).src = url; el(id).hidden = false; }
      }
      const fotos = galeria.filter(Boolean);
      if (!fotos.length && portada) fotos.push(portada);
      el('galeria').hidden = fotos.length === 0;
      if (fotos.length) {
        let indice = 0;
        const controles = el('galeria').querySelectorAll('.galeria-control');
        const miniaturas = el('miniaturas');
        function seleccionar(i) {
          indice = (i + fotos.length) % fotos.length;
          el('foto').src = fotos[indice];
          el('foto').alt = nombre + ' · Foto ' + (indice + 1);
          Array.from(miniaturas.children).forEach((b,j) => b.setAttribute('aria-pressed',String(j === indice)));
        }
        fotos.forEach((url,i) => {
          const boton = document.createElement('button');
          boton.type = 'button';
          boton.setAttribute('aria-label','Ver foto ' + (i + 1));
          const imagen = document.createElement('img');
          imagen.src = url;
          imagen.alt = '';
          boton.append(imagen);
          boton.addEventListener('click', () => seleccionar(i));
          miniaturas.append(boton);
        });
        controles.forEach((b,i) => {
          b.hidden = fotos.length < 2;
          b.addEventListener('click', () => seleccionar(indice + (i ? 1 : -1)));
        });
        seleccionar(0);
      }
      const video = window.NexoVistaPublica?.videoURL(perfil.video);
      if (video) {
        el('video').title = 'Video de ' + nombre;
        el('video').src = video;
        el('videos').hidden = false;
      }
      estado.hidden = true;
      document.getElementById('talento-pagina').hidden = false;
    } catch (error) {
      estado.textContent = 'No pudimos cargar este perfil. Vuelve a intentarlo.';
      console.error(error);
    }
  }

  window.NexoTalentos = { obtener, agregarAlCatalogo, mostrarPerfil, opcionesExplorar };
})();


