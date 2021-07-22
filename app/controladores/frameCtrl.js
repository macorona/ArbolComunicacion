(function () {
    'use strict';

    angular
        .module('myApp')
        .component('frameComponent', {
            templateUrl: '/app/componentes/frameComponent.html',
            controller: frameCtrl,
            controllerAs: 'vm'

        });

    function frameCtrl($scope) {
        var vm = this;
        console.log('En frameCtrl');
        vm.upload = upload;

        function upload() {
            vm.dataLoading = true;
            Materialize.toast('Se cargo el archivo correctamente', 4000, 'rounded');
            vm.dataLoading = false;
          }    

    }

})();