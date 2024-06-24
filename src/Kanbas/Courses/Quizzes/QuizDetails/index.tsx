import React, { useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaPencilAlt } from "react-icons/fa";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import * as client from "../client";
import { AiOutlineStop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function QuizDetails() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = React.useState({} as any);
  const navigate = useNavigate();
  const [previewDisabled, setPreviewDisabled] = React.useState(false);
  const [previewResults, setPreviewResults] = React.useState({} as any);

  const handleGetQuizResults = () => {
    client.findAttemptsForQuiz(quizId).then((data) => {
      console.log(data);
      setPreviewResults(data);
    });
  };

  useEffect(() => {
    client.findQuizById(quizId).then((quiz) => {
      setQuiz(quiz);
    });
    client.findAttemptsForQuiz(quizId).then((data) => {
      if (data === "No preview") {
        setPreviewDisabled(false);
      } else {
        setPreviewDisabled(true);
        handleGetQuizResults();
      }
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <hr />
      <div className="quiz-details-main-container px-5 ">
        <h1>{quiz.name}</h1>
        <div className="d-flex flex-column gap-4 w-100 mt-4">
          <div className="quiz-details d-flex w-50 flex-column gap-2">
            <div className="quiz-fields">
              <div className="quiz-labels">Quiz Type</div>
              <div className="quize-value-field">{quiz.quizType}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Points</div>
              <div className="quize-value-field">{quiz.points}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Assignment Group</div>
              <div className="quize-value-field">{quiz.assignmentGroup}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Shuffle Answers</div>
              <div className="quize-value-field">{quiz.shuffleAnswers}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Time Limit</div>
              <div className="quize-value-field">{quiz.timeLimit} minutes</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Multiple Attempts</div>
              <div className="quize-value-field">{quiz.multipleAttempts}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">View Response</div>
              <div className="quize-value-field">Always</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Show Correct Answers</div>
              <div className="quize-value-field">{quiz.showCorrectAnswers}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Access Code</div>
              <div className="quize-value-field">{quiz.accessCode}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">One Question at a Time</div>
              <div className="quize-value-field">{quiz.oneQuestionAtATime}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">
                Require Respondus LockDown Browser
              </div>
              <div className="quize-value-field">
                {quiz.lockQuestionsAfterAnswering}
              </div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Required to View Quiz Results</div>
              <div className="quize-value-field">No</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Webcam Required</div>
              <div className="quize-value-field">{quiz.webcamRequired}</div>
            </div>
            <div className="quiz-fields">
              <div className="quiz-labels">Lock Questions After Answering</div>
              <div className="quize-value-field">
                {quiz.lockQuestionsAfterAnswering}
              </div>
            </div>
          </div>
          <div className="wd-quiz-details-table mt-4 ">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody className="border-top border-bottom ">
                <tr>
                  <td>{new Date(quiz.dueDate).toDateString()}</td>
                  <td>Everyone</td>
                  <td>{new Date(quiz.availableDate).toDateString()}</td>
                  <td>{new Date(quiz.untilDate).toDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {previewDisabled ? (
        <div className="quiz-score-container">
          <h3>
            score:
            {previewResults.score}
          </h3>
        </div>
      ) : null}
    </>
  );
}

export default QuizDetails;
