const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee.js');
const fs = require('fs');
const pageTemplate = require('./dist/pageTemplate');

//Array for Employees to push data
var employees = [];

// Prompts for Making Manger Profile
const managerProfile = function () {
    // Prompts for manager input
   return inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: "What is the team manager's name?",
            validate: name => {
                if (name) {
                    return true;
                } else {
                    console.log('Please enter a valid name.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'id',
            message: 'What is the employee ID?',
            validate: id => {
                if (id) {
                    return true;
                } else {
                    console.log('Please enter a valid ID.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'email',
            message: 'What is the email address of the employee?',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter a valid email.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'office',
            message: 'What is the office number of the employee?',
            validate: office => {
                if (office) {
                    return true;
                } else {
                    console.log('Please enter a valid office number.');
                    return false;
                }
            }
        },
    ])
    //Takes data to generate profile asynchronously
    .then(managerData => {
        const { name, id, email, officeNumber } = managerData;
        const manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);
    })
};

const menu = function () {
    // Select Role Type
  return  inquirer.prompt([
        {
        type: 'list',
        message: 'What employee would you like to add?',
        name: 'role',
        choices: ['Engineer', 'Intern']
        },
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a valid name.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'id',
            message: 'What is the employee ID?',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter a valid ID.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'email',
            message: 'What is the email address of the employee?',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter a valid email.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'github',
            message: 'What is GitHub username of employee?',
            when: (input) => input.role === 'Engineer',
            validate: github => {
                if (github) {
                    return true;
                } else {
                    console.log('Please enter a valid github username.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'school',
            message: 'Where does the intern attend school?',
            when: (input) => input.role === 'Intern',
            validate: school => {
                if (school) {
                    return true;
                } else {
                    console.log('Please enter a valid school name.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: false
        }
    ])
    .then(employeesData => {
        let { name , id, email, role, github, school, confirmAddEmployee} = employeesData;
        let employee;

        if(role === 'Engineer') {
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        } else if (role === "Intern") {
            employee = new Intern(name, id, email, school);
            console.log(employee);
        }
        employees.push(employee);

        if(confirmAddEmployee) {
            return menu(employees)
        } else {
            return employees;
        }
    })
    
};

managerProfile()
.then(menu)
.then(data => {
    const pageHTML = pageTemplate(data)

    fs.writeFile('./index.html', pageHTML, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your portfolio page has been created! Check out index.html")
        }
    })
});