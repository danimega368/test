jQuery(document).ready(function() {		
    jQuery("#form.form-register #submit").click(function() { 
       
	    var proceed = true;
		jQuery("#form.form-register input[required=true], #form.form-register textarea[required=true], #form.form-register select[required=true]").each(function(){
			jQuery(this).css('background-color',''); 
			if(!jQuery.trim(jQuery(this).val())){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Pilih Permainan'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Rp. 0'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Pilih Bank'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if(jQuery(this).attr("type")=="email" && !email_reg.test(jQuery.trim(jQuery(this).val()))){
				jQuery(this).css('background-color','pink'); 
				proceed = false; 		
			}	
		});
       
        if(proceed) //everything looks good! proceed...
        {
					jQuery("#form.form-register #form-body").hide(); //hide form after success
					jQuery("#form.form-register .form-loading").show(); //hide form after success
				//get input field values data to be sent to server
					post_data = {
						'id'				: jQuery('#form.form-register input[name=id]').val(), 
						'url'				: jQuery('#form.form-register input[name=url]').val(), 
						'ref_page'			: jQuery('#form.form-register input[name=ref_page]').val(), 
						'email'				: jQuery('#form.form-register input[name=email]').val(),  
						'telepon'			: jQuery('#form.form-register input[name=telepon]').val(), 
						'permainan'			: jQuery('#form.form-register input[name=permainan]').val(), 
						'bank'				: jQuery('#form.form-register select[name=bank] option:selected').val(),
						'namarekening'			: jQuery('#form.form-register input[name=namarekening]').val(),
						'nomorrekening'			: jQuery('#form.form-register input[name=nomorrekening]').val()
					};
            
            
					jQuery.post(window.location.protocol + "//" + window.location.host + "/"+'form/process.php', post_data, function(response){  
						if(response.type == 'error'){ //load json data from server and output message     
							output = '<div class="error">'+response.text+'</div>';
						} else {
								output = '<div class="success">'+response.text+'</div>';
								//reset values in all input fields
								jQuery("#form  input[required=true], #form textarea[required=true]").val(''); 
						}
						jQuery("#form.form-register .form-loading").hide(); //hide form after success
						jQuery("#form.form-register #result").hide().html(output).show();
						}, 'json');
					}
    });
    
    
    
    
    jQuery("#form.form-trans #submit").click(function() { 
       
	    var proceed = true;
		jQuery("#form.form-trans input[required=true], #form.form-trans textarea[required=true], #form.form-trans select[required=true]").each(function(){
			jQuery(this).css('background-color',''); 
			if(!jQuery.trim(jQuery(this).val())){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Pilih Permainan'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Rp. 0'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			if(jQuery(this).val() == 'Pilih Bank'){ 
				jQuery(this).css('background-color','pink');  
				proceed = false;
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if(jQuery(this).attr("type")=="email" && !email_reg.test(jQuery.trim(jQuery(this).val()))){
				jQuery(this).css('background-color','pink'); 
				proceed = false; 		
			}	
		});
       
        if(proceed) //everything looks good! proceed...
        {
					jQuery("#form.form-trans #form-body").hide(); //hide form after success
					jQuery("#form.form-trans .form-loading").show(); //hide form after success
				//get input field values data to be sent to server
					post_data = {
						'id'				: jQuery('#form.form-trans input[name=id]').val(), 
						'url'				: jQuery('#form.form-trans input[name=url]').val(), 
						'email'				: jQuery('#form.form-trans input[name=email]').val(),  
						'telepon'			: jQuery('#form.form-trans input[name=telepon]').val(), 
						'permainan'			: jQuery('#form.form-trans input[name=permainan]:checked').val(), 
						'trans'				: jQuery('#form.form-trans input[name=trans]:checked').val(), 
						'bank'				: jQuery('#form.form-trans select[name=bank] option:selected').val(),
						'namarekening'			: jQuery('#form.form-trans input[name=namarekening]').val(),
						'nomorrekening'			: jQuery('#form.form-trans input[name=nomorrekening]').val(),
						'jumlah'			: jQuery('#form.form-trans input[name=jumlah]').val(),
						'user'	: jQuery('#form.form-trans input[name=user]').val()
					};
            
            
					jQuery.post(window.location.protocol + "//" + window.location.host + "/"+'form/process.php', post_data, function(response){  
						if(response.type == 'error'){ //load json data from server and output message     
							output = '<div class="error">'+response.text+'</div>';
						} else {
								output = '<div class="success">'+response.text+'</div>';
								//reset values in all input fields
								jQuery("#form  input[required=true], #form textarea[required=true]").val(''); 
						}
						jQuery("#form.form-trans .form-loading").hide(); //hide form after success
						jQuery("#form.form-trans #result").hide().html(output).show();
						}, 'json');
					}
    });
    
    
    
    
    
    //reset previously set border colors and hide all message on .keyup()
    jQuery("#form  input[required=true], #form textarea[required=true]").keyup(function() { 
        jQuery(this).css('border-color',''); 
        jQuery("#result").slideUp();
    });
		
		jQuery(".angka").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
						 // Allow: Ctrl+V
						(e.keyCode == 86 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

});


