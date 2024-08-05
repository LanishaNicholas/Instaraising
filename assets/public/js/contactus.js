$(document).ready(function () {
    var contactBtn = $('.submit-btn');
    var language = sessionStorage.getItem('selectedLanguage') || 'en';
    console.log(language);
    contactBtn.on('click', async function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const phone = $('#phone').val();
        const email = $('#email').val();
        const message = $('#message').val();
        var privacyCheckbox = $("#privacy-policy");
        var newsletterbox = $("#subscribe-newsletter");

        if (name && phone && email && message && privacyCheckbox.is(":checked")) {
            // Submit contact form
            try {
                const contactResponse = await fetch('http://127.0.0.1:5000/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, phone, email, message })
                });

                if (contactResponse.ok) {
                    // Clear the form fields and checkboxes
                    $('#name, #phone, #email, #message').val('');
                    privacyCheckbox.prop("checked", false);
                    newsletterbox.prop("checked", false);

                    ms.Notification({
                        type: "success",
                        message: getSuccessMessage(language)
                    });

                    // Subscribe to newsletter if checked
                    if (newsletterbox.is(":checked")) {
                        try {
                            const newsletterResponse = await fetch('http://127.0.0.1:5000/subscribe-newsletter', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ email })
                            });

                            if (!newsletterResponse.ok) {
                                console.log('Failed to sign up for newsletter.');
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                } else {
                    ms.Notification({
                        type: "error",
                        message: getErrorMessage(language)
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                ms.Notification({
                    type: "error",
                    message: getErrorMessage(language)
                });
            }
        } else {
            ms.Notification({
                type: "error",
                message: getValidationMessage(language)
            });
        }
    });
});

function getSuccessMessage(language) {
    /*const messages = {
        en: "We have received your message and will get back to you shortly.",
        no: "Vi har mottatt meldingen din og vil komme tilbake til deg snart.",
        sv: "Vi har mottagit ditt meddelande och återkommer snart.",
        dk: "Vi har modtaget din besked og vender tilbage til dig snart.",
        fi: "Olemme vastaanottaneet viestisi ja palaamme pian.",
        is: "Við höfum fengið skilaboðin þín og munum svara þér fljótt.",
    };*/
    if(language == 'en')
        messages = "We have received your message and will get back to you shortly.";
    else if(language == 'no')
        messages = "Vi har mottatt meldingen din og vil komme tilbake til deg snart.";
    else if(language == 'sv')
        messages = "Vi har mottagit ditt meddelande och återkommer snart.";
    else if(language == 'dk')
        messages = "Vi har modtaget din besked og vender tilbage til dig snart.";
    else if(language == 'fi')
        messages = "Olemme vastaanottaneet viestisi ja palaamme pian.";
    else if(language == 'is')
        messages = "Við höfum fengið skilaboðin þín og munum svara þér fljótt.";
    return messages;
}

function getErrorMessage(language) {
    /*console.log('enter error function');
    const messages = {
        en: "Failed! Try Again.",
        no: "Mislyktes! Prøv igjen.",
        sv: "Misslyckades! Försök igen.",
        dk: "Mislykkedes! Prøv igen.",
        fi: "Epäonnistui! Yritä uudelleen.",
        is: "Mistókst! Reyndu aftur.",
    };*/

    if(language == 'en')
        messages = "Failed! Try Again.";
    else if(language == 'no')
        messages = "Mislyktes! Prøv igjen.";
    else if(language == 'sv')
        messages = "Misslyckades! Försök igen.";
    else if(language == 'dk')
        messages = "Mislykkedes! Prøv igen.";
    else if(language == 'fi')
        messages = "Epäonnistui! Yritä uudelleen.";
    else if(language == 'is')
        messages = "Mistókst! Reyndu aftur.";
    return messages;
}

function getValidationMessage(language) {
    /* console.log('enter validation message');
     const messages = {
         en: "All fields must be filled",
         no: "Alle felt må fylles ut",
         sv: "Alla fält måste fyllas",
         dk: "Alle felter skal udfyldes",
         fi: "Kaikki kentät on täytettävä",
         is: "Allir reitir verða að vera fylltir út",
     };*/
    if(language == 'en')
        messages = "All fields must be filled";
    else if(language == 'no')
        messages = "Alle felt må fylles ut";
    else if(language == 'sv')
        messages = "Alla fält måste fyllas";
    else if(language == 'dk')
        messages = "Alle felter skal udfyldes";
    else if(language == 'fi')
        messages = "Kaikki kentät on täytettävä";
    else if(language == 'is')
        messages = "Allir reitir verða að vera fylltir út";
    return messages;
    
}
