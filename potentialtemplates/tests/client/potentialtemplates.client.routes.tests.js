(function () {
  'use strict';

  describe('Potentialtemplates Route Tests', function () {
    // Initialize global variables
    var $scope,
      PotentialtemplatesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PotentialtemplatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PotentialtemplatesService = _PotentialtemplatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('potentialtemplates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/potentialtemplates');
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
          PotentialtemplatesController,
          mockPotentialtemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('potentialtemplates.view');
          $templateCache.put('modules/potentialtemplates/client/views/view-potentialtemplate.client.view.html', '');

          // create mock Potentialtemplate
          mockPotentialtemplate = new PotentialtemplatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Potentialtemplate Name'
          });

          //Initialize Controller
          PotentialtemplatesController = $controller('PotentialtemplatesController as vm', {
            $scope: $scope,
            potentialtemplateResolve: mockPotentialtemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:potentialtemplateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.potentialtemplateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            potentialtemplateId: 1
          })).toEqual('/potentialtemplates/1');
        }));

        it('should attach an Potentialtemplate to the controller scope', function () {
          expect($scope.vm.potentialtemplate._id).toBe(mockPotentialtemplate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/potentialtemplates/client/views/view-potentialtemplate.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PotentialtemplatesController,
          mockPotentialtemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('potentialtemplates.create');
          $templateCache.put('modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html', '');

          // create mock Potentialtemplate
          mockPotentialtemplate = new PotentialtemplatesService();

          //Initialize Controller
          PotentialtemplatesController = $controller('PotentialtemplatesController as vm', {
            $scope: $scope,
            potentialtemplateResolve: mockPotentialtemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.potentialtemplateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/potentialtemplates/create');
        }));

        it('should attach an Potentialtemplate to the controller scope', function () {
          expect($scope.vm.potentialtemplate._id).toBe(mockPotentialtemplate._id);
          expect($scope.vm.potentialtemplate._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PotentialtemplatesController,
          mockPotentialtemplate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('potentialtemplates.edit');
          $templateCache.put('modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html', '');

          // create mock Potentialtemplate
          mockPotentialtemplate = new PotentialtemplatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Potentialtemplate Name'
          });

          //Initialize Controller
          PotentialtemplatesController = $controller('PotentialtemplatesController as vm', {
            $scope: $scope,
            potentialtemplateResolve: mockPotentialtemplate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:potentialtemplateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.potentialtemplateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            potentialtemplateId: 1
          })).toEqual('/potentialtemplates/1/edit');
        }));

        it('should attach an Potentialtemplate to the controller scope', function () {
          expect($scope.vm.potentialtemplate._id).toBe(mockPotentialtemplate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/potentialtemplates/client/views/form-potentialtemplate.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
