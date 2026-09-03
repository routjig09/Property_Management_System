export const publicNavLinks = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Properties', href: '/properties', icon: 'building-2' },
  { label: 'About', href: '/about', icon: 'info' },
  { label: 'Contact', href: '/contact', icon: 'phone' }
];

export const customerNavLinks = [
  { label: 'Dashboard', href: '/customer/dashboard', icon: 'layout-dashboard' },
  { label: 'Browse Properties', href: '/properties', icon: 'search' },
  { label: 'Favorites', href: '/customer/favorites', icon: 'heart' },
  { label: 'My Inquiries', href: '/customer/inquiries', icon: 'message-square' },
  { label: 'My Requirements', href: '/customer/requirements', icon: 'clipboard-list' },
  { label: 'Profile', href: '/customer/profile', icon: 'user' },
  { label: 'Settings', href: '/customer/settings', icon: 'settings' }
];

export const adminNavLinks = [
  {
    section: 'OVERVIEW',
    links: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: 'layout-dashboard' }
    ]
  },
  {
    section: 'PROPERTY MANAGEMENT',
    links: [
      { label: 'Properties', href: '/admin/properties', icon: 'building-2' },
      { label: 'Add Property', href: '/admin/properties/add', icon: 'plus-circle' },
      { label: 'Listings', href: '/admin/listings', icon: 'list' }
    ]
  },
  {
    section: 'CUSTOMERS',
    links: [
      { label: 'Users', href: '/admin/users', icon: 'users' },
      { label: 'Customers', href: '/admin/customers', icon: 'user-circle' },
      { label: 'Inquiries', href: '/admin/inquiries', icon: 'message-square' },
      { label: 'Requirements', href: '/admin/requirements', icon: 'clipboard-list' }
    ]
  },
  {
    section: 'OPERATIONS',
    links: [
      { label: 'Activity', href: '/admin/activity', icon: 'activity' },
      { label: 'Audit Logs', href: '/admin/logs', icon: 'file-text' }
    ]
  },
  {
    section: 'SYSTEM',
    links: [
      { label: 'Settings', href: '/admin/settings', icon: 'settings' }
    ]
  }
];
