function init(){
    index.run();
}

var index = function() {
    var btn = null;
    var btnclick = function(){
        $.ajax({
            type: "GET",
            url: "http://api.thirdplanetout.com",
            data: {},
            datatype: "json",
            success: function(a, b, c, d){
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
            },
            error: function(a, b, c, d){
                console.log(a);
                console.log(b);
                console.log(c);
                console.log(d);
            }
            
        });
    };
    
    //btn = $('#btn1');
//    var btn = document.getElementById("btn1");
    
    
    return {
        run: function() {
            btn = document.getElementById("btn1");
            btn.onclick = btnclick;
        }    
    };
}();


