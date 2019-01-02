$(document).ready(function(){
    console.log('at script');
    $.ajax({
        url : "/students/class",
        type : "GET",
        success : function(data){
            var len = data.length;
            console.log(data);
            $("#class").empty();
            $("#class").append($("<option></option>")
            .attr("value", '').text('Select Class'));
            for(var i =0; i<len;i++){
            var value1 = data[i]['class'];
            var value2 = data[i]['class'];
                $("#class").append("<option value='"+value2+"' >"+value1+"</option>");
            }
        }
    });

    $("#class").on('change',function(){
        var val = $(this).val();
        var $el = $("#studentsList");
        $.ajax({
            type: 'POST',
            url: "/students/class",
            data: JSON.stringify({class:val}),
            success: function(data) {
                var len = data.length;
                console.log(data)
                $("#studentsList").empty();
                $("#studentsList").append($("<option></option>")
            .attr("value", '').text('Select Student'));
                for(var i =0; i<len;i++){
                var value1 = data[i]['studid'];
                var value2 = data[i]['fname'];
                    $("#studentsList").append("<option value='"+value1+"' >"+value2+"</option>");
                }
                },
            contentType: "application/json",
            dataType: 'json'
            });
      });

      $("#studentsList").on('change',function(){
        var val = $(this).val();
        $.ajax({
            type: 'POST',
            url: "/students/subjects",
            data: JSON.stringify({studid:val}),
            success: function(data) {
                var len = data.length;
                console.log(data)
                $("#subject").empty();
                $("#subject").append($("<option></option>")
            .attr("value", '').text('Select subject'));
                for(var i =0; i<len;i++){
                var value1 = data[i]['subid'];
                var value2 = data[i]['subject'];
                    $("#subject").append("<option value='"+value1+"' >"+value2+"</option>");
                }
                },
            contentType: "application/json",
            dataType: 'json'
            });
      });

   
}); 