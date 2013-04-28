function BoardCtrl($scope, $http) {
	$http.get('/v0/boards').then(function(response) {
		$scope.boards = response.data;
		$scope.board = response.data[0];
	});
};
