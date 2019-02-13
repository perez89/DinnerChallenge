$(document).ready(function () {
   $("#send_task_form").submit(function(e) {
          console.log('select_link clicked');
        e.preventDefault();
        console.log('select_link clicked');
          $("#button").prop("disabled",true);
 
            console.log('aaaaaaaaaaaaaaaaaaaa');
		var array = $("form").serializeArray();
		var data = {};
		data.acknowledgment = $("input[name=acknowledgment]").val();
		data.whodrinks = $("input[name=whodrinks]").val();
		data.namex = $("input[name=namex]").val();
console.log("data = " + data);
console.log("string" + JSON.stringify(data));
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
	        contentType: 'application/json',
            url: 'http://188.251.244.174:55555/dinner',						
            success: function(data) {
            	console.log("success");
           $("#result").html('Enviado com sucesso!');
        	$("#result").addClass("alert alert-success");
                //console.log(JSON.stringify(data));

            },
            error: function(data) {
               console.log("error");
               $("#result").html('Falhou o envio!');
        		$("#result").addClass("alert alert-danger");
            },
            complete: function(data) {
				console.log("complete" + data);

				$("input[name=acknowledgment]").val("");
				$("input[name=whodrinks]").val("");
				$("input[name=namex]").val("");
            }
        });
		/*$.ajax('http://localhost:3000/endpoint', {
		        type: 'POST',
		        data: JSON.stringify(data),
		        contentType: 'application/json',
		        success: function() { console.log('success');},
		        error  : function() { console.log('error');}
		});*/
    });				
});

