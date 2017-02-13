(function () {
  'use strict';

  // Templatetypes controller
  angular
    .module('templatetypes')
    .controller('TemplatetypesController', TemplatetypesController);

  TemplatetypesController.$inject = ['$scope', '$state', 'Authentication', 'templatetypeResolve'];

  function TemplatetypesController ($scope, $state, Authentication, templatetype) {
    var vm = this;

    vm.authentication = Authentication;
    vm.templatetype = templatetype;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Templatetype
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.templatetype.$remove($state.go('templatetypes.list'));
      }
    }

    // Save Templatetype
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.templatetypeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.templatetype._id) {
        vm.templatetype.$update(successCallback, errorCallback);
      } else {
        vm.templatetype.$save(successCallback, errorCallback);
      }
        
      function successCallback(res) {
        $state.go('templatetypes.view', {
          templatetypeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
