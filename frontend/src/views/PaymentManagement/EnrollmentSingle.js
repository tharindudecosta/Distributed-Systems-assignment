import React, { useEffect } from "react";

const enrollment = ({ enrollment }) => {
  return (
      <tr className="h-16">
        <td>{enrollment._id}</td>
        <td>{enrollment.courseId}</td>
        <td>{enrollment.studentId}</td>
        <td>{enrollment.allContent}</td>
        <td>{enrollment.completed}</td>
        <td>{enrollment.createdAt}</td>
      </tr>
  );
};

export default enrollment;
