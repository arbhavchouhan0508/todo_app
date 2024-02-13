import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
function TodosList() {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const getTodoList = async () => {
    const res = await axios.get("https://todo-backend74745.onrender.com/todos");
    if (res) {
      const result = res?.data?.map((res) => {
        return { id: res._id, ...res };
      });
      setTodoList(result);
    } else console.log("something went wrong!");
  };

  const DeleteTodo = async (id) => {
    const res = await axios.delete("https://todo-backend74745.onrender.com/todos/delete/" + id);

    if (res) {
      getTodoList();
      //console.log("Delete successfully");
    } else console.log("something went wrong!");
  };
  useEffect(() => {
    getTodoList();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "todo_description", headerName: "Description", width: 250 },
    { field: "todo_responsible", headerName: "Responsible", width: 350 },
    { field: "todo_priority", headerName: "Priority", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <>
            <Link
              className="btn btn-sm btn-success text-decoration-none"
              to={"/edit/" + params.id}
            >
              Edit
            </Link>{" "}
            <Link
              className="btn btn-sm btn-danger text-decoration-none"
              style={{ marginLeft: "20px" }}
              onClick={(e) => DeleteTodo(params.id)}
            >
              Delete
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="row mb-4">
        <h3>Todos List</h3>
        <button
          type="button"
          className="btn btn-warning  ml-4"
          onClick={() => navigate("/create")}
        >
          Add Todo
        </button>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={todoList}
          columns={columns}
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              overflow: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}

export default TodosList;
