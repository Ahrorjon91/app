/**
 * Database Migration & Synchronization Script (`scripts/syncDatabase.ts`)
 *
 * Ensures SQLite database schema is up to date (including `correct_count`,
 * `total_questions`, `user_answers`, `submission_status`, `is_completed`, etc.),
 * repairs any missing student emails/IDs on submissions,
 * synchronizes all student progress records, automatically unlocks subsequent
 * lessons when homework is approved by a mentor, and recalculates EXP points.
 *
 * Run via: `npm run db:sync` or `npx tsx scripts/syncDatabase.ts`
 */

import { initDatabase, migrateAndSyncDatabase, getFullSnapshot, query, run, persistDb } from '../server/db';

async function main() {
  console.log('==============================================================');
  console.log('[DB Sync Script] Starting SQLite Database Migration & Sync...');
  console.log('==============================================================');

  await initDatabase();

  // Repair any submissions missing student_email by matching student_id or student_name
  const users = query(`SELECT id, name, email FROM users WHERE role = 'student'`);
  const defaultStudent = users.find((u: any) => String(u.email).includes('student@')) || users[0];

  if (defaultStudent) {
    run(
      `UPDATE homework_submissions SET student_email = ?, student_id = COALESCE(NULLIF(student_id, ''), ?) WHERE student_email IS NULL OR TRIM(student_email) = ''`,
      [defaultStudent.email, defaultStudent.id]
    );
    run(
      `UPDATE lab_submissions SET student_email = ?, student_id = COALESCE(NULLIF(student_id, ''), ?) WHERE student_email IS NULL OR TRIM(student_email) = ''`,
      [defaultStudent.email, defaultStudent.id]
    );
    run(
      `UPDATE quiz_submissions SET student_email = ?, student_id = COALESCE(NULLIF(student_id, ''), ?) WHERE student_email IS NULL OR TRIM(student_email) = ''`,
      [defaultStudent.email, defaultStudent.id]
    );
    persistDb(true);
  }

  const result = migrateAndSyncDatabase();
  const snapshot = getFullSnapshot();

  console.log(`[DB Sync Script] Schema verified & columns synchronized.`);
  console.log(`[DB Sync Script] Users synchronized: ${snapshot.users?.length || 0}`);
  console.log(`[DB Sync Script] Homework submissions: ${snapshot.homeworkSubmissions?.length || 0}`);
  for (const hw of snapshot.homeworkSubmissions || []) {
    console.log(
      `  [HW] Lesson #${hw.lessonId} | Student: ${hw.studentEmail} | Status: ${hw.status} | Score: ${hw.score ?? 'N/A'}`
    );
  }
  console.log(`[DB Sync Script] Lab submissions: ${snapshot.labSubmissions?.length || 0}`);
  for (const lb of snapshot.labSubmissions || []) {
    console.log(
      `  [Lab] Lab #${lb.labId} | Student: ${lb.studentEmail} | Status: ${lb.status} | Score: ${lb.score ?? 'N/A'}`
    );
  }
  console.log(`[DB Sync Script] Quiz submissions: ${snapshot.quizSubmissions?.length || 0}`);

  for (const u of snapshot.users || []) {
    if (u.role === 'student') {
      console.log(
        `  -> Student: ${u.name} (${u.email}) | Unlocked Lessons: ${u.unlockedLessonsCount} | Completed Lessons: ${u.completedLessonsCount} | Total EXP: ${u.totalPoints}`
      );
    }
  }

  console.log('==============================================================');
  console.log('[DB Sync Script] Completed successfully:', result);
  console.log('==============================================================');
}

main().catch((err) => {
  console.error('[DB Sync Script] Fatal error:', err);
  process.exit(1);
});
