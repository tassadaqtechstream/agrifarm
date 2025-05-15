
import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  company: z.string().optional(),
  interestedIn: z.enum(["products", "pre_harvest", "selling", "other"]),
  message: z.string().min(10, "Please provide more details in your message"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      interestedIn: "products",
      message: "",
    },
  });
  
  // Reset success state after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 overflow-hidden relative">
      {/* Success overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-earth-olive-dark">Message Sent!</h3>
            <p className="text-earth-olive-dark/70 mt-2 text-center max-w-xs">
              Thank you for reaching out. We'll get back to you shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center mb-6">
        <motion.div 
          className="h-12 w-12 rounded-full bg-earth-terracotta/10 flex items-center justify-center mr-3"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Mail className="h-6 w-6 text-earth-terracotta" />
        </motion.div>
        <motion.h2 
          className="text-2xl font-bold text-earth-olive-dark"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      className={`transition-all duration-200 ${activeField === 'name' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      {...field} 
                      className={`transition-all duration-200 ${activeField === 'email' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your phone number" 
                      {...field} 
                      className={`transition-all duration-200 ${activeField === 'phone' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}
                      onFocus={() => setActiveField('phone')}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your company name" 
                      {...field} 
                      className={`transition-all duration-200 ${activeField === 'company' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}
                      onFocus={() => setActiveField('company')}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="interestedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I'm interested in</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onOpenChange={(open) => {
                    if (open) setActiveField('interestedIn');
                    else setActiveField(null);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className={`transition-all duration-200 ${activeField === 'interestedIn' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}>
                      <SelectValue placeholder="Select what you're interested in" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="products">Buying Agricultural Products</SelectItem>
                    <SelectItem value="pre_harvest">Pre-Harvest Deals & Contracts</SelectItem>
                    <SelectItem value="selling">Selling on the Marketplace</SelectItem>
                    <SelectItem value="other">Other Business Inquiries</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please tell us how we can help you" 
                    rows={4}
                    {...field}
                    className={`transition-all duration-200 ${activeField === 'message' ? 'border-earth-terracotta bg-earth-sand-light/20' : ''}`}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-earth-terracotta to-earth-olive" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </motion.div>
          
          <p className="text-xs text-earth-olive-dark/70 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
