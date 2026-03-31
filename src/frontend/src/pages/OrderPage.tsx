import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Instagram,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Status } from "../backend";
import { useFileUpload } from "../hooks/useFileUpload";
import { useSubmitOrder } from "../hooks/useQueries";

const NICHES = [
  "Nail Artist",
  "Home Baker",
  "Boutique",
  "Restaurant / Café",
  "Skincare",
  "Jewelry",
  "Other",
];

const PACKAGES = [
  { label: "Single Post — ₹299", value: "299", posts: 1 },
  { label: "3 Posts — ₹799", value: "799", posts: 3 },
  { label: "6 Posts — ₹1,499 ⭐ Most Popular", value: "1499", posts: 6 },
  { label: "9 Posts — ₹2,499", value: "2499", posts: 9 },
];

export default function OrderPage() {
  const navigate = useNavigate();
  const submitOrder = useSubmitOrder();
  const { upload, uploading, progress } = useFileUpload();

  const [form, setForm] = useState({
    businessName: "",
    niche: "",
    numPosts: "",
    packageValue: "",
    stylePreferences: "",
    colorPalette: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const resolveNumPosts = () => {
    if (form.numPosts) return Number(form.numPosts);
    const pkg = PACKAGES.find((p) => p.value === form.packageValue);
    return pkg?.posts ?? 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.businessName.trim()) {
      toast.error("Please enter your business name.");
      return;
    }
    if (!form.niche) {
      toast.error("Please select your business niche.");
      return;
    }
    if (!form.packageValue) {
      toast.error("Please select a package.");
      return;
    }

    let logoURL = "";
    if (logoFile) {
      try {
        logoURL = await upload(logoFile);
      } catch {
        toast.error(
          "Logo upload failed — your order will be submitted without a logo.",
        );
      }
    }

    try {
      await submitOrder.mutateAsync({
        businessName: form.businessName.trim(),
        niche: form.niche,
        numPosts: BigInt(resolveNumPosts()),
        stylePreferences: form.stylePreferences.trim(),
        colorPalette: form.colorPalette.trim(),
        logoURL,
        status: Status.pending,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to submit order. Please try again.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          data-ocid="order.success_state"
          className="max-w-md w-full bg-card border border-border rounded-3xl p-10 text-center shadow-card"
        >
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl text-foreground mb-3">
            Order Submitted!
          </h2>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
            Your order has been submitted! We'll DM you on Instagram soon with
            the details and timeline.
          </p>
          <a
            href="https://www.instagram.com/aurastudioofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary hover:underline mb-6"
          >
            <Instagram className="h-4 w-4" />
            @aurastudioofficial
          </a>
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full rounded-xl font-sans text-xs tracking-widest uppercase border-border hover:bg-secondary"
              onClick={() => navigate({ to: "/" })}
              data-ocid="order.primary_button"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[760px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" data-ocid="order.link">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-xl gap-2 font-sans text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex-1">
            <img
              src="/assets/generated/aura-logo-transparent.png"
              alt="Aura Design Studio"
              className="h-9 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-[760px] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">Place Your Order</p>
          <h1 className="font-serif text-4xl text-foreground mb-2">
            Order Your Designs
          </h1>
          <p className="font-sans text-sm text-muted-foreground mb-8">
            Fill in your details and we'll get started on your aesthetic
            Instagram posts.
          </p>

          <form
            onSubmit={handleSubmit}
            data-ocid="order.modal"
            className="flex flex-col gap-6"
          >
            {/* Business Name */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="businessName"
                className="font-sans text-sm font-medium text-foreground"
              >
                Business Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="businessName"
                data-ocid="order.input"
                placeholder="e.g. Bloom Nail Studio"
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                required
                className="rounded-xl border-border bg-card font-sans text-sm h-11 focus-visible:ring-primary/40"
              />
            </div>

            {/* Niche */}
            <div className="flex flex-col gap-2">
              <Label className="font-sans text-sm font-medium text-foreground">
                Business Niche <span className="text-primary">*</span>
              </Label>
              <Select
                value={form.niche}
                onValueChange={(v) => set("niche", v)}
                required
              >
                <SelectTrigger
                  data-ocid="order.select"
                  className="rounded-xl border-border bg-card font-sans text-sm h-11 focus:ring-primary/40"
                >
                  <SelectValue placeholder="Select your niche" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-card">
                  {NICHES.map((n) => (
                    <SelectItem
                      key={n}
                      value={n}
                      className="font-sans text-sm cursor-pointer"
                    >
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Package */}
            <div className="flex flex-col gap-2">
              <Label className="font-sans text-sm font-medium text-foreground">
                Package <span className="text-primary">*</span>
              </Label>
              <Select
                value={form.packageValue}
                onValueChange={(v) => {
                  const pkg = PACKAGES.find((p) => p.value === v);
                  set("packageValue", v);
                  if (pkg) set("numPosts", String(pkg.posts));
                }}
                required
              >
                <SelectTrigger
                  data-ocid="order.select"
                  className="rounded-xl border-border bg-card font-sans text-sm h-11 focus:ring-primary/40"
                >
                  <SelectValue placeholder="Choose a package" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-card">
                  {PACKAGES.map((p) => (
                    <SelectItem
                      key={p.value}
                      value={p.value}
                      className="font-sans text-sm cursor-pointer"
                    >
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Posts */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="numPosts"
                className="font-sans text-sm font-medium text-foreground"
              >
                Number of Posts
              </Label>
              <Input
                id="numPosts"
                data-ocid="order.input"
                type="number"
                min={1}
                max={50}
                placeholder="e.g. 6"
                value={form.numPosts}
                onChange={(e) => set("numPosts", e.target.value)}
                className="rounded-xl border-border bg-card font-sans text-sm h-11 focus-visible:ring-primary/40"
              />
              <p className="font-sans text-xs text-muted-foreground">
                Auto-filled from your chosen package, or override manually.
              </p>
            </div>

            {/* Style Preferences */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="stylePreferences"
                className="font-sans text-sm font-medium text-foreground"
              >
                Style Preferences
              </Label>
              <Textarea
                id="stylePreferences"
                data-ocid="order.textarea"
                placeholder="Describe the vibe, mood, and aesthetic you're going for... e.g. minimal pastel, luxury dark, playful bright"
                value={form.stylePreferences}
                onChange={(e) => set("stylePreferences", e.target.value)}
                className="rounded-xl border-border bg-card font-sans text-sm min-h-28 focus-visible:ring-primary/40 resize-none"
              />
            </div>

            {/* Color Palette */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="colorPalette"
                className="font-sans text-sm font-medium text-foreground"
              >
                Color Palette
              </Label>
              <Input
                id="colorPalette"
                data-ocid="order.input"
                placeholder="e.g. Dusty rose, cream, gold"
                value={form.colorPalette}
                onChange={(e) => set("colorPalette", e.target.value)}
                className="rounded-xl border-border bg-card font-sans text-sm h-11 focus-visible:ring-primary/40"
              />
            </div>

            {/* Logo Upload */}
            <div className="flex flex-col gap-2">
              <Label className="font-sans text-sm font-medium text-foreground">
                Logo Upload
              </Label>
              {logoPreview ? (
                <div className="relative inline-flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-12 h-12 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">
                      {logoFile?.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {logoFile
                        ? `${(logoFile.size / 1024).toFixed(0)} KB`
                        : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="order.delete_button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="logo-upload"
                  data-ocid="order.upload_button"
                  className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer bg-card hover:bg-secondary/50 transition-colors"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-sans text-sm font-medium text-foreground">
                      Click to upload your logo
                    </p>
                    <p className="font-sans text-xs text-muted-foreground mt-1">
                      PNG, JPG or SVG (max 5 MB)
                    </p>
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              )}
              {uploading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading logo... {progress}%
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-border">
              <Button
                type="submit"
                data-ocid="order.submit_button"
                disabled={submitOrder.isPending || uploading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-sans text-xs tracking-widest uppercase py-5 gap-2"
              >
                {submitOrder.isPending || uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {uploading ? "Uploading logo..." : "Submitting order..."}
                  </>
                ) : (
                  "Submit Order"
                )}
              </Button>
              {submitOrder.isPending && (
                <p
                  data-ocid="order.loading_state"
                  className="text-center font-sans text-xs text-muted-foreground mt-3"
                >
                  Processing your order...
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
