import { MoveRight } from "lucide-react";
import React from "react";

const DataTable = ({ columns, data }) => {
  return (
    <>
      <div>
        {/* Scroll wrapper for mobile */}
        <div className="overflow-x-auto rounded-md shadow-md border border-gray-200 bg-white">
          <table className="min-w-[700px] w-full text-sm">
            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th key={col.header} className="p-4 text-left font-medium">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.length == 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-6 text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    {columns.map((col) => (
                      <td key={col.header} className="p-4">
                        {col.cell ? col.cell(row) : row[col.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE TIP */}
        <p className="text-xs text-gray-400 mt-2 md:hidden flex items-center   gap-2">
          <MoveRight size={14} /> Swipe left/right to view full table
        </p>
      </div>
    </>
  );
};

export default DataTable;
