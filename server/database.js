import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

export async function getPatients() {
  const [rows] = await pool.query("SELECT * FROM patient");
  return rows;
}

export async function getPatient(id) {
  const [rows] = await pool.query(
    `
        SELECT *
        FROM patient
        WHERE PAT_ID = ?
        `,
    [id]
  );
  return rows[0];
}

export async function getEmployees() {
  const [rows] = await pool.query("SELECT * FROM employee");
  return rows;
}

export async function getEmployee(id) {
  const [rows] = await pool.query(
    `
        SELECT *
        FROM employee
        WHERE EMP_ID = ?
        `,
    [id]
  );
  return rows[0];
}

// export async function getAppointments() {
//   const [rows] = await pool.query("SELECT * FROM appointment");
//   return rows;
// }

export async function getProcedures() {
  const [rows] = await pool.query("SELECT * FROM `procedure`");
  return rows;
}

export async function getRecords() {
  const [rows] = await pool.query("SELECT * FROM record");
  return rows;
}

export async function getAppointments() {
  const [rows] = await pool.query(
    `
    SELECT appointment.APT_NUM, appointment.APT_DATE, appointment.APT_TIME, patient.PAT_ID, patient.PAT_FNAME, patient.PAT_LNAME, employee.EMP_ID, employee.EMP_FNAME, employee.EMP_LNAME, \`procedure\`.PRO_NAME, status.*
    FROM appointment
    JOIN patient ON appointment.PAT_ID = patient.PAT_ID
    JOIN employee ON appointment.EMP_ID = employee.EMP_ID
    JOIN \`procedure\` ON appointment.PRO_CODE = \`procedure\`.PRO_CODE
    JOIN status ON appointment.STA_CODE = status.STA_CODE;
  `);
  return rows;
}

export async function getRecordByPatient(id) {
  const [rows] = await pool.query(
    `
    SELECT record.REC_NUM, record.REC_DATE,employee.EMP_FNAME, employee.EMP_LNAME, employee.POS_CODE, \`procedure\`.PRO_NAME
    FROM record
    JOIN treatment ON record.REC_NUM = treatment.REC_NUM
    JOIN \`procedure\` ON treatment.PRO_CODE = \`procedure\`.PRO_CODE
    JOIN employee ON record.EMP_ID = employee.EMP_ID
    WHERE record.PAT_ID = ?
    AND ABS(DATEDIFF(record.REC_DATE, CURRENT_DATE())) = (
    SELECT MIN(ABS(DATEDIFF(r.REC_DATE, CURRENT_DATE())))
    FROM record AS r
    JOIN treatment AS t ON r.REC_NUM = t.REC_NUM
    JOIN \`procedure\` AS p ON t.PRO_CODE = p.PRO_CODE
    WHERE r.PAT_ID = record.PAT_ID
    );`,
    [id]
  );
  return rows;
}

export async function getPayroll(id) {
  const [rows] = await pool.query(
    `
        SELECT *
        FROM payroll
        WHERE PAY_NUM = ?
        `,
    [id]
  );
  return rows[0];
}

export async function createPayroll(EMP_ID, PAY_AMOUNT, PAY_DATE) {
  const [result] = await pool.query(
    `
    INSERT INTO 
    payroll(EMP_ID, PAY_AMOUNT, PAY_DATE) VALUES (?,?,?)
        `,
    [EMP_ID, PAY_AMOUNT, PAY_DATE]
  );
  const id = result.insertId;
  return getPayroll(id);
}
