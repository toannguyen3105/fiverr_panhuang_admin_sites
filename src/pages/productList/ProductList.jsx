import "./productList.css";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmProduct,
  loadProducts,
} from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
import { CheckCircleOutline } from "@material-ui/icons";

export default function ProductList() {
  const data = useSelector((state) => state.products.data);
  const requesting = useSelector((state) => state.products.requesting);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="userListStatus">
            {params.row.status === 1 ? (
              <span className="productListStatusActive">Active</span>
            ) : (
              <span className="productListStatusInactive">Inactive</span>
            )}
          </div>
        );
      },
    },
    {
      field: "created_at_string",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <CheckCircleOutline
              className={
                params.row.status === 0
                  ? "productListConfirm"
                  : "productListDisabledConfirm"
              }
              onClick={() => handleConfirm(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const handleConfirm = (configId) => {
    dispatch(confirmProduct(configId));
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <div className="productList">
      {requesting ? (
        <>Loading</>
      ) : data && data.length > 0 ? (
        <>
          <Link to="/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
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
