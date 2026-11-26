(() => {
  const exclusivos = [
    ['michelle-rodriguez', 'Michelle Rodríguez', 'Comedia · Stand-up · Conferencias', ['comedia', 'conferencistas'], 'michelle-rodriguez.jpeg'],
    ['andreas-zanetti', 'Andreas Zanetti', 'Comedia · Stand-up · Piano', ['comedia'], 'andreas-zanetti.jpg'],
    ['trendline', 'Trendline', 'Banda de covers · Pop y rock', ['bandas', 'covers'], 'trendline-portada.png'],
    ['two-souls', 'Two Souls', 'Dúo vocal · Pop y covers', ['cantantes', 'covers'], 'two-souls.jpg'],
    ['mr-loxley', 'Mr. Loxley', 'DJ · Experiencias musicales', ['dj'], 'mr-loxley.jpg'],
    ['tr3mens', 'Tr3mens', 'Música instrumental', ['musicos']],
    ['percy', 'Percy', 'Regional mexicano', ['cantantes', 'tradicional']],
    ['victor-castaneda', 'Víctor Castañeda', 'Mentalismo', ['magia']],
    ['joe-moy', 'Joe y Moy', 'Magia e ilusionismo', ['magia']]
  ].map(([id, nombre, categoria, filtros, foto]) => ({
    id, nombre, categoria, filtros, url: id + '.html', imagen: foto ? '../assets/images/' + foto : ''
  }));

  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+&\s+/g, ' y ').trim();

  function seleccionar(actual, catalogo) {
    const nombres = new Set([normalizar(actual.nombre)]);
    const conocidos = new Set(exclusivos.map(t => normalizar(t.nombre)));
    return exclusivos.concat(catalogo.filter(t => !conocidos.has(normalizar(t.nombre))))
      .filter(t => {
        const nombre = normalizar(t.nombre);
        if (t.grupo === 'produccion' || t.id === actual.id || nombres.has(nombre) ||
            !t.filtros?.some(filtro => actual.filtros.includes(filtro))) return false;
        nombres.add(nombre);
        return true;
      });
  }

  function renderizar(seccion, candidatos) {
    seccion.hidden = !candidatos.length;
    const contenido = document.createElement('div');
    contenido.className = 'ct-relacionados-contenido';
    const etiqueta = document.createElement('p');
    etiqueta.textContent = 'Descubre más talento';
    const titulo = document.createElement('h2');
    titulo.textContent = 'También te pueden interesar';
    const grid = document.createElement('div');
    grid.className = 'ct-relacionados-grid';
    const mas = document.createElement('button');
    mas.type = 'button';
    mas.className = 'ct-relacionados-mas';
    mas.textContent = 'Ver más talentos';

    let cantidad = 0;
    function agregar() {
      for (const perfil of candidatos.slice(cantidad, cantidad + 6)) {
        const tarjeta = document.createElement('a');
        tarjeta.className = 'ct-relacionados-tarjeta';
        tarjeta.href = perfil.url;
        const foto = document.createElement('div');
        foto.className = 'ct-relacionados-foto';
        foto.textContent = perfil.nombre.split(/\s+/).slice(0, 2).map(p => p[0]).join('');
        if (perfil.imagen || perfil.imagenCatalogo) {
          const imagen = document.createElement('img');
          imagen.alt = '';
          imagen.loading = 'lazy';
          imagen.addEventListener('error', () => imagen.remove(), { once: true });
          imagen.src = perfil.imagen || perfil.imagenCatalogo;
          foto.append(imagen);
        }
        const info = document.createElement('div');
        const nombre = document.createElement('h3');
        nombre.textContent = perfil.nombre;
        const categoria = document.createElement('span');
        categoria.textContent = perfil.categoria;
        info.append(nombre, categoria);
        tarjeta.append(foto, info);
        grid.append(tarjeta);
      }
      cantidad = grid.children.length;
      mas.hidden = cantidad >= candidatos.length;
    }
    mas.addEventListener('click', agregar);
    contenido.append(etiqueta, titulo, grid, mas);
    seccion.replaceChildren(contenido);
    agregar();
  }

  async function iniciar() {
    const seccion = document.getElementById('nexo-recomendaciones');
    if (!seccion) return;
    const slug = seccion.dataset.artista;
    const id = new URLSearchParams(location.search).get('id');
    const catalogo = await window.NexoTalentos?.opcionesExplorar({ conFotos: false }) ?? [];
    const perfilActual = await window.NexoPerfilActual;
    const actual = perfilActual || exclusivos.find(t => t.id === slug) ||
      catalogo.find(t => t.id === id || (slug && normalizar(t.nombre) === normalizar(seccion.dataset.nombre || slug)));
    if (actual) renderizar(seccion, seleccionar(actual, catalogo));
  }
  document.addEventListener('DOMContentLoaded', () => {
    iniciar().catch(error => console.warn('No se pudieron cargar las recomendaciones.', error));
  });
})();
