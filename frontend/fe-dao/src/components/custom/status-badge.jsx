import { Badge } from "../ui/badge";
import clsx from "clsx";

const statusStyles = {
    awaiting: "bg-yellow-200 text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900",
    returned: "bg-red-200 text-red-800 hover:bg-red-300 hover:text-red-900",
    completed: "bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900",
    pending: "bg-orange-200 text-orange-800 hover:bg-orange-300 hover:text-orange-900",
    progress: "bg-blue-200 text-blue-800 hover:bg-blue-300 hover:text-blue-900",
    hold: "bg-purple-200 text-purple-800 hover:bg-purple-300 hover:text-purple-900",
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900", // Default style for unrecognized statuses
  };

const getStatusClass = (status) => {
  const lowerStatus = status.toLowerCase();
  for (const [key, value] of Object.entries(statusStyles)) {
    if (lowerStatus.includes(key)) {
      return value;
    }
  }
  return statusStyles.default; // Default style if no keyword is matched
};

const StatusBadge = ({ status }) => {
  const statusClass = getStatusClass(status);

  return (
    <Badge className={clsx(statusClass)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
