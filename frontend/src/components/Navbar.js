import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  let navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // cookies.remove("jwt_auth")

    navigate("/login");
  };
  return (
    <div className="m-0 w-full h-[80px]">
      <nav
        className="bg-cover bg-center bg-no-repeat h-16 shaow-md bg-transparent"
        // style={{ backgroundImage: `url(${tempImg})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white text-lg font-bold">
                <h2>Easy Learn</h2>
              </Link>
            </div>

            <div className="hidden md:block p-4">
              {user && (
                <ul className="flex space-x-4 list-reset lg:flex justify-end flex-1 items-center">
                  <li>
                    <a
                      href="/"
                      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      href="/allcourses"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      All Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="/stucourse"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      All Courses Student
                    </a>
                  </li>
                  <li className="relative dropdown">
                    <a
                      href="#"
                      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                    >
                      Courses
                    </a>
                    <div className="absolute hidden bg-gray-800 rounded-md shadow-lg w-52 z-10 top-full left-0 dropdown-menu">
                      <a
                        href="/allcourses"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        All Courses
                      </a>
                      {role == "instuctor" ? (
                        <a
                          href="/inscourse"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          All Courses Instructor
                        </a>
                      ) : (
                        ""
                      )}

                      <a
                        href="/stucourse"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        All Courses Student
                      </a>
                      {role == "instructor" ? (
                        <a
                          href="/CourseForm"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          Add new Course
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                  {role == "admin" ? (
                    <li className="relative dropdown">
                      <a
                        href="#"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                      >
                        Admin
                      </a>
                      <div className="absolute hidden bg-gray-800 rounded-md shadow-lg w-52 z-10 top-full left-0 dropdown-menu">
                        <a
                          href="/allPayments"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          Payment management
                        </a>
                        <a
                          href="/allEnrollments"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          Enrollment management
                        </a>
                        <a
                          href="/allUsers"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                          User management
                        </a>
                      </div>
                    </li>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={logout}
                    className="bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white px-4 border-2 border-red-500 hover:border-transparent rounded"
                  >
                    Logout
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
