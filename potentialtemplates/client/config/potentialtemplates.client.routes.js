(function () {
  'use strict';

  angular
    .module('potentialtemplates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('potentialtemplates', {
        abstract: true,
        url: '/potentialtemplates',
        template: '<ui-view/>'
      })
      .state('potentialtemplates.list', {
        url: '',
        templateUrl: 'modules/potentialtemplates/client/views/list-potentialtemplates.client.view.html',
        controller: 'PotentialtemplatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Potential Templates List'
        }
      })
      .state('potentialtemplates.create', {
        url: '/create',
        templateUrl: 'modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html',
        controller: 'PotentialtemplatesController',
        controllerAs: 'vm',
        resolve: {
          potentialtemplateResolve: newPotentialtemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Potential Template Create'
        }
      })
      .state('potentialtemplates.edit', {
        url: '/:potentialtemplateId/edit',
        templateUrl: 'modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html',
        controller: 'PotentialtemplatesController',
        controllerAs: 'vm',
        resolve: {
          potentialtemplateResolve: getPotentialtemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Potential Template {{ potentialtemplateResolve.name }}'
        }
      })
      .state('potentialtemplates.view', {
        url: '/:potentialtemplateId',
        templateUrl: 'modules/potentialtemplates/client/views/view-potentialtemplate.client.view.html',
        controller: 'PotentialtemplatesController',
        controllerAs: 'vm',
        resolve: {
          potentialtemplateResolve: getPotentialtemplate
        },
        data:{
          pageTitle: 'Potential Template {{ articleResolve.name }}'
        }
      });
  }

  getPotentialtemplate.$inject = ['$stateParams', 'PotentialtemplatesService'];

  function getPotentialtemplate($stateParams, PotentialtemplatesService) {
    return PotentialtemplatesService.get({
      potentialtemplateId: $stateParams.potentialtemplateId
    }).$promise;
  }

  newPotentialtemplate.$inject = ['PotentialtemplatesService'];

  function newPotentialtemplate(PotentialtemplatesService) {
    return new PotentialtemplatesService();
  }
})();
