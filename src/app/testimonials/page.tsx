import { redirect } from 'next/navigation';

// The testimonials page was retired; keep old links working.
export default function Testimonials() {
  redirect('/');
}
