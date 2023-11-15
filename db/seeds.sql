INSERT INTO department (department_name)
VALUES ("Auto Department"),
       ("Bakery"),
       ("Pharmacy"),
       ("Meat Department"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Tire Installer", 60000, 1),
       ("Tire Sales Manager", 110000, 1),
       ("Baker", 50000, 2),
       ("Cake Decorater", 55000, 2),
       ("Cashier", 50000, 5),
       ("Licensed Optician", 100000, 3),
       ("Meat Cutter", 65000, 4),
       ("Warehouse Manager", 130000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Water", 8, NULL),
       ("Greg", "Stone", 1, 3),
       ("Azamat", "Wind", 2, NULL),
       ("Fubuki", "Ice", 3, 1),
       ("Michael", "Acid", 4, 1),
       ("Jose", "Butter", 5, 1),
       ("Krishna", "Fire", 6, 1),
       ("Lee Hao", "Thunder", 7, 1);

