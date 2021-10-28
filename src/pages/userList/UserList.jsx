import "./userlist.css";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../../redux/actions/userAction";

export default function UserList() {
  const data = useSelector((state) => state.users.data);
  const requesting = useSelector((state) => state.users.requesting);

  const dispatch = useDispatch();

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "User",
      width: 200,
    },
    {
      field: "steam_id",
      headerName: "SteamId",
      width: 150,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
    },
    {
      field: "created_at_string",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "updated_at_string",
      headerName: "Updated At",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="userListStatus">
            {params.row.status === 1 ? (
              <span className="userListStatusActive">Active</span>
            ) : (
              <span className="userListStatusInactive">InActive</span>
            )}
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
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className="userList">
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
