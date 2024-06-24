import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaPlus,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import { findModulesForCourse, createModule } from "./client";
import ModuleControls from "./ModuleControls";
import { IoEllipsisVertical } from "react-icons/io5";

function ModulePage() {
  const { courseId } = useParams();
  console.log("Course ID: ", courseId);
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    console.log("Module ID: ", moduleId);
    client.deleteModule(moduleId).then(() => {
      dispatch(deleteModule(moduleId));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    if (status) {
    }
    dispatch(updateModule(module));
  };
  useEffect(() => {
    findModulesForCourse(courseId).then((modules) => {
      console.log("Modules", modules);
      dispatch(setModules(modules));
    });
  }, [courseId, dispatch]);

  return (
    <>
      <div className="flex-grow-1">
        <ModuleControls />
        <hr />
        <div
          className="
                d-flex
                flex-column
                justify-content-between
                align-items-start
                gap-2
                p-2
                w-50
                "
        >
          <h5>Module Editor</h5>
          <input
            className="form-control"
            value={module.name}
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
          />
          <textarea
            className="form-control"
            value={module.description}
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
          <div
            className="w-50 d-flex flex-row
                    justify-content-start gap-2 align-items-center"
          >
            <button className="btn btn-success " onClick={handleAddModule}>
              Add
            </button>
            <button className="btn btn-primary " onClick={handleUpdateModule}>
              Update
            </button>
          </div>
        </div>

        <hr />
        <ul className="list-group wd-modules">
          {moduleList
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li
                className="list-group-item"
                onClick={() => dispatch(setModule(module))}
              >
                <div>
                  <IoEllipsisVertical className="me-2" />
                  {module.name}
                  <span
                    className="float-end
                                    d-flex flex-row gap-2 align-items-center
                                    "
                  >
                    <IoEllipsisVertical className="ms-3" />
                    <div
                      className="
                                        modules-button-group
                                        d-flex
                                        flex-row
                                        justify-content-between
                                        align-items-center
                                        gap-2
                                        fs-6
                                        "
                    >
                      <button
                        className="btn btn-success"
                        onClick={() => dispatch(setModule(module))}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteModule(module._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </span>
                </div>
                <ul className="list-group">
                  {module.lessons?.map((lesson: any) => (
                    <li className="list-group-item">
                      <IoEllipsisVertical className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <IoEllipsisVertical className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default ModulePage;
