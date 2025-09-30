import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoConcept1 from "@/assets/logo-concept-1.png";
import logoConcept2 from "@/assets/logo-concept-2.png";
import logoConcept3 from "@/assets/logo-concept-3.png";
import logoConcept4 from "@/assets/logo-concept-4.png";

const LogoShowcase = () => {
  const navigate = useNavigate();

  const logos = [
    { id: 1, src: logoConcept1, title: "Concept A: Typography Focus" },
    { id: 2, src: logoConcept2, title: "Concept B: Neural Network Icon" },
    { id: 3, src: logoConcept3, title: "Concept C: Storm & Code" },
    { id: 4, src: logoConcept4, title: "Concept D: Minimalist Geometric" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">ScriptStorm Logo Concepts</h1>
            <p className="text-muted-foreground">Compare and choose your preferred logo design</p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {logos.map((logo) => (
            <div key={logo.id} className="space-y-4">
              <h3 className="text-xl font-semibold">{logo.title}</h3>
              
              {/* Dark Background */}
              <div className="bg-slate-900 p-8 rounded-lg">
                <p className="text-xs text-slate-400 mb-4">On Dark Background</p>
                <div className="flex items-center justify-center h-48">
                  <img 
                    src={logo.src} 
                    alt={logo.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Light Background */}
              <div className="bg-slate-100 p-8 rounded-lg">
                <p className="text-xs text-slate-600 mb-4">On Light Background</p>
                <div className="flex items-center justify-center h-48">
                  <img 
                    src={logo.src} 
                    alt={logo.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Small Size Preview */}
              <div className="bg-card border p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-4">Small Size (Favicon)</p>
                <div className="flex items-center justify-center">
                  <img 
                    src={logo.src} 
                    alt={logo.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
