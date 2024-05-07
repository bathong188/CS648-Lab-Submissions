import React from "react"

import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {employees: []}
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        fetch("/api/employees")
            .then(res => res.json())
            .then(data => {
                console.log("Total number of records:", data.count)
                data.employees.forEach(employee => {
                    employee.dateHired = new Date(employee.dateHired)
                })
                this.setState({employees: data.employees})
            })
            .catch(e => console.log(e))
    }
    createEmployee(employee) {
        fetch("/api/employess", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(newEmployee => {
                newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
                const newEmployees = this.state.employees.concat(newEmployee.employee)
                this.setState({employees: newEmployees})
            })
            .catch(e => console.log(e))
        this.setState({employees: newEmployeeList})
    }
    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    console.log("Failed to delete employee.")
                }
                else {
                    this.loadData()
                }
            })
    }
    render() {
        return (
            <React.Fragment>
                <h1>Employee Management Application</h1>
                <EmployeeFilter/>
                <hr/>
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
                <hr/>
                <EmployeeAdd createEmployee={this.createEmployee}/>
            </React.Fragment>
        )
    }
}

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee =>
        <EmployeeRow
            key={employee._id}
            employee={employee}
            deleteEmployee={props.deleteEmployee}
        />
    )
    return (
        <table className="bordered-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Email</th>
                <th>Title</th>
                <th>Date Hired</th>
                <th>Currently Employed?</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {employeeRows}
            </tbody>
        </table>
    )
}

function EmployeeRow(props) {
    function onDeleteClick() {
        props.deleteEmployee(props.employee._id)
    }
    return(
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? "Yes" : "No"}</td>
            <td><button onClick={onDeleteClick}>DELETE</button></td>
        </tr>
    )
}
