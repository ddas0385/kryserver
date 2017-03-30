(function () {
  'use strict';

  // Regexes controller
  angular
    .module('regexes')
    .controller('RegexesController', RegexesController);

  RegexesController.$inject = ['$scope', '$state', 'Authentication', 'regexResolve'];

  function RegexesController ($scope, $state, Authentication, regex) {
    var vm = this;

    vm.authentication = Authentication;
    vm.regex = regex;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Regex
    function remove() {
      if (confirm('Are you sure you want to delete?')) { // eslint-disable-line no-alert
        vm.regex.$remove($state.go('regexes.list'));
      }
    }

    // Save Regex
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.regexForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.regex._id) {
        vm.regex.$update(successCallback, errorCallback);
      } else {
        vm.regex.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('regexes.view', {
          regexId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
