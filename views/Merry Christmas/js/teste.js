$(document).ready(function(){
    $("#button").on('click touchstart', function() {
        //ajax request
        $("#result").html('Enviado com sucesso!');
        $("#result").addClass("alert alert-success");
        //
        //$("#result").html('Falhou o envio!');
        //$("#result").addClass("alert alert-danger");
        $("#button").prop("disabled",true);
        //});
    });
    $("#updateunit").submit( function() {
        return false;
    });
});
function clearInput() {
    $("#updateunit :input").each( function() {
        $(this).val('');
    });
}