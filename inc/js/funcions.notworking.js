function validar_email(email){
	var str = email;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(str)){
		return true;
	} else {
		return false;
	}
}

function validaLegales()
{
  return $('#avisoLegal').is(':checked');	
}

function traecheck()
{
  return $('#sinivel').val();	
}

$(document).ready(function () {  
	  
	 
	 $("#enviar").click(function () {
		  var es_telefono=/^(6|8|9)[0-9]{8}$/;
		  var ok_nom = true;
		  var ok_tel = true;
		  var ok_com = true;
		  var ok_nivel = true;
		  var legal = true;
	      var nombre = $('#nombre').val();
		  var apellido = $('#apellido').val();
		  var email = $('#email').val();
		  var direccion = $('#direccion').val();
		  var edad = $('#edad').val();
		  var telefono = $('#telefono').val();
		  var cp = $('#cp').val();
		  var sinivel = $('#sinivel').val();
		  var alerta = '';

		  if((nombre == '') || (!isNaN(nombre))){ 
		    alerta = "Debes introducir tu Nombre.\n";
		    ok_nom = false;
		  }else{
		    ok_nom = true;
		  }
	      
		  
		  if((apellido == '') || (!isNaN(apellido))){ 
			alerta = alerta + "Debes introducir tus Apellidos.\n";
			ok_com = false;
	      }else{  
			ok_com = true;
	      }
	      
		  if((email == '') || (!validar_email(email))){
			alerta = alerta + 'Debes introducir tu Email.\n';
			ok_email = false;
		  }	else{
			ok_email = true;			  
		  }

		  if((direccion == '') || (!isNaN(direccion))){ 
			alerta = alerta + "Debes introducir tu Dirección.\n";
			ok_dir = false;
	      }else{  
			ok_dir = true;
	      }


		 if((edad == '') || (isNaN(edad)) || (edad.length != 2)){ 
			alerta = alerta + 'Debes introducir tu Edad.\n';
			ok_edad = false;
		  }	else{
			ok_edad = true;			  
		  }

		  if((telefono == '') || (isNaN(telefono)) || ((telefono.length) > 9)){
			alerta = alerta + "Debes introducir tu Teléfono.\n";
			ok_tel = false;
		  }else if(!es_telefono.test(telefono)){
			alerta = alerta + "El Teléfono no es correcto.\n";
		    ok_tel = false;
		  }else{
		    ok_tel = true;
		  }
		
		if((cp == '') || (isNaN(cp)) || (cp.length != 5)){ 
			alerta = alerta + 'Debes introducir el Código Postal.\n';
			ok_cp = false;
		  }	else{
			ok_cp = true;			  
		  }

		if(sinivel == '0'){ 
			alerta = alerta + "Debes introducir tu Situación Laboral.\n";
			ok_nivel = false;
	      }else{  
			ok_nivel = true;
	      }
		  
	      if (!validaLegales())
	      {
	        alerta = alerta + "Lee el aviso legal y marca la casilla para aceptarlo.";
	      	legal = false;
	      }
	      
	      if((ok_nom) && (ok_com) && (ok_dir) && (ok_email) && (ok_cp) && (ok_edad) && (legal) && (ok_tel) && (ok_nivel)){
			document.cupon.enviar.value = 'Enviando';
			document.cupon.enviar.disabled = true;

		   $("#cupon").submit();  
			  $.ajax({
			    type: "POST",
			    url: "http://www.http://cursodecarretillero.es/envio.php",
			    success: function(datos){
				modalWindow.close();
				}
			  });		
		  }
	      else
	      {
	        alert("Hemos detectado datos incorrectos en el formulario. Por favor, revisa los siguientes campos:\n\n"+alerta);
			return false;
	      }
      });
// predicción a traves del CP
	 $("#cp").blur(function(){
	 	$.getScript("http://www.tpmcorp.es/cp/?cp="+$(this).val(),function(){
	 		if(($("#poblacion").val()=="")&&($("#pais").val()=="66")){
	 			$("#provincia").val(location_provincia);
	 			$("#poblacion").val(location_poblacion)
	 		}
 		});
	 });

    
});