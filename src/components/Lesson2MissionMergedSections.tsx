import React from 'react';
import { Lesson2LectureSection } from './lesson2/Lesson2LectureSection';
import { Lesson2LabWorkSection } from './lesson2/Lesson2LabWorkSection';
import { Lesson2QuizSection } from './lesson2/Lesson2QuizSection';
import { Lesson2HomeworkSection } from './lesson2/Lesson2HomeworkSection';

// Export canonical Lesson 2 section components
export const Lesson2TheoryAndCheatSheet: React.FC = () => <Lesson2LectureSection />;
export const Lesson2LabWorkMerged: React.FC = () => <Lesson2LabWorkSection />;
export const Lesson2DetectiveAndQuiz: React.FC = () => <Lesson2QuizSection />;
export const Lesson2JournalAndSideQuests: React.FC = () => <Lesson2HomeworkSection />;
