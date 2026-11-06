document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =========================================================
           OBTENER PERFIL PUBLICADO
        ========================================================= */

        var datos = null;

        try {

            var guardado =
                localStorage.getItem(
                    "nexoPerfilPublicado"
                );

            if (guardado) {

                datos =
                    JSON.parse(
                        guardado
                    );

            }

        }

        catch (error) {

            datos = null;

        }


        if (!datos || datos.estado !== "aprobado") {

    var perfilPendiente =
        localStorage.getItem("nexoPerfilPendiente");

    if (perfilPendiente) {

        window.location.replace(
            "perfil-en-revision.html"
        );

    } else {

        alert(
            "Este perfil todavía no está disponible públicamente."
        );

        window.location.replace(
            "registro.html"
        );

    }

    return;
}


        /* =========================================================
           FUNCIÓN PARA ESCRIBIR DATOS
        ========================================================= */

        function escribir(
            id,
            valor,
            vacio
        ) {

            var elemento =
                document.getElementById(
                    id
                );

            if (!elemento) {
                return;
            }


            if (
                valor !== undefined &&
                valor !== null &&
                String(valor).trim() !== ""
            ) {

                elemento.textContent =
                    valor;

            }

            else {

                elemento.textContent =
                    vacio || "—";

            }

        }


        /* =========================================================
           PORTADA
        ========================================================= */

        var heroPublico =
            document.getElementById(
                "perfil-publico-hero"
            );


        if (
            heroPublico &&
            datos.portada
        ) {

            heroPublico.style.backgroundImage =
                "linear-gradient(" +
                "90deg," +
                "rgba(15,15,16,0.94) 0%," +
                "rgba(15,15,16,0.72) 48%," +
                "rgba(15,15,16,0.38) 100%" +
                ")," +
                "url('" +
                datos.portada +
                "')";

        }


        /* =========================================================
           AVATAR / LOGO
        ========================================================= */

        var avatarPublico =
            document.getElementById(
                "publico-avatar"
            );

        var contenedorAvatar =
            document.getElementById(
                "contenedor-avatar-publico"
            );


        if (
            avatarPublico &&
            datos.avatar
        ) {

            avatarPublico.src =
                datos.avatar;

        }

        else if (contenedorAvatar) {

            contenedorAvatar.style.display =
                "none";

        }


        /* =========================================================
           INFORMACIÓN GENERAL
        ========================================================= */

        escribir(
            "publico-nombre",
            datos.nombre,
            "Nombre no especificado"
        );


        escribir(
            "publico-categoria",
            datos.categoria
                ? datos.categoria.toUpperCase()
                : "PROVEEDOR"
        );


        escribir(
            "publico-descripcion",
            datos.descripcion,
            "Sin descripción."
        );


        escribir(
            "publico-ciudad",
            datos.ciudad,
            "Ciudad no especificada"
        );


        escribir(
            "publico-cobertura",
            datos.cobertura,
            "Cobertura no especificada"
        );


        /* =========================================================
           SERVICIO
        ========================================================= */

        if (datos.servicio) {

            escribir(
                "publico-servicio",
                datos.servicio.nombre
            );


            if (
                datos.servicio.precio !== undefined &&
                datos.servicio.precio !== null &&
                datos.servicio.precio !== ""
            ) {

                escribir(
                    "publico-precio",
                    "$" +
                    Number(
                        datos.servicio.precio
                    ).toLocaleString(
                        "es-MX"
                    ) +
                    " MXN"
                );

            }

            else {

                escribir(
                    "publico-precio",
                    ""
                );

            }


            /* MODALIDAD */

            var modalidadTexto = "";

            if (
                datos.servicio.modalidad ===
                "evento"
            ) {

                modalidadTexto =
                    "Por evento";

            }

            else if (
                datos.servicio.modalidad ===
                "hora"
            ) {

                modalidadTexto =
                    "Por hora";

            }

            else if (
                datos.servicio.modalidad ===
                "dia"
            ) {

                modalidadTexto =
                    "Por día";

            }

            else if (
                datos.servicio.modalidad ===
                "persona"
            ) {

                modalidadTexto =
                    "Por persona";

            }

            else if (
                datos.servicio.modalidad ===
                "paquete"
            ) {

                modalidadTexto =
                    "Por paquete";

            }

            else if (
                datos.servicio.modalidad ===
                "cotizacion"
            ) {

                modalidadTexto =
                    "Cotización personalizada";

            }

            else {

                modalidadTexto =
                    datos.servicio.modalidad;

            }


            escribir(
                "publico-modalidad",
                modalidadTexto
            );


            escribir(
                "publico-duracion",
                datos.servicio.duracion
            );


            /* ANTICIPACIÓN */

            var anticipacionTexto = "";

            if (
                datos.servicio.anticipacion ===
                "1-semana"
            ) {

                anticipacionTexto =
                    "1 semana";

            }

            else if (
                datos.servicio.anticipacion ===
                "2-semanas"
            ) {

                anticipacionTexto =
                    "2 semanas";

            }

            else if (
                datos.servicio.anticipacion ===
                "1-mes"
            ) {

                anticipacionTexto =
                    "1 mes";

            }

            else if (
                datos.servicio.anticipacion ===
                "2-meses"
            ) {

                anticipacionTexto =
                    "2 meses";

            }

            else if (
                datos.servicio.anticipacion ===
                "3-meses"
            ) {

                anticipacionTexto =
                    "3 meses o más";

            }

            else {

                anticipacionTexto =
                    datos.servicio.anticipacion;

            }


            escribir(
                "publico-anticipacion",
                anticipacionTexto
            );


            escribir(
                "publico-incluye",
                datos.servicio.incluye
            );


            /* VIAJES */

            var viajaTexto = "";

            if (
                datos.servicio.viaja ===
                "si"
            ) {

                viajaTexto = "Sí";

            }

            else if (
                datos.servicio.viaja ===
                "no"
            ) {

                viajaTexto = "No";

            }

            else if (
                datos.servicio.viaja ===
                "depende"
            ) {

                viajaTexto =
                    "Depende del evento";

            }

            else {

                viajaTexto =
                    datos.servicio.viaja;

            }


            escribir(
                "publico-viaja",
                viajaTexto
            );

        }


        /* =========================================================
           INFORMACIÓN PROFESIONAL
        ========================================================= */

        if (
            datos.experiencia !== undefined &&
            datos.experiencia !== null &&
            datos.experiencia !== ""
        ) {

            escribir(
                "publico-experiencia",
                datos.experiencia +
                " años"
            );

        }

        else {

            escribir(
                "publico-experiencia",
                ""
            );

        }


        if (
            datos.personasEquipo !== undefined &&
            datos.personasEquipo !== null &&
            datos.personasEquipo !== ""
        ) {

            escribir(
                "publico-equipo",
                datos.personasEquipo +
                (
                    Number(
                        datos.personasEquipo
                    ) === 1
                        ? " persona"
                        : " personas"
                )
            );

        }

        else {

            escribir(
                "publico-equipo",
                ""
            );

        }


        escribir(
            "publico-experiencia-destacada",
            datos.experienciaDestacada
        );


        escribir(
            "publico-requerimientos",
            datos.requerimientos
        );


		/* =========================================================
   GALERÍA
========================================================= */

var contenedorGaleria =
    document.getElementById(
        "publico-galeria"
    );

var seccionGaleria =
    document.getElementById(
        "seccion-galeria-publica"
    );


var galeriaPublica = [];

try {

    galeriaPublica =
        JSON.parse(
            localStorage.getItem(
                "nexoGaleriaTemporal"
            ) || "[]"
        );

}

catch (error) {

    galeriaPublica = [];

}


if (
    contenedorGaleria &&
    galeriaPublica.length > 0
) {

    var g;


    for (
        g = 0;
        g < galeriaPublica.length;
        g++
    ) {

        var foto =
            document.createElement(
                "div"
            );


        foto.className =
            "perfil-galeria-item";


        var imagen =
            document.createElement(
                "img"
            );


 imagen.src =
    galeriaPublica[g];

        imagen.alt =
            "Fotografía de " +
            (
                datos.nombre ||
                "proveedor"
            );


        foto.appendChild(
            imagen
        );


        contenedorGaleria
            .appendChild(
                foto
            );

    }

}

else if (seccionGaleria) {

    seccionGaleria.style.display =
        "none";

}
		
        /* =========================================================
           DISPONIBILIDAD
        ========================================================= */

        var contenedorDisponibilidad =
            document.getElementById(
                "publico-disponibilidad"
            );


        if (contenedorDisponibilidad) {

            contenedorDisponibilidad
                .innerHTML = "";


            if (
                datos.disponibilidad &&
                datos.disponibilidad.length > 0
            ) {

                var i;


                for (
                    i = 0;
                    i <
                    datos.disponibilidad.length;
                    i++
                ) {

                    var tag =
                        document.createElement(
                            "span"
                        );


                    var disponibilidadTexto =
                        datos.disponibilidad[i];


                    if (
                        disponibilidadTexto ===
                        "entre-semana"
                    ) {

                        disponibilidadTexto =
                            "Entre semana";

                    }

                    else if (
                        disponibilidadTexto ===
                        "viernes"
                    ) {

                        disponibilidadTexto =
                            "Viernes";

                    }

                    else if (
                        disponibilidadTexto ===
                        "sabado"
                    ) {

                        disponibilidadTexto =
                            "Sábado";

                    }

                    else if (
                        disponibilidadTexto ===
                        "domingo"
                    ) {

                        disponibilidadTexto =
                            "Domingo";

                    }

                    else if (
                        disponibilidadTexto ===
                        "consultar"
                    ) {

                        disponibilidadTexto =
                            "Consultar disponibilidad";

                    }


                    tag.textContent =
                        disponibilidadTexto;


                    contenedorDisponibilidad
                        .appendChild(
                            tag
                        );

                }

            }

            else {

                var sinDisponibilidad =
                    document.createElement(
                        "span"
                    );

                sinDisponibilidad.textContent =
                    "Consultar disponibilidad";

                contenedorDisponibilidad
                    .appendChild(
                        sinDisponibilidad
                    );

            }

        }


        /* =========================================================
           REDES
        ========================================================= */

        var contenedorRedes =
            document.getElementById(
                "publico-redes"
            );


        if (
            contenedorRedes &&
            datos.redes
        ) {

            contenedorRedes.innerHTML =
                "";


            var redes = [

                [
                    "Instagram",
                    datos.redes.instagram
                ],

                [
                    "TikTok",
                    datos.redes.tiktok
                ],

                [
                    "YouTube",
                    datos.redes.youtube
                ],

                [
                    "Spotify",
                    datos.redes.spotify
                ],

                [
                    "Facebook",
                    datos.redes.facebook
                ],

                [
                    "Sitio web",
                    datos.redes.web
                ]

            ];


            var r;


            for (
                r = 0;
                r < redes.length;
                r++
            ) {

                if (
                    redes[r][1] &&
                    String(
                        redes[r][1]
                    ).trim() !== ""
                ) {

                    var enlace =
                        document.createElement(
                            "a"
                        );


                    enlace.href =
                        redes[r][1];

                    enlace.target =
                        "_blank";

                    enlace.rel =
                        "noopener noreferrer";

                    enlace.textContent =
                        redes[r][0];


                    contenedorRedes
                        .appendChild(
                            enlace
                        );

                }

            }

        }


        /* =========================================================
           PROVEEDORES SIMILARES
        ========================================================= */

        var proveedoresSimilares = [

            {
                nombre:
                    "Trendline",

                categoria:
                    "Banda",

                descripcion:
                    "Música en vivo y covers para eventos.",

                ciudad:
                    "CDMX",

                precio:
                    18000
            },

            {
                nombre:
                    "Two Souls",

                categoria:
                    "Cantante",

                descripcion:
                    "Dúo vocal para bodas y eventos especiales.",

                ciudad:
                    "CDMX",

                precio:
                    12000
            },

            {
                nombre:
                    "Mr. Loxley",

                categoria:
                    "DJ",

                descripcion:
                    "DJ y experiencia musical para eventos.",

                ciudad:
                    "CDMX",

                precio:
                    15000
            },

            {
                nombre:
                    "Tr3mens",

                categoria:
                    "Ensamble",

                descripcion:
                    "Trío instrumental para eventos sociales y corporativos.",

                ciudad:
                    "CDMX",

                precio:
                    14000
            },

            {
                nombre:
                    "Percy",

                categoria:
                    "Cantante",

                descripcion:
                    "Show vocal para fiestas y eventos privados.",

                ciudad:
                    "CDMX",

                precio:
                    11000
            },

            {
                nombre:
                    "Andreas Zanetti",

                categoria:
                    "Entretenimiento",

                descripcion:
                    "Piano, comedia y entretenimiento para eventos.",

                ciudad:
                    "CDMX",

                precio:
                    20000
            }

        ];


        var contenedorSimilares =
            document.getElementById(
                "perfil-similares-grid"
            );


        if (contenedorSimilares) {

            contenedorSimilares.innerHTML =
                "";


            var s;


            for (
                s = 0;
                s <
                proveedoresSimilares.length;
                s++
            ) {

                var proveedor =
                    proveedoresSimilares[s];


                var tarjeta =
                    document.createElement(
                        "article"
                    );


                tarjeta.className =
                    "perfil-similar-card";


                tarjeta.innerHTML =

                    '<div class="perfil-similar-imagen">' +

                    '<div class="perfil-similar-placeholder">' +

                    proveedor.nombre
                        .charAt(0)
                        .toUpperCase() +

                    '</div>' +

                    '</div>' +

                    '<div class="perfil-similar-info">' +

                    '<span class="perfil-similar-categoria">' +

                    proveedor.categoria +

                    '</span>' +

                    '<h3>' +

                    proveedor.nombre +

                    '</h3>' +

                    '<p>' +

                    proveedor.descripcion +

                    '</p>' +

                    '<div class="perfil-similar-meta">' +

                    '<span>' +

                    proveedor.ciudad +

                    '</span>' +

                    '<strong>' +

                    'Desde $' +

                    Number(
                        proveedor.precio
                    ).toLocaleString(
                        "es-MX"
                    ) +

                    ' MXN' +

                    '</strong>' +

                    '</div>' +

                    '<button type="button" class="perfil-similar-ver">' +

                    'Ver perfil →' +

                    '</button>' +

                    '</div>';


                contenedorSimilares
                    .appendChild(
                        tarjeta
                    );

            }

        }

    }
);