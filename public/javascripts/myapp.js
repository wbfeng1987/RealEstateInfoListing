var app = angular.module("mainApp", ["ngRoute", "ngResource"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/",{
		templateUrl:"pages/detailListing.html",
		controller: "listingCtrl"
	}).otherwise({
		redirectTo: "/"
	});
}]);

app.controller("listingCtrl", ["$scope", "$resource", '$http',function($scope, $resource, $http) {
	$scope.pageNumber = 1;
	var collection;
	$scope.prev = function(){
		if($scope.pageNumber == 1)	return;
		$scope.pageNumber --;
		collection = $resource('/api/listing/:n', {n: $scope.pageNumber});
		collection.query(function(data) {
			$scope.listings = JSON.parse(JSON.stringify(data, null, 4).replace(/commons:/g , ""));
			console.log($scope.pageNumber);
		});
	};

	$scope.next = function(){
		if($scope.pageNumber > 100)	return;
		$scope.pageNumber++;
		collection = $resource('/api/listing/:n', {n: $scope.pageNumber});
		collection.query(function(data) {
			$scope.listings = JSON.parse(JSON.stringify(data, null, 4).replace(/commons:/g , ""));
//			console.log($scope.pageNumber);
		});
	};

	$scope.jump = function(){
		if($scope.pageNumber > 100)	return;
		collection = $resource('/api/listing/:n', {n: $scope.pageNumber});
		collection.query(function(data) {
			$scope.listings = JSON.parse(JSON.stringify(data, null, 4).replace(/commons:/g , ""));
//			console.log($scope.pageNumber);
		});
	};

	$scope.tran = function(index){
		if ($scope.showDesc) $scope.showDesc = false;
		else $scope.showDesc = true;
		// next step: can I use AngularJS here instead of jQuery
//		console.log($scope.listings[index]);
		$http({
			method: "GET",
			url: "https://www.googleapis.com/language/translate/v2",
	//		dataType: "jsonp",
			headers: {
				"X-HTTP-Method-Override": "GET",
				"Access-Control-Allow-Origin": "http://www.googleapis.com/"
			},
			// use params instead of data here!
			params: {
				key: "AIzaSyCw53gNx7awjiSp-1q3ZmF3XImgYxKCaMk",
				source: "en",
				target: "zh",
				callback: "translateText",
				q: $scope.listings[index].ListingDescription
			}
		}).then(function(resp) {
			$scope.listings[index].ListingDescription = JSON.parse(resp.data.replace(/\/\/ API callback/g , "")
				.replace(/translateText\(/g , "")
				.replace(/\);/g , "")).data.translations[0].translatedText;
		});
	};

	collection = $resource("/api/listing");
	collection.query(function(data) {
		$scope.listings = JSON.parse(JSON.stringify(data, null, 4).replace(/commons:/g , ""));
	})

}]);