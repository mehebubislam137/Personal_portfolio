import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, AlertCircle } from 'lucide-react';
import { ACADEMIC_PROFILE, validateContactForm, ContactSubmission } from '../utils/portfolio-data';

export default function ContactTerminal() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    const email = ACADEMIC_PROFILE.email;
    const onSuccess = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
        .then(onSuccess)
        .catch(() => fallbackCopyText(email, onSuccess));
    } else {
      fallbackCopyText(email, onSuccess);
    }
  };

  const fallbackCopyText = (text: string, cb: () => void) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      cb();
    } catch {
      // Graceful fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>LET&apos;S CONNECT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Get In Touch
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            Interested in collaborating on AI research, graph intelligence systems, or engineering roles? Send a message or connect directly.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-1.5">
                  Mehebub Islam
                </h3>
                <p className="text-sm text-indigo-300 font-medium">
                  AI & Machine Learning Engineer
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  REVA University · Bengaluru, Karnataka, India
                </p>
              </div>

              {/* Verified Channels */}
              <div className="space-y-3 pt-2">
                {/* Email Channel */}
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-mono text-slate-400">DIRECT EMAIL</div>
                      <a
                        href={`mailto:${ACADEMIC_PROFILE.email}`}
                        className="text-xs sm:text-sm font-medium text-slate-200 hover:text-indigo-400 truncate block transition-colors"
                      >
                        {ACADEMIC_PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub Channel */}
                <a
                  href={ACADEMIC_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-300 group-hover:text-white shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">GITHUB REPOSITORIES</div>
                      <div className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">
                        github.com/mehebubislam
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-500 group-hover:text-white transition-colors">↗</span>
                </a>

                {/* LinkedIn Channel */}
                <a
                  href={ACADEMIC_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">LINKEDIN NETWORK</div>
                      <div className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">
                        linkedin.com/in/mehebubislam
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-500 group-hover:text-white transition-colors">↗</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 text-xs text-slate-400 flex items-center justify-between">
              <span>Timezone: IST (UTC+5:30)</span>
              <span className="text-indigo-400 font-medium">Bengaluru, India</span>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="pb-4 border-b border-slate-800 mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SEND A DIRECT MESSAGE</span>
                <span className="text-indigo-400">FAST RESPONSE</span>
              </div>

              {isSent ? (
                <div className="py-12 px-6 bg-slate-950/80 border border-emerald-500/40 rounded-xl space-y-4 text-center my-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Received!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. I will respond to your message promptly. You can also contact me directly at{' '}
                    <a href={`mailto:${ACADEMIC_PROFILE.email}`} className="text-indigo-400 underline font-medium">
                      {ACADEMIC_PROFILE.email}
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="mt-2 px-5 py-2.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Jane Smith"
                        className="w-full px-4 py-2.5 text-sm bg-slate-950 text-white placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. jane@company.com"
                        className="w-full px-4 py-2.5 text-sm bg-slate-950 text-white placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Collaboration on Graph AI or Engineering Role"
                      className="w-full px-4 py-2.5 text-sm bg-slate-950 text-white placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, project scope, or opportunity..."
                      className="w-full px-4 py-2.5 text-sm bg-slate-950 text-white placeholder-slate-500 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
