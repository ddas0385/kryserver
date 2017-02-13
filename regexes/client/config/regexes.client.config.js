(function () {
  'use strict';

  angular
    .module('regexes')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Regexes',
      state: 'regexes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'regexes', {
      title: 'List Regexes',
      state: 'regexes.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'regexes', {
      title: 'Create Regex',
      state: 'regexes.create',
      roles: ['user']
    });
  }
})();
