const checkbox = $("#registerCheck");

checkbox.click(function() {
    if(checkbox.is(':checked')){
        $("#submitButton").prop("disabled",false);
    }else{
        $("#submitButton").prop("disabled",true);
    }
});

