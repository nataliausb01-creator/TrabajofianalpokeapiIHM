const API = "https://pokeapi.co/api/v2/pokemon/";
const TOTAL = 151; 

function urlImagen(id) {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
}

const nombresStats = {
    "hp": "Vida",
    "attack": "Ataque",
    "defense": "Defensa",
    "special-attack": "Ataque esp.",
    "special-defense": "Defensa esp.",
    "speed": "Velocidad"
};

const nombresTipos = {
    normal: "normal", fire: "fuego", water: "agua", electric: "eléctrico",
    grass: "planta", ice: "hielo", fighting: "lucha", poison: "veneno",
    ground: "tierra", flying: "volador", psychic: "psíquico", bug: "bicho",
    rock: "roca", ghost: "fantasma", dragon: "dragón", dark: "siniestro",
    steel: "acero", fairy: "hada"
};

function pintarTipos(contenedor, tipos) {
    contenedor.innerHTML = "";
    tipos.forEach(function (t) {
        const etiqueta = document.createElement("span");
        etiqueta.className = "tipo";
        etiqueta.textContent = nombresTipos[t.type.name] || t.type.name;
        contenedor.appendChild(etiqueta);
    });
}

const nombreAleatorio = document.getElementById("aleatorio-nombre");
const imgAleatorio = document.getElementById("aleatorio-img");
const tiposAleatorio = document.getElementById("aleatorio-tipos");
const botonGenerar = document.getElementById("boton-generar");

async function obtenerPokemonAleatorio() {
    nombreAleatorio.textContent = "Buscando pokemon...";
    tiposAleatorio.innerHTML = "";

    const idNuevoPokemon = Math.floor(Math.random() * TOTAL) + 1;

    try {
        const respuesta = await fetch(API + idNuevoPokemon);
        const pokemon = await respuesta.json();

        nombreAleatorio.textContent = pokemon.name;
        imgAleatorio.src = pokemon.sprites.other["official-artwork"].front_default;
        imgAleatorio.alt = "Imagen de " + pokemon.name;
        pintarTipos(tiposAleatorio, pokemon.types);
    } catch {
        nombreAleatorio.textContent = "No se encontró. Intenta de nuevo.";
    }
}

botonGenerar.addEventListener("click", obtenerPokemonAleatorio);
obtenerPokemonAleatorio(); // al abrir la página ya muestra uno

const listaElemento = document.getElementById("lista-pokemon");
const buscador = document.getElementById("buscador");
const mensajeLista = document.getElementById("mensaje-lista");

let todosLosPokemon = []; 

async function cargarPokedex() {
    mensajeLista.textContent = "Cargando Pokédex...";

    try {
        const respuesta = await fetch(API + "?limit=" + TOTAL);
        const datos = await respuesta.json();

  
        todosLosPokemon = datos.results.map(function (p) {
            const partes = p.url.split("/");
            const id = Number(partes[partes.length - 2]);
            return { id: id, nombre: p.name };
        });

        mensajeLista.textContent = "";
        mostrarLista(todosLosPokemon);
    } catch {
        mensajeLista.textContent = "No se pudo cargar la Pokédex. Revisa tu conexión e intenta de nuevo.";
    }
}

function mostrarLista(lista) {
    listaElemento.innerHTML = "";

    if (lista.length === 0) {
        mensajeLista.textContent = "No hay resultados. Prueba con otro nombre o número.";
        return;
    }
    mensajeLista.textContent = "";

    lista.forEach(function (pokemon) {
        const carta = document.createElement("button");
        carta.className = "carta";
        carta.innerHTML =
            '<img src="' + urlImagen(pokemon.id) + '" alt="" loading="lazy">' +
            '<span class="numero">#' + pokemon.id + '</span>' +
            '<span class="nombre">' + pokemon.nombre + '</span>';

        carta.addEventListener("click", function () {
            verDetalle(pokemon.id);
        });
        listaElemento.appendChild(carta);
    });
}

buscador.addEventListener("input", function () {
    const texto = buscador.value.trim().toLowerCase();

    const filtrados = todosLosPokemon.filter(function (p) {
        return p.nombre.includes(texto) || String(p.id) === texto;
    });
    mostrarLista(filtrados);
});

cargarPokedex();

const ventanaDetalle = document.getElementById("detalle");
const detalleImg = document.getElementById("detalle-img");
const detalleNombre = document.getElementById("detalle-nombre");
const detalleNumero = document.getElementById("detalle-numero");
const detalleTipos = document.getElementById("detalle-tipos");
const detalleAltura = document.getElementById("detalle-altura");
const detallePeso = document.getElementById("detalle-peso");
const detalleStats = document.getElementById("detalle-stats");

async function verDetalle(id) {
    try {
        const respuesta = await fetch(API + id);
        const pokemon = await respuesta.json();

        detalleImg.src = pokemon.sprites.other["official-artwork"].front_default;
        detalleImg.alt = "Imagen de " + pokemon.name;
        detalleNombre.textContent = pokemon.name;
        detalleNumero.textContent = "#" + pokemon.id;
        pintarTipos(detalleTipos, pokemon.types);

        detalleAltura.textContent = (pokemon.height / 10) + " m";
        detallePeso.textContent = (pokemon.weight / 10) + " kg";

        detalleStats.innerHTML = "";
        pokemon.stats.forEach(function (s) {
            const fila = document.createElement("li");
            fila.innerHTML =
                '<span>' + (nombresStats[s.stat.name] || s.stat.name) + '</span>' +
                '<progress max="255" value="' + s.base_stat + '"></progress>' +
                '<span>' + s.base_stat + '</span>';
            detalleStats.appendChild(fila);
        });

        ventanaDetalle.showModal(); 
    } catch {
        mensajeLista.textContent = "No se pudo cargar el detalle. Intenta de nuevo.";
    }
}

document.getElementById("cerrar-detalle").addEventListener("click", function () {
    ventanaDetalle.close();
});

ventanaDetalle.addEventListener("click", function (evento) {
    if (evento.target === ventanaDetalle) {
        ventanaDetalle.close();
    }
});