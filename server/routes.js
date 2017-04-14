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
	    var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "on-campus-apartments"');
	    query.on('row', function (row) {
	        data.push(row);
	    });

	    query.on('end', function () {
	        res.json(data);
	    });
	});

	app.get('/offCampus', function (req, res) {
	    var data = [];
	    var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "off-campus-apartments"');
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
	    var query = client.query('SELECT name,st_asgeojson(geom) as geom FROM "parks-and-playgrounds"');
	    query.on('row', function (row) {
	        data.push(row);
	    });

	    query.on('end', function () {
	        res.json(data);
	    });
	});

};