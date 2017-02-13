//Templatetypes service used to communicate Templatetypes REST endpoints
(function () {
  'use strict';

  angular
    .module('templatetypes')
    .factory('TemplatetypesService', TemplatetypesService);

  TemplatetypesService.$inject = ['$resource'];

  function TemplatetypesService($resource) {
    return $resource('api/templatetypes/:templatetypeId', {
      templatetypeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();