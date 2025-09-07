import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How long does it take to receive the reset email?",
      answer: "Password reset emails are typically delivered within 2-5 minutes. If you don't receive it, check your spam folder and ensure you entered the correct email address."
    },
    {
      id: 2,
      question: "What if I don't have access to my email anymore?",
      answer: "If you no longer have access to your registered email, you can try using your phone number for SMS recovery, or contact our support team for additional verification options."
    },
    {
      id: 3,
      question: "The reset link isn't working. What should I do?",
      answer: "Reset links expire after 24 hours for security reasons. If your link has expired or isn't working, request a new password reset email. Make sure to complete the process within the time limit."
    },
    {
      id: 4,
      question: "Can I reset my password using my phone number?",
      answer: "Yes, if you have a verified phone number associated with your account, you can receive a verification code via SMS to reset your password."
    },
    {
      id: 5,
      question: "How do I know if my account is locked?",
      answer: "If you've made multiple unsuccessful login attempts, your account may be temporarily locked for security. Wait 15-30 minutes before trying again, or use the password reset option."
    }
  ];

  const supportOptions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      icon: "MessageCircle",
      available: true,
      hours: "24/7"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: "Mail",
      available: true,
      hours: "Response within 24 hours"
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support representative",
      icon: "Phone",
      available: false,
      hours: "Mon-Fri 9AM-6PM EST"
    }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* FAQ Section */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-secondary">
              Common questions about password recovery
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq) => (
            <div key={faq?.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleFaq(faq?.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-smooth rounded-lg"
              >
                <span className="font-medium text-text-primary pr-4">
                  {faq?.question}
                </span>
                <Icon 
                  name={expandedFaq === faq?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  color="var(--color-text-secondary)"
                  className="flex-shrink-0"
                />
              </button>
              
              {expandedFaq === faq?.id && (
                <div className="px-4 pb-4">
                  <div className="pt-2 border-t border-border">
                    <p className="text-text-secondary leading-relaxed">
                      {faq?.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Support Options */}
      <div className="bg-card rounded-lg shadow-soft p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Headphones" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Need More Help?
            </h2>
            <p className="text-sm text-text-secondary">
              Contact our support team for personalized assistance
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {supportOptions?.map((option, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                option?.available 
                  ? 'border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer' :'border-border bg-muted/20 opacity-60'
              } transition-smooth`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  option?.available ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={option?.icon} 
                    size={20} 
                    color={option?.available ? "var(--color-primary)" : "var(--color-text-secondary)"}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-text-primary">
                      {option?.title}
                    </h3>
                    {!option?.available && (
                      <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {option?.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>{option?.hours}</span>
                  </div>
                </div>

                {option?.available && (
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Tips */}
      <div className="bg-accent rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-text-primary mb-2">
              Security Tips
            </h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Use a strong, unique password for your account</li>
              <li>• Enable two-factor authentication for added security</li>
              <li>• Never share your password reset links with others</li>
              <li>• Complete password resets promptly as links expire</li>
              <li>• Keep your recovery email and phone number updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;