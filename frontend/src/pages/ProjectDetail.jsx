import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeUp } from "@/components/SectionHeading";
import { useParams, Link } from "react-router-dom";
import { MapPin, FileText, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjectBySlug } from "@/api/projects";
import projectFarm from "@/assets/project-farm.jpg";
import heroForest from "@/assets/hero-forest.jpg";

const imageMap = {
  '/project-farm.jpg': projectFarm,
  '/hero-forest.jpg': heroForest,
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) throw new Error('Project ID not provided');
        const data = await getProjectBySlug(id);
        setProject(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const getProjectImage = (imageUrl) => {
    return imageMap[imageUrl] || projectFarm;
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

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">Project Not Found</h2>
          <Link to="/projects" className="text-gold hover:underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const projectImages = project.images && project.images.length > 0 
    ? project.images.map(img => getProjectImage(img))
    : [getProjectImage(project.imageUrl)];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-72 md:h-96 mt-0">
        <img
          src={projectImages[activeImg]}
          alt={project.name}
          className="w-full h-full object-cover"
          width={1440}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/40 to-forest" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-6">
          <FadeUp>
            <Link to="/projects" className="text-muted-foreground text-xs hover:text-gold mb-3 inline-block">
              ← All Projects
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">{project.name}</h1>
            <p className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4 text-gold" />
              {project.location}
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <FadeUp>
              <h2 className="font-serif text-2xl text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-serif text-2xl text-foreground mb-3">Location & Connectivity</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{project.connectivity}</p>
              <div className="glass rounded-xl p-4 inline-flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-foreground text-sm">{project.location}</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h2 className="font-serif text-2xl text-foreground mb-4">Layout & Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(project.layoutFeatures || []).map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-earth rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-muted-foreground text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-2xl text-foreground mb-4">Land & Plantation</h2>
              <p className="text-muted-foreground leading-relaxed">
                This project includes a Red Sandalwood plantation as a long-term land-use component. Cultivation complies with all applicable government regulations. The plantation is a supplementary feature of the land, not a financial return mechanism.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h2 className="font-serif text-2xl text-foreground mb-4">Documentation</h2>
              <p className="text-muted-foreground mb-4 text-sm">All of the following documents are shared transparently before any purchase commitment:</p>
              <div className="grid grid-cols-2 gap-3">
                {(project.documentation || []).map((d) => (
                  <div key={d} className="flex items-center gap-2 bg-earth rounded-xl px-4 py-3">
                    <FileText className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-muted-foreground text-sm">{d}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <FadeUp delay={0.1}>
              <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">Availability</span>
                  <span className={`text-sm font-medium ${getStatusColor(project.status)}`}>
                    ● {getStatusText(project.status)}
                  </span>
                </div>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Plot Sizes</p>
                    <p className="text-foreground font-medium">{project.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pricing</p>
                    <p className="text-foreground text-sm">{project.pricing}</p>
                  </div>
                </div>
                <Link
                  to="/site-visit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-forest font-semibold text-sm hover:shadow-gold transition-all duration-300 mb-3"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Site Visit
                </Link>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-all duration-300"
                >
                  Talk to Advisor <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-muted-foreground/60 mt-5 text-center leading-relaxed">
                  Agricultural land investment. No financial returns guaranteed.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
