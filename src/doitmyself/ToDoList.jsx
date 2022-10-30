import React, { useState, useContext } from "react";
import styles from "./todolist.module.css";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeContext";

export default function ToDoList() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState("");
  const [checkedItem, setCheckedItem] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // submit 수행시 refresh를 막아준다.
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Form에 입력되는 내용을 실시간으로 업데이트 시켜준다.
  const handleChange = (e) => {
    console.log(e.target.value); // 입력내용 실시간 확인
    const value = e.target.value;
    setForm(value);
  };

  // checkbox가 체크되면 onChange로 변화를 감지해서 함수를 실행하고,
  // e.target.checked의 true면 useState를 업데이트하고, 체크가 해제되면
  // else문의 splice를 통해 해당 내용을 삭제한다.
  const checkHandler = (e) => {
    //console.log(e);
    if (e.target.checked) {
      setCheckedItem([...checkedItem, e.target.nextSibling.innerText]);
      e.target.nextElementSibling.style.textDecoration = "line-through";
    } else {
      const index = checkedItem.indexOf(e.target.nextSibling.innerText);
      setCheckedItem(checkedItem.splice(checkedItem.splice(index, 1)));
      //spice는 잘라낸 값은 반환하기 때문에, 2중 splice를 씌우면
      //자르고 남음 값을 setCheckedItem에 바로 담을 수 있다.
      e.target.nextElementSibling.style.textDecoration = "none";
    }
  };

  // All버튼 : display: none; 으로 되어있언 리스트들을 모두 보이게 한다.
  const handleAll = (e) => {
    const targetUl =
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0];

    for (let i = 0; i < targetUl.childNodes.length; i++) {
      targetUl.childNodes[i].childNodes[0].style.display = "block";
    }
  };

  // Active버튼 : 체크되어있는 항목을 display : none으로 안보이게 한다.
  const handleActive = (e) => {
    // console.log(e);
    const targetUl =
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0];
    // Active버튼에서 체크박스의 blean값을 찾기위한 험난한 여정 ^^;;

    for (let i = 0; i < targetUl.childNodes.length; i++) {
      targetUl.childNodes[i].childNodes[0].style.display = "block";
      // completed에서 넘어왔을 때 생기는 오류를 막기위해, 전체를 한번 보이게 하고 시작한다.
      if (targetUl.childNodes[i].childNodes[0].childNodes[0].checked === true) {
        targetUl.childNodes[i].childNodes[0].style.display = "none";
      }
    }
  };

  // Completed버튼 : 체크되어있지 않은 항목을 display : none으로 안보이게 한다.
  const handleCompleted = (e) => {
    // console.log(e);
    const targetUl =
      e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0];

    for (let i = 0; i < targetUl.childNodes.length; i++) {
      targetUl.childNodes[i].childNodes[0].style.display = "block";
      // Active에서 넘어왔을 때 생기는 오류를 막기위해, 전체를 한번 보이게 하고 시작한다.
      if (
        targetUl.childNodes[i].childNodes[0].childNodes[0].checked === false
      ) {
        targetUl.childNodes[i].childNodes[0].style.display = "none";
      }
    }
  };

  console.log(list); // 추가된 일정들이 배열로 잘 들어가고 있나 확인
  console.log(checkedItem); // 체크된 친구들이 배열로 잘 들어가고 있나 확인

  return (
    <>
      {darkMode ? (
        <div
          className={styles.background}
          style={{ backgroundColor: "#0f2a5e" }}
        >
          <div className={styles.container}>
            <div
              className={styles.header}
              style={{ backgroundColor: "#0a1b3d", borderColor: "#112c63" }}
            >
              <span>화해방's ToDoList</span>
              <ul className={styles.menu}>
                <li tabIndex={-1} onClick={handleAll}>
                  All
                </li>
                <li tabIndex={-1} onClick={handleActive}>
                  Active
                </li>
                <li tabIndex={-1} onClick={handleCompleted}>
                  Completed
                </li>
              </ul>
              <button
                className={styles.modeBtn}
                onClick={() => toggleDarkMode()}
              >
                {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
              </button>
            </div>
            <div
              className={styles.contents}
              style={{ backgroundColor: "#0e2554", color: "white" }}
            >
              <ul>
                {list.map((todo, index) => (
                  <li key={index}>
                    <div style={{ backgroundColor: "rgba(255,255,255,20%)" }}>
                      <input
                        type='checkbox'
                        id={index}
                        onChange={(e) => {
                          console.log(e.target.nextElementSibling);
                          checkHandler(e);
                        }}
                      ></input>
                      <label htmlFor={index}>{todo}</label>
                      <button
                        onClick={(e) => {
                          console.log(e);
                          setList(list.splice(list.splice(index, 1)));
                          // 리스트에서 바로 삭제해주기 (2중 splice)
                          setCheckedItem(
                            checkedItem.splice(checkedItem.splice(index, 1))
                            //✨이거 안 해주면 체크된 채로 삭제했을 때 체크배열에는 남아있는 대참사가 일어남.
                          );

                          // ❌버그가 있는 부분!!!!❌
                          e.target.parentNode.childNodes[0].checked = false;
                          e.target.parentNode.childNodes[1].style.textDecoration =
                            "none";
                          // 한 개의 리스트가 삭제될 때 체크박스와 텍스트데코레이션이 살아있어서
                          // 그 다음 리스트가 위로 올라오면서 체크되는 오류가 발생함.
                          // 나름대로 코드를 작성해 봤지만 되다 안되다 함.
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={styles.inputArea}
              style={{ backgroundColor: "#0a1b3d" }}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Add List'
                  className={styles.input}
                  value={form}
                  onChange={handleChange}
                  style={{ backgroundColor: "#455491" }}
                />
                <button
                  className={styles.addBtn}
                  onClick={() => {
                    setList([...list, form]);
                    setForm("");
                  }}
                  style={{ backgroundColor: "#000038" }}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.header}>
              <span>화해방's ToDoList</span>
              <ul className={styles.menu}>
                <li tabIndex={-1} onClick={handleAll}>
                  All
                </li>
                <li tabIndex={-1} onClick={handleActive}>
                  Active
                </li>
                <li tabIndex={-1} onClick={handleCompleted}>
                  Completed
                </li>
              </ul>
              <button
                className={styles.modeBtn}
                onClick={() => toggleDarkMode()}
              >
                {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
              </button>
            </div>
            <div className={styles.contents}>
              <ul>
                {list.map((todo, index) => (
                  <li key={index}>
                    <div>
                      <input
                        type='checkbox'
                        id={index}
                        onChange={(e) => {
                          console.log(e.target.nextElementSibling);
                          checkHandler(e);
                        }}
                      ></input>
                      <label htmlFor={index}>{todo}</label>
                      <button
                        onClick={(e) => {
                          // console.log(index);
                          setList(list.splice(list.splice(index, 1)));
                          // 리스트에서 바로 삭제해주기 (2중 splice)
                          setCheckedItem(
                            checkedItem.splice(checkedItem.splice(index, 1))
                            //✨이거 안 해주면 체크된 채로 삭제했을 때 체크배열에는 남아있는 대참사가 일어남.
                          );
                          e.target.parentNode.parentNode.parentNode.childNodes[0].checked = false;
                          //✨ 이걸 안해주면, 한 개의 리스트가 삭제될 때 체크박스는 살아있어서
                          // 그 다음 리스트가 위로 올라오면서 체크되는 오류가 발생함.
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.inputArea}>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Add List'
                  className={styles.input}
                  value={form}
                  onChange={handleChange}
                />
                <button
                  className={styles.addBtn}
                  onClick={() => {
                    setList([...list, form]);
                    setForm("");
                  }}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
