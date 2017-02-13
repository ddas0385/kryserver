//Regexes service used to communicate Regexes REST endpoints
(function () {
  'use strict';

  angular
    .module('regexes')
    .factory('RegexesService', RegexesService);

  RegexesService.$inject = ['$resource'];

  function RegexesService($resource) {
    return $resource('api/regexes/:regexId', {
      regexId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
