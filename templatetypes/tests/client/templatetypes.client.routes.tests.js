(function () {
  'use strict';

  describe('Templatetypes Route Tests', function () {
    // Initialize global variables
    var $scope,
      TemplatetypesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TemplatetypesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TemplatetypesService = _TemplatetypesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('templatetypes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/templatetypes');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TemplatetypesController,
          mockTemplatetype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('templatetypes.view');
          $templateCache.put('modules/templatetypes/client/views/view-templatetype.client.view.html', '');

          // create mock Templatetype
          mockTemplatetype = new TemplatetypesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Templatetype Name'
          });

          //Initialize Controller
          TemplatetypesController = $controller('TemplatetypesController as vm', {
            $scope: $scope,
            templatetypeResolve: mockTemplatetype
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:templatetypeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.templatetypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            templatetypeId: 1
          })).toEqual('/templatetypes/1');
        }));

        it('should attach an Templatetype to the controller scope', function () {
          expect($scope.vm.templatetype._id).toBe(mockTemplatetype._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/templatetypes/client/views/view-templatetype.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TemplatetypesController,
          mockTemplatetype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('templatetypes.create');
          $templateCache.put('modules/templatetypes/client/views/form-templatetype.client.view.html', '');

          // create mock Templatetype
          mockTemplatetype = new TemplatetypesService();

          //Initialize Controller
          TemplatetypesController = $controller('TemplatetypesController as vm', {
            $scope: $scope,
            templatetypeResolve: mockTemplatetype
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.templatetypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/templatetypes/create');
        }));

        it('should attach an Templatetype to the controller scope', function () {
          expect($scope.vm.templatetype._id).toBe(mockTemplatetype._id);
          expect($scope.vm.templatetype._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/templatetypes/client/views/form-templatetype.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TemplatetypesController,
          mockTemplatetype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('templatetypes.edit');
          $templateCache.put('modules/templatetypes/client/views/form-templatetype.client.view.html', '');

          // create mock Templatetype
          mockTemplatetype = new TemplatetypesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Templatetype Name'
          });

          //Initialize Controller
          TemplatetypesController = $controller('TemplatetypesController as vm', {
            $scope: $scope,
            templatetypeResolve: mockTemplatetype
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:templatetypeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.templatetypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            templatetypeId: 1
          })).toEqual('/templatetypes/1/edit');
        }));

        it('should attach an Templatetype to the controller scope', function () {
          expect($scope.vm.templatetype._id).toBe(mockTemplatetype._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/templatetypes/client/views/form-templatetype.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
