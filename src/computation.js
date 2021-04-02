export function transform_csv(data) {
  let information = [];
  for (let i = 0; i < data.length; i++) {
    let hour = data[i][0];
    let power = data[i][1];
    information.push([parseInt(hour.slice(8, 10)), parseFloat(power)]);
  }
  return information;
}
export function calc(rate, miles, start, end, data) {
  // // B1
  // // take all column values of the csv "Electric-Faculty" and multiply it by this.state.rate

  // // save added up value of entire column, save as total_usage
  // let total_usage = 0;
  // for (let i = 0; i < data.length; i++) {
  //   total_usage += data[i][1];
  // }
  // let B1 = total_usage * rate;

  // ----- rate A --------

  // A rate
  let A_cost = 0.15;

  let A_total = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] >= start && data[i][0] <= end) {
      A_total += data[i][1] * A_cost;
    }
  }

  // ----- rate B --------

  // B rate from 12-18
  let B_cost_first = 0.2;
  // B rate otherwise
  let B_cost_rest = 0.08;

  let B_total = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] >= start && data[i][0] <= end) {
      if (data[i][0] < 18 && data[i][0] >= 12) {
        B_total += data[i][1] * B_cost_first;
      } else {
        B_total += data[i][1] * B_cost_rest;
      }
    }
  }

  if (rate === "A") {
    // Add up home profile and EV load profile
    B_total += 0.3 * miles;
    if (A_total < B_total) {
      return [0, "Stay with your current plan"];
    } else {
      return [A_total - B_total, "Plan B is best"];
    }
  }
  if (rate === "B") {
    // Add up home profile and EV load profile
    A_total += 0.3 * miles;
    if (B_total < A_total) {
      return [0, "Stay with your current plan"];
    } else {
      return [B_total - A_total, "Plan B is best"];
    }
  }
}