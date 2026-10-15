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
       REGISTRO NEXO: CLIENTE, ARTISTA Y PROVEEDOR
       Demostración local: no crea cuentas en un servidor.
    ========================================================= */
    const tarjetasRegistro = document.querySelectorAll('.registro-tipo');
    const seleccionRegistro = document.querySelector('.registro-tipos');
    const formularioCliente = document.getElementById('formulario-cliente');
    const formularioProveedor = document.getElementById('formulario-proveedor');
    const tituloProfesional = document.getElementById('registro-titulo-profesional');
    let tipoCuentaElegido = '';
    function mostrarTipoRegistro(tipo) {
        tipoCuentaElegido = tipo;
        if (seleccionRegistro) seleccionRegistro.style.display = 'none';
        if (formularioCliente) formularioCliente.classList.toggle('activo', tipo === 'cliente');
        if (formularioProveedor) formularioProveedor.classList.toggle('activo', tipo === 'artista' || tipo === 'proveedor');
        if (tituloProfesional) tituloProfesional.textContent = tipo === 'artista' ? 'CUENTA DE ARTISTA' : 'CUENTA DE PROVEEDOR';
        window.scrollTo(0, 0);
    }
    tarjetasRegistro.forEach(function (tarjeta) {
        tarjeta.addEventListener('click', function () { mostrarTipoRegistro(tarjeta.dataset.tipo); });
    });
    document.querySelectorAll('.registro-volver').forEach(function (boton) {
        boton.addEventListener('click', function () {
            if (formularioCliente) formularioCliente.classList.remove('activo');
            if (formularioProveedor) formularioProveedor.classList.remove('activo');
            if (seleccionRegistro) seleccionRegistro.style.display = 'grid';
            tipoCuentaElegido = '';
            window.scrollTo(0, 0);
        });
    });
    const gruposCategoria = {
        cantante: ['opciones-talento'], banda: ['opciones-talento'], dj: ['opciones-talento'],
        musico: ['opciones-musico', 'opciones-talento'], ensamble: ['opciones-talento'],
        comedia: ['opciones-comedia'], entretenimiento: ['opciones-entretenimiento'],
        danza: ['opciones-danza'], conductor: ['opciones-conductor'],
        conferencista: ['opciones-conferencista'], 'show-especial': ['opciones-show'],
        produccion: ['opciones-produccion']
    };
    const categoriasMusicales = ['cantante', 'banda', 'dj', 'musico', 'ensamble'];
    function actualizarCategoria() {
        if (!formularioProveedor) return;
        const seleccionado = formularioProveedor.querySelector('input[name="tipo-proveedor"]:checked');
        const visibles = seleccionado ? (gruposCategoria[seleccionado.value] || []) : [];
        formularioProveedor.querySelectorAll('.registro-subopciones').forEach(function (bloque) {
            const activo = visibles.includes(bloque.id);
            bloque.classList.toggle('activo', activo);
            if (!activo) bloque.querySelectorAll('input[type="checkbox"]').forEach(function (c) { c.checked = false; });
        });
    }
    if (formularioProveedor) {
        formularioProveedor.querySelectorAll('input[name="tipo-proveedor"]').forEach(function (radio) {
            radio.addEventListener('change', actualizarCategoria);
        });
        actualizarCategoria();
    }
    function valorCampo(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
    function errorRegistro(mensaje, id) {
        alert(mensaje);
        const el = id ? document.getElementById(id) : null;
        if (el) el.focus();
    }
    function correoValido(correo) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); }
    function telefonoValido(telefono) { return telefono.replace(/\D/g, '').length >= 10; }
    const crearCliente = document.getElementById('crear-cliente');
    if (crearCliente) crearCliente.addEventListener('click', function () {
        const nombre = valorCampo('cliente-nombre');
        const correo = valorCampo('cliente-correo');
        const telefono = valorCampo('cliente-telefono');
        const password = valorCampo('cliente-password');
        if (!nombre) return errorRegistro('Escribe tu nombre completo.', 'cliente-nombre');
        if (!correoValido(correo)) return errorRegistro('Escribe un correo electrónico válido.', 'cliente-correo');
        if (!telefonoValido(telefono)) return errorRegistro('Escribe un teléfono válido de al menos 10 dígitos.', 'cliente-telefono');
        if (password.length < 6) return errorRegistro('La contraseña debe tener al menos 6 caracteres.', 'cliente-password');
        try {
            localStorage.setItem('nexoClienteDemo', JSON.stringify({ tipoCuenta: 'cliente', nombre, correo, telefono }));
        } catch (e) { return errorRegistro('No se pudieron guardar los datos de esta demostración.'); }
        alert('Tus datos de cliente se guardaron en este navegador como demostración. Aún no se ha creado una cuenta real ni se ha habilitado el inicio de sesión.');
        window.location.href = '../index.html';
    });
    const crearProveedor = document.getElementById('crear-proveedor');
    if (crearProveedor) crearProveedor.addEventListener('click', function () {
        const seleccionado = formularioProveedor.querySelector('input[name="tipo-proveedor"]:checked');
        if (!seleccionado) return errorRegistro('Selecciona qué tipo de servicio ofreces.');
        const categoria = seleccionado.value;
        const ids = gruposCategoria[categoria] || [];
        const subcategorias = [];
        ids.forEach(function (id) {
            const bloque = document.getElementById(id);
            if (bloque) bloque.querySelectorAll('input[type="checkbox"]:checked').forEach(function (input) {
                if (input.name !== 'genero' && input.name !== 'decada') subcategorias.push(input.value);
            });
        });
        if (categoria === 'musico' && !formularioProveedor.querySelector('#opciones-musico input:checked')) {
            return errorRegistro('Selecciona al menos un instrumento.');
        }
        if (!categoriasMusicales.includes(categoria) && !subcategorias.length) {
            return errorRegistro('Selecciona al menos una opción dentro de tu categoría.');
        }
        const generos = Array.from(formularioProveedor.querySelectorAll('input[name="genero"]:checked')).map(el => el.value);
        const decadas = Array.from(formularioProveedor.querySelectorAll('input[name="decada"]:checked')).map(el => el.value);
        if (categoriasMusicales.includes(categoria) && !generos.length) {
            return errorRegistro('Selecciona al menos un género o estilo musical.');
        }
        const nombre = valorCampo('proveedor-nombre');
        const contacto = valorCampo('proveedor-contacto');
        const correo = valorCampo('proveedor-correo');
        const telefono = valorCampo('proveedor-telefono');
        const password = valorCampo('proveedor-password');
        if (!nombre) return errorRegistro('Escribe tu nombre artístico o comercial.', 'proveedor-nombre');
        if (!contacto) return errorRegistro('Escribe el nombre de contacto.', 'proveedor-contacto');
        if (!correoValido(correo)) return errorRegistro('Escribe un correo electrónico válido.', 'proveedor-correo');
        if (!telefonoValido(telefono)) return errorRegistro('Escribe un teléfono válido de al menos 10 dígitos.', 'proveedor-telefono');
        if (password.length < 6) return errorRegistro('La contraseña debe tener al menos 6 caracteres.', 'proveedor-password');
        const datos = { tipoCuenta: tipoCuentaElegido || 'proveedor', tipo: categoria, categoria, nombre, contacto, correo, telefono, subcategorias, generos, decadas };
        try { localStorage.setItem('nexoProveedor', JSON.stringify(datos)); }
        catch (e) { return errorRegistro('No se pudieron guardar temporalmente los datos.'); }
        window.location.href = 'completar-perfil.html';
    });

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