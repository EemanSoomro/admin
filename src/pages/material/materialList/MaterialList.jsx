import "./materialList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MaterialContext } from '../../../context/materialContext/MaterialContext'
import { getMaterials, deleteMaterial } from '../../../context/materialContext/apiCalls'
import swal from 'sweetalert';
export default function MaterialList(props) {


  const { materials, dispatch } = useContext(MaterialContext)
  const [courses, setCourses] = useState([])
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch("/courses",
        {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
      const data = await res.json();
      setCourses(data);
    };
    const getTeachers = async () => {
      const res = await fetch("/facultys",
        {
          method: "GET",
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
      const data = await res.json();
      setTeachers(data);
    };
    getCourses();
    getTeachers();
    getMaterials(dispatch)
  }, [dispatch])




  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this Material!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteMaterial(id, dispatch)
          swal({
            title: "Material Delted!",
            text: "Material has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });

  };

  // console.log(materials)
  const columns = [
    {
      field: "material",
      headerName: "Material",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="materialListItem">
            {params.row.name}
          </div>
        );
      },
    },
    // Teacher Name Field by Comparing teacher_id with teacher_id in teachers array
    {
      field: "teacher_name",
      headerName: "Teacher Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {teachers.filter(teacher => teacher._id === params.row.teacher_id).map(filteredTeacher => filteredTeacher.name)}
          </div>
        );
      }
    },
    // Course Name Field by Comparing course_id with course_id in courses array
    {
      field: "course_name",
      headerName: "Course Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {courses.filter(course => course._id === params.row.course_id).map(filteredCourse => filteredCourse.name)}
          </div>
        );
      }
    },
    { field: "type", headerName: "Type", width: 150 },
    { field: "semester", headerName: "Semester", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/material/" + params.row._id, material: params.row }}>
              <button className="materialListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="materialListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="materialList">
      <DataGrid
        rows={materials}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
