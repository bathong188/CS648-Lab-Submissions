import Employee from "../models/Employee.js";

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.status(200).json({employee: employees, count: employees.length})
    }
    catch (e) {
        res.status(500).json({msg: e})
    }
}

const getEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params
        const employee = await Employee.findOne({_id: employeeId})

        if (!employee) {
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({employee})
    }
    catch (e) {
        res.status(500).json({msg: e})
    }
}

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({employee})
        // res.send("Create an employee")
    }
    catch (e) {
        res.status(500).json({msg: e})
    }
}

const updateEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params
        const employee = await Employee.findOneAndDelete({_id: employeeId}, req.body, {
            new: true,  // return the newly created document
            runValidators: true
        })

        if (!employee) {
            return res.status(400).json({msg: `No employee with id ${employeeId} found.`})
        }
        res.status(200).json({msg: "Successfully updated employee."})
    }
    catch (e) {
        res.status(500).json({msg: e})
    }
}

const deleteEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params
        const employee = await Employee.findOneAndDelete({_id: employeeId})

        if (!employee) {
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }
        res.status(200).json({msg: "Employee successfully deleted."})
    }
    catch (e) {
        res.status(500).json({msg: e})
    }
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
