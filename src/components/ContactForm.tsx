import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "@/data/countryCodes";

type FormData = {
  parent_name: string;
  email: string;
  phone: string; // national digits only
  country_code: string; // ISO code
  child_age: string;
  programming_experience: "" | "none" | "beginner" | "intermediate" | "advanced";
  location: string;
  educational_objectives: string;
  referral_source: string;
  // honeypot
  website: string;
};

type Errors = Partial<Record<keyof FormData, string>>;
type Touched = Partial<Record<keyof FormData, boolean>>;
type ToastState = { type: "" | "success" | "error"; message: string };

const INITIAL_FORM: FormData = {
  parent_name: "",
  email: "",
  phone: "",
  country_code: DEFAULT_COUNTRY.code,
  child_age: "",
  programming_experience: "",
  location: "",
  educational_objectives: "",
  referral_source: "",
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const normalizeDigits = (v: string) => String(v || "").replace(/\D/g, "");

const findCountry = (iso: string): Country =>
  COUNTRIES.find((c) => c.code === iso) || DEFAULT_COUNTRY;

const generateToken = (len = 7) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) out += chars[arr[i] % chars.length];
  return out;
};

const SUBMIT_COOLDOWN_MS = 8000;

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export function ContactForm({ onSuccess, compact = false }: ContactFormProps) {
  const navigate = useNavigate();
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

    const country = findCountry(data.country_code);
    const phoneDigits = normalizeDigits(data.phone);
    if (phoneDigits) {
      if (phoneDigits.length < country.min || phoneDigits.length > country.max) {
        e.phone =
          country.min === country.max
            ? `Phone must be exactly ${country.min} digits for ${country.name}.`
            : `Phone must be ${country.min}-${country.max} digits for ${country.name}.`;
      }
    }

    const ageRaw = String(data.child_age || "").trim();
    if (!ageRaw) e.child_age = "Child's age is required.";
    else if (!/^\d+$/.test(ageRaw)) e.child_age = "Age must contain numbers only.";
    else {
      const age = Number(ageRaw);
      if (age < 3 || age > 25) e.child_age = "Please enter an age between 3 and 25.";
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
  const country = findCountry(formData.country_code);

  const fieldError = (name: keyof FormData) =>
    touched[name] ? (errors[name] || currentErrors[name] || "") : "";

  const markTouched = (name: keyof FormData) => setTouched((p) => ({ ...p, [name]: true }));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof FormData;
    markTouched(name);
    const next = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value;

    if (name === "phone") {
      const c = findCountry(formData.country_code);
      const digits = normalizeDigits(value).slice(0, c.max);
      setFormData((prev) => ({ ...prev, phone: digits }));
      if (touched.phone)
        setErrors((prev) => ({ ...prev, phone: validate({ ...formData, phone: digits }).phone }));
      return;
    }

    if (name === "country_code") {
      const c = findCountry(value);
      const digits = normalizeDigits(formData.phone).slice(0, c.max);
      const next = { ...formData, country_code: value, phone: digits };
      setFormData(next);
      if (touched.phone) setErrors((prev) => ({ ...prev, phone: validate(next).phone }));
      return;
    }

    if (name === "child_age") {
      const digits = normalizeDigits(value).slice(0, 2);
      setFormData((prev) => ({ ...prev, child_age: digits }));
      if (touched.child_age)
        setErrors((prev) => ({ ...prev, child_age: validate({ ...formData, child_age: digits }).child_age }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value } as FormData));
    if (touched[name]) {
      const next = validate({ ...formData, [name]: value } as FormData);
      setErrors((prev) => ({ ...prev, [name]: next[name] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast({ type: "", message: "" });

    if (formData.website) {
      navigate(`/thank-you/${generateToken()}`);
      return;
    }

    try {
      const last = Number(sessionStorage.getItem("rt_last_submit") || "0");
      if (last && Date.now() - last < SUBMIT_COOLDOWN_MS) {
        setToast({ type: "error", message: "Please wait a moment before submitting again." });
        return;
      }
    } catch {}

    const submitErrors = validate(formData);
    setErrors(submitErrors);
    setTouched({
      parent_name: true, email: true, phone: true, country_code: true, child_age: true,
      programming_experience: true, location: true, educational_objectives: true, referral_source: true,
    });
    if (Object.keys(submitErrors).length > 0) {
      setToast({ type: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    try {
      setLoading(true);
      const { website, country_code, phone, ...rest } = formData;
      const fullPhone = phone ? `+${country.dial}${phone}` : "";
      await axios.post("https://ritetutor.com/backend/api/strategycall/leads/create/", {
        ...rest,
        phone: fullPhone,
        country_code: country.code,
        country_dial_code: `+${country.dial}`,
        parent_name: rest.parent_name.trim(),
        email: rest.email.trim(),
        location: rest.location.trim(),
        educational_objectives: rest.educational_objectives.trim(),
        referral_source: rest.referral_source.trim(),
      }, { headers: { "Content-Type": "application/json" }, timeout: 20000 });

      try { sessionStorage.setItem("rt_last_submit", String(Date.now())); } catch {}
      setFormData(INITIAL_FORM);
      setErrors({});
      setTouched({});
      onSuccess?.();
      navigate(`/thank-you/${generateToken()}`);
    } catch (error: any) {
      console.error(error);
      const serverMsg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "";
      setToast({
        type: "error",
        message: serverMsg || "Something went wrong while submitting. Please try again, or email hello@ritetutor.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? "" : ""}>
      {toast.message && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-5 rounded-2xl border p-4 flex gap-3 ${
            toast.type === "success" ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
            toast.type === "success" ? "bg-primary text-primary-foreground" : "bg-destructive text-white"
          }`}>
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
        {/* honeypot */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="space-y-1">
          <Input name="parent_name" value={formData.parent_name} onChange={handleChange} onBlur={handleBlur}
            placeholder="Parent/Guardian Name *" className={`h-12 ${fieldError("parent_name") ? "border-destructive" : ""}`} required />
          {fieldError("parent_name") && <p className="text-xs text-destructive">{fieldError("parent_name")}</p>}
        </div>

        <div className="space-y-1">
          <Input name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
            placeholder="Email Address *" className={`h-12 ${fieldError("email") ? "border-destructive" : ""}`} required />
          {fieldError("email") && <p className="text-xs text-destructive">{fieldError("email")}</p>}
        </div>

        <div className="space-y-1">
          <div className={`flex gap-2 ${fieldError("phone") ? "" : ""}`}>
            <select
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-label="Country code"
              className="h-12 px-2 rounded-md border border-border bg-background text-sm max-w-[42%] sm:max-w-[180px]"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} (+{c.dial})
                </option>
              ))}
            </select>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={`Phone (optional, ${country.min === country.max ? country.min : `${country.min}-${country.max}`} digits)`}
              className={`h-12 flex-1 ${fieldError("phone") ? "border-destructive" : ""}`}
              inputMode="numeric"
              maxLength={country.max}
            />
          </div>
          {fieldError("phone") && <p className="text-xs text-destructive">{fieldError("phone")}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input
              name="child_age"
              value={formData.child_age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Child's Age *"
              className={`h-12 ${fieldError("child_age") ? "border-destructive" : ""}`}
              required
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={2}
              onKeyDown={(e) => {
                if (
                  ["e", "E", "+", "-", ".", ","].includes(e.key)
                ) e.preventDefault();
              }}
            />
            {fieldError("child_age") && <p className="text-xs text-destructive">{fieldError("child_age")}</p>}
          </div>
          <div className="space-y-1">
            <select name="programming_experience" value={formData.programming_experience} onChange={handleChange} onBlur={handleBlur}
              className={`w-full h-12 px-3 rounded-md border border-border bg-background text-sm ${fieldError("programming_experience") ? "border-destructive" : ""}`}>
              <option value="">Programming Experience</option>
              <option value="none">None</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <Input name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur}
            placeholder="Location/City (helps with timezone scheduling)" className="h-12" />
        </div>

        <div className="space-y-1">
          <Textarea name="educational_objectives" value={formData.educational_objectives} onChange={handleChange} onBlur={handleBlur}
            placeholder="Educational Objectives: What are you hoping your child will achieve?" rows={compact ? 3 : 4} />
        </div>

        <div className="space-y-1">
          <Input name="referral_source" value={formData.referral_source} onChange={handleChange} onBlur={handleBlur}
            placeholder="How did you hear about Rite Tutor? (optional)" className="h-12" />
        </div>

        <Button variant="hero" size="lg" className="w-full" type="submit" disabled={!canSubmit}>
          {loading ? "Submitting..." : "Book Your Free Strategy Call"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          By submitting, you agree to be contacted about Rite Tutor programs. No spam, ever.
        </p>
      </form>
    </div>
  );
}
