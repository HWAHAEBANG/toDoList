import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import AppToDoList from "./AppToDoList";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppToDoList />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * 구현해야할 기능
 * 체크박스
 * 추가하기
 * 삭제하기
 * 다크모드
 * 필터링
 * 로컬스토리지- 할줄 모름.
 */
