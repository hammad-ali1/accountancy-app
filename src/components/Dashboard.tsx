import API, { Transaction } from "../api/auth";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../slices/userSlice";
import { Typography, Box } from "@mui/material";
import { orange, blue } from "@mui/material/colors";
import { Bar } from "react-chartjs-2";
import { yyyyMMddFormat, getAmountFromDataset } from "../helpers";
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

function Dashboard() {
  const [totalInflow, setTotalInflow] = useState(0);
  const [totalOutflow, setTotalOutflow] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [cashFlowDetails, setCashFlowDetails] = useState([] as any[]);

  const user = useAppSelector((state) => selectUser(state));

  useEffect(() => {
    API.getDataSummary(user._id).then((result) => {
      if (result.cashFlowSummary.length > 0) {
        if (result.cashFlowSummary[0]._id === "Inflow") {
          setTotalInflow(result.cashFlowSummary[0].total);
          setTotalOutflow(result.cashFlowSummary[1].total);
        } else {
          setTotalInflow(result.cashFlowSummary[1].total);
          setTotalOutflow(result.cashFlowSummary[0].total);
        }
      }
      if (result.assetSummary.length > 0)
        setTotalAssets(result.assetSummary[0].total);
      setCashFlowDetails(result.cashFlowDetail);
    });
  }, [user]);
  return (
    <Box>
      <Typography>Total Inflow : {totalInflow}</Typography>
      <Typography>Total Outflow : {totalOutflow}</Typography>
      <Typography>
        Main Balance : {totalInflow - totalOutflow - totalAssets}
      </Typography>
      <Bar
        options={options}
        data={{
          labels: cashFlowDetails.map((item) => yyyyMMddFormat(item._id)),
          datasets: [
            {
              label: "Cash Inflow",
              data: cashFlowDetails.map((item) =>
                getAmountFromDataset(item.result, "Inflow")
              ),
              backgroundColor: cashFlowDetails.map((item) => blue[500]),
            },
            {
              label: "Cash Outflow",
              data: cashFlowDetails.map((item) =>
                getAmountFromDataset(item.result, "Outflow")
              ),

              backgroundColor: cashFlowDetails.map((item) => orange[500]),
            },
          ],
        }}
      />
    </Box>
  );
}

export default Dashboard;
