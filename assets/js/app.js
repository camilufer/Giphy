`use strict`
//Recorremos la data y le pedimos que nos imprima las imágenes que corresponden a la palabra ingresada en el input; y que añada un enlace a la pagina web donde está la imagen.
$(document).ready(function () {
    var dibujarGifs = function(data){
      var gif = "";
      var url = "";
      data.forEach(function(element){
        gif = element.images.downsized_large.url;
        url = element.bitly_gif_url;
      $("#elementos").append(armarTemplate(gif , url));
      });
    }
//acá armamos la estructura que se mostrará en HTML, con los datos que solicitamos arriba.
    var armarTemplate = function(gif,url){
      var t = "<div class='elemento'><img src='" + gif + "'/><a href='"+ url +"'>Ver más</a></div>"
      return t;
    }
//Hacemos el llamado a Ajax, en url:ponemos la dirección de la página donde buscaremos las imágenes.el type: es GET para obtener datos, datatype:es el tipo de dato que se espera como respuesta, data: es la información que me debe enviar.
    var ajaxGif = function(gif){
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search',
            type: 'GET',
            datatype: 'json',
            data : {
                q : gif,
                api_key : 'dc6zaTOxFJmzC'
            }
        })
        .done(function(response){
            console.log(response);
            dibujarGifs(response.data);
        })
        .fail(function() {
            console.log("error");
        });
    }
//al hacer click en el botón buscar-gif se mostrará un mensaje en la consola, se limpiará el contenedor donde se pondrán las imágenes si está ocupado.Guardará el valor obtenido en el input en una variable y ese valor será pasado a la función que hace el llamado Ajax.
    $("#buscar-gif").click(function(event) {
        console.log("Entro");
        $("#elementos").empty();
        var gif = $("#gif-text").val();
        ajaxGif(gif);
    })
});

