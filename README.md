# Country Vue App

## Descripción

Este proyecto es una aplicación CRUD para el servicio web [https://countries.trevorblades.com/](https://countries.trevorblades.com/). Utiliza GraphQL para mostrar información de países en una tabla que incluye los siguientes datos:

- Nombre del país
- Código de país
- Capital
- Continente
- Moneda

La aplicación permite filtrar los países por nombre o código. Además, cuenta con una columna de acciones que permite ver el detalle de las provincias de un país, si es que el país tiene provincias.

La aplicación está desarrollada utilizando la Composition API de Vue.js y se han implementado tests unitarios con Vitest.

## Instalación y Ejecución

Para ejecutar la aplicación localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ingcruzco/country-vue.git
   ```
2. Cambiar de carpeta:
   ```bash
   cd country-vue
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```
5. Abre tu navegador y dirigete a http://localhost:5173/ para ver la aplicación en acción.

## Ejecución de Tests

Para ejecutar los tests unitarios y generar un reporte de cobertura, utiliza el siguiente comando:

```bash
npm run test
```

Esto ejecutará los tests y generará un reporte de cobertura que te permitirá verificar la calidad y cobertura del código.

## Tecnologías

- **Vue.js**: Utilizado con la Composition API para el desarrollo de la aplicación.
- **GraphQL**: Para las consultas de datos del servicio web.
- **Vitest**: Para las pruebas unitarias y cobertura de código.
