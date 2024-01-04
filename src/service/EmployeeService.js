import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

class EmployeeService {


    getEmployees(){
        console.log(EMPLOYEE_API_BASE_URL+"/getAll");
        return axios.get(EMPLOYEE_API_BASE_URL+"/getAll");
    }

    searchEmployees(ageRange, birthYear, firstName, lastName) {
        const params = { ageRange, birthYear, firstName, lastName };
        return axios.get(`${EMPLOYEE_API_BASE_URL}/search`, { params });
      }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL+"/addEmployee", employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/getById/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL +"/updateEmployee"+ '/' + employeeId, employee);
    }
}

export default new EmployeeService()