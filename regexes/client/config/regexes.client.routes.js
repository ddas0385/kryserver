(function () {
  'use strict';

  angular
    .module('regexes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('regexes', {
        abstract: true,
        url: '/regexes',
        template: '<ui-view/>'
      })
      .state('regexes.list', {
        url: '',
        templateUrl: '/modules/regexes/client/views/list-regexes.client.view.html',
        controller: 'RegexesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Regexes List'
        }
      })
      .state('regexes.create', {
        url: '/create',
        templateUrl: '/modules/regexes/client/views/form-regex.client.view.html',
        controller: 'RegexesController',
        controllerAs: 'vm',
        resolve: {
          regexResolve: newRegex
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Regexes Create'
        }
      })
      .state('regexes.edit', {
        url: '/:regexId/edit',
        templateUrl: '/modules/regexes/client/views/form-regex.client.view.html',
        controller: 'RegexesController',
        controllerAs: 'vm',
        resolve: {
          regexResolve: getRegex
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Regex {{ regexResolve.name }}'
        }
      })
      .state('regexes.view', {
        url: '/:regexId',
        templateUrl: '/modules/regexes/client/views/view-regex.client.view.html',
        controller: 'RegexesController',
        controllerAs: 'vm',
        resolve: {
          regexResolve: getRegex
        },
        data: {
          pageTitle: 'Regex {{ articleResolve.name }}'
        }
      });
  }

  getRegex.$inject = ['$stateParams', 'RegexesService'];

  function getRegex($stateParams, RegexesService) {
    return RegexesService.get({
      regexId: $stateParams.regexId
    }).$promise;
  }

  newRegex.$inject = ['RegexesService'];

  function newRegex(RegexesService) {
    return new RegexesService();
  }
}());
