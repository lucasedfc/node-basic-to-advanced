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

const getUserInfo = async (id) => {

    try {
        const employee = await getEmployee(id);
        const salary = await getSalary(id);    
        return `Employee ${employee} has a salary of: ${salary}`;
        
    } catch (error) {
        throw error;
    }
}

const id = 3;

getUserInfo(id)
    .then(data => console.log(data))
    .catch(err => console.error('ERROR', err))
