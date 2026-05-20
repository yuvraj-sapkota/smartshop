import { useState } from "react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-600",
  approved: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
};

const StatusDropdown = ({ productId, initialStatus, onUpdate }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await onUpdate(productId, newStatus);
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className={`px-2 py-1 rounded-full font-semibold outline-none cursor-pointer ${statusStyles[status]}`}
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  );
};

export default StatusDropdown;
