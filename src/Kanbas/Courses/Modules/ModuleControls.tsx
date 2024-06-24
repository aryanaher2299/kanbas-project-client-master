import { FaEllipsisV, FaPlus } from "react-icons/fa";

export default function ModuleControls(){
    return(
        <div
          id="main-button-group"
          className="d-flex flex-row justify-content-end gap-2"
        >
          <button className="p-2">Collapse All</button>
          <button className="p-2">View Progress</button>
          <select name="Publish" id="Publish" className="p-2">
            <option value="Publish All" selected>
              Publish All
            </option>
            <option value="Publish">Publish</option>
            <option value="Unpublish">Unpublish</option>
          </select>
          <button className="bg-danger text-white p-2 ">
            <FaPlus />
            Module
          </button>
          <button className="p-2">
            <FaEllipsisV />
          </button>
        </div>

    );
}