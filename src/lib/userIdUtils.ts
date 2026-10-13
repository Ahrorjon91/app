export const HARDCODED_USER_ID_MAP: Record<string, string> = {
  'admin@devopspro.tech': 'ADM-2026-0001',
  'student@devopspro.tech': 'USR-STU-01',
  'mullojon@devopspro.tech': 'USR-STU-02',
  'alexander@devopspro.tech': 'USR-STU-03',
  'elena@devopspro.tech': 'USR-STU-04',
  'dmitry@devopspro.tech': 'USR-STU-05',
  'olga@devopspro.tech': 'USR-STU-06',
  'ivan@devopspro.tech': 'USR-STU-07',
  'alina@devopspro.tech': 'USR-STU-08',
  'timur@devopspro.tech': 'USR-STU-09',
  'ekaterina@devopspro.tech': 'USR-STU-10',
};

/**
 * Returns a deterministic, permanent static User ID for any email.
 * Guarantees that the same email always receives the same ID across logins, registrations, and sheet syncs.
 */
export function getStaticUserIdForEmail(
  email: string,
  existingUsers?: Array<{ id?: string; email?: string }>
): string {
  const cleanEmail = String(email || '').toLowerCase().trim();
  if (!cleanEmail) return 'USR-STU-01';

  // 1. Check if user already exists in current database/state
  if (existingUsers && Array.isArray(existingUsers)) {
    const matched = existingUsers.find(
      (u) => u && u.email && String(u.email).toLowerCase().trim() === cleanEmail
    );
    if (matched && matched.id && String(matched.id).trim()) {
      return String(matched.id).trim();
    }
  }

  // 2. Check standard academy users table
  if (HARDCODED_USER_ID_MAP[cleanEmail]) {
    return HARDCODED_USER_ID_MAP[cleanEmail];
  }

  // 3. Fallback: Deterministic static slug derived strictly from email username
  const prefix = cleanEmail.split('@')[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
  return `USR-STU-${prefix || 'STD'}`;
}
