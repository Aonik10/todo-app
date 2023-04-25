import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openForm } from "../features/formSlice";
import { setFilter } from "../features/displaySlice";

function TaskFilterItem(props) {
    let location = useLocation().pathname.substring(1);
    return (
        <Link
            to={"/" + props.id}
            className={props.id === location ? "active-link" : ""}
            onClick={props.function}
        >
            <div>{props.title + " tasks"}</div>
        </Link>
    );
}

function TaskFilter() {
    const dispatch = useDispatch();
    const displayFilter = useSelector((state) => state.display.filter);

    const handleFilter = () => dispatch(setFilter(!displayFilter));

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
            <TaskFilterItem
                id="today"
                title="Today's"
                function={handleFilter}
            />
            <TaskFilterItem id="" title="All" function={handleFilter} />
            <TaskFilterItem
                id="important"
                title="Important"
                function={handleFilter}
            />
            <TaskFilterItem
                id="completed"
                title="Completed"
                function={handleFilter}
            />
            <TaskFilterItem
                id="uncompleted"
                title="Uncompleted"
                function={handleFilter}
            />
        </div>
    );
}

export default TaskFilter;
