(function () {
  'use strict';

  angular
    .module('regexes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Regexes',
      state: 'regexes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'regexes', {
      title: 'List Regexes',
      state: 'regexes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'regexes', {
      title: 'Create Regex',
      state: 'regexes.create',
      roles: ['user']
    });
  }
}());
