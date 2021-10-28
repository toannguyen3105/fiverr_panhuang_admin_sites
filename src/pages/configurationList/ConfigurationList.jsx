import "./configurationList.css";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConfiguration,
  loadConfigurations,
} from "../../redux/actions/configurationAction";

export default function ConfigurationList() {
  const data = useSelector((state) => state.configurations.data);
  const requesting = useSelector((state) => state.configurations.requesting);
  const dispatch = useDispatch();

  const handleDelete = (configId) => {
    dispatch(deleteConfiguration(configId));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "created_at_string",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="userListStatus">
            {params.row.status === 1 ? "Active" : "Inactive"}
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
            <Link to={"/configuration/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(loadConfigurations());
  }, [dispatch]);

  return (
    <div className="configurationList">
      {requesting ? (
        <>Loading</>
      ) : data && data.length > 0 ? (
        <>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={50}
            checkboxSelection
            disableSelectionOnClick
          />
        </>
      ) : (
        <>Data is empty</>
      )}
    </div>
  );
}
