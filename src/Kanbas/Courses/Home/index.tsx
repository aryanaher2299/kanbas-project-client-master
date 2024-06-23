import ModuleList from "../Modules/Page";
import ModuleControlButtons from "./Components/ModuleControlButtons";
import "./index.css";

function Home() {
    return (
        <div className="
        d-flex flex-row flex-grow-1 gap-4
        ">
            <ModuleList />
            <ModuleControlButtons />
        </div>
    );
}

export default Home;