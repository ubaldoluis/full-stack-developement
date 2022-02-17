$(document).ready(function ()
{

	// predicción a traves del CP
	 $("#cp").blur(function(){
	 	$.getScript("http://services.ulisesmedia.es/getlocationdatafrompostalcode/JS/?cp="+$(this).val(),function(){
	 		if(($("#poblacion").val()=="")&&($("#pais").val()=="66")){
	 			$("#provincia").val(location_provincia);
	 			$("#poblacion").val(location_poblacion)
	 		}
 		});
	 });


	$("#enviar").click(function () {
		var es_telefono	=/^(6|8|9)[0-9]{8}$/;
		var ok_cupon 	= true;
		var nombre 		= $('#nombre').val();
		var apellidos 	= $('#apellidos').val();
		var edad 		= $('#edad').val();
		var telefono 	= $('#telefono').val();
		var email 		= $('#email').val();
		var direccion 	= $('#direccion').val();
		var numero 		= $('#numero').val();
		var cp 			= $('#cp').val();
		var poblacion 	= $('#poblacion').val();
		var provincia 	= $('#provincia').val();
		var nacionalidad= $('#nacionalidad').val();
		var nie 		= $('#nie').val();

		var alerta 		= '';

		if((nombre == '') || (!isNaN(nombre)))
		{
			alerta = "Debes introducir tu Nombre.\n";
			ok_cupon = false;
		}

		if((apellidos == '') || (!isNaN(apellidos)))
		{
			alerta = alerta + "Debes introducir tus Apellidos.\n";
			ok_cupon = false;
		}

		if((edad == '') || (isNaN(edad)) || (edad.length != 2))
		{
			alerta = alerta + 'Debes introducir tu Edad.\n';
			ok_cupon = false;
		}

		if((telefono == '') || (isNaN(telefono)) || ((telefono.length) > 9))
		{
			alerta = alerta + "Debes introducir tu Teléfono.\n";
			ok_cupon = false;
		}
		else if(!es_telefono.test(telefono))
		{
			alerta = alerta + "El Teléfono no es correcto revisalo por favor.\n";
			ok_cupon = false;
		}

		if((email == '') || (!validar_email(email)))
		{
			alerta = alerta + 'Debes introducir tu Email.\n';
			ok_cupon = false;
		}

		if((direccion == '') || (!isNaN(direccion)))
		{
			alerta = alerta + "Debes introducir tu Dirección.\n";
			ok_cupon = false;
		}

		if((numero == '') || (isNaN(numero)) )
		{
			alerta = alerta + 'Debes introducir tu Número.\n';
			ok_cupon = false;
		}


		if((cp == '') || (isNaN(cp)) || (cp.length != 5))
		{
			alerta = alerta + 'Debes introducir el Código Postal.\n';
			ok_cupon = false;
		}

		if((poblacion == '') || (!isNaN(poblacion)))
		{
			alerta = alerta + "Debes introducir tu Población.\n";
			ok_cupon = false;
		}

		//VALIDACION NIE
		if(nacionalidad != 66)
		{
			var numero = parseInt( nie.substr(1,nie.length-1))%23;

			if((nie == '') || (!isNaN(nie)))
			{
				alerta = alerta + "Debes introducir tu NIE.\n";
				ok_cupon = false;
			}
			else if ( (!/^[YyXx]\d{1,8}[A-Za-z]$/.test(nie)) || ('TRWAGMYFPDXBNJZSQVHLCKE'.substring(numero,numero+1) != nie.substring(nie.length-1).toUpperCase()) )
			{
				alerta = alerta + "Debes introducir un NIE válido.\n";
				ok_cupon = false;
			}

		}

		if (!validaLegales())
		{
			alerta = alerta + "Debes leer y aceptar el aviso legal.\n";
			ok_cupon = false;
		}

		if( ok_cupon )
		{
			$("#cupon").submit();
		}
		else
		{
			alert("Hemos detectado datos incorrectos en el formulario. Por favor, revisa los siguientes campos:\n\n"+alerta);
			return false;
		}
	});
});

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





