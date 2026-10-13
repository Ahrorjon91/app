import React from 'react';
import { Lesson6LectureSection } from './lesson6/Lesson6LectureSection';
import { Lesson6LabWorkSection } from './lesson6/Lesson6LabWorkSection';
import { Lesson6QuizSection } from './lesson6/Lesson6QuizSection';
import { Lesson6HomeworkSection } from './lesson6/Lesson6HomeworkSection';

export const Lesson6TheoryAndCheatSheet: React.FC = () => {
  return <Lesson6LectureSection />;
};

export const Lesson6LabWorkMerged: React.FC = () => {
  return <Lesson6LabWorkSection />;
};

export const Lesson6DetectiveAndQuiz: React.FC = () => {
  return <Lesson6QuizSection />;
};

export const Lesson6JournalAndSideQuests: React.FC = () => {
  return <Lesson6HomeworkSection />;
};
