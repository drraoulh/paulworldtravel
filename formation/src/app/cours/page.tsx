import { permanentRedirect } from 'next/navigation';

// The method sheets now live in the learning path.
export default function Lessons() {
  permanentRedirect('/parcours/');
}
