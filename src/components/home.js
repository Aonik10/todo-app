import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteTask,
    editTaskFavourite,
    editTaskStatus,
    sortState,
} from "../features/taskSlice";
import { openForm } from "../features/formSlice";
import { setFilter, setResume } from "../features/displaySlice";

// import images
import list from "../images/list.svg";
import grid from "../images/layout-grid.svg";
import star from "../images/star.svg";
import starFilled from "../images/star-filled.svg";
import trash from "../images/trash.svg";
import dots from "../images/dots-vertical.svg";
import bell from "../images/bell.svg";
import cross from "../images/cross.svg";
import check from "../images/check.svg";

function Home() {
    // ROUTER LOCATION HOOKS
    let currentLocation = useLocation().pathname.substring(1);
    let location =
        currentLocation.substring(1, 0).toUpperCase() +
        currentLocation.substring(1); // Capitalized

    // REDUX SELECTOR HOOKS
    const state = useSelector((state) => state);
    const tasks = state.tasks;
    const displayFilter = state.display.filter;
    const displayResume = state.display.resume;
    const [gridView, setGridView] = useState(true);

    // REDUX DISPATCH HOOKS
    const dispatch = useDispatch();

    // REACT HOOKS
    let [search, setSearch] = useState("");

    // LOCAL FUNCTIONS
    const dateToString = (date) => {
        let formattedDate = date
            .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            })
            .split("/")
            .reverse()
            .join("-");
        return formattedDate;
    };

    const locationCondition = (task, location) => {
        switch (location) {
            case "Today":
                return task.date === date;
            case "Important":
                return task.important;
            case "Completed":
                return task.completed;
            case "Uncompleted":
                return !task.completed;
            default:
                return true;
        }
    };

    const searchCondition = (task) => {
        return (
            task.description.toLowerCase().includes(search) ||
            task.title.toLowerCase().includes(search) ||
            task.date.toLowerCase().includes(search)
        );
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleStatus = (action) => {
        dispatch(editTaskStatus(action));
    };

    const handleFavourite = (action) => {
        dispatch(editTaskFavourite(action));
    };

    const handleSelect = (e) => {
        dispatch(sortState(e.target.value));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    // LOCAL VARIABLES
    const newDate = new Date();
    const date = dateToString(newDate);

    return (
        <div className="tasks-main-menu">
            <header className="task-topper">
                <div
                    className="hamburger-btn-task-filter"
                    onClick={() => dispatch(setFilter(!displayFilter))}
                >
                    <div
                        className={
                            "lines-hamburger-btn" +
                            (displayFilter ? " hamburger-active" : "")
                        }
                    >
                        <div className="middle-line"></div>
                    </div>
                </div>
                <div className="topper-search-bar">
                    <input
                        className="topper-input"
                        type="search"
                        placeholder="Search task"
                        onChange={handleSearch}
                    />
                </div>
                <button className="bell-btn icon-btn">
                    <img src={bell} alt="bell btn" />
                </button>
                <div className="topper-date">{date}</div>
                <div
                    className="profile hide-profile"
                    onClick={() => dispatch(setResume(!displayResume))}
                >
                    <img src={require("../images/jinx.jpg")} alt="" />
                </div>
            </header>
            <section className="tasks-section">
                <h1 className="tasks-section-title">
                    {console.log(location)}
                    {(location === "Todo-app" ? "All" : location) +
                        " tasks " +
                        tasks.length}
                </h1>
                <div className="format-tasks">
                    <button
                        className={
                            "icon-btn" + (gridView ? "" : " active-btn-color")
                        }
                    >
                        <img
                            src={list}
                            alt="list btn"
                            onClick={() => setGridView(false)}
                        />
                    </button>
                    <button
                        className={
                            "icon-btn" + (gridView ? " active-btn-color" : "")
                        }
                    >
                        <img
                            src={grid}
                            alt="grid btn"
                            onClick={() => setGridView(true)}
                        />
                    </button>
                    <select
                        name="sort-by"
                        className="sort-by topper-input"
                        onClick={handleSelect}
                    >
                        <option value disabled selected="selected">
                            Sort By
                        </option>
                        <option value="earlier-first">Earlier first</option>
                        <option value="later-first">Later first</option>
                        <option value="completed-first">Completed first</option>
                        <option value="uncompleted-first">
                            Uncompleted first
                        </option>
                    </select>
                </div>
                <div className={"all-task-cards" + (gridView ? "-grid" : "")}>
                    {tasks.map((task) =>
                        searchCondition(task) ? (
                            locationCondition(task, location) ? (
                                <div
                                    key={task.id}
                                    className={
                                        "task-card" +
                                        (gridView ? " grid-view" : " list-view")
                                    }
                                >
                                    <div className="task-description-date">
                                        <h1 className="task-card-title">
                                            {task.title}
                                        </h1>
                                        <div
                                            className={
                                                "task-card-description" +
                                                (gridView ? "-grid" : "-list")
                                            }
                                        >
                                            {task.description}
                                        </div>
                                        <div className="task-card-date">
                                            {task.date}
                                        </div>
                                    </div>
                                    <div className="task-mark-delete-edit">
                                        <button
                                            className={
                                                "btn-status" +
                                                (task.completed
                                                    ? " completed"
                                                    : " uncompleted")
                                            }
                                            onClick={() =>
                                                handleStatus({
                                                    id: task.id,
                                                    status: !task.completed,
                                                })
                                            }
                                        >
                                            <div>
                                                {task.completed
                                                    ? "completed"
                                                    : "uncompleted"}
                                            </div>
                                            <img
                                                src={
                                                    task.completed
                                                        ? check
                                                        : cross
                                                }
                                                alt="check-cross-imgs"
                                            />
                                        </button>
                                        <div className="card-icon-btns">
                                            <button
                                                className={
                                                    "btn-mark-as-important icon-btn" +
                                                    (task.important
                                                        ? " important-active"
                                                        : "")
                                                }
                                                onClick={() =>
                                                    handleFavourite({
                                                        id: task.id,
                                                        status: !task.important,
                                                    })
                                                }
                                            >
                                                <img
                                                    src={
                                                        task.important
                                                            ? starFilled
                                                            : star
                                                    }
                                                    alt="important btn"
                                                />
                                            </button>
                                            <button
                                                className="btn-mark-as-completed icon-btn"
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                <img
                                                    src={trash}
                                                    alt="trash btn"
                                                />
                                            </button>
                                            <button
                                                className="btn-delete-task icon-btn"
                                                onClick={() =>
                                                    dispatch(openForm(task.id))
                                                }
                                            >
                                                <img
                                                    src={dots}
                                                    alt="dots btn"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )
                    )}
                    <div
                        className={
                            "add-new-task task-card" +
                            (gridView ? " grid-add" : " list-add")
                        }
                        onClick={() => dispatch(openForm())}
                    >
                        <div className="add-new-task-text">Add new task</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
