import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import { getComponentContent } from "@/lib/content-manager";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const navContent = getComponentContent('navigation');
  
  // Always include home as first item
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items
  ];

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
      data-testid="breadcrumb-navigation"
    >
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight size={16} className="text-muted-foreground/50" />}
          
          {item.href && !item.active ? (
            <Link href={item.href}>
              <button 
                className="flex items-center space-x-1 hover:text-primary theme-transition"
                data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {index === 0 && <Home size={14} />}
                <span>{item.label}</span>
              </button>
            </Link>
          ) : (
            <span 
              className={`flex items-center space-x-1 ${item.active ? 'text-foreground font-medium' : ''}`}
              data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}-active`}
            >
              {index === 0 && <Home size={14} />}
              <span>{item.label}</span>
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Ecosystem-specific breadcrumb component
interface EcosystemBreadcrumbProps {
  currentBrand: string;
  currentPage?: string;
  className?: string;
}

export function EcosystemBreadcrumb({ currentBrand, currentPage, className = "" }: EcosystemBreadcrumbProps) {
  const ecosystemBrands = {
    'nexus-studio': { label: 'Nexus Studio', href: '/nexus-studio' },
    'crypto-nexus': { label: 'Crypto Nexus', href: '/crypto-nexus' },
    'byte-studio': { label: 'Byte Studio', href: '/byte-studio' },
    'founder': { label: 'Founder Hub', href: '/founder' }
  };

  const items: BreadcrumbItem[] = [
    { label: "Ecosystem", href: "/#ecosystem" },
  ];

  const brand = ecosystemBrands[currentBrand as keyof typeof ecosystemBrands];
  if (brand) {
    items.push({ 
      label: brand.label, 
      href: currentPage ? brand.href : undefined,
      active: !currentPage 
    });
    
    if (currentPage) {
      items.push({ 
        label: currentPage, 
        active: true 
      });
    }
  }

  return <Breadcrumb items={items} className={className} />;
}

// Utility function to generate breadcrumbs from path
export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    items.push({
      label,
      href: isLast ? undefined : href,
      active: isLast
    });
  });
  
  return items;
}

export default Breadcrumb;