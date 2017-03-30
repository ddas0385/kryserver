(function () {
  'use strict';

  angular
    .module('templatetypes')
    .controller('TemplatetypesListController', TemplatetypesListController);

  TemplatetypesListController.$inject = ['TemplatetypesService'];

  function TemplatetypesListController(TemplatetypesService) {
    var vm = this;

    vm.templatetypes = TemplatetypesService.query();
  }
}());
