// App
var app = angular.module('app', []);

// Service to fetch some data..
app.factory('dataServ', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/data');
        }
    }
}]);

// App controller
app.controller('appController', ['$scope', 'dataServ', '$http', function ($scope, Data, $http) {

    $scope.init = function () {
        var mymap = L.map('mapid').setView([32.7311, -97.1141], 15);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        var data = [];

        $http({
            url: "/buildings",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;
                var coordinates = JSON.parse(response.data[i].geom);
                //console.log(coordinates.coordinates);
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data); 
                    }
                    console.log(result);

                    var bounds = result;
                    //var bounds = [[32.7335241, -97.1139103], [32.7335421, -97.112183], [32.7326351, -97.1121883], [32.7326396, -97.1126068], [32.7332398, -97.112655], [32.7332533, -97.1139103], [32.7335241, -97.1139103]];
                    // create an orange rectangle
                    L.polygon(bounds, { color: "#ff7800", weight: 1 }).addTo(mymap).bindPopup(name);

                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };



    //L.marker([32.7311,-97.1141]).addTo(mymap)
    //	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    //L.polygon([
    //	[51.509, -0.08],
    //	[51.503, -0.06],
    //	[51.51, -0.047]
    //]).addTo(mymap).bindPopup("I am a polygon.");

    //var popup = L.popup();

}]);