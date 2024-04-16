export function getData(date) {
  const dp = ["", "st", "nd", "rd", "th"];
  const mth = [
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
  const td = new Date(date);
  let n_date = "";
  n_date +=
    td.getDate() + dp[td.getDate() % 10 > 3 ? 4 : td.getDate() % 10] + " ";
  n_date += mth[td.getMonth()] + ", ";
  n_date += td.getFullYear();
  return n_date;
}

console.log(getData("2022-01-01")); // 1st January, 2022
console.log(getData("2022-02-02")); // 2nd February, 2022
console.log(getData("2022-03-03")); // 3rd March, 2022
console.log(getData("2022-04-04")); // 4th April, 2022
console.log(getData("2022-05-05")); // 5th May, 2022
