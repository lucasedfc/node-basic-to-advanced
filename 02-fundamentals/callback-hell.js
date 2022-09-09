const employees = [
    {
        id: 1,
        firstName: 'Luke'
    },
    {
        id: 2,
        firstName: 'Tom'
    },
    {
        id: 3,
        firstName: 'Kim'
    }
]

const salaries = [
    {
        id: 1,
        salary: 3000
    },
    {
        id: 2,
        salary: 2250
    }
]

const getEmployee = (id, callback) => {
    const employee = employees.find((e) => e.id === id)?.firstName;

    if (employee) {
        callback(null, employee);
    } else {
        callback(`Employee with id ${id} is missing`)
    }
}

const getSalary = (id, callback) => {
    const salary = salaries.find((s) => s.id === id)?.salary;

    if (salary) {
        callback(null, salary);
    } else {
        callback(`Salary for id ${id} is missing`)
    }
}

const id = 3;

getEmployee(id, (err, employee) => {

    if (err) {
        return console.error('ERROR', err);
    }

    getSalary(id, (err, salary) => {

        if (err) {
            return console.error('ERROR', err);
        }
        console.log('Employee', employee, 'has a salary of: ', salary);
    });
});
