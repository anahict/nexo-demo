document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       NEXO
       SCRIPT GENERAL
    ========================================================= */



    /* =========================================================
       COTIZADOR
    ========================================================= */

    var pasosCotizador =
        document.querySelectorAll(".cotizador-paso");

    var barraCotizador =
        document.querySelector(".cotizador-barra-activa");

    var textoProgresoCotizador =
        document.querySelector(".cotizador-progreso span");

    var pasoCotizadorActual = 0;



    function mostrarPasoCotizador(indice) {

        var i;

        for (i = 0; i < pasosCotizador.length; i++) {

            pasosCotizador[i]
                .classList.remove("activo");

        }


        if (pasosCotizador[indice]) {

            pasosCotizador[indice]
                .classList.add("activo");

        }


        if (barraCotizador) {

            var porcentaje =
                ((indice + 1) / pasosCotizador.length) * 100;

            barraCotizador.style.width =
                porcentaje + "%";

        }


        if (textoProgresoCotizador) {

            textoProgresoCotizador.textContent =
                "Paso " +
                (indice + 1) +
                " de " +
                pasosCotizador.length;

        }

    }



    /* =========================================================
       COTIZADOR - OTRO TIPO DE EVENTO
    ========================================================= */

    var opcionesTipoEvento =
        document.querySelectorAll(
            'input[name="tipo-evento"]'
        );

    var campoOtroEvento =
        document.getElementById(
            "campo-otro-evento"
        );

    var otroEvento =
        document.getElementById(
            "otro-evento"
        );


    if (
        opcionesTipoEvento.length > 0 &&
        campoOtroEvento
    ) {

        var iEvento;

        for (
            iEvento = 0;
            iEvento < opcionesTipoEvento.length;
            iEvento++
        ) {

            opcionesTipoEvento[iEvento]
                .addEventListener(
                    "change",
                    function () {

                        if (
                            this.value === "otro" &&
                            this.checked
                        ) {

                            campoOtroEvento.style.display =
                                "block";

                            if (otroEvento) {
                                otroEvento.focus();
                            }

                        }

                        else if (this.checked) {

                            campoOtroEvento.style.display =
                                "none";

                            if (otroEvento) {
                                otroEvento.value = "";
                            }

                        }

                    }
                );

        }

    }



    /* =========================================================
       COTIZADOR - OTRA CIUDAD
    ========================================================= */

    var ciudadEvento =
        document.getElementById(
            "ciudad-evento"
        );

    var campoOtraCiudad =
        document.getElementById(
            "campo-otra-ciudad"
        );

    var otraCiudad =
        document.getElementById(
            "otra-ciudad"
        );


    if (
        ciudadEvento &&
        campoOtraCiudad
    ) {

        ciudadEvento.addEventListener(
            "change",
            function () {

                if (
                    ciudadEvento.value === "otro"
                ) {

                    campoOtraCiudad.style.display =
                        "block";

                    if (otraCiudad) {
                        otraCiudad.focus();
                    }

                }

                else {

                    campoOtraCiudad.style.display =
                        "none";

                    if (otraCiudad) {
                        otraCiudad.value = "";
                    }

                }

            }
        );

    }



    /* =========================================================
       COTIZADOR - VALIDAR PASO ACTUAL
    ========================================================= */

    function validarPasoCotizador() {


        /* PASO 1 */

        if (pasoCotizadorActual === 0) {

            var tipoEvento =
                document.querySelector(
                    'input[name="tipo-evento"]:checked'
                );


            if (!tipoEvento) {

                alert(
                    "Selecciona el tipo de evento para continuar."
                );

                return false;

            }


            if (
                tipoEvento.value === "otro"
            ) {

                if (
                    !otroEvento ||
                    otroEvento.value.trim() === ""
                ) {

                    alert(
                        "Escribe qué tipo de evento estás organizando."
                    );

                    return false;

                }

            }

        }



        /* PASO 2 */

        else if (
            pasoCotizadorActual === 1
        ) {

            var fechaEvento =
                document.getElementById(
                    "fecha-evento"
                );


            if (
                !fechaEvento ||
                fechaEvento.value === ""
            ) {

                alert(
                    "Selecciona la fecha de tu evento para continuar."
                );

                return false;

            }

        }



        /* PASO 3 */

        else if (
            pasoCotizadorActual === 2
        ) {

            if (
                !ciudadEvento ||
                ciudadEvento.value === ""
            ) {

                alert(
                    "Selecciona la ciudad donde será tu evento para continuar."
                );

                return false;

            }


            if (
                ciudadEvento.value === "otro"
            ) {

                if (
                    !otraCiudad ||
                    otraCiudad.value.trim() === ""
                ) {

                    alert(
                        "Escribe la ciudad donde será tu evento."
                    );

                    return false;

                }

            }

        }



        /* PASO 4 */

        else if (
            pasoCotizadorActual === 3
        ) {

            var numeroInvitados =
                document.getElementById(
                    "numero-invitados"
                );


            if (
                !numeroInvitados ||
                numeroInvitados.value === "" ||
                Number(numeroInvitados.value) < 1
            ) {

                alert(
                    "Indica aproximadamente cuántas personas asistirán."
                );

                return false;

            }

        }



        /* PASO 5 */

        else if (
            pasoCotizadorActual === 4
        ) {

            var necesidades =
                document.querySelectorAll(
                    'input[name="necesidades"]:checked'
                );


            if (
                necesidades.length === 0
            ) {

                alert(
                    "Selecciona al menos una opción para tu evento."
                );

                return false;

            }

        }



        /* PASO 6 */

        else if (
            pasoCotizadorActual === 5
        ) {

            var presupuesto =
                document.querySelector(
                    'input[name="presupuesto"]:checked'
                );


            if (!presupuesto) {

                alert(
                    "Selecciona un presupuesto estimado para continuar."
                );

                return false;

            }

        }


        return true;

    }



    /* =========================================================
       COTIZADOR - DATOS DE CONTACTO
    ========================================================= */

    function validarContactoCotizador() {

        var nombreContacto =
            document.getElementById(
                "nombre-contacto"
            );

        var correoContacto =
            document.getElementById(
                "correo-contacto"
            );

        var telefonoContacto =
            document.getElementById(
                "telefono-contacto"
            );


        if (
            !nombreContacto ||
            nombreContacto.value.trim() === ""
        ) {

            alert(
                "Escribe tu nombre para continuar."
            );

            return false;

        }


        if (
            !correoContacto ||
            correoContacto.value.trim() === ""
        ) {

            alert(
                "Escribe tu correo electrónico."
            );

            return false;

        }


        if (
            correoContacto.value.indexOf("@") === -1
        ) {

            alert(
                "Escribe un correo electrónico válido."
            );

            return false;

        }


        if (
            !telefonoContacto ||
            telefonoContacto.value.trim() === ""
        ) {

            alert(
                "Escribe un número de teléfono."
            );

            return false;

        }


        return true;

    }



    /* =========================================================
       COTIZADOR - BOTONES
    ========================================================= */

    document.addEventListener(
        "click",
        function (evento) {


            /* CONTINUAR */

            if (
                evento.target.classList.contains(
                    "cotizador-siguiente"
                )
            ) {

                if (
                    !validarPasoCotizador()
                ) {

                    return;

                }


                if (
                    pasoCotizadorActual <
                    pasosCotizador.length - 1
                ) {

                    pasoCotizadorActual++;

                    mostrarPasoCotizador(
                        pasoCotizadorActual
                    );

                }

            }



            /* ATRÁS */

            if (
                evento.target.classList.contains(
                    "cotizador-anterior"
                )
            ) {

                if (
                    pasoCotizadorActual > 0
                ) {

                    pasoCotizadorActual--;

                    mostrarPasoCotizador(
                        pasoCotizadorActual
                    );

                }

            }



            /* ENVIAR */

            if (
                evento.target.classList.contains(
                    "cotizador-enviar"
                )
            ) {

                if (
                    !validarContactoCotizador()
                ) {

                    return;

                }


                var nombreFinal =
                    document
                        .getElementById(
                            "nombre-contacto"
                        )
                        .value
                        .trim();


                alert(
                    "¡Solicitud enviada! Gracias, " +
                    nombreFinal +
                    ". Hemos recibido la información de tu evento."
                );

            }

        }
    );



    if (
        pasosCotizador.length > 0
    ) {

        mostrarPasoCotizador(0);

    }





    /* =========================================================
       REGISTRO NEXO - DEMOSTRACIÓN LOCAL SIN BACKEND
    ========================================================= */
    const tarjetas = document.querySelectorAll('.registro-tipo');
    const seleccion = document.querySelector('.registro-tipos');
    const formularios = {
        cliente: document.getElementById('formulario-cliente'),
        artista: document.getElementById('formulario-artista'),
        proveedor: document.getElementById('formulario-empresa')
    };
    function abrirRegistro(tipo) {
        if (!formularios[tipo]) return;
        if (seleccion) seleccion.style.display = 'none';
        Object.keys(formularios).forEach(k => formularios[k]?.classList.toggle('activo', k === tipo));
        window.scrollTo(0, 0);
    }
    tarjetas.forEach(b => b.addEventListener('click', () => abrirRegistro(b.dataset.tipo)));
    document.querySelectorAll('.registro-volver').forEach(b => b.addEventListener('click', () => {
        Object.values(formularios).forEach(f => f?.classList.remove('activo'));
        if (seleccion) seleccion.style.display = 'grid';
        window.scrollTo(0, 0);
    }));
    const grupos = {
        cantante:['opciones-talento'], banda:['opciones-talento'], dj:['opciones-talento'],
        musico:['opciones-musico','opciones-talento'], ensamble:['opciones-talento'],
        comedia:['opciones-comedia'], entretenimiento:['opciones-entretenimiento'],
        danza:['opciones-danza'], conductor:['opciones-conductor'],
        conferencista:['opciones-conferencista'], 'show-especial':['opciones-show']
    };
    const musicales = ['cantante','banda','dj','musico','ensamble'];
    const artistaForm = formularios.artista;
    function actualizarCategoria() {
        if (!artistaForm) return;
        const categoria = artistaForm.querySelector('input[name="tipo-proveedor"]:checked')?.value;
        const visibles = grupos[categoria] || [];
        artistaForm.querySelectorAll('.registro-subopciones').forEach(b => {
            const activo = visibles.includes(b.id);
            b.classList.toggle('activo', activo);
            if (!activo) b.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
        });
    }
    artistaForm?.querySelectorAll('input[name="tipo-proveedor"]').forEach(r => r.addEventListener('change', () => {
        actualizarCategoria();
        const destino = artistaForm.querySelector('#opciones-talento.activo') || artistaForm.querySelector('.registro-subopciones.activo');
        if (destino) destino.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    }));
    actualizarCategoria();
    const otraCategoria = document.getElementById('empresa-otro-contenedor');
    document.querySelectorAll('input[name="categoria-servicio"]').forEach(r => r.addEventListener('change', () => {
        if (otraCategoria) otraCategoria.hidden = r.value !== '18';
        if (r.value !== '18') document.getElementById('empresa-otro').value = '';
    }));
    const valor = id => document.getElementById(id)?.value.trim() || '';
    const avisar = (msg, id) => { alert(msg); document.getElementById(id)?.focus(); };
    const correoValido = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const telefonoValido = v => v.replace(/\D/g,'').length >= 10;
    function validarDatos(prefix, conContacto) {
        const nombre = valor(prefix+'-nombre');
        const contacto = conContacto ? valor(prefix+'-contacto') : nombre;
        const correo = valor(prefix+'-correo');
        const telefono = valor(prefix+'-telefono');
        const password = valor(prefix+'-password');
        if (!nombre) return avisar('Escribe el nombre completo, artístico o comercial.',prefix+'-nombre');
        if (!contacto) return avisar('Escribe el nombre de contacto.',prefix+'-contacto');
        if (!correoValido(correo)) return avisar('Escribe un correo válido.',prefix+'-correo');
        if (!telefonoValido(telefono)) return avisar('Escribe un teléfono de al menos 10 dígitos.',prefix+'-telefono');
        if (password.length < 6) return avisar('La contraseña debe tener al menos 6 caracteres.',prefix+'-password');
        // No se guarda la contraseña: esta versión es una maqueta sin autenticación real.
        return {nombre, contacto, correo, telefono};
    }
    document.getElementById('crear-cliente')?.addEventListener('click', () => {
        const datos = validarDatos('cliente',false);
        if (!datos) return;
        try {localStorage.setItem('nexoClienteDemo',JSON.stringify({...datos,tipoCuenta:'cliente'}));}
        catch(e){return avisar('No se pudieron guardar los datos en este navegador.');}
        alert('Datos guardados solo en este navegador como demostración. No se creó una cuenta real.');
        window.location.href='../index.html';
    });
    document.getElementById('crear-artista')?.addEventListener('click', () => {
        const categoria = artistaForm?.querySelector('input[name="tipo-proveedor"]:checked')?.value;
        if (!categoria) return avisar('Selecciona qué tipo de artista eres.');
        const visibles = grupos[categoria] || [];
        const seleccionados = visibles.flatMap(id => Array.from(document.getElementById(id)?.querySelectorAll('input[type="checkbox"]:checked') || []));
        const subcategorias = seleccionados.filter(el => !['genero','decada'].includes(el.name)).map(el => el.value);
        const generos = seleccionados.filter(el => el.name === 'genero').map(el => el.value);
        const decadas = seleccionados.filter(el => el.name === 'decada').map(el => el.value);
        if (categoria === 'musico' && !subcategorias.length) return avisar('Selecciona tu instrumento.');
        if (musicales.includes(categoria) && !generos.length) return avisar('Selecciona al menos un género musical.');
        if (!musicales.includes(categoria) && !subcategorias.length) return avisar('Selecciona al menos una especialidad.');
        const datos = validarDatos('proveedor',true);
        if (!datos) return;
        try {localStorage.setItem('nexoProveedor',JSON.stringify({...datos,tipoCuenta:'artista',tipo:categoria,categoria,subcategorias,generos,decadas}));}
        catch(e){return avisar('No se pudieron guardar los datos.');}
        window.location.href='completar-perfil.html';
    });
    document.getElementById('crear-empresa')?.addEventListener('click', () => {
        const opcion = document.querySelector('input[name="categoria-servicio"]:checked');
        if (!opcion) return avisar('Selecciona una categoría de proveedor.');
        const categoria = opcion.parentElement.querySelector('span')?.textContent.trim() || '';
        const otro = valor('empresa-otro');
        if (opcion.value === '18' && !otro) return avisar('Especifica qué servicio ofreces.','empresa-otro');
        const datos = validarDatos('empresa',true);
        if (!datos) return;
        try {localStorage.setItem('nexoProveedor',JSON.stringify({...datos,tipoCuenta:'proveedor',tipo:'produccion',categoria,subcategorias:otro?[otro]:[],generos:[],decadas:[]}));}
        catch(e){return avisar('No se pudieron guardar los datos.');}
        window.location.href='completar-perfil.html';
    });
    const tipoURL = new URLSearchParams(window.location.search).get('tipo');
    if (tipoURL === 'artista' || tipoURL === 'proveedor' || tipoURL === 'cliente') abrirRegistro(tipoURL);

});

/* =========================================
   NEXO — MENÚ HAMBURGUESA
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const botonMenu = document.getElementById("nexo-menu-boton");
    const panelMenu = document.getElementById("nexo-menu");

    // Verificar que los elementos existan
    if (!botonMenu || !panelMenu) {
        return;
    }

    // Abrir menú
    function abrirMenu() {
        panelMenu.hidden = false;

        botonMenu.setAttribute("aria-expanded", "true");
        botonMenu.setAttribute("aria-label", "Cerrar menú");

        botonMenu.textContent = "✕";
    }

    // Cerrar menú
    function cerrarMenu() {
        panelMenu.hidden = true;

        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú");

        botonMenu.textContent = "☰";
    }

    // Abrir y cerrar con el botón
    botonMenu.addEventListener("click", function (evento) {

        evento.stopPropagation();

        if (panelMenu.hidden) {
            abrirMenu();
        } else {
            cerrarMenu();
        }

    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", function (evento) {

        if (
            !panelMenu.hidden &&
            !panelMenu.contains(evento.target) &&
            !botonMenu.contains(evento.target)
        ) {
            cerrarMenu();
        }

    });

    // Cerrar con tecla ESC
    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape" && !panelMenu.hidden) {
            cerrarMenu();
            botonMenu.focus();
        }

    });

});

/* =========================================
   NEXO — FAVORITOS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const CLAVE = "nexoFavoritos";

    const botones = document.querySelectorAll(
        ".artistas-destacados .favorito"
    );

    const botonHeader = document.querySelector(
        ".nexo-header-acciones .nexo-icono[aria-label='Favoritos']"
    );

    function obtenerFavoritos() {
        try {
            const datos = JSON.parse(localStorage.getItem(CLAVE));
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    }

    let favoritos = obtenerFavoritos();

    function guardarFavoritos() {
        try {
            localStorage.setItem(
                CLAVE,
                JSON.stringify(favoritos)
            );
            return true;
        } catch (error) {
            alert("No se pudieron guardar los favoritos en este navegador.");
            return false;
        }
    }

    function actualizarCorazones() {

        botones.forEach(function (boton) {

            const tarjeta = boton.closest(".artista-card");
            const nombre = tarjeta.querySelector("h3").textContent.trim();
            const seleccionado = favoritos.includes(nombre);

            boton.textContent = seleccionado ? "♥" : "♡";

            boton.setAttribute(
                "aria-pressed",
                String(seleccionado)
            );

            boton.setAttribute(
                "aria-label",
                seleccionado
                    ? "Quitar " + nombre + " de favoritos"
                    : "Agregar " + nombre + " a favoritos"
            );

            boton.style.color = seleccionado ? "#6c4cff" : "";

        });

    }

    botones.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const tarjeta = boton.closest(".artista-card");
            const nombre = tarjeta.querySelector("h3").textContent.trim();

            const anteriores = [...favoritos];

            if (favoritos.includes(nombre)) {
                favoritos = favoritos.filter(
                    artista => artista !== nombre
                );
            } else {
                favoritos.push(nombre);
            }

            if (!guardarFavoritos()) {
                favoritos = anteriores;
            }

            actualizarCorazones();

        });

    });

    if (botonHeader) {

        botonHeader.addEventListener("click", function () {

            if (favoritos.length === 0) {
                alert("Todavía no tienes artistas favoritos.");
                return;
            }

            alert(
                "Tus artistas favoritos:\n\n" +
                favoritos.map(nombre => "♥ " + nombre).join("\n")
            );

        });

    }

    actualizarCorazones();

});