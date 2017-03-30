(function () {
  'use strict';

  angular
    .module('fcms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Fcms',
      state: 'fcms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'fcms', {
      title: 'List Fcms',
      state: 'fcms.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'fcms', {
      title: 'Create Fcm',
      state: 'fcms.create',
      roles: ['user']
    });
  }
}());
