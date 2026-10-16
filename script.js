"use strict";

/* CACHE-BUSTER-FORCE: 2026-10-14-1945 - FORZAR RECARGA TOTAL */
const HM_JS_VERSION = "16.15";


/* ==================================================
   CURSO 1: GUÍA DE TRINCHERA (10 PÁGINAS)
   ================================================== */

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

const videosComplementarios = {
    1: "https://youtu.be/PkNDkUbAATU?si=BG3NB_5aOFggDn3Y",
    2: "https://youtu.be/I95gS70vAPg?si=BnhaDzNyJ397-6Y5",
    3: "https://youtu.be/3TgsyUGaGmo?si=pEEJblCUj0GJcZHQ",
    4: "https://youtu.be/RM6gJD6T2hs?si=4RiDAidkcyIAk7CA",
    5: "https://youtu.be/NjUCNCCuooY?si=6tCWzhaVfM_oMrGY",
    6: "https://youtu.be/fCXe7nWPwnI?si=okpMoERks_rMO3aL",
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
   CURSO 2: BLINDAJE DIGITAL (76 PÁGINAS PASO A PASO)
   ================================================== */

const totalPaginasBlindaje = 76;
const paginasBlindaje = {};

for (let i = 1; i <= totalPaginasBlindaje; i++) {
    if (i === 75) {
        paginasBlindaje[i] = "Página 75.png";
    } else if (i === 76) {
        paginasBlindaje[i] = "pagina76.png";
    } else {
        paginasBlindaje[i] = `Página ${i}.png`;
    }
}

const videosBlindaje = {
    // Ejemplo: 1: "https://youtu.be/..."
};

const subtitulosBlindaje = {
    // Ejemplo: 1: "Demostración práctica"
};

let paginaActualBlindaje = 1;


/* ==================================================
   SUPABASE Y SEGURIDAD DE SESIÓN
   ================================================== */

const SUPABASE_URL = "https://zjviadsqbhqdjyomaoct.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_63lSHlN2SiggU_YsouSzaQ_Bis21lzw";
const SUPABASE_FUNCTION_PAGO = "crear-pago";

let supabaseClient = null;
let supabaseLibraryPromise = null;

function cargarLibreriaSupabase() {
    if (window.supabase && typeof window.supabase.createClient === "function") {
        return Promise.resolve();
    }
    if (supabaseLibraryPromise) {
        return supabaseLibraryPromise;
    }
    supabaseLibraryPromise = new Promise(function(resolve, reject) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
        script.async = true;
        script.onload = function() {
            if (window.supabase && typeof window.supabase.createClient === "function") {
                resolve();
                return;
            }
            reject(new Error("No se pudo cargar Supabase."));
        };
        script.onerror = function() {
            reject(new Error("No se pudo cargar la librería de Supabase."));
        };
        document.head.appendChild(script);
    });
    return supabaseLibraryPromise;
}

async function obtenerSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    await cargarLibreriaSupabase();
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
    });
    return supabaseClient;
}

async function verificarYSellarSesion(cliente, userId) {
    let tokenDispositivo = localStorage.getItem('hm_token_dispositivo');
    if (!tokenDispositivo) {
        tokenDispositivo = 'dev_' + Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem('hm_token_dispositivo', tokenDispositivo);
    }

    try {
        const { data, error } = await cliente.rpc('intentar_login_seguro', {
            p_user_id: userId,
            p_token_dispositivo: tokenDispositivo
        });
        if (error) return { permitido: false, mensaje: "Error de validación en el servidor." };
        return { permitido: true, mensaje: "Acceso autorizado." };
    } catch (e) {
        return { permitido: false, mensaje: "Error de conexión." };
    }
}

async function validarSesionUnica(cliente, userId) {
    try {
        const tokenDispositivo = localStorage.getItem('hm_token_dispositivo');
        if (!tokenDispositivo) return true;

        const { data, error } = await cliente
            .from("user_access")
            .select("active_session_id")
            .eq("user_id", userId)
            .maybeSingle();

        if (error || !data) return true;

        if (data.active_session_id && data.active_session_id !== tokenDispositivo) {
            alert("Tu sesión ha sido cerrada porque se inició sesión en otro dispositivo.");
            await cliente.auth.signOut();
            localStorage.removeItem('hm_token_dispositivo');
            ocultarContenidoPrincipal();
            return false;
        }
        return true;
    } catch (e) {
        return true;
    }
}


/* ==================================================
   PANTALLA PREVIA Y CONTROL DE ACCESO
   ================================================== */

const pantallaAcceso = document.getElementById("pantallaAcceso");
const contenidoPrincipal = document.getElementById("contenidoPrincipal");
const botonYaAcceso = document.getElementById("botonYaAcceso");
const botonNoAcceso = document.getElementById("botonNoAcceso");
const panelIngreso = document.getElementById("panelIngreso");
const botonConfirmarIngreso = document.getElementById("botonConfirmarIngreso");
const botonCerrarIngreso = document.getElementById("botonCerrarIngreso");
const mensajeIngreso = document.getElementById("mensajeIngreso");
const usuarioAcceso = document.getElementById("usuarioAcceso");
const claveAcceso = document.getElementById("claveAcceso");

let botonCrearCuenta = null;
let modoPanelIngreso = "ingreso";
const MODO_DESARROLLO = false;

function mostrarContenidoPrincipal() {
    if (contenidoPrincipal) contenidoPrincipal.style.display = "block";
    if (pantallaAcceso) pantallaAcceso.style.display = "none";
    document.body.style.overflow = "";
}

function ocultarContenidoPrincipal() {
    if (contenidoPrincipal) contenidoPrincipal.style.display = "none";
    if (pantallaAcceso) pantallaAcceso.style.display = "block";
}

function prepararBotonCrearCuenta() {
    if (botonCrearCuenta) return;
    const contenedor = panelIngreso ? panelIngreso.querySelector(".panel-ingreso-contenido") : null;
    if (!contenedor) return;

    botonCrearCuenta = document.createElement("button");
    botonCrearCuenta.id = "botonCrearCuenta";
    botonCrearCuenta.type = "button";
    botonCrearCuenta.className = "boton-confirmar-ingreso";
    botonCrearCuenta.textContent = "CREAR CUENTA";
    botonCrearCuenta.addEventListener("click", function() { crearCuenta(); });

    if (botonConfirmarIngreso) {
        botonConfirmarIngreso.insertAdjacentElement("afterend", botonCrearCuenta);
    } else {
        contenedor.appendChild(botonCrearCuenta);
    }
}

function mostrarPanelIngreso(modo = "ingreso") {
    if (!panelIngreso) return;
    modoPanelIngreso = modo;
    prepararBotonCrearCuenta();
    panelIngreso.classList.add("visible");
    panelIngreso.setAttribute("aria-hidden", "false");

    if (usuarioAcceso) usuarioAcceso.placeholder = "Correo electrónico";
    if (mensajeIngreso) {
        mensajeIngreso.textContent = (modo === "compra") ? "Para continuar con la compra, ingresá a tu cuenta o creá una nueva." : "";
    }
    window.setTimeout(function() { if (usuarioAcceso) usuarioAcceso.focus(); }, 80);
}

function ocultarPanelIngreso() {
    if (!panelIngreso) return;
    panelIngreso.classList.remove("visible");
    panelIngreso.setAttribute("aria-hidden", "true");
    if (mensajeIngreso) mensajeIngreso.textContent = "";
}

async function consultarAccesoUsuario(cliente, userId) {
    const resultado = await cliente.from("user_access").select("has_access").eq("user_id", userId).maybeSingle();
    if (resultado.error) throw resultado.error;
    return Boolean(resultado.data && resultado.data.has_access === true);
}

async function verificarAccesoActual(cliente) {
    try {
        const { data: usuarioData, error: usuarioError } = await cliente.auth.getUser();
        if (usuarioError || !usuarioData || !usuarioData.user) {
            ocultarContenidoPrincipal();
            return false;
        }

        const sesionValida = await validarSesionUnica(cliente, usuarioData.user.id);
        if (!sesionValida) {
            ocultarContenidoPrincipal();
            return false;
        }

        const tieneAcceso = await consultarAccesoUsuario(cliente, usuarioData.user.id);
        if (tieneAcceso) {
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

async function intentarIngreso() {
    if (!usuarioAcceso || !claveAcceso) return;
    const email = usuarioAcceso.value.trim().toLowerCase();
    const password = claveAcceso.value;

    if (!email || !password) {
        if (mensajeIngreso) mensajeIngreso.textContent = "Ingresá tu correo y tu clave.";
        return;
    }
    if (mensajeIngreso) mensajeIngreso.textContent = "Verificando acceso...";

    try {
        const cliente = await obtenerSupabaseClient();
        const { data, error } = await cliente.auth.signInWithPassword({ email: email, password: password });

        if (error) {
            if (mensajeIngreso) {
                const mensajeError = error.message || "";
                if (mensajeError.includes("rate limit") || mensajeError.includes("52 seconds")) {
                    mensajeIngreso.textContent = "Por seguridad, aguardá unos segundos antes de intentar nuevamente.";
                } else {
                    mensajeIngreso.textContent = "Correo o contraseña incorrectos.";
                }
            }
            return;
        }

        if (!data || !data.user) {
            if (mensajeIngreso) mensajeIngreso.textContent = "No se pudo validar la cuenta.";
            return;
        }

        const tieneAcceso = await consultarAccesoUsuario(cliente, data.user.id);
        if (tieneAcceso) {
            const resultadoSesion = await verificarYSellarSesion(cliente, data.user.id);
            if (!resultadoSesion.permitido) {
                if (mensajeIngreso) mensajeIngreso.textContent = resultadoSesion.mensaje;
                await cliente.auth.signOut();
                return;
            }
            ocultarPanelIngreso();
            mostrarContenidoPrincipal();
            return;
        }

        if (mensajeIngreso) mensajeIngreso.textContent = "Este correo no registra un pago activo. Redirigiendo para adquirir el curso...";
        await abrirMercadoPago();
    } catch (error) {
        if (mensajeIngreso) mensajeIngreso.textContent = "Error de conexión con Supabase.";
    }
}

async function crearCuenta() {
    if (!usuarioAcceso || !claveAcceso) return;
    const email = usuarioAcceso.value.trim().toLowerCase();
    const password = claveAcceso.value;

    if (!email || !email.includes("@")) {
        if (mensajeIngreso) mensajeIngreso.textContent = "Ingresá un correo electrónico válido.";
        return;
    }
    if (password.length < 6) {
        if (mensajeIngreso) mensajeIngreso.textContent = "La clave debe tener al menos 6 caracteres.";
        return;
    }
    if (mensajeIngreso) mensajeIngreso.textContent = "Creando tu cuenta...";

    try {
        const cliente = await obtenerSupabaseClient();
        const { data, error } = await cliente.auth.signUp({
            email: email,
            password: password,
            options: { emailRedirectTo: "https://hacetuapp.com/" }
        });

        if (error) {
            if (mensajeIngreso) {
                const mensajeError = error.message || "";
                if (mensajeError.includes("rate limit") || mensajeError.includes("52 seconds")) {
                    mensajeIngreso.textContent = "Por seguridad, aguardá unos segundos antes de intentar nuevamente.";
                } else {
                    mensajeIngreso.textContent = "No se pudo crear la cuenta: " + mensajeError;
                }
            }
            return;
        }

        if (data && data.session) {
            const tieneAcceso = await consultarAccesoUsuario(cliente, data.user.id);
            if (tieneAcceso) {
                const resultadoSesion = await verificarYSellarSesion(cliente, data.user.id);
                if (!resultadoSesion.permitido) {
                    if (mensajeIngreso) mensajeIngreso.textContent = resultadoSesion.mensaje;
                    await cliente.auth.signOut();
                    return;
                }
                ocultarPanelIngreso();
                mostrarContenidoPrincipal();
                return;
            }
            if (mensajeIngreso) mensajeIngreso.textContent = "Cuenta creada. Redirigiendo al pago...";
            await abrirMercadoPago();
            return;
        }

        if (mensajeIngreso) mensajeIngreso.textContent = "Cuenta creada. Revisá tu correo.";
    } catch (error) {
        if (mensajeIngreso) mensajeIngreso.textContent = "Error al crear la cuenta.";
    }
}

async function abrirMercadoPago() {
    if (mensajeIngreso) mensajeIngreso.textContent = "Redirigiendo a Mercado Pago...";
    try {
        const cliente = await obtenerSupabaseClient();
        const { data: usuarioData, error: usuarioError } = await cliente.auth.getUser();

        if (usuarioError || !usuarioData || !usuarioData.user) {
            mostrarPanelIngreso("compra");
            return;
        }

        const tieneAcceso = await consultarAccesoUsuario(cliente, usuarioData.user.id);
        if (tieneAcceso) {
            const resultadoSesion = await verificarYSellarSesion(cliente, usuarioData.user.id);
            if (!resultadoSesion.permitido) {
                if (mensajeIngreso) mensajeIngreso.textContent = resultadoSesion.mensaje;
                await cliente.auth.signOut();
                return;
            }
            mostrarContenidoPrincipal();
            return;
        }

        if (mensajeIngreso) mensajeIngreso.textContent = "Generando el enlace de pago...";
        const { data, error } = await cliente.functions.invoke(SUPABASE_FUNCTION_PAGO, { body: {} });

        if (error || !data || !data.payment_url) {
            if (mensajeIngreso) mensajeIngreso.textContent = "No se pudo generar el pago.";
            mostrarPanelIngreso("compra");
            return;
        }
        window.location.href = data.payment_url;
    } catch (error) {
        if (mensajeIngreso) mensajeIngreso.textContent = "No se pudo conectar con el sistema de pago.";
        mostrarPanelIngreso("compra");
    }
}

if (botonYaAcceso) botonYaAcceso.addEventListener("click", function(e) { e.preventDefault(); mostrarPanelIngreso("ingreso"); });
if (botonNoAcceso) botonNoAcceso.addEventListener("click", function(e) { e.preventDefault(); abrirMercadoPago(); });
if (botonConfirmarIngreso) botonConfirmarIngreso.addEventListener("click", function(e) { e.preventDefault(); intentarIngreso(); });
if (botonCerrarIngreso) botonCerrarIngreso.addEventListener("click", function(e) { e.preventDefault(); ocultarPanelIngreso(); });


/* ==================================================
   TIMBRE DE RECREO
   ================================================== */

let timbreIntentado = false;
let timbreProgramado = false;
let audioContext = null;

function reproducirTimbreRecreo() {
    if (timbreIntentado) return;
    timbreIntentado = true;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioContext) audioContext = new AudioContextClass();

        const iniciarTimbre = function() {
            if (!audioContext) return;
            const ahora = audioContext.currentTime;
            const gananciaPrincipal = audioContext.createGain();
            gananciaPrincipal.gain.setValueAtTime(0.0001, ahora);
            gananciaPrincipal.gain.exponentialRampToValueAtTime(0.075, ahora + 0.025);
            gananciaPrincipal.gain.exponentialRampToValueAtTime(0.0001, ahora + 1.15);
            gananciaPrincipal.connect(audioContext.destination);

            const frecuencias = [784, 988, 1319];
            frecuencias.forEach(function(frecuencia, indice) {
                const oscilador = audioContext.createOscillator();
                const ganancia = audioContext.createGain();
                oscilador.type = "triangle";
                oscilador.frequency.setValueAtTime(frecuencia, ahora);
                ganancia.gain.setValueAtTime(0.0001, ahora);
                ganancia.gain.exponentialRampToValueAtTime(0.24 / (indice + 1), ahora + 0.018);
                ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + 1.05);
                oscilador.connect(ganancia);
                ganancia.connect(gananciaPrincipal);
                oscilador.start(ahora);
                oscilador.stop(ahora + 1.12);
            });

            window.setTimeout(function() {
                if (!audioContext) return;
                const segundoToque = audioContext.currentTime;
                const gananciaSegundo = audioContext.createGain();
                gananciaSegundo.gain.setValueAtTime(0.0001, segundoToque);
                gananciaSegundo.gain.exponentialRampToValueAtTime(0.055, segundoToque + 0.02);
                gananciaSegundo.gain.exponentialRampToValueAtTime(0.0001, segundoToque + 0.85);
                gananciaSegundo.connect(audioContext.destination);

                const osciladorSegundo = audioContext.createOscillator();
                osciladorSegundo.type = "triangle";
                osciladorSegundo.frequency.setValueAtTime(1047, segundoToque);
                osciladorSegundo.connect(gananciaSegundo);
                osciladorSegundo.start(segundoToque);
                osciladorSegundo.stop(segundoToque + 0.82);
            }, 480);
        };

        const resultado = audioContext.resume();
        if (resultado && typeof resultado.then === "function") {
            resultado.then(iniciarTimbre).catch(function() {});
        } else {
            iniciarTimbre();
        }
    } catch (error) {}
}

function programarTimbreRecreo() {
    if (timbreProgramado) return;
    timbreProgramado = true;
    window.setTimeout(function() { reproducirTimbreRecreo(); }, 4500);
}

function desbloquearTimbreConInteraccion() {
    if (timbreIntentado) return;
    reproducirTimbreRecreo();
}


/* ==================================================
   YOUTUBE ID EXTRACTION
   ================================================== */

function obtenerIdYoutube(url) {
    if (!url) return "";
    const coincidencia = url.match(/youtu\.be\/([^?&#/]+)|youtube\.com\/watch\?v=([^&#]+)|youtube\.com\/embed\/([^?&#/]+)/i);
    if (!coincidencia) return "";
    return coincidencia[1] || coincidencia[2] || coincidencia[3] || "";
}


/* ==================================================
   LÓGICA GUÍA DE TRINCHERA (CURSO 1)
   ================================================== */

function resetearVideoComplementario() {
    const botonVideo = document.getElementById("botonVideoComplementario");
    const subtitulo = document.getElementById("subtituloVideo");
    const contenedorVideo = document.getElementById("contenedorVideoComplementario");
    const video = document.getElementById("videoComplementario");

    if (!botonVideo || !subtitulo || !contenedorVideo || !video) return;

    video.src = "";
    contenedorVideo.classList.remove("visible");
    contenedorVideo.setAttribute("aria-hidden", "true");
    botonVideo.classList.remove("oculto");
    botonVideo.textContent = "▶ VER VIDEO";
    subtitulo.textContent = subtitulosVideos[paginaActual] || "";
}

function prepararVideoComplementario() {
    const botonVideo = document.getElementById("botonVideoComplementario");
    const subtitulo = document.getElementById("subtituloVideo");
    if (!botonVideo || !subtitulo) return;

    const urlVideo = videosComplementarios[paginaActual];
    if (!urlVideo) {
        botonVideo.classList.add("oculto");
        subtitulo.textContent = "";
        return;
    }
    botonVideo.classList.remove("oculto");
    subtitulo.textContent = subtitulosVideos[paginaActual] || "";
}

function alternarVideoComplementario() {
    const botonVideo = document.getElementById("botonVideoComplementario");
    const contenedorVideo = document.getElementById("contenedorVideoComplementario");
    const video = document.getElementById("videoComplementario");

    if (!botonVideo || !contenedorVideo || !video) return;

    const urlVideo = videosComplementarios[paginaActual];
    if (!urlVideo) return;

    const videoVisible = contenedorVideo.classList.contains("visible");
    if (videoVisible) {
        video.src = "";
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        botonVideo.textContent = "▶ VER VIDEO";
        return;
    }

    const youtubeId = obtenerIdYoutube(urlVideo);
    if (!youtubeId) return;

    video.src = "https://www.youtube.com/embed/" + encodeURIComponent(youtubeId) + "?autoplay=1&rel=0";
    contenedorVideo.classList.add("visible");
    contenedorVideo.setAttribute("aria-hidden", "false");
    botonVideo.textContent = "▲ CERRAR VIDEO";

    window.setTimeout(function() {
        contenedorVideo.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
}

function actualizarAccionPagina() {
    const botonAccion = document.getElementById("accionPagina");
    const botonAnterior = document.getElementById("botonAnteriorTrinchera");
    if (!botonAccion) return;

    if (paginaActual >= 10) {
        botonAccion.textContent = "VOLVER A INTERFAZ";
    } else {
        botonAccion.textContent = "SIGUIENTE PÁGINA";
    }

    if (botonAnterior) {
        botonAnterior.style.display = (paginaActual <= 1) ? "none" : "inline-block";
    }
}

function cargarPaginaEnVisor(numeroPagina) {
    const visor = document.getElementById("paginaVisor");
    const carpeta = document.querySelector("#modalPdf .carpeta-visor");

    if (!paginas[numeroPagina] || !visor) return;

    paginaActual = numeroPagina;
    visor.src = paginas[numeroPagina];
    visor.alt = "Hoja " + numeroPagina + " del curso Humanómetro";

    resetearVideoComplementario();
    prepararVideoComplementario();
    actualizarAccionPagina();

    if (carpeta) carpeta.scrollTop = 0;
}

function abrirPagina(numeroPagina) {
    const modal = document.getElementById("modalPdf");
    if (!paginas[numeroPagina] || !modal) return;

    cargarPaginaEnVisor(numeroPagina);
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function avanzarPagina() {
    if (paginaActual >= 10) {
        cerrarModal();
        return;
    }
    cargarPaginaEnVisor(paginaActual + 1);
}

function retrocederPagina() {
    if (paginaActual <= 1) return;
    cargarPaginaEnVisor(paginaActual - 1);
}

function cerrarModal() {
    const modal = document.getElementById("modalPdf");
    const visor = document.getElementById("paginaVisor");
    const video = document.getElementById("videoComplementario");
    const contenedorVideo = document.getElementById("contenedorVideoComplementario");

    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    if (visor) visor.src = "";
    if (video) video.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}


/* ==================================================
   LÓGICA BLINDAJE DIGITAL (76 PÁGINAS PASO A PASO)
   ================================================== */

function resetearVideoBlindaje() {
    const botonVideo = document.getElementById("botonVideoComplementarioBlindaje");
    const subtitulo = document.getElementById("subtituloVideoBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");
    const video = document.getElementById("videoBlindaje");

    if (!botonVideo || !subtitulo || !contenedorVideo || !video) return;

    video.src = "";
    contenedorVideo.classList.remove("visible");
    contenedorVideo.setAttribute("aria-hidden", "true");
    botonVideo.textContent = "▶ VER VIDEO";
    subtitulo.textContent = subtitulosBlindaje[paginaActualBlindaje] || "";
}

function prepararVideoBlindaje() {
    const botonVideo = document.getElementById("botonVideoComplementarioBlindaje");
    const subtitulo = document.getElementById("subtituloVideoBlindaje");
    if (!botonVideo || !subtitulo) return;

    const urlVideo = videosBlindaje[paginaActualBlindaje];
    if (!urlVideo) {
        botonVideo.classList.add("oculto");
        subtitulo.textContent = "";
        return;
    }
    botonVideo.classList.remove("oculto");
    subtitulo.textContent = subtitulosBlindaje[paginaActualBlindaje] || "";
}

function alternarVideoBlindaje() {
    const botonVideo = document.getElementById("botonVideoComplementarioBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");
    const video = document.getElementById("videoBlindaje");

    if (!botonVideo || !contenedorVideo || !video) return;

    const urlVideo = videosBlindaje[paginaActualBlindaje];
    if (!urlVideo) {
        alert("El video complementario de esta página estará disponible próximamente.");
        return;
    }

    const videoVisible = contenedorVideo.classList.contains("visible");
    if (videoVisible) {
        video.src = "";
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        botonVideo.textContent = "▶ VER VIDEO";
        return;
    }

    const youtubeId = obtenerIdYoutube(urlVideo);
    if (!youtubeId) return;

    video.src = "https://www.youtube.com/embed/" + encodeURIComponent(youtubeId) + "?autoplay=1&rel=0";
    contenedorVideo.classList.add("visible");
    contenedorVideo.setAttribute("aria-hidden", "false");
    botonVideo.textContent = "▲ CERRAR VIDEO";
}

function cargarPaginaBlindaje(num) {
    const visor = document.getElementById("paginaVisorBlindaje");
    const carpeta = document.querySelector("#modalBlindaje .carpeta-visor");
    const botonAnterior = document.getElementById("botonAnteriorBlindaje");

    if (!visor) return;

    paginaActualBlindaje = num;

    visor.src = paginasBlindaje[num]; 
    visor.alt = "Página " + num + " del curso Blindaje Digital";

    const botonAccion = document.getElementById("accionPaginaBlindaje");
    if (botonAccion) {
        botonAccion.textContent = (num >= totalPaginasBlindaje) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
    }

    if (botonAnterior) {
        botonAnterior.style.display = (num <= 1) ? "none" : "inline-block";
    }

    resetearVideoBlindaje();
    prepararVideoBlindaje();

    if (carpeta) carpeta.scrollTop = 0;
}

function abrirPaginaBlindaje(num = 1) {
    const modal = document.getElementById("modalBlindaje");
    if (!modal) return;

    cargarPaginaBlindaje(num);
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function avanzarPaginaBlindaje() {
    if (paginaActualBlindaje >= totalPaginasBlindaje) {
        cerrarModalBlindaje();
        return;
    }
    cargarPaginaBlindaje(paginaActualBlindaje + 1);
}

function retrocederPaginaBlindaje() {
    if (paginaActualBlindaje <= 1) return;
    cargarPaginaBlindaje(paginaActualBlindaje - 1);
}

function cerrarModalBlindaje() {
    const modal = document.getElementById("modalBlindaje");
    const visor = document.getElementById("paginaVisorBlindaje");
    const video = document.getElementById("videoBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");

    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    if (visor) visor.src = "";
    if (video) video.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}


/* ==================================================
   CIERRES Y PROTECCIONES
   ================================================== */

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modalPdf");
    const modalBlindaje = document.getElementById("modalBlindaje");

    if (event.target === modal) cerrarModal();
    if (event.target === modalBlindaje) cerrarModalBlindaje();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        cerrarModal();
        cerrarModalBlindaje();
    }
});

document.addEventListener("contextmenu", function(event) { event.preventDefault(); });
document.addEventListener("dragstart", function(event) { if (event.target.tagName === "IMG") event.preventDefault(); });

document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    if (event.ctrlKey && (key === "s" || key === "p" || key === "u" || key === "i")) event.preventDefault();
    if (event.ctrlKey && event.shiftKey && (key === "i" || key === "j" || key === "c")) event.preventDefault();
});

document.querySelectorAll("img").forEach(function(imagen) { imagen.setAttribute("draggable", "false"); });


/* ==================================================
   ZOOM DE CARTA Y EVENTOS
   ================================================== */

function abrirZoomCarta() {
    const modal = document.getElementById('modalCartaZoom');
    if (modal) modal.style.display = 'flex';
}

function cerrarZoomCarta() {
    const modal = document.getElementById('modalCartaZoom');
    if (modal) modal.style.display = 'none';
}

document.addEventListener("pointerdown", function() { desbloquearTimbreConInteraccion(); }, { passive: true, once: true });

window.addEventListener("load", async function() {
    programarTimbreRecreo();
    if (MODO_DESARROLLO) {
        mostrarContenidoPrincipal();
        return;
    }
    try {
        const cliente = await obtenerSupabaseClient();
        await verificarAccesoActual(cliente);
        window.setTimeout(function() { verificarAccesoActual(cliente); }, 3000);
    } catch (error) {
        ocultarContenidoPrincipal();
    }
});
