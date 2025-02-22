import "./departmentList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DepartmentContext } from '../../../context/departmentContext/DepartmentContext'
import { getDepartments, deleteDepartment } from '../../../context/departmentContext/apiCalls'
import swal from 'sweetalert';
export default function ProductList() {


  const { departments, dispatch } = useContext(DepartmentContext)

  useEffect(() => {
    getDepartments(dispatch)
  }, [dispatch])

  console.log(departments)


  const handleDelete = (id) => {
    // Are You Sure You Want To Delete This Department?
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this department!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteDepartment(id, dispatch)
          swal({
            title: "Department Delted!",
            text: "Department has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });

  };

  // console.log(departments)
  const columns = [
    { field: "code", headerName: "Code", width: 120 },
    {
      field: "department",
      headerName: "Department",
      width: 820,
      renderCell: (params) => {
        return (
          <div className="departmentListItem">
            <img className="departmentListImg" src={params.row.picture} alt="" />
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
            <Link to={{ pathname: "/department/" + params.row._id, department: params.row }}>
              <button className="departmentListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="departmentListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="departmentList">
      <DataGrid
        rows={departments}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
