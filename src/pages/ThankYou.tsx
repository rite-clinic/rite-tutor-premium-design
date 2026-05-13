import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Phone, Clock, ArrowLeft } from "lucide-react";

const REDIRECT_SECONDS = 8;

const ThankYou = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  // Validate token shape — if someone hits /thank-you/garbage, still show page but no token-leak
  const safeToken = (token || "").replace(/[^A-Z0-9]/gi, "").slice(0, 16) || "—";

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    const redirect = setTimeout(() => navigate("/", { replace: true }), REDIRECT_SECONDS * 1000);
    return () => {
      clearInterval(tick);
      clearTimeout(redirect);
    };
  }, [navigate]);

  const progress = ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100;

  return (
    <>
      <Helmet>
        <title>Thank You | Rite Tutor</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Layout>
        <section className="min-h-[70vh] py-20 bg-card">
          <div className="container-wide">
            <motion.div
              className="max-w-2xl mx-auto bg-background rounded-3xl border border-border shadow-premium-lg p-8 sm:p-12 text-center"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">
                Thank You! Your Request Has Been Received
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Our team will contact you shortly to schedule your free strategy call.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Reference ID: <span className="font-mono font-semibold text-foreground">{safeToken}</span>
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Within 24 hours</p>
                    <p className="text-xs text-muted-foreground">A mentor coordinator will email you to schedule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Check your inbox</p>
                    <p className="text-xs text-muted-foreground">Confirmation sent — also check spam folder.</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Redirecting to home in {secondsLeft}s</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="tel:+19294218055" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> +1 (929) 421-8055
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ThankYou;
