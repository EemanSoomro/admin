import "./home.css";
import StatsCard from "./StatsCard";
import { useContext, useEffect } from "react";
import { SocietyContext } from "../../context/societyContext/SocietyContext";
import { AnnouncementContext } from "../../context/announcementContext/AnnouncementContext";
import { getSocietys } from "../../context/societyContext/apiCalls";
import { getAllAnnouncements } from "../../context/announcementContext/apiCalls"; // ✅ Fixed Import

export default function Home() {
  const { societys, dispatch: societyDispatch } = useContext(SocietyContext);
  const { announcements, dispatch: announcementDispatch } = useContext(AnnouncementContext);

  useEffect(() => {
    getSocietys(societyDispatch);
    getAllAnnouncements(announcementDispatch); // ✅ Fixed Function Call
  }, [societyDispatch, announcementDispatch]);

  return (
    <div className="home">
      <h2 className="homeTitle">Welcome to the Admin Dashboard</h2>
      <div className="homeWidgets">
        <StatsCard title="Total Projects" count={10} />
        <StatsCard title="Total Societies" count={societys.length} />
        <StatsCard title="Total Announcements" count={announcements.length} />
      </div>
    </div>
  );
}
