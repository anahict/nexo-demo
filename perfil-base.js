/* ==========================================
   NEXO — PERFILES INDIVIDUALES DE ARTISTAS
========================================== */

const ARTISTAS_NEXO = {

  "trendline": {
    nombre: "Trendline",
    categoria: "Banda de covers",
    ubicacion: "Ciudad de México",
    imagen: "../assets/images/trendline.png",
    descripcionCorta: "Música en vivo, energía y un repertorio para transformar cada evento.",
    descripcion: [
      "Trendline es una banda de música en vivo especializada en covers de distintos géneros y épocas.",
      "Su propuesta combina interpretación musical, presencia escénica y un espectáculo dinámico para eventos corporativos, celebraciones y producciones especiales."
    ],
    especialidades: ["Pop", "Rock", "Retro", "Disco", "Latino", "Dance"],
    espectaculos: [
      {
        nombre: "Tour Utopía",
        descripcion: "Espectáculo musical de covers con una propuesta escénica dinámica.",
        duracion: "120 minutos"
      }
    ],
    eventos: ["Eventos corporativos", "Fiestas privadas", "Bodas", "Festivales", "Celebraciones de fin de año"],
    requerimientos: ["Sistema de audio profesional", "Iluminación de escenario", "Backline", "Espacio para la banda", "Prueba de sonido"],
    similares: ["two-souls", "mr-loxley", "tr3mens"]
  },

  "mr-loxley": {
    nombre: "Mr. Loxley",
    categoria: "DJ y espectáculo audiovisual",
    ubicacion: "Consultar disponibilidad",
    imagen: "../assets/images/mr-loxley.jpg",
    descripcionCorta: "Una experiencia musical inmersiva que combina DJ, performance y producción audiovisual.",
    descripcion: [
      "Mr. Loxley es una propuesta de entretenimiento que va más allá de una presentación tradicional de DJ.",
      "Su concepto integra música, elementos visuales y performance para crear una experiencia envolvente. El repertorio puede incorporar pop, rock, reggaetón y clásicos de distintas décadas."
    ],
    especialidades: ["DJ", "Performance", "Experiencia audiovisual", "Pop", "Rock", "Reggaetón"],
    espectaculos: [
      {
        nombre: "Mr. Loxley Experience",
        descripcion: "Espectáculo de DJ con elementos visuales, ambientación y performance.",
        duracion: "Según propuesta"
      }
    ],
    eventos: ["Eventos corporativos", "Fiestas privadas", "Celebraciones especiales", "Eventos temáticos"],
    requerimientos: ["Sistema de audio", "Cabina y equipo de DJ", "Iluminación", "Espacio para performance", "Requerimientos audiovisuales según formato"],
    similares: ["trendline", "two-souls", "tr3mens"]
  },

  "two-souls": {
    nombre: "Two Souls",
    categoria: "Dúo vocal",
    ubicacion: "Consultar disponibilidad",
    imagen: "../assets/images/two-souls.jpg",
    descripcionCorta: "Dos voces que interpretan grandes canciones con armonía y personalidad.",
    descripcion: [
      "Two Souls es un dúo vocal que presenta versiones de canciones populares mediante un formato musical con pistas de acompañamiento.",
      "Su espectáculo está pensado para acompañar celebraciones, eventos corporativos y ocasiones especiales."
    ],
    especialidades: ["Pop", "Covers", "Dúo vocal", "Música para eventos"],
    espectaculos: [
      {
        nombre: "Two Souls Live",
        descripcion: "Presentación de dos cantantes con pistas musicales de acompañamiento.",
        duracion: "120 minutos"
      }
    ],
    eventos: ["Eventos corporativos", "Fiestas privadas", "Celebraciones", "Eventos sociales"],
    requerimientos: ["Sistema de audio", "Micrófonos", "Monitoreo", "Reproducción de pistas", "Espacio para presentación"],
    similares: ["trendline", "andreas-zanetti", "tr3mens"]
  },

  "michelle-rodriguez": {
    nombre: "Michelle Rodríguez",
    categoria: "Comedia y conferencias",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Humor, entretenimiento y experiencias que conectan con el público.",
    descripcion: [
      "Michelle Rodríguez desarrolla propuestas de entretenimiento que incluyen comedia, presentaciones y conferencias.",
      "Su trabajo combina humor, comunicación y experiencias dirigidas a distintos públicos."
    ],
    especialidades: ["Stand-up", "Comedia", "Conferencias", "Conducción"],
    espectaculos: [
      {
        nombre: "Buena Persona",
        descripcion: "Espectáculo de comedia.",
        duracion: "Consultar formato"
      },
      {
        nombre: "Una chica como yo",
        descripcion: "Conferencia.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Eventos corporativos", "Teatros", "Conferencias", "Eventos especiales"],
    requerimientos: ["Micrófono", "Sistema de audio", "Iluminación escénica", "Espacio de presentación"],
    similares: ["andreas-zanetti", "victor-castaneda", "joe-moy"]
  },

  "andreas-zanetti": {
    nombre: "Andreas Zanetti",
    categoria: "Música y comedia",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Un espectáculo que combina talento musical, humor y entretenimiento.",
    descripcion: [
      "Andreas Zanetti es un artista que combina música, interpretación y comedia.",
      "Su propuesta integra elementos musicales y humorísticos para ofrecer una experiencia de entretenimiento."
    ],
    especialidades: ["Piano", "Música", "Comedia", "Show musical"],
    espectaculos: [
      {
        nombre: "Show de música y humor",
        descripcion: "Presentación que combina interpretación musical y comedia.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Eventos corporativos", "Teatros", "Celebraciones privadas", "Eventos especiales"],
    requerimientos: ["Sistema de audio", "Micrófono", "Piano o teclado según formato", "Iluminación"],
    similares: ["michelle-rodriguez", "tr3mens", "two-souls"]
  },

  "tr3mens": {
    nombre: "Tr3mens",
    categoria: "Trío instrumental",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Una propuesta instrumental que fusiona música contemporánea y clásica.",
    descripcion: [
      "Tr3mens es una agrupación instrumental cuya propuesta combina elementos musicales clásicos y contemporáneos.",
      "Su formato ofrece una alternativa para eventos que buscan una experiencia musical diferente."
    ],
    especialidades: ["Música instrumental", "Fusión musical", "Música contemporánea", "Música clásica"],
    espectaculos: [
      {
        nombre: "Experiencia instrumental",
        descripcion: "Presentación musical instrumental con repertorio de fusión.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Eventos corporativos", "Eventos culturales", "Celebraciones", "Presentaciones especiales"],
    requerimientos: ["Sistema de audio según recinto", "Espacio para músicos", "Iluminación", "Requerimientos de instrumentos según formato"],
    similares: ["two-souls", "andreas-zanetti", "trendline"]
  },

  "victor-castaneda": {
    nombre: "Víctor Castañeda",
    categoria: "Mentalismo y entretenimiento",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Una experiencia de mentalismo diseñada para sorprender a la audiencia.",
    descripcion: [
      "Víctor Castañeda presenta una propuesta de entretenimiento centrada en el mentalismo.",
      "Su espectáculo busca generar sorpresa e interacción con el público."
    ],
    especialidades: ["Mentalismo", "Entretenimiento", "Experiencias interactivas"],
    espectaculos: [
      {
        nombre: "Show de mentalismo",
        descripcion: "Presentación de mentalismo para eventos y audiencias.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Eventos corporativos", "Celebraciones privadas", "Eventos especiales"],
    requerimientos: ["Espacio para presentación", "Micrófono según aforo", "Sistema de audio según recinto", "Iluminación"],
    similares: ["joe-moy", "michelle-rodriguez", "andreas-zanetti"]
  },

  "percy": {
    nombre: "Percy",
    categoria: "Cantante de regional mexicano",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Música regional mexicana para celebraciones y eventos.",
    descripcion: [
      "Percy es un cantante con una propuesta musical orientada al regional mexicano.",
      "Su presentación está dirigida a celebraciones y eventos que buscan música de este género."
    ],
    especialidades: ["Regional mexicano", "Cantante", "Música en vivo"],
    espectaculos: [
      {
        nombre: "Presentación musical",
        descripcion: "Show de música regional mexicana.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Fiestas privadas", "Eventos sociales", "Celebraciones", "Eventos especiales"],
    requerimientos: ["Sistema de audio", "Micrófono", "Monitoreo", "Iluminación según formato"],
    similares: ["trendline", "two-souls", "tr3mens"]
  },

  "joe-moy": {
    nombre: "Joe & Moy",
    categoria: "Magia y entretenimiento",
    ubicacion: "Consultar disponibilidad",
    imagen: "",
    descripcionCorta: "Un espectáculo de magia interactiva para sorprender y entretener.",
    descripcion: [
      "Joe & Moy presentan una propuesta de entretenimiento basada en magia e interacción con la audiencia.",
      "Su espectáculo está pensado para generar momentos sorprendentes durante eventos y celebraciones."
    ],
    especialidades: ["Magia", "Ilusionismo", "Entretenimiento interactivo"],
    espectaculos: [
      {
        nombre: "Show de magia",
        descripcion: "Presentación de magia con participación del público.",
        duracion: "Consultar formato"
      }
    ],
    eventos: ["Eventos corporativos", "Fiestas privadas", "Celebraciones", "Eventos especiales"],
    requerimientos: ["Espacio para presentación", "Sistema de audio según recinto", "Iluminación", "Condiciones técnicas según formato"],
    similares: ["victor-castaneda", "michelle-rodriguez", "andreas-zanetti"]
  }

};


/* ==========================================
   GENERADOR DEL PERFIL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const id = document.body.dataset.artista;
  const artista = ARTISTAS_NEXO[id];

  if (!artista) {
    document.body.innerHTML = "<h1>Perfil no disponible</h1>";
    return;
  }

  document.title = artista.nombre + " | NEXO";

  const cotizacion = "cotizar.html?artista=" + encodeURIComponent(id);

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function imagenArtista(datos, clase = "") {
    if (!datos.imagen) {
      return `
        <div class="${clase}" style="
          display:flex;
          align-items:center;
          justify-content:center;
          min-height:280px;
          background:linear-gradient(135deg,#17151f,#6c4cff);
          color:white;
          font-size:32px;
          font-weight:800;
          text-align:center;
          padding:25px;
        ">
          ${escapar(datos.nombre)}
        </div>
      `;
    }

    return `
      <img
        class="${clase}"
        src="${escapar(datos.imagen)}"
        alt="${escapar(datos.nombre)}"
      >
    `;
  }

  const similares = artista.similares
    .map(clave => {
      const otro = ARTISTAS_NEXO[clave];

      if (!otro) return "";

      return `
        <article class="artista-card">

          <div class="artista-imagen">
            ${imagenArtista(otro)}
          </div>

          <div class="artista-info">

            <span class="artista-categoria">
              ${escapar(otro.categoria)}
            </span>

            <h3>${escapar(otro.nombre)}</h3>

            <p>${escapar(otro.descripcionCorta)}</p>

            <a href="perfil-${clave}.html">
              Ver perfil →
            </a>

          </div>

        </article>
      `;
    })
    .join("");

  document.getElementById("perfil-contenido").innerHTML = `

    <section class="perfil-hero">

      <div class="perfil-hero-imagen">
        ${imagenArtista(artista)}
      </div>

      <div class="perfil-hero-overlay"></div>

      <div class="perfil-hero-contenido">

        <span class="perfil-categoria">
          ${escapar(artista.categoria)}
        </span>

        <h1>${escapar(artista.nombre)}</h1>

        <p class="perfil-descripcion-corta">
          ${escapar(artista.descripcionCorta)}
        </p>

        <div class="perfil-acciones">

          <a href="${cotizacion}" class="perfil-btn-principal">
            Solicitar cotización
          </a>

          <button
            type="button"
            class="perfil-btn-secundario"
            id="guardar-artista"
          >
            ♡ Guardar
          </button>

        </div>

      </div>

    </section>


    <section class="perfil-resumen">

      <div class="perfil-resumen-contenido">

        <div class="perfil-datos">

          <div class="perfil-dato">
            <span>Ubicación</span>
            <strong>${escapar(artista.ubicacion)}</strong>
          </div>

          <div class="perfil-dato">
            <span>Categoría</span>
            <strong>${escapar(artista.categoria)}</strong>
          </div>

          <div class="perfil-dato">
            <span>Contratación</span>
            <strong>Sujeta a disponibilidad</strong>
          </div>

        </div>

        <div class="perfil-sobre">

          <p class="seccion-etiqueta">SOBRE EL ARTISTA</p>

          <h2>Sobre ${escapar(artista.nombre)}</h2>

          ${artista.descripcion.map(p => `
            <p>${escapar(p)}</p>
          `).join("")}

        </div>

      </div>

    </section>


    <section class="perfil-media">

      <div class="perfil-media-contenido">

        <div class="perfil-media-header">

          <p class="seccion-etiqueta">MEDIA</p>

          <h2>Fotografías</h2>

        </div>

        <div class="perfil-galeria">

          ${imagenArtista(artista)}

        </div>

      </div>

    </section>


    <section class="perfil-oferta">

      <div class="perfil-oferta-contenido">

        <div class="perfil-repertorio">

          <p class="seccion-etiqueta">ESPECIALIDADES</p>

          <h2>Lo que ofrece ${escapar(artista.nombre)}</h2>

          <div class="repertorio-lista">

            ${artista.especialidades.map(item => `
              <span>${escapar(item)}</span>
            `).join("")}

          </div>

        </div>

        <div class="perfil-shows">

          <p class="seccion-etiqueta">ESPECTÁCULOS</p>

          <div class="shows-grid">

            ${artista.espectaculos.map((show, index) => `
              <article class="show-card">

                <span class="show-numero">
                  ${String(index + 1).padStart(2, "0")}
                </span>

                <h3>${escapar(show.nombre)}</h3>

                <p>${escapar(show.descripcion)}</p>

                <span class="show-duracion">
                  ${escapar(show.duracion)}
                </span>

              </article>
            `).join("")}

          </div>

        </div>

      </div>

    </section>


    <section class="perfil-operativo">

      <div class="perfil-operativo-contenido">

        <div class="perfil-operativo-grid">

          <article class="perfil-operativo-card">

            <p class="seccion-etiqueta">IDEAL PARA</p>

            <h2>Tipos de evento</h2>

            <ul class="perfil-lista">

              ${artista.eventos.map(evento => `
                <li>${escapar(evento)}</li>
              `).join("")}

            </ul>

          </article>


          <article class="perfil-operativo-card">

            <p class="seccion-etiqueta">
              REQUERIMIENTOS TÉCNICOS
            </p>

            <h2>Consideraciones para el show</h2>

            <ul class="perfil-lista">

              ${artista.requerimientos.map(item => `
                <li>${escapar(item)}</li>
              `).join("")}

            </ul>

            <p>
              Los requerimientos definitivos se confirman
              al solicitar una propuesta.
            </p>

          </article>

        </div>


        <div class="perfil-disponibilidad">

          <div>

            <p class="seccion-etiqueta">DISPONIBILIDAD</p>

            <h2>Consulta fechas disponibles</h2>

            <p>
              Indícanos la fecha, ciudad y tipo de evento
              para solicitar información.
            </p>

          </div>

          <a href="${cotizacion}" class="perfil-btn-principal">
            Comprobar disponibilidad
          </a>

        </div>

      </div>

    </section>


    <section class="perfil-similares">

      <div class="perfil-similares-contenido">

        <div class="artistas-header">

          <div>

            <p class="seccion-etiqueta">
              TAMBIÉN TE PUEDE INTERESAR
            </p>

            <h2>Descubre más artistas</h2>

          </div>

          <a href="artistas.html" class="ver-todos">
            Ver todos →
          </a>

        </div>

        <div class="artistas-grid">

          ${similares}

        </div>

      </div>

    </section>

  `;

  const botonGuardar = document.getElementById("guardar-artista");
  const claveFavoritos = "nexo-artistas-favoritos";

  function obtenerFavoritos() {
    try {
      const datos = JSON.parse(localStorage.getItem(claveFavoritos));
      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  }

  function actualizarBoton() {
    const guardado = obtenerFavoritos().includes(id);

    botonGuardar.textContent = guardado
      ? "♥ Guardado"
      : "♡ Guardar";

    botonGuardar.setAttribute("aria-pressed", String(guardado));
  }

  botonGuardar.addEventListener("click", () => {
    const favoritos = obtenerFavoritos();
    const nuevos = favoritos.includes(id)
      ? favoritos.filter(item => item !== id)
      : [...favoritos, id];

    localStorage.setItem(claveFavoritos, JSON.stringify(nuevos));
    actualizarBoton();
  });

  actualizarBoton();

});// JavaScript Document