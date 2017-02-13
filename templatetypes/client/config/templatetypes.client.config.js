(function () {
  'use strict';

  angular
    .module('templatetypes')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Template Types',
      state: 'templatetypes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'templatetypes', {
      title: 'List Template Types',
      state: 'templatetypes.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'templatetypes', {
      title: 'Create Template Type',
      state: 'templatetypes.create',
      roles: ['user']
    });
  }
})();
