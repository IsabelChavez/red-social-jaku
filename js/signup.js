$(document).ready(function() {
  // Para mostar el modal de registro
  $('.modal').modal();
  // Funcion registar nuevo usuarion para guardar en firebase
  $('#register').on('click', function() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        alert('Registro realizado');
      })
      .catch(function(error) {
        // Handle Errors here.
        alert('Ingrese correo y contraseña valido');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });
  // Funcion para que ingrese usuario una vez registrado
  $('#login').on('click', function() {
    var email2 = $('#email2').val();
    var password2 = $('#password2').val();
    firebase.auth().signInWithEmailAndPassword(email2, password2)
      .then(function() {
        $(location).attr('href', 'view-3.html');
        $('.perfil').attr('src', '../assets/images/foto1.jpg');
      })
      .catch(function(error) {
        alert('Ingrese correo y contraseña valido o Regístrese');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  });
  // Funcion de seguimiento para ver usuario conectado 
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        appears();
        console.log('existe usuario activo');
        var usuarios = {      
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        };
        firebase.database().ref('jaku/' + user.uid).set(usuarios);
        // ...
      } else {
        // User is signed out.
      }
    });
  }
  watcher();
  // Funcion para pasar a la siguiente vista una vez confirmado usuario activo 
  function appears() {
    var content = $('#log-out');
    content.html('<a href="#" id="logout"><i class="large material-icons">power_settings_new</i></a>');
    $('#logout').on('click', function() {
      firebase.auth().signOut()
        .then(function() {
          $(location).attr('href', 'signup.html');
          var email2 = $('#email2').val('');
          var password2 = $('#password2').val('');
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  // Para ingresar con Google 
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#btnGoogle').on('click', function() {
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        $(location).attr('href', 'view-3.html');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  });
}); 