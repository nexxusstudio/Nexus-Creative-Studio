import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Calendar,
  Tag,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  TrendingUp
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  year: number;
  client_name?: string;
  categories: string[];
  technologies: string[];
  metrics?: Record<string, any>;
  is_featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: string;
  title: string;
  description?: string;
  category: string;
  price_min?: number;
  price_max?: number;
  features: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service_interest?: string;
  budget_range?: string;
  status: string;
  created_at: string;
}

interface SiteMetrics {
  id: number;
  revenue_total: number;
  projects_total: number;
  clients_total: number;
  satisfaction_pct: number;
  success_rate_pct: number;
  updated_at: string;
}

const categories = [
  'Web Development',
  'AI/ML',
  'Automation',
  'Mobile App',
  'E-commerce',
  'Blockchain',
  'API Development',
  'Consulting'
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'Supabase', 'PostgreSQL', 'MongoDB', 'AWS', 'Vercel',
  'Docker', 'Kubernetes', 'TensorFlow', 'OpenAI', 'Stripe'
];

export function ContentManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'contacts' | 'metrics'>('projects');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json())
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => fetch('/api/services').then(res => res.json())
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => fetch('/api/contact-submissions').then(res => res.json())
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => fetch('/api/metrics').then(res => res.json())
  });

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: (data: Partial<Project>) => 
      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project created successfully!' });
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project updated successfully!' });
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/projects/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project deleted successfully!' });
    }
  });

  const updateMetricsMutation = useMutation({
    mutationFn: (data: Partial<SiteMetrics>) =>
      fetch('/api/metrics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      toast({ title: 'Metrics updated successfully!' });
    }
  });

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Projects Management</h3>
        <Button onClick={() => { setEditingItem({}); setIsDialogOpen(true); }}>
          <Plus className="mr-2" size={16} />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects?.data?.map((project: Project) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{project.title}</h4>
                  {project.is_featured && <Star className="text-yellow-500" size={16} />}
                  {project.published ? <Eye className="text-green-500" size={16} /> : <EyeOff className="text-gray-400" size={16} />}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.categories?.map((cat: string) => (
                    <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies?.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Year: {project.year}</span>
                  {project.client_name && <span>Client: {project.client_name}</span>}
                  <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => { setEditingItem(project); setIsDialogOpen(true); }}
                >
                  <Edit size={16} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{project.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteProjectMutation.mutate(project.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContactsTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Contact Submissions</h3>
      
      <div className="grid gap-4">
        {contacts?.map((contact: ContactSubmission) => (
          <Card key={contact.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{contact.name}</h4>
                  <Badge variant={
                    contact.status === 'new' ? 'default' :
                    contact.status === 'contacted' ? 'secondary' :
                    contact.status === 'qualified' ? 'default' :
                    'outline'
                  }>
                    {contact.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email:</strong> {contact.email}</p>
                    {contact.phone && <p><strong>Phone:</strong> {contact.phone}</p>}
                    {contact.company && <p><strong>Company:</strong> {contact.company}</p>}
                  </div>
                  <div>
                    {contact.service_interest && <p><strong>Service:</strong> {contact.service_interest}</p>}
                    {contact.budget_range && <p><strong>Budget:</strong> {contact.budget_range}</p>}
                    <p><strong>Submitted:</strong> {new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm"><strong>Message:</strong></p>
                  <p className="text-sm text-muted-foreground">{contact.message}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                    <SelectItem value="closed_won">Closed Won</SelectItem>
                    <SelectItem value="closed_lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMetricsTab = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Site Metrics</h3>
      
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.revenue_total?.toLocaleString()}</div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Update revenue"
                  className="w-32"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateMetricsMutation.mutate({ revenue_total: parseFloat(e.target.value) });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.projects_total}</div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Update projects"
                  className="w-32"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateMetricsMutation.mutate({ projects_total: parseInt(e.target.value) });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.clients_total}</div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Update clients"
                  className="w-32"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateMetricsMutation.mutate({ clients_total: parseInt(e.target.value) });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.satisfaction_pct}%</div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Update satisfaction"
                  className="w-32"
                  max="100"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateMetricsMutation.mutate({ satisfaction_pct: parseFloat(e.target.value) });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.success_rate_pct}%</div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Update success rate"
                  className="w-32"
                  max="100"
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateMetricsMutation.mutate({ success_rate_pct: parseFloat(e.target.value) });
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const renderProjectDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem?.id ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
        </DialogHeader>
        
        <ProjectForm
          project={editingItem}
          onSubmit={(data) => {
            if (editingItem?.id) {
              updateProjectMutation.mutate({ id: editingItem.id, data });
            } else {
              createProjectMutation.mutate(data);
            }
          }}
          onCancel={() => {
            setIsDialogOpen(false);
            setEditingItem(null);
          }}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Management Dashboard</h1>
        <p className="text-muted-foreground">Manage your projects, services, and site content</p>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'projects' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'services' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'contacts' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'metrics' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('metrics')}
        >
          Metrics
        </button>
      </div>

      {activeTab === 'projects' && renderProjectsTab()}
      {activeTab === 'services' && <div>Services management coming soon...</div>}
      {activeTab === 'contacts' && renderContactsTab()}
      {activeTab === 'metrics' && renderMetricsTab()}

      {renderProjectDialog()}
    </div>
  );
}

function ProjectForm({ 
  project, 
  onSubmit, 
  onCancel 
}: { 
  project: any; 
  onSubmit: (data: any) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    year: project?.year || new Date().getFullYear(),
    client_name: project?.client_name || '',
    categories: project?.categories || [],
    technologies: project?.technologies || [],
    is_featured: project?.is_featured || false,
    published: project?.published || false,
    metrics: project?.metrics || {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
          />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project?.id ? 'Update' : 'Create'} Project
        </Button>
      </div>
    </form>
  );
}