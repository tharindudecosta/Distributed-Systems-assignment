// import AuthContext from "../context/AuthContext";
// import { useContext } from "react";
// import auth from "../apis/modules/auth";

const LeavePlannerNavbar = () => {
  // const { loggedIn } = useContext(AuthContext);
  // const { user } = useContext(AuthContext);
  // const userId = user?.employeeId;

  const logout = async () => {
    // await auth.logout();
    // localStorage.clear();
    // window.location = "/userLogin";
  };
  return (
    <section>
      <header className="navbar">
        <a href="/" className="nav-heading">
          Us-HRMS
        </a>
        <nav>
          <ul className="nav_links_ul">
            <li className="nav_links_li">
              <a className="whoIsIn" href="/AllCoursesPanel">
              Courses Panel
              </a>
            </li>

            <li className="nav_links_li">
              <a className="whoIsIn" href="/trainingpanel">
              Create a course
              </a>
            </li>

            <li className="nav_links_li">
              <a className="whoIsIn" href="/AssignCourses">
              Assign Employees
              </a>
            </li>
            
          </ul>
        </nav>
        <div>
          <a href="/" className="nav-item">
            Home
          </a>
          <a href="/userprofile/me"  className="nav-item">
            <i className="fa-solid fa-user fa-xl"></i>
          </a>
          <a className="nav-item">
            <i
              className="fa fa-sign-out logoutBtn"
              title="LogOut"
              onClick={logout}
            ></i>
          </a>
        </div>
      </header>
      <br />
    </section>
  );
};

export default LeavePlannerNavbar;
