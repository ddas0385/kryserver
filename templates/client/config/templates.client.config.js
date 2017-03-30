(function () {
  'use strict';

  angular
    .module('templates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Templates',
      state: 'templates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'List Templates',
      state: 'templates.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Create Template',
      state: 'templates.create',
      roles: ['user']
    });
  }
}());
