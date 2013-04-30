angular.module('bodo.filters', []).
	filter('byPhase', function() {
		return function(cards, phase) {
			return $.grep(cards, function(e) {
				return e.phase === phase });
		}});
