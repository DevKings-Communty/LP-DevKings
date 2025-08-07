import axios from 'axios';

const API = axios.create({
  baseURL: 'https://devkingsbackend-production-3753.up.railway.app/api/teacher',
  withCredentials: true,           
});

export const fetchCourses = () => API.get('/courses');
export const fetchCourse = (courseId) =>
  API.get(`/course/${courseId}`);

export const updateCourse = (courseId, data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([subKey, subVal]) => {
            formData.append(`${key}[${i}][${subKey}]`, subVal);
          });
        } else {
          formData.append(`${key}[${i}]`, item);
        }
      });
    } else {
      formData.append(key, value);
    }
  });

  return API.put(`/course/${courseId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteCourse = (courseId) =>{
  return API.delete(`/course/${courseId}`);
}
// -------------------- LESSON --------------------

export const fetchLesson = (lessonId) =>
  API.get(`/lesson/${lessonId}`);
export const addLesson = (courseId, formData) => {
  return API.post(`/lesson/${courseId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateLesson = (lessonId, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return API.put(`/lesson/${lessonId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteLesson = (lessonId)=>{
  return API.delete(`/lesson/${lessonId}`)
}

// -------------------- QUIZ --------------------

export const fetchQuiz = (courseId) =>
  API.get(`/quiz/${courseId}`);

export const updateQuizQuestion = (quizId, questions) =>
  API.put(`/quiz/${quizId}`, {questions});

export const addQuizQuestion = (quizId, question) => {
  return API.post(`/course/${quizId}/questions`, { questions: [question] });
};

export const addQuiz = (courseId, question)=>{
  return API.post(`/course/${courseId}/Quiz`,{questions:[question]})
}

// -------------------- FAQ --------------------
export const createFaq = (courseId, data) => {
  return API.post(`/course/${courseId}/faqs`, data);
};

export const updateFaq = (faqId, data) => {
  return API.put(`/faqs/${faqId}`, data);
};

export const deleteFaq = (faqId) => {
  return API.delete(`/faqs/${faqId}`);
};

export const getTeacherProfile = (id) => API.get(`/home`);
export const updateTeacherProfile = (data) =>
  API.put(`/profile`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });