import React from "react"
import {Badge, Button, Card, Modal, Table} from "react-bootstrap"
import {Link, useLocation} from "react-router-dom"
import EmployeeAdd from "./EmployeeAdd.jsx"
import EmployeeFilter from "./EmployeeFilter.jsx"

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: [
                {   // FOR TESTING WITHOUT DB //
                    _id: 69420,
                    name: "Test",
                    extension: 1234,
                    email: "test@test.com",
                    title: "Tester",
                    dateHired: new Date(),
                    currentlyEmployed: true,
                },  // FOR TESTING WITHOUT DB //
            ],
        }
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
                } else {
                    this.loadData()
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <EmployeeAdd createEmployee={this.createEmployee}/>
                <EmployeeFilter/>
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
            </React.Fragment>
        )
    }
}

function EmployeeTable(props) {
    // Get URL
    const {search} = useLocation()
    // Get params from URL
    const query = new URLSearchParams(search)
    // Get the "employed" param
    const q = query.get("employed")

    const employeeRows = props.employees
        .filter(employee => (q ? String(employee.currentlyEmployed) === q : true))
        .map(employee =>
            <EmployeeRow
                key={employee._id}
                employee={employee}
                deleteEmployee={props.deleteEmployee}
            />
        )
    return (
        <Card>
            <Card.Header as="h5">All Employees <Badge bg="secondary">{employeeRows.length}</Badge></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Table striped size="sm">
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
                    </Table>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

class EmployeeRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    onDeleteClick() {
        this.toggleModal()
        this.props.deleteEmployee(this.props.employee._id)
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={`/edit/${this.props.employee._id}`}>
                        {this.props.employee.name}
                    </Link>
                </td>
                <td>{this.props.employee.extension}</td>
                <td>{this.props.employee.email}</td>
                <td>{this.props.employee.title}</td>
                <td>{this.props.employee.dateHired.toDateString()}</td>
                <td>{this.props.employee.currentlyEmployed ? "Yes" : "No"}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={this.toggleModal}>
                        X
                    </Button>
                    {/*DELETE CONFIRMATION MODAL*/}
                    <Modal show={this.state.modalVisible} onHide={this.toggleModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to delete {this.props.employee.name}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.toggleModal}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={this.onDeleteClick}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        )
    }
}
