import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp, SectionHeading } from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/api/projects";
import projectFarm from "@/assets/project-farm.jpg";
import heroForest from "@/assets/hero-forest.jpg";

const imageMap = {
  '/project-farm.jpg': projectFarm,
  '/hero-forest.jpg': heroForest,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return "bg-green-900/60 text-green-400 border border-green-700/40";
      case 'limited':
        return "bg-amber-900/60 text-amber-400 border border-amber-700/40";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'limited':
        return 'Limited';
      default:
        return 'Coming Soon';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-green-400';
      case 'limited':
        return 'text-amber-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProjectImage = (imageUrl) => {
    return imageMap[imageUrl] || projectFarm;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Page Header */}
      <div className="pt-32 pb-16 bg-earth">
        <div className="container mx-auto px-6">
          <FadeUp>
            <span className="text-gold text-xs tracking-widest uppercase">Our Portfolio</span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mt-3 mb-4">
              Explore Farmland <em className="text-gold italic">Projects</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Each project is developed with structured planning, transparent documentation, and Red Sandalwood plantation integration.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400">Error loading projects. Please try again later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <FadeUp key={p._id || p.slug} delay={i * 0.1}>
                  <div className="bg-gradient-card border border-border/40 rounded-2xl overflow-hidden group hover:border-gold/30 hover:shadow-gold transition-all duration-400">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={getProjectImage(p.imageUrl)}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        width={800}
                        height={450}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                      <span
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(p.status)}`}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-foreground mb-1">{p.name}</h3>
                      <p className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                        <MapPin className="w-3 h-3 text-gold" />
                        {p.location}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
                        <span>Plot size: <span className="text-foreground">{p.size}</span></span>
                        <span className={getStatusColor(p.status)}>
                          ● {getStatusText(p.status)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/projects/${p.slug}`}
                          className="flex-1 text-center py-2.5 rounded-full bg-gradient-gold text-forest text-xs font-semibold hover:shadow-gold transition-all duration-300"
                        >
                          View Project
                        </Link>
                        <Link
                          to="/site-visit"
                          className="flex-1 text-center py-2.5 rounded-full border border-gold/30 text-gold text-xs hover:border-gold hover:bg-gold/10 transition-all duration-300"
                        >
                          Book Visit
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}

          {/* Why Visit */}
          <FadeUp delay={0.2} className="mt-20 bg-earth border border-border/30 rounded-3xl p-10 text-center">
            <p className="text-gold text-xs tracking-widest uppercase mb-3">Our Commitment</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              See Before You <em className="text-gold italic">Decide</em>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              All documents are shared transparently. Site visits are arranged for every interested buyer. No commitment required before your visit.
            </p>
            <Link
              to="/site-visit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-gold text-forest font-semibold hover:shadow-gold transition-all duration-300"
            >
              Schedule a Site Visit <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container mx-auto px-6 pb-10">
        <p className="text-xs text-muted-foreground/60 border-t border-border/30 pt-4">
          <strong>Disclaimer:</strong> These are agricultural land investments. No guaranteed financial returns are implied or promised. Buyers are advised to conduct independent due diligence.
        </p>
      </div>

      <Footer />
    </div>
  );
}
