(function () {
    'use strict'

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
        .when('/autenticar', {
            template: '<autenticar-component></autenticar-component>',
            controllerAs: 'vm'

        })   
        
        .when('/registrar', {
            template: '<registrar-component></registrar-component>',
            controllerAs: 'vm'

        })


        .when('/home', {
            template: '<inicio-component></inicio-component>',
            controllerAs: 'vm'

        })

        .when('/empleados', {
            template: '<empleados-component></empleados-component>',
            controllerAs: 'vm'

        })

        .when('/mensajes', {
            template: '<mensaje-component></mensaje-component>',
            controllerAs: 'vm'

        })

        .when('/frames', {
            template: '<frame-component></frame-component>',
            controllerAs: 'vm'

        })

        .otherwise({
            redirectTo: '/autenticar'
        });



    }
    angular
    .module('myApp')
    .config(config);

})();
