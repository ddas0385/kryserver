(function () {
  'use strict';

  angular
    .module('fcms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('fcms', {
        abstract: true,
        url: '/fcms',
        template: '<ui-view/>'
      })
      .state('fcms.list', {
        url: '',
        templateUrl: '/modules/fcms/client/views/list-fcms.client.view.html',
        controller: 'FcmsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Fcms List'
        }
      })
      .state('fcms.create', {
        url: '/create',
        templateUrl: '/modules/fcms/client/views/form-fcm.client.view.html',
        controller: 'FcmsController',
        controllerAs: 'vm',
        resolve: {
          fcmResolve: newFcm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Fcms Create'
        }
      })
      .state('fcms.edit', {
        url: '/:fcmId/edit',
        templateUrl: '/modules/fcms/client/views/form-fcm.client.view.html',
        controller: 'FcmsController',
        controllerAs: 'vm',
        resolve: {
          fcmResolve: getFcm
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Fcm {{ fcmResolve.name }}'
        }
      })
      .state('fcms.view', {
        url: '/:fcmId',
        templateUrl: '/modules/fcms/client/views/view-fcm.client.view.html',
        controller: 'FcmsController',
        controllerAs: 'vm',
        resolve: {
          fcmResolve: getFcm
        },
        data: {
          pageTitle: 'Fcm {{ articleResolve.name }}'
        }
      });
  }

  getFcm.$inject = ['$stateParams', 'FcmsService'];

  function getFcm($stateParams, FcmsService) {
    return FcmsService.get({
      fcmId: $stateParams.fcmId
    }).$promise;
  }

  newFcm.$inject = ['FcmsService'];

  function newFcm(FcmsService) {
    return new FcmsService();
  }
}());
