(function () {
  'use strict';

  angular
    .module('fcms')
    .controller('FcmsListController', FcmsListController);

  FcmsListController.$inject = ['FcmsService'];

  function FcmsListController(FcmsService) {
    var vm = this;

    vm.fcms = FcmsService.query();
  }
})();
