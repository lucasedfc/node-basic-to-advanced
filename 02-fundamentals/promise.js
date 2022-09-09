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

const getEmployee = (id) => {
    return new Promise((resolve, reject) => {
        const employee = employees.find((e) => e.id === id)?.firstName;
        (employee) 
            ? resolve(employee)
            : reject(`Employee with id ${id} is missing`);
        
    })
}

const getSalary = (id) => {
    return new Promise((resolve, reject) => {
        const salary = salaries.find((s) => s.id === id)?.salary;
        (salary)
            ? resolve(salary)
            : reject(`Salary for id ${id} is missing`)
    })
}

const id = 3;
// getEmployee(id)
//     .then((employee)=> console.log(employee))
//     .catch((err) => console.error(err))

// getSalary(id)
//     .then((salary) => console.log(salary))
//     .catch((err) => console.error(err))

// getEmployee(id)
//     .then((employee) => {
//         getSalary(id)
//             .then((salary) => {
//                 console.log('Employee', employee, 'has a salary of:', salary);
//             })
//             .catch((err) => console.error('ERROR', err));
//             })
//     .catch((err) => console.error(err))

let firstName;
getEmployee(id)
    .then(employee => {
        firstName = employee;
        return getSalary(id)
    })
    .then( salary => console.log('Employee', firstName, 'has a salary of:', salary))
    .catch((err) => console.error(err))