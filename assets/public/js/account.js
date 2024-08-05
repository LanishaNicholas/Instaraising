$(document).ready(function () {
    

    // Function to get the value of a specific query parameter from the URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Retrieve the query parameters and display them
    const orgname  = getQueryParam("orgname");
    const orglogo  = getQueryParam("orglogo");
    $("#orgname").text(orgname);
    $("#organizationnametext").text(orgname);
    $('#orglogo').prop('src', orglogo);
    $('#orgNamePay').val(orgname);


    sessionStorage.setItem('orgName', orgname);


    var firstName      = $('#firstName');
    var lastName       = $('#lastName');
    var mobileNumber   = $('#mobileNumber');
    var eMail          = $('#email');
    var add            = $('#address');
    var postalCode     = $('#postalCode');
    var postPlace      = $('#postPlace');
    var orgNamePay     = $('#orgNamePay');


    $('.payment-radio').click(function() {
        // Reset styles for all payment options
        $('.payment-option.cardpayment, .payment-option.paypalpayment').css({
          outline: '2px solid transparent',
          backgroundColor: '#f0f0f0'
        });
    
        // Apply the styles to the selected payment option
        if ($(this).is(':checked')) {
          $(this).closest('.payment-option').css({
            outline: '2px solid #28aef0',
            backgroundColor: '#f0f0f0'
          });
        }
    });

    firstName.on('focus', function(){
      firstName.removeClass('red-border');
      $(this).css('outline', 'none');
    });

    lastName.on('focus',function(){
        lastName.removeClass('red-border');
    });

    mobileNumber.on('focus',function(){
        mobileNumber.removeClass('red-border');
    });

    eMail.on('focus',function(){
        eMail.removeClass('red-border');
    });

    add.on('focus',function(){
        add.removeClass('red-border');
    });

    postalCode.on('focus',function(){
        postalCode.removeClass('red-border');
    });

    postPlace.on('focus',function(){
        postPlace.removeClass('red-border');
    });


    // $('.showAmountBtn').click(function(){
    //     event.preventDefault();
    //     console.log('enter here');
       
    //     $(".selectamount").slideToggle("slow");
    // });

    // $(".amountOptions input[type='radio']").on("click", function() {
    //     var selectedValue = $(this).val();
    //     console.log("Selected value: " + selectedValue);
    //     $('#amountselectedlabel').html(selectedValue);
    //     $('#amountDonated').val(selectedValue);
        
    // });

    $('.newamount').on('click', function (e) {
        event.preventDefault();
        var clickedAmount = $(this).data('amount');
        var language      = sessionStorage.getItem('selectedLanguage');

        if(language == 'en' ){
            // $('.dropbtn').text('€ ' +clickedAmount);
            $('#amountselectedlabel').html('Your contribution is € ' + clickedAmount);
        }else if(language == 'dk'){
            // $('.dropbtn').text(clickedAmount + ' DKK');
            $('#amountselectedlabel').html('Dit bidrag er ' + clickedAmount + ' DKK');
        }else if(language == 'is'){
            // $('.dropbtn').text(clickedAmount + ' ISK');
            $('#amountselectedlabel').html('Þátttakan þín er ' + clickedAmount + ' ISK');
        }else if(language == 'no'){
            // $('.dropbtn').text(clickedAmount + ' NOK');
            $('#amountselectedlabel').html('Ditt bidrag er ' + clickedAmount + ' NOK');
        }else if(language == 'sv'){
            // $('.dropbtn').text(clickedAmount + ' SEK');
            $('#amountselectedlabel').html('Ditt bidrag är ' + clickedAmount + ' SEK');
        }else if(language == 'fi'){
            $('#amountselectedlabel').html('Osallistumisesi on € ' + clickedAmount);
        }
        // $('.dropbtn').text(clickedAmount);
        
        $('#amountDonated').val(clickedAmount);
       
    });

    $('.dropbtn').on('click', function () {
        event.preventDefault();
        $(".dropdown-content").slideToggle();
    });

    // Hide the dropdown content when a new amount is clicked
    $(".newamount").on("click", function() {
        $(".dropdown-content").slideUp();
    });

   
});