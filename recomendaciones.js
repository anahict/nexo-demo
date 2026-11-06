/* ==========================================
   NEXO - ARTISTAS RELACIONADOS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("nexo-recomendaciones");

  if (!contenedor) return;

  const artistaActual = contenedor.dataset.artista;

  // CATÁLOGO DE ARTISTAS

  const artistas = [
    {
      id: "trendline",
      nombre: "Trendline",
      categoria: "Banda de covers · Pop / Rock",
      imagen: "../assets/images/trendline.png",
      enlace: "trendline.html",
      etiquetas: ["covers", "pop", "rock", "banda"]
    },
    {
      id: "two-souls",
      nombre: "Two Souls",
      categoria: "Dúo vocal · Pop / Covers",
      imagen: "../assets/images/two-souls.jpg",
      enlace: "two-souls.html",
      etiquetas: ["covers", "pop", "duo", "vocal"]
    },
    {
      id: "mr-loxley",
      nombre: "Mr. Loxley",
      categoria: "DJ · Espectáculo audiovisual",
      imagen: "../assets/images/mr-loxley.jpg",
      enlace: "mr-loxley.html",
      etiquetas: ["dj", "performance", "audiovisual"]
    }
  ];

  const actual = artistas.find(artista => artista.id === artistaActual);

  if (!actual) return;

  // BUSCAR ARTISTAS CON CATEGORÍAS SIMILARES

  const relacionados = artistas
    .filter(artista => artista.id !== artistaActual)
    .map(artista => ({
      ...artista,
      coincidencias: artista.etiquetas.filter(etiqueta =>
        actual.etiquetas.includes(etiqueta)
      ).length
    }))
    .filter(artista => artista.coincidencias > 0)
    .sort((a, b) => b.coincidencias - a.coincidencias)
    .slice(0, 3);

  // NO MOSTRAR ARTISTAS SIN RELACIÓN

  if (relacionados.length === 0) {
    contenedor.remove();
    return;
  }

  contenedor.innerHTML = `
    <div class="nexo-recomendaciones-contenido">

      <span class="nexo-recomendaciones-etiqueta">
        DESCUBRE MÁS TALENTO
      </span>

      <h2>También te pueden interesar</h2>

      <div class="nexo-recomendaciones-grid">

        ${relacionados.map(artista => `
          <a href="${artista.enlace}" class="nexo-recomendacion-card">

            <img
              src="${artista.imagen}"
              alt="${artista.nombre}"
              loading="lazy"
            >

            <div class="nexo-recomendacion-info">
              <h3>${artista.nombre}</h3>
              <p>${artista.categoria}</p>
            </div>

          </a>
        `).join("")}

      </div>

    </div>
  `;

});// JavaScript Document