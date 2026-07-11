import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import DataTable from "../../../components/DataTable";
import { getAllUsersAPI } from "../../../services/customer/customer.api";
import { showError } from "../../../utils/toast";

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersAPI();
        const formatted = data.users.map((user, index) => ({
          ...user,
          sn: index + 1,
          referBy: user.referredBy?.username || "-",
          datetime: new Date(user.createdAt).toLocaleString(),
        }));
        setUserData(formatted);
      } catch (error) {
        showError(error);
      }
    };

    fetchUsers();
  }, []);

  const userColumns = [
    { header: "SN", accessorKey: "sn" },

    {
      header: "Username",
      accessorKey: "username",
    },

    {
      header: "Need to Pay",
      accessorKey: "needToPay",
      cell: (row) =>
        row.needToPay > 0 ? (
          <span className="font-semibold text-blue-600">
            Rs. {row.needToPay}
          </span>
        ) : (
          <span className="text-gray-400">--</span>
        ),
    },

    {
      header: "Refer By",
      accessorKey: "referBy",
    },

    {
      header: "Time & Date",
      accessorKey: "datetime",
      cell: (row) => (
        <span className="text-gray-500 text-xs whitespace-nowrap">
          {row.datetime}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-10">
        <PageHeader text="Users" />
        <DataTable columns={userColumns} data={userData} />
      </div>
    </>
  );
};

export default Users;
