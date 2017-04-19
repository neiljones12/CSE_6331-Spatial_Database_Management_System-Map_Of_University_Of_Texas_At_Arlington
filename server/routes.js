module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendfile('./public/index.html');
    });

    var pg = require('pg');
    var conString = "postgres://postgres:password@localhost:5432/adb";

    var client = new pg.Client(conString);
    client.connect();

    app.get('/data', function (req, res) {
        var data = [];
        res.json(data);
    });


    app.get('/searchByName', function (req, res) {

        var q = JSON.parse(req.query.data);
        var data = [];

        var buildingSearch = "SELECT name,st_asgeojson(geom) as geom, geom as geom_org FROM buildings WHERE name = '" + q.name + "'";
        var onCampus = "SELECT name,st_asgeojson(geom) as geom, geom as geom_org FROM " + '"onCampus"' + " WHERE name ='" + q.name + "'";
        var offCampus = "SELECT name,st_asgeojson(geom) as geom, geom as geom_org FROM " + '"offCampus"' + "WHERE name ='" + q.name + "'";
        var park = "SELECT name,st_asgeojson(geom) as geom, geom as geom_org FROM " + '"parks"' + " WHERE name ='" + q.name + "'";

        var search = buildingSearch + " UNION " + onCampus + " UNION " + offCampus + " UNION " + park;

        //console.log(search);

        var query = client.query(search);

        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/searchByRadius', function (req, res) {

        var q = JSON.parse(req.query.data);
        var data = [];

        var building = q.buildings;
        var onCampus = q.onCampus;
        var offCampus = q.offCampus;
        var parks = q.parks;


        var buildingSearch = " select name,st_asgeojson(geom) as geom from " + 'buildings' + " WHERE  ST_DWithin(geom, '" + q.geom_org + "', " + q.radius + ")";
        var onCampusSearch = " select name,st_asgeojson(geom) as geom from " + '"onCampus"' + " WHERE  ST_DWithin(geom, '" + q.geom_org + "', " + q.radius + ")";
        var offCampusSearch = " select name,st_asgeojson(geom) as geom from " + '"offCampus"' + " WHERE  ST_DWithin(geom, '" + q.geom_org + "', " + q.radius + ")";
        var parkSearch = " select name,st_asgeojson(geom) as geom from " + '"parks"' + " WHERE  ST_DWithin(geom, '" + q.geom_org + "', " + q.radius + ")";

        var search = "";

        if (building) {
            if (search == "") {
                search = buildingSearch;
            }
            else {
                search += " UNION " + buildingSearch;
            }
        }
        if (onCampus) {
            if (search == "") {
                search = onCampusSearch;
            }
            else {
                search += " UNION " + onCampusSearch;
            }
        }
        if (offCampus) {
            if (search == "") {
                search = offCampusSearch;
            }
            else {
                search += " UNION " + offCampusSearch;
            }
        }
        if (parks) {
            if (search == "") {
                search = parkSearch;
            }
            else {
                search += " UNION " + parkSearch;
            }
        }


        console.log(search);

        var query = client.query(search);

        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/buildings', function (req, res) {
        var data = [];
        var query = client.query("SELECT name,st_asgeojson(geom) as geom FROM buildings");
        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/onCampus', function (req, res) {
        var data = [];
        var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "onCampus"');
        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/offCampus', function (req, res) {
        var data = [];
        var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "offCampus"');
        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/roads', function (req, res) {
        var data = [];
        var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM roads');
        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

    app.get('/parks', function (req, res) {
        var data = [];
        var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "parks"');
        query.on('row', function (row) {
            data.push(row);
        });

        query.on('end', function () {
            res.json(data);
        });
    });

};