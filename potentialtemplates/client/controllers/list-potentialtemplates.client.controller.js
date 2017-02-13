(function () {
  'use strict';

  angular
    .module('potentialtemplates')
    .controller('PotentialtemplatesListController', PotentialtemplatesListController);

  PotentialtemplatesListController.$inject = ['PotentialtemplatesService'];

  function PotentialtemplatesListController(PotentialtemplatesService) {
    var vm = this;

    vm.potentialtemplates = PotentialtemplatesService.query();
  }
})();
