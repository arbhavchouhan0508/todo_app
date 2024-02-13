import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CreateTodo from "./component/CreateTodo";
import TodosList from "./component/TodosList";
import EditTodo from "./component/EditTodo";

function App() {
  return (
    <div className="container">
      <Link to="/" className="title text-decoration-none">
        <h1>Todo App</h1>
      </Link>
      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/create" element={<CreateTodo />} />
      </Routes>
    </div>
  );
}

export default App;
