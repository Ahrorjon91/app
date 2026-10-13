import React from 'react';
import { Lesson8LectureSection } from './lesson8/Lesson8LectureSection';
import { Lesson8LabWorkSection } from './lesson8/Lesson8LabWorkSection';
import { Lesson8QuizSection } from './lesson8/Lesson8QuizSection';
import { Lesson8HomeworkSection } from './lesson8/Lesson8HomeworkSection';

export const Lesson8TheoryAndCheatSheet: React.FC = () => {
  return <Lesson8LectureSection />;
};

export const Lesson8LabWorkMerged: React.FC = () => {
  return <Lesson8LabWorkSection />;
};

export const Lesson8DetectiveAndQuiz: React.FC = () => {
  return <Lesson8QuizSection />;
};

export const Lesson8JournalAndSideQuests: React.FC = () => {
  return <Lesson8HomeworkSection />;
};
