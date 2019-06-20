$(function() {
  $('#register__login').click(function() {
    $('#register').hide();
    $('#login').show();
    return false;
  });
  $('#login__register').click(function() {
    $('#login').hide();
    $('#register').show();
    return false;
  });
});
