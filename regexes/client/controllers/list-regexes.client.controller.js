(function () {
  'use strict';

  angular
    .module('regexes')
    .controller('RegexesListController', RegexesListController);

  RegexesListController.$inject = ['RegexesService'];

  function RegexesListController(RegexesService) {
    var vm = this;

    vm.regexes = RegexesService.query();
  }
})();
