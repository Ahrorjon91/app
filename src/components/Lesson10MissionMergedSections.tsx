import React from 'react';
import { Lesson10LectureSection } from './lesson10/Lesson10LectureSection';
import { Lesson10LabWorkSection } from './lesson10/Lesson10LabWorkSection';
import { Lesson10QuizSection } from './lesson10/Lesson10QuizSection';
import { Lesson10HomeworkSection } from './lesson10/Lesson10HomeworkSection';

export const Lesson10TheoryAndCheatSheet: React.FC = () => {
  return <Lesson10LectureSection />;
};

export const Lesson10LabWorkMerged: React.FC = () => {
  return <Lesson10LabWorkSection />;
};

export const Lesson10DetectiveAndQuiz: React.FC = () => {
  return <Lesson10QuizSection />;
};

export const Lesson10JournalAndSideQuests: React.FC = () => {
  return <Lesson10HomeworkSection />;
};
