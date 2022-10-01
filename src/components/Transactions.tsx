import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import API, { Transaction } from "../api/auth";
import { CircularProgress, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Users() {
  const user = useAppSelector((state) => selectUser(state));
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([] as Transaction[]);

  useEffect(() => {
    if (!user._id) return;
    setLoading(true);
    API.getTransactions(user._id).then((result) => {
      console.log(result);
      setTableData(result);
      setLoading(false);
    });
  }, [user]);

  const columnDefs = [
    {
      headerName: "Transaction Name",
      field: "nameOfTransaction",
      maxWidth: 200,
    },
    {
      headerName: "Date Of Transaction",
      field: "dateOfTransaction",
      maxWidth: 200,
    },
    { headerName: "Inflow / Outflow", field: "inflowOrOutflow", maxWidth: 200 },
    { headerName: "Type", field: "type", maxWidth: 200 },
    { headerName: "From / To", field: "fromOrTo", maxWidth: 200 },
    { headerName: "Amount", field: "amount", maxWidth: 200 },

    {
      headerName: "Actions",
      field: "_id",
      maxWidth: 150,
      cellRendererFramework: (params: any) => (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
            style={{ border: "none", width: "5px", margin: "0px" }}
          >
            <DeleteIcon style={{ height: "20px" }} />
          </Button>
        </div>
      ),
    },
  ];
  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  const onGridReady = (params: any) => {
    setGridApi(params);
  };

  const handleDelete = (id: string) => {
    const transactionToDelete = tableData.find(
      //@ts-ignore
      (transaction) => transaction._id === id
    );
    //@ts-ignore
    setTableData(tableData?.filter((transaction) => transaction._id !== id));
    API.deleteTransaction(id);
  };

  if (loading) return <CircularProgress />;
  return (
    <Box>
      <div className="ag-theme-alpine" style={{ height: "700px" }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </Box>
  );
}

export default Users;
