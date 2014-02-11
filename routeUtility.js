e strict';
/* indent: 2, node:true, nomen: true, maxlen: 80, vars: true*/
var scan = require('scan');
module.exports = {
    setupRoutes: function (app, db, security) {
    try
    {
        //clear out existing routes
        app.routes.get = [];
        app.routes.put = [];
        app.routes.post = [];
        app.routes.delete = [];


        // https://github.com/focusaurus/express_code_structure/blob/master/app/server.js
        // This will look for route files with a .rt.js extension and add them to the app
        scan('./','.rt.js', function(err, files){
            files.forEach(function(route){
                require(route)(app, db, security);
            });
        });

        //OK, routes are loaded, NOW use the router:
        app.use(app.router);
    }
    catch(e)
    {
        throw new Error(e);
    }
    }
};
