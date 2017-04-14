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
app.controller('appController', ['$scope', 'dataServ', '$http', '$window', function ($scope, Data, $http, $window) {

    var mymap = L.map('mapid').setView([32.7311, -97.1141], 15);

    $scope.init = function () {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Advanced Database - 6331 | Neil Jones - 1001371689',
            id: 'mapbox.streets'
        }).addTo(mymap);

        $scope.result = [];
        $scope.detailedResult = [];
    };

    $scope.clear = function () {
        $window.location.reload();
    }

    $scope.findAllBuildings = function () {
        var data = [];

        $http({
            url: "/buildings",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "buildings" };
                $scope.result.push(data);

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

                    //L.marker(result[0]).addTo(mymap).bindPopup(name).openPopup();

                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);

                    // create an orange rectangle
                    L.polygon(bounds, { color: "#ff7800", weight: 1 }).addTo(mymap).bindPopup(name);

                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.findAllOnCampus = function () {
        var data = [];

        $http({
            url: "/onCampus",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "onCampus" };
                $scope.result.push(data);

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

                    //L.marker(result[0]).addTo(mymap).bindPopup(name).openPopup();

                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);

                    // create an orange rectangle
                    L.polygon(bounds, { color: "#2980b9", weight: 1 }).addTo(mymap).bindPopup(name);

                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.findAllOffCampus = function () {
        var data = [];

        $http({
            url: "/offCampus",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "offCampus" };
                $scope.result.push(data);

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

                    //L.marker(result[0]).addTo(mymap).bindPopup(name).openPopup();

                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);

                    // create an orange rectangle
                    L.polygon(bounds, { color: "#8e44ad", weight: 1 }).addTo(mymap).bindPopup(name);

                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.findAllParks = function () {
        var data = [];

        $http({
            url: "/parks",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "parks" };
                $scope.result.push(data);

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

                    //L.marker(result[0]).addTo(mymap).bindPopup(name).openPopup();

                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);

                    // create an orange rectangle
                    L.polygon(bounds, { color: "#27ae60", weight: 1 }).addTo(mymap).bindPopup(name);

                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.findAllRoads = function () {
        var data = [];

        $http({
            url: "/roads",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;
                var coordinates = JSON.parse(response.data[i].geom);
                for (var j = 0; j < coordinates.coordinates.length; j++) {


                }
            }
            //var pointA = new L.LatLng(28.635308, 77.22496);
            //var pointB = new L.LatLng(28.984461, 77.70641);
            //var pointList = [pointA, pointB];

            //var firstpolyline = new L.Polyline(pointList, {
            //    color: 'red',
            //    weight: 3,
            //    opacity: 0.5,
            //    smoothFactor: 1
            //});
            //firstpolyline.addTo(mymap);

        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.search = function () {
        $scope.result = [];
        $scope.detailedResult = [];

        if ($scope.buildings) {
            $scope.findAllBuildings();
        }
        if ($scope.onCampus) {
            $scope.findAllOnCampus();
        }
        if ($scope.offCampus) {
            $scope.findAllOffCampus();
        }
        if ($scope.parks) {
            $scope.findAllParks();
        }
    }

    $scope.popup = function (name) {
        for (var i = 0; i < $scope.detailedResult.length; i++) {
            if ($scope.detailedResult[i].name == name)
            {
                L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name).openPopup();
            }
        }
    }
}]);