import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setExercise({
          ...exercise,
          username: response.data[0].username,
          users: response.data.map((user) => user.username),
        });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", {
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      })
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div className="container">
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={(e) =>
              setExercise({ ...exercise, username: e.target.value })
            }
          >
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={(e) =>
              setExercise({ ...exercise, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes): </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.duration}
            onChange={(e) =>
              setExercise({ ...exercise, duration: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={(e) => setExercise({ ...exercise, date: e })}
            ></DatePicker>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
