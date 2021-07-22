(function() {
    'use strict';

    angular.module('myApp', ['firebase'])
          .component('mensajeComponent', {
              templateUrl: 'app/componentes/mensajeComponent.html',
              controller: mensajeCtrl,
              controllerAs: 'vm'

          })
          .config(function() {
            var config = {
              apiKey: "AIzaSyDwFNzbY9RSy9V466M43xiXygmrCcqFkvM",
              authDomain: "arbolcomunicacion-d1bd8.firebaseapp.com",
              databaseURL: "https://arbolcomunicacion-d1bd8.firebaseio.com",
              projectId: "arbolcomunicacion-d1bd8",
              storageBucket: "",
              messagingSenderId: "728418408928"
            };
            firebase.initializeApp(config);

          });      

    function mensajeCtrl($http, $scope, $firebaseArray) {
      var vm = this;
      vm.listaEmpleados = null;

      $http({method:"GET",url:'app/recursos/json/listaEmpleados.json'})
        .then(function (response) {
          vm.listaEmpleados = response.data;
      });

      $('#btnMensaje').click(function() {
        $('#modal1').modal('open');
      });

      $('select').material_select();

      /*var taskRef = firebase.database().ref('tasks');
      var tasks = $firebaseArray(taskRef);
      $scope.tasks = tasks;

      $scope.debugClick = function(task) {
        console.info(task);
      }

      $scope.addTask = function(text) {
        //$scope.tasks.push({text:text, done:false});
        $scope.tasks.$add({text: text, done:false});
        console.log(text);
        $scope.taskText = "";
      }
      $scope.removeTask = function(index) {
        console.log("indice eliminado: " + index);
        //$scope.tasks.splice(index,1);
        $scope.tasks.$remove(index);
      } */
    }
})();

/*(function() {
    'use strict';

    angular.module('myApp', ['firebase'])
          .component('mensajeComponent', {
              templateUrl: 'app/componentes/mensajeComponent.html',
              controller: mensajeCtrl,
              controllerAs: 'vm'

          });

    function mensajeCtrl($http) {
      var vm = this;
      vm.listaEmpleados = null;

      $http({method:"GET",url:'app/recursos/json/listaEmpleados.json'})
        .then(function (response) {
          vm.listaEmpleados = response.data;
      });

      $('#btnMensaje').click(function() {
        $('#modal1').modal('open');
      });
*/
