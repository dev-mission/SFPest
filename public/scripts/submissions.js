$(function() {
  $('select[name="what"]').change(function() {
    if ($('select[name="what"]').val() == 'other') {
      $('#other').show();
    } else {
      $('#other').hide();
      $('input[name="other"]').val('');
    }
  });
  const cleave = new Cleave('input[name="phone"]', {
    phone: true,
    phoneRegionCode: 'us'
  });
});
