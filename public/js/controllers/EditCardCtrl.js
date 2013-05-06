app.controller('EditCardCtrl', ['$scope', '$dialog', 'card', function($scope, dialog, card) {
	$scope.card = card;
	$scope.submit = function() {
		dialog.close('ok');
	};
}]);
