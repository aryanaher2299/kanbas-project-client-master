import React, { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { FaCheckCircle, FaCaretDown, FaPen, FaTrash } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showQuizContextMenu, setShowQuizContextMenu] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({} as any);
  const [userRole, setUserRole] = useState("");
  const quizzes = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();

  const handleQuizStatus = (quiz: any) => {
    if (currentTime > new Date(quiz.untilDate)) {
      return "Closed";
    }
    if (currentTime < new Date(quiz.availableDate)) {
      const date = new Date(quiz.availableDate).toDateString();
      return `Not available until ${date}`;
    }
    return "Available";
  };

  useEffect(() => {
    if (courseId !== undefined) {
      client.findQuizzesForCourse(courseId).then((quizzes) => {
        dispatch(setQuizzes(quizzes));
      });
    }

    client.profile().then((profile) => {
      setUserRole(profile.role);
    });
  }, [courseId, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (userRole === "STUDENT") {
    return (
      <div>
        <h1>Quizzes</h1>
        <ul className="list-group">
          {quizzes.map((quiz, index) => (
            <li key={index} className="list-group-item">
              <Link to={`/Kanbas/courses/${courseId}/Quizzes/${quiz._id}/preview`}>
                {quiz.name}
              </Link>
              <span>
                {handleQuizStatus(quiz)} |{" "}
                {quiz.dueDate
                  ? "Due " + new Date(quiz.dueDate).toDateString()
                  : "No due date"}{" "}
                |{" "}
                {quiz.published === true
                  ? `${quiz.points ? quiz.points : "N/A"} pts | ${
                      quiz.questions.length
                    } Questions`
                  : "Not published"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className={`popupwindow ${showQuizContextMenu ? "d-flex" : "d-none"}`}>
        <div className="popupbox-container">
          <h5>Quiz Context Menu</h5>
          <p>Quiz Title: {currentQuiz.name}</p>
          <div className="d-flex flex-row justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate(`/Kanbas/courses/${courseId}/Quizzes/${currentQuiz._id}/editor`);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                client.deleteQuiz(currentQuiz._id);
                setShowQuizContextMenu(!showQuizContextMenu);
                navigate(0);
              }}
            >
              Delete
            </button>
            {currentQuiz.published === true ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  client.publishQuiz(currentQuiz._id, false);
                  navigate(0);
                  setShowQuizContextMenu(!showQuizContextMenu);
                }}
              >
                Unpublish
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => {
                  client.publishQuiz(currentQuiz._id, true);
                  navigate(0);
                  setShowQuizContextMenu(!showQuizContextMenu);
                }}
              >
                Publish
              </button>
            )}
            <button className="btn btn-primary">Copy</button>
            <button className="btn btn-warning">Sort</button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowQuizContextMenu(!showQuizContextMenu)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-md-row flex-column justify-content-md-between gap-4 ">
        <div>
          <Link to={`/Kanbas/courses/${courseId}/Quizzes/newQuiz/editor`}>
            <button className="btn btn-success">+ Quiz</button>
          </Link>
        </div>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item" key={0}>
          <div className="d-flex flex-row justify-content-between align-items-center p-2">
            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
              <FaEllipsisV />
              <FaCaretDown />
              <h3 className="fs-5 fw-bold ">Quizzes</h3>
            </div>
            <span className="float-end d-flex justify-content-center align-items-center gap-2">
              <div className="p-2 border border-1 rounded-4 ">
                40% of Total
              </div>
            </span>
          </div>

          <ul className="list-group">
            {quizzes
              .filter((quiz) => quiz.courseId === courseId)
              .map((quiz, index) => (
                <li
                  className="d-flex flex-row flex-grow-1 w-100 justify-content-between align-items-center p-2 px-2 bg-white "
                  key={index}
                >
                  <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                    <FaEllipsisV />

                    <div className="assignment-title-link d-flex flex-column">
                      <Link to={`/Kanbas/courses/${courseId}/Quizzes/${quiz._id}/editor`}>
                        {quiz.name}
                      </Link>
                      <span>
                        {handleQuizStatus(quiz)} |{" "}
                        {quiz.dueDate
                          ? "Due " + new Date(quiz.dueDate).toDateString()
                          : "No due date"}{" "}
                        |{" "}
                        {quiz.published === true
                          ? `${quiz.points ? quiz.points : "N/A"} pts | ${
                              quiz.questions.length
                            } Questions`
                          : "Not published"}
                      </span>
                    </div>
                  </div>
                  <span className="d-flex flex-row gap-3 align-items-center ">
                    {quiz.published === true ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <AiOutlineStop
                        className="text-black"
                        onClick={() => {
                          client.publishQuiz(quiz._id, true);
                          navigate(0);
                        }}
                      />
                    )}
                    <Link
                      to={`/Kanbas/courses/${courseId}/Quizzes/${quiz._id}/editor`}
                      className="text-black"
                    >
                      <FaPen />
                    </Link>
                    <FaTrash
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        client.deleteQuiz(quiz._id);
                        navigate(0);
                      }}
                    />
                    <FaEllipsisV
                      onClick={() => {
                        setShowQuizContextMenu(!showQuizContextMenu);
                        setCurrentQuiz(quiz);
                      }}
                    />
                  </span>
                </li>
              ))}
          </ul>
        </li>
      </ul>
      {quizzes.length === 0 ? (
        <div
          className="
          d-flex
          flex-row
          justify-content-center
          align-items-center
          gap-4
          p-4
          border
          border-1
          rounded-4
          bg-white
          "
        >
          <h2>Please create a quiz</h2>
        </div>
      ) : null}
    </>
  );
}

export default Quizzes;
