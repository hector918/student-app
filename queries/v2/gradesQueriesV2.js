const db = require('../db-config');

const getGradesByStudentIdV2 = async (id) => {
  const grades = await db.any(
    'SELECT * FROM grades WHERE student_id = $[id]',
    { id }
  );
  return grades;
};

module.exports = {
  getGradesByStudentIdV2,
};
