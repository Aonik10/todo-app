import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openForm } from "../features/formSlice";

function TaskFilterItem(props) {
    let location = useLocation().pathname.substring(1);
    return (
        <Link
            to={"/" + props.id}
            className={props.id === location ? "active-link" : ""}
        >
            <div>{props.title + " tasks"}</div>
        </Link>
    );
}

function TaskFilter() {
    const dispatch = useDispatch();
    const displayFilter = useSelector((state) => state.display.filter);

    return (
        <div
            className={
                "task-filter" + (displayFilter ? " slide-in" : " slide-out")
            }
        >
            <header>TO-DO LIST</header>
            <button
                onClick={() => dispatch(openForm())}
                className="add-new-task-btn filter-btn"
            >
                Add new task
            </button>
            <TaskFilterItem id="today" title="Today's" />
            <TaskFilterItem id="" title="All" />
            <TaskFilterItem id="important" title="Important" />
            <TaskFilterItem id="completed" title="Completed" />
            <TaskFilterItem id="uncompleted" title="Uncompleted" />
        </div>
    );
}

export default TaskFilter;
