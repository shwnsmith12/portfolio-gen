const Employee = require('../lib/Employee.js');

test('creates employee object', () => {
    const employee = new Employee('Artie', '219', 'artie@email.com');

    expect(employee.name).toBe('Artie');
    expect(employee.id).toBe('219');
    expect(employee.email).toBe('artie@email.com');
});