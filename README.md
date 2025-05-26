# React Frontend - Expert Pancake

Este proyecto es un frontend en React que utiliza PrimeReact como librería de componentes UI. Permite gestionar productos y usuarios consumiendo una API REST.

## Requisitos
- Node.js 18 o superior
- npm 9 o superior

## Instalación
1. Clona el repositorio o descarga el código fuente.
2. Abre una terminal y navega a la carpeta `react_frontend`:
   ```sh
   cd react_frontend
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```

## Levantar el proyecto en modo desarrollo
```sh
npm run dev
```
Esto abrirá la aplicación en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

## Configuración de la API
El frontend espera que la API REST esté corriendo en:
- Productos: `http://localhost:3003/products`
- Usuarios: `http://localhost:3003/users`

Asegúrate de tener la API backend levantada y accesible en esas rutas.

## Scripts útiles
- `npm run dev` — Levanta el servidor de desarrollo con Vite.
- `npm run build` — Genera la build de producción.
- `npm run preview` — Previsualiza la build de producción localmente.

## Notas
- El proyecto utiliza PrimeReact para la UI y axios para las llamadas HTTP.
- Si cambias la URL de la API, actualiza los archivos en `src/services/ProductoService.js` y `src/services/UsuarioService.js`.

---

¡Listo! Ahora puedes comenzar a desarrollar o probar la aplicación.
