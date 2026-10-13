import React from 'react';
import { Lesson3LectureSection } from './lesson3/Lesson3LectureSection';
import { Lesson3LabWorkSection } from './lesson3/Lesson3LabWorkSection';
import { Lesson3QuizSection } from './lesson3/Lesson3QuizSection';
import { Lesson3HomeworkSection } from './lesson3/Lesson3HomeworkSection';

// Export canonical Lesson 3 section components
export const Lesson3TheoryAndCheatSheet: React.FC = () => <Lesson3LectureSection />;
export const Lesson3LabWorkMerged: React.FC = () => <Lesson3LabWorkSection />;
export const Lesson3DetectiveAndQuiz: React.FC = () => <Lesson3QuizSection />;
export const Lesson3JournalAndSideQuests: React.FC = () => <Lesson3HomeworkSection />;
