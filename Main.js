"use strict";

/*
    API KEY
*/
let apiKey;

apiKey = "S1rWcAYPIZ6YIqrY5n17gyL3lxwTmGfy";

/*
    EVENTO BOTON BUSCAR
*/
$("#buscar").click(async function (evt) {
  /*
        EVITAR RECARGA
    */
  evt.preventDefault();

  /*
        GUARDAR CIUDAD INPUT
    */
  let ciudad;

  ciudad = $("#localidad").val();

  /*
        LIMPIAR CONTENIDO
    */
  $("#listaCiudades").empty();

  $("#infoCiudad").empty();

  $("#tiempoActual").empty();

  $("#forecast").empty();

  try {
    /*
            FETCH CIUDADES
        */
    let respuesta;

    respuesta = await fetch(
      "https://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=" +
        ciudad,
    );

    /*
            CONVERTIR JSON
        */
    let datos;

    datos = await respuesta.json();

    /*
            RECORRER CIUDADES
        */
    for (let i = 0; i < datos.data.length; i++) {
      /*
                CREAR LI
            */
      let li;

      li = $("<li></li>");

      /*
                TEXTO LI
            */
      li.text(datos.data[i].city + " - " + datos.data[i].country);

      /*
                CLICK CIUDAD
            */
      li.click(function () {
        /*
                    LATITUD Y LONGITUD
                */
        let latitud;

        let longitud;

        latitud = datos.data[i].latitude;

        longitud = datos.data[i].longitude;

        /*
                    INFORMACION CIUDAD
                */
        $("#infoCiudad").html(
          "<h2>" +
            datos.data[i].city +
            "</h2>" +
            "<p><strong>País:</strong> " +
            datos.data[i].country +
            "</p>" +
            "<p><strong>Región:</strong> " +
            datos.data[i].region +
            "</p>" +
            "<p><strong>Población:</strong> " +
            datos.data[i].population +
            "</p>",
        );

        /*
                    CONSULTA REALTIME CON AJAX
                */
        $.ajax({
          url:
            "https://api.tomorrow.io/v4/weather/realtime?location=" +
            latitud +
            "," +
            longitud +
            "&apikey=" +
            apiKey +
            "&units=metric",

          method: "GET",

          /*
                        SUCCESS AJAX
                    */
          success: function (respuestaTiempo) {
            /*
                            WEATHER CODE
                        */
            let codigoTiempo;

            codigoTiempo = respuestaTiempo.data.values.weatherCode;

            /*
                            ICONO TIEMPO
                        */
            let icono;

            /*
                            CAMBIAR ICONO
                        */
            if (codigoTiempo === 1000) {
              icono = "☀️";
            } else if (codigoTiempo >= 1100 && codigoTiempo <= 1102) {
              icono = "⛅";
            } else if (codigoTiempo >= 4000 && codigoTiempo <= 4201) {
              icono = "🌧️";
            } else {
              icono = "☁️";
            }

            /*
                            LLUVIA
                        */
            let lluvia;

            lluvia = respuestaTiempo.data.values.rainIntensity;

            /*
                            TEXTO LLUVIA
                        */
            let textoLluvia;

            if (lluvia > 0) {
              textoLluvia = "Sí - Intensidad: " + lluvia;
            } else {
              textoLluvia = "No";
            }

            /*
                            MOSTRAR TIEMPO
                        */
            $("#tiempoActual").html(
              "<h3>Tiempo Actual</h3>" +
                "<p><strong>Estado:</strong> " +
                icono +
                "</p>" +
                "<p><strong>Temperatura:</strong> " +
                respuestaTiempo.data.values.temperature +
                " ºC</p>" +
                "<p><strong>Humedad:</strong> " +
                respuestaTiempo.data.values.humidity +
                "%</p>" +
                "<p><strong>Lluvia:</strong> " +
                textoLluvia +
                "</p>",
            );
          },

          /*
                        ERROR AJAX
                    */
          error: function () {
            $("#tiempoActual").html(
              "<p class='error'>No se pudo obtener el tiempo actual</p>",
            );
          },
        });

        /*
                    CONSULTA FORECAST CON AXIOS
                */
        axios
          .get(
            "https://api.tomorrow.io/v4/weather/forecast?location=" +
              latitud +
              "," +
              longitud +
              "&apikey=" +
              apiKey +
              "&units=metric",
          )

          /*
                    SUCCESS AXIOS
                */
          .then(function (forecast) {
            /*
                        DATOS FORECAST
                    */
            let datosForecast;

            datosForecast = forecast.data.timelines.hourly;

            /*
                        PRIMERA PREVISION
                    */
            let primera;

            primera = datosForecast[0];

            /*
                        ULTIMA PREVISION
                    */
            let ultima;

            ultima = datosForecast[datosForecast.length - 1];

            /*
                        ICONO PRIMERA PREVISION
                    */
            let iconoPrimera;

            if (primera.values.weatherCode === 1000) {
              iconoPrimera = "☀️";
            } else if (
              primera.values.weatherCode >= 1100 &&
              primera.values.weatherCode <= 1102
            ) {
              iconoPrimera = "⛅";
            } else if (
              primera.values.weatherCode >= 4000 &&
              primera.values.weatherCode <= 4201
            ) {
              iconoPrimera = "🌧️";
            } else {
              iconoPrimera = "☁️";
            }

            /*
                        ICONO ULTIMA PREVISION
                    */
            let iconoUltima;

            if (ultima.values.weatherCode === 1000) {
              iconoUltima = "☀️";
            } else if (
              ultima.values.weatherCode >= 1100 &&
              ultima.values.weatherCode <= 1102
            ) {
              iconoUltima = "⛅";
            } else if (
              ultima.values.weatherCode >= 4000 &&
              ultima.values.weatherCode <= 4201
            ) {
              iconoUltima = "🌧️";
            } else {
              iconoUltima = "☁️";
            }

            /*
                        LLUVIA PRIMERA
                    */
            let lluviaPrimera;

            if (primera.values.rainIntensity > 0) {
              lluviaPrimera = "Sí";
            } else {
              lluviaPrimera = "No";
            }

            /*
                        LLUVIA ULTIMA
                    */
            let lluviaUltima;

            if (ultima.values.rainIntensity > 0) {
              lluviaUltima = "Sí";
            } else {
              lluviaUltima = "No";
            }

            /*
                        MOSTRAR FORECAST
                    */
            $("#forecast").html(
              "<h3>Forecast</h3>" +
                "<p><strong>Primera previsión</strong></p>" +
                "<p>Estado: " +
                iconoPrimera +
                "</p>" +
                "<p>Hora: " +
                primera.time +
                "</p>" +
                "<p>Temperatura: " +
                primera.values.temperature +
                " ºC</p>" +
                "<p>Lluvia: " +
                lluviaPrimera +
                "</p>" +
                "<hr>" +
                "<p><strong>Última previsión</strong></p>" +
                "<p>Estado: " +
                iconoUltima +
                "</p>" +
                "<p>Hora: " +
                ultima.time +
                "</p>" +
                "<p>Temperatura: " +
                ultima.values.temperature +
                " ºC</p>" +
                "<p>Lluvia: " +
                lluviaUltima +
                "</p>",
            );
          })

          /*
                    ERROR AXIOS
                */
          .catch(function () {
            $("#forecast").html(
              "<p class='error'>No se pudo obtener la previsión</p>",
            );
          });
      });

      /*
                AÑADIR LI
            */
      $("#listaCiudades").append(li);
    }
  } catch (error) {
    /*
            ERROR FETCH
        */
    $("#listaCiudades").html("<li class='error'>Error cargando ciudades</li>");
  }
});
