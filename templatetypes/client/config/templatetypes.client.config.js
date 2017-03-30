(function () {
  'use strict';

  angular
    .module('templatetypes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Template Types',
      state: 'templatetypes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templatetypes', {
      title: 'List Template Types',
      state: 'templatetypes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'templatetypes', {
      title: 'Create Template Type',
      state: 'templatetypes.create',
      roles: ['user']
    });
  }
}());
