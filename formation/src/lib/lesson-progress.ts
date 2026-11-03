/** Study markers are self-reported learning progress, never access rights or official scores. */
export const QUIZ_PREFIX = 'quiz-v2:';
export const READ_PREFIX = 'read:';
export const isLessonItem = (id: string) => /^(co|ce|ee|eo)\/(?!simulation-)[a-z0-9-]+$/.test(id);
export const completionId = (id: string) => isLessonItem(id) ? `${QUIZ_PREFIX}${id}` : id;
export const lessonIsRead = (done: string[], id: string) => done.includes(`${READ_PREFIX}${id}`) || done.includes(id) || done.includes(completionId(id));
export const quizPassed = (score: number, total: number) => Number.isInteger(total) && total > 0 && score === total;
