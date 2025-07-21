export default function calculateTimePassed(date) {
  // Normalize to start of day to avoid timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastDate = new Date(date);
  pastDate.setHours(0, 0, 0, 0);

  if (pastDate > today) {
    throw new Error("Date must be in the past");
  }

  let years = today.getFullYear() - pastDate.getFullYear();
  let months = today.getMonth() - pastDate.getMonth();
  let days = today.getDate() - pastDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  console.log({ months, days });

  return {
    years: years,
    months: months,
    days: days,
    isToday: years === 0 && months === 0 && days === 0,
  };
}
