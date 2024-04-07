// backend/server.js

const express = require('express');
const { MongoClient } = require('mongodb');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const userRoutes = require('./Routes/userRoutes');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_URI; // Using environment variable for MongoDB URI
const dbName = process.env.DB_NAME; // Using environment variable for database name
const port = process.env.PORT || 4000; // Using environment variable for port

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db(dbName); // Using environment variable for database name
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

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

const root = {
  employees: async () => {
    try {
      const employees = await db.collection('employees').find().toArray();
      return employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to fetch employees');
    }
  },
  employee: async ({ id }) => {
    try {
      const employee = await db.collection('employees').findOne({ _id: ObjectId(id) });
      return employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw new Error('Failed to fetch employee');
    }
  },
  addEmployee: async ({ name, email, department }) => {
    try {
      const result = await db.collection('employees').insertOne({ name, email, department });
      return {
        id: result.insertedId,
        name,
        email,
        department
      };
    } catch (error) {
      console.error('Error adding employee:', error);
      throw new Error('Failed to add employee');
    }
  },
  updateEmployee: async ({ id, name, email, department }) => {
    try {
      const result = await db.collection('employees').updateOne(
        { _id: ObjectId(id) },
        { $set: { name, email, department } }
      );
      if (result.modifiedCount === 0) {
        throw new Error('Employee not found');
      }
      return {
        id,
        name,
        email,
        department
      };
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update employee');
    }
  },
  deleteEmployee: async ({ id }) => {
    try {
      const result = await db.collection('employees').deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 0) {
        throw new Error('Employee not found');
      }
      return 'Employee deleted successfully';
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error('Failed to delete employee');
    }
  }
};

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
