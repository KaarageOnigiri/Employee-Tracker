SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, department.department_name AS Department, employee.role_id AS Role_ID, role.title AS Job_Title, role.salary AS Salary
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;
