function init(){
    index.run();
}

var index = function() {
    var btn1 = null;
    var btn2 = null;
    var btn3 = null;
    var btn4 = null;
    var urltxt = null;
    var datata = null;
    var btnclick = function(method){
        urltxt = $("#url");
        datata = $("#data");
        var url = "http://api.thirdplanetout.com";
        if (urltxt.val().length > 0) {
            url = urltxt.val();
        }
        var data = {};
        if (datata.val().length > 1) {
            data = JSON.parse(datata.val());
        }
        $.ajax({
            type: method,
            url: "/request",
            headers: {
                accept: "application/json",
                uri: url
            },
            data: data,
            datatype: "json",
            beforeSend: function(jqXHR, settings){
                
            },
            success: function(data, textStatus, jqXHR){
                console.log("success data:" + data);
                console.log("success textStatus:" + textStatus);
                console.log("success jqXHR:" + jqXHR);
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log("error jqXHR:" + jqXHR);
                console.log("error textStatus:" + textStatus);
                console.log("error errorThrown:" + errorThrown);
            },
            complete: function(jqXHR, textStatus){
                
            }
        });
    };
    
    
    
    return {
        run: function() {
            btn1 = $("#btn1");
            btn2 = $("#btn2");
            btn3 = $("#btn3");
            btn4 = $("#btn4");           
            btn1.click({}, function(){btnclick("GET");});
            btn2.click({}, function(){btnclick("POST");});
            btn3.click({}, function(){btnclick("PUT");});
            btn4.click({}, function(){btnclick("DELETE");});
        }    
    };
}();


