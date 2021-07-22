(function () {
  'use strict';

  angular
    .module('myApp')
    .component('navComponent', {
      templateUrl: 'app/componentes/navComponent.html',
      controller: navCtrl,
      controllerAs: 'vm'

    });

  function navCtrl($rootScope, $scope) {
    var vm = this;
    console.log('En NavCtrl');
    $('.modal').modal();
    // Dropdown
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    //$(".dropdown-button").dropdown();
    //$(".dropdown-trigger").dropdown();

    $scope.IsVisible = false;
    $rootScope.IsVisible = false;

    //funcion que esta visualizando algun cambio de estado
    $rootScope.$watch("IsVisible", function() {
      $scope.IsVisible = $rootScope.IsVisible;
     })

     $scope.ocultarMenu = function () {
      $rootScope.IsVisible = !$rootScope.IsVisible;
     }

  }

})();
