export {};

export const yyyyMMddFormat = (dateString: string | Date) => {
  const date = new Date(dateString);

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
};

export const monthFormat = (dateString: string | Date) => {
  const date = new Date(dateString);
  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  const formattedDate = month + " " + day + ", " + year;
  return formattedDate;
};

export const doesObjContainEmptyFields = (obj: any) => {
  return Object.values(obj).some((value) => {
    if (typeof value === "string" && value === "") return true;
    else return false;
  });
};

export const getAmountFromDataset = (
  result: any[],
  type: "Inflow" | "Outflow"
): number => {
  if (result.length === 2) {
    if (result[0].type === type) return result[0].amount;
    else return result[1].amount;
  } else if (result.length === 1) {
    if (result[0].type === type) return result[0].amount;
    else return 0;
  }
  return 0;
};

export const getTotalFromSummary = (
  result: any[],
  type: "Inflow" | "Outflow"
): number => {
  if (result.length === 2) {
    if (result[0]._id === type) return result[0].total;
    else return result[1].total;
  } else if (result.length === 1) {
    if (result[0]._id === type) return result[0].total;
    else return 0;
  }
  return 0;
};

class Item {
  type: "Inflow" | "Outflow" | "Asset";
  amount: number = 0;
  constructor(type: "Inflow" | "Outflow" | "Asset") {
    this.type = type;
  }
}
export const getProfitFromData = (result: any[]): number => {
  const inflow = new Item("Inflow");
  const outflow = new Item("Outflow");
  const asset = new Item("Asset");
  for (let i = 0; i < result.length; i++) {
    if (result[i].type === "Inflow") {
      inflow.amount = result[i].amount;
    } else if (result[i].type === "Outflow") {
      outflow.amount = result[i].amount;
    } else if (result[i].type === "Asset") {
      asset.amount = result[i].amount;
    }
  }
  return inflow.amount - outflow.amount - asset.amount;
};
