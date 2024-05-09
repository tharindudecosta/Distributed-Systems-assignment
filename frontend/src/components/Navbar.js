import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="m-0 w-full h-[80px] flex items-center justify-center bg-sky-500">
      <Link to="/" className="text-lg text-white mx-4">
        Home
      </Link>
      <Link to="/CourseForm" className="text-lg text-white mx-4">
        Create Course
      </Link>
      <Link to="/allcourses" className="text-lg text-white mx-4">
        All Courses
      </Link>
      <Link to="/inscourse" className="text-lg text-white mx-4">
        All Courses Ins
      </Link>
      <Link to="/stucourse" className="text-lg text-white mx-4">
        All Courses Stu
      </Link>
    </div>
  );
};

export default Navbar;
