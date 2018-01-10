$(document).ready(function() {
// Trayendo la data de firebase
  var database = firebase.database();
  // Al escuchar el click se postea 
  $('#publish').on('click', function() {
    var time = moment().format('LT');
    var message = $('#post').val();
    console.log(message);
    if ($('#post').val().length > 0) {
      $('.post-user').prepend('<div class="row box-post"><div class="col s12 m12 "><img class="responsive-img circle col s3 l1" src=' + $('.perfil').attr('src') + '><p>' + $('#post').val() + ' <span class="right">' + time + '');
      $('#post').val('');
    }
    // Probando como se guarda la data en firebase de los post
    database.ref('post').push({
      message: message,
      time: time
    });
    database.ref('jaku').push({
      message: message,
      time: time
    });
  });
  // Recorriendo la data para los amigos
  $.each(data, function(i, item) {
    $('.friends').append('<li class="collection-item avatar buttons"><img src="' + data[i].foto + '" class="circle"><span class="title">' + data[i].nombre + '</span><button class="btn waves-effect waves-light right" id="' + data[i].id + '" type="submit" name="action">Eliminar</button><p>' + data[i].edad + ' <br>' + data[i].actividades + '</p></li>');
    // Boton que cambia de estado de amistad
    $('#' + data[i].id + '').on('click', function() {
      $(this).text(function(i, v) {
        return v === 'Eliminar' ? 'Añadir' : 'Eliminar';
      });
    });
  });
  // Recorriendo la data para sugerencias 
  $.each(sugerencias, function(i, item) {
    $('.suggestions').append('<li class="collection-item avatar buttons"><img src="' + sugerencias[i].foto + '" class="circle"><span>' + sugerencias[i].nombre + '</span><button class="btn waves-effect waves-light right" id="' + sugerencias[i].id + '" type="submit" name="action">Seguir</button></li>');
    // Boton que cambia de estado la sugerencia
    $('#' + sugerencias[i].id + '').on('click', function() {
      $(this).text(function(i, v) {
        return v === 'Seguir' ? 'Siguiendo' : 'Seguir';
      });
    });
  });
  $.each(post, function(i, item) {
    $('.post-user').append('<div class="row"><div class="col s12 m12"><p><b>' + post[i].usuario + '</b></p><p>' + post[i].message + '</p><div class="center"><img src="' + post[i].foto + '" alt="" class="responsive-img"></div></div></div>');
  });

  
});