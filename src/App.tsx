import { useState, useEffect, FormEvent,ChangeEvent } from 'react'
import { PlusCircle } from 'phosphor-react'
import './global.scss'
import styles from './App.module.scss'
import rocketLogo from './assets/rocket.svg'
import { Task } from './components/Task'
import { EmptyTaskList } from './components/EmptyTaskList'


function App() {
  const [count, setCount] = useState(0)

  interface Task {
    id: number;
    content: string;
    isChecked: boolean;
  }

  const [tasks, setTasks] = useState<Task []>(
    [
      {
        id: 1,
        content: 'Comprar legumes no hortifruti.',
        isChecked: false,
      },
      {
        id: 2,
        content: 'Fazer atividade física.',
        isChecked: false,
      },
      {
        id: 3,
        content: 'Esta é uma tarefa finalizada.',
        isChecked: true,
      }
    ]
  );

  const [inputTask, setInputTask] = useState('');


  const [numberOfTasksChecked, setNumberOfTasksChecked] = useState(() => {
    return tasks.filter((item) => {
      return item.isChecked;
    }).length;
  });


  useEffect(()=>{
    const numberOfTasksChecked = tasks.filter((item) => {
      return item.isChecked;
    }).length;
    
    setNumberOfTasksChecked(numberOfTasksChecked);
  }), [tasks];

  function handleCheckTask(taskId: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.isChecked = !task.isChecked;
      }
      return task;
    })

    setTasks(updatedTasks);
  }

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    if(inputTask.trim()!=='') {
      addTextToTasksSet(inputTask)
    }
    setInputTask('');
  }

  function addTextToTasksSet(text: string) {
    const newTasksSet = [...tasks,{
      id: generateNewId(),
      content: text,
      isChecked: false,
    }];

    setTasks(newTasksSet);
  }

  function generateNewId():number {
    const newId = tasks.reduce((generatedId, task)=>{
      if(task.id>generatedId) {
        generatedId=task.id
      }
      return generatedId
    }, 1)
    return newId+1;
  }

  function handleChangeInputText(event: ChangeEvent<HTMLInputElement>) {
    setInputTask(event.target.value)
  }

  function handleDeleteTask(taskId: number) {
    const remainingTasks = tasks.filter(task => {
      return task.id !== taskId;
    });

    setTasks(remainingTasks);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img src={rocketLogo} />
        <span>to</span>
        <span>do</span>
      </header>

      <main>
        <div className={styles.newTask}>
          <form onSubmit={handleAddTask} >
            <input 
              placeholder='Adicione uma nova tarefa'
              value={inputTask} 
              onChange={handleChangeInputText} 
            />
            <button type='submit'>
              <div>
                <span>Criar</span>
                <span><PlusCircle size={16} /></span>
              </div>
            </button>
          </form>
        </div>

        <div>
          <div className={styles.tasksInfo}>
            <div>
              <span>Tarefas criadas</span>
              <span>{tasks.length}</span>
            </div>
            <div>
              <span>Concluídas</span>
              <span>{numberOfTasksChecked} de {tasks.length}</span>
            </div>
          </div>

          <div className={styles.tasksList}>
            {tasks.length > 0 ? 
            tasks.map((item) => {
              return (
                <Task 
                  key={item.id} 
                  id={item.id}
                  content={item.content}
                  isChecked={item.isChecked}
                  onTaskIsChecked={handleCheckTask}
                  onTaskIsDeleted={handleDeleteTask}
                />
              );
            })
          : (
            <EmptyTaskList />
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default  App