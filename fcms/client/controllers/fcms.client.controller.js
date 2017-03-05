(function () {
  'use strict';

  // Fcms controller
  angular
    .module('fcms')
    .controller('FcmsController', FcmsController);

  FcmsController.$inject = ['$scope', '$state', 'Authentication', 'fcmResolve'];

  function FcmsController ($scope, $state, Authentication, fcm) {
    var vm = this;

    vm.authentication = Authentication;
    vm.fcm = fcm;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Fcm
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.fcm.$remove($state.go('fcms.list'));
      }
    }

    // Save Fcm
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.fcmForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.fcm._id) {
        vm.fcm.$update(successCallback, errorCallback);
      } else {
        vm.fcm.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('fcms.view', {
          fcmId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
