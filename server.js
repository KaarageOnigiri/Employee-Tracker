// connecting to all the tools
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Yangwei_95',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

init();
// start up this function to initiate the prompt
function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'select',
            choices: [
                'View All Employees', 
                'Add Employee', 
                'Update Employee Role', 
                'View All Roles', 
                'Add Role', 
                'View All Departments', 
                'Add Department', 
                'Quit'
            ]
        }
    ])
    .then((res) => {
        switch (res.select) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            default:
                quit();
        }
    })
}

function viewAllEmployees() {
    const sql = `SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, department.department_name AS Department, employee.role_id AS Role_ID, role.title AS Job_Title, role.salary AS Salary
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id;`
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        init();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please type new employee's first name:",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "Please type new employee's last name:",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "Please type new employee's role ID:",
            name: 'roleID'
        },
        {
            type: 'input',
            message: "Please type new employee's manager ID:",
            name: 'managerID'
        }
    ])
    .then((res) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [res.firstName, res.lastName, res.roleID, res.managerID];

        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please type the ID of the employee you would like to update:",
            name: 'employeeID'
        },
        {
            type: 'input',
            message: "Please type in the new role (Role ID) of the employee:",
            name: 'newRoleID'
        }
    ])
    .then((res) => {
        const sql = `UPDATE employee SET role_id=? WHERE id=?`;
        const params = [res.newRoleID, res.employeeID];
        db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function viewAllRoles() {
    const sql = `SELECT * FROM role;`
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        init();
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please type the title of the new role:",
            name: 'newRole'
        },
        {
            type: 'input',
            message: "Please type the salary of the new role:",
            name: 'roleSalary'
        },
        {
            type: 'input',
            message: "Please type the department ID of the new role:",
            name: 'departmentID'
        }
    ])
    .then((res) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [res.newRole, res.roleSalary, res.departmentID];

        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function viewAllDepartments() {
    const sql = `SELECT * FROM department;`
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.table(res);
        init();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please type the new department's name:",
            name: 'newDepartment',
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                const done = this.async();

                if (input.length < 1) {
                // Pass the return value in the done callback
                done('Cannot have less than one character');
                } else {
                // Pass the return value in the done callback
                done(null, true);
                }
               
              }
        }
    ])
    .then((res) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [res.newDepartment];

        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

// end the mysql connection
function quit() {
    console.info('Ending Connection...');
    db.end();
}
