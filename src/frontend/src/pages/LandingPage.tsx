import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Instagram,
  Layers,
  LayoutGrid,
  Mail,
  MessageCircle,
  Package,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useState } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/aurastudioofficial";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header
        data-ocid="nav.section"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-xs border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0" data-ocid="nav.link">
            <img
              src="/assets/generated/aura-logo-transparent.png"
              alt="Aura Design Studio"
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </a>

          {/* Nav Links */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {[
              ["Home", "#home"],
              ["About", "#about"],
              ["Services", "#services"],
              ["Portfolio", "#portfolio"],
              ["Pricing", "#pricing"],
              ["How to Order", "#how-to-order"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                data-ocid="nav.link"
                className="text-xs font-sans font-medium tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.primary_button"
          >
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-sans text-xs tracking-widest uppercase px-5"
            >
              Get Started
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-secondary/60 blob-1" />
          <div className="absolute bottom-12 -left-12 w-64 h-64 bg-accent/25 blob-2" />
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-secondary/40 blob-3" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeUp} className="section-label">
                ✦ Aesthetic Instagram Design
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl lg:text-6xl leading-[1.12] text-foreground"
              >
                Scroll-Stopping
                <span className="block italic text-primary"> Instagram</span>
                Designs for Your Business
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-sans text-base text-muted-foreground leading-relaxed max-w-md"
              >
                Helping small businesses grow with clean, engaging posts — nail
                artists, home bakers, boutiques, cafés, and more.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 pt-2"
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.primary_button"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-sans text-xs tracking-widest uppercase px-7 py-5 gap-2">
                    <Instagram className="h-4 w-4" />
                    DM to Get Started
                  </Button>
                </a>
                <Link to="/order" data-ocid="hero.secondary_button">
                  <Button
                    variant="outline"
                    className="rounded-xl font-sans text-xs tracking-widest uppercase px-7 py-5 border-border hover:bg-secondary gap-2"
                  >
                    Place an Order
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — circular image + blobs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              {/* Decorative blobs behind image */}
              <div className="absolute w-80 h-80 bg-secondary/70 blob-1 -z-0" />
              <div className="absolute w-64 h-64 bg-accent/30 blob-2 translate-x-8 translate-y-8 -z-0" />
              {/* Circular image */}
              <div className="relative z-10 w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-card shadow-card-hover">
                <img
                  src="/assets/generated/hero-desk-flatlay.dim_800x800.jpg"
                  alt="Aesthetic design desk flat-lay"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-2 shadow-card z-20">
                <p className="font-sans text-xs text-muted-foreground">
                  ✦ Trusted by
                </p>
                <p className="font-serif text-xl text-foreground">50+ Brands</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT + SERVICES */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* ABOUT */}
            <motion.div
              id="about"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              <motion.p variants={fadeUp} className="section-label">
                About
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-3xl lg:text-4xl leading-snug text-foreground"
              >
                Creating Visual Stories
              </motion.h2>
              <motion.div variants={fadeUp} className="w-10 h-0.5 bg-primary" />
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm text-muted-foreground leading-7"
              >
                Hi, I'm the designer behind{" "}
                <span className="text-foreground font-medium">Aura Studio</span>
                . I create modern and aesthetic Instagram posts for small
                businesses — nail artists, home bakers, boutiques, cafés,
                skincare brands, and more.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm text-muted-foreground leading-7"
              >
                Every design I craft is thoughtfully tailored to your brand's
                personality — clean, minimal, and made to stop the scroll.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                data-ocid="about.link"
              >
                <Instagram className="h-4 w-4" />
                @aurastudioofficial
              </motion.a>
            </motion.div>

            {/* SERVICES */}
            <motion.div
              id="services"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              <motion.p variants={fadeUp} className="section-label">
                Services
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-serif text-3xl lg:text-4xl leading-snug text-foreground"
              >
                Aesthetic Instagram Solutions
              </motion.h2>
              <motion.div variants={fadeUp} className="w-10 h-0.5 bg-primary" />
              <motion.div
                variants={staggerContainer}
                className="flex flex-col gap-4 mt-2"
              >
                {[
                  {
                    icon: <LayoutGrid className="h-5 w-5" />,
                    title: "Instagram Post Design",
                    desc: "Single-frame posts crafted to reflect your brand voice and stop the scroll — minimal, bold, or pastel.",
                  },
                  {
                    icon: <Layers className="h-5 w-5" />,
                    title: "Carousel Design",
                    desc: "Multi-slide carousel posts that educate, inspire, and drive saves — designed with cohesive flow.",
                  },
                  {
                    icon: <Smartphone className="h-5 w-5" />,
                    title: "Story Design",
                    desc: "Vertical story templates for promotions, announcements, and daily engagement.",
                  },
                ].map((s) => (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    className="flex gap-4 p-4 bg-card border border-border rounded-xl shadow-xs hover:shadow-card transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-foreground mb-1">
                        {s.title}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="section-label">
              Portfolio
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-foreground mt-3"
            >
              Our Instagram Portfolio
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="w-10 h-0.5 bg-primary mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              {
                src: "/assets/generated/portfolio-nails.dim_600x600.jpg",
                label: "Nail Studio",
                idx: 1,
              },
              {
                src: "/assets/generated/portfolio-bakery.dim_600x600.jpg",
                label: "Home Bakery",
                idx: 2,
              },
              {
                src: "/assets/generated/portfolio-boutique.dim_600x600.jpg",
                label: "Fashion Boutique",
                idx: 3,
              },
              {
                src: "/assets/generated/portfolio-cafe.dim_600x600.jpg",
                label: "Café & Restaurant",
                idx: 4,
              },
              {
                src: "/assets/generated/portfolio-skincare.dim_600x600.jpg",
                label: "Skincare",
                idx: 5,
              },
              {
                src: "/assets/generated/portfolio-jewelry.dim_600x600.jpg",
                label: "Jewelry",
                idx: 6,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                data-ocid={`portfolio.item.${item.idx}`}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-xs hover:shadow-card-hover transition-all duration-300"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-sans text-xs font-semibold text-primary-foreground tracking-wide uppercase bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-secondary/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="section-label">
              Pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-foreground mt-3"
            >
              Design Packages
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="w-10 h-0.5 bg-primary mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              {
                price: "₹299",
                name: "Single Post",
                posts: 1,
                features: [
                  "1 custom post",
                  "2 revision rounds",
                  "HD file delivery",
                  "48hr turnaround",
                ],
                popular: false,
                idx: 1,
              },
              {
                price: "₹799",
                name: "3 Posts",
                posts: 3,
                features: [
                  "3 custom posts",
                  "2 revision rounds",
                  "Cohesive theme",
                  "3-day delivery",
                ],
                popular: false,
                idx: 2,
              },
              {
                price: "₹1,499",
                name: "6 Posts",
                posts: 6,
                features: [
                  "6 custom posts",
                  "Unlimited revisions",
                  "Brand consistency",
                  "5-day delivery",
                ],
                popular: true,
                idx: 3,
              },
              {
                price: "₹2,499",
                name: "9 Posts",
                posts: 9,
                features: [
                  "9 custom posts",
                  "Unlimited revisions",
                  "Full content plan",
                  "7-day delivery",
                ],
                popular: false,
                idx: 4,
              },
            ].map((pkg) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                data-ocid={`pricing.item.${pkg.idx}`}
                className={`relative flex flex-col rounded-2xl p-6 border bg-card shadow-xs hover:shadow-card transition-all ${
                  pkg.popular
                    ? "border-primary shadow-card ring-2 ring-primary/30"
                    : "border-border"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-sans text-xs tracking-widest uppercase px-3 py-1 rounded-full gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="mb-4">
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    {pkg.name}
                  </p>
                  <p className="font-serif text-4xl text-foreground">
                    {pkg.price}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 font-sans text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/order" data-ocid={`pricing.item.${pkg.idx}.button`}>
                  <Button
                    className={`w-full rounded-xl font-sans text-xs tracking-widest uppercase ${
                      pkg.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Order Now
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="how-to-order" className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="section-label">
              How to Order
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-foreground mt-3"
            >
              Simplifying Your Journey
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="w-10 h-0.5 bg-primary mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                step: "01",
                icon: <MessageCircle className="h-6 w-6" />,
                title: "DM Your Requirement",
                desc: "Reach out on Instagram with your business details and design ideas.",
                idx: 1,
              },
              {
                step: "02",
                icon: <Package className="h-6 w-6" />,
                title: "Choose Package",
                desc: "Select the post package that suits your budget and content needs.",
                idx: 2,
              },
              {
                step: "03",
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: "Confirm Order",
                desc: "Fill in the order form with your brand details and style preferences.",
                idx: 3,
              },
              {
                step: "04",
                icon: <Sparkles className="h-6 w-6" />,
                title: "Get Your Designs",
                desc: "Receive your beautiful, ready-to-post Instagram designs on time.",
                idx: 4,
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                data-ocid={`how-to-order.item.${step.idx}`}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-shadow"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 font-sans text-xs font-bold text-muted-foreground bg-background border border-border rounded-full w-5 h-5 flex items-center justify-center leading-none">
                    {step.idx}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-foreground mb-2">
                    {step.title}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="py-24 bg-secondary/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center flex flex-col items-center gap-6"
          >
            <motion.p variants={fadeUp} className="section-label">
              Contact
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-foreground max-w-xl leading-tight"
            >
              Ready to Upgrade Your Brand?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed"
            >
              Let's create Instagram content that reflects your brand's unique
              personality and makes your audience stop scrolling.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 items-center mt-2"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.primary_button"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-sans text-xs tracking-widest uppercase px-8 py-5 gap-2">
                  <Instagram className="h-4 w-4" />
                  DM "DESIGN" on Instagram
                </Button>
              </a>
              <Link to="/order" data-ocid="contact.secondary_button">
                <Button
                  variant="outline"
                  className="rounded-xl font-sans text-xs tracking-widest uppercase px-8 py-5 border-border hover:bg-secondary gap-2"
                >
                  Place an Order
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.a
              variants={fadeUp}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline mt-2"
              data-ocid="contact.link"
            >
              <Instagram className="h-4 w-4" />
              @aurastudioofficial
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <img
                src="/assets/generated/aura-logo-transparent.png"
                alt="Aura Design Studio"
                className="h-10 w-auto object-contain object-left mix-blend-multiply"
              />
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Modern, aesthetic Instagram designs for small businesses.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-foreground">
                Contact
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
                data-ocid="footer.link"
              >
                <Instagram className="h-3.5 w-3.5" />
                @aurastudioofficial
              </a>
              <a
                href="mailto:helloaurastudioofficial@gmail.com"
                className="flex items-center gap-2 font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
                data-ocid="footer.link"
              >
                <Mail className="h-3.5 w-3.5" />
                helloaurastudioofficial@gmail.com
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-foreground">
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {[
                  ["Portfolio", "#portfolio"],
                  ["Pricing", "#pricing"],
                  ["Place an Order", "/order"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    {label}
                  </a>
                ))}
                <Link
                  to="/admin"
                  className="font-sans text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-2"
                  data-ocid="footer.link"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-sans text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Aura Design Studio. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors flex items-center gap-1"
            >
              Built with <Heart className="h-3 w-3 text-primary fill-primary" />{" "}
              using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
