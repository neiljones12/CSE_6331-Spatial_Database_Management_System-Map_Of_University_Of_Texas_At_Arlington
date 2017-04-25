var app = angular.module('app', ['autocomplete']);

app.factory('dataServ', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/data');
        }
    }
}]);

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

        $scope.customSearchString = "";

        $scope.radius = "";
        $scope.from = "";

        $scope.names = [
            "Engineering Research Building",
            "Nedderman Hall",
            "Geoscience",
            "Engineering Lab Building",
            "Woolf Hall",
            "Science Hall",
            "Preston Hall",
            "Ransom Hall",
            "Carlisle Hall",
            "College Hall",
            "Business Building",
            "Trimble Hall",
            "Hammond Hall",
            "Life Science Building",
            "University Hall",
            "Davis Hall",
            "Texas Hall",
            "Pickard Hall",
            "Aerodynamics Research Building",
            "Continuing education / workforce Development",
            "DED Technical Training Center",
            "University Center",
            "Maveric Activities Center",
            "Physical Education",
            "Campus Center",
            "Nanotech Building",
            "Cappa Building",
            "Fine Arts Building",
            "Smart Hospital",
            "Planetarium",
            "Swift Center",
            "Veterans Assistance Center",
            "Child Development Center",
            "Environment Health and Safety",
            "University Police",
            "Office and Classroom Building",
            "Studio Arts Center",
            "Amphibian and reptile diversity research center",
            "Civil engineering lab building",
            "Wetsel Building",
            "Arbor Oaks",
            "Arlington Hall",
            "Brazos House",
            "Centennial Court",
            "Center Point",
            "Cooper Chase",
            "Maple Square",
            "Garden Club",
            "Kalpana Chawla Hall",
            "Lipscomb Hall",
            "Timberbrook",
            "Meadow Run",
            "The Heights on Pecan",
            "The Lofts at College park",
            "Trinity House",
            "University Village",
            "Vandergiff Hall",
            "Campus Edge",
            "The Arlie",
            "Heatherway",
            "Midtown Arlington Apartments",
            "Caribe Apartments",
            "Mary Kay Apartments",
            "Zen Apartments",
            "Four oak Apartments",
            "South Campus Apartments",
            "University Terrace Apartments",
            "Mesa Apartments",
            "Maverick Place Apartments",
            "Linda Vista Apartments",
            "Sam Maverick Apartments",
            "Pepper Mill Apartments",
            "Pinewoods Apartments",
            "Vintage Pads",
            "Summit Plaza Apartments",
            "Intramural Fields",
            "Allan Saxe Softball park",
            "Clay Gould Ballpark",
            "College hills park",
            "Doug Russel Park",
            "The green at college park",
            "UTA Tennis Center"];
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
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#ff7800", weight: 1 }).addTo(mymap).bindPopup(name);
                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }
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
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#2980b9", weight: 1 }).addTo(mymap).bindPopup(name);
                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }
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
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#8e44ad", weight: 1 }).addTo(mymap).bindPopup(name);
                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }
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
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#27ae60", weight: 1 }).addTo(mymap).bindPopup(name);
                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }
                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.directions = function () {
        var data = { name: $scope.start };
        var bounds = [];
        $http({
            url: "/searchByName",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var coordinates = JSON.parse(response.data[i].geom);
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }
                }

                bounds.push(result[0]);

                var data2 = { name: $scope.end };
                $http({
                    url: "/searchByName",
                    method: "get",
                    params: { data: data2 }
                }).then(function successCallback(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        var coordinates = JSON.parse(response.data[i].geom);
                        for (var j = 0; j < coordinates.coordinates.length; j++) {
                            var result = [];
                            for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                                var r = coordinates.coordinates[j][0][k];
                                var data = [];
                                data.push(r[1]);
                                data.push(r[0]);
                                result.push(data);
                            }
                        }
                    }

                    bounds.push(result[0]);
                    var routing = L.Routing.control({
                        waypoints: [
                            L.latLng(bounds[0]),
                            L.latLng(bounds[1])
                        ],
                    }).addTo(mymap);

                    $scope.result.push({ name: "Directions shown on map" });
                })
            }
        })
    }

    $scope.find = function () {
        var data = { name: $scope.from };

        $http({
            url: "/searchByName",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "search" };
                $scope.result.push(data);

                var geom_org = response.data[i].geom_org;

                var coordinates = JSON.parse(response.data[i].geom);
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#27ae60", weight: 1 }).addTo(mymap).bindPopup(name);

                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }


                    if ($scope.radius != "" && $scope.radius > -1) {

                        var radius = $scope.radius * 1609.34; //converting meters to miles

                        var data = { radius: radius / 170000, geom_org: geom_org, buildings: $scope.buildings, onCampus: $scope.onCampus, offCampus: $scope.offCampus, parks: $scope.parks };


                        var circle = L.circle(bounds[0], {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.3,
                            radius: radius
                        }).addTo(mymap);

                        $http({
                            url: "/searchByRadius",
                            method: "get",
                            params: { data: data }
                        }).then(function successCallback(response) {

                            for (var i = 0; i < response.data.length; i++) {
                                var name = response.data[i].name;

                                var data = { name: name, type: "search" };
                                $scope.result.push(data);
                                var coordinates = JSON.parse(response.data[i].geom);
                                for (var j = 0; j < coordinates.coordinates.length; j++) {

                                    var result = [];
                                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                                        var r = coordinates.coordinates[j][0][k];
                                        var data = [];
                                        data.push(r[1]);
                                        data.push(r[0]);
                                        result.push(data);
                                    }

                                    var bounds = result;
                                    var data = { name: name, bounds: bounds };

                                    $scope.detailedResult.push(data);
                                    L.polygon(bounds, { color: "#d35400", weight: 1 }).addTo(mymap).bindPopup(name);
                                    if ($scope.marker) {
                                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                                    }

                                    // zoom the map to the rectangle bounds
                                    //mymap.fitBounds(bounds);
                                }
                            }

                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    }
                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.search = function () {
        $scope.result = [];
        $scope.detailedResult = [];

        if ($scope.buildings && $scope.from == "") {
            $scope.findAllBuildings();
        }
        if ($scope.onCampus && $scope.from == "") {
            $scope.findAllOnCampus();
        }
        if ($scope.offCampus && $scope.from == "") {
            $scope.findAllOffCampus();
        }
        if ($scope.parks && $scope.from == "") {
            $scope.findAllParks();
        }

        $scope.find();
    }

    $scope.customSearch = function () {
        var data = $scope.customSearchString;
        $http({
            url: "/customSearch",
            method: "get",
            params: { data: data }
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                var name = response.data[i].name;

                var data = { name: name, type: "custom" };
                $scope.result.push(data);

                var coordinates = JSON.parse(response.data[i].geom);
                for (var j = 0; j < coordinates.coordinates.length; j++) {

                    var result = [];
                    for (var k = 0; k < coordinates.coordinates[j][0].length; k++) {
                        var r = coordinates.coordinates[j][0][k];
                        var data = [];
                        data.push(r[1]);
                        data.push(r[0]);
                        result.push(data);
                    }

                    var bounds = result;
                    var data = { name: name, bounds: bounds };

                    $scope.detailedResult.push(data);
                    L.polygon(bounds, { color: "#2c3e50", weight: 1 }).addTo(mymap).bindPopup(name);
                    if ($scope.marker) {
                        L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name);
                    }
                    // zoom the map to the rectangle bounds
                    //mymap.fitBounds(bounds);
                }
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.popup = function (name) {
        for (var i = 0; i < $scope.detailedResult.length; i++) {
            if ($scope.detailedResult[i].name == name) {
                L.marker($scope.detailedResult[i].bounds[0]).addTo(mymap).bindPopup($scope.detailedResult[i].name).openPopup();
            }
        }
    }
}]);