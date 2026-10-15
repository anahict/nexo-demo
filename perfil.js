document.addEventListener("DOMContentLoaded", function () {

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
        "Servicios y precios",
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
            if (!exigir(!!valor('perfil-ciudad'), 'Escribe tu ciudad base.', 'perfil-ciudad')) return false;
            if (!exigir(valor('perfil-descripcion').length >= 30, 'Escribe una descripción de al menos 30 caracteres.', 'perfil-descripcion')) return false;
            const cobertura = document.querySelector('input[name="cobertura"]:checked');
            if (!exigir(!!cobertura, 'Selecciona tu zona de cobertura.')) return false;
            if (cobertura.value === 'otro' && !exigir(!!valor('otra-cobertura'), 'Escribe tu zona de cobertura.', 'otra-cobertura')) return false;
        }
        if (indice === 1) {
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
            if (!exigir(valor('servicio-precio') !== '' && Number(valor('servicio-precio')) >= 0, 'Indica un precio válido desde 0 MXN.', 'servicio-precio')) return false;
            if (!exigir(!!valor('servicio-modalidad-precio'), 'Selecciona cómo se cotiza.', 'servicio-modalidad-precio')) return false;
            if (!exigir(!!valor('servicio-incluye'), 'Explica qué incluye tu servicio.', 'servicio-incluye')) return false;
            if (!exigir(!!document.querySelector('input[name="servicio-viaja"]:checked'), 'Indica si puedes viajar para realizar eventos.')) return false;
        }
        if (indice === 3) {
            if (!exigir(valor('perfil-experiencia') !== '' && Number(valor('perfil-experiencia')) >= 0, 'Indica tus años de experiencia.', 'perfil-experiencia')) return false;
            if (!exigir(valor('perfil-equipo-personas') !== '' && Number(valor('perfil-equipo-personas')) >= 1, 'Indica cuántas personas integran tu equipo (mínimo 1).', 'perfil-equipo-personas')) return false;
            if (!exigir(!!document.querySelector('input[name="disponibilidad"]:checked'), 'Selecciona al menos una opción de disponibilidad.')) return false;
            const rider = document.getElementById('perfil-rider');
            if (rider && rider.files.length && !exigir(rider.files[0].type === 'application/pdf' && rider.files[0].size <= 5 * 1024 * 1024, 'El rider debe ser PDF de máximo 5 MB.', 'perfil-rider')) return false;
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

                var necesidades =
                    document.getElementById(
                        "perfil-necesidades"
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

                    requerimientos:
                        necesidades
                            ? necesidades
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


                try {

                   var solicitudRevision = {
    ...perfilPublicado,
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