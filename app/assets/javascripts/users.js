$(document)ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for form submissions
  $("#form-submit-btn").click(function(event) {
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    if (!error) {
      //Get stripe token
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        expYear: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); //Form submission
  
  function stripeResponseHandler(ststus, response) {
    //Get reference to the form
    var f = $("#new_user");
    
    //Get token from response
    var token = response.id;
    
    //Add token to form
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    
    //Submit the form
    f.get(0).submit();
  }
});