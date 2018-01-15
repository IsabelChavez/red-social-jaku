$(document).ready(function() {
  // Para el modal de perfil de usuario
  $('.button-collapse').sideNav();
  // Trayendo la data de firebase
  var database = firebase.database();
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
  // Recorre la data creada para mostrar en la presentación
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
      // Mostrando la data de firebase para el newsfeed en tiempo real 
      var showPost = firebase.database().ref('message');
      showPost.on('child_added', function(data) {
        $('.post-user').prepend('<div class="row box-post"><div class="col s12 m12 "><img class="responsive-img circle col s3 l1" src=' + data.val().photo + '><p>' + data.val().message + '<span class="right">' + data.val().time + '');
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
      // Al escuchar el click se postea 
      $('#publish').on('click', function() {
        var time = moment().format('LT');
        var message = $('#post').val();
        if ($('#post').val().length > 0) {
          var message = {
            photo: photoURL,
            message: message,
            time: time
          };
          database.ref('message').push(message);
          $('#post').val('');
        }
      });
      // Guardar informacion de usuario en la data al actualizar
      $('#save-profile').on('click', function() {
        var interests = $('#mdinterests').val();
        var age = $('#mdage').val();
        var weight = $('#mdweight').val();
        var height = $('#mdheight').val();
        var training = $('#mdtraining').val();
        var personalData = {
          user: uid,
          interests: interests,
          age: age,
          weight: weight,
          height: height,
          training: training,
        };
        database.ref('personalData/' + user.uid).set(personalData);
        $('#interests').text(interests);
        $('#age').text(age);
        $('#weight').text(weight);
        $('#height').text(height);
        $('#training').text(training);
      });
      // Mostrar la data guardada de actualizacion de datos
      var showPersonalData = firebase.database().ref('personalData');
      showPersonalData.on('child_added', function(data) {
        if (user.uid === data.val().user) {
          $('#interests').text(data.val().interests);
          $('#age').text(data.val().age);
          $('#weight').text(data.val().weight);
          $('#height').text(data.val(). height);
          $('#training').text(data.val().training);
        }
      });
      // Subir fotos a la base de datos
      $('#uploadPhoto').change(function() {
        var time = moment().format('LT');
        if (this.files && this.files[0]) {
          var archivo = new FileReader();
          archivo.onload = function(e) {
            $('#publishPhoto').on('click', function() {
              tablaBase.push({
                photo: photoURL,
                urlLarge: e.target.result,
                time: time
              });    
            });
          };
        };
        archivo.readAsDataURL(this.files[0]);
      });
      // Mostar las imagenes subidas a la base de datos 
      var showPost = firebase.database().ref('images');
      showPost.on('child_added', function(data) {
        $('.post-user').prepend('<div class="row box-post"><div class="col s12 m12 "><img class="responsive-img circle col s3 l1" src=' + data.val().photo + '><img class="responsive-img  col s6 l8" src=' + data.val().urlLarge + '><span class="right">' + data.val().time + '');
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
  $('#enviar').on('click', function () {
    imc()
  })
  // funcion para calcular el indice de masa corporal
  function imc() {
    var sexo = document.formulario.sexo.value;
    var sexo1 = document.formulario.sexo1.value;
    var a = document.formulario.altura.value;
    var p = document.formulario.peso.value;
    var calculo = (p / Math.pow(a, 2)).toFixed(2);

    if (sexo === 'M') {
      if (calculo < 20.7) {
        document.querySelector("[name='resultado']").textContent = ('Bajo de peso con IMC de: ' + calculo);
      } else if (calculo >= 20.7 && calculo < 26.4) {
        document.querySelector("[name='resultado']").textContent = ('Peso normal con IMC de: ' + calculo);
      } else if (calculo >= 26.4 && calculo < 27.8) {
        document.querySelector("[name='resultado']").textContent = ('Sobrepeso con IMC de: ' + calculo);
      } else if (calculo >= 27.8 && calculo < 32.3) {
        document.querySelector("[name='resultado']").textContent = ('Obesidad con IMC de: ' + calculo);
      } else if (calculo >= 32.3) {
        document.querySelector("[name='resultado']").textContent = ('Obesidad grave con IMC de: ' + calculo);
      }
    }
    if (sexo1 === 'F') {
      if (calculo < 19.1) {
        document.querySelector("[name='resultado']").textContent = ('Bajo de peso con IMC de: ' + calculo);
      } else if (calculo >= 19.1 && calculo < 25.8) {
        //alert("Peso normal com IMC de " + calculo);
        document.querySelector("[name='resultado']").textContent = ('Peso normal con IMC de:  ' + calculo);
      } else if (calculo >= 25.8 && calculo < 27.3) {
        document.querySelector("[name='resultado']").textContent = ('Sobrepeso con IMC de: ' + calculo);
      } else if (calculo >= 27.3 && calculo < 31.1) {
        document.querySelector("[name='resultado']").textContent = ('Obesidad con IMC de: ' + calculo);
      } else if (calculo >= 31.1) {
        document.querySelector("[name='resultado']").textContent = ('Obesidad grave com IMC de: ' + calculo);
      }
    }
  }
});
