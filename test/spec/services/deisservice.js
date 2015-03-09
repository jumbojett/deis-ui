'use strict';

describe('Service: Deisservice', function () {

  // load the service's module
  beforeEach(module('deisApp'));

  // instantiate service
  var Deisservice;
  beforeEach(inject(function (_Deisservice_) {
    Deisservice = _Deisservice_;
  }));

  it('should do something', function () {
    expect(!!Deisservice).toBe(true);
  });

});
