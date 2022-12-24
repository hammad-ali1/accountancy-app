// @ts-nocheck
export {};
//convert date in suitable format
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

//convert date to month format
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

//function to check if object has an empty string
export const doesObjContainEmptyFields = (obj: any) => {
  return Object.values(obj).some((value) => {
    if (typeof value === "string" && value === "") return true;
    else return false;
  });
};

//get inflow or outflow from a dataset
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

//get totals from result
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

export function subtractYears(numOfYears: number, date = new Date()) {
  date.setFullYear(date.getFullYear() - numOfYears);

  return date;
}

export function subtractMonths(numOfMonths: number, date = new Date()) {
  date.setMonth(date.getMonth() - numOfMonths);

  return date;
}

//PROFIT HELPERS
function monthKey(d: Date) {
  let date = new Date(d);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return month + " " + year;
}
function sixMonthKey(d) {
  let date = new Date(d);
  const numMonth = date.toLocaleString("default", { month: "numeric" });

  console.log(numMonth);
  const year = date.toLocaleString("default", { year: "numeric" });
  if (numMonth <= 6) return "Jan-Jul" + ", " + year;
  else return "Aug-Dec" + ", " + year;
}
function yearKey(d: Date) {
  let date = new Date(d);
  const year = date.toLocaleString("default", { year: "numeric" });
  return year;
}
function findAllWithSameDate(a: any[], date: Date) {
  let arr = new Array(a);
  arr.find((item) => item.date === date);
}
export const profitDetailsByMonth = (arr) => {
  let newArr = arr.map((item) => {
    return { date: monthKey(item.date), profit: item.profit };
  });
  newArr = newArr.map((item) => {
    return {
      date: item.date,
      profit: newArr
        .filter((others) => others.date === item.date)
        .map((item) => item.profit),
    };
  });
  //get uniques
  newArr = newArr
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.date === value.date)
    )
    .map((item) => {
      return {
        date: item.date,
        profit: item.profit.reduce((partialSum, a) => partialSum + a, 0),
      };
    });
  console.log(newArr);
  return newArr;
};

export const profitDetailsByYear = (arr) => {
  let newArr = arr.map((item) => {
    return { date: yearKey(item.date), profit: item.profit };
  });
  newArr = newArr.map((item) => {
    return {
      date: item.date,
      profit: newArr
        .filter((others) => others.date === item.date)
        .map((item) => item.profit),
    };
  });
  //get uniques
  newArr = newArr
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.date === value.date)
    )
    .map((item) => {
      return {
        date: item.date,
        profit: item.profit.reduce((partialSum, a) => partialSum + a, 0),
      };
    });
  console.log(newArr);
  return newArr;
};

export const profitDetailsBySixMonths = (arr) => {
  let newArr = arr.map((item) => {
    return { date: sixMonthKey(item.date), profit: item.profit };
  });
  newArr = newArr.map((item) => {
    return {
      date: item.date,
      profit: newArr
        .filter((others) => others.date === item.date)
        .map((item) => item.profit),
    };
  });
  //get uniques
  newArr = newArr
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.date === value.date)
    )
    .map((item) => {
      return {
        date: item.date,
        profit: item.profit.reduce((partialSum, a) => partialSum + a, 0),
      };
    });
  console.log(newArr);
  return newArr;
};
