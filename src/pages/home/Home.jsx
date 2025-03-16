import "./home.css";
import StatsCard from "./StatsCard";
import { useContext, useEffect } from "react";
import { SocietyContext } from "../../context/societyContext/SocietyContext";
import { AnnouncementContext } from "../../context/announcementContext/AnnouncementContext";
import { ProjectContext } from "../../context/projectContext/ProjectContext"; 
import { getSocietys } from "../../context/societyContext/apiCalls";
import { getAllAnnouncements } from "../../context/announcementContext/apiCalls";
import { fetchProjects } from "../../context/projectContext/apiCalls"; 

export default function Home() {
  const { societys, dispatch: societyDispatch } = useContext(SocietyContext);
  const { announcements, dispatch: announcementDispatch } = useContext(AnnouncementContext);
  const { projects, dispatch: projectDispatch } = useContext(ProjectContext);

  useEffect(() => {
    getSocietys(societyDispatch);
    getAllAnnouncements(announcementDispatch);
    fetchProjects(projectDispatch);
  }, [societyDispatch, announcementDispatch, projectDispatch]);

  console.log("Projects in Home:", projects); // ✅ Debugging

  return (
    <div className="home">
      <h2 className="homeTitle">Welcome to the Admin Dashboard</h2>
      <div className="homeWidgets">
        <StatsCard title="Total Projects" count={projects?.data?.length || 0} />  {/* ✅ Fix Applied */}
        <StatsCard title="Total Societies" count={societys?.length || 0} />
        <StatsCard title="Total Announcements" count={announcements?.length || 0} />
      </div>
    </div>
  );
}
