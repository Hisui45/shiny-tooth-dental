import express from "express";
const app = express();

app.use(express.json());

import {
  getPatients,
  getPatient,
  getRecordByPatient,
  getEmployees,
  getEmployee,
  getAppointments,
  getPayroll,
  createPayroll,
  getProcedures,
} from "./database.js";

app.get("/api/dashboard", async (req, res, next) => {
    try {
      const employees = await getEmployees();
      const patients = await getPatients();
      const appointments = await getAppointments();
      // Sending an object with named arrays as JSON response
      res.json({ 
        employees: employees,
        patients: patients,
        appointments: appointments
      });
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  });


app.get("/api/patients", async (req, res) => {
  try {
    const patients = await getPatients();
    res.json({
      patients: patients});
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/api/patients/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await getRecordByPatient(id);
    res.json({records: patient})
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/api/patient/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await getPatient(id);
    res.json(patient);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await getAppointments();
    res.json({appointments: appointments});
  } catch (err) {
    next(err); 
  }
});

app.get("/api/procedures", async (req, res) => {
  try {
    const procedures = await getProcedures();
    res.json({
      procedures: procedures});
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});



app.post("/payroll", async (req, res) => {
  try {
    const { EMP_ID, PAY_AMOUNT, PAY_DATE } = req.body;
    const payroll = await createPayroll(EMP_ID, PAY_AMOUNT, PAY_DATE);
    res.status(201).send(payroll);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

app.use((err, req, res, next) => {
  console.log("hey");
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
