const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = process.argv[2]; 
const limit = process.argv[3] || 5; 

const queryString = `
SELECT teachers.id as teacher_id, teachers.name as name, cohorts.name as cohort
FROM teachers
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const values = [`%${cohortName}%`, limit];

pool
  .query(queryString, values)
  .then((res) => {
    res.rows.forEach((teacher) => {
      console.log(
        `${teacher.name} has an id of ${teacher.teacher_id} and teaches the ${teacher.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error('Query error', err.stack))
  .finally(() => pool.end());