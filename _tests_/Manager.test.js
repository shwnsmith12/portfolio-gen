const Manager = require('../lib/Manager.js');

test('creates manager object', () => {
    const manager = new Manager('Carson', '11', 'carson@email.com', '2');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
});