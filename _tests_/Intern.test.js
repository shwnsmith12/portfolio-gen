const Intern = require('../lib/Intern.js');

test('creates intern object', () => {
    const intern = new Intern('Jamele', '23', 'jamele@email.com', 'University of Texas');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});