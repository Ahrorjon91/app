import React from 'react';
import { Lesson5LectureSection } from './lesson5/Lesson5LectureSection';
import { Lesson5LabWorkSection } from './lesson5/Lesson5LabWorkSection';
import { Lesson5QuizSection } from './lesson5/Lesson5QuizSection';
import { Lesson5HomeworkSection } from './lesson5/Lesson5HomeworkSection';

export const Lesson5TheoryAndCheatSheet: React.FC = () => {
  return <Lesson5LectureSection />;
};

export const Lesson5LabWorkMerged: React.FC = () => {
  return <Lesson5LabWorkSection />;
};

export const Lesson5DetectiveAndQuiz: React.FC = () => {
  return <Lesson5QuizSection />;
};

export const Lesson5JournalAndSideQuests: React.FC = () => {
  return <Lesson5HomeworkSection />;
};
