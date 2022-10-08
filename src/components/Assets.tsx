import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import API, { Asset } from "../api/auth";
import {
  CircularProgress,
  Box,
  Button,
  TextField,
  Autocomplete,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import PopUp from "./PopUp";
import AddAsset from "./AddAsset";

function Assets() {
  const user = useAppSelector((state) => selectUser(state));
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([] as Asset[]);
  const [openForm, setOpenForm] = useState(false);
  const [editAsset, setEditAsset] = useState(new Asset());
  useEffect(() => {
    if (!user._id) return;
    setLoading(true);
    API.getAssets(user._id).then((result) => {
      setTableData(result);
      setLoading(false);
    });
  }, [user]);

  const columnDefs = [
    {
      headerName: "Item",
      field: "item",
      maxWidth: 200,
    },
    {
      headerName: "Acquired Date",
      filter: "agDateColumnFilter",
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          const cellDate = new Date(cellValue);
          console.log(cellDate, filterLocalDateAtMidnight);
          cellDate.setHours(0, 0, 0, 0);
          filterLocalDateAtMidnight.setHours(0, 0, 0, 0);
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },

      field: "acquiredDate",
      maxWidth: 300,
      cellRenderer: (params: any) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    { headerName: "Category", field: "category", maxWidth: 200 },
    { headerName: "Condition", field: "condition", maxWidth: 200 },
    { headerName: "Location", field: "location", maxWidth: 200 },
    { headerName: "Price", field: "price", maxWidth: 200 },
    { headerName: "Current Value", field: "currentValue", maxWidth: 200 },
    { headerName: "Manufacturer", field: "manufacturer", maxWidth: 200 },
    { headerName: "Insurance", field: "inurance", maxWidth: 200 },

    {
      headerName: "Actions",
      field: "_id",
      minWidth: 150,
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.value)}
            style={{ border: "none", width: "5px", margin: "0px" }}
          >
            <EditIcon style={{ height: "20px" }} />
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

  const handleEdit = (id: string) => {
    setOpenForm(true);
    //@ts-ignore
    const assetToEdit: Asset = tableData.find(
      //@ts-ignore
      (asset) => asset._id === id
    );
    setEditAsset(assetToEdit);
  };
  const handleDelete = (id: string) => {
    const assetToDelete = tableData.find(
      //@ts-ignore
      (asset) => asset._id === id
    );
    //@ts-ignore
    setTableData(tableData?.filter((asset) => asset._id !== id));
    API.deleteAsset(id);
  };

  if (loading) return <CircularProgress />;
  return (
    <Box>
      <div
        className="ag-theme-alpine"
        style={{ height: "700px", overflow: "auto" }}
      >
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <PopUp
        children={<AddAsset initialData={editAsset} />}
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
        title="Title"
      />
    </Box>
  );
}

export default Assets;
