import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';

function TaskCircle({ tasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false); // For modal visibility
  const [taskDetails, setTaskDetails] = useState([]); // For modal content
  useEffect(() => {
    // Split tasks into completed and incomplete
    const completed = tasks.filter((task) => task.status === 'completed');
    const incomplete = tasks.filter((task) => task.status === 'incomplete');
    setCompletedTasks(completed);
    setIncompleteTasks(incomplete);
  }, [tasks]);
  const completedCount = completedTasks.length;
  const incompleteCount = incompleteTasks.length;
  // Function to open modal and show details
  const handleShowDetails = (taskList) => {
    setTaskDetails(taskList);
    setOpenModal(true);
  };
  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to render task details in the modal
  const renderModalContent = () => (
    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
      <h2>Task Details</h2>
      <table className="task-details-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {taskDetails.map((task, index) => (
            <tr key={index}>
              <td>{task.taskName}</td>
              <td>{task.taskDescription}</td>
              <td>{task.assignedTo}</td>
              <td>{new Date(task.assignedDate).toLocaleDateString()}</td>
              <td>{new Date(task.deadlineDate).toLocaleDateString()}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCloseModal} style={{ marginTop: '20px' }}>
        Close
      </button>
    </Box>
  );
  // Function to render tooltip task summaries
  const renderTaskDetails = (taskList) => (
    <Box className="tooltip-box">
      {taskList.slice(0, 3).map((task, index) => (
        <div key={index}>
          {`${task.status === 'completed' ? 'Completed' : 'Incomplete'} Task ${index + 1}: ${task.taskName}`}
        </div>
      ))}
      {taskList.length > 3 && (
        <div style={{ marginTop: '5px', fontWeight: 'bold' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); handleShowDetails(taskList); }}>
            Show Details
          </a>
        </div>
      )}
    </Box>
  );
  return (
    <>
      {incompleteCount > 0 && (
        <Tooltip title={renderTaskDetails(incompleteTasks)} arrow>
          <div
            className="tooltip-circle incomplete"
            onClick={() => handleShowDetails(incompleteTasks)}
          >
            {incompleteCount}
          </div>
        </Tooltip>
      )}
      {completedCount > 0 && (
        <Tooltip title={renderTaskDetails(completedTasks)} arrow>
          <div
            className="tooltip-circle completed"
            onClick={() => handleShowDetails(completedTasks)}
            style={{ backgroundColor: 'green', color: 'white' }} // Green circle for completed tasks
          >
            {completedCount}
          </div>
        </Tooltip>
      )}

      {/* Modal for showing task details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {renderModalContent()}
        </Box>
      </Modal>
    </>
  );
}
export default TaskCircle;
