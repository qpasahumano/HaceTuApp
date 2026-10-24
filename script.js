"use strict";

/* CACHE-BUSTER-FORCE: 2026-10-24-1345 - FORZAR RECARGA TOTAL CON PRELOADER */
const HM_JS_VERSION = "18.16";


/* ==================================================
   CONTROLADOR DE PRELOADER UNÍSONO
   ================================================== */
window.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloaderPlataforma");
    const barra = document.getElementById("barraProgresoPreloader");
    const textoPorcentaje = document.getElementById("textoPorcentajePreloader");

    if (!preloader) return;

    let progreso = 0;
    const intervalo = setInterval(function() {
        progreso += Math.floor(Math.random() * 15) + 10;
        if (progreso > 100) progreso = 100;

        if (barra) barra.style.width = progreso + "%";
        if (textoPorcentaje) textoPorcentaje.textContent = progreso + "%";

        if (progreso === 100) {
            clearInterval(intervalo);
            window.setTimeout(function() {
                preloader.style.opacity = "0";
                window.setTimeout(function() {
                    preloader.style.display = "none";
                }, 500);
            }, 300);
        }
    }, 100);
});


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
    9: "https://youtu.be/tW2fi_ssXeQ3wukB"
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

/* MAPA DE VIDEOS REALES DE BLINDAJE DIGITAL (CORREGIDO) */
const videosBlindajeMap = {
    2: "mp8pfF9UnwU", // Supabase
    3: "NY1qfQk1HI4", // Mercado Pago
    5: "TDPHl9ki4Ps", // GitHub
    6: "NdvozbM5dyo"  // Cloudflare
};

let paginaActualBlindaje = 1;

function abrirPaginaBlindaje(numeroPagina) {
    paginaActualBlindaje = numeroPagina;
    const modal = document.getElementById("modalBlindaje");
    const imagenVisor = document.getElementById("paginaVisorBlindaje");
    const botonAnterior = document.getElementById("botonAnteriorBlindaje");
    const botonAccion = document.getElementById("accionPaginaBlindaje");
    const avisoGirar = document.getElementById("avisoGirarCelular");

    if (modal && imagenVisor) {
        const nombreArchivo = paginasBlindaje[paginaActualBlindaje] || `Página ${paginaActualBlindaje}.png`;
        imagenVisor.src = encodeURI(nombreArchivo);
        imagenVisor.alt = `Página ${paginaActualBlindaje} de Blindaje Digital`;

        if (botonAnterior) {
            botonAnterior.style.display = (paginaActualBlindaje <= 1) ? "none" : "inline-block";
        }
        if (botonAccion) {
            botonAccion.textContent = (paginaActualBlindaje >= totalPaginasBlindaje) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
        }

        if (avisoGirar) {
            avisoGirar.style.display = (paginaActualBlindaje === 49) ? "block" : "none";
        }

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        actualizarVisibilidadVideoBlindaje();
    }
}

function cerrarModalBlindaje() {
    const modal = document.getElementById("modalBlindaje");
    const visor = document.getElementById("paginaVisorBlindaje");
    const iframeVideo = document.getElementById("videoBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
    if (visor) visor.src = "";
    if (iframeVideo) iframeVideo.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

function avanzarPaginaBlindaje() {
    if (paginaActualBlindaje >= totalPaginasBlindaje) {
        cerrarModalBlindaje();
        return;
    }
    abrirPaginaBlindaje(paginaActualBlindaje + 1);
}

function retrocederPaginaBlindaje() {
    if (paginaActualBlindaje <= 1) return;
    abrirPaginaBlindaje(paginaActualBlindaje - 1);
}

function actualizarVisibilidadVideoBlindaje() {
    const botonVideo = document.getElementById("botonVideoComplementarioBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");
    const iframeVideo = document.getElementById("videoBlindaje");

    if (videosBlindajeMap[paginaActualBlindaje]) {
        if (botonVideo) {
            botonVideo.style.display = "inline-block";
            botonVideo.textContent = "▶ VER VIDEO";
        }
    } else {
        if (botonVideo) botonVideo.style.display = "none";
        if (contenedorVideo) {
            contenedorVideo.classList.remove("visible");
            contenedorVideo.setAttribute("aria-hidden", "true");
        }
        if (iframeVideo) iframeVideo.src = "";
    }
}

function alternarVideoBlindaje() {
    const botonVideo = document.getElementById("botonVideoComplementarioBlindaje");
    const contenedorVideo = document.getElementById("contenedorVideoBlindaje");
    const iframeVideo = document.getElementById("videoBlindaje");

    if (!contenedorVideo || !iframeVideo) return;

    const videoId = videosBlindajeMap[paginaActualBlindaje];
    if (!videoId) return;

    if (contenedorVideo.classList.contains("visible")) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        iframeVideo.src = "";
        if (botonVideo) botonVideo.textContent = "▶ VER VIDEO";
    } else {
        contenedorVideo.classList.add("visible");
        contenedorVideo.setAttribute("aria-hidden", "false");
        iframeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        if (botonVideo) botonVideo.textContent = "▲ CERRAR VIDEO";

        window.setTimeout(function() {
            contenedorVideo.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }
}


/* ==================================================
   CURSO 3: MÓDULO DE MAILS (5 PÁGINAS)
   ================================================== */

const totalPaginasMails = 5;
let paginaActualMails = 1;
const idVideoYouTubeMails = "bzpiH7dP_ek";

function abrirPaginaMails(numeroPagina) {
    paginaActualMails = numeroPagina;
    const modal = document.getElementById("modalMails");
    const imagenVisor = document.getElementById("paginaVisorMails");
    const botonAnterior = document.getElementById("botonAnteriorMails");
    const botonAccion = document.getElementById("accionPaginaMails");

    if (modal && imagenVisor) {
        imagenVisor.src = `modulo-mails/p%C3%A1gina%20${paginaActualMails}.png`;
        imagenVisor.alt = `Página ${paginaActualMails} del Módulo de Mails`;

        if (botonAnterior) {
            botonAnterior.style.display = (paginaActualMails <= 1) ? "none" : "inline-block";
        }
        if (botonAccion) {
            botonAccion.textContent = (paginaActualMails >= totalPaginasMails) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
        }

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        actualizarVisibilidadVideoMails();
    }
}

function cerrarModalMails() {
    const modal = document.getElementById("modalMails");
    const visor = document.getElementById("paginaVisorMails");
    const iframeVideo = document.getElementById("videoMails");
    const contenedorVideo = document.getElementById("contenedorVideoMails");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
    if (visor) visor.src = "";
    if (iframeVideo) iframeVideo.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

function avanzarPaginaMails() {
    if (paginaActualMails >= totalPaginasMails) {
        cerrarModalMails();
        return;
    }
    abrirPaginaMails(paginaActualMails + 1);
}

function retrocederPaginaMails() {
    if (paginaActualMails <= 1) return;
    abrirPaginaMails(paginaActualMails - 1);
}

function actualizarVisibilidadVideoMails() {
    const botonVideo = document.getElementById("botonVideoComplementarioMails");
    const contenedorVideo = document.getElementById("contenedorVideoMails");
    const iframeVideo = document.getElementById("videoMails");

    if (paginaActualMails === 1) {
        if (botonVideo) {
            botonVideo.style.display = "inline-block";
            botonVideo.textContent = "▶ VER VIDEO";
        }
    } else {
        if (botonVideo) botonVideo.style.display = "none";
        if (contenedorVideo) {
            contenedorVideo.classList.remove("visible");
            contenedorVideo.setAttribute("aria-hidden", "true");
        }
        if (iframeVideo) iframeVideo.src = "";
    }
}

function alternarVideoMails() {
    const botonVideo = document.getElementById("botonVideoComplementarioMails");
    const contenedorVideo = document.getElementById("contenedorVideoMails");
    const iframeVideo = document.getElementById("videoMails");

    if (!contenedorVideo || !iframeVideo) return;

    if (contenedorVideo.classList.contains("visible")) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        iframeVideo.src = "";
        if (botonVideo) botonVideo.textContent = "▶ VER VIDEO";
    } else {
        contenedorVideo.classList.add("visible");
        contenedorVideo.setAttribute("aria-hidden", "false");
        iframeVideo.src = `https://www.youtube.com/embed/${idVideoYouTubeMails}?autoplay=1&rel=0`;
        if (botonVideo) botonVideo.textContent = "▲ CERRAR VIDEO";
    }
}


/* ==================================================
   CURSO 4: GOOGLE PLAY CONSOLE (7 PÁGINAS)
   ================================================== */

const totalPaginasPlayConsole = 7;
let paginaActualPlayConsole = 1;
const idVideoYouTubePlayConsole = "YF1otO4tfvk";

function abrirPaginaPlayConsole(numeroPagina) {
    paginaActualPlayConsole = numeroPagina;
    const modal = document.getElementById("modalPlayConsole");
    const imagenVisor = document.getElementById("paginaVisorPlayConsole");
    const botonAnterior = document.getElementById("botonAnteriorPlayConsole");
    const botonAccion = document.getElementById("accionPaginaPlayConsole");

    if (modal && imagenVisor) {
        imagenVisor.src = `modulo-playconsole/p%C3%A1gina%20${paginaActualPlayConsole}.png`;
        imagenVisor.alt = `Página ${paginaActualPlayConsole} de Google Play Console`;

        if (botonAnterior) {
            botonAnterior.style.display = (paginaActualPlayConsole <= 1) ? "none" : "inline-block";
        }
        if (botonAccion) {
            botonAccion.textContent = (paginaActualPlayConsole >= totalPaginasPlayConsole) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
        }

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        actualizarVisibilidadVideoPlayConsole();
    }
}

function cerrarModalPlayConsole() {
    const modal = document.getElementById("modalPlayConsole");
    const visor = document.getElementById("paginaVisorPlayConsole");
    const iframeVideo = document.getElementById("videoPlayConsole");
    const contenedorVideo = document.getElementById("contenedorVideoPlayConsole");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
    if (visor) visor.src = "";
    if (iframeVideo) iframeVideo.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

function avanzarPaginaPlayConsole() {
    if (paginaActualPlayConsole >= totalPaginasPlayConsole) {
        cerrarModalPlayConsole();
        return;
    }
    abrirPaginaPlayConsole(paginaActualPlayConsole + 1);
}

function retrocederPaginaPlayConsole() {
    if (paginaActualPlayConsole <= 1) return;
    abrirPaginaPlayConsole(paginaActualPlayConsole - 1);
}

function actualizarVisibilidadVideoPlayConsole() {
    const botonVideo = document.getElementById("botonVideoComplementarioPlayConsole");
    const contenedorVideo = document.getElementById("contenedorVideoPlayConsole");
    const iframeVideo = document.getElementById("videoPlayConsole");

    if (paginaActualPlayConsole === 2) {
        if (botonVideo) {
            botonVideo.style.display = "inline-block";
            botonVideo.textContent = "▶ VER VIDEO";
        }
    } else {
        if (botonVideo) botonVideo.style.display = "none";
        if (contenedorVideo) {
            contenedorVideo.classList.remove("visible");
            contenedorVideo.setAttribute("aria-hidden", "true");
        }
        if (iframeVideo) iframeVideo.src = "";
    }
}

function alternarVideoPlayConsole() {
    const botonVideo = document.getElementById("botonVideoComplementarioPlayConsole");
    const contenedorVideo = document.getElementById("contenedorVideoPlayConsole");
    const iframeVideo = document.getElementById("videoPlayConsole");

    if (!contenedorVideo || !iframeVideo) return;

    if (contenedorVideo.classList.contains("visible")) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        iframeVideo.src = "";
        if (botonVideo) botonVideo.textContent = "▶ VER VIDEO";
    } else {
        contenedorVideo.classList.add("visible");
        contenedorVideo.setAttribute("aria-hidden", "false");
        iframeVideo.src = `https://www.youtube.com/embed/${idVideoYouTubePlayConsole}?autoplay=1&rel=0`;
        if (botonVideo) botonVideo.textContent = "▲ CERRAR VIDEO";

        window.setTimeout(function() {
            contenedorVideo.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }
}


/* ==================================================
   CURSO 5: GOOGLE SEARCH CONSOLE & SITEMAPS (8 PÁGINAS)
   ================================================== */

const totalPaginasSearchConsole = 8;
let paginaActualSearchConsole = 1;
const idVideoYouTubeSearchConsole = "OrExQjVndjI";

const paginasSearchConsoleMap = {
    1: "guia-google-search-console/00-portada-notebook.png",
    2: "guia-google-search-console/01-portada-google-search-console.png",
    3: "guia-google-search-console/02-herramientas-y-concepto.png",
    4: "guia-google-search-console/03-paso-1-alta-propiedad.png",
    5: "guia-google-search-console/04-via-a-donweb-txt.png",
    6: "guia-google-search-console/05-via-b-github-pages.png",
    7: "guia-google-search-console/06-via-c-cloudflare-y-verificacion.png",
    8: "guia-google-search-console/07-errores-frecuentes-y-alertas.png"
};

function abrirPaginaSearchConsole(numeroPagina) {
    paginaActualSearchConsole = numeroPagina;
    const modal = document.getElementById("modalSearchConsole");
    const imagenVisor = document.getElementById("paginaVisorSearchConsole");
    const botonAnterior = document.getElementById("botonAnteriorSearchConsole");
    const botonAccion = document.getElementById("accionPaginaSearchConsole");

    if (modal && imagenVisor) {
        imagenVisor.src = paginasSearchConsoleMap[paginaActualSearchConsole];
        imagenVisor.alt = `Página ${paginaActualSearchConsole} de Google Search Console & Sitemaps`;

        if (botonAnterior) {
            botonAnterior.style.display = (paginaActualSearchConsole <= 1) ? "none" : "inline-block";
        }
        if (botonAccion) {
            botonAccion.textContent = (paginaActualSearchConsole >= totalPaginasSearchConsole) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
        }

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        actualizarVisibilidadVideoSearchConsole();
    }
}

function cerrarModalSearchConsole() {
    const modal = document.getElementById("modalSearchConsole");
    const visor = document.getElementById("paginaVisorSearchConsole");
    const iframeVideo = document.getElementById("videoSearchConsole");
    const contenedorVideo = document.getElementById("contenedorVideoSearchConsole");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
    if (visor) visor.src = "";
    if (iframeVideo) iframeVideo.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

function avanzarPaginaSearchConsole() {
    if (paginaActualSearchConsole >= totalPaginasSearchConsole) {
        cerrarModalSearchConsole();
        return;
    }
    abrirPaginaSearchConsole(paginaActualSearchConsole + 1);
}

function retrocederPaginaSearchConsole() {
    if (paginaActualSearchConsole <= 1) return;
    abrirPaginaSearchConsole(paginaActualSearchConsole - 1);
}

function actualizarVisibilidadVideoSearchConsole() {
    const botonVideo = document.getElementById("botonVideoComplementarioSearchConsole");
    const contenedorVideo = document.getElementById("contenedorVideoSearchConsole");
    const iframeVideo = document.getElementById("videoSearchConsole");

    if (paginaActualSearchConsole === 1) {
        if (botonVideo) {
            botonVideo.style.display = "inline-block";
            botonVideo.textContent = "▶ VER VIDEO";
        }
    } else {
        if (botonVideo) botonVideo.style.display = "none";
        if (contenedorVideo) {
            contenedorVideo.classList.remove("visible");
            contenedorVideo.setAttribute("aria-hidden", "true");
        }
        if (iframeVideo) iframeVideo.src = "";
    }
}

function alternarVideoSearchConsole() {
    const botonVideo = document.getElementById("botonVideoComplementarioSearchConsole");
    const contenedorVideo = document.getElementById("contenedorVideoSearchConsole");
    const iframeVideo = document.getElementById("videoSearchConsole");

    if (!contenedorVideo || !iframeVideo) return;

    if (contenedorVideo.classList.contains("visible")) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        iframeVideo.src = "";
        if (botonVideo) botonVideo.textContent = "▶ VER VIDEO";
    } else {
        contenedorVideo.classList.add("visible");
        contenedorVideo.setAttribute("aria-hidden", "false");
        iframeVideo.src = `https://www.youtube.com/embed/${idVideoYouTubeSearchConsole}?autoplay=1&rel=0`;
        if (botonVideo) botonVideo.textContent = "▲ CERRAR VIDEO";

        window.setTimeout(function() {
            contenedorVideo.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }
}


/* ==================================================
   CURSO 6: GUÍA DE CACHÉ Y PLATAFORMA DIGITAL (6 PÁGINAS)
   ================================================== */

const totalPaginasCache = 6;
let paginaActualCache = 1;
const idVideoYouTubeCache = "4PA3_FX1MWg";

const paginasCacheMap = {
    1: "guia-cache-plataforma-digital/01-portada.png",
    2: "guia-cache-plataforma-digital/02-herramientas-y-contexto.png",
    3: "guia-cache-plataforma-digital/03-recorrido-cloudflare.png",
    4: "guia-cache-plataforma-digital/04-configuracion-anti-cache.png",
    5: "guia-cache-plataforma-digital/05-habito-desarrollador.png",
    6: "guia-cache-plataforma-digital/06-aclaracion-importante.png"
};

function abrirPaginaCache(numeroPagina) {
    paginaActualCache = numeroPagina;
    const modal = document.getElementById("modalCache");
    const imagenVisor = document.getElementById("paginaVisorCache");
    const botonAnterior = document.getElementById("botonAnteriorCache");
    const botonAccion = document.getElementById("accionPaginaCache");

    if (modal && imagenVisor) {
        imagenVisor.src = paginasCacheMap[paginaActualCache];
        imagenVisor.alt = `Página ${paginaActualCache} de Guía de Caché`;

        if (botonAnterior) {
            botonAnterior.style.display = (paginaActualCache <= 1) ? "none" : "inline-block";
        }
        if (botonAccion) {
            botonAccion.textContent = (paginaActualCache >= totalPaginasCache) ? "VOLVER A INTERFAZ" : "SIGUIENTE PÁGINA";
        }

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        actualizarVisibilidadVideoCache();
    }
}

function cerrarModalCache() {
    const modal = document.getElementById("modalCache");
    const visor = document.getElementById("paginaVisorCache");
    const iframeVideo = document.getElementById("videoCache");
    const contenedorVideo = document.getElementById("contenedorVideoCache");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
    if (visor) visor.src = "";
    if (iframeVideo) iframeVideo.src = "";
    if (contenedorVideo) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

function avanzarPaginaCache() {
    if (paginaActualCache >= totalPaginasCache) {
        cerrarModalCache();
        return;
    }
    abrirPaginaCache(paginaActualCache + 1);
}

function retrocederPaginaCache() {
    if (paginaActualCache <= 1) return;
    abrirPaginaCache(paginaActualCache - 1);
}

function actualizarVisibilidadVideoCache() {
    const botonVideo = document.getElementById("botonVideoComplementarioCache");
    const contenedorVideo = document.getElementById("contenedorVideoCache");
    const iframeVideo = document.getElementById("videoCache");

    if (paginaActualCache === 2) {
        if (botonVideo) {
            botonVideo.style.display = "inline-block";
            botonVideo.textContent = "▶ VER VIDEO";
        }
    } else {
        if (botonVideo) botonVideo.style.display = "none";
        if (contenedorVideo) {
            contenedorVideo.classList.remove("visible");
            contenedorVideo.setAttribute("aria-hidden", "true");
        }
        if (iframeVideo) iframeVideo.src = "";
    }
}

function alternarVideoCache() {
    const botonVideo = document.getElementById("botonVideoComplementarioCache");
    const contenedorVideo = document.getElementById("contenedorVideoCache");
    const iframeVideo = document.getElementById("videoCache");

    if (!contenedorVideo || !iframeVideo) return;

    if (contenedorVideo.classList.contains("visible")) {
        contenedorVideo.classList.remove("visible");
        contenedorVideo.setAttribute("aria-hidden", "true");
        iframeVideo.src = "";
        if (botonVideo) botonVideo.textContent = "▶ VER VIDEO";
    } else {
        contenedorVideo.classList.add("visible");
        contenedorVideo.setAttribute("aria-hidden", "false");
        iframeVideo.src = `https://www.youtube.com/embed/${idVideoYouTubeCache}?autoplay=1&rel=0`;
        if (botonVideo) botonVideo.textContent = "▲ CERRAR VIDEO";

        window.setTimeout(function() {
            contenedorVideo.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    }
}


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

function mostrarPanelIngreso() {
    if (!panelIngreso) return;
    panelIngreso.classList.add("visible");
    panelIngreso.setAttribute("aria-hidden", "false");

    if (usuarioAcceso) usuarioAcceso.placeholder = "Correo electrónico";
    if (mensajeIngreso) {
        mensajeIngreso.textContent = "";
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

        if (mensajeIngreso) mensajeIngreso.textContent = "Redirigiendo a Mercado Pago...";
        await abrirMercadoPago();
    } catch (error) {
        if (mensajeIngreso) mensajeIngreso.textContent = "Error de conexión con Supabase.";
    }
}

async function abrirMercadoPago() {
    if (mensajeIngreso) mensajeIngreso.textContent = "Redirigiendo a Mercado Pago...";
    try {
        const cliente = await obtenerSupabaseClient();
        const { data: usuarioData, error: usuarioError } = await cliente.auth.getUser();

        if (usuarioError || !usuarioData || !usuarioData.user) {
            mostrarPanelIngreso();
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
            mostrarPanelIngreso();
            return;
        }
        window.location.href = data.payment_url;
    } catch (error) {
        if (mensajeIngreso) mensajeIngreso.textContent = "No se pudo conectar con el sistema de pago.";
        mostrarPanelIngreso();
    }
}


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
   CIERRES Y PROTECCIONES
   ================================================== */

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modalPdf");
    const modalBlindaje = document.getElementById("modalBlindaje");
    const modalMails = document.getElementById("modalMails");
    const modalPlayConsole = document.getElementById("modalPlayConsole");
    const modalSearchConsole = document.getElementById("modalSearchConsole");
    const modalCache = document.getElementById("modalCache");

    if (event.target === modal) cerrarModal();
    if (event.target === modalBlindaje) cerrarModalBlindaje();
    if (event.target === modalMails) cerrarModalMails();
    if (event.target === modalPlayConsole) cerrarModalPlayConsole();
    if (event.target === modalSearchConsole) cerrarModalSearchConsole();
    if (event.target === modalCache) cerrarModalCache();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        cerrarModal();
        cerrarModalBlindaje();
        cerrarModalMails();
        cerrarModalPlayConsole();
        cerrarModalSearchConsole();
        cerrarModalCache();
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
   ZOOM DE CARTA Y EVENTOS DE INTERFAZ (GARANTIZADOS)
   ================================================== */

function abrirZoomCarta() {
    const modal = document.getElementById('modalCartaZoom');
    if (modal) modal.style.display = 'flex';
}

function cerrarZoomCarta() {
    const modal = document.getElementById('modalCartaZoom');
    if (modal) modal.style.display = 'none';
}

function vincularEventosManuales() {
    const btnYa = document.getElementById("botonYaAcceso");
    const btnNo = document.getElementById("botonNoAcceso");
    const btnConfirmar = document.getElementById("botonConfirmarIngreso");
    const btnCerrar = document.getElementById("botonCerrarIngreso");

    if (btnYa) btnYa.onclick = function(e) { e.preventDefault(); mostrarPanelIngreso(); };
    if (btnNo) btnNo.onclick = function(e) { e.preventDefault(); abrirMercadoPago(); };
    if (btnConfirmar) btnConfirmar.onclick = function(e) { e.preventDefault(); intentarIngreso(); };
    if (btnCerrar) btnCerrar.onclick = function(e) { e.preventDefault(); ocultarPanelIngreso(); };
}

document.addEventListener("pointerdown", function() { desbloquearTimbreConInteraccion(); }, { passive: true, once: true });

window.addEventListener("load", function() {
    vincularEventosManuales();
    programarTimbreRecreo();

    if (MODO_DESARROLLO) {
        mostrarContenidoPrincipal();
        return;
    }

    obtenerSupabaseClient().then(function(cliente) {
        verificarAccesoActual(cliente);
    }).catch(function() {
        ocultarContenidoPrincipal();
    });
});
