import React from "react";
import ToDoList from "./components/ToDoList";
// import styles from "./components/todolist.module.css";
import { DarkModeProvider } from "./context/DarkModeContext";

export default function AppToDoList() {
  return (
    <div>
      <DarkModeProvider>
        <ToDoList />
      </DarkModeProvider>
    </div>
  );
}
