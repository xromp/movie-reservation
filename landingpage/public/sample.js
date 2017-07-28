(function(){
	angular
		.module('billingapp',[])
		.controller('CheckoutCtrl',CheckoutCtrl)

		CheckoutCtrl.$inject = ['$scope','$firebaseObject','$firebaseArray', '$uibModal', 'MovieSrvc']
		function CheckoutCtrl($scope, $firebaseObject, $firebaseArray, $uibModal, MovieSrvc){
			var vm = this;
			const ref = firebase.database().ref();
			const movieListRef = ref.child('movie');

			vm.movieList = $firebaseArray(movieListRef.limitToFirst(4));
	      	movieListRef.on('child_changed', snap=> {
				const newMovieKey = movieListRef.push().key;
		        // var movieAddNewFromClient = movieListRef.child(newMovieKey);
	         //    var data = {
	         //        'showingdate':"dataCopy.showingdate",
	         //        'banner':"dataCopy.banner",
	         //        'frame':"dataCopy.frame",
	         //        'title':"dataCopy.title",
	         //        'desc':"dataCopy.desc",
	         //        'col':"dataCopy.col",
	         //        'row':"dataCopy.row"
	         //    };
		        // movieAddNewFromClient.set(data);
		     });
			console.log("Checkout Controller here@!",vm.movieList);
		}
})();