import React from 'react';
import { Lesson11LectureSection } from './lesson11/Lesson11LectureSection';
import { Lesson11LabWorkSection } from './lesson11/Lesson11LabWorkSection';
import { Lesson11QuizSection } from './lesson11/Lesson11QuizSection';
import { Lesson11HomeworkSection } from './lesson11/Lesson11HomeworkSection';

export const Lesson11TheoryAndCheatSheet: React.FC = () => {
  return <Lesson11LectureSection />;
};

export const Lesson11LabWorkMerged: React.FC = () => {
  return <Lesson11LabWorkSection />;
};

export const Lesson11DetectiveAndQuiz: React.FC = () => {
  return <Lesson11QuizSection />;
};

export const Lesson11JournalAndSideQuests: React.FC = () => {
  return <Lesson11HomeworkSection />;
};
