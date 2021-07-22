(function() {
    'use strict';

    angular.module('myApp')
          .component('footerComponent', {
              templateUrl: 'app/componentes/footerComponent.html',
              controller: footerCtrl,
              controllerAs: 'vm'

          });

    function footerCtrl() {
      var vm = this;
    }
})();
