import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "../client";

export function TrueFalseComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();

  return (
    <div className="preview-options w-100">
      {props.choices.map((choice: any, index: any) => {
        return (
          <>
            <hr className="m-0" />
            <label htmlFor="">
              <input
                type="radio"
                name="answer"
                id=""
                value={choice}
                onChange={(e) => {}}
                checked={answeredQuestions
                  .find(
                    (answeredQuestion: any) =>
                      answeredQuestion._id === currentQuestion._id
                  )
                  ?.chosenAnswer.includes(choice)}
              />
              <span>{choice}</span>
            </label>
          </>
        );
      })}
    </div>
  );
}

export function FillInTheBlankComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();
  const [possibleAnswers, setPossibleAnswers] = useState<any>([]);

  useEffect(() => {
    let possibleAnswers = currentQuestion.choices.map(
      (choice: any, index: any) => {
        return {
          answerIndex: index,
          answer: "",
        };
      }
    );
    setPossibleAnswers(possibleAnswers);
  }, [currentQuestion]);

  return (
    <>
      <div className="preview-options w-100">
        {props.choices.map((choice: any, index: any) => {
          return (
            <>
              <hr className="m-0" />
              <label
                htmlFor=""
                className="
                                fillintheblank
                                d-flex flex-row justify-content-start align-items-center
                                "
              >
                <span>{index + 1}</span>
                <input
                  type="text"
                  name="answer"
                  id=""
                  value={
                    possibleAnswers.find(
                      (answerObj: any) => answerObj.answerIndex === index
                    )?.answer
                  }
                  onChange={(e) => {}}
                />
              </label>
            </>
          );
        })}
      </div>
    </>
  );
}

export function MultipleChoiceOptionsComponent(props: any) {
  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );
  const currentQuestion = useSelector(
    (state: any) => state.quizzesReducer.question
  );
  const dispatch = useDispatch();

  return (
    <div className="preview-options w-100">
      {props.choices.map((choice: any, index: any) => {
        return (
          <>
            <hr className="m-0" />
            <label htmlFor="">
              <input
                type="radio"
                name="answer"
                id=""
                value={choice}
                onChange={(e) => {}}
                checked={answeredQuestions
                  .find(
                    (answeredQuestion: any) =>
                      answeredQuestion._id === currentQuestion._id
                  )
                  ?.chosenAnswer.includes(choice)}
              />
              <span>{choice}</span>
            </label>
          </>
        );
      })}
    </div>
  );
}

function QuizPreviewResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId, quizId } = useParams();

  const FinalAnswers = useState<any>([]);

  const answeredQuestions = useSelector(
    (state: any) => state.quizzesReducer.answeredQuestions
  );

  const [finalScore, setFinalScore] = useState(0);

  const [chosenResponses, setChosenResponses] = useState<any>({});

  const [questionResponses, setQuestionResponses] = useState<any[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<any[]>([]);

  const handleFinalAnswers = () => {
    setFinalAnswers(
      questionResponses.map((question: any) => {
        return {
          questionId: question._id,
          question: question.question,
          questionType: question.questionType,
          points: question.points,
          answer: question.answer,
          choices: question.choices,
          chosenAnswer: chosenResponses.chosenAnswers.find(
            (answer: any) => answer._id === question._id
          )?.chosenAnswer,
        };
      })
    );
  };

  useEffect(() => {
    const findChosenResponses = async () => {
      const chosenResponses = await client.findAttemptsForQuiz(quizId);
      console.log(chosenResponses);
      setChosenResponses(chosenResponses);
    };
    findChosenResponses();

    const findQuestions = async () => {
      const questions = await client.findQuestionsForQuiz(quizId);
      console.log(questions);
      setQuestionResponses(questions);
    };

    findQuestions();

    handleFinalAnswers();
  }, []);

  return (
    <>
      <div className="quiz-preview-result-container w-100">
        <div className="quiz-preview-result-header w-100">
          <span>Quiz Results</span>
          <span>{finalScore}</span>
        </div>
      </div>
      <div className="preview-question-container w-75">
        {questionResponses.map((question: any, index: any) => {
          return (
            <div className="preview-question w-100">
              <div className="preview-question-header w-100 d-flex flex-row justify-content-between align-items-center">
                <span>{index + 1}</span>
                <span>
                  correct answer
                  {
                    finalAnswers.find(
                      (answer: any) => answer.questionId === question._id
                    )?.answer
                  }
                </span>
              </div>
              <div className="">
                Chosen Answer:
                {question.questionType !== "Fill in the blank"
                  ? finalAnswers.find(
                      (answer: any) => answer.questionId === question._id
                    )?.chosenAnswer[0]
                  : "hello"}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizPreviewResult;
