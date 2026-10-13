import React from 'react';
import { Lesson1LectureSection } from './lesson1/Lesson1LectureSection';
import { Lesson1LabWorkSection } from './lesson1/Lesson1LabWorkSection';
import { Lesson1QuizSection } from './lesson1/Lesson1QuizSection';
import { Lesson1HomeworkSection } from './lesson1/Lesson1HomeworkSection';

// Export canonical Lesson 1 section components
export const Lesson1TheoryAndCheatSheet: React.FC = () => <Lesson1LectureSection />;
export const Lesson1LabWorkMerged: React.FC = () => <Lesson1LabWorkSection />;
export const Lesson1ArenaAndExperiments: React.FC = () => <Lesson1LabWorkSection />;
export const Lesson1LabAndCreatorId: React.FC = () => <Lesson1LabWorkSection />;
export const Lesson1DetectiveAndQuiz: React.FC = () => <Lesson1QuizSection />;
export const Lesson1JournalAndSideQuests: React.FC = () => <Lesson1HomeworkSection />;
