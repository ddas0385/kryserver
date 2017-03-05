(function () {
  'use strict';

  angular
    .module('fcms')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Fcms',
      state: 'fcms',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'fcms', {
      title: 'List Fcms',
      state: 'fcms.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'fcms', {
      title: 'Create Fcm',
      state: 'fcms.create',
      roles: ['user']
    });
  }
})();
