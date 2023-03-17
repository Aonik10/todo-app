import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask, editTask } from "../features/taskSlice";
import { closeForm } from "../features/formSlice";
import { v4 as uuid } from "uuid";

function ModalForm(props) {
    // cambiar nombre
    let editID = props.id;
    const tasks = useSelector((state) => state.tasks);
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
        completed: false,
        important: false,
        visible: true,
    }); //task es el estado

    useEffect(() => {
        if (editID) {
            setTask(tasks.find((task) => task.id === editID));
        }
    }, [editID, tasks]);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editID) {
            dispatch(editTask({ ...task }));
        } else {
            dispatch(createTask({ id: uuid(), ...task }));
        } // action es esto: {type: 'tasks/createTask', payload: {task}}
        dispatch(closeForm());
    };

    const closeOnClickOutside = (e) => {
        if (e.target.id === "modal") dispatch(closeForm());
    };

    return (
        <div className="modal" id="modal" onClick={closeOnClickOutside}>
            <section className="modal-section">
                <div className="modal-topper">
                    <h1>{(editID ? "Edit" : "Add") + " a task"}</h1>
                    <button onClick={() => dispatch(closeForm())}>X</button>
                </div>
                <form className="tasks-form" onSubmit={handleSubmit}>
                    <label className="flex-column-label">
                        Title
                        <input
                            className="form-text-input"
                            name="title"
                            placeholder="e.g, study react-redux"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="flex-column-label">
                        Date
                        <input
                            className="form-text-input"
                            type="date"
                            name="date"
                            value={task.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="flex-column-label">
                        Description
                        <textarea
                            className="form-text-input"
                            name="description"
                            placeholder="e.g, I have to study React-Redux to build an awesome TO-DO List"
                            value={task.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </label>
                    <label className="flex-column-label">
                        Select a Directory
                        <select className="form-text-input">
                            <option value="Main">Main</option>
                        </select>
                    </label>
                    <label className="flex-column-label">
                        <div className="checkbox-div">
                            <input
                                className="form-checkbox"
                                type="checkbox"
                                name="important"
                                onChange={handleChange}
                                checked={task.important}
                            />
                            <span>Mark as important</span>
                        </div>
                        <div className="checkbox-div">
                            <input
                                className="form-checkbox"
                                type="checkbox"
                                name="completed"
                                onClick={handleChange}
                                checked={task.completed}
                            />
                            <span>Mark as completed</span>
                        </div>
                    </label>
                    <button className="add-new-task-btn form-btn">
                        {(editID ? "Save" : "Add a") + " task"}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default ModalForm;
