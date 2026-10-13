import React from 'react';
import { Lesson9LectureSection } from './lesson9/Lesson9LectureSection';
import { Lesson9LabWorkSection } from './lesson9/Lesson9LabWorkSection';
import { Lesson9QuizSection } from './lesson9/Lesson9QuizSection';
import { Lesson9HomeworkSection } from './lesson9/Lesson9HomeworkSection';

export const Lesson9TheoryAndCheatSheet: React.FC = () => {
  return <Lesson9LectureSection />;
};

export const Lesson9LabWorkMerged: React.FC = () => {
  return <Lesson9LabWorkSection />;
};

export const Lesson9DetectiveAndQuiz: React.FC = () => {
  return <Lesson9QuizSection />;
};

export const Lesson9JournalAndSideQuests: React.FC = () => {
  return <Lesson9HomeworkSection />;
};
