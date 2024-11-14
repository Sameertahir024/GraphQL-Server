import gql from "graphql-tag";

const EmpTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: Int
  }
  type EmployeeResponse {
    success: Boolean!
    message: String!
  }
  type Query {
    employees(page: Int, limit: Int, sort: String): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    deleteEmployee(id: ID!): EmployeeResponse
    addEmployee(
      name: String!
      age: Int!
      class: String
      subjects: [String]
      attendance: Int
    ): Employee

    updateEmployee(
      id: ID
      name: String
      age: Int
      class: String
      subjects: [String]
      attendance: Int
    ): Employee
  }
`;

export default EmpTypeDefs;
