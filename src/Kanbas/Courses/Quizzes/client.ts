import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const api = axios.create({
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`, quiz
  );
  return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const findQuizById = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
}

export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
}

export const findQuestionById = async (quizId:any, questionId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
}

export const createQuestion = async (quizId: any, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
}

export const updateQuestion = async (quizId: any, question: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
}

export const deleteQuestion = async (questionId: any, quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
}

export const publishQuiz = async (quizId: any, published: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/publish`, { published });
  return response.data;
}

export const submitQuiz = async (quizId: any, answers: any) => {

  const attempt = answers.map((answer: any) => {
    return {
      _id: answer._id,
      chosenAnswer: answer.chosenAnswer
    }
  });
  
  const response = await axios.post(`${QUIZZES_API}/${quizId}/submit`, attempt);
  return response.data;

}

export const findAttemptsForQuiz = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/preview`);
  return response.data;
}
export const profile = async () => {
  const response = await api.post(`${USERS_API}/profile`);
  console.log(response.data);
  return response.data;
};