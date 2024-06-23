import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { CourseNavContext } from "..";
import { useContext } from "react";
import { FaPlug, FaBookReader } from "react-icons/fa";

function CourseNavigation() {
  const links = ["Home", "Modules", "Quizzes"];

  const links_small_screen = [
    { label: "Modules", icon: <FaPlug className="fs-6" /> },
    { label: "Quizzes", icon: <FaBookReader className="fs-6" /> },
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNav = (link: string) => {
    navigate("/kanbas/courses/" + link);
  };

  const { openMobileCourseNav, setOpenMobileCourseNav } =
    useContext(CourseNavContext);

  const handleCourseNavClick = () => {
    setOpenMobileCourseNav(!openMobileCourseNav);
  };

  return (
    <>
      <div className="d-none d-md-block h-100 ">
        <ul className="wd-navigation">
          {links.map((link, index) => (
            <li
              key={index}
              className={pathname.includes(link) ? "wd-active" : ""}
            >
              <Link onClick={() => handleNav(link.toLowerCase())} to={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="course-nav-small-screen d-md-none p-5 flex-grow-1 ">
        <ul className="h-100">
          {links_small_screen.map((link, index) => (
            <li
              key={index}
              className={
                pathname.includes(link.label.toLowerCase()) ? "active" : ""
              }
            >
              <Link to={link.label} onClick={() => handleCourseNavClick()}>
                <div className="d-flex flex-row gap-2 justify-content-center align-items-center ">
                  {link.icon}
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CourseNavigation;
