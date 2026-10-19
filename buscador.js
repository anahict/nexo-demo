/* ==========================================
   NEXO - BUSCADOR CON AUTOCOMPLETADO
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  const servicios = [
    "DJ",
    "DJ para bodas",
    "DJ para eventos",
    "DJ + performance",
    "Mariachi",
    "Bandas de covers",
    "Bandas de rock",
    "Cantantes",
    "Solistas",
    "Dúos musicales",
    "Pianistas",
    "Violinistas",
    "Saxofonistas",
    "Comediantes",
    "Stand-up",
    "Magos",
    "Conferencistas",
    "Conductores de eventos",
    "Pantallas LED",
    "Renta de pantallas",
    "Audio profesional",
    "Iluminación profesional",
    "Producción de eventos",
    "Escenarios",
    "Backline"
  ];

  const normalizar = texto =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  function rutaResultados() {
    const enPaginas = window.location.pathname
      .split("/")
      .includes("pages");

    return enPaginas
      ? "explorar.html"
      : "pages/explorar.html";
  }

  function buscar(termino) {
    if (!termino.trim()) return;

    window.location.href =
      rutaResultados() +
      "?q=" +
      encodeURIComponent(termino.trim());
  }

  function activarBuscador(input) {

    if (input.dataset.nexoAutocomplete === "true") {
      return;
    }

    input.dataset.nexoAutocomplete = "true";

    const contenedor = document.createElement("div");
    contenedor.className = "nexo-buscador-contenedor";

    input.parentNode.insertBefore(contenedor, input);
    contenedor.appendChild(input);

    const sugerencias = document.createElement("div");
    sugerencias.className = "nexo-sugerencias";

    contenedor.appendChild(sugerencias);

    let seleccion = -1;
    let resultados = [];

    function cerrar() {
      sugerencias.innerHTML = "";
      sugerencias.classList.remove("activo");
      seleccion = -1;
    }

    function actualizarSeleccion() {
      const opciones = sugerencias.querySelectorAll(
        ".nexo-sugerencia"
      );

      opciones.forEach((opcion, indice) => {
        opcion.classList.toggle(
          "seleccionada",
          indice === seleccion
        );
      });
    }

    function mostrar() {

      const valor = normalizar(input.value);

      sugerencias.innerHTML = "";
      seleccion = -1;

      if (!valor) {
        cerrar();
        return;
      }

      resultados = servicios
        .filter(servicio =>
          normalizar(servicio).includes(valor)
        )
        .slice(0, 7);

      if (!resultados.length) {
        cerrar();
        return;
      }

      resultados.forEach(servicio => {

        const opcion = document.createElement("button");

        opcion.type = "button";
        opcion.className = "nexo-sugerencia";
        opcion.textContent = servicio;

        opcion.addEventListener("mousedown", function (e) {
          e.preventDefault();
          input.value = servicio;
          cerrar();
          buscar(servicio);
        });

        sugerencias.appendChild(opcion);
      });

      sugerencias.classList.add("activo");
    }

    input.addEventListener("input", mostrar);

    input.addEventListener("focus", mostrar);

    input.addEventListener("keydown", function (e) {

      if (e.key === "ArrowDown" && resultados.length) {
        e.preventDefault();
        seleccion = Math.min(
          seleccion + 1,
          resultados.length - 1
        );
        actualizarSeleccion();
      }

      if (e.key === "ArrowUp" && resultados.length) {
        e.preventDefault();
        seleccion = Math.max(seleccion - 1, 0);
        actualizarSeleccion();
      }

      if (e.key === "Escape") {
        cerrar();
      }

      if (e.key === "Enter") {
        e.preventDefault();

        const termino =
          seleccion >= 0
            ? resultados[seleccion]
            : input.value;

        buscar(termino);
      }
    });

    document.addEventListener("click", function (e) {
      if (!contenedor.contains(e.target)) {
        cerrar();
      }
    });

    const formulario = input.closest("form");

    if (formulario) {
      formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        buscar(input.value);
      });
    }
  }

  const selectores = [
    ".nexo-header-buscador input",
    ".buscador input[name='q']",
    ".explorar-buscador input[name='q']"
  ];

  document
    .querySelectorAll(selectores.join(","))
    .forEach(activarBuscador);

});// JavaScript Document