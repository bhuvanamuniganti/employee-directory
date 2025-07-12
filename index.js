const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let employees = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Alice", lastName: "Brown", email: "alice@example.com", department: "Finance", role: "Analyst" }
];

// Dashboard
app.get("/", (req, res) => {
  const { search = "", sortBy = "", filterDept = "" } = req.query;

  let filteredEmployees = [...employees];

  // Search
  if (search) {
    filteredEmployees = filteredEmployees.filter(emp =>
      emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter
  if (filterDept) {
    filteredEmployees = filteredEmployees.filter(emp =>
      emp.department.toLowerCase() === filterDept.toLowerCase()
    );
  }

  // Sort
  if (sortBy === "firstName") {
    filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortBy === "department") {
    filteredEmployees.sort((a, b) => a.department.localeCompare(b.department));
  }

  res.render("dashboard", {
    employees: filteredEmployees,
    search,
    sortBy,
    filterDept
  });
});



// Add form
app.get("/form", (req, res) => {
  res.render("form", { employee: null });
});

// Edit form
app.get("/edit/:id", (req, res) => {
  const emp = employees.find(emp => emp.id === parseInt(req.params.id));
  res.render("form", { employee: emp });
});

// Add or Update Employee
app.post("/add", (req, res) => {
  const { id, firstName, lastName, email, department, role } = req.body;

  if (id) {
    // Update
    const empIndex = employees.findIndex(emp => emp.id === parseInt(id));
    if (empIndex !== -1) {
      employees[empIndex] = { id: parseInt(id), firstName, lastName, email, department, role };
    }
  } else {
    // Add new
    const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    employees.push({ id: newId, firstName, lastName, email, department, role });
  }
  res.redirect("/");
});

// Delete
app.post("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  employees = employees.filter(emp => emp.id !== idToDelete);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
