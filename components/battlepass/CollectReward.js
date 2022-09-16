import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function CollectReward({ battlepass, task }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <RewardCollect battlepass={battlepass} task={task} />
    </QueryClientProvider>
  );
}

const RewardCollect = ({ battlepass, task }) => {
  const [collect, setCollect] = useState(task?.isCollected);

  const isComplete =
    battlepass.completed_tasks.filter((completed_task) => {
      return completed_task.taskId === task._id;
    }).length > 0;

  const handleCollect = (e) => {
    e.preventDefault();
    mutate({ collect });
    setCollect(!collect);
  };

  const collectingReward = async () => {
    await fetch(`${baseURL}/api/tasks/collectreward/${task._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(collectingReward);

  return (
    <>
      {isComplete ? (
        collect ? (
          <i className="fa fa-check" aria-hidden="true"></i>
        ) : (
          <span onClick={handleCollect}>Collect</span>
        )
      ) : (
        <span>{task.reward_point}XP</span>
      )}
    </>
  );
};
