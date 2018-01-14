$(document).ready(function() {
  $('.button-collapse').sideNav();
  // Trayendo la data de firebase
  var database = firebase.database();
  // Al escuchar el click se postea 
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
    $('.post-user').append('<div class="row"><div class="col s12 m12"><div class="card"><div class="card-image"><img src="' + post[i].foto + '"><span class="card-title"></span><a class="btn-floating halfway-fab waves-effect grey darken-3" id="' + post[i].id + '"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></div><div class="card-content"><h5>' + post[i].usuario + '</h5><p>' + post[i].message + '</p></div></div></div></div>');
    $('#' + post[i].id + '').on('click', function() {
      $(this).html(function(i, v) {
        return v === '<i class="fa fa-thumbs-up" aria-hidden="true"></i>' ? '<i class="fa fa-thumbs-down" aria-hidden="true"></i>' : '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      });
    });
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var showPost = firebase.database().ref('message');
      showPost.on('child_added', function(data) {
        $('.post-user').append('<div class="row box-post"><div class="col s12 m12 "><img class="responsive-img circle col s3 l1" src=' + data.val().photo + '><p>' + data.val().message + '<span class="right">' + data.val().time + '');
      });
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      if (photoURL === null) {
        $('.perfil').attr('src', '../assets/images/user.png');
      } else {
        $('.perfil').attr('src', photoURL);
      }     
      $('.profileName').text(displayName);
      $('#publish').on('click', function() {
        var time = moment().format('LT');
        var message = $('#post').val();
        console.log(message);
        if ($('#post').val().length > 0) {
          $('.post-user').prepend('<div class="row box-post"><div class="col s12 m12 "><img class="responsive-img circle col s3 l1" src=' + $('.perfil').attr('src') + '><p>' + $('#post').val() + ' <span class="right">' + time + '');
          $('#post').val('');
        }
        // Probando como se guarda la data en firebase de los post
        var message = {
          photo : photoURL,
          message: message,
          time: time
        };
        database.ref('message').push(message);
      });
      // ...
    } else {
      // User is signed out.
    }
  });
  // Cambiar foto de perfil
  var tablaBase = firebase.database().ref('images');
  $('#upload').change(function() {
    if (this.files && this.files[0]) {
      var archivo = new FileReader();
      archivo.onload = function(e) {
        tablaBase.push({
          urlLarge: e.target.result,
        });
        // visualizar imagen en la etiqueta img
        $('.perfil').attr('src', e.target.result);
      };
      archivo.readAsDataURL(this.files[0]);
    };
  });
  /* $('#publish-photo').change(function() {
    tablaBase.on('value', function(snapshot) {
      snapshot.forEach(function(e) {
        var objeto = e.val();
        if (objeto.url != null) {
          $('.post-user').append('<div class="row"><div class="col s12 m12"><div class="card"><div class="card-image"><img src="' + e.target.result + '"><span class="card-title"></span><a class="btn-floating halfway-fab waves-effect grey darken-3" id=""><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></div><div class="card-content"><h5></h5><p></p></div></div></div></div>');
        }
      });
    });
  });*/
  /* publish-photo').change(function() {
    if (this.files && this.files[0]) {
      var archivo = new FileReader();
      archivo.onload = function(e) {
        tablaBase.push({
          urlLarge: e.target.result,
        });
        // visualizar imagen en la etiqueta img
        $('.post-user-photo').append('<div class="row"><div class="col s12 m12"><div class="card"><div class="card-image"><img src="' + e.target.result + '"><span class="card-title"></span><a class="btn-floating halfway-fab waves-effect grey darken-3" id=""><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></div><div class="card-content"><h5></h5><p></p></div></div></div></div>');
      };
      archivo.readAsDataURL(this.files[0]);
    };
  });*/
});
