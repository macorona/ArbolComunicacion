(function () {
    'use strict';

    angular
    .module('myApp')
    .component('autenticarComponent', {
        templateUrl: 'app/componentes/autenticarComponent.html',
        controller: autenticarCtrl,
        controllerAs: 'vm'

    }).config(function () {
        var config1 = {
          apiKey: "AIzaSyDwFNzbY9RSy9V466M43xiXygmrCcqFkvM",
          authDomain: "arbolcomunicacion-d1bd8.firebaseapp.com",
          databaseURL: "https://arbolcomunicacion-d1bd8.firebaseio.com",
          projectId: "arbolcomunicacion-d1bd8",
          storageBucket: "arbolcomunicacion-d1bd8.appspot.com",
          messagingSenderId: "728418408928"
        };
        firebase.initializeApp(config1); 
        /*
        var config2 = {
            apiKey: "AIzaSyAEFPjNsu2rVh9_qXEfWss4lFtU1z38MM4",
            authDomain: "participantes-83ac3.firebaseapp.com",
            projectId: "participantes-83ac3",
            storageBucket: "participantes-83ac3.appspot.com",
            messagingSenderId: "897324640858",
            appId: "1:897324640858:web:42616361ee7b8246344663",
            measurementId: "G-CDDP0YQC10"
          };
          firebase.initializeApp(config2, "secondary");     */   
  
    });

    function autenticarCtrl($rootScope, $scope, $location, $http, $firebaseArray) {
        var vm = this;
        //var listaUsuariosValidos;
        vm.login = login;
        var isInicio = 0;
        var isLoaded = 0;
        var usuariosRef = firebase.database().ref('usuarios');
        var listaUsuariosValidos = $firebaseArray(usuariosRef);
        $scope.listaUsuariosValidos = listaUsuariosValidos;

        console.log('En autenticarCtrl');

        $scope.listaUsuariosValidos.$loaded()
        .then(function(x) {
          for(var i=0; i<x.length;i++) {
            var obj = x[i];
            console.info("Autent.nombre: " + obj.nombre);
            console.info("Autent.usuario: " + obj.usuario);
            console.info("Autent.password: " + obj.password);
          }

          if(isLoaded == 0 && isInicio == 1) {
            procesoValidar(); 
          } 
          isLoaded = 1;

        })
        .catch(function(error) {
          console.log("Error:", error);
        });

        /*$http({ method: "GET", url: 'app/recursos/json/listaUsuariosValidos.json' })
        .then(function (response) {
            listaUsuariosValidos = response.data;
            console.log("institucion:" + listaUsuariosValidos.institucion);
            console.log(listaUsuariosValidos.usuarios);
        });*/

        

        function login() {
            vm.dataLoading = true;
            console.log('user:' + vm.username);
            console.log('pass:' + vm.password);

            if(isLoaded == 1) {
                procesoValidar();    
            }

            isInicio = 1;

            /*if(validarCredenciales($scope.listaUsuariosValidos, vm.username, vm.password)) {    
                $location.path('/home');
            } else {
                Materialize.toast('El Usuario no esta registrado', 4000, 'rounded');
            }*/

            vm.dataLoading = false;
        } 

        function procesoValidar() {
            if(validarCredenciales($scope.listaUsuariosValidos, vm.username, vm.password)) { 
                $rootScope.IsVisible = !$rootScope.IsVisible;   
                $location.path('/home');
            } else {
                Materialize.toast('El Usuario no esta registrado', 4000, 'rounded');
            }            
        }

    }

/*    function autenticarCtrl($location, $http) {
        var vm = this;
        var listaUsuariosValidos;
        vm.login = login;

        console.log('En autenticarCtrl');

        $http({ method: "GET", url: 'app/recursos/json/listaUsuariosValidos.json' })
        .then(function (response) {
            listaUsuariosValidos = response.data;
            console.log("institucion:" + listaUsuariosValidos.institucion);
            console.log(listaUsuariosValidos.usuarios);
        });

        function login() {
            vm.dataLoading = true;
            console.log('user:' + vm.username);
            console.log('pass:' + vm.password);

            console.log(listaUsuariosValidos.usuarios);

            if(validarCredenciales(listaUsuariosValidos.usuarios, vm.username, vm.password)) {
                $location.path('/home');
            } else {
                Materialize.toast('El Usuario no esta registrado', 4000, 'rounded');
            }

            vm.dataLoading = false;
        } 

    }
*/
    function validarCredenciales(listUsuarios, userName, password) {
        var isValido;
        var usuario;
        console.log('En validarCredenciales:' + listUsuarios.length);

        for(var j=0; j<listUsuarios.length; j++) {
            usuario = listUsuarios[j];
            console.log(usuario);
            if(usuario.usuario == userName && usuario.password == password) {
                isValido = 1;
                break;
            } else {
                isValido = 0;
            }
        }

        return isValido;
    }

})();