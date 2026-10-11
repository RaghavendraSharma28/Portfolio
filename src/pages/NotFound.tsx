import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound({ title = 'This page isn’t here.', message = 'The address may have changed, or the page may no longer be available.' }: { title?: string; message?: string }) {
  return <section className="not-found page-wrap">
    <div className="eyebrow section-kicker">404 / PAGE NOT FOUND</div>
    <h1>{title}</h1><p>{message}</p>
    <div className="not-found-actions"><Link className="button button-primary" to="/">Back to home <ArrowRight size={16}/></Link><Link className="text-link" to="/projects"><ArrowLeft size={15}/> Browse projects</Link></div>
  </section>;
}
