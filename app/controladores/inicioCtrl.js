(function () {
      'use strict';

      angular
        .module('myApp')
        .component('inicioComponent', {
            templateUrl: '/app/componentes/inicioComponente.html',
            controller: inicioCtrl,
            controllerAs: 'vm'

        });

      function inicioCtrl() {
         var vm = this;
         console.log('En inicioCtrl');
         $('.parallax').parallax();
      }

})();
