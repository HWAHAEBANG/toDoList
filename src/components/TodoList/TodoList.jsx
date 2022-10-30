import React, { useState, useEffect } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function ToDoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
  const handleAdd = (todo) => {
    // 새로운 투두를 todos에 업데이트 해야함.
    //console.log(todo);
    setTodos([...todos, todo]);
  };
  // console.log(todos);
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // todos를 json으로 변환
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
