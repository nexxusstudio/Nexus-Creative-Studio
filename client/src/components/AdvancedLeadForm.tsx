import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  User,
  Building,
  Phone,
  Mail,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react';

interface LeadScoringData {
  budgetScore: number;
  urgencyScore: number;
  fitScore: number;
  engagementScore: number;
  totalScore: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface FormData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  website: string;
  
  // Project Details
  projectType: string;
  budgetRange: string;
  timeline: string;
  urgency: string;
  
  // Requirements
  primaryGoal: string;
  currentChallenges: string;
  targetAudience: string;
  competitorAnalysis: string;
  successMetrics: string;
  
  // Technical
  existingPlatforms: string[];
  integrationNeeds: string[];
  complianceRequirements: string[];
  
  // Engagement
  hearAboutUs: string;
  previousProjects: boolean;
  referralSource: string;
  
  // Message
  additionalInfo: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  website: '',
  projectType: '',
  budgetRange: '',
  timeline: '',
  urgency: '',
  primaryGoal: '',
  currentChallenges: '',
  targetAudience: '',
  competitorAnalysis: '',
  successMetrics: '',
  existingPlatforms: [],
  integrationNeeds: [],
  complianceRequirements: [],
  hearAboutUs: '',
  previousProjects: false,
  referralSource: '',
  additionalInfo: ''
};

const projectTypes = [
  'Web Application Development',
  'AI/ML Integration',
  'E-commerce Platform',
  'Mobile App Development',
  'Automation Systems',
  'DeFi/Blockchain Solutions',
  'Enterprise Software',
  'Growth & Marketing Stack',
  'API Development',
  'System Integration',
  'Other'
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $30,000',
  '$30,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
  'Not sure yet'
];

const timelines = [
  'ASAP (Rush job)',
  '2-4 weeks',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Flexible'
];

const urgencyLevels = [
  'Very urgent - need to start immediately',
  'Urgent - within 2 weeks',
  'Moderate - within a month',
  'Low - just exploring options'
];

export function AdvancedLeadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [leadScore, setLeadScore] = useState<LeadScoringData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Real-time lead scoring
  useEffect(() => {
    const score = calculateLeadScore(formData);
    setLeadScore(score);
  }, [formData]);

  const calculateLeadScore = (data: FormData): LeadScoringData => {
    let budgetScore = 0;
    let urgencyScore = 0;
    let fitScore = 0;
    let engagementScore = 0;

    // Budget scoring (0-30 points)
    const budgetMapping: Record<string, number> = {
      'Under $5,000': 5,
      '$5,000 - $15,000': 10,
      '$15,000 - $30,000': 20,
      '$30,000 - $50,000': 25,
      '$50,000 - $100,000': 30,
      '$100,000+': 30,
      'Not sure yet': 5
    };
    budgetScore = budgetMapping[data.budgetRange] || 0;

    // Urgency scoring (0-25 points)
    const urgencyMapping: Record<string, number> = {
      'Very urgent - need to start immediately': 25,
      'Urgent - within 2 weeks': 20,
      'Moderate - within a month': 15,
      'Low - just exploring options': 5
    };
    urgencyScore = urgencyMapping[data.urgency] || 0;

    // Fit scoring (0-25 points)
    let fitPoints = 0;
    if (data.company) fitPoints += 5;
    if (data.jobTitle.toLowerCase().includes('ceo') || 
        data.jobTitle.toLowerCase().includes('founder') ||
        data.jobTitle.toLowerCase().includes('director')) fitPoints += 10;
    if (data.website) fitPoints += 5;
    if (data.primaryGoal) fitPoints += 5;
    fitScore = Math.min(fitPoints, 25);

    // Engagement scoring (0-20 points)
    let engagementPoints = 0;
    if (data.currentChallenges) engagementPoints += 5;
    if (data.successMetrics) engagementPoints += 5;
    if (data.targetAudience) engagementPoints += 3;
    if (data.competitorAnalysis) engagementPoints += 3;
    if (data.additionalInfo) engagementPoints += 2;
    if (data.previousProjects) engagementPoints += 2;
    engagementScore = Math.min(engagementPoints, 20);

    const totalScore = budgetScore + urgencyScore + fitScore + engagementScore;
    
    let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    if (totalScore >= 70) priority = 'HIGH';
    else if (totalScore >= 40) priority = 'MEDIUM';

    return {
      budgetScore,
      urgencyScore,
      fitScore,
      engagementScore,
      totalScore,
      priority
    };
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.company) errors.company = 'Company is required';
        break;
      case 2:
        if (!formData.projectType) errors.projectType = 'Project type is required';
        if (!formData.budgetRange) errors.budgetRange = 'Budget range is required';
        if (!formData.timeline) errors.timeline = 'Timeline is required';
        break;
      case 3:
        if (!formData.primaryGoal) errors.primaryGoal = 'Primary goal is required';
        if (!formData.currentChallenges) errors.currentChallenges = 'Current challenges are required';
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        leadScore: leadScore,
        submissionDate: new Date().toISOString(),
        source: 'advanced_lead_form'
      };

      const response = await fetch('/api/advanced-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        toast({
          title: "Thank you for your submission!",
          description: "We'll review your project details and get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData(initialFormData);
        setCurrentStep(1);
        
        // Show success step
        setCurrentStep(6);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold">Let's start with the basics</h3>
              <p className="text-muted-foreground">Tell us about yourself and your company</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={validationErrors.firstName ? 'border-red-500' : ''}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={validationErrors.lastName ? 'border-red-500' : ''}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={validationErrors.company ? 'border-red-500' : ''}
                />
                {validationErrors.company && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.company}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold">Project Overview</h3>
              <p className="text-muted-foreground">Help us understand your project requirements</p>
            </div>
            
            <div>
              <Label htmlFor="projectType">What type of project are you looking for? *</Label>
              <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                <SelectTrigger className={validationErrors.projectType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.projectType && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectType}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="budgetRange">What's your budget range? *</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                <SelectTrigger className={validationErrors.budgetRange ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.budgetRange && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.budgetRange}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="timeline">What's your ideal timeline? *</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className={validationErrors.timeline ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map(timeline => (
                    <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.timeline && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.timeline}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="urgency">How urgent is this project?</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MessageSquare className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold">Project Requirements</h3>
              <p className="text-muted-foreground">Tell us more about your goals and challenges</p>
            </div>
            
            <div>
              <Label htmlFor="primaryGoal">What's your primary goal for this project? *</Label>
              <Textarea
                id="primaryGoal"
                value={formData.primaryGoal}
                onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                placeholder="e.g., Increase online sales, automate manual processes, improve user experience..."
                className={validationErrors.primaryGoal ? 'border-red-500' : ''}
                rows={3}
              />
              {validationErrors.primaryGoal && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.primaryGoal}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="currentChallenges">What are your current biggest challenges? *</Label>
              <Textarea
                id="currentChallenges"
                value={formData.currentChallenges}
                onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                placeholder="Describe the problems you're trying to solve..."
                className={validationErrors.currentChallenges ? 'border-red-500' : ''}
                rows={3}
              />
              {validationErrors.currentChallenges && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.currentChallenges}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="targetAudience">Who is your target audience?</Label>
              <Textarea
                id="targetAudience"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Describe your ideal customers or users..."
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="successMetrics">How will you measure success?</Label>
              <Textarea
                id="successMetrics"
                value={formData.successMetrics}
                onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                placeholder="e.g., 50% increase in conversions, 2x faster processing time..."
                rows={2}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Zap className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold">Technical Details</h3>
              <p className="text-muted-foreground">Any additional technical requirements or context</p>
            </div>
            
            <div>
              <Label htmlFor="competitorAnalysis">Are there any competitors or examples you'd like to reference?</Label>
              <Textarea
                id="competitorAnalysis"
                value={formData.competitorAnalysis}
                onChange={(e) => handleInputChange('competitorAnalysis', e.target.value)}
                placeholder="Share any websites, apps, or companies you admire..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
              <Select value={formData.hearAboutUs} onValueChange={(value) => handleInputChange('hearAboutUs', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="additionalInfo">Any additional information or specific requirements?</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Share any other details that might be relevant..."
                rows={4}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold">Review & Submit</h3>
              <p className="text-muted-foreground">Please review your information before submitting</p>
            </div>
            
            {leadScore && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Lead Score Analysis</span>
                    <Badge 
                      variant={leadScore.priority === 'HIGH' ? 'default' : 
                              leadScore.priority === 'MEDIUM' ? 'secondary' : 'outline'}
                    >
                      {leadScore.priority} PRIORITY
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Total Score</span>
                      <span className="font-bold">{leadScore.totalScore}/100</span>
                    </div>
                    <Progress value={leadScore.totalScore} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>Budget Fit: {leadScore.budgetScore}/30</div>
                      <div>Urgency: {leadScore.urgencyScore}/25</div>
                      <div>Project Fit: {leadScore.fitScore}/25</div>
                      <div>Engagement: {leadScore.engagementScore}/20</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <h4 className="font-semibold">Project Summary:</h4>
              <p><strong>Type:</strong> {formData.projectType}</p>
              <p><strong>Budget:</strong> {formData.budgetRange}</p>
              <p><strong>Timeline:</strong> {formData.timeline}</p>
              <p><strong>Company:</strong> {formData.company}</p>
              <p><strong>Primary Goal:</strong> {formData.primaryGoal}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms of service and privacy policy
              </Label>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground">
              We've received your project details and will get back to you within 24 hours.
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-sm">
                <strong>What happens next?</strong><br />
                1. We'll review your requirements<br />
                2. Prepare a custom proposal<br />
                3. Schedule a discovery call<br />
                4. Start building your solution
              </p>
            </div>
            <Button onClick={() => window.location.reload()}>
              Submit Another Project
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 6) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          {renderStep()}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Project Requirements Form</CardTitle>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {renderStep()}
        
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-primary"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="ml-2" size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}