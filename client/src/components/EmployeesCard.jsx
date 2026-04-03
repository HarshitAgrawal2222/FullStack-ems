import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    onDelete(employee.id); // ✅ call parent function
  };

  return (
    <div className="group relative card card-hover overflow-hidden">

      {/* Avatar Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-indigo-400">
              {employee.firstName[0]} {employee.lastName[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-slate-900 font-medium">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-xs text-slate-500">
          {employee.position}
        </p>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-600 rounded-lg shadow-sm">
          {employee.department || "Remote"}
        </span>

        {employee.isDeleted && (
          <span className="bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded">
            DELETED
          </span>
        )}
      </div>

      {/* Actions */}
      {!employee.isDeleted && (
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">

          <button
            onClick={() => onEdit(employee)}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition hover:scale-105"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>
      )}

    </div>
  );
};

export default EmployeeCard;