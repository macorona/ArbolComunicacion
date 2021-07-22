(function () {
  'use strict';

  angular
    .module('myApp')
    .component('registrarComponent', {
      templateUrl: '/app/componentes/registrarComponent.html',
      controller: registrarCtrl,
      controllerAs: 'vm'
    });

  function registrarCtrl($http, $scope, $location, $firebaseArray) {
    var vm = this;
    //var listaUsuariosValidos;
    //vm.listaUsuariosValidos = listaUsuariosValidos;

    console.log('En RegistrarCtrl');

    $scope.listaTitulos = null;
    vm.titulo = null;
    vm.registrar = registrar;

    var usuariosRef = firebase.database().ref('usuarios');
    var listaUsuariosValidos = $firebaseArray(usuariosRef);
    $scope.listaUsuariosValidos = listaUsuariosValidos;

    $scope.listaUsuariosValidos.$loaded()
      .then(function (x) {
        for (var i = 0; i < x.length; i++) {
          var obj = x[i];
          console.info("Registrar.nombre: " + obj.nombre);
          console.info("Registrar.usuario: " + obj.usuario);
          console.info("Registrar.password: " + obj.password);
        }

      })
      .catch(function (error) {
        console.log("Error:", error);
      });

    $http({ method: "GET", url: 'app/recursos/json/listaTitulos.json' })
      .then(function (response) {
        $scope.listaTitulos = response.data;
        vm.listaTitulos = response.data;
      });

    $('select').material_select();

    /*$http({ method: "GET", url: 'app/recursos/json/listaUsuariosValidos.json' })
      .then(function (response) {
        listaUsuariosValidos = response.data;
        console.log(listaUsuariosValidos.usuarios);
      });
      */
    function registrar() {
      vm.dataLoading = true;
      console.log('user:' + vm.nombre);
      console.log('user:' + vm.usuario);
      console.log('pass:' + vm.password);
      console.log('confPass:' + vm.confPassword);

      if (validarPasswordConfirmacion(vm.password, vm.confPassword)) {
        if (procesoRegistro($scope.listaUsuariosValidos, vm.nombre, vm.usuario, vm.password)) {
          Materialize.toast('Registro Exitoso', 4000, 'rounded');
          $location.path('/autenticar');
        } 
      } else {
        Materialize.toast('La confirmación del password no coincide', 4000, 'rounded');
      }

      vm.dataLoading = false;
    }

  }

  function validarPasswordConfirmacion(password, confirmacion) {
    if (password == confirmacion) {
      return 1;
    } else {
      return 0;
    }
  }

  function procesoRegistro(listaUsuarios, p_nombre, p_usuario, p_password) {
    var isValido;
    var nuevoUsuario;
    nuevoUsuario = {
      "nombre": p_nombre,
      "usuario": p_usuario,
      "password": p_password
    };

    //listaUsuarios.usuarios.push(nuevoUsuario);
    //console.log(listaUsuarios.usuarios);
    //verificar si ya existe en la lista
    for (var j = 0; j < listaUsuarios.length; j++) {
      var usuario = listaUsuarios[j];
      console.log(usuario);
      if (usuario.usuario == p_nombre) {
        isValido = 1;
        break;
      } else {
        isValido = 0;
      }
    }

    if(isValido == 1) {
      Materialize.toast('El usuario ya existe, ¡Verificar!', 4000, 'rounded');
      return 0;
    }

    console.log("nuevoUsuario: " + nuevoUsuario);
    listaUsuarios.$add(nuevoUsuario);

   /* if (comentario == "" || comentario == null) {
      console.log("debe agregar un comentario");
      Materialize.toast('Debes agragar un comentario', 4000, 'rounded');

    } else {
      empl = JSON.parse(empleado);
      $scope.comentarios.$add({ nombre: empl.nombre, comentario: comentario });

    }
    //listaUsuarios.$add({ nombre: nombre, usuario: usuario, password:password });*/

    return 1;
  }

})();