(function () {
  'use strict';

  angular
    .module('potentialtemplates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Potential Templates',
      state: 'potentialtemplates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'potentialtemplates', {
      title: 'List Potential Templates',
      state: 'potentialtemplates.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'potentialtemplates', {
      title: 'Create Potential Template',
      state: 'potentialtemplates.create',
      roles: ['user']
    });
  }
}());
