# Proyecto Videojuego en JS usando el framework Phaser 3

El proyecto consiste en un videojuego como bien se menciona en el titulo el cual a sido desarrollado haciendo uso del framework Phaser 3, el cual se trata de un framework de desarrollo enfocado en programar, principamente, videojuegos en 2D en JavaScript o TypeScript.

Para poder desplegar el proyecto en nuestro equipo, ya que por el momento no esta pensado para un despliegue para acceder desde internet, se debe tener instalado Node.js, ya que es necesario para instalar las dependencias y ejecutar los scripts a traves de `npm`.

Asegurandonos de que tenemos Node.js instalado, se ejecutaran los siguientes comandos desde adentro de la carpeta ***juego-sonic*** (Si se ejecutan los comandos fuera de esta carpeta es posible que salten errores ademas de no funcionar el proyecto):

1º `npm install`

2º `npm run build`

3º `npm run dev`

Tras ejecutar los comandos anteriormente mencionados, se iniciara un servidor web el cual por defecto se ejecutara en `http://localhost:8080`, pudiendo acceder al videojuego desde un navegador web.

El puerto se puede cambiar desde la configuracion de vite en ***/vite/config.dev.mjs***

## Estructura del proyecto
El proyecto esta estructurado de la siguiente manera:

```
juego-sonic/
├── public/
│   ├── assets/
│       ├── mapa/               # Mapa del juego en formato JSON
│       ├── music/              # Musica del juego
│       ├── tiles/              # Imagenes de los tiles del mapa ("bloques" que forman el mapa)
│       ├── fondo.png           # Imagen del fondo del juego
│       ├── player.png          # spritesheet para el jugador y sus animaciones
│       ├── Game_Over.png       # Imagen de pantalla de Game Over
│       ├── Win.png             # Imagen de escena de ¿victoria?
│       ├── master_emerald.png  # Imagen de la Master Emerald para la meta
|
├── src/
│   ├── character/              # Carpeta con las clases de los personajes
|   ├── scenes/                 # Carpeta con las escenas del juego
|   |   ├── Boot.js            
|   |   ├── Game.js             # Escena principal del juego
|   |   ├── GameOver.js         # Escena de Game Over
|   |   ├── Win.js              # Escena de victoria
|   |
|   ├── utils/                  # Carpeta para funciones de debug y test
|   ├── main.js                 # Archivo principal que inicia el juego
|
├── index.html                  # Archivo HTML principal de la aplicación