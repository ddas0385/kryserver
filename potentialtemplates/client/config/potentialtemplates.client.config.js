(function () {
  'use strict';

  angular
    .module('potentialtemplates')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Potential Templates',
      state: 'potentialtemplates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'potentialtemplates', {
      title: 'List Potential Templates',
      state: 'potentialtemplates.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'potentialtemplates', {
      title: 'Create Potential Template',
      state: 'potentialtemplates.create',
      roles: ['user']
    });
  }
})();
