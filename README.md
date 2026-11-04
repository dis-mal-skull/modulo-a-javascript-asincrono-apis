# Módulo A · JavaScript asíncrono y consumo de APIs

Material educativo para SENA ADSO, módulo Procesamiento de datos. Instructor: **Julian Salazar Pineda**.

## Requisitos y ejecución

- Node.js 20 o superior, sin `npm install`.
- `npm start` y abrir `http://localhost:5500`.
- Alternativa: `php -S localhost:5500` con PHP 8+.
- Live Server funciona para páginas estáticas, pero no implementa por sí solo `POST /test.php`.
- No abras las páginas con `file://`: los módulos ES y las solicitudes necesitan un servidor.

## Ruta de aprendizaje

| Página | Concepto |
|---|---|
| `01-asincronia.html` | setTimeout, event loop, callbacks y callback hell |
| `02-xhr.html` | XMLHttpRequest, readyState y FormData |
| `03-promesas.html` | pending, then, catch y finally |
| `04-fetch.html` | JSON, `response.ok`, timeout y AbortController |
| `05-post-formdata.html` | POST, validación y texto plano |
| `06-paises.html` | snapshot de países, filtro, detalle e historial |

## Ejercicios

- **Criptomonedas:** CoinGecko, búsqueda, orden, USD/COP/EUR, caché, fallback, modal y sparkline.
- **TRM:** Socrata `32sa-8pi3`, períodos, estadísticas, gráfica SVG, variaciones y descarga CSV.

## APIs y respaldos

- CoinGecko: `https://api.coingecko.com/api/v3/coins/markets`.
- Tasa de cambio: `https://open.er-api.com/v6/latest/USD`.
- TRM: `https://www.datos.gov.co/resource/32sa-8pi3.json`.
- JSONPlaceholder: `https://jsonplaceholder.typicode.com/users/1`.
- REST Countries v3.1 fue retirada; `data/paises.json` conserva un snapshot compatible.
- Los snapshots locales contienen 250 países, 50 criptomonedas y 500 registros TRM.
- Para regenerarlos: `node scripts/generate-data.mjs`.

## Contrato de prueba

`POST /test.php` acepta `num1`, `num2`, `nombre`, `correo` y `mensaje`. Devuelve texto plano con operaciones matemáticas o el resumen del formulario. En Vercel, las demos usan `/api/test`, equivalente serverless.

## Decisiones de implementación

HTML5, CSS3 y JavaScript ES2022 sin frameworks ni dependencias npm. Las utilidades compartidas viven en `assets/js/core`; cada página tiene un módulo propio. Los datos externos se renderizan con nodos DOM y `textContent`, con fallback local ante errores. La interfaz usa `es-CO`, superficies claras, verde teal, consola oscura, estados de carga y controles accesibles.

## Despliegue en Vercel

El sitio es estático y `api/test.js` proporciona el endpoint serverless para formularios. `vercel.json` configura la salida estática. El despliegue productivo está publicado en el proyecto de Vercel asociado.

## Solución de problemas

| Problema | Solución |
|---|---|
| Puerto ocupado | `PORT=5501 npm start` o cambia `PORT` en PowerShell |
| API sin respuesta | La interfaz usa el snapshot local y muestra un aviso |
| PHP no responde | Usa `npm start` o inicia `php -S localhost:5500` |
| No cargan módulos | Comprueba que abriste una URL HTTP, no `file://` |
| CoinGecko limita solicitudes | Espera el caché o usa el respaldo local |
