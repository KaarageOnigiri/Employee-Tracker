INSERT INTO department (department_name)
VALUES ("Deli"),
       ("Bakery"),
       ("Pharmacy"),
       ("Cleaning"),
       ("Packaging");

INSERT INTO role (title, salary, department_id)
VALUES ("Opener", 40000, 1),
       ("Closer", 35000, 1),
       ("Chief Baker", 60000, 2),
       ("Junior Baker", 40000, 2),
       ("Doctor", 100000, 3),
       ("Technician", 80000, 3),
       ("Janitor", 42000, 4),
       ("Lifter", 40000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Keaton", 5, NULL),
       ("Greg", "White", 1, 1),
       ("Villy", "Yeoh", 2, 2),
       ("Magic", "Johnson", 3, 1),
       ("Michael", "Jordan", 4, 4),
       ("Jose", "Butler", 6, 1),
       ("Tom", "Holland", 7, 1),
       ("Mike", "Hassi", 8, 1);

