(function () {
  'use strict';

  // Templates controller
  angular
    .module('templates')
    .controller('TemplatesController', TemplatesController);

  TemplatesController.$inject = ['$scope', '$state', 'Authentication', 'templateResolve', 'TemplatetypesService'];

  function TemplatesController ($scope, $state, Authentication, template, TemplatetypesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.template = template;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    var temptemplatetypes = TemplatetypesService.query(function() {
      vm.templatetypes = temptemplatetypes;
    });

    // Remove existing Template
    function remove() {
      if (confirm('Are you sure you want to delete?')) { // eslint-disable-line no-alert
        vm.template.$remove($state.go('templates.list'));
      }
    }

    // Save Template
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.templateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.template._id) {
        vm.template.$update(successCallback, errorCallback);
      } else {
        vm.template.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('templates.view', {
          templateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
