'use strict';
/* indent: 2, node:true, nomen: true, maxlen: 80, vars: true*/
(function () {

    var routeUtility = {};
    var scan = require('scan');
    // global on the server, window in the browser
    var root, previous_routeUtility;

    root = this;
    if (root != null) {
        previous_routeUtility = root.routeUtility;
    }

    routeUtility.noConflict = function () {
        root.routeUtility = previous_routeUtility;
        return routeUtility;
    };

    routeUtility.SetupRoutes = function (app, db, security) {
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


    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return routeUtility;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = routeUtility;
    }
    // included directly via <script> tag
    else {
        root.routeUtility = routeUtility;
    }
}());