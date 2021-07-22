//var nodemailer = require('nodemailer');

(function () {
  'use strict';

  angular
    .module('myApp')
    .component('empleadosComponent', {
      templateUrl: 'app/componentes/empleadosComponent.html',
      controller: empleadosCtrl,
      controllerAs: 'vm'

    }).directive("empleadoDirective", function () {
      return {
        template: '<div><p><img id="imagenEmpleado" src="/app/recursos/imagenes/{{vm.empleado.imagen}}">Clave: {{vm.empleado.clave}} <br/>Puesto: {{vm.empleado.puesto}} <br/>Rol: {{vm.empleado.rol}} <br/>Oficina: {{vm.empleado.oficina}} <br/>Email: {{vm.empleado.email}} <br/>Tel. Oficina: {{vm.empleado.tel_ofi}} <br/>Tel. Casa: {{vm.empleado.tel_casa}} <br/>Movil: {{vm.empleado.movil}}</p></div>'
      };
    });

  function empleadosCtrl($http, $scope, $window) {
    var vm = this;

    //vm.listaEmpleados = null;
    //<img id="imagenEmpleado" src=app/recursos/imagenes/{{vm.empleado.imagen}}>
    $scope.listaEmpleados = null;
    $scope.isVisble = false;
    vm.empleado = null;
    vm.relacionados = null;

    $http({ method: "GET", url: 'app/recursos/json/listaEmpleados.json' })
      .then(function (response) {
        $scope.listaEmpleados = response.data;
        vm.listaEmpleados = response.data;
      });

    $('select').material_select();

    $scope.cambioEmpleado = function (empleado) {
      //console.log(empleado);

      if (empleado == undefined || empleado == "") {
        $scope.isVisble = false;
      } else {
        $scope.isVisble = true;
      }

      vm.empleado = JSON.parse(empleado);

      console.log('grupo:' + vm.empleado.grupo);
      console.log(vm.listaEmpleados.empleados);
      vm.relacionados = obtenerRelacionados(vm.empleado.grupo, vm.empleado.clave, vm.listaEmpleados.empleados);

      console.log(vm.relacionados);

    }

  
    $('.tooltipped').tooltip({ delay: 50 });
    $('.collapsible').collapsible();

    $('#btnMail').click(function () {
      //***Para la prueba de JS
      $('#modal1').modal('open');

      //***Para la prueba de alertas
      /*var r = window.confirm("¿Estas seguro de envíar el correo?");
      if (r == true) {
        console.log('enviar');
        Materialize.toast('Se envió el correo', 4000, 'rounded');
      } else {
        console.log('cancelar');
        Materialize.toast('Se cancela el correo', 4000, 'rounded');
      }*/
    });

    $('#btnEnviar').click(function () {
      console.log('enviar');
      Materialize.toast('Se envió el correo', 4000, 'rounded');
      /*transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });*/
    });

    $('#btnCancelar').click(function () {
      console.log('cancela correo');
      Materialize.toast('Se cancela el correo', 4000, 'rounded');
    });

    //envio de email's 
    /*var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'sygfryd2006@gmail.com',
         pass: 'Libertad'
       }
     });

     var mailOptions = {
       from: 'sygfryd2006@gmail.com',
       to: 'sygfryd2006@yahoo.com.mx',
       subject: 'Sending Email using Node.js',
       text: 'That was easy!'
     };*/

    /*transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });*/

  }

  function obtenerRelacionados(grupo, clave, listaEmpleados) {

    return listaEmpleados.filter(function (empleado) {

      return (empleado.grupo == grupo && empleado.clave != clave);

    });

  }
})();
