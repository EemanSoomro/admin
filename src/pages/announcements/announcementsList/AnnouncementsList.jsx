import "./announcementsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AnnouncementContext } from "../../../context/announcementContext/AnnouncementContext";
import { getAllAnnouncements, deleteAnnouncement, updateAnnouncementStatus } from "../../../context/announcementContext/apiCalls";
import swal from "sweetalert";

export default function AnnouncementsList() {
  const { announcements, dispatch } = useContext(AnnouncementContext);

  useEffect(() => {
    getAllAnnouncements(dispatch);
  }, [dispatch]);

  // ✅ Fixed Delete Handler
  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this announcement!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteAnnouncement(id, dispatch);
          swal("Deleted!", "Announcement has been deleted successfully!", "success");
        } catch (err) {
          swal("Error!", "Failed to delete announcement.", "error");
        }
      }
    });
  };

  const columns = [
    { field: "type", headerName: "Type", width: 200 },
    { field: "subject", headerName: "Subject", width: 500 },
    { field: "status", headerName: "Status", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <>
          
          <button className="announcementApprove" onClick={() => updateAnnouncementStatus(params.row._id, "approved", dispatch)}>Approve</button>
          <button className="announcementReject" onClick={() => updateAnnouncementStatus(params.row._id, "rejected", dispatch)}>Reject</button>
          <DeleteOutline className="announcementListDelete" onClick={() => handleDelete(params.row._id)} />
        </>
      ),
    },
  ];

  return (
    <div className="announcementList">
      <DataGrid
        rows={announcements}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
