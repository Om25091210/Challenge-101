import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import CollectReward from './CollectReward';

const TaskList = ({ week, battlepass }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/tasks/${week}`).then((res) => setTasks(res.data));
  }, []);

  return (
    <>
      {tasks && tasks.length === 0 ? (
        <p>Complete previous week tasks to unlock.</p>
      ) : (
        tasks &&
        tasks.map((task) => (
          <li>
            <span>{task.desc}</span>
            <CollectReward battlepass={battlepass} task={task} />
          </li>
        ))
      )}
    </>
  );
};

export default TaskList;
