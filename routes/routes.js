module.exports = function(app) {
  
    app.get('/hello', function(request, response) {
        response.send('Hello World II!');
    });
    
    app.get('/', function(request, response){
        response.render('index', { what: 'template', title: 'MLD', insert: 'button' });
    });

}