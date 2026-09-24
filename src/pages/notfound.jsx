import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-custom text-center py-20">
        <p className="text-tiny font-semibold uppercase tracking-widest text-accent mb-4">
          404 Error
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[-0.04em] mb-4">
          Page not found
        </h1>
        <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
          Nothing here. Go back home?
        </p>
        <Link to="/" className="btn-accent inline-flex group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}