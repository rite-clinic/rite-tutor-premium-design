import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "Rite Tutor",
    telephone: "+1-929-421-8055",
    email: "hello@ritetutor.com",
    areaServed: { "@type": "Place", name: "Worldwide" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-929-421-8055",
      availableLanguage: "English",
      areaServed: "Worldwide",
    },
  },
};

const expectations = [
  {
    title: "Assess Your Child's Current Capabilities",
    description:
      "Through friendly dialogue and optional logic puzzles, we understand where your child actually is—not where age-based assessments say they should be.",
  },
  {
    title: "Understand Your Educational Objectives",
    description:
      "What matters to you? College preparation? Professional skill development? Confidence building? Career exploration? We customize.",
  },
  {
    title: "Explain Our Methodology Transparently",
    description:
      "We'll detail exactly how skill-based progression works, why logic comes before syntax, how portfolio development creates competitive advantages.",
  },
  {
    title: "Map a Realistic Three-Month Pathway",
    description:
      "Based on assessment results and your objectives, we outline specific milestones your child would achieve in their first quarter. No vague promises—concrete, achievable goals.",
  },
  {
    title: "Provide Transparent Pricing",
    description:
      "Your family's situation is unique. We'll discuss investment options that align with session frequency, curriculum intensity, and your budget. All cards on the table.",
  },
  {
    title: "Determine Fit Honestly",
    description:
      "If we believe Rite Tutor can deliver transformative results, we'll outline next steps. If we don't think we're the right fit, we'll say so directly and suggest alternatives.",
  },
];

const faqs = [
  {
    question: "How long is the free strategy call?",
    answer:
      "30 minutes. Sometimes we run 5-10 minutes over if conversation is productive, but we respect your time.",
  },
  {
    question: "Will you pressure me to enroll during the call?",
    answer:
      "No. We're educators, not salespeople. If we're not confident we can deliver exceptional results for your child, we'll say so honestly.",
  },
  {
    question: "Can my child join the call?",
    answer:
      "Absolutely! In fact, it's helpful for us to interact with them briefly if they're available. However, parent-only calls work fine too.",
  },
  {
    question: "What if we live in a different time zone?",
    answer:
      "We schedule strategy calls across all global time zones. Whether you're in the United States, Canada, United Kingdom, Australia, Singapore, UAE, Germany, France, India, Japan, or elsewhere—we'll find time that works.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "No preparation required. Just come with your questions and educational objectives. If your child has attempted coding previously, feel free to mention that, but it's not necessary.",
  },
  {
    question: "What happens after the strategy call if we want to proceed?",
    answer:
      "We'll begin mentor matching based on your child's learning style and objectives. Typically, first sessions start within 1-2 weeks of enrollment.",
  },
  {
    question: "What if we're not ready to commit yet?",
    answer:
      "That's completely fine. Many families take weeks or months to consider. We provide information, not pressure. Take whatever time you need.",
  },
];

const goodFit = [
  "Your child shows curiosity about technology or problem-solving",
  "You value quality education over cheap alternatives",
  "You're frustrated with crowded group classes or generic curricula",
  "Your gifted child is bored in age-based programs",
  "Your struggling child needs personalized attention and pacing",
  "You want transparency and regular communication about progress",
  "You're investing in long-term skill development, not short-term entertainment",
  "You're anywhere globally with reliable internet connection",
];

// ---------- Types (FIXES YOUR TS ERRORS) ----------
type FormData = {
  parent_name: string;
  email: string;
  phone: string;
  child_age: string;
  programming_experience: "" | "none" | "beginner" | "intermediate" | "advanced";
  location: string;
  educational_objectives: string;
  referral_source: string;
};

type Errors = Partial<Record<keyof FormData, string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;

type ToastState = { type: "" | "success" | "error"; message: string };

const INITIAL_FORM: FormData = {
  parent_name: "",
  email: "",
  phone: "",
  child_age: "",
  programming_experience: "",
  location: "",
  educational_objectives: "",
  referral_source: "",
};

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Phone: digits only, exactly 10 digits if provided
const normalizeDigits = (v: string) => String(v || "").replace(/\D/g, "");
const isValidPhone10 = (v: string) => {
  if (!String(v || "").trim()) return true; // optional
  const digits = normalizeDigits(v);
  return digits.length === 10;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [toast, setToast] = useState<ToastState>({ type: "", message: "" });

  const validate = (data: FormData): Errors => {
    const e: Errors = {};

    const parent = data.parent_name?.trim();
    if (!parent) e.parent_name = "Parent/Guardian name is required.";
    else if (parent.length < 2) e.parent_name = "Please enter a valid name.";

    const email = data.email?.trim();
    if (!email) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";

    if (!isValidPhone10(data.phone)) e.phone = "Phone must be exactly 10 digits.";

    const ageRaw = String(data.child_age || "").trim();
    if (!ageRaw) e.child_age = "Child's age is required.";
    else {
      const age = Number(ageRaw);
      if (!Number.isFinite(age)) e.child_age = "Please enter a valid age (numbers only).";
      else if (age < 3 || age > 25) e.child_age = "Please enter an age between 3 and 25.";
    }

    const allowed: FormData["programming_experience"][] = ["", "none", "beginner", "intermediate", "advanced"];
    if (!allowed.includes(data.programming_experience)) {
      e.programming_experience = "Please select a valid option.";
    }

    if (data.location?.trim() && data.location.trim().length > 120) e.location = "Location is too long.";
    if (data.referral_source?.trim() && data.referral_source.trim().length > 200)
      e.referral_source = "Referral source is too long.";
    if (data.educational_objectives?.trim() && data.educational_objectives.trim().length > 1500)
      e.educational_objectives = "Please keep objectives under 1500 characters.";

    return e;
  };

  const currentErrors = useMemo(() => validate(formData), [formData]);
  const canSubmit = Object.keys(currentErrors).length === 0 && !loading;

  const fieldError = (name: keyof FormData) =>
    touched[name] ? (errors[name] || currentErrors[name] || "") : "";

  const markTouched = (name: keyof FormData) =>
    setTouched((p) => ({ ...p, [name]: true }));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof FormData;
    markTouched(name);
    const nextErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;

    // Phone: digits-only live, max 10
    if (name === "phone") {
      const digits = normalizeDigits(value).slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digits }));
      if (touched.phone) {
        const next = validate({ ...formData, phone: digits });
        setErrors((prev) => ({ ...prev, phone: next.phone }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value } as FormData));

    if (touched[name]) {
      const next = validate({ ...formData, [name]: value } as FormData);
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  };

  const focusFirstError = (errs: Errors) => {
    const order: (keyof FormData)[] = [
      "parent_name",
      "email",
      "phone",
      "child_age",
      "programming_experience",
      "location",
      "educational_objectives",
      "referral_source",
    ];

    const first = order.find((k) => !!errs[k]) || (Object.keys(errs)[0] as keyof FormData | undefined);
    if (!first) return;

    const el = document.querySelector(`[name="${String(first)}"]`) as HTMLElement | null;
    el?.focus?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast({ type: "", message: "" });

    const submitErrors = validate(formData);
    setErrors(submitErrors);
    setTouched({
      parent_name: true,
      email: true,
      phone: true,
      child_age: true,
      programming_experience: true,
      location: true,
      educational_objectives: true,
      referral_source: true,
    });

    if (Object.keys(submitErrors).length > 0) {
      focusFirstError(submitErrors);
      setToast({ type: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    try {
      setLoading(true);

      const payload: FormData = {
        ...formData,
        parent_name: formData.parent_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        child_age: String(formData.child_age).trim(),
        programming_experience: formData.programming_experience,
        location: formData.location.trim(),
        educational_objectives: formData.educational_objectives.trim(),
        referral_source: formData.referral_source.trim(),
      };

      await axios.post("https://ritetutor.com/backend/api/strategycall/leads/create/", payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      setFormData(INITIAL_FORM);
      setErrors({});
      setTouched({});
      setToast({
        type: "success",
        message: "Request received! 🎉 We’ll email you shortly with next steps to schedule your strategy call.",
      });
    } catch (error: any) {
      console.error(error);

      const serverMsg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "";

      setToast({
        type: "error",
        message:
          serverMsg ||
          "Something went wrong while submitting. Please try again, or email hello@ritetutor.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Rite Tutor | Book Free Strategy Call | Global Coding Mentorship</title>
        <meta
          name="description"
          content="Start the conversation about your child's future. Book a free 30-minute strategy call with Rite Tutor. Serving families across the US and worldwide."
        />
        <link rel="canonical" href="https://www.ritetutor.com/contact" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="relative bg-card py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="container-wide">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Start the Conversation: <span className="text-primary">Your Free Strategy Call</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                This Isn't a Sales Pitch—It's a Partnership Discussion
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-background">
          <div className="container-wide">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground">
                We're selective about enrollment because quality mentorship requires careful mentor-student matching and
                manageable teaching loads. Not every family is right for Rite Tutor, and Rite Tutor isn't right for every
                child. That's why we begin with honest conversation, not high-pressure sales tactics.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What to Expect + Form */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-display font-bold mb-6">
                  During Your Complimentary <span className="text-primary">30-Minute Strategy Session</span>
                </h2>

                <div className="space-y-4">
                  {expectations.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-display font-bold">Contact Methods</h3>
                  <a
                    href="mailto:hello@ritetutor.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" /> hello@ritetutor.com
                  </a>
                  <a
                    href="tel:+19294218055"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" /> +1 (929) 421-8055
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Available Monday-Friday, 9 AM - 7 PM EST (Other times by appointment for international families)
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" /> Serving families worldwide
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-background p-8 rounded-2xl shadow-premium border border-border">
                  <h3 className="text-2xl font-display font-bold mb-6">Book Your Strategy Call</h3>

                  {toast.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-5 rounded-2xl border p-4 flex gap-3 ${
                        toast.type === "success"
                          ? "border-primary/30 bg-primary/5"
                          : "border-destructive/30 bg-destructive/5"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                          toast.type === "success" ? "bg-primary text-primary-foreground" : "bg-destructive text-white"
                        }`}
                      >
                        {toast.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {toast.type === "success" ? "Submitted Successfully" : "Please Check Your Details"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{toast.message}</p>
                      </div>
                    </motion.div>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {/* Parent Name */}
                    <div className="space-y-1">
                      <Input
                        name="parent_name"
                        value={formData.parent_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Parent/Guardian Name *"
                        className={`h-12 ${fieldError("parent_name") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                        required
                      />
                      {fieldError("parent_name") && <p className="text-xs text-destructive">{fieldError("parent_name")}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email Address *"
                        className={`h-12 ${fieldError("email") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                        required
                      />
                      {fieldError("email") && <p className="text-xs text-destructive">{fieldError("email")}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Phone Number (optional, 10 digits)"
                        className={`h-12 ${fieldError("phone") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                        inputMode="numeric"
                        maxLength={10}
                      />
                      <div className="flex items-center justify-between">
                        {fieldError("phone") ? (
                          <p className="text-xs text-destructive">{fieldError("phone")}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Digits only (no spaces or text).</p>
                        )}
                        <p className="text-xs text-muted-foreground">{(formData.phone || "").length}/10</p>
                      </div>
                    </div>

                    {/* Child Age */}
                    <div className="space-y-1">
                      <Input
                        name="child_age"
                        value={formData.child_age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Child's Age *"
                        className={`h-12 ${fieldError("child_age") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                        required
                        inputMode="numeric"
                      />
                      {fieldError("child_age") && <p className="text-xs text-destructive">{fieldError("child_age")}</p>}
                    </div>

                    {/* Programming Experience */}
                    <div className="space-y-1">
                      <select
                        name="programming_experience"
                        value={formData.programming_experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full h-12 px-3 rounded-md border border-border bg-background text-sm ${
                          fieldError("programming_experience") ? "border-destructive" : ""
                        }`}
                      >
                        <option value="">Current Programming Experience</option>
                        <option value="none">None</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                      {fieldError("programming_experience") && (
                        <p className="text-xs text-destructive">{fieldError("programming_experience")}</p>
                      )}
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Location/City (helps with timezone scheduling)"
                        className={`h-12 ${fieldError("location") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      />
                      {fieldError("location") && <p className="text-xs text-destructive">{fieldError("location")}</p>}
                    </div>

                    {/* Objectives */}
                    <div className="space-y-1">
                      <Textarea
                        name="educational_objectives"
                        value={formData.educational_objectives}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Educational Objectives: What are you hoping your child will achieve?"
                        rows={4}
                        className={`${fieldError("educational_objectives") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      />
                      <div className="flex items-center justify-between">
                        {fieldError("educational_objectives") ? (
                          <p className="text-xs text-destructive">{fieldError("educational_objectives")}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Optional — share goals, constraints, timeline.</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {(formData.educational_objectives || "").length}/1500
                        </p>
                      </div>
                    </div>

                    {/* Referral */}
                    <div className="space-y-1">
                      <Input
                        name="referral_source"
                        value={formData.referral_source}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="How did you hear about Rite Tutor? (optional)"
                        className={`h-12 ${fieldError("referral_source") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                      />
                      {fieldError("referral_source") && (
                        <p className="text-xs text-destructive">{fieldError("referral_source")}</p>
                      )}
                    </div>

                    <Button variant="hero" size="lg" className="w-full" type="submit" disabled={!canSubmit}>
                      {loading ? "Submitting..." : "Book Your Free Strategy Call"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Good Fit */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
                Who Should <span className="text-primary">Book a Strategy Call?</span>
              </h2>
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4">You're a Great Fit If:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {goodFit.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-card">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div key={faq.question} className="bg-background p-6 rounded-xl border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container-wide">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary-foreground">
                Ready to Transform Potential Into Excellence?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Your child's journey from curious explorer to confident builder starts with one simple step: Conversation.
                No commitment required. No credit card needed. No pressure tactics.
              </p>
              <Button variant="premium" size="xl" asChild>
                <a href="tel:+19294218055" className="group">
                  Call Now: +1 (929) 421-8055
                  <Phone className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;