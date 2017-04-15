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

	app.get('/search', function (req, res) {

	    var q = JSON.parse(req.query.data);  

	    var data = [];
	    var found = false;

	    var buildingSearch = "SELECT name,st_asgeojson(geom) as geom FROM buildings WHERE name = '" + q.name + "'";
	    var onCampus = "SELECT name,st_asgeojson(geom) as geom FROM "+'"onCampus"'+" WHERE name ='" + q.name + "'";
	    var offCampus = "SELECT name,st_asgeojson(geom) as geom FROM "+'"offCampus"'+"WHERE name ='" + q.name + "'";
	    var park = "SELECT name,st_asgeojson(geom) as geom FROM " + '"parks"' + " WHERE name ='" + q.name + "'";

	    var search = buildingSearch + " UNION " + onCampus + " UNION " + offCampus + " UNION " + park;

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