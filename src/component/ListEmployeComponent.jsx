import React, { useState, useEffect } from "react";
import EmployeeService from "../service/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ageRange: "",
    birthYear: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const viewEmployee = (employee) => {
    navigate(`/view-employee`, { state: { employee } });
  };

  const editEmployee = (id) => {
    navigate(`/add-employee/${id}`);
  };

  const addEmployee = () => {
    navigate("/add-employee/_add");
  };

  const handleSearch = () => {
    EmployeeService.searchEmployees(
      searchCriteria.ageRange,
      searchCriteria.birthYear,
      searchCriteria.firstName,
      searchCriteria.lastName
    )
      .then((res) => {
        if(res.status === 404) {
          setEmployees([]);
          toast.error(res.message);
        } else {
           setEmployees(res.data);
        }
      })
      .catch((error) => {
        console.error("Error searching employees:", error);
      });
  };

  useEffect(() => {
    EmployeeService.getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center" style={{ marginTop: "10px" }}>
        Employees List
      </h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addEmployee}>
          Add Employee
        </button>
        
        <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
            style={{marginLeft:'10px'}}
          >
            Search
          </button>
      </div>
      <br></br>

      <div className="row">
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Age Range"
              value={searchCriteria.ageRange}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  ageRange: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Birth Year"
              value={searchCriteria.birthYear}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  birthYear: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={searchCriteria.firstName}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={searchCriteria.lastName}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </form>
      </div>

      <div className="row">
        <table className="table table-dark">
          <thead className="thead-light">
            <tr style={{alignContent:"center"}}>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Marital Status</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="thead-dark">
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{employee.birthYear}</td>
                <td>{employee.gender}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.maritalStatus}</td>
                <td>{employee.address}</td>
                <td>
                  <button
                    onClick={() => editEmployee(employee.employeeId)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                    onClick={() => viewEmployee(employee)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;