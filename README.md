# 🌦️ El Tiempo con Tomorrow API

Aplicación web desarrollada para la asignatura de Desarrollo Web en Entorno Cliente (DWEC).

## Descripción

La aplicación permite buscar ciudades mediante la API GeoDB Cities y consultar información meteorológica utilizando Tomorrow API.

El usuario puede introducir el nombre de una población, seleccionar una ciudad de la lista de resultados y visualizar información detallada sobre ella junto con datos meteorológicos actuales y previsiones futuras.

## Funcionalidades

- Búsqueda de ciudades mediante GeoDB Cities.
- Visualización de:
  - País.
  - Región.
  - Población.
- Consulta meteorológica en tiempo real:
  - Temperatura actual.
  - Humedad.
  - Estado del tiempo mediante iconos.
  - Información sobre lluvia e intensidad.
- Consulta de previsiones meteorológicas:
  - Primera previsión disponible.
  - Última previsión disponible.
  - Temperatura prevista.
  - Estado meteorológico mediante iconos.
  - Información sobre lluvia.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6
- jQuery
- Fetch API
- AJAX (jQuery)
- Axios
- Async/Await
- APIs REST
- JSON

## APIs utilizadas

### GeoDB Cities

Utilizada para buscar ciudades y obtener información geográfica.

https://geodb-cities-api.wirefreethought.com/

### Tomorrow API

Utilizada para obtener información meteorológica en tiempo real y previsiones.

https://www.tomorrow.io/

## Estructura de la aplicación

La interfaz se divide en tres zonas:

### Panel izquierdo
- Campo de búsqueda.
- Botón de búsqueda.

### Panel central
- Listado de ciudades encontradas.

### Panel derecho
- Información de la ciudad seleccionada.
- Tiempo actual.
- Previsión meteorológica.

## Objetivos de aprendizaje

Este proyecto ha servido para practicar:

- Consumo de APIs REST.
- Manejo de datos JSON.
- Programación asíncrona con Async/Await.
- Uso de Fetch API.
- Uso de AJAX con jQuery.
- Uso de Axios.
- Manipulación dinámica del DOM.
- Gestión de errores en peticiones HTTP.

## Autor

Proyecto realizado como práctica de Desarrollo Web en Entorno Cliente (DWEC).
