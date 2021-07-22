(function () {
  'use strict';

  angular.module('myApp')
    .component('mensajeComponent', {
      templateUrl: 'app/componentes/mensajeComponent.html',
      controller: mensajeCtrl,
      controllerAs: 'vm'

   /* }).config(function () {
      var config = {
        apiKey: "AIzaSyDwFNzbY9RSy9V466M43xiXygmrCcqFkvM",
        authDomain: "arbolcomunicacion-d1bd8.firebaseapp.com",
        databaseURL: "https://arbolcomunicacion-d1bd8.firebaseio.com",
        projectId: "arbolcomunicacion-d1bd8",
        storageBucket: "arbolcomunicacion-d1bd8.appspot.com",
        messagingSenderId: "728418408928"
      };
      firebase.initializeApp(config);*/

    });

  /*todoApp.controller('todoController',['$scope', '$firebaseArray', function($scope, $firebaseArray) {

      var comentarioRef = firebase.database().ref('comentarios');
      var comentarios = $firebaseArray(comentarioRef);
      $scope.comentarios = comentarios;

      $scope.debugClick = function(comentario) {
        console.info(comentario);
      }

      $scope.addComentario = function(nombre, comentario) {
        //$scope.tasks.push({text:text, done:false});
        //$scope.users.$add({nombre:nombre, comentario: comentario});
        console.log(nombre + comentario);
        //$scope.taskText = "";
      }
      $scope.removeComentario = function(index) {
        console.log("indice eliminado: " + index);
        //$scope.tasks.splice(index,1);
        $scope.comentarios.$remove(index);
      }
      

  }]); */


  function mensajeCtrl($http, $scope, $firebaseArray, $window) {
    var vm = this;
    vm.listaEmpleados = null;
    vm.empleado = null;
    vm.nombre = null;
    vm.comentariosEmpleado = null;

    $http({ method: "GET", url: 'app/recursos/json/listaEmpleados.json' })
      .then(function (response) {
        vm.listaEmpleados = response.data;
      });

    $('#btnMensaje').click(function () {
      $('#modal1').modal('open');
    });

    console.log('En MensajeCtrl');
    /*$('#btnSubmit').click(function() {
      console.log("envio comentario");

    });*/

    $('select').material_select();

    var comentarioRef = firebase.database().ref('comentarios');
    var comentarios = $firebaseArray(comentarioRef);
    $scope.comentarios = comentarios;
    $scope.comentario = null;

    comentarios.$loaded()
    .then(function(x) {
      for(var i=0; i<x.length;i++) {
        var obj = x[i];
        console.info("aux.nombre: " + obj.nombre);
        console.info("aux.comentario: " + obj.password);
      }
      
    })
    .catch(function(error) {
      console.log("Error:", error);
    });

    $scope.debugClick = function (comentario) {
      console.info(comentario);
    }

    /*$scope.getNombre = function(empleado) {
      var emp = null;
      if (empleado != undefined) {
        emp = JSON.parse(empleado);
        console.log(emp.nombre);
        vm.nombre = emp.nombre;
      } else {
        console.log("debe seleccionar un empleado");
        Materialize.toast('Debes seleccionar un empleado', 4000, 'rounded');
      }

    } */

    $scope.addComentario = function (empleado, comentario) {
      //$scope.tasks.push({text:text, done:false});
      //$scope.users.$add({nombre:nombre, comentario: comentario})

      //$scope.taskText = "";
      console.log("nombre: " + empleado);
      console.log("COMENARIO: " + comentario);
      var empl;

      if (comentario == "" || comentario == null) {
        console.log("debe agregar un comentario");
        Materialize.toast('Debes agragar un comentario', 4000, 'rounded');

      } else {
        empl = JSON.parse(empleado);
        $scope.comentarios.$add({ nombre: empl.nombre, comentario: comentario });
        $scope.comentario = "";

      }

      $("#frameSelect").val($("#frameSelect").data("default-value"));

    }

    $scope.removeComentario = function (index, nombre) {

      $window.alert("¿Estas seguro de eliminar el mensaje?");
      console.log("Se elimina el comentario");
      console.log("indice eliminado: " + index);
      console.log("nombre: " + nombre);
      //$scope.tasks.splice(index,1);
      $scope.comentarios.$remove(index);
      //vm.comentariosEmpleado = obtenerMensajes(nombre, $scope.comentarios);
      //$scope.$apply();
      //$('#selectEmpleado').trigger('click');
      //console.log(vm.comentariosEmpleado);


    }

    $scope.mensajesEmpleado = function (empleado) {
      console.log("seleccion: " + empleado);


      if (empleado == "" || empleado == null) {
        vm.comentariosEmpleado = null;
      } else {
        vm.empleado = JSON.parse(empleado);
        vm.comentariosEmpleado = obtenerMensajes(vm.empleado.nombre, $scope.comentarios);

      }
    }

  }

  function obtenerMensajes(nombre, listaComentarios) {

    return listaComentarios.filter(function (empleado) {

      return (empleado.nombre == nombre);

    });

  }
})();

/*(function() {
    'use strict';

    angular.module('myApp')
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
