import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, setResume } from "../features/displaySlice";

// import images
import arrow from "../images/arrow-bar-to-right.svg";

const TaskResume = () => {
    // REDUX HOOKS
    const state = useSelector((state) => state);
    const tasks = state.tasks;
    const darkMode = state.display.darkmode;
    const displayResume = state.display.resume;
    const dispatch = useDispatch();

    function getTotalTasks() {
        // ver si se puede mejorar
        let i = 0;
        for (let task of tasks) if (task.completed) i++;
        return [`${i}/${tasks.length}`, i / tasks.length];
    }

    const pendingTask = getTotalTasks()[0]; // esta logica no me gusta mucho REVISAR
    const pendingTaskPerc = getTotalTasks()[1]; // esta logica no me gusta mucho REVISAR

    return (
        <div className={"task-resume" + (displayResume ? " resume-on" : "")}>
            <div className="profile">
                <h1>Hi, User!</h1>
                <img src={require("../images/jinx.jpg")} alt="" />
                <button
                    className={
                        "icon-btn arrow-btn" +
                        (displayResume ? " resume-on" : "")
                    }
                >
                    <img
                        src={arrow}
                        alt="arrow-back btn"
                        onClick={() => dispatch(setResume(!displayResume))}
                    />
                </button>
            </div>
            <div className="darkmode-section">
                <h2>Darkmode</h2>
                <div className="darkmode-btn">
                    <div
                        className={
                            "darkmode-btn-switch" +
                            (darkMode ? " active-darkmode" : "")
                        }
                    >
                        <button
                            onClick={() => dispatch(setDarkMode(!darkMode))}
                        ></button>
                    </div>
                </div>
            </div>
            <div className="pending-tasks">
                <div className="pending-tasks-title">
                    <div>All tasks</div>
                    <div>{pendingTask}</div>
                </div>
                <div className="pending-tasks-bar">
                    <div className="pending-task-bar-empty">
                        <div
                            style={{ width: `${pendingTaskPerc * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskResume;
