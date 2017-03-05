//Fcms service used to communicate Fcms REST endpoints
(function () {
  'use strict';

  angular
    .module('fcms')
    .factory('FcmsService', FcmsService);

  FcmsService.$inject = ['$resource'];

  function FcmsService($resource) {
    return $resource('api/fcms/:fcmId', {
      fcmId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
