function BoardCtrl($scope, $dialog, $http) {
  	$http.get('/v0/boards').then(function(response) {
		$scope.board = response.data[0];
	});

	$http.get('/v0/cards').then(function(response) {
		$scope.cards = response.data;
	});

	var dialogOptions = {
		controller: 'EditCtrl',
		templateUrl: 'partials/card_editor'
	};

	$scope.edit = function(card){

	var cardToEdit = card;

	$dialog.dialog(angular.extend(dialogOptions, {
		resolve: {card: function() {return angular.copy(cardToEdit);}}        
	}))
	  .open()
	  .then(function(result) {
		if(result) {
		  angular.copy(result, cardToEdit);                
		}
		cardToEdit = undefined;
	});
	};
}

// the dialog is injected in the specified controller
function EditCtrl($scope, card, dialog){
	$scope.card = card;

	$scope.save = function() {
		dialog.close($scope.card);
	};

	$scope.close = function(){
		dialog.close(undefined);
	};
}
