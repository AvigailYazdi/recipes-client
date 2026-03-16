export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);

  const diffSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffSeconds < 60) return "לפני כמה שניות";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `לפני ${minutes} דקות`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `לפני ${hours} שעות`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "אתמול";
  if (days === 2) return "לפני יומיים";
  if (days < 7) return `לפני ${days} ימים`;

  return past.toLocaleString("he-IL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
