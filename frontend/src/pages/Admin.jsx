import React, { useEffect, useState } from "react";
import api from "../api/axios";
import TaskList from "../components/TaskList";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    api.get("/auth/users")
      .then(r => setUsers(r.data))
      .catch(() => setUsers([]));
  }, []);

  const fetchAttendance = async () => {
    const res = await api.get("/attendance", { params: { date } });
    setAttendance(res.data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Manage Tasks (All)</h3>
        <div className="mb-3">
          {/* Admin can create tasks via a form you can wire to createTask API */}
          <small className="text-gray-500">Create / assign tasks to users using the admin console (UI form not included here — backend endpoint is /tasks POST)</small>
        </div>
        <TaskList />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Attendance (by date)</h3>
        <div className="flex gap-2">
          <input value={date} onChange={e => setDate(e.target.value)} className="input" placeholder="YYYY-MM-DD" />
          <button onClick={fetchAttendance} className="btn">Fetch</button>
        </div>

        <div className="mt-3">
          {attendance.map(a => (
            <div key={a._id} className="p-2 border rounded mb-2">
              <div><strong>{a.user?.name}</strong> ({a.user?.email})</div>
              <div>{a.date} - {new Date(a.time).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}