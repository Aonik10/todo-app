import "./App.css";
import TaskFilter from "./components/taskFilter";
import TaskResume from "./components/taskResume";
import ModalForm from "./components/ModalForm";
import Home from "./components/home";
import { useSelector } from "react-redux";
import {
    createHashRouter,
    RouterProvider,
    useLocation,
} from "react-router-dom";

const router = createHashRouter(
    [
        { path: "/", element: main(<Home />) },
        { path: "/today", element: main(<Home />) },
        { path: "/important", element: main(<Home />) },
        { path: "/completed", element: main(<Home />) },
        { path: "/uncompleted", element: main(<Home />) },
    ],
    { path: "/*" }
);

function main(component) {
    return <AppContent>{component}</AppContent>;
}

function AppContent(props) {
    let location = useLocation().pathname.replace("/", " ");
    const { viewForm, editID } = useSelector((state) => state.form);
    const darkMode = useSelector((state) => state.display.darkmode);

    return (
        <div className={"theme" + (darkMode ? " dark" : "")}>
            {viewForm ? <ModalForm id={editID} /> : ""}
            <div className={"App" + (location !== " " ? location : "")}>
                <TaskFilter />
                {props.children}
                <TaskResume />
            </div>
        </div>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
