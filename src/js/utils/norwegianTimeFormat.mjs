export function formatDateTimeNorwegian(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("nb-NO");
  const formattedTime = date.toLocaleTimeString("nb-NO");
  return `Date: ${formattedDate}\nTime: ${formattedTime}`;
}
