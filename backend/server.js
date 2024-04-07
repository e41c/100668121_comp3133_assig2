const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define GraphQL schema
const schema = buildSchema(`
  type Employee {
    id: ID!
    name: String!
    email: String!
    department: String!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, email: String!, department: String!): Employee
    updateEmployee(id: ID!, name: String, email: String, department: String): Employee
    deleteEmployee(id: ID!): String
  }
`);

// Dummy data for demonstration
let employees = [
  { id: '1', name: 'John Doe', email: 'john@example.com', department: 'IT' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', department: 'HR' }
];

// Define resolver functions
const root = {
  employees: () => employees,
  employee: ({ id }) => employees.find(emp => emp.id === id),
  addEmployee: ({ name, email, department }) => {
    const id = String(employees.length + 1);
    const newEmployee = { id, name, email, department };
    employees.push(newEmployee);
    return newEmployee;
  },
  updateEmployee: ({ id, name, email, department }) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) return null;
    if (name) employees[index].name = name;
    if (email) employees[index].email = email;
    if (department) employees[index].department = department;
    return employees[index];
  },
  deleteEmployee: ({ id }) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) return 'Employee not found';
    employees.splice(index, 1);
    return 'Employee deleted successfully';
  }
};

// Create Express app
const app = express();

// Define GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable GraphiQL for testing
}));

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:Reitzel@e41c.tm3gpox.mongodb.net/?retryWrites=true&w=majority&appName=e41c';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
