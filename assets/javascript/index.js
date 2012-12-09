function init(){
    index.run();
}

var index = function() {
    var btn1 = null;
    var btn2 = null;
    var btn3 = null;
    var btn4 = null;
    var btnclick = function(method){
        $.ajax({
            type: method,
            url: "/request",
            headers: {
                accept: "application/json",
                uri: "http://api.thirdplanetout.com"
            },
            data: {
                "nameFirst": "Robert",
                "nameMiddle": "Brian",
                "nameLast": "Amesbury"
            },
            datatype: "json",
            beforeSend: function(jqXHR, settings){
                
            },
            success: function(data, textStatus, jqXHR){
                alert("success data:" + data);
                console.log("success textStatus:" + textStatus);
                console.log("success jqXHR:" + jqXHR);
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("error jqXHR:" + jqXHR);
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


