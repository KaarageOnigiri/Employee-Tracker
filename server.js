const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app,use(express.json());

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'select',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
])
.then((res) =>)

// insert a new department name into the department table
// maybe ${add}-${department} here
app.post(`/api/department`, ({ body }, res) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, res) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

// app.get('/department', ())

// app.post('/api/role', ())


