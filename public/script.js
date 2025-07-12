document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Clear previous errors
      document.getElementById("firstNameError").textContent = "";
      document.getElementById("lastNameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("departmentError").textContent = "";
      document.getElementById("roleError").textContent = "";

      // Get values
      const id = form.id?.value;
      const firstName = form.firstName.value.trim();
      const lastName = form.lastName.value.trim();
      const email = form.email.value.trim();
      const department = form.department.value.trim();
      const role = form.role.value.trim();

      let isValid = true;

      // Basic Validation
      if (firstName === "") {
        document.getElementById("firstNameError").textContent = "First name is required";
        isValid = false;
      }

      if (lastName === "") {
        document.getElementById("lastNameError").textContent = "Last name is required";
        isValid = false;
      }

      if (email === "") {
        document.getElementById("emailError").textContent = "Email is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email format";
        isValid = false;
      }

      if (department === "") {
        document.getElementById("departmentError").textContent = "Department is required";
        isValid = false;
      }

      if (role === "") {
        document.getElementById("roleError").textContent = "Role is required";
        isValid = false;
      }

      if (!isValid) return;

      const data = { id, firstName, lastName, email, department, role };

      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Failed to submit employee data.");
      }
    });
  }
});
