jQuery(document).ready(function() {

    if (jQuery("#lang").val() == "de") {
        var validateMessages = {
            prg_title: "Bitte Titel angeben!",
            prg_text: "Bitte Text verfassen!",
            prg_cat: "Bitte Kategorie angeben!",
            prg_presse: "Bitte Firma angeben!",
            prg_fname2: "Bitte Vornamen des Pressekontaktes angeben!",
            prg_lname2: "Bitte Nachnamen des Pressekontaktes angeben!",
            prg_address2: "Bitte Straße und Hausnummer des Pressekontaktes angeben!",
            prg_pc2: "Bitte Postleitzahl des Pressekontaktes angeben!",
            prg_city2: "Bitte Stadt des Pressekontaktes angeben!",
            prg_phone2: "Bitte Telefonnummer des Pressekontaktes angeben!",
            prg_email2: {
                required: "Bitte eMail des Pressekontaktes angeben!",
                email: "Bitte korrekte Mailadresse des Pressekontaktes angeben!"
            },
            prg_www2: {
                required: "Bitte Website angeben!",
                url: "Bitte korrekte Website angeben!"
            },
            prg_firm_name: "Bitte Namen angeben!",
            prg_firm_anrede: "Bitte Anrede auswählen!",
            prg_firm_partner: "Bitte Ansprechpartner angeben!",
            prg_firm_add: "Bitte Straße und Hausnummer angeben!",
            prg_firm_pc: "Bitte Postleitzahl angeben!",
            prg_firm_city: "Bitte Stadt angeben!",
            prg_firm_state: "Bitte Land auswählen!",
            prg_firm_email: "Bitte Email angeben!",
            prg_firm_url: "Bitte Website angeben!",
            prg_firm_descr: {
                required: "Bitte Firmenbeschreibung angeben!",
                minlength: "Mindestens 20 Zeichen erforderlich!"
            },
            prg_pictitle: "Bitte Namen angeben",
            prg_owner: "Bitte Urheber angeben",
            bestaetigung: "Bitte beachten Sie, dass gegebenenfalls Gebühren anfallen können.\n\rEinmal versandte Pressemitteilungen können nicht mehr zurückgenommen werden. Soll Ihre Pressemitteilung jetzt versendet werden?",
            fehler_bild: "Fehler beim Versand, bitte Bildformat überprüfen",
            fehler: "Fehler beim Speichern",
            erfolg: "Mitteilung erfolgreich übermittelt!"
        };
    } else if (jQuery("#lang").val() == "en") {
        var validateMessages = {
            prg_title: "Please set Title",
            prg_text: "Please set Text",
            prg_cat: "Please set Category",
            prg_presse: "Please set Company",
            prg_fname2: "Please set first Name",
            prg_lname2: "Please set last Name",
            prg_address2: "Please set Street and Number",
            prg_pc2: "Please set Zip",
            prg_city2: "Please set City",
            prg_phone2: "Please set phone number",
            prg_email2: {
                required: "Please set E-Mail",
                email: "Please set correct E-Mail"
            },
            prg_www2: {
                required: "Please set Website",
                url: "Please set correct Website!"
            },
            prg_firm_name: "Please set Name",
            prg_firm_partner: "Please set Contact Name",
            prg_firm_add: "Please set Street and Number",
            prg_firm_pc: "Please set Zip",
            prg_firm_city: "Please set City",
            prg_firm_state: "Please set Country",
            prg_firm_email: "Please set E-Mail",
            prg_firm_url: "Please set Website",
            prg_firm_descr: {
                required: "Please set Company Description",
                minlength: "At least 20 characters"
            },
            prg_pictitle: "Please set Name",
            prg_owner: "Please set Owner",
            bestaetigung: "Please note that, you may be charged.\n\rOnce sent press releases may not be withdrawn. Do you intend to send the message?",
            fehler_bild: "Error with the transfer, please check the format of the image",
            fehler: "Message transfer failed",
            erfolg: "Message successful transfered"
        };
    }

    jQuery("#btnChangeParticulars").click(function() {
        saved.style.display = 'block';
        btnChangeParticulars.style.display = 'none';
    });

    jQuery("#img0").change(function() {
        img_rights.style.display = 'none';
    });

    jQuery(".newImg").change(function() {
        img_rights.style.display = 'block';
    });

    jQuery("#prgConnect_sendPress").validate({
        ignore: "",
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        onsubmit: true,
        invalidHandler: function(e, validator) {
            if (validator.errorList.length) {
                jQuery('a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
            }
        },
        rules: {
            prg_title: "required",
            prg_text: "required",
            prg_cat: "required",
            prg_presse: "required",
            prg_fname2: "required",
            prg_lname2: "required",
            prg_address2: "required",
            prg_pictitle: {
                required: ".newImg:checked"
            },
            prg_owner: {
                required: ".newImg:checked"
            },
            prg_pc2: {
                required: true,
                rangelength: [3, 10]
            },
            prg_city2: "required",
            prg_phone2: "required",
            prg_email2: {
                required: true,
                email: true
            },
            prg_www2: {
                required: true,
                url: true
            },
            prg_firm_name: {
                required: true,
                minlength: 2
            },
            prg_firm_partner: {
                required: true,
                minlength: 2
            },
            prg_firm_add: {
                required: true,
                minlength: 2
            },
            prg_firm_pc: {
                required: true,
                rangelength: [3, 10]
            },
            prg_firm_city: {
                required: true,
                minlength: 2
            },
            prg_firm_state: "required",
            prg_firm_email: {
                required: true,
                email: true
            },
            prg_firm_url: {
                required: true,
                url: true
            },
            prg_firm_descr: {
                required: true,
                minlength: 20
            }
        },
        messages: validateMessages,
        submitHandler: function(form) {

            if (form.publish[0] != undefined) {
                ret = window.confirm(validateMessages.bestaetigung);
                if (ret === false) {
                    return false;
                }
            }

            jQuery.ajax({
                url: "/wp-admin/admin.php?prgPluginExtern=sendMessage",
                type: "POST",
                dataType: "json",
                cache: false,
                data: jQuery(form).serialize(),
                success: function(data) {
                    if(data.success == "true") {
                        parent.jQuery.fancybox(validateMessages.erfolg);
                    } else {
                        parent.jQuery.fancybox(validateMessages.fehler);
                    }
                }
            });
        }
    });
});