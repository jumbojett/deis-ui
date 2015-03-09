'use strict';

describe('Controller: DeisAppCtrl', function () {

  // load the controller's module
  beforeEach(module('deisApp'));

  var DeisAppCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeisAppCtrl = $controller('DeisAppCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
