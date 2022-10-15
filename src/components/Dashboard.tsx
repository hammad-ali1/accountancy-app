import API, { Transaction } from "../api/auth";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import { Typography, Box } from "@mui/material";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const profitOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Profit/Loss",
    },
  },
};

function Dashboard() {
  const [totalInflow, setTotalInflow] = useState(0);
  const [totalOutflow, setTotalOutflow] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [cashFlowDetails, setCashFlowDetails] = useState([] as any[]);
  const [profitDetails, setProfitDetails] = useState([] as any[]);
  const user = useAppSelector((state) => selectUser(state));

  useEffect(() => {
    API.getDataSummary(user._id).then((result) => {
      // if (result.cashFlowSummary.length > 0) {
      //   if (result.cashFlowSummary[0]._id === "Inflow") {
      //     setTotalInflow(result.cashFlowSummary[0].total);
      //     setTotalOutflow(result.cashFlowSummary[1].total);
      //   } else {
      //     setTotalInflow(result.cashFlowSummary[1].total);
      //     setTotalOutflow(result.cashFlowSummary[0].total);
      //   }
      // }
      if (result.assetSummary.length > 0)
        setTotalAssets(result.assetSummary[0].total);
      setTotalInflow(getTotalFromSummary(result.cashFlowSummary, "Inflow"));
      setTotalOutflow(getTotalFromSummary(result.cashFlowSummary, "Outflow"));
      setCashFlowDetails(result.cashFlowDetail);
      setProfitDetails(result.profitDetail);
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
            <Typography>Assets Bought : ${totalAssets}</Typography>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} maxWidth="100%">
        <Box minHeight={400} flex="0.5">
          <Bar
            options={options}
            data={{
              labels: cashFlowDetails.map((item) => monthFormat(item._id)),
              datasets: [
                {
                  label: "Cash Inflow",
                  data: cashFlowDetails.map((item) =>
                    getAmountFromDataset(item.result, "Inflow")
                  ),
                  backgroundColor: cashFlowDetails.map((item) => blue[500]),
                  minBarLength: 2,
                },
                {
                  label: "Cash Outflow",
                  data: cashFlowDetails.map((item) =>
                    getAmountFromDataset(item.result, "Outflow")
                  ),

                  backgroundColor: cashFlowDetails.map((item) => orange[500]),
                  minBarLength: 2,
                },
              ],
            }}
          />
        </Box>
        <Box minHeight={400} flex="0.5">
          <Bar
            options={profitOptions}
            data={{
              labels: profitDetails.map((item) => monthFormat(item._id)),
              datasets: [
                {
                  label: "Profit",
                  data: profitDetails.map((item) =>
                    getProfitFromData(item.result)
                  ),
                  backgroundColor: profitDetails.map((item) => {
                    if (getProfitFromData(item.result) > 0) {
                      return green[500];
                    } else {
                      return red[500];
                    }
                  }),
                  minBarLength: 2,
                },
              ],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
