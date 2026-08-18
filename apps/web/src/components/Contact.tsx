'use client';

import { CheckCircle, Linkedin, Mail, Phone, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useActionState } from 'react';
import { initialContactState, submitContact } from '@/app/actions/contact';

interface ContactProps {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export function Contact({ title, subtitle, email, phone, linkedinUrl }: ContactProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const isSubmitted = state.status === 'success';
  const errorMessage = state.status === 'error' ? state.error : null;

  return (
    <div className="py-20 md:py-32 relative overflow-hidden bg-neutral-100 dark:bg-[#0C2723]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="fascinate-title text-4xl sm:text-5xl mb-6 text-foreground leading-tight flex flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <span className="relative inline-block">
              <span className="relative z-10">{title}</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 sm:bottom-0 left-0 h-4 bg-[#5A7A5E] dark:bg-[#5A7A5E] -z-0 rounded"
              />
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-foreground" fill="currentColor" />
            </motion.span>
          </h1>
          <p className="text-[#D4D0BF] max-w-2xl mx-auto leading-relaxed text-[18px]">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          <div className="space-y-6 md:col-span-2">
            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-[#5A7A5E] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-neutral-600 dark:text-[#F5E6D3]" />
              </div>
              <div>
                <h3 className="mb-0.5 text-xs uppercase tracking-wider font-semibold text-[#63746b]">Email</h3>
                <a href={`mailto:${email}`} className="font-semibold text-[#f5e6d3]">{email}</a>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-[#5A7A5E] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-neutral-600 dark:text-[#F5E6D3]" />
              </div>
              <div>
                <h3 className="mb-0.5 text-xs uppercase tracking-wider font-semibold text-[#63746b]">Phone</h3>
                <p className="font-semibold text-[#f5e6d3]">{phone}</p>
              </div>
            </motion.div>

            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-[#5A7A5E] flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-6 h-6 text-neutral-600 dark:text-[#F5E6D3]" />
              </div>
              <div>
                <h3 className="mb-0.5 text-xs uppercase tracking-wider font-semibold text-[#63746b]">LinkedIn</h3>
                <p className="font-semibold text-[#f5e6d3]">Connect with me</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 relative"
          >
            <form action={formAction} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field id="name" label="Name *" placeholder="Your name" required />
                <Field id="email" type="email" label="Email *" placeholder="your@email.com" required />
              </div>
              <Field id="subject" label="Subject *" placeholder="Project inquiry" required />
              <div>
                <label htmlFor="message" className="block mb-2 text-foreground font-bold">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-2xl bg-[#001616] border-2 border-primary/20 text-[#F5E6D3] placeholder:text-[#D4D0BF] focus:outline-none focus:ring-4 focus:ring-[#5A7A5E]/40 focus:border-[#5A7A5E] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.1, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                disabled={pending || isSubmitted}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {pending ? 'Sending…' : 'Send Message'}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-foreground font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl bg-[#001616] border-2 border-primary/20 text-[#F5E6D3] placeholder:text-[#D4D0BF] focus:outline-none focus:ring-4 focus:ring-[#5A7A5E]/40 focus:border-[#5A7A5E] transition-all"
      />
    </div>
  );
}
