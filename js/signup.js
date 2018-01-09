$(document).ready(function() {
  $('.modal').modal();
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
  $('#login').on('click', function() {
    var email2 = $('#email2').val();
    var password2 = $('#password2').val();
    firebase.auth().signInWithEmailAndPassword(email2, password2)
      .then(function() {
        $(location).attr('href', 'view-3.html');
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
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        appears();
        console.log('existe usuario activo');
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
      }
    });
  }
  watcher();
  function appears() {
    var content = $('.content');
    content.html('<p>Bienvenido<p/><button class="waves-effect waves-light btn cyan accent-2" id="logout">Cerrar Sesión</button>');
    $('#logout').on('click', function() {
      firebase.auth().signOut()
        .then(function() {
          $(location).attr('href', 'signup.html');
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#btnGoogle').on('click', function() {
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        $(location).attr('href', 'view-3.html');
        $('.content').append('<img src=\'' + result.user.photoURL + '\'/>');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  });
}); 