import React, { useEffect,useState } from 'react'
import EmployeeService from '../service/EmployeeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";

const CreateEmployeeComponent = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    let employee = {};
    const [empid, setEmpId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [address, setAddress] = useState('');
  
  
    useEffect(() => {
        console.log(id);
      if (id === '_add') {
        return;
      } else {
        EmployeeService.getEmployeeById(id)
          .then((res) => {
            employee = res.data;
            setEmpId(employee.employeeId);
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setAge(employee.age);
            setDob(employee.birthYear);
            setGender(employee.gender);
            setDepartment(employee.department);
            setDesignation(employee.designation);
            setMaritalStatus(employee.maritalStatus);
            setAddress(employee.address);
          })
          .catch((error) => {
            console.error('Error fetching employee:', error);
          });
      }
    }, [id]);

    
    const saveOrUpdateEmployee = (e) => {
      e.preventDefault();
      const employee = {
        employeeId: empid,
        firstName,
        lastName,
        birthYear: dob, 
        gender,
        address,
        department,
        designation,
        maritalStatus,
      };
      console.log('employee => ' + JSON.stringify(employee));
  
      if (id === '_add') {
        EmployeeService.createEmployee(employee)
          .then((res) => {
            navigate('/employees');
          })
          .catch((error) => {
            console.error('Error creating employee:', error);
          });
      } else {
        EmployeeService.updateEmployee(employee, id)
          .then((res) => {
            navigate('/employees');
          })
          .catch((error) => {
            console.error('Error updating employee:', error);
          });
      }
    };
  
    const changeFirstNameHandler = (event) => {
      setFirstName(event.target.value);
    };

    const changeLastNameHandler = (event) => {
      setLastName(event.target.value);
    };
  
    const changeDobHandler = (event) => {
      setDob(event.target.value);
      const dobDate = new Date(dob);
      const currentDate = new Date();
      let ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
      if (
        currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() &&
          currentDate.getDate() < dobDate.getDate())
      ) {
        ageDiff--; 
      }

      setAge(ageDiff);
    };

    const changeGenderHandler = (event) => {
      setGender(event.target.value);
    };

    const changeaddressHandler = (event) => {
      setAddress(event.target.value);
    };

    const changeDepartmentHandler = (event) => {
      setDepartment(event.target.value);
    };

    const changeDesignationHandler = (event) => {
      setDesignation(event.target.value);
    };

    const changeMaritalStatusHandler = (event) => {
      setMaritalStatus(event.target.value);
    };

  
    const cancel = () => {
      navigate('/employees');
    };
  
    const getTitle = () => {
      return id === '_add' ? <h3 className="text-center">Add Employee</h3> : <h3 className="text-center">Update Employee</h3>;
    };
   
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {getTitle()}
              <div className="card-body">
                <form>
                {id != '_add' && (
                <div className="form-group">
                    <label> Employee ID: </label>
                    <input disabled placeholder="Employee ID" name="empId" className="form-control" value={empid}  />
                  </div>
                )}
                  <div className="form-group">
                    <label> First Name: </label>
                    <input disabled={gender === 'Male'} placeholder="First Name" name="firstName" className="form-control" value={firstName} onChange={changeFirstNameHandler} />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input disabled={gender === 'Male'} placeholder="Last Name" name="lastName" className="form-control" value={lastName} onChange={changeLastNameHandler} />
                  </div>
                  {id != '_add' && (
                  <div className="form-group">
                    <label>Age: </label>
                    <input disabled placeholder="Age" name="age" className="form-control" value={age} />
                  </div>
                  )}
                  <div className="form-group">
                    <label> DOB: </label>
                    <input disabled={gender === 'Male' || gender === 'Female'} type="date" placeholder="DOB" name="dob" className="form-control" value={dob} onChange={changeDobHandler} />
                  </div>
                  <div className="form-group">
                     <label> Gender: </label>
                     <select disabled={gender === 'Male' || gender === 'Female'} name="gender" className="form-control" value={gender} onChange={changeGenderHandler}>
                     <option value="">Select Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Department: </label>
                    <input placeholder="Department Name" name="department" className="form-control" value={department} onChange={changeDepartmentHandler} />
                  </div>
                  <div className="form-group">
                    <label> Designation: </label>
                    <input placeholder="Designation Name" name="designation" className="form-control" value={designation} onChange={changeDesignationHandler} />
                  </div>
                  <div className="form-group">
                     <label> Marital Status: </label>
                     <select name="maritalStatus" className="form-control" value={maritalStatus} onChange={changeMaritalStatusHandler}>
                     <option value="">Select Option</option>
                     <option value="Married">Married</option>
                     <option value="Unmarried">Unmarried</option>
                     <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Address: </label>
                    <input placeholder="Enter Address" name="address" className="form-control" value={address} onChange={changeaddressHandler} />
                  </div>
  
                  <div className="text-center">
                  <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: '10px' }}>
                    Cancel
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateEmployeeComponent;