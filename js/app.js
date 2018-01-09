// Cargando documento con el logo
$(document).ready(function() {
  $('.loader').delay(3000).fadeOut(100, function() {
    window.location.assign('views/signup.html');
  });
});