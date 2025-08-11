import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-bright.css"; // custom bright theme

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [frequency, setFrequency] = useState("Daily");

  const handleSubmit = async () => {
    const payload = {
      userId: "USER_ID_FROM_AUTH", // replace dynamically
      selectedDate,
      selectedTime,
      frequency,
    };

    try {
      const res = await fetch("http://localhost:5000/api/schedule/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Schedule saved successfully!");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      alert("Error while saving schedule.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1e9db] p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center">Select Date</h2>

        {/* Date Picker */}
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            calendarClassName="custom-calendar"
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        {/* Time Picker */}
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        {/* Frequency Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          >
            <option>Daily</option>
            <option>Alternate Days</option>
            <option>Twice a Week</option>
            <option>Weekly</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-md transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SchedulePage;


