# Pokedex primera generación

Proyecto de la asignatura **Interacción Hombre-Máquina** ; Universidad de San Buenaventura  
Autora: Natalia Diaz

Página web responsive que permite consultar los 151 Pokémon de la primera generación usando la [PokeAPI](https://pokeapi.co/), con una figura 3D de Marill hecha con three.js.

## Entregables

- **Página publicada** 
- **Diseño en Figma** 
- **Documento (target, objetivo, caso de uso e historia de usuario)** 

## Secciones de la página

1. **Inicio:** texto de bienvenida y figura 3D de Marill (three.js).
2. **Aleatorio:** muestra un Pokemon al azar con su imagen y tipos. El botón "Generar otro" cambia de Pokemon.
3. **Pokédex:** lista de los 151 Pokemon con buscador por nombre o número. Al tocar una tarjeta se abre una ventana con altura, peso y estadísticas.

## Funcionalidades

- Consumo de la PokeAPI con `fetch`.
- Buscador que filtra mientras se escribe.
- Ventana de detalle con tipos, medidas y estadísticas base.
- Diseño responsive (computador, tablet y celular).
- Figura 3D interactiva: gira sola y se puede mover con el mouse o el dedo (tecnología tactil).

## Tecnologías

- HTML
- CSS
- JavaScript
- [PokeAPI](https://pokeapi.co/)
- [three.js](https://threejs.org/)
- Figma (diseño de la interfaz)

## Estructura del proyecto

```
pokedex/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── main.js      (PokeAPI: aleatorio, lista, buscador y detalle)
    └── marill.js    (figura 3D de Marill con three.js)
```

## Cómo ejecutarlo en el computador

1. Descargar o clonar este repositorio.
2. Abrir la carpeta en Visual Studio Code.
3. Instalar la extensión **Live Server** y hacer clic en "Go Live".

Se necesita conexión a internet porque three.js y la PokeAPI se cargan desde la web.
