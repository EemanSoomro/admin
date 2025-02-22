import "./societyList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SocietyContext } from '../../../context/societyContext/SocietyContext'
import { getSocietys, deleteSociety } from '../../../context/societyContext/apiCalls'
import swal from 'sweetalert';
export default function ProductList() {


  const { societys, dispatch } = useContext(SocietyContext)

  useEffect(() => {
    getSocietys(dispatch)
  }, [dispatch])

  console.log(societys)


  const handleDelete = (id) => {
    // Are You Sure You Want To Delete This Society?
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this society!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteSociety(id, dispatch)
          swal({
            title: "Society Delted!",
            text: "Society has been deleted successfully!",
            icon: "success",
            timer: 1500,
            buttons: false
          });
        }
      });

  };

  // console.log(societys)
  const columns = [
    { field: "code", headerName: "Code", width: 120 },
    {
      field: "society",
      headerName: "Society",
      width: 820,
      renderCell: (params) => {
        return (
          <div className="societyListItem">
            <img className="societyListImg" src={params.row.picture} alt="" />
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
            <Link to={{ pathname: "/society/" + params.row._id, society: params.row }}>
              <button className="societyListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="societyListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="societyList">
      <DataGrid
        rows={societys}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        getRowId={(r) => r._id}
        checkboxSelection
      />
    </div>
  );
}
