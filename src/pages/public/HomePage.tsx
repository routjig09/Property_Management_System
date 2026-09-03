import { Link } from 'react-router-dom';
import {
  Building, CheckCircle, Shield, MessageSquare, HeartHandshake,
  ArrowRight, Home, Store, Landmark, LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertySearchBar } from '@/components/property/PropertySearchBar';
import { useFeaturedProperties, useLatestProperties } from '@/hooks/useProperties';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';

const locations = [
  { name: 'Bangalore', state: 'Karnataka', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop' },
  { name: 'Bhubaneswar', state: 'Odisha', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop' },
  { name: 'Hyderabad', state: 'Telangana', image: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=400&h=300&fit=crop' },
  { name: 'Mumbai', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop' },
  { name: 'Pune', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1625505826533-5c80aca7d157?w=400&h=300&fit=crop' },
  { name: 'New Delhi', state: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop' },
];

const propertyTypes = [
  { name: 'Apartments', icon: Building, type: 'APARTMENT' },
  { name: 'Villas', icon: Home, type: 'VILLA' },
  { name: 'Independent Houses', icon: Landmark, type: 'INDEPENDENT_HOUSE' },
  { name: 'Plots', icon: LayoutGrid, type: 'PLOT' },
  { name: 'Commercial', icon: Store, type: 'COMMERCIAL' },
];

const features = [
  { icon: CheckCircle, title: 'Verified Properties', description: 'Every property is verified by our team before listing.' },
  { icon: Shield, title: 'Transparent Information', description: 'Complete details including building, floor, and amenities.' },
  { icon: MessageSquare, title: 'Easy Inquiry', description: 'Contact property managers directly through the platform.' },
  { icon: HeartHandshake, title: 'Trusted Support', description: 'Dedicated support team to help you find your place.' },
];

export function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useFeaturedProperties();
  const { data: latest, isLoading: latestLoading } = useLatestProperties();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/60 to-navy-950/40" />
        </div>

        <div className="relative z-10 container-main w-full">
          <div className="max-w-3xl">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4 animate-fade-in">
              PropSync — Find your place
            </p>
            <h1 className="text-white font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in">
              Find a place<br />
              you'll love to<br />
              <span className="text-gradient bg-gradient-to-r from-gold to-champagne bg-clip-text [-webkit-text-fill-color:transparent]">
                call home.
              </span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-body max-w-xl mb-10 animate-fade-in">
              Discover verified properties in the locations that matter to you.
            </p>
          </div>

          {/* Search Panel */}
          <div className="max-w-5xl animate-fade-up">
            <PropertySearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-ivory">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Curated Selection</p>
            <h2 className="font-heading text-navy-900">Featured Properties</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredLoading
              ? Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)
              : featured?.slice(0, 6).map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/properties">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Location */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Explore</p>
            <h2 className="font-heading text-navy-900">Browse by Location</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {locations.map((loc) => (
              <Link
                key={loc.name}
                to={`/properties?city=${loc.name}&state=${loc.state}`}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] hover-zoom card-hover"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-heading font-semibold text-lg">{loc.name}</p>
                  <p className="text-white/60 text-xs font-body">{loc.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-ivory">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Categories</p>
            <h2 className="font-heading text-navy-900">Property Types</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {propertyTypes.map((pt) => {
              const Icon = pt.icon;
              return (
                <Link
                  key={pt.name}
                  to={`/properties?type=${pt.type}`}
                  className="flex flex-col items-center p-6 bg-white rounded-xl shadow-card card-hover text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-body font-medium text-navy-900 group-hover:text-gold transition-colors">
                    {pt.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why PropSync */}
      <section className="py-20 bg-navy-950">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">Why Choose Us</p>
            <h2 className="font-heading text-white">Why PropSync</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center p-6 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h4 className="text-white font-heading font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm font-body">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Properties */}
      <section className="py-20 bg-ivory">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-gold font-body text-sm tracking-[0.15em] uppercase mb-3">New Arrivals</p>
            <h2 className="font-heading text-navy-900">Latest Properties</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {latestLoading
              ? Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)
              : latest?.slice(0, 6).map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-white font-heading mb-4">Looking for your next home?</h2>
            <p className="text-white/70 font-body text-lg mb-8 max-w-lg mx-auto">
              Tell us what you're looking for and we'll help you find the perfect property.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/properties">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Browse Properties
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
