(function () {
  'use strict';

  angular
    .module('templatetypes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('templatetypes', {
        abstract: true,
        url: '/templatetypes',
        template: '<ui-view/>'
      })
      .state('templatetypes.list', {
        url: '',
        templateUrl: '/modules/templatetypes/client/views/list-templatetypes.client.view.html',
        controller: 'TemplatetypesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Templatetypes List'
        }
      })
      .state('templatetypes.create', {
        url: '/create',
        templateUrl: '/modules/templatetypes/client/views/form-templatetype.client.view.html',
        controller: 'TemplatetypesController',
        controllerAs: 'vm',
        resolve: {
          templatetypeResolve: newTemplatetype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Templatetypes Create'
        }
      })
      .state('templatetypes.edit', {
        url: '/:templatetypeId/edit',
        templateUrl: '/modules/templatetypes/client/views/form-templatetype.client.view.html',
        controller: 'TemplatetypesController',
        controllerAs: 'vm',
        resolve: {
          templatetypeResolve: getTemplatetype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Templatetype {{ templatetypeResolve.name }}'
        }
      })
      .state('templatetypes.view', {
        url: '/:templatetypeId',
        templateUrl: '/modules/templatetypes/client/views/view-templatetype.client.view.html',
        controller: 'TemplatetypesController',
        controllerAs: 'vm',
        resolve: {
          templatetypeResolve: getTemplatetype
        },
        data: {
          pageTitle: 'Templatetype {{ articleResolve.name }}'
        }
      });
  }

  getTemplatetype.$inject = ['$stateParams', 'TemplatetypesService'];

  function getTemplatetype($stateParams, TemplatetypesService) {
    return TemplatetypesService.get({
      templatetypeId: $stateParams.templatetypeId
    }).$promise;
  }

  newTemplatetype.$inject = ['TemplatetypesService'];

  function newTemplatetype(TemplatetypesService) {
    return new TemplatetypesService();
  }
}());
