let currentYear = new Date().getFullYear();
let isCurrentLeapYear =
  new Date(currentYear, 1, 29).getDate() === 29 ? true : false;

const Jan = Array.from(Array(31).keys()); //0-30  //month start and end indexes
const Feb = Array.from(Array(28).keys()); // 31-58
const LeapFeb = Array.from(Array(29).keys()); //59-89
const Mar = Array.from(Array(31).keys()); //90-119
const Apr = Array.from(Array(30).keys()); //120-150
const May = Array.from(Array(31).keys()); //151-180
const Jun = Array.from(Array(30).keys()); //181-211
const Jul = Array.from(Array(31).keys()); //212-242
const Aug = Array.from(Array(31).keys()); //243-272
const Sep = Array.from(Array(30).keys()); //273-303
const Oct = Array.from(Array(31).keys()); //304-333
const Nov = Array.from(Array(30).keys()); //334-364
const Dec = Array.from(Array(31).keys());

export let FebDays = isCurrentLeapYear ? LeapFeb : Feb;

export const completeYear = [
  ...Jan,
  ...FebDays,
  ...Mar,
  ...Apr,
  ...May,
  ...Jun,
  ...Jul,
  ...Aug,
  ...Sep,
  ...Oct,
  ...Nov,
  ...Dec,
];

const monthRanges = [
  { start: 0, end: 30, name: "January", val: 1 },
  { start: 31, end: 58, name: "February", val: 2 },
  { start: 59, end: 89, name: "March", val: 3 },
  { start: 90, end: 119, name: "April", val: 4 },
  { start: 120, end: 150, name: "May", val: 5 },
  { start: 151, end: 180, name: "June", val: 6 },
  { start: 181, end: 211, name: "July", val: 7 },
  { start: 212, end: 242, name: "August", val: 8 },
  { start: 243, end: 272, name: "September", val: 9 },
  { start: 273, end: 303, name: "October", val: 10 },
  { start: 304, end: 333, name: "November", val: 11 },
  { start: 334, end: 364, name: "December", val: 12 },
];

const leapMonthRanges = [
  { start: 0, end: 30, name: "January", val: 1 },
  { start: 31, end: 59, name: "February", val: 2 },
  { start: 60, end: 90, name: "March", val: 3 },
  { start: 91, end: 120, name: "April", val: 4 },
  { start: 121, end: 151, name: "May", val: 5 },
  { start: 152, end: 181, name: "June", val: 6 },
  { start: 182, end: 212, name: "July", val: 7 },
  { start: 213, end: 243, name: "August", val: 8 },
  { start: 244, end: 273, name: "September", val: 9 },
  { start: 274, end: 304, name: "October", val: 10 },
  { start: 305, end: 334, name: "November", val: 11 },
  { start: 335, end: 365, name: "December", val: 12 },
];

export function resolveMonth(item) {
  let rangeSelect = isCurrentLeapYear ? leapMonthRanges : monthRanges;
  const monthRange = rangeSelect.find(
    ({ start, end }) => item >= start && item <= end
  );
  if (monthRange) {
    // const monthNumber = monthRanges.indexOf(monthRange) + 1;
    return monthRange;
  }
}

export function resolveDay(day) {
  let allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayStr = allDays[day];
  return { dayNum: day, dayStr: dayStr };
}

export function getDay(currentYear, item, index) {
  let month = resolveMonth(index).val;
  let day = new Date(`${currentYear}-${month}-${item + 1}`).getDay();
  let dayObj = resolveDay(day);
  return dayObj.dayStr;
}
