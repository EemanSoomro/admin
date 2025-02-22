import "./courseList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CourseContext } from '../../../context/courseContext/CourseContext'
import { getCourses, deleteCourse } from '../../../context/courseContext/apiCalls'
import swal from 'sweetalert';
export default function ProductList() {


  const { courses, dispatch } = useContext(CourseContext)

  useEffect(() => {
    getCourses(dispatch)
  }, [dispatch])




  const handleDelete = (id) => {
    // Are You Sure You Want To Delete This Course?
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this course!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteCourse(id, dispatch)
          swal({
            title: "Course Delted!",
            text: "Course has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });

  };

  // console.log(courses)
  const columns = [
    { field: "coursecode", headerName: "Code", width: 120 },
    {
      field: "course",
      headerName: "Course",
      width: 365,
      renderCell: (params) => {
        return (
          <div className="courseListItem">
            <img className="courseListImg" src={params.row.courseImage} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "core_elective", headerName: "Core/Elective", width: 200 },
    { field: "credithours", headerName: "Credit Hours", width: 215 },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/course/" + params.row._id, course: params.row }} className="listlink">
              <button className="courseListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="courseListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="courseList">
      <DataGrid
        rows={courses}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
