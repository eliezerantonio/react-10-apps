import React from "react";
import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";
import uuid from "uuid";

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  STATE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAR_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, name: "Enviar e-mail", state: true, projectId: 1 },
      { id: 2, name: "Cancelar Pedidos", state: false, projectId: 2 },
      { id: 3, name: "Enviar Pedidos", state: true, projectId: 3 },
      { id: 4, name: "Apagar Conta", state: false, projectId: 4 },
      { id: 5, name: "Enviar e-mail", state: true, projectId: 1 },
      { id: 6, name: "Cancelar Pedidos", state: false, projectId: 2 },
      { id: 7, name: "Enviar Pedidos", state: true, projectId: 3 },
      { id: 8, name: "Enviar e-mail", state: true, projectId: 4 },
      { id: 9, name: "Cancelar Pedidos", state: false, projectId: 1 },
      { id: 10, name: "Enviar Pedidos", state: true, projectId: 2 },
    ],
    taskproject: null,
    errortask: false,
    taskselected: null,
  };

  // criar dispatch e estados

  const [state, dispatch] = React.useReducer(TaskReducer, initialState);

  //criar funcoes

  //obter tarefas de um projetos

  const getTasks = (projectId) => {
    dispatch({ type: TASKS_PROJECT, payload: projectId });
  };

  //Adicionar uma tarefa ao projecto selecionado
  const addTask = (task) => {
    task.id = uuid.v4();
    dispatch({ type: ADD_TASK, payload: task });
  };

  //valida e mostra error caso seja necessario

  const validateTask = () => {
    dispatch({ type: VALIDATE_TASK });
  };

  //Eiminar tarefa por id

  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  //muda o estado da tarefa

  const changeStateTask = (task) => {
    dispatch({ type: STATE_TASK, payload: task });
  };

  //EXTRAR UMA TAEFA PARA EDITR

  const saveActualTask = (task) => {
    dispatch({ type: ACTUAL_TASK, payload: task });
  };

  //EDITAR TAREFA

  const updateTask = (task) => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  //ELIMINA  A TAREFA SELECIONADA

  const clearTask = () => {
    dispatch({
      type: CLEAR_TASK,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        tasksproject: state.tasksproject,
        errortask: state.errortask,
        taskselected: state.taskselected,

        getTasks,
        addTask,
        validateTask,
        deleteTask,
        changeStateTask,
        saveActualTask,
        updateTask,
        clearTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
