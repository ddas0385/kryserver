(function () {
  'use strict';

  describe('Regexes Route Tests', function () {
    // Initialize global variables
    var $scope,
      RegexesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RegexesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RegexesService = _RegexesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('regexes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/regexes');
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
          RegexesController,
          mockRegex;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('regexes.view');
          $templateCache.put('modules/regexes/client/views/view-regex.client.view.html', '');

          // create mock Regex
          mockRegex = new RegexesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Regex Name'
          });

          //Initialize Controller
          RegexesController = $controller('RegexesController as vm', {
            $scope: $scope,
            regexResolve: mockRegex
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:regexId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.regexResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            regexId: 1
          })).toEqual('/regexes/1');
        }));

        it('should attach an Regex to the controller scope', function () {
          expect($scope.vm.regex._id).toBe(mockRegex._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/regexes/client/views/view-regex.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RegexesController,
          mockRegex;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('regexes.create');
          $templateCache.put('modules/regexes/client/views/form-regex.client.view.html', '');

          // create mock Regex
          mockRegex = new RegexesService();

          //Initialize Controller
          RegexesController = $controller('RegexesController as vm', {
            $scope: $scope,
            regexResolve: mockRegex
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.regexResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/regexes/create');
        }));

        it('should attach an Regex to the controller scope', function () {
          expect($scope.vm.regex._id).toBe(mockRegex._id);
          expect($scope.vm.regex._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/regexes/client/views/form-regex.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RegexesController,
          mockRegex;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('regexes.edit');
          $templateCache.put('modules/regexes/client/views/form-regex.client.view.html', '');

          // create mock Regex
          mockRegex = new RegexesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Regex Name'
          });

          //Initialize Controller
          RegexesController = $controller('RegexesController as vm', {
            $scope: $scope,
            regexResolve: mockRegex
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:regexId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.regexResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            regexId: 1
          })).toEqual('/regexes/1/edit');
        }));

        it('should attach an Regex to the controller scope', function () {
          expect($scope.vm.regex._id).toBe(mockRegex._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/regexes/client/views/form-regex.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
