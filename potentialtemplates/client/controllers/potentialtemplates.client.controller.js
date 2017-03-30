(function () {
  'use strict';

  // Potentialtemplates controller
  angular
    .module('potentialtemplates')
    .controller('PotentialtemplatesController', PotentialtemplatesController);

  PotentialtemplatesController.$inject = ['$scope', '$state', 'Authentication', 'potentialtemplateResolve'];

  function PotentialtemplatesController ($scope, $state, Authentication, potentialtemplate) {
    var vm = this;

    vm.authentication = Authentication;
    vm.potentialtemplate = potentialtemplate;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Potentialtemplate
    function remove() {
      if (confirm('Are you sure you want to delete?')) { // eslint-disable-line no-alert
        vm.potentialtemplate.$remove($state.go('potentialtemplates.list'));
      }
    }

    // Save Potentialtemplate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.potentialtemplateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.potentialtemplate._id) {
        vm.potentialtemplate.$update(successCallback, errorCallback);
      } else {
        vm.potentialtemplate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('potentialtemplates.view', {
          potentialtemplateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
