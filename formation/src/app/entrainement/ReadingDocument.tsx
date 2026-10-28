import type { ReadingQuestion } from '../../content/reading-extra';
/** Semantic documents retain selectable text and remain legible without an image. */
export default function ReadingDocument({ question }: { question: ReadingQuestion }) {
  return <div className="mt-6 rounded-xl border-l-4 border-ocean bg-paper p-5 leading-relaxed">
    <p className="whitespace-pre-line">{question.text}</p>
    {question.document && <div className="mt-4 overflow-x-auto"><table className="w-full border-collapse bg-white text-left text-sm">
      <caption className="pb-3 text-left font-bold text-night">{question.document.caption}</caption>
      <thead><tr>{question.document.headers.map(header => <th key={header} scope="col" className="border border-rule px-4 py-3">{header}</th>)}</tr></thead>
      <tbody>{question.document.rows.map((row,index) => <tr key={index}>{row.map((cell,col) => col === 0 ? <th scope="row" key={col} className="border border-rule px-4 py-3 font-medium">{cell}</th> : <td key={col} className="border border-rule px-4 py-3">{cell}</td>)}</tr>)}</tbody>
    </table></div>}
  </div>;
}
