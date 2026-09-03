import { Building2, Users, Target, Award, MapPin, Phone, Mail } from 'lucide-react';

const teamValues = [
  { icon: Building2, title: 'Premium Properties', description: 'We curate only the finest properties across India, ensuring quality and verified listings.' },
  { icon: Users, title: 'Customer First', description: 'Every feature is designed around the customer journey — from search to inquiry to home.' },
  { icon: Target, title: 'Transparency', description: 'Complete property details including building info, floor plans, and pricing — no hidden surprises.' },
  { icon: Award, title: 'Trust & Reliability', description: 'Verified properties, trusted agents, and a dedicated support team backing every transaction.' },
];

export function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Hero */}
      <section className="relative py-24 bg-navy-950">
        <div className="container-main text-center">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">About Us</p>
          <h1 className="text-white font-heading text-4xl md:text-5xl font-bold mb-6">
            Redefining Property<br />Discovery & Management
          </h1>
          <p className="text-white/60 font-body text-lg max-w-2xl mx-auto">
            PropSync brings together property seekers and professional management
            in one elegant, transparent platform.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Our Story</p>
            <h2 className="font-heading text-navy-900 mb-6">Built for the Modern Property Experience</h2>
            <div className="divider mx-auto mb-8" />
            <p className="text-navy-600 font-body text-lg leading-relaxed mb-6">
              PropSync was born from a simple frustration — finding quality properties shouldn't be complicated.
              We believe every property search should feel premium, every listing should be transparent,
              and every inquiry should be effortless.
            </p>
            <p className="text-navy-600 font-body text-lg leading-relaxed">
              Our platform combines elegant property presentation with powerful management tools,
              creating a seamless experience for both property seekers and administrators.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Our Values</p>
            <h2 className="font-heading text-navy-900">What Drives Us</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6 rounded-xl bg-ivory border border-beige">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h4 className="font-heading font-semibold text-navy-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-navy-500 font-body">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-navy-950">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Properties Listed' },
              { value: '50+', label: 'Cities Covered' },
              { value: '10,000+', label: 'Happy Customers' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-heading font-bold text-gold mb-2">{stat.value}</p>
                <p className="text-white/60 font-body text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container-main text-center">
          <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-heading text-navy-900 mb-8">We'd Love to Hear From You</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-body text-navy-600">Bangalore, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold" />
              <span className="font-body text-navy-600">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold" />
              <span className="font-body text-navy-600">hello@propsync.in</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
