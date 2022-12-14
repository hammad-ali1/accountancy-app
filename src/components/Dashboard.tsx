import API from "../api/auth";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import { Typography, Box, Autocomplete, TextField } from "@mui/material";
import {
  orange,
  blue,
  green,
  red,
  grey,
  lightBlue,
} from "@mui/material/colors";
import { Bar } from "react-chartjs-2";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  monthFormat,
  getAmountFromDataset,
  getTotalFromSummary,
  getProfitFromData,
  subtractYears,
  subtractMonths,
  profitDetailsByMonth,
  profitDetailsByYear,
  profitDetailsBySixMonths,
} from "../helpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//registering chart js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//inflow outflow chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Cash Inflow/Outflow",
    },
  },
};
//profit loss chart options
const profitOptions = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  plugins: {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Profit/Loss",
    },
  },
};
//array of filters
const cashFilterOptions = ["All Time", "Year", "Six Months", "Month"];
const profitFilterOptions = ["All Time", "Year", "Six Months", "Month"];

//dashboard component
function Dashboard() {
  const [totalInflow, setTotalInflow] = useState(0);
  const [totalOutflow, setTotalOutflow] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  // const [cashFlowDetails, setCashFlowDetails] = useState([] as any[]);
  const [cashInFlowDetails, setCashInFlowDetails] = useState([] as any[]);
  const [cashOutFlowDetails, setCashOutFlowDetails] = useState([] as any[]);

  const [profitDetails, setProfitDetails] = useState([] as any[]);
  const [cashFilter, setCashFilter] = useState(0);
  const [profitFilter, setProfitFilter] = useState(0);

  const filterData = (data: any[], type: number) => {
    if (type === 1)
      //@ts-ignore
      return data.filter((item) => new Date(item._id) > subtractYears(1));
    else if (type === 2)
      //@ts-ignore
      return data.filter((item) => new Date(item._id) > subtractMonths(6));
    else if (type === 3)
      //@ts-ignore
      return data.filter((item) => new Date(item._id) > subtractMonths(1));
    return data;
  };
  const filterProfitData = (data: any[], type: number) => {
    if (type === 1)
      //@ts-ignore
      return profitDetailsByYear(data);
    else if (type === 2)
      //@ts-ignore
      return profitDetailsBySixMonths(data);
    else if (type === 3)
      //@ts-ignore
      return profitDetailsByMonth(data);
    return data.map((item) => {
      return { date: monthFormat(item.date), profit: item.profit };
    });
  };

  const user = useAppSelector((state) => selectUser(state));

  useEffect(() => {
    API.getDataSummary(user._id).then((result) => {
      if (result.assetSummary.length > 0)
        setTotalAssets(result.assetSummary[0].total);
      setTotalInflow(getTotalFromSummary(result.cashFlowSummary, "Inflow"));
      setTotalOutflow(getTotalFromSummary(result.cashFlowSummary, "Outflow"));
      setCashInFlowDetails(
        result.cashFlowDetail.map((item: any) => {
          return {
            date: item._id,
            profit: getAmountFromDataset(item.result, "Inflow"),
          };
        })
      );
      setCashOutFlowDetails(
        result.cashFlowDetail.map((item: any) => {
          return {
            date: item._id,
            profit: getAmountFromDataset(item.result, "Outflow"),
          };
        })
      );
      //@ts-ignore
      setProfitDetails(
        result.profitDetail.map((item: any) => {
          return { date: item._id, profit: getProfitFromData(item.result) };
        })
      );
    });
  }, [user]);
  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" padding={1}>
        <Box>
          <Box display={"flex"} color={green[500]}>
            <ArrowDropUpIcon />
            <Typography>Total Inflow &nbsp;&nbsp; : ${totalInflow}</Typography>
          </Box>
          <Box display={"flex"} color={red[500]}>
            <ArrowDropDownIcon />
            <Typography>Total Outflow : -${totalOutflow}</Typography>
          </Box>
        </Box>
        <Box>
          <Box
            color={
              totalInflow - totalOutflow - totalAssets > 0
                ? lightBlue[500]
                : red[500]
            }
          >
            <Typography>
              Main Balance : ${totalInflow - totalOutflow - totalAssets}
            </Typography>
          </Box>
          <Box color={grey[500]}>
            <Typography>Total Cost of Assets : ${totalAssets}</Typography>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} maxWidth="100%">
        <Box minHeight={400} flex="0.5" display={"flex"} flexDirection="column">
          <Bar
            options={options}
            data={{
              labels: filterProfitData(cashInFlowDetails, cashFilter).map(
                //@ts-ignore
                (item) => item.date
              ),
              datasets: [
                {
                  label: "Cash Inflow",
                  data: filterProfitData(cashInFlowDetails, cashFilter).map(
                    //@ts-ignore
                    (item) => item.profit
                  ),
                  backgroundColor: blue[500],
                  minBarLength: 2,
                },
                {
                  label: "Cash Outflow",
                  data: filterProfitData(cashOutFlowDetails, cashFilter).map(
                    //@ts-ignore
                    (item) => item.profit
                  ),

                  backgroundColor: orange[500],
                  minBarLength: 2,
                },
              ],
            }}
          />
          <Autocomplete
            disablePortal
            options={cashFilterOptions}
            sx={{ width: 300, margin: 1, boxShadow: 1 }}
            value={cashFilterOptions[cashFilter]}
            onInputChange={(event, value) =>
              setCashFilter(
                cashFilterOptions.findIndex((item) => item === value)
              )
            }
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Select Filter" />
            )}
          />
        </Box>
        <Box minHeight={400} flex="0.5" display={"flex"} flexDirection="column">
          <Bar
            options={profitOptions}
            data={{
              labels: filterProfitData(profitDetails, profitFilter).map(
                //@ts-ignore
                (item) => item.date
              ),
              datasets: [
                {
                  label: "Profit",
                  data: filterProfitData(profitDetails, profitFilter)
                    //@ts-ignore
                    .map((item) => item.profit)
                    //@ts-ignore
                    .map((item) => (item > 0 ? item : 0)),
                  backgroundColor: green[500],
                },
                {
                  label: "Loss",
                  data: filterProfitData(profitDetails, profitFilter)
                    //@ts-ignore
                    .map((item) => item.profit)
                    //@ts-ignore
                    .map((item) => (item <= 0 ? item : 0)),
                  backgroundColor: red[500],
                },
              ],
            }}
          />
          <Autocomplete
            disablePortal
            options={profitFilterOptions}
            sx={{ width: 300, margin: 1, boxShadow: 1 }}
            value={profitFilterOptions[profitFilter]}
            onInputChange={(event, value) =>
              setProfitFilter(
                profitFilterOptions.findIndex((item) => item === value)
              )
            }
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Select Filter" />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
