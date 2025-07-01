export default function calculateBirthday(birthdate) {
  // Normalize to start of day to avoid timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birth = new Date(birthdate);
  birth.setHours(0, 0, 0, 0);

  // Get this year's birthday
  let nextBirthday = new Date(
    today.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );

  // If this year's birthday has already passed, use next year's
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birth.getMonth(),
      birth.getDate()
    );
  }

  // Calculate months and days until next birthday
  let months = 0;
  let days = 0;

  const currentDate = new Date(today);

  // Count full months
  while (true) {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);

    if (nextMonth <= nextBirthday) {
      months++;
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      break;
    }
  }

  // Calculate remaining days
  days = Math.floor((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));

  return {
    months: months,
    days: days,
    totalDays: Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24)),
    nextBirthdayDate: nextBirthday.toDateString(),
    isBirthdayToday:
      today.getMonth() === birth.getMonth() &&
      today.getDate() === birth.getDate(),
  };
}
