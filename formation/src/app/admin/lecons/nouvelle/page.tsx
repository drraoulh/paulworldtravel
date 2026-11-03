import { requireAdmin } from '@/lib/staff';
import { AdminHeading, AdminBody } from '@/components/admin/ui';
import LessonEditor from '@/components/admin/LessonEditor';
export default async function NewLesson() {
  await requireAdmin('/admin/lecons/nouvelle/');
  return <><AdminHeading title="Créer une leçon" description="Choisissez une compétence, rédigez le contenu et ajoutez au moins une question corrigée. Le brouillon reste privé jusqu’à publication." /><AdminBody><LessonEditor creating isAdmin initial={{ slug: '', title: '', goal: '', minutes: 10, sections: [{ heading: '', paragraphs: [''] }], quiz: [{ prompt: '', choices: ['', '', '', ''], answer: 0, explanation: '' }] }} moduleId="co" revision={0} /></AdminBody></>;
}
