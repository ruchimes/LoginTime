<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Last Login Time

Aplicación para la visualización de cuanto tiempo hace desde el último login del usuario 
[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Explicación

He realizado el desarrollo de la aplicación utilizando lit-element porque es la tecnología web con la que más cómodo me siento actualmente y porque creo que los web components aportan una versatilidad, reusabilidad y facilidad de desarrollo a los proyectos que no debe ser obviada.

He utilizado la plantilla de open-wc porque aparte de lit-element incluye varias herramientas extras para la realización de aplicaciones, como son rollup para realizar el build, storyboard para realizar las demos, service worker para implementar PWA, linter...

Al tratarse más de una prueba de concepto que de una aplicación real, algunas funcionalidades no están del todo pulidas y tengo que revisarlas. Una de ellas tiene que ver con el caché de algunos archivos estáticos que realiza el service worker por defecto que incluye open-wc.

El back donde almaceno los usuarios que se registran y usan la aplicación lo he realizado con localStorage por hacerlo todo lo más sencillo posible y no tener que ponerme a levantar servidores con bases de datos locales. 

## Modo de uso

Para levantar la aplicacion y utilizarla, se deben seguir los siguientes pasos:

- Clonar el repositorio
- `npm install`
- `npm run start` si se desea lanzar la app en un entorno de desarrollo, pero sin las funcionalidades PWA
- `npm run start:build` si se desea ver la app en un entorno más de despliegue, y comprobar las funcionalidades de PWA
 
## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
