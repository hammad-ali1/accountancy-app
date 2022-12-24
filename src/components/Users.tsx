import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import API, { AccountancyUser } from "../api/auth";
import { CircularProgress, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
//Users table
function Users() {
  const user = useAppSelector((state) => selectUser(state));
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([] as AccountancyUser[]);

  useEffect(() => {
    if (!user._id) return;
    setLoading(true);
    API.getAllUsers(user._id).then((result) => {
      console.log(result);
      setTableData(result);
      setLoading(false);
    });
  }, [user]);

  const columnDefs = [
    { headerName: "User Name", field: "userName", maxWidth: 200 },
    { headerName: "First Name", field: "firstName", maxWidth: 200 },
    { headerName: "Last Name", field: "lastName", maxWidth: 200 },
    { headerName: "Business Name", field: "businessName", maxWidth: 200 },
    { headerName: "DOB", field: "DOB", maxWidth: 200 },
    { headerName: "Email", field: "email", maxWidth: 200 },
    { headerName: "Title", field: "title", maxWidth: 200 },

    {
      headerName: "",
      field: "userName",
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

  const handleDelete = (username: string) => {
    const userToDelete = tableData.find((user) => user.userName === username);
    if (userToDelete?.isAdmin) return;
    setTableData(tableData?.filter((user) => user.userName !== username));
    API.deleteUser(username);
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
