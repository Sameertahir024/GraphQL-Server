import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String, default: "Not Assigned" },
    subjects: [String],
    attendance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
