import React, { useState } from "react";
import AttendanceButton from "../components/AttendanceButton";
import TaskList from "../components/TaskList";
import dayjs from "dayjs";

export default function Dashboard() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Attendance</h3>
        <AttendanceButton />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">My Tasks</h3>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-2 py-1" />
        </div>

        <TaskList date={date} />
      </div>
    </div>
  );
}