import "./teacherList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext,useEffect } from "react";
import { TeacherContext } from "../../../context/teacherContext/TeacherContext";
import { getTeachers, deleteTeacher } from "../../../context/teacherContext/apiCalls";
import swal from 'sweetalert';

export default function TeacherList() {

  const { teachers, dispatch } = useContext(TeacherContext);

  useEffect(() => {
    getTeachers(dispatch);
  }, [dispatch]);


  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this Teacher!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteTeacher(id, dispatch)
          swal({
            title: "Teacher Delted!",
            text: "Teacher has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });
  };

  const columns = [
    {
      field: "teacher",
      headerName: "Teacher",
      width: 265,
      renderCell: (params) => {
        return (
          <div className="courseListItem">
            <img className="courseListImg" src={params.row.picture} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "downvote", headerName: "Downvotes", width: 150 },
    { field: "upvote", headerName: "Upvotes", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/teacher/" + params.row._id, teacher: params.row}}>
              <button className="teacherListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="teacherListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="teacherList">
      <DataGrid
        rows={teachers}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
