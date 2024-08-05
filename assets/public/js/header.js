$(document).ready(function(){
   
    var   irnewsletter      = $("#irnewsletter");
    const irsubscription    = $(".irsubscription");
    var language            = sessionStorage.getItem('selectedLanguage');
    
    /** Newsletter subscription modified 12/12/23 */
    irsubscription.click(async function() {
        event.preventDefault();
        var newsletter   = irnewsletter.val();
        $.ajax({
            url: 'http://127.0.0.1:5000/subscribe-newsletter',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: newsletter }),
            dataType: 'json',
            success: function(responseData) {
                // Success logic
                let successMessage = "Thanks for subscribing to our newsletter! ✉️";
                if (language === "no") {
                    successMessage = "Takk for at du abonnerte på nyhetsbrevet vårt! ✉️";
                } else if (language === "sv") {
                    successMessage = "Tack för att du prenumererade på vårt nyhetsbrev! ✉️";
                } else if (language === "dk") {
                    successMessage = "Tak fordi du tilmeldte dig vores nyhedsbrev! ✉️";
                } else if (language === "fi") {
                    successMessage = "Kiitos kun tilasit uutiskirjeemme! ✉️";
                } else if (language === "is") {
                    successMessage = "Þakka þér fyrir að áskrifast fréttabréf okkar! ✉️";
                } else if (language === "de") {
                    successMessage = "Danke für das Abonnieren unseres Newsletters! ✉️";
                }
    
                ms.Notification({
                    type: "success",
                    message: successMessage
                });
            },
            error: function(error) {
                // Error logic
                let errorMessage = "Subscription failed. Please try again. 🚫";
                if (language === "no") {
                    errorMessage = "Abonnement feilet. Prøv igjen. 🚫";
                } else if (language === "sv") {
                    errorMessage = "Prenumeration misslyckades. Försök igen. 🚫";
                } else if (language === "dk") {
                    errorMessage = "Abonnement mislykkedes. Prøv igen. Försök igen. 🚫";
                } else if (language === "fi") {
                    errorMessage = "Tilaus epäonnistui. Yritä uudelleen. 🚫";
                } else if (language === "is") {
                    errorMessage = "Áskrift mistókst. Reynið aftur. 🚫";
                }
    
                ms.Notification({
                    type: "error",
                    message: errorMessage
                });
            }
        });
        
    });


    // JavaScript to add shadow when scrolling
    window.addEventListener("scroll", function() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 0) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });


    //new cookie setting------------ modified 05/02/2024

    const hasAcceptedCookies    = sessionStorage.getItem("cookieConsentAccepted");
    const overlay               = document.getElementById("overlay");
    const necessaryCookie       = sessionStorage.getItem("necessaryCheckbox");

    

    // Hide the popup and overlay
    function hideCookie() {
        overlay.style.display = "none";
        $("#cookieConsent").hide();
    }
     

    if (hasAcceptedCookies == "true" || necessaryCookie == "true") {
        hideCookie();
    }else{
        console.log('on reload');
        overlay.style.display = "block";
        $("#cookieConsent").show();
    }

    $("#customizeBtn").click(function () {
        $(".customizecookie").toggleClass("d-none");
        $("#cookieConsent").hide();
    });

   

    //Button click - Accept
    $('#acceptBtn').click(function(){
        sessionStorage.setItem("cookieConsentAccepted", "true");
        sessionStorage.setItem("marketingCookie", "true");
        hideCookie();
        // location.reload();
    });

    //Button click - save and close
    $('#saveAndCloseCookies').click(function(){
        
        var necessaryCheckboxChecked = $("#necessaryCheckbox").prop("checked");
        var marketingCheckBoxChecked = $("#marketingCheckBox").prop("checked");

        if(marketingCheckBoxChecked == false){
            sessionStorage.setItem("marketingCookie", "false");
        }else{
            sessionStorage.setItem("marketingCookie", "true");
        }

        sessionStorage.setItem("cookieConsentAccepted", "true");
        sessionStorage.setItem("necessaryCheckbox", "true");
        
        $('.customizecookie').hide();
        overlay.style.display = "none";

        location.reload();

    });

    //Reject button
    $('#rejectBtn').click(function(){
        sessionStorage.setItem("marketingCookie", "false");
        sessionStorage.setItem("cookieConsentAccepted", "false");
        sessionStorage.setItem("necessaryCheckbox", "true");

        hideCookie();
    });

    //Read more button click
    $('#readMorePrivacy').click(function(){

        var language = sessionStorage.getItem("selectedLanguage");
        window.location.href = '../../views/'+ language +'/privacy.html';
    });

    // Check if the session variable 'marketingCookie' is true
    if (sessionStorage.getItem('marketingCookie') === 'true') {
        // console.log('from about us page');
        // Add Google Tag script dynamically
        var googleTagScript = document.createElement('script');
        googleTagScript.async = true;
        googleTagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-DP9EN5F8S3';
        document.head.appendChild(googleTagScript);

        // Add Google Tag configuration dynamically
        var googleTagConfig = document.createElement('script');
        googleTagConfig.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DP9EN5F8S3');";
        document.head.appendChild(googleTagConfig);

        // Add Meta Pixel Code dynamically
        var metaPixelScript = document.createElement('script');
        metaPixelScript.innerHTML = "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '297517359558547');fbq('track', 'PageView');";
        document.head.appendChild(metaPixelScript);

        // Add Meta Pixel Code noscript dynamically
        var metaPixelNoscript = document.createElement('noscript');
        metaPixelNoscript.innerHTML = "<img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=297517359558547&ev=PageView&noscript=1'/>";
        document.head.appendChild(metaPixelNoscript);
    }
 
});