import "./home.css";
import StatsCard from "./StatsCard";
import { useContext, useEffect } from "react";
import { SocietyContext } from "../../context/societyContext/SocietyContext";
import { AnnouncementContext } from "../../context/announcementContext/AnnouncementContext";
import { ProjectContext } from "../../context/projectContext/ProjectContext"; // ✅ Added Project Context
import { getSocietys } from "../../context/societyContext/apiCalls";
import { getAllAnnouncements } from "../../context/announcementContext/apiCalls";
import { fetchProjects } from "../../context/projectContext/apiCalls"; // ✅ Correct function name

export default function Home() {
  const { societys, dispatch: societyDispatch } = useContext(SocietyContext);
  const { announcements, dispatch: announcementDispatch } = useContext(AnnouncementContext);
  const { projects, dispatch: projectDispatch } = useContext(ProjectContext); // ✅ Added Projects Context

  useEffect(() => {
    getSocietys(societyDispatch);
    getAllAnnouncements(announcementDispatch);
    fetchProjects(projectDispatch); // ✅ Corrected function name
  }, [societyDispatch, announcementDispatch, projectDispatch]);

  return (
    <div className="home">
      <h2 className="homeTitle">Welcome to the Admin Dashboard</h2>
      <div className="homeWidgets">
        <StatsCard title="Total Projects" count={projects.length} />
        <StatsCard title="Total Societies" count={societys.length} />
        <StatsCard title="Total Announcements" count={announcements.length} />
      </div>
    </div>
  );
}
