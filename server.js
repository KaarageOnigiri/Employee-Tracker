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
    db.query(`SELECT * FROM employee`, (err, res) => {
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
            message: "Please type the first name of the employee you would like to update:",
            name: 'employeeName'
        },
        {
            type: 'input',
            message: "Please type in the new role ID of the employee:",
            name: 'newRoleID'
        }
    ])
    .then((res) => {
        const sql = `UPDATE employee SET role_id=? WHERE first_name=?`;
        const params = [];
        db.query()
    })
}




// app.post(`/api/department`, ({ body }, res) => {
//     const sql = `INSERT INTO department (department_name)
//         VALUES (?)`;
//     const params = [body.department_name];

//     db.query(sql, params, (err, res) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         })
//     })
// })
