import React from 'react';
import { Lesson12LectureSection } from './lesson12/Lesson12LectureSection';
import { Lesson12LabWorkSection } from './lesson12/Lesson12LabWorkSection';
import { Lesson12QuizSection } from './lesson12/Lesson12QuizSection';
import { Lesson12HomeworkSection } from './lesson12/Lesson12HomeworkSection';

export const Lesson12TheoryAndCheatSheet: React.FC = () => {
  return <Lesson12LectureSection />;
};

export const Lesson12LabWorkMerged: React.FC = () => {
  return <Lesson12LabWorkSection />;
};

export const Lesson12DetectiveAndQuiz: React.FC = () => {
  return <Lesson12QuizSection />;
};

export const Lesson12JournalAndSideQuests: React.FC = () => {
  return <Lesson12HomeworkSection />;
};
