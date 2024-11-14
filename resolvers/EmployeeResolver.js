import Employee from "../models/Employee.js";

const EmployeeResolver = {
  Query: {
    employees: async (_, { page = 1, limit = 10, sort = "name" }) => {
      try {
        const employees = await Employee.find()
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(limit);
        return employees;
      } catch (error) {
        throw new Error("Error retrieving employees");
      }
    },
    employee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (error) {
        throw new Error("Error retrieving employee");
      }
    },
  },
  Mutation: {
    addEmployee: async (
      _,
      { name, age, class: className, subjects, attendance }
    ) => {
      try {
        console.log(name, age, subjects);
        const newEmployee = new Employee({
          name,
          age,
          class: className,
          subjects,
          attendance,
        });
        return await newEmployee.save();
      } catch (error) {
        throw new Error("Error creating employee");
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
          return {
            success: false,
            message: "Employee not found",
          };
        }
        return {
          success: true,
          message: "Employee deleted successfully",
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete employee");
      }
    },
    updateEmployee: async (
      _,
      { id, name, age, class: className, subjects, attendance }
    ) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { name, age, class: className, subjects, attendance },
          { new: true }
        );
        if (!updatedEmployee) throw new Error("Employee not found");
        return updatedEmployee;
      } catch (error) {
        throw new Error("Error updating employee");
      }
    },
  },
};

export default EmployeeResolver;
