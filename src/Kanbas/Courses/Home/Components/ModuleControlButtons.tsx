import {
  FaBan,
  FaCheck,
  FaFileImport,
  FaHome,
  FaComments,
  FaBullhorn,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

const ModuleControlButtons = () => {
  return (
    <>
      <div
        className="flex-grow-0 d-none d-lg-block p-2 pt-0"
        style={{
          width: "250px",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
          }}
        >
          Course Status
        </h3>
        <div className="course-status-button-group w-100 d-flex flex-row">
          <button className="w-100 p-2 ">
            <FaBan />
            Unpublish
          </button>
          <button className="w-100 p-2 ">
            <FaCheck />
            Published
          </button>
        </div>
        <ul
          className="
                      course-status-list d-flex flex-column w-100 p-0 gap-1 mt-3 fs-6
                      "
        >
          <li className="w-100 p-2">
            <FaFileImport />
            Import Existing Content
          </li>
          <li className="w-100 p-2">
            <FaFileImport />
            Import from Commons
          </li>
          <li className="w-100 p-2">
            <FaHome />
            Choose Home Page
          </li>
          <li className="w-100 p-2">
            <FaComments />
            View Course Stream
          </li>
          <li className="w-100 p-2">
            <FaBullhorn />
            New Announcement
          </li>
          <li className="w-100 p-2">
            <FaChartLine />
            New Analytics
          </li>
          <li className="w-100 p-2">
            <FaBell />
            Course Notifications
          </li>
        </ul>
        <br />
      </div>
    </>
  );
};

export default ModuleControlButtons;
