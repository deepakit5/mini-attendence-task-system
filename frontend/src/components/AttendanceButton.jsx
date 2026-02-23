import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markAttendance, fetchMyAttendance } from "../features/attendance/attendanceSlice";
import dayjs from "dayjs";

export default function AttendanceButton() {
  const dispatch = useDispatch();
  const attendanceList = useSelector(s => s.attendance.list);
  const [markedToday, setMarkedToday] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { dispatch(fetchMyAttendance()); }, [dispatch]);

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    setMarkedToday(attendanceList.some(a => a.date === today));
  }, [attendanceList]);

  const handleMark = async () => {
    if (markedToday) return;
    setLoading(true);
    const today = dayjs().format("YYYY-MM-DD");
    await dispatch(markAttendance({ date: today }));
    setLoading(false);
  };

  // last 7 days list
  const last7 = Array.from({ length: 7 }).map((_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  );

  return (
    <div>
      <div className="flex gap-3 items-center mb-3">
        <button onClick={handleMark} disabled={markedToday || loading}
          className={`px-4 py-2 rounded-lg text-white ${markedToday ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-60`}>
          {markedToday ? "Marked ✓" : loading ? "Marking..." : "Mark Attendance"}
        </button>
        <div className="text-sm text-gray-600">Local time: {dayjs().format("MMM D, YYYY HH:mm")}</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {last7.map(d => {
          const found = attendanceList.find(a => a.date === d);
          return (
            <div key={d} className={`p-2 text-center rounded ${found ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-100"}`}>
              <div className="text-xs text-gray-500">{dayjs(d).format("DD MMM")}</div>
              <div className={`text-sm font-medium ${found ? "text-green-700" : "text-gray-400"}`}>{found ? "Present" : "—"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}