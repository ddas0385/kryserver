//Potentialtemplates service used to communicate Potentialtemplates REST endpoints
(function () {
  'use strict';

  angular
    .module('potentialtemplates')
    .factory('PotentialtemplatesService', PotentialtemplatesService);

  PotentialtemplatesService.$inject = ['$resource'];

  function PotentialtemplatesService($resource) {
    return $resource('api/potentialtemplates/:potentialtemplateId', {
      potentialtemplateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
