import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

const footerLinks = {
  properties: [
    { label: 'Apartments', href: '/properties?type=APARTMENT' },
    { label: 'Villas', href: '/properties?type=VILLA' },
    { label: 'Independent Houses', href: '/properties?type=INDEPENDENT_HOUSE' },
    { label: 'Plots', href: '/properties?type=PLOT' },
    { label: 'Commercial', href: '/properties?type=COMMERCIAL' },
  ],
  locations: [
    { label: 'Bangalore', href: '/properties?city=Bangalore' },
    { label: 'Bhubaneswar', href: '/properties?city=Bhubaneswar' },
    { label: 'Hyderabad', href: '/properties?city=Hyderabad' },
    { label: 'Mumbai', href: '/properties?city=Mumbai' },
    { label: 'Pune', href: '/properties?city=Pune' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white/80">
      {/* Newsletter CTA */}
      <div className="border-b border-white/10">
        <div className="container-main py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading text-white mb-2">
                Stay updated with new properties
              </h3>
              <p className="text-white/60">
                Get notified when new properties matching your criteria are listed.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-white/40 focus:outline-none focus:border-gold w-full md:w-72"
              />
              <button className="px-6 py-3 bg-gold hover:bg-gold-dark text-white font-medium rounded-r-xl transition-colors flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="full" size="lg" className="text-white mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Find your place. Manage your property. PropSync brings together property seekers 
              and professional management in one elegant platform.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@propsync.in"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                hello@propsync.in
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>123 Brigade Road, Bangalore,<br />Karnataka 560025</span>
              </div>
            </div>
          </div>

          {/* Properties Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Properties
            </h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Locations
            </h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {currentYear} PropSync. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
