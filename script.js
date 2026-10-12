"use strict";

/* CACHE-BUSTER: 2026-10-10-1900 */
const HM_JS_VERSION = "16.1";


const paginas = {

    1: "pagina_1.png",
    2: "pagina_2.png",
    3: "pagina_3.png",
    4: "pagina_4.png",
    5: "pagina_5.png",
    6: "pagina_6.png",
    7: "pagina_7.png",
    8: "pagina_8.png",
    9: "pagina_9.png",
    10: "pagina_10.png"

};



/* ==================================================
   VIDEOS COMPLEMENTARIOS
   ================================================== */

const videosComplementarios = {

    1: "https://youtu.be/PkNDkUbAATU?si=BG3NB_5aOFggDn3Y",
    2: "https://youtu.be/I95gS70vAPg?si=BnhaDzNyJ397-6Y5",
    3: "https://youtu.be/3TgsyUGaGmo?si=pEEJblCUj0GJcZHQ",
    4: "https://youtu.be/RM6gJD6T2hs?si=4RiDAidkcyIAk7CA",
    5: "https://youtu.be/NjUCNCCuooY?si=6tCWzhaVfM_oMrGY",
    6: "https://youtu.be/fCXe7nWPwnI?si=okpMxERks_rMO3aL",
    7: "https://youtu.be/SS5NcxjVFDg?si=AUSJN6uAlNPGoNqX",
    8: "https://youtu.be/3XH0yOdORYQ?si=B9URc73_TJDXAZxj",
    9: "https://youtu.be/jdDYxj2rlzU?si=tW2fi_ssXeQ3wukB"

};



const subtitulosVideos = {

    7: "Cuerpo de la app (HTML/JS y CSS)",
    8: "Ejemplos personales de Promos",
    9: "Estructura para realizar juegos estilo retros."

};



let paginaActual = 1;



/* ==================================================
   SUPABASE
   ================================================== */

const SUPABASE_URL =
    "https://zjviadsqbhqdjyomaoct.supabase.co";


/* REEMPLAZA ESTA CLAVE POR TU ANON/PUBLISHABLE KEY REAL DE SUPABASE (LA QUE COMIENZA CON "eyJ...") */
const SUPABASE_PUBLISHABLE_KEY =
    "TU_ANON_KEY_REAL_DE_SUPABASE_AQUI";


const SUPABASE_FUNCTION_PAGO =
    "crear-pago";


let supabaseClient =
    null;


let supabaseLibraryPromise =
    null;


function cargarLibreriaSupabase() {

    if (
        window.supabase &&
        typeof window.supabase.createClient === "function"
    ) {

        return Promise.resolve();

    }


    if (
        supabaseLibraryPromise
    ) {

        return supabaseLibraryPromise;

    }


    supabaseLibraryPromise =
        new Promise(
            function(resolve, reject) {

                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


                script.async =
                    true;


                script.onload =
                    function() {

                        if (
                            window.supabase &&
                            typeof window.supabase.createClient === "function"
                        ) {

                            resolve();

                            return;

                        }


                        reject(
                            new Error(
                                "No se pudo cargar Supabase."
                            )
                        );

                    };


                script.onerror =
                    function() {

                        reject(
                            new Error(
                                "No se pudo cargar la librería de Supabase."
                            )
                        );

                    };


                document.head.appendChild(
                    script
                );

            }
        );


    return supabaseLibraryPromise;

}



async function obtenerSupabaseClient() {

    if (
        supabaseClient
    ) {

        return supabaseClient;

    }


    await cargarLibreriaSupabase();


    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true
                }
            }
        );


    return supabaseClient;

}



/* ==================================================
   PANTALLA PREVIA DE ACCESO
   ================================================== */

const pantallaAcceso =
    document.getElementById(
        "pantallaAcceso"
    );


const contenidoPrincipal =
    document.getElementById(
        "contenidoPrincipal"
    );


const botonYaAcceso =
    document.getElementById(
        "botonYaAcceso"
    );


const botonNoAcceso =
    document.getElementById(
        "botonNoAcceso"
    );


const panelIngreso =
    document.getElementById(
        "panelIngreso"
    );


const botonConfirmarIngreso =
    document.getElementById(
        "botonConfirmarIngreso"
    );


const botonCerrarIngreso =
    document.getElementById(
        "botonCerrarIngreso"
    );


const mensajeIngreso =
    document.getElementById(
        "mensajeIngreso"
    );


const usuarioAcceso =
    document.getElementById(
        "usuarioAcceso"
    );


const claveAcceso =
    document.getElementById(
        "claveAcceso"
    );


let botonCrearCuenta =
    null;


let modoPanelIngreso =
    "ingreso";



/* ==================================================
   MODO DE DESARROLLO
   ================================================== */

const MODO_DESARROLLO = false;



function mostrarContenidoPrincipal() {

    if (
        contenidoPrincipal
    ) {

        contenidoPrincipal.style.display =
            "block";

    }


    if (
        pantallaAcceso
    ) {

        pantallaAcceso.style.display =
            "none";

    }


    document.body.style.overflow =
        "";

}



function ocultarContenidoPrincipal() {

    if (
        contenidoPrincipal
    ) {

        contenidoPrincipal.style.display =
            "none";

    }


    if (
        pantallaAcceso
    ) {

        pantallaAcceso.style.display =
            "";

    }

}



function prepararBotonCrearCuenta() {

    if (
        botonCrearCuenta
    ) {

        return;

    }


    const contenedor =
        panelIngreso
            ? panelIngreso.querySelector(
                ".panel-ingreso-contenido"
            )
            : null;


    if (
        !contenedor
    ) {

        return;

    }


    botonCrearCuenta =
        document.createElement(
            "button"
        );


    botonCrearCuenta.id =
        "botonCrearCuenta";


    botonCrearCuenta.type =
        "button";


    botonCrearCuenta.className =
        "boton-confirmar-ingreso";


    botonCrearCuenta.textContent =
        "CREAR CUENTA";


    botonCrearCuenta.addEventListener(
        "click",
        function() {

            crearCuenta();

        }
    );


    if (
        botonConfirmarIngreso
    ) {

        botonConfirmarIngreso.insertAdjacentElement(
            "afterend",
            botonCrearCuenta
        );

    } else {

        contenedor.appendChild(
            botonCrearCuenta
        );

    }

}



function mostrarPanelIngreso(
    modo = "ingreso"
) {

    if (
        !panelIngreso
    ) {

        return;

    }


    modoPanelIngreso =
        modo;


    prepararBotonCrearCuenta();


    panelIngreso.classList.add(
        "visible"
    );


    panelIngreso.setAttribute(
        "aria-hidden",
        "false"
    );


    if (
        usuarioAcceso
    ) {

        usuarioAcceso.placeholder =
            "Correo electrónico";

    }


    if (
        mensajeIngreso
    ) {

        if (
            modo === "compra"
        ) {

            mensajeIngreso.textContent =
                "Para continuar con la compra, ingresá a tu cuenta o creá una nueva.";

        } else {

            mensajeIngreso.textContent =
                "";

        }

    }


    window.setTimeout(
        function() {

            if (
                usuarioAcceso
            ) {

                usuarioAcceso.focus();

            }

        },
        80
    );

}



function ocultarPanelIngreso() {

    if (
        !panelIngreso
    ) {

        return;

    }


    panelIngreso.classList.remove(
        "visible"
    );


    panelIngreso.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        mensajeIngreso
    ) {

        mensajeIngreso.textContent =
            "";

    }

}



async function consultarAccesoUsuario(
    cliente,
    userId
) {

    const resultado =
        await cliente
            .from(
                "user_access"
            )
            .select(
                "has_access"
            )
            .eq(
                "user_id",
                userId
            )
            .maybeSingle();


    if (
        resultado.error
    ) {

        throw resultado.error;

    }


    return Boolean(
        resultado.data &&
        resultado.data.has_access === true
    );

}



async function verificarAccesoActual(
    cliente
) {

    try {

        const {
            data: usuarioData,
            error: usuarioError
        } =
            await cliente.auth.getUser();


        if (
            usuarioError ||
            !usuarioData ||
            !usuarioData.user
        ) {

            ocultarContenidoPrincipal();

            return false;

        }


        const tieneAcceso =
            await consultarAccesoUsuario(
                cliente,
                usuarioData.user.id
            );


        if (
            tieneAcceso
        ) {

            mostrarContenidoPrincipal();

            return true;

        }


        ocultarContenidoPrincipal();

        return false;

    } catch (error) {

        ocultarContenidoPrincipal();

        return false;

    }

}



/* ==================================================
   INGRESO
   ================================================== */

async function intentarIngreso() {

    if (
        !usuarioAcceso ||
        !claveAcceso
    ) {

        return;

    }


    const email =
        usuarioAcceso.value
            .trim()
            .toLowerCase();


    const password =
        claveAcceso.value;


    if (
        !email ||
        !password
    ) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Ingresá tu correo y tu clave.";

        }

        return;

    }


    if (
        mensajeIngreso
    ) {

        mensajeIngreso.textContent =
            "Verificando acceso...";

    }


    try {

        const cliente =
            await obtenerSupabaseClient();


        const {
            data,
            error
        } =
            await cliente.auth.signInWithPassword({
                email: email,
                password: password
            });


        if (
            error
        ) {

            if (
                mensajeIngreso
            ) {

                mensajeIngreso.textContent =
                    "Error de Supabase: " +
                    (
                        error.message ||
                        "No se pudo iniciar sesión."
                    );

            }

            return;

        }


        if (
            !data ||
            !data.user
        ) {

            if (
                mensajeIngreso
            ) {

                mensajeIngreso.textContent =
                    "No se pudo validar la cuenta.";

            }

            return;

        }


        const tieneAcceso =
            await consultarAccesoUsuario(
                cliente,
                data.user.id
            );


        if (
            tieneAcceso
        ) {

            ocultarPanelIngreso();

            mostrarContenidoPrincipal();

            return;

        }


        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "La cuenta es correcta, pero todavía no tiene acceso habilitado.";

        }

    } catch (error) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Error de conexión con Supabase.";

        }

    }

}



async function crearCuenta() {

    if (
        !usuarioAcceso ||
        !claveAcceso
    ) {

        return;

    }


    const email =
        usuarioAcceso.value
            .trim()
            .toLowerCase();


    const password =
        claveAcceso.value;


    if (
        !email ||
        !email.includes("@")
    ) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Ingresá un correo electrónico válido.";

        }

        return;

    }


    if (
        password.length < 6
    ) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "La clave debe tener al menos 6 caracteres.";

        }

        return;

    }


    if (
        mensajeIngreso
    ) {

        mensajeIngreso.textContent =
            "Creando tu cuenta...";

    }


    try {

        const cliente =
            await obtenerSupabaseClient();


        const {
            data,
            error
        } =
            await cliente.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo:
                        "https://hacetuapp.com/"
                }
            });


        if (
            error
        ) {

            if (
                mensajeIngreso
            ) {

                mensajeIngreso.textContent =
                    "Error de Supabase: " +
                    (
                        error.message ||
                        "No se pudo crear la cuenta."
                    );

            }

            return;

        }


        if (
            data &&
            data.session
        ) {

            const tieneAcceso =
                await consultarAccesoUsuario(
                    cliente,
                    data.user.id
                );


            if (
                tieneAcceso
            ) {

                ocultarPanelIngreso();

                mostrarContenidoPrincipal();

                return;

            }


            if (
                mensajeIngreso
            ) {

                mensajeIngreso.textContent =
                    "Cuenta creada correctamente.";

            }

            return;

        }


        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Cuenta creada. Revisá tu correo.";

        }

    } catch (error) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Error al crear la cuenta.";

        }

    }

}



async function abrirMercadoPago() {

    if (
        mensajeIngreso
    ) {

        mensajeIngreso.textContent =
            "";

    }


    try {

        const cliente =
            await obtenerSupabaseClient();


        const {
            data: usuarioData,
            error: usuarioError
        } =
            await cliente.auth.getUser();


        if (
            usuarioError ||
            !usuarioData ||
            !usuarioData.user
        ) {

            mostrarPanelIngreso(
                "compra"
            );

            return;

        }


        const tieneAcceso =
            await consultarAccesoUsuario(
                cliente,
                usuarioData.user.id
            );


        if (
            tieneAcceso
        ) {

            mostrarContenidoPrincipal();

            return;

        }


        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "Generando el acceso de pago...";

        }


        const {
            data,
            error
        } =
            await cliente.functions.invoke(
                SUPABASE_FUNCTION_PAGO,
                {
                    body: {}
                }
            );


        if (
            error ||
            !data ||
            !data.payment_url
        ) {

            if (
                mensajeIngreso
            ) {

                mensajeIngreso.textContent =
                    "No se pudo generar el pago.";

            }

            mostrarPanelIngreso(
                "compra"
            );

            return;

        }


        window.location.href =
            data.payment_url;

    } catch (error) {

        if (
            mensajeIngreso
        ) {

            mensajeIngreso.textContent =
                "No se pudo conectar con el sistema de pago.";

        }


        mostrarPanelIngreso(
            "compra"
        );

    }

}



if (
    botonYaAcceso
) {

    botonYaAcceso.addEventListener(
        "click",
        function() {

            mostrarPanelIngreso(
                "ingreso"
            );

        }
    );

}



if (
    botonNoAcceso
) {

    botonNoAcceso.addEventListener(
        "click",
        function() {

            abrirMercadoPago();

        }
    );

}



if (
    botonConfirmarIngreso
) {

    botonConfirmarIngreso.addEventListener(
        "click",
        function() {

            intentarIngreso();

        }
    );

}



if (
    botonCerrarIngreso
) {

    botonCerrarIngreso.addEventListener(
        "click",
        function() {

            ocultarPanelIngreso();

        }
    );

}



/* ==================================================
   TIMBRE SUTIL DE RECREO
   ================================================== */

let timbreIntentado =
    false;


let timbreProgramado =
    false;


let audioContext =
    null;


function reproducirTimbreRecreo() {

    if (
        timbreIntentado
    ) {

        return;

    }


    timbreIntentado =
        true;


    try {

        const AudioContextClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (
            !AudioContextClass
        ) {

            return;

        }


        if (!audioContext) {

            audioContext =
                new AudioContextClass();

        }


        const iniciarTimbre =
            function() {

                if (
                    !audioContext
                ) {

                    return;

                }


                const ahora =
                    audioContext.currentTime;


                const gananciaPrincipal =
                    audioContext.createGain();


                gananciaPrincipal.gain.setValueAtTime(
                    0.0001,
                    ahora
                );


                gananciaPrincipal.gain.exponentialRampToValueAtTime(
                    0.075,
                    ahora + 0.025
                );


                gananciaPrincipal.gain.exponentialRampToValueAtTime(
                    0.0001,
                    ahora + 1.15
                );


                gananciaPrincipal.connect(
                    audioContext.destination
                );


                const frecuencias = [
                    784,
                    988,
                    1319
                ];


                frecuencias.forEach(
                    function(frecuencia, indice) {

                        const oscilador =
                            audioContext.createOscillator();


                        const ganancia =
                            audioContext.createGain();


                        oscilador.type =
                            "triangle";


                        oscilador.frequency.setValueAtTime(
                            frecuencia,
                            ahora
                        );


                        ganancia.gain.setValueAtTime(
                            0.0001,
                            ahora
                        );


                        ganancia.gain.exponentialRampToValueAtTime(
                            0.24 / (indice + 1),
                            ahora + 0.018
                        );


                        ganancia.gain.exponentialRampToValueAtTime(
                            0.0001,
                            ahora + 1.05
                        );


                        oscilador.connect(
                            ganancia
                        );


                        ganancia.connect(
                            gananciaPrincipal
                        );


                        oscilador.start(
                            ahora
                        );


                        oscilador.stop(
                            ahora + 1.12
                        );

                    }
                );


                window.setTimeout(
                    function() {

                        if (
                            !audioContext
                        ) {

                            return;

                        }


                        const secondoToque =
                            audioContext.currentTime;


                        const gananciaSegundo =
                            audioContext.createGain();


                        gananciaSegundo.gain.setValueAtTime(
                            0.0001,
                            secondoToque
                        );


                        gananciaSegundo.gain.exponentialRampToValueAtTime(
                            0.055,
                            secondoToque + 0.02
                        );


                        gananciaSegundo.gain.exponentialRampToValueAtTime(
                            0.0001,
                            secondoToque + 0.85
                        );


                        gananciaSegundo.connect(
                            audioContext.destination
                        );


                        const osciladorSegundo =
                            audioContext.createOscillator();


                        osciladorSegundo.type =
                            "triangle";


                        osciladorSegundo.frequency.setValueAtTime(
                            1047,
                            secondoToque
                        );


                        osciladorSegundo.connect(
                            gananciaSegundo
                        );


                        osciladorSegundo.start(
                            secondoToque
                        );


                        osciladorSegundo.stop(
                            secondoToque + 0.82
                        );

                    },
                    480
                );

            };


        const resultado =
            audioContext.resume();


        if (
            resultado &&
            typeof resultado.then === "function"
        ) {

            resultado
                .then(
                    iniciarTimbre
                )
                .catch(
                    function() {}
                );

        } else {

            iniciarTimbre();

        }

    } catch (error) {}

}



function programarTimbreRecreo() {

    if (
        timbreProgramado
    ) {

        return;

    }


    timbreProgramado =
        true;


    window.setTimeout(
        function() {

            reproducirTimbreRecreo();

        },
        4500
    );

}



function desbloquearTimbreConInteraccion() {

    if (
        timbreIntentado
    ) {

        return;

    }


    reproducirTimbreRecreo();

}



/* ==================================================
   YOUTUBE
   ================================================== */

function obtenerIdYoutube(url) {

    if (!url) {

        return "";

    }


    const coincidencia =
        url.match(
            /youtu\.be\/([^?&#/]+)|youtube\.com\/watch\?v=([^&#]+)|youtube\.com\/embed\/([^?&#/]+)/i
        );


    if (!coincidencia) {

        return "";

    }


    return (
        coincidencia[1] ||
        coincidencia[2] ||
        coincidencia[3] ||
        ""
    );

}



/* ==================================================
   VIDEO COMPLEMENTARIO
   ================================================== */

function resetearVideoComplementario() {

    const botonVideo =
        document.getElementById(
            "botonVideoComplementario"
        );


    const subtitulo =
        document.getElementById(
            "subtituloVideo"
        );


    const contenedorVideo =
        document.getElementById(
            "contenedorVideoComplementario"
        );


    const video =
        document.getElementById(
            "videoComplementario"
        );


    if (
        !botonVideo ||
        !subtitulo ||
        !contenedorVideo ||
        !video
    ) {

        return;

    }


    video.src =
        "";

    contenedorVideo.classList.remove(
        "visible"
    );

    contenedorVideo.setAttribute(
        "aria-hidden",
        "true"
    );

    botonVideo.classList.remove(
        "oculto"
    );

    botonVideo.textContent =
        "▶ VER VIDEO";

    subtitulo.textContent =
        subtitulosVideos[paginaActual] ||
        "";

}



function prepararVideoComplementario() {

    const botonVideo =
        document.getElementById(
            "botonVideoComplementario"
        );


    const subtitulo =
        document.getElementById(
            "subtituloVideo"
        );


    if (
        !botonVideo ||
        !subtitulo
    ) {

        return;

    }


    const urlVideo =
        videosComplementarios[paginaActual];


    if (!urlVideo) {

        botonVideo.classList.add(
            "oculto"
        );

        subtitulo.textContent =
            "";

        return;

    }


    botonVideo.classList.remove(
        "oculto"
    );

    subtitulo.textContent =
        subtitulosVideos[paginaActual] ||
        "";

}



function alternarVideoComplementario() {

    const botonVideo =
        document.getElementById(
            "botonVideoComplementario"
        );


    const contenedorVideo =
        document.getElementById(
            "contenedorVideoComplementario"
        );


    const video =
        document.getElementById(
            "videoComplementario"
        );


    if (
        !botonVideo ||
        !contenedorVideo ||
        !video
    ) {

        return;

    }


    const urlVideo =
        videosComplementarios[paginaActual];


    if (!urlVideo) {

        return;

    }


    const videoVisible =
        contenedorVideo.classList.contains(
            "visible"
        );


    if (videoVisible) {

        video.src =
            "";

        contenedorVideo.classList.remove(
            "visible"
        );

        contenedorVideo.setAttribute(
            "aria-hidden",
            "true"
        );

        botonVideo.textContent =
            "▶ VER VIDEO";

        return;

    }


    const youtubeId =
        obtenerIdYoutube(
            urlVideo
        );


    if (!youtubeId) {

        return;

    }


    video.src =
        "https://www.youtube.com/embed/" +
        encodeURIComponent(
            youtubeId
        ) +
        "?rel=0";


    contenedorVideo.classList.add(
        "visible"
    );

    contenedorVideo.setAttribute(
        "aria-hidden",
        "false"
    );

    botonVideo.textContent =
        "▲ CERRAR VIDEO";


    window.setTimeout(
        function() {

            contenedorVideo.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        80
    );

}



/* ==================================================
   PÁGINAS
   ================================================== */

function actualizarAccionPagina() {

    const botonAccion =
        document.getElementById(
            "accionPagina"
        );


    if (!botonAccion) {

        return;

    }


    if (
        paginaActual >= 10
    ) {

        botonAccion.textContent =
            "VOLVER A INTERFAZ";

        return;

    }


    botonAccion.textContent =
        "SIGUIENTE PÁGINA";

}



function cargarPaginaEnVisor(
    numeroPagina
) {

    const visor =
        document.getElementById(
            "paginaVisor"
        );


    const carpeta =
        document.querySelector(
            ".carpeta-visor"
        );


    if (
        !paginas[numeroPagina] ||
        !visor
    ) {

        return;

    }


    paginaActual =
        numeroPagina;


    visor.src =
        paginas[numeroPagina];


    visor.alt =
        "Hoja " +
        numeroPagina +
        " del curso Humanómetro";


    resetearVideoComplementario();

    prepararVideoComplementario();

    actualizarAccionPagina();


    if (carpeta) {

        carpeta.scrollTop =
            0;

    }

}



function abrirPagina(
    numeroPagina
) {

    const modal =
        document.getElementById(
            "modalPdf"
        );


    if (
        !paginas[numeroPagina] ||
        !modal
    ) {

        return;

    }


    cargarPaginaEnVisor(
        numeroPagina
    );


    modal.style.display =
        "flex";


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



function avanzarPagina() {

    if (
        paginaActual >= 10
    ) {

        cerrarModal();

        return;

    }


    cargarPaginaEnVisor(
        paginaActual + 1
    );

}



function cerrarModal() {

    const modal =
        document.getElementById(
            "modalPdf"
        );


    const visor =
        document.getElementById(
            "paginaVisor"
        );


    const video =
        document.getElementById(
            "videoComplementario"
        );


    const contenedorVideo =
        document.getElementById(
            "contenedorVideoComplementario"
        );


    if (!modal) {

        return;

    }


    modal.style.display =
        "none";


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (visor) {

        visor.src =
            "";

    }


    if (video) {

        video.src =
            "";

    }


    if (contenedorVideo) {

        contenedorVideo.classList.remove(
            "visible"
        );

        contenedorVideo.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    document.body.style.overflow =
        "";

}



/* ==================================================
   CIERRE DEL VISOR
   ================================================== */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "modalPdf"
            );


        if (
            event.target === modal
        ) {

            cerrarModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            cerrarModal();

        }

    }
);



/* ==================================================
   PROTECCIONES EXISTENTES (BLINDAJE ACTIVADO)
   ================================================== */

document.addEventListener(
    "contextmenu",
    function(event) {

        event.preventDefault();

    }
);


document.addEventListener(
    "dragstart",
    function(event) {

        if (
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        if (
            event.ctrlKey &&
            (
                key === "s" ||
                key === "p" ||
                key === "u" ||
                key === "i"
            )
        ) {

            event.preventDefault();

        }


        if (
            event.ctrlKey &&
            event.shiftKey &&
            (
                key === "i" ||
                key === "j" ||
                key === "c"
            )
        ) {

            event.preventDefault();

        }

    }
);



/* ==================================================
   IMÁGENES
   ================================================== */

document
    .querySelectorAll("img")
    .forEach(
        function(imagen) {

            imagen.setAttribute(
                "draggable",
                "false"
            );

        }
    );



/* ==================================================
   CARRUSEL HORIZONTAL
   ================================================== */

const carruselHojas =
    document.getElementById(
        "carruselHojas"
    );


const indicadorDeslizar =
    document.querySelector(
        ".indicador-scroll"
    );


let carruselYaDesplazado =
    false;


function ocultarIndicadorDeslizar() {

    if (
        carruselYaDesplazado ||
        !indicadorDeslizar
    ) {

        return;

    }


    carruselYaDesplazado =
        true;


    indicadorDeslizar.classList.add(
        "oculto"
    );

}



if (carruselHojas) {

    carruselHojas.addEventListener(
        "touchstart",
        function() {

            desbloquearTimbreConInteraccion();

        },
        {
            passive: true,
            once: true
        }
    );


    carruselHojas.addEventListener(
        "scroll",
        function() {

            if (
                carruselHojas.scrollLeft > 2
            ) {

                ocultarIndicadorDeslizar();

            }

        },
        {
            passive: true
        }
    );

}



/* ==================================================
   PRIMERA INTERACCIÓN PARA AUDIO
   ================================================== */

document.addEventListener(
    "pointerdown",
    function() {

        desbloquearTimbreConInteraccion();

    },
    {
        passive: true,
        once: true
    }
);



/* ==================================================
   INICIO — PRODUCCIÓN
   ================================================== */

window.addEventListener(
    "load",
    async function() {

        programarTimbreRecreo();


        if (
            MODO_DESARROLLO
        ) {

            mostrarContenidoPrincipal();

            return;

        }


        try {

            const cliente =
                await obtenerSupabaseClient();


            await verificarAccesoActual(
                cliente
            );


            window.setTimeout(
                function() {

                    verificarAccesoActual(
                        cliente
                    );

                },
                3000
            );

        } catch (error) {

            ocultarContenidoPrincipal();

        }

    }
);
