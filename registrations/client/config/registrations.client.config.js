(function () {
  'use strict';

  angular
    .module('registrations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Registrations',
      state: 'registrations',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'registrations', {
      title: 'List Registrations',
      state: 'registrations.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'registrations', {
      title: 'Create Registration',
      state: 'registrations.create',
      roles: ['user']
    });
  }
}());
