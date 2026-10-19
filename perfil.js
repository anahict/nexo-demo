document.addEventListener("DOMContentLoaded", function () {


    // El registro usa nexoProveedor para artistas y proveedores.
    var registroInicial = {};
    try { registroInicial = JSON.parse(localStorage.getItem('nexoProveedor') || '{}') || {}; }
    catch (error) { registroInicial = {}; }
    var tipoCuentaPerfil = registroInicial.tipoCuenta || 'proveedor';
    var esArtista = tipoCuentaPerfil === 'artista';
    function precioNumerico() {
        const raw = valor('servicio-precio').replace(/^\$\s*/, '').replace(/\s*MXN$/i, '').trim();
        if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(raw)) return NaN;
        return Number(raw.replace(/,/g, ''));
    }
    function valorDisponibilidad() { return document.querySelector('input[name=disponibilidad]:checked')?.value || ''; }
    function actualizarVistaArtista() {
        const cobertura = document.querySelector('input[name=cobertura]:checked');
        let galeria = [];
        try { galeria = JSON.parse(localStorage.getItem('nexoGaleriaTemporal') || '[]'); } catch (_) {}
        const dias = Array.from(document.querySelectorAll('input[name=disponibilidad-dia]:checked'), el => el.nextElementSibling.textContent);
        // Lista explícita de datos públicos: nunca copiar la solicitud ni el registro completos.
        const datos = {
            nombre: valor('perfil-nombre'), categoria: registroInicial.categoria || registroInicial.tipo || 'Artista',
            descripcion: valor('perfil-descripcion'), ciudad: valor('perfil-ciudad'),
            cobertura: cobertura?.value === 'otro' ? valor('otra-cobertura') : cobertura?.nextElementSibling?.textContent.trim() || '',
            portada: localStorage.getItem('nexoPortadaTemporal') || '', avatar: localStorage.getItem('nexoAvatarTemporal') || '',
            galeria: Array.isArray(galeria) ? galeria : [], video: NexoVistaPublica.videoURL(valor('perfil-video')),
            generos: registroInicial.generos || [], decadas: registroInicial.decadas || [], subcategorias: registroInicial.subcategorias || [],
            servicio: {nombre: valor('servicio-nombre'), incluye: valor('servicio-incluye'), duracion: valor('servicio-duracion')},
            disponibilidad: valorDisponibilidad() === 'flexible' ? 'Flexible' : valorDisponibilidad() === 'dias-especificos' ? 'Días específicos: ' + dias.join(', ') : 'Consultar disponibilidad'
        };
        NexoVistaPublica.mostrar(document.getElementById('vista-publica-artista'), datos);
    }
    if (esArtista) {
        const estados = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
        function menuEstados(id, label) {
            const anterior = document.getElementById(id), menu = document.createElement('select');
            menu.id = id; menu.name = anterior.name;
            menu.append(new Option('Selecciona un estado', ''));
            estados.forEach(estado => menu.append(new Option(estado, estado)));
            anterior.replaceWith(menu); document.querySelector('label[for="' + id + '"]').textContent = label;
        }
        menuEstados('perfil-ciudad', 'Estado base');
        menuEstados('otra-cobertura', '¿En qué otro estado puedes trabajar?');
        const video = document.getElementById('perfil-video'); video.required = true;
        video.labels[0].textContent = 'Video principal de YouTube o Vimeo (obligatorio)';
        const precio = document.getElementById('servicio-precio'); precio.type = 'text'; precio.inputMode = 'decimal'; precio.placeholder = '$15,000.00 MXN';
        precio.addEventListener('blur', () => { const n = precioNumerico(); if (Number.isFinite(n)) precio.value = new Intl.NumberFormat('es-MX', {style:'currency',currency:'MXN',minimumFractionDigits:2}).format(n) + ' MXN'; });
        document.getElementById('servicio-anticipacion').closest('.perfil-campo').remove();
        const opciones = document.querySelector('input[name=disponibilidad]').closest('.registro-tags-seleccion');
        opciones.replaceChildren();
        [['flexible','Flexible'],['dias-especificos','Días específicos'],['consultar','Consultar']].forEach(([value,text]) => {
            const label = document.createElement('label'), input = document.createElement('input'), span = document.createElement('span');
            input.type = 'radio'; input.name = 'disponibilidad'; input.value = value; span.textContent = text; label.append(input,span); opciones.append(label);
        });
        const dias = document.createElement('fieldset'); dias.id = 'dias-especificos'; dias.hidden = true; dias.className = 'registro-tags-seleccion';
        const legend = document.createElement('legend'); legend.textContent = 'Selecciona los días disponibles'; dias.append(legend);
        [['lunes','Lunes'],['martes','Martes'],['miercoles','Miércoles'],['jueves','Jueves'],['viernes','Viernes'],['sabado','Sábado'],['domingo','Domingo']].forEach(([value,text]) => {
            const label = document.createElement('label'), input = document.createElement('input'), span = document.createElement('span');
            input.type = 'checkbox'; input.name = 'disponibilidad-dia'; input.id = 'dia-' + value; input.value = value; span.textContent = text; label.append(input,span); dias.append(label);
        }); opciones.after(dias);
        opciones.addEventListener('change', () => { dias.hidden = valorDisponibilidad() !== 'dias-especificos'; dias.querySelectorAll('input').forEach(c => {c.disabled = dias.hidden; if (dias.hidden) c.checked = false;}); });
        document.querySelector('.perfil-resumen-publicacion').hidden = true;
        document.getElementById('vista-publica-artista').hidden = false;
    }

    // El EPK es exclusivo de artistas; no existe rider tecnico en este formulario.
    var seccionEPK = document.getElementById('seccion-press-kit');
    var inputEPK = document.getElementById('perfil-press-kit');
    if (seccionEPK) seccionEPK.hidden = !esArtista;
    if (inputEPK) {
        inputEPK.disabled = !esArtista;
        if (!esArtista) inputEPK.value = '';
    }
    if (tipoCuentaPerfil === 'cliente') {
        document.querySelector('.perfil-paso-intro').textContent = 'Este formulario es para artistas y proveedores. Regresa al registro para elegir una cuenta profesional.';
        document.getElementById('continuar-perfil-paso-1').disabled = true;
    }
    // No se codifican PDF en localStorage: solo se conserva su ficha descriptiva.
    function validarPDF(id, maxMB) {
        var input = document.getElementById(id);
        if (!input || input.disabled || !input.files.length) return true;
        var archivo = input.files[0];
        return exigir(/\.pdf$/i.test(archivo.name) &&
            (!archivo.type || archivo.type === 'application/pdf') &&
            archivo.size > 0 && archivo.size <= maxMB * 1024 * 1024,
            'Selecciona un PDF no vacío de máximo ' + maxMB + ' MB.', id);
    }
    function fichaPDF(id) {
        var input = document.getElementById(id);
        var archivo = input && !input.disabled && input.files && input.files[0];
        return archivo ? {nombre: archivo.name, bytes: archivo.size, archivoConservado: false, enviado: false} : null;
    }
    if (inputEPK) {
        inputEPK.addEventListener('change', function () {
            var correcto = validarPDF('perfil-press-kit', 20);
            var estado = document.getElementById('estado-press-kit');
            if (estado) {
                estado.textContent = correcto
                    ? (this.files.length ? this.files[0].name + ' — seleccionado; no enviado ni guardado.' : 'Sin archivo (opcional).')
                    : 'Archivo no valido. Sustituyelo o quitalo para continuar.';
            }
        });
    }

    /* =========================================================
       NEXO - COMPLETAR PERFIL
    ========================================================= */


    /* =========================================================
       ELEMENTOS GENERALES
    ========================================================= */

    var perfilPasos =
        document.querySelectorAll(".perfil-paso");

    var perfilBarraProgreso =
        document.querySelector(".perfil-progreso-activa");

    var perfilTextoPaso =
        document.querySelector(
            ".perfil-progreso-info span:first-child"
        );

    var perfilTextoNombre =
        document.querySelector(
            ".perfil-progreso-info span:last-child"
        );

    var perfilPasoActual = 0;

    var perfilNombresPasos = [
        "Información general",
        "Fotos y multimedia",
        "Servicios y tarifas privadas",
        "Información profesional",
        "Vista previa y revisión"
    ];


    /* =========================================================
       MOSTRAR PASO
    ========================================================= */

    function mostrarPasoPerfil(indice) {

        var i;

        for (
            i = 0;
            i < perfilPasos.length;
            i++
        ) {

            perfilPasos[i]
                .classList
                .remove("activo");

        }


        if (perfilPasos[indice]) {

            perfilPasos[indice]
                .classList
                .add("activo");

        }


        if (perfilBarraProgreso) {

            perfilBarraProgreso.style.width =
                (((indice + 1) / 5) * 100) +
                "%";

        }


        if (perfilTextoPaso) {

            perfilTextoPaso.textContent =
                "Paso " +
                (indice + 1) +
                " de 5";

        }


        if (perfilTextoNombre) {

            perfilTextoNombre.textContent =
                perfilNombresPasos[indice];

        }


        if (perfilPasos[indice]) {

            setTimeout(
                function () {

                    var posicion =
                        perfilPasos[indice]
                            .getBoundingClientRect()
                            .top +
                        window.pageYOffset -
                        110;


                    window.scrollTo(
                        0,
                        posicion
                    );

                },
                150
            );

        }

    }



    function valor(id) { const campo = document.getElementById(id); return campo ? campo.value.trim() : ''; }
    function exigir(condicion, mensaje, id) {
        if (condicion) return true;
        alert(mensaje);
        const campo = document.getElementById(id);
        if (campo) campo.focus();
        return false;
    }
    function validarPasoPerfil(indice) {
        if (indice === 0) {
            if (!exigir(!!valor('perfil-nombre'), 'Escribe tu nombre artístico o comercial.', 'perfil-nombre')) return false;
            if (!exigir(!!valor('perfil-ciudad'), esArtista ? 'Selecciona tu estado base.' : 'Escribe tu ciudad base.', 'perfil-ciudad')) return false;
            if (!exigir(valor('perfil-descripcion').length >= 30, 'Escribe una descripción de al menos 30 caracteres.', 'perfil-descripcion')) return false;
            const cobertura = document.querySelector('input[name="cobertura"]:checked');
            if (!exigir(!!cobertura, 'Selecciona tu zona de cobertura.')) return false;
            if (cobertura.value === 'otro' && !exigir(!!valor('otra-cobertura'), esArtista ? 'Selecciona el estado de cobertura.' : 'Escribe tu zona de cobertura.', 'otra-cobertura')) return false;
        }
        if (indice === 1) {
            if (esArtista && !exigir(!!NexoVistaPublica.videoURL(valor('perfil-video')), 'Agrega un video válido de YouTube o Vimeo.', 'perfil-video')) return false;
            if (!validarPDF("perfil-press-kit", 20)) return false;
            const portada = document.getElementById('perfil-portada');
            const avatar = document.getElementById('perfil-avatar');
            if (!exigir(!!(portada && portada.files.length || localStorage.getItem('nexoPortadaTemporal')), 'Selecciona una foto de portada.', 'perfil-portada')) return false;
            if (!exigir(!!(avatar && avatar.files.length || localStorage.getItem('nexoAvatarTemporal')), 'Selecciona una foto de perfil o logotipo.', 'perfil-avatar')) return false;
            const urls = document.querySelectorAll('#perfil-paso-2 input[type="url"]');
            for (const campo of urls) {
                if (campo.value.trim()) {
                    try { const u = new URL(campo.value.trim()); if (!['http:', 'https:'].includes(u.protocol)) throw Error(); }
                    catch (e) { return exigir(false, 'Revisa el enlace de ' + (campo.labels && campo.labels[0] ? campo.labels[0].textContent.trim() : 'tu perfil') + '. Debe comenzar con https://', campo.id); }
                }
            }
        }
        if (indice === 2) {
            if (!exigir(!!valor('servicio-nombre'), 'Escribe el nombre de tu servicio o show.', 'servicio-nombre')) return false;
            if (!exigir(valor('servicio-precio') !== '' && (esArtista ? Number.isFinite(precioNumerico()) && precioNumerico() >= 0 : Number(valor('servicio-precio')) >= 0), 'Indica un precio válido desde 0 MXN.', 'servicio-precio')) return false;
            if (!exigir(!!valor('servicio-modalidad-precio'), 'Selecciona cómo se cotiza.', 'servicio-modalidad-precio')) return false;
            if (!exigir(!!valor('servicio-incluye'), 'Explica qué incluye tu servicio.', 'servicio-incluye')) return false;
            if (!exigir(!!document.querySelector('input[name="servicio-viaja"]:checked'), 'Indica si puedes viajar para realizar eventos.')) return false;
        }
        if (indice === 3) {
            if (esArtista && valorDisponibilidad() === 'dias-especificos' && !exigir(!!document.querySelector('input[name=disponibilidad-dia]:checked'), 'Selecciona al menos un día.','dia-lunes')) return false;
            if (!exigir(valor('perfil-experiencia') !== '' && Number(valor('perfil-experiencia')) >= 0, 'Indica tus años de experiencia.', 'perfil-experiencia')) return false;
            if (!exigir(valor('perfil-equipo-personas') !== '' && Number(valor('perfil-equipo-personas')) >= 1, 'Indica cuántas personas integran tu equipo (mínimo 1).', 'perfil-equipo-personas')) return false;
            if (!exigir(!!document.querySelector('input[name="disponibilidad"]:checked'), 'Selecciona al menos una opción de disponibilidad.')) return false;
        }
        return true;
    }

    /* =========================================================
       NAVEGACIÓN
    ========================================================= */

    var botonContinuarPaso1 =
        document.getElementById(
            "continuar-perfil-paso-1"
        );

    if (botonContinuarPaso1) {

        botonContinuarPaso1
            .addEventListener(
                "click",
                function () {

                    if (!validarPasoPerfil(0)) return;

                     perfilPasoActual = 1;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonVolverPaso1 =
        document.getElementById(
            "volver-perfil-paso-1"
        );

    if (botonVolverPaso1) {

        botonVolverPaso1
            .addEventListener(
                "click",
                function () {

                    perfilPasoActual = 0;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonContinuarPaso2 =
        document.getElementById(
            "continuar-perfil-paso-2"
        );

    if (botonContinuarPaso2) {

        botonContinuarPaso2
            .addEventListener(
                "click",
                function () {

                    if (!validarPasoPerfil(1)) return;

                     perfilPasoActual = 2;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonVolverPaso2 =
        document.getElementById(
            "volver-perfil-paso-2"
        );

    if (botonVolverPaso2) {

        botonVolverPaso2
            .addEventListener(
                "click",
                function () {

                    perfilPasoActual = 1;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonContinuarPaso3 =
        document.getElementById(
            "continuar-perfil-paso-3"
        );

    if (botonContinuarPaso3) {

        botonContinuarPaso3
            .addEventListener(
                "click",
                function () {

                    if (!validarPasoPerfil(2)) return;

                     perfilPasoActual = 3;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonVolverPaso3 =
        document.getElementById(
            "volver-perfil-paso-3"
        );

    if (botonVolverPaso3) {

        botonVolverPaso3
            .addEventListener(
                "click",
                function () {

                    perfilPasoActual = 2;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonContinuarPaso4 =
        document.getElementById(
            "continuar-perfil-paso-4"
        );

    if (botonContinuarPaso4) {

        botonContinuarPaso4
            .addEventListener(
                "click",
                function () {

                    actualizarResumenPerfil();

                    if (!validarPasoPerfil(3)) return;

                     perfilPasoActual = 4;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    var botonVolverPaso4 =
        document.getElementById(
            "volver-perfil-paso-4"
        );

    if (botonVolverPaso4) {

        botonVolverPaso4
            .addEventListener(
                "click",
                function () {

                    perfilPasoActual = 3;

                    mostrarPasoPerfil(
                        perfilPasoActual
                    );

                }
            );

    }


    /* =========================================================
       COBERTURA
    ========================================================= */

    var perfilOpcionesCobertura =
        document.querySelectorAll(
            'input[name="cobertura"]'
        );

    var perfilCampoOtraCobertura =
        document.getElementById(
            "campo-otra-cobertura"
        );

    var perfilOtraCobertura =
        document.getElementById(
            "otra-cobertura"
        );


    if (
        perfilOpcionesCobertura.length > 0 &&
        perfilCampoOtraCobertura
    ) {

        var c;

        for (
            c = 0;
            c < perfilOpcionesCobertura.length;
            c++
        ) {

            perfilOpcionesCobertura[c]
                .addEventListener(
                    "change",
                    function () {

                        if (
                            this.value === "otro" &&
                            this.checked
                        ) {

                            perfilCampoOtraCobertura
                                .style.display =
                                "block";


                            if (perfilOtraCobertura) {

                                perfilOtraCobertura
                                    .focus();

                            }

                        }

                        else if (this.checked) {

                            perfilCampoOtraCobertura
                                .style.display =
                                "none";


                            if (perfilOtraCobertura) {

                                perfilOtraCobertura
                                    .value = "";

                            }

                        }

                    }
                );

        }

    }


    /* =========================================================
       VALIDACIÓN DE IMÁGENES
    ========================================================= */

    var formatosImagenPermitidos = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];


    function formatoImagenValido(
        archivo
    ) {

        return (
            formatosImagenPermitidos
                .indexOf(
                    archivo.type
                ) !== -1
        );

    }


    /* =========================================================
       PORTADA Y AVATAR
    ========================================================= */

    function prepararImagen(
        inputId,
        claveStorage,
        maxMB,
        nombreCampo
    ) {

        var input =
            document.getElementById(
                inputId
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "change",
            function () {

                if (
                    !this.files ||
                    !this.files[0]
                ) {

                    return;

                }


                var archivo =
                    this.files[0];


                if (
                    !formatoImagenValido(
                        archivo
                    )
                ) {

                    alert(
                        nombreCampo +
                        " debe estar en formato JPG, PNG o WebP."
                    );

                    this.value = "";

                    localStorage.removeItem(
                        claveStorage
                    );

                    return;

                }


                var pesoMaximo =
                    maxMB *
                    1024 *
                    1024;


                if (
                    archivo.size >
                    pesoMaximo
                ) {

                    alert(
                        nombreCampo +
                        " supera el peso máximo permitido.\n\n" +
                        "Peso máximo: " +
                        maxMB +
                        " MB."
                    );

                    this.value = "";

                    localStorage.removeItem(
                        claveStorage
                    );

                    return;

                }


                var lector =
                    new FileReader();


                lector.onload =
                    function (evento) {

                        try {

                            localStorage.setItem(
                                claveStorage,
                                evento.target.result
                            );

                        }

                        catch (error) {

                            alert(
                                "No hay suficiente espacio para guardar " +
                                nombreCampo.toLowerCase() +
                                ". Usa una imagen más ligera."
                            );

                        }

                    };


                lector.readAsDataURL(
                    archivo
                );

            }
        );

    }


    prepararImagen(
        "perfil-portada",
        "nexoPortadaTemporal",
        1.5,
        "La foto de portada"
    );


    prepararImagen(
        "perfil-avatar",
        "nexoAvatarTemporal",
        1,
        "La foto de perfil o logotipo"
    );


    /* =========================================================
       GALERÍA
    ========================================================= */

    var inputGaleria =
        document.getElementById(
            "perfil-galeria"
        );


    function optimizarImagenGaleria(
        archivo,
        callback
    ) {

        var lector =
            new FileReader();


        lector.onload =
            function (evento) {

                var imagen =
                    new Image();


                imagen.onload =
                    function () {

                        var anchoMaximo =
                            1200;

                        var ancho =
                            imagen.width;

                        var alto =
                            imagen.height;


                        if (
                            ancho >
                            anchoMaximo
                        ) {

                            alto =
                                Math.round(
                                    alto *
                                    (
                                        anchoMaximo /
                                        ancho
                                    )
                                );

                            ancho =
                                anchoMaximo;

                        }


                        var canvas =
                            document.createElement(
                                "canvas"
                            );


                        canvas.width =
                            ancho;

                        canvas.height =
                            alto;


                        var contexto =
                            canvas.getContext(
                                "2d"
                            );


                        contexto.drawImage(
                            imagen,
                            0,
                            0,
                            ancho,
                            alto
                        );


                        var imagenOptimizada =
                            canvas.toDataURL(
                                "image/jpeg",
                                0.72
                            );


                        callback(
                            imagenOptimizada
                        );

                    };


                imagen.src =
                    evento.target.result;

            };


        lector.readAsDataURL(
            archivo
        );

    }


    if (inputGaleria) {

        inputGaleria.addEventListener(
            "change",
            function () {

                if (!this.files) {
                    return;
                }


                var archivos =
                    this.files;


                if (
                    archivos.length > 6
                ) {

                    alert(
                        "Puedes seleccionar un máximo de 6 fotografías."
                    );

                    this.value = "";

                    localStorage.removeItem(
                        "nexoGaleriaTemporal"
                    );

                    return;

                }


                var i;


                for (
                    i = 0;
                    i < archivos.length;
                    i++
                ) {

                    var archivo =
                        archivos[i];


                    if (
                        !formatoImagenValido(
                            archivo
                        )
                    ) {

                        alert(
                            "La imagen \"" +
                            archivo.name +
                            "\" debe ser JPG, PNG o WebP."
                        );

                        this.value = "";

                        localStorage.removeItem(
                            "nexoGaleriaTemporal"
                        );

                        return;

                    }


                    if (
                        archivo.size >
                        1 * 1024 * 1024
                    ) {

                        alert(
                            "La imagen \"" +
                            archivo.name +
                            "\" supera 1 MB."
                        );

                        this.value = "";

                        localStorage.removeItem(
                            "nexoGaleriaTemporal"
                        );

                        return;

                    }

                }


                if (
                    archivos.length === 0
                ) {

                    localStorage.removeItem(
                        "nexoGaleriaTemporal"
                    );

                    return;

                }


                var imagenesGuardadas = [];

                var procesadas = 0;


                for (
                    i = 0;
                    i < archivos.length;
                    i++
                ) {

                    optimizarImagenGaleria(
                        archivos[i],
                        function (
                            imagenOptimizada
                        ) {

                            imagenesGuardadas
                                .push(
                                    imagenOptimizada
                                );

                            procesadas++;


                            if (
                                procesadas ===
                                archivos.length
                            ) {

                                try {

                                    localStorage.setItem(
                                        "nexoGaleriaTemporal",
                                        JSON.stringify(
                                            imagenesGuardadas
                                        )
                                    );

                                }

                                catch (error) {

                                    alert(
                                        "No fue posible guardar toda la galería. Usa menos fotografías o imágenes más ligeras."
                                    );

                                }

                            }

                        }
                    );

                }

            }
        );

    }


    /* =========================================================
       RESUMEN DEL PERFIL
    ========================================================= */

    function actualizarResumenPerfil() {
        if (esArtista) { actualizarVistaArtista(); return; }

        var nombre =
            document.getElementById(
                "perfil-nombre"
            );

        var ciudad =
            document.getElementById(
                "perfil-ciudad"
            );

        var servicio =
            document.getElementById(
                "servicio-nombre"
            );

        var precio =
            document.getElementById(
                "servicio-precio"
            );

        var experiencia =
            document.getElementById(
                "perfil-experiencia"
            );

        var cobertura =
            document.querySelector(
                'input[name="cobertura"]:checked'
            );


        var resumenNombre =
            document.getElementById(
                "resumen-nombre"
            );

        var resumenCiudad =
            document.getElementById(
                "resumen-ciudad"
            );

        var resumenCobertura =
            document.getElementById(
                "resumen-cobertura"
            );

        var resumenServicio =
            document.getElementById(
                "resumen-servicio"
            );

        var resumenPrecio =
            document.getElementById(
                "resumen-precio"
            );

        var resumenExperiencia =
            document.getElementById(
                "resumen-experiencia"
            );


        if (resumenNombre) {

            resumenNombre.textContent =
                (
                    nombre &&
                    nombre.value.trim() !== ""
                )
                    ? nombre.value.trim()
                    : "—";

        }


        if (resumenCiudad) {

            resumenCiudad.textContent =
                (
                    ciudad &&
                    ciudad.value.trim() !== ""
                )
                    ? ciudad.value.trim()
                    : "—";

        }


        if (resumenServicio) {

            resumenServicio.textContent =
                (
                    servicio &&
                    servicio.value.trim() !== ""
                )
                    ? servicio.value.trim()
                    : "—";

        }


        if (resumenPrecio) {

            if (
                precio &&
                precio.value !== ""
            ) {

                resumenPrecio.textContent =
                    "$" +
                    Number(
                        precio.value
                    ).toLocaleString(
                        "es-MX"
                    ) +
                    " MXN";

            }

            else {

                resumenPrecio.textContent =
                    "—";

            }

        }


        if (resumenExperiencia) {

            resumenExperiencia.textContent =
                (
                    experiencia &&
                    experiencia.value !== ""
                )
                    ? experiencia.value +
                        " años"
                    : "—";

        }


        if (resumenCobertura) {

            if (cobertura) {

                if (
                    cobertura.value ===
                    "otro"
                ) {

                    resumenCobertura
                        .textContent =
                        (
                            perfilOtraCobertura &&
                            perfilOtraCobertura
                                .value
                                .trim() !== ""
                        )
                            ? perfilOtraCobertura
                                .value
                                .trim()
                            : "Otro";

                }

                else {

                    var texto =
                        cobertura
                            .nextElementSibling;


                    resumenCobertura
                        .textContent =
                        texto
                            ? texto
                                .textContent
                                .trim()
                            : "—";

                }

            }

            else {

                resumenCobertura.textContent =
                    "—";

            }

        }

    }


    /* =========================================================
       PUBLICAR PERFIL
    ========================================================= */

    var botonPublicar =
        document.getElementById(
            "publicar-perfil"
        );


    if (botonPublicar) {

        botonPublicar.addEventListener(
            "click",
            function () {

                for (var pasoValidar = 0; pasoValidar < 4; pasoValidar++) {
                    if (!validarPasoPerfil(pasoValidar)) {
                        perfilPasoActual = pasoValidar;
                        mostrarPasoPerfil(pasoValidar);
                        return;
                    }
                }
                var confirmacion =
                    document.getElementById(
                        "aceptar-publicacion"
                    );


                if (
                    !confirmacion ||
                    !confirmacion.checked
                ) {

                    alert(
                        "Confirma que la información proporcionada es correcta."
                    );

                    return;

                }


                var perfilNombre =
                    document.getElementById(
                        "perfil-nombre"
                    );

                var perfilCiudad =
                    document.getElementById(
                        "perfil-ciudad"
                    );

                var perfilDescripcion =
                    document.getElementById(
                        "perfil-descripcion"
                    );


                var coberturaSeleccionada =
                    document.querySelector(
                        'input[name="cobertura"]:checked'
                    );

                var coberturaTexto = "";


                if (coberturaSeleccionada) {

                    if (
                        coberturaSeleccionada
                            .value ===
                        "otro"
                    ) {

                        coberturaTexto =
                            (
                                perfilOtraCobertura &&
                                perfilOtraCobertura
                                    .value
                                    .trim() !== ""
                            )
                                ? perfilOtraCobertura
                                    .value
                                    .trim()
                                : "Otro";

                    }

                    else {

                        var coberturaSpan =
                            coberturaSeleccionada
                                .nextElementSibling;


                        coberturaTexto =
                            coberturaSpan
                                ? coberturaSpan
                                    .textContent
                                    .trim()
                                : "";

                    }

                }


                var servicioNombre =
                    document.getElementById(
                        "servicio-nombre"
                    );

                var servicioPrecio =
                    document.getElementById(
                        "servicio-precio"
                    );

                var modalidadPrecio =
                    document.getElementById(
                        "servicio-modalidad-precio"
                    );

                var servicioDuracion =
                    document.getElementById(
                        "servicio-duracion"
                    );

                var servicioAnticipacion =
                    document.getElementById(
                        "servicio-anticipacion"
                    );

                var servicioIncluye =
                    document.getElementById(
                        "servicio-incluye"
                    );

                var servicioViaja =
                    document.querySelector(
                        'input[name="servicio-viaja"]:checked'
                    );


                var experiencia =
                    document.getElementById(
                        "perfil-experiencia"
                    );

                var personasEquipo =
                    document.getElementById(
                        "perfil-equipo-personas"
                    );

                var clientes =
                    document.getElementById(
                        "perfil-clientes"
                    );

                var video =
                    document.getElementById(
                        "perfil-video"
                    );


                var instagram =
                    document.getElementById(
                        "perfil-instagram"
                    );

                var tiktok =
                    document.getElementById(
                        "perfil-tiktok"
                    );

                var youtube =
                    document.getElementById(
                        "perfil-youtube"
                    );

                var spotify =
                    document.getElementById(
                        "perfil-spotify"
                    );

                var facebook =
                    document.getElementById(
                        "perfil-facebook"
                    );

                var sitioWeb =
                    document.getElementById(
                        "perfil-web"
                    );


                var disponibilidadSeleccionada =
                    document.querySelectorAll(
                        'input[name="disponibilidad"]:checked'
                    );

                var disponibilidad = [];

                var iDisponibilidad;


                for (
                    iDisponibilidad = 0;
                    iDisponibilidad <
                    disponibilidadSeleccionada.length;
                    iDisponibilidad++
                ) {

                    disponibilidad.push(
                        disponibilidadSeleccionada[
                            iDisponibilidad
                        ].value
                    );

                }


                var datosRegistro = {};


                try {

                    var registroGuardado =
                        localStorage.getItem(
                            "nexoProveedor"
                        );


                    if (registroGuardado) {

                        datosRegistro =
                            JSON.parse(
                                registroGuardado
                            );

                    }

                }

                catch (error) {

                    datosRegistro = {};

                }


                var portadaGuardada =
                    localStorage.getItem(
                        "nexoPortadaTemporal"
                    ) || "";

                var avatarGuardado =
                    localStorage.getItem(
                        "nexoAvatarTemporal"
                    ) || "";

                var galeriaGuardada = [];


                try {

                    galeriaGuardada =
                        JSON.parse(
                            localStorage.getItem(
                                "nexoGaleriaTemporal"
                            ) || "[]"
                        );

                }

                catch (error) {

                    galeriaGuardada = [];

                }


                var perfilPublicado = {

                    portada:
                        portadaGuardada,

                    avatar:
                        avatarGuardado,
                    tipoCuenta: datosRegistro.tipoCuenta || "proveedor",
                    tipo: datosRegistro.tipo || "",
                    categoria: datosRegistro.categoria || datosRegistro.tipo || "",
                    subcategorias: datosRegistro.subcategorias || [],
                    generos: datosRegistro.generos || [],
                    decadas: datosRegistro.decadas || [],

                    nombre:
                        perfilNombre
                            ? perfilNombre
                                .value
                                .trim()
                            : "",

                    ciudad:
                        perfilCiudad
                            ? perfilCiudad
                                .value
                                .trim()
                            : "",

                    descripcion:
                        perfilDescripcion
                            ? perfilDescripcion
                                .value
                                .trim()
                            : "",

                    cobertura:
                        coberturaTexto,

                    video:
                        video
                            ? video
                                .value
                                .trim()
                            : "",

                    servicio: {

                        nombre:
                            servicioNombre
                                ? servicioNombre
                                    .value
                                    .trim()
                                : "",

                        precio:
                            servicioPrecio
                                ? servicioPrecio
                                    .value
                                : "",

                        modalidad:
                            modalidadPrecio
                                ? modalidadPrecio
                                    .value
                                : "",

                        duracion:
                            servicioDuracion
                                ? servicioDuracion
                                    .value
                                    .trim()
                                : "",

                        anticipacion:
                            servicioAnticipacion
                                ? servicioAnticipacion
                                    .value
                                : "",

                        incluye:
                            servicioIncluye
                                ? servicioIncluye
                                    .value
                                    .trim()
                                : "",

                        viaja:
                            servicioViaja
                                ? servicioViaja
                                    .value
                                : ""

                    },

                    experiencia:
                        experiencia
                            ? experiencia.value
                            : "",

                    personasEquipo:
                        personasEquipo
                            ? personasEquipo.value
                            : "",

                    experienciaDestacada:
                        clientes
                            ? clientes
                                .value
                                .trim()
                            : "",

                    disponibilidad:
                        disponibilidad,

                    redes: {

                        instagram:
                            instagram
                                ? instagram
                                    .value
                                    .trim()
                                : "",

                        tiktok:
                            tiktok
                                ? tiktok
                                    .value
                                    .trim()
                                : "",

                        youtube:
                            youtube
                                ? youtube
                                    .value
                                    .trim()
                                : "",

                        spotify:
                            spotify
                                ? spotify
                                    .value
                                    .trim()
                                : "",

                        facebook:
                            facebook
                                ? facebook
                                    .value
                                    .trim()
                                : "",

                        web:
                            sitioWeb
                                ? sitioWeb
                                    .value
                                    .trim()
                                : ""

                    },

                    contacto: {

                        nombre:
                            datosRegistro.contacto ||
                            "",

                        correo:
                            datosRegistro.correo ||
                            "",

                        telefono:
                            datosRegistro.telefono ||
                            ""

                    }

                };


                if (esArtista) {
                    perfilPublicado.estadoBase = valor('perfil-ciudad');
                    perfilPublicado.disponibilidadDias = Array.from(document.querySelectorAll('input[name=disponibilidad-dia]:checked'), el => el.value);
                    if (valorDisponibilidad() !== 'dias-especificos') perfilPublicado.disponibilidadDias = [];
                    delete perfilPublicado.servicio.anticipacion;
                }
                perfilPublicado.galeria = galeriaGuardada;
                perfilPublicado.tipoCuenta = tipoCuentaPerfil;
                var datosInternos = {
                    tarifaBase: esArtista ? precioNumerico() : perfilPublicado.servicio.precio,
                    modalidadTarifa: perfilPublicado.servicio.modalidad
                };
                delete perfilPublicado.servicio.precio;
                delete perfilPublicado.servicio.modalidad;
                perfilPublicado.pressKit = esArtista ? fichaPDF('perfil-press-kit') : null;
                // Separación de datos para la demo; NO es un mecanismo de seguridad.
                try {

                   var solicitudRevision = {
    ...perfilPublicado,
    datosInternos: datosInternos,
    demostracionLocal: true,
    estado: "pendiente_revision",
    fechaEnvio: new Date().toISOString(),
    plazoRevisionHoras: null
};

localStorage.setItem(
    "nexoPerfilPendiente",
    JSON.stringify(solicitudRevision)
);
                }

                catch (error) {

                    alert(
                        "No se pudo guardar el perfil. Las imágenes pueden estar ocupando demasiado espacio. Usa menos fotografías o archivos más ligeros."
                    );

                    return;

                }


                window.location.href =
    "perfil-en-revision.html";

            }
        );

    }


    /* =========================================================
       INICIAR
    ========================================================= */

    if (perfilPasos.length > 0) {

        mostrarPasoPerfil(0);

    }

});