import React from 'react';
import { Lesson7LectureSection } from './lesson7/Lesson7LectureSection';
import { Lesson7LabWorkSection } from './lesson7/Lesson7LabWorkSection';
import { Lesson7QuizSection } from './lesson7/Lesson7QuizSection';
import { Lesson7HomeworkSection } from './lesson7/Lesson7HomeworkSection';

export const Lesson7TheoryAndCheatSheet: React.FC = () => {
  return <Lesson7LectureSection />;
};

export const Lesson7LabWorkMerged: React.FC = () => {
  return <Lesson7LabWorkSection />;
};

export const Lesson7DetectiveAndQuiz: React.FC = () => {
  return <Lesson7QuizSection />;
};

export const Lesson7JournalAndSideQuests: React.FC = () => {
  return <Lesson7HomeworkSection />;
};
