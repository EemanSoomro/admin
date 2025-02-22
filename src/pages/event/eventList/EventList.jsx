import "./eventList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { EventContext } from '../../../context/eventContext/EventContext'
import { getEvents, deleteEvent } from '../../../context/eventContext/apiCalls'
import swal from 'sweetalert';
export default function ProductList() {


  const { events, dispatch } = useContext(EventContext)

  useEffect(() => {
    getEvents(dispatch)
  }, [dispatch])



  const handleDelete = (id) => {
    // Are You Sure You Want To Delete This Event?
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this event!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteEvent(id, dispatch)
          swal({
            title: "Event Delted!",
            text: "Event has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });

  };

  // console.log(events)
  const columns = [
    { field: "societyCode", headerName: "Society", width: 160 },
    {
      field: "event",
      headerName: "Event",
      width: 820,
      renderCell: (params) => {
        return (
          <div className="eventListItem">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/event/" + params.row._id, event: params.row }}>
              <button className="eventListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="eventListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="eventList">
      <DataGrid
        rows={events}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
