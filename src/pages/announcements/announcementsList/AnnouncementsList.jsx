import "./announcementsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AnnouncementContext } from "../../../context/announcementContext/AnnouncementContext";
import {
  getAnnouncements,
  deleteAnnouncement,
} from "../../../context/announcementContext/apiCalls";
import swal from "sweetalert";
export default function Announcement() {
  const { announcements, dispatch } = useContext(AnnouncementContext);

  useEffect(() => {
    getAnnouncements(dispatch);
  }, [dispatch]);

  console.log(announcements);

  const handleDelete = (id) => {
    // Are You Sure You Want To Delete This Announcement?
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this announcement!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAnnouncement(id, dispatch);
        swal({
          title: "Announcement Delted!",
          text: "Announcement has been deleted successfully!",
          icon: "success",
          timer: 1500,
          buttons: false,
        });
      }
    });
  };

  // console.log(announcements)
  const columns = [
    { field: "type", headerName: "Type", width: 250 },
    {
      field: "subject",
      headerName: "Subject",
      width: 1000,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/announcement/" + params.row._id,
                announcement: params.row,
              }}
            >
              <button className="announcementListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="announcementListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="announcementList">
      <DataGrid
        rows={announcements}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
