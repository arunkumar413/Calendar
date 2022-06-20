export const Jan = Array.from(Array(31).keys());
export const Feb = Array.from(Array(28).keys());
export const LeapFeb = Array.from(Array(29).keys());
export const Mar = Array.from(Array(31).keys());
export const Apr = Array.from(Array(30).keys());
export const May = Array.from(Array(31).keys());
export const Jun = Array.from(Array(30).keys());
export const Jul = Array.from(Array(31).keys());
export const Aug = Array.from(Array(31).keys());
export const Sep = Array.from(Array(30).keys());
export const Oct = Array.from(Array(31).keys());
export const Nov = Array.from(Array(30).keys());
export const Dec = Array.from(Array(31).keys());

export const currentYear = new Date().getFullYear();
export const isLeapYear = new Date(currentYear, 1, 29).getDate() === 29;

export const Year = [
  ...Jan,
  ...Feb,
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

export const janElements = Jan.map(function (item, index) {
  return (
    <div key={index.toString()} className="month-elements">
      <span>{item + 1}</span>
    </div>
  );
});
