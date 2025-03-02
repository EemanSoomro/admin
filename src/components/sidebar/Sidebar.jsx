import "./sidebar.css";
import { LineStyle } from "@material-ui/icons";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        {/* Societies Section */}
        <div className="MenuItem">
          <ul className="sidebarList">
            <Link to="/societies" className="link">
              <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/2562/2562464.png" alt="" className="sidebarIcon" />
                Societies
              </li>
            </Link>
            <Link to="/newsociety" className="link">
              <li className="sidebarListItem">
                <IoAdd className="sidebarPlusIcon" />
              </li>
            </Link>
          </ul>
        </div>

        {/* Announcements Section */}
        <div className="MenuItem">
          <ul className="sidebarList">
            <Link to="/announcements" className="link">
              <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/3214/3214736.png" alt="" className="sidebarIcon" />
                Announcements
              </li>
            </Link>
            <Link to="/newannouncement" className="link">
              <li className="sidebarListItem">
                <IoAdd className="sidebarPlusIcon" />
              </li>
            </Link>
          </ul>
        </div>

        {/* Projects Section */}
        <div className="MenuItem">
          <ul className="sidebarList">
            <Link to="/projects" className="link">
              <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="" className="sidebarIcon" />
                Projects
              </li>
            </Link>
            <Link to="/newproject" className="link">
              <li className="sidebarListItem">
                <IoAdd className="sidebarPlusIcon" />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
