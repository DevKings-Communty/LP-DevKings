import React, { useState, useEffect, useContext } from 'react';
import { fetchCourse, updateCourse, updateLesson, updateQuizQuestion, fetchQuiz, addQuizQuestion, deleteLesson, addQuiz } from './api';
import EditCourseCard from '../../components/Teacher-Courses/EditCours-card/editCourse-card';
import LessonsContainer from '../../components/Teacher-Courses/LessonContainer';
import logo from "../../public/logo.png";
import QuizContainer from '../../components/Teacher-Courses/QuizContainer';
import { AuthContext } from '../../context/AuthProvider';
import LessonModal from '../../components/Teacher-Courses/LessonModal/LessonModal';
import QuizModal from '../../components/Teacher-Courses/Course-info-Modal/QuizModal/QuizModal';
import CourseInfoModal from '../../components/Teacher-Courses/Course-info-Modal/Course-info-Modal';
import TeacherSideBar from '../../components/TeacherSideBar/TeacherSideBar';
import FaqContainer from '../../components/Teacher-Courses/FAQS/FaqContainer';
import FaqModal from '../../components/Teacher-Courses/FAQS/FaqModal';
import './course.css';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';

export default function EditCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quiz, setQuiz] = useState({ questions: [] });
  const [faqs, setFaqs] = useState([]);
  const [modal, setModal] = useState(null);
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState(null);

  const showMessage = (message, type = 'info') => {
    setMsg({ message, type });
  };

  const loadData = () => {
    fetchCourse(courseId)
      .then(res => {
        setCourse(res.data);
        setLessons(res.data.course.lessons);
        setFaqs(res.data.course.faqs || []);
      })
      .catch(() => {
        showMessage("Failed to load course data.", "danger");
      });

    fetchQuiz(courseId)
      .then(res => {
        const data = res.data;
        setQuiz(data && data.length > 0 ? data[0] : { questions: [] });
      })
      .catch(() => {
        showMessage("Failed to load quiz.", "danger");
        setQuiz({ questions: [] });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCourseUpdate = (data, thumbnailFile) => {
    const payload = { ...data };
    if (thumbnailFile) payload.thumbnail = thumbnailFile;

    updateCourse(courseId, payload)
      .then(() => {
        showMessage("Course updated successfully.", "success");
        loadData();
        setModal(null);
      })
      .catch(() => {
        showMessage("Failed to update course.", "danger");
      });
  };

  const handleLessonUpdate = (lessonId, data) => {
    updateLesson(lessonId, data)
      .then(res => {
        setLessons(ls => ls.map(l => (l._id === lessonId ? res.data : l)));
        showMessage("Lesson updated successfully.", "success");
        setModal(null);
      })
      .catch(() => {
        showMessage("Failed to update lesson.", "danger");
      });
  };

  const handleQuizUpdate = (index, data, quizId) => {
    const updated = [...quiz.questions];
    updated[index] = data;

    updateQuizQuestion(quizId, updated)
      .then(() => {
        setQuiz(q => ({ ...q, questions: updated }));
        showMessage("Quiz question updated.", "success");
        setModal(null);
      })
      .catch(err => {
        showMessage(err?.response?.data?.message || "Failed to update quiz question.", "danger");
      });
  };

  const handleAddQuestion = (index, data, quizId) => {
    if (quiz.questions.length > 0) {
      addQuizQuestion(quizId, data)
        .then(res => {
          setQuiz(res.data);
          loadData();
          showMessage("Question added to quiz.", "success");
          setModal(null);
        })
        .catch(err => {
          showMessage(err?.response?.data?.message || "Failed to add quiz question.", "danger");
        });
    } else {
      addQuiz(courseId, data)
        .then(res => {
          setQuiz(res.data);
          loadData();
          showMessage("Quiz created and question added.", "success");
          setModal(null);
        })
        .catch(err => {
          showMessage(err?.response?.data?.message || "Failed to add quiz.", "danger");
        });
    }
  };

  const deleteQuestion = index => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);

    updateQuizQuestion(quiz._id, updatedQuestions)
      .then(() => {
        setQuiz(q => ({ ...q, questions: updatedQuestions }));
        showMessage("Question deleted from quiz.", "success");
        setModal(null);
      })
      .catch(err => {
        showMessage(err?.response?.data?.message || "Failed to delete quiz question.", "danger");
      });
  };

  const handledeleteLesson = lessonId => {
    deleteLesson(lessonId)
      .then(() => {
        setLessons(ls => ls.filter(l => l._id !== lessonId));
        showMessage("Lesson deleted successfully.", "success");
      })
      .catch(() => {
        showMessage("Failed to delete lesson.", "danger");
      });
  };

  const handleAddFaq = faq => {
    setFaqs(prev => [...prev, faq]);
    showMessage("FAQ added.", "success");
  };

  const handleUpdateFaq = updatedFaq => {
    setFaqs(prev => prev.map(f => (f._id === updatedFaq._id ? updatedFaq : f)));
    showMessage("FAQ updated.", "success");
  };

  const handleDeleteFaq = id => {
    setFaqs(prev => prev.filter(f => f._id !== id));
    showMessage("FAQ deleted.", "success");
  };

  const renderModal = () => {
    switch (modal?.type) {
      case 'course':
        return <CourseInfoModal course={course.course} onClose={() => setModal(null)} onSave={handleCourseUpdate} />;
      case 'lesson':
        return (
          <LessonModal
            lessonId={modal.id}
            onClose={() => setModal(null)}
            onSave={data => handleLessonUpdate(modal.id, data)}
          />
        );
      case 'quiz':
        return (
          <QuizModal
            courseId={courseId}
            questionIndex={modal.index ?? null}
            onClose={() => setModal(null)}
            onSave={modal.index !== null ? handleQuizUpdate : handleAddQuestion}
          />
        );
      case 'faq':
        return (
          <FaqModal
            courseId={courseId}
            faq={modal.faq || null}
            onClose={() => setModal(null)}
            onSave={(data) => {
              modal.faq ? handleUpdateFaq(data) : handleAddFaq(data);
              setModal(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  if (!course) return <div className="loading">Loading course...</div>;

  return (
    <div className="course-container">
      {msg && (
        <Message
          message={msg.message}
          type={msg.type}
          onClose={() => setMsg(null)}
        />
      )}
      <TeacherSideBar logo={logo} />
      <header className="main-header">
        <h2>View And Edit Your Course:</h2>
        <div className="header-actions">
          <span className="header-icon">⚙️</span>
          <div className="user-profile">
            {`${user.firstName} ${user.lastName}`}
            <img src={user?.profilePic} style={{ width: '70px', height: '70px', borderRadius: '50%' }} alt="" />
          </div>
        </div>
      </header>

      <EditCourseCard course={course} onEdit={() => setModal({ type: 'course' })} />
      <LessonsContainer
        lessons={lessons}
        courseId={courseId}
        onAdd={(newLesson) => setLessons(prev => [...prev, newLesson])}
        onDelete={lessonId => handledeleteLesson(lessonId)}
        onEdit={lessonId => setModal({ type: 'lesson', id: lessonId })}
      />
      <QuizContainer
        quiz={quiz.questions}
        onEdit={idx => setModal({ type: 'quiz', index: idx })}
        onDelete={deleteQuestion}
      />
      <FaqContainer
        faqs={faqs}
        onEdit={(faq) => setModal({ type: 'faq', faq })}
        onDelete={handleDeleteFaq}
      />
      {renderModal()}
    </div>
  );
}
