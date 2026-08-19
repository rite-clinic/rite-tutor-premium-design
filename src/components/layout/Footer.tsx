import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

const footerLinks = {
  programs: [
    { name: 'Courses', href: '/courses' },
    { name: 'Learning Pathways', href: '/learning-pathways' },
    { name: 'Services', href: '/services' },
    { name: 'Projects & Impact', href: '/projects' },
    { name: 'How It Works', href: '/how-it-works' },
  ],
  company: [
    { name: 'About Us', href: '/about-us' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer content */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo} 
                alt="Rite Tutor" 
                className="h-16 w-auto invert"
              />
            </Link>
            <p className="text-background/70 mb-6 max-w-md">
              Premium one-to-one online coding and logical thinking tutoring for children aged 6-15. Building Junior CTOs, not just coders.
            </p>
            <div className="space-y-3">
              <a 
                href="mailto:hello@ritetutor.com" 
                className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@ritetutor.com
              </a>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                Serving Bloomington, IN & Indiana
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Rite Tutor. All rights reserved.
          </p>
          <p className="text-background/60 text-sm">
            Proudly serving families in Bloomington, Ellettsville, Bedford, Martinsville & Nashville, IN
          </p>
        </div>
      </div>
    </footer>
  );
}
