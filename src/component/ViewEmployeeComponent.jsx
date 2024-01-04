import React from 'react';
import { useLocation , useNavigate} from 'react-router-dom';

const ViewEmployeeComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = location.state || {};
  const cancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <br />
      <div className="card col-md-8 offset-md-2">
        <h3 className="text-center"> Employee Details</h3>
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <TableRow label="Employee First Name" value={employee.firstName} />
              <TableRow label="Employee Last Name" value={employee.lastName} />
              <TableRow label="Employee Age" value={employee.age} />
              <TableRow label="Employee Birth Year" value={employee.birthYear} />
              <TableRow label="Employee Gender" value={employee.gender} />
              <TableRow label="Employee Department" value={employee.department} />
              <TableRow label="Employee Designation" value={employee.designation} />
              <TableRow label="Employee Marital Status" value={employee.maritalStatus} />
              <TableRow label="Employee Address" value={employee.address} />
            </tbody>
          </table>
          <button className="btn btn-info" style={{marginLeft:'230px'}} onClick={cancel}>
                    Back
           </button>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr>
    <td style={{ fontWeight: 'bold' }}>{label}</td>
    <td>{value}</td>
  </tr>
);

export default ViewEmployeeComponent;