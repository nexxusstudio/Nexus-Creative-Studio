import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  MessageCircle,
  Slack,
  MessageSquare,
  Video,
  Mail,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

export function Contact() {
  const contactRef = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6" ref={contactRef}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="contact-title">
                Let's Work Together
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="contact-description">
                Ready to transform your digital presence? Get in touch and let's discuss your project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition"
                  required
                  data-testid="input-first-name"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition"
                  required
                  data-testid="input-last-name"
                />
              </div>
              
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition"
                required
                data-testid="input-email"
              />
              
              <Input
                type="text"
                name="company"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition"
                data-testid="input-company"
              />
              
              <Textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring theme-transition resize-none"
                required
                data-testid="textarea-message"
              />
              
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 text-lg font-semibold hover:opacity-90 theme-transition btn-ripple"
                data-testid="button-send-message"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Directory */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" data-testid="directory-title">
                Contact Directory
              </h3>
              <p className="text-muted-foreground mb-8" data-testid="directory-description">
                Multiple ways to reach us across different platforms and channels.
              </p>
            </div>

            {/* HQ Info */}
            <Card className="bg-card rounded-2xl border border-border">
              <CardContent className="p-6 space-y-4">
                <h4 className="text-lg font-semibold" data-testid="hq-title">Headquarters</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3" data-testid="hq-location">
                    <MapPin className="text-primary" size={20} />
                    <span className="text-muted-foreground">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="hq-phone">
                    <Phone className="text-primary" size={20} />
                    <span className="text-muted-foreground">+880 1234 567890</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="hq-whatsapp">
                    <MessageCircle className="text-primary" size={20} />
                    <span className="text-muted-foreground">WhatsApp Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Channels */}
            <Card className="bg-card rounded-2xl border border-border">
              <CardContent className="p-6 space-y-4">
                <h4 className="text-lg font-semibold" data-testid="channels-title">Communication Channels</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary theme-transition justify-start"
                    data-testid="channel-slack"
                  >
                    <Slack className="text-primary" size={20} />
                    <span>Slack</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary theme-transition justify-start"
                    data-testid="channel-discord"
                  >
                    <MessageSquare className="text-primary" size={20} />
                    <span>Discord</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary theme-transition justify-start"
                    data-testid="channel-zoom"
                  >
                    <Video className="text-primary" size={20} />
                    <span>Zoom</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary theme-transition justify-start"
                    data-testid="channel-email"
                  >
                    <Mail className="text-primary" size={20} />
                    <span>Email</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card rounded-2xl border border-border">
              <CardContent className="p-6 space-y-4">
                <h4 className="text-lg font-semibold" data-testid="social-title">Social Profiles</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-blue-500 rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-linkedin"
                  >
                    <Linkedin className="text-white" size={20} />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-black rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-github"
                  >
                    <Github className="text-white" size={20} />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-blue-400 rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-twitter"
                  >
                    <Twitter className="text-white" size={20} />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-green-500 rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-fiverr"
                  >
                    <span className="text-white font-bold text-sm">F</span>
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-green-600 rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-upwork"
                  >
                    <span className="text-white font-bold text-sm">U</span>
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 bg-gray-800 rounded-lg hover:opacity-80 theme-transition"
                    data-testid="social-medium"
                  >
                    <span className="text-white font-bold text-sm">M</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
