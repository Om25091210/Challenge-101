import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';

const TaskList = ({ week }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/tasks/${week}`).then((res) => setTasks(res.data));
  }, []);

  return (
    <>
      {tasks && tasks.length === 0 ? (
        <p>Complete previous week tasks to unlock.</p>
      ) : (
        tasks.map((task) => (
          <li>
            <span>{task.desc}</span>
            <span>{task.reward_point}XP</span>
          </li>
        ))
      )}
    </>
  );
};

export default TaskList;
