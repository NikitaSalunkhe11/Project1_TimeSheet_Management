import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import '../../../../css/Timesheet.css';
import Sidenavbar from "../../../../components/Sidenavbar";
import TaskCircle from './TaskCircle';

const StyledTable = () => {
// Replace with your backend URL
  const BASE_URL = 'http://localhost:5000/api';
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const selectedMonth = selectedDate.month();
  const selectedYear = selectedDate.year();
  const firstDayOfMonth = dayjs().year(selectedYear).month(selectedMonth).date(1).day();
  const daysInMonth = selectedDate.daysInMonth();
  const calendarDays = Array(firstDayOfMonth).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, index) => index + 1)
  );
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState({ taskName: '', taskDescription: '', assignedTo: '', assignedDate:'', deadlineDate: '', status: 'incomplete' });
  // Reference to the form container
  const formRef = useRef(null);

  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

// Fetch tasks from backend
 const fetchTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    setTasks(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

 // Fetch tasks on component mount
 useEffect(() => {
  fetchTasks();
}, []);

 // Close form when clicking outside
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsFormOpen(false); // Close the form if clicked outside
    }
  };
  document.addEventListener('mousedown', handleClickOutside); // Listen for mouse clicks outside the form
  return () => {
    document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
  };
}, []);
// Handle task creation
const handleAddTaskClick = (day) => {
  setIsFormOpen(true);
  // Set the assignedDate to the clicked day from the table
  const clickedDate = dayjs(new Date(selectedYear, selectedMonth, day));
  setTaskData({
    ...taskData,
    assignedDate: clickedDate, // Set the assigned date to the selected day
    
  });
};
// Form submission to create task
const handleFormSubmit = async (e) => {
  e.preventDefault();
  // Ensure assignedDate is in the correct format
  const assignedDate = taskData.assignedDate.format('YYYY-MM-DD'); // Format it to 'YYYY-MM-DD' to use as key
  console.log('Task data submitted:', { ...taskData, assignedDate });
  try {
    // Make API call to store the task
    const response = await axios.post(`${BASE_URL}/tasks`, {
      ...taskData, 
      assignedDate: assignedDate
    });
    const newTask = response.data;
  // Update the tasks state by assigning the task to the correct assigned date
    setTasks((prevTasks) => {
    const updatedTasks = { ...prevTasks };
    // Check if tasks already exist for the assigned date
    if (updatedTasks[assignedDate]) {
      updatedTasks[assignedDate].push(newTask);
    } else {
      // If no tasks exist for that date, create a new entry
      updatedTasks[assignedDate] = [newTask];
    }
    return updatedTasks;
  });
  // Close the form after successful submission
  setIsFormOpen(false);
} catch (error) {
  console.error('Error creating task:', error);
}
};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Rajesh');
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const getTasksForDate = (day) => {
    const formattedDate = dayjs(new Date(selectedYear, selectedMonth, day)).format('YYYY-MM-DD');
    if (!Array.isArray(tasks)) return [];
    return tasks.filter((task) => {
      const assignedDate = dayjs(task.assignedDate).format('YYYY-MM-DD');
      const deadlineDate = dayjs(task.deadlineDate).format('YYYY-MM-DD');
      if (task.status === 'completed') {
        // Show completed tasks on the deadline date
        return deadlineDate === formattedDate;
      } else {
        // Show incomplete tasks on the assigned date
        return assignedDate === formattedDate;
      }
    });
  };
  return (
    
    <div className={`container ${isSidenavOpen ? 'sidenav-open' : ''}`}>
      <Sidenavbar onToggle={(isOpen) => setIsSidenavOpen(isOpen)} />
      <div className="datecontainer">
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedOption}
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          views={['year', 'month']}
          renderInput={(params) => (
            <input {...params} className="date-picker-input" />
          )}
        />
      </LocalizationProvider>
      <h1 className='workhour'>Working Hours 11am - 5pm </h1>
    </div>
      <table className="table">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="cell">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 7 }, (_, colIndex) => {
                const dayIndex = rowIndex * 7 + colIndex;
                const day = calendarDays[dayIndex];
                const tasksForDay = day ? getTasksForDate(day) : [];
                const isWeekend = day && (
                  dayjs(new Date(selectedYear, selectedMonth, day)).day() === 0 ||
                  dayjs(new Date(selectedYear, selectedMonth, day)).day() === 6
                );
                return (
                  <td key={colIndex} className="cell">
                    {day ? (
                      <>
                        <button
                          className="button"
                          onClick={() => handleAddTaskClick(day)}
                        >
                          +
                        </button>
                        {isWeekend && (
                          <div className="weekend">
                            😊 Week Off
                          </div>
                        )}
                        
                        <div className="task-circle">
                          {!isWeekend && (
                            <TaskCircle tasks={tasksForDay} />
                          )}
                        </div>
                        <span className="date">{day}</span>
                      </>
                    ) : (
                      <span className="date" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
  <div className="form-container" ref={formRef}>
    <form onSubmit={handleFormSubmit}>
      <h3>Add Task</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={taskData.taskName}
        onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
      />
      <textarea
        placeholder="Task Description"
        value={taskData.taskDescription}
        onChange={(e) => setTaskData({ ...taskData, taskDescription: e.target.value })}
      />
      <input
        type="datetime-local"
        value={taskData.assignedDate ? taskData.assignedDate.format('YYYY-MM-DDTHH:mm') : ''}
        onChange={(e) => setTaskData({ ...taskData, assignedDate: dayjs(e.target.value) })}
        placeholder="YYYY-MM-DD HH:mm"
      />
      <input
        type="datetime-local"
        value={taskData.deadlineDate}
        onChange={(e) => setTaskData({ ...taskData, deadlineDate: e.target.value })}
      />
      <select
        value={taskData.assignedTo}
        onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
      >
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
      </select>
      <button type="submit">Save</button>
    </form>
  </div>
)}
    </div>
  );
};
export default StyledTable;
