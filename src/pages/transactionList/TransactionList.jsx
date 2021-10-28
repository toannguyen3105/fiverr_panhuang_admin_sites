import "./transactionList.css";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "../../redux/actions/transactionAction";

export default function TransactionList() {
  const data = useSelector((state) => state.transactions.data);
  const requesting = useSelector((state) => state.transactions.requesting);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user_id",
      headerName: "User Id",
      width: 200,
    },
    {
      field: "source",
      headerName: "Source",
      width: 150,
    },
    {
      field: "desc",
      headerName: "Desc",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
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
            {params.row.status === 1 ? "Success" : "Error"}
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
            <Link to={"/product/" + params.row.id}>
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
    dispatch(loadTransactions());
  }, [dispatch]);

  return (
    <div className="transactionList">
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
