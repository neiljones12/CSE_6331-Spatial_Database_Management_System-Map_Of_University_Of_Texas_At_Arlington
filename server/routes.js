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

};