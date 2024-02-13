import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTodo() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [state, setState] = useState({
    todo_description: "",
    todo_responsible: "",
    todo_priority: "",
  });
  const getTodoList = async () => {
    const res = await axios.get("https://todo-backend74745.onrender.com/todos/" + id);
    if (res) {
      setState({
        todo_description: res.data.todo_description,
        todo_responsible: res.data.todo_responsible,
        todo_priority: res.data.todo_priority,
      });
    } else console.log("something went wrong!");
  };
  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(state);
  const onSubmit = async (e) => {
    e.preventDefault();
    const { todo_description, todo_responsible, todo_priority } = state;
    if (
      todo_description === "" ||
      todo_responsible === "" ||
      todo_priority === ""
    ) {
      alert("Please enter a all field");
    } else {
      console.log(state);
      const res = await axios.put(
        "https://todo-backend74745.onrender.com/todos/update/" + id,
        state
      );
      if (res) {
        setState({
          todo_description: "",
          todo_responsible: "",
          todo_priority: "",
        });
        navigate("/");
      } else {
        console.log("something went wrong");
      }
    }
  };
  useEffect(() => {
    getTodoList();
  }, [id]);
  return (
    <div>
      <h3>Update Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            name="todo_description"
            value={state.todo_description}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            name="todo_responsible"
            value={state.todo_responsible}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="todo_priority"
              id="priorityLow"
              value="Low"
              checked={state.todo_priority === "Low"}
              onChange={(e) => {
                onChangeHandler(e);
              }}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="todo_priority"
              id="priorityMedium"
              value="Medium"
              checked={state.todo_priority === "Medium"}
              onChange={(e) => {
                onChangeHandler(e);
              }}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="todo_priority"
              id="priorityHigh"
              value="High"
              checked={state.todo_priority === "High"}
              onChange={(e) => {
                onChangeHandler(e);
              }}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
