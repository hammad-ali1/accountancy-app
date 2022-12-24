import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import API, { Transaction } from "../api/auth";
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
import AddTransaction from "./AddTransaction";
//Filter for months
const months = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//Filter for cash type
const cashType = ["All", "Inflow", "Outflow"];
//Transaction Table
function Users() {
  const user = useAppSelector((state) => selectUser(state));
  const [loading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState([] as Transaction[]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedCashType, setSelectedCashType] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(new Transaction());
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

      field: "dateOfTransaction",
      maxWidth: 300,
      cellRenderer: (params: any) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    { headerName: "Inflow / Outflow", field: "inflowOrOutflow", maxWidth: 200 },
    { headerName: "Type", field: "type", maxWidth: 200 },
    { headerName: "From / To", field: "fromOrTo", maxWidth: 200 },
    { headerName: "Amount", field: "amount", maxWidth: 200 },

    {
      headerName: "",
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
    const transactionToEdit: Transaction = tableData.find(
      //@ts-ignore
      (transaction) => transaction._id === id
    );
    console.log(transactionToEdit);
    setEditTransaction(transactionToEdit);
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
  function filterTableData(tableData: Transaction[]): Transaction[] {
    let filteredData = [...tableData];
    if (selectedMonth > 0) {
      filteredData = filteredData.filter((transaction) => {
        return (
          new Date(transaction.dateOfTransaction).getMonth() ===
          selectedMonth - 1
        );
      });
      console.log("filering by month ", filteredData);
    }
    if (selectedCashType > 0) {
      filteredData = filteredData.filter((transaction) => {
        return transaction.inflowOrOutflow === cashType[selectedCashType];
      });
      console.log("filering by type ", filteredData);
    }
    return filteredData;
  }
  useEffect(() => {
    console.log("cash ", selectedCashType);
    console.log("month ", selectedMonth);
  }, [selectedCashType, selectedMonth]);
  if (loading) return <CircularProgress />;
  return (
    <Box>
      <div style={{ display: "flex" }}>
        <Autocomplete
          disablePortal
          options={months}
          sx={{ width: 300, margin: 1, boxShadow: 1 }}
          value={months[selectedMonth]}
          onInputChange={(event, value) =>
            setSelectedMonth(months.findIndex((item) => item === value))
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Select Month" />
          )}
        />
        <Autocomplete
          disablePortal
          options={cashType}
          sx={{ width: 300, margin: 1, boxShadow: 1 }}
          value={cashType[selectedCashType]}
          onInputChange={(event, value) =>
            setSelectedCashType(cashType.findIndex((item) => item === value))
          }
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Select Cash Type" />
          )}
        />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: "700px", overflow: "auto" }}
      >
        <AgGridReact
          rowData={filterTableData(tableData)}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <PopUp
        children={<AddTransaction initialData={editTransaction} />}
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
        title="Title"
      />
    </Box>
  );
}

export default Users;
