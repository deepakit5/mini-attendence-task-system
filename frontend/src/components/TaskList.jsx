import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../features/tasks/tasksSlice";
import dayjs from "dayjs";

export default function TaskList({ date = null }) {
  const dispatch = useDispatch();
  const tasks = useSelector(s => s.tasks.list);
  const user = useSelector(s => s.auth.user);

  useEffect(() => {
    const params = {};
    // for users, we want only tasks assigned to them (backend handles non-admin filter)
    if (date) {
      // backend doesn't inherently filter by date on tasks, so we filter on frontend by dueDate (or createdAt)
      // We fetch all tasks and then filter locally.
    }
    dispatch(fetchTasks(params));
  }, [dispatch, date]);

  const filtered = tasks.filter(t => {
    // assigned-to filter for regular user handled by backend, but double check:
    if (user?.role !== "admin" && t.assignedTo && t.assignedTo._id !== user._id) return false;

    if (!date) return true;
    // filter by dueDate (if provided)
    if (!t.dueDate) return false;
    return dayjs(t.dueDate).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD");
  });

  const toggleStatus = (task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    dispatch(updateTask({ id: task._id, data: { status: newStatus } }));
  };

  if (!filtered.length) return <div className="text-sm text-gray-500">No tasks for selected date.</div>;

  return (
    <div className="space-y-3">
      {filtered.map(t => (
        <div key={t._id} className="p-3 bg-white rounded shadow-sm flex justify-between items-start">
          <div>
            <h4 className="text-lg font-semibold">{t.title}</h4>
            <p className="text-sm text-gray-600">{t.description}</p>
            <div className="text-xs text-gray-400 mt-1">Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</div>
            <div className="text-xs text-gray-400">Assigned: {t.assignedTo?.name || "Unassigned"}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`px-2 py-1 rounded text-sm ${t.status === "done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>{t.status}</div>
            <button onClick={() => toggleStatus(t)} className="text-sm px-3 py-1 border rounded">
              Toggle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}