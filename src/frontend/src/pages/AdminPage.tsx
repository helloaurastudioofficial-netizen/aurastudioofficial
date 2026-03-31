import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  Image as ImageIcon,
  Loader2,
  LogIn,
  LogOut,
  Palette,
  RefreshCw,
  ShieldCheck,
  ShieldX,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Status } from "../backend";
import type { OrderRecord } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllOrders,
  useIsAdmin,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const STATUS_LABELS: Record<Status, string> = {
  [Status.pending]: "Pending",
  [Status.inProgress]: "In Progress",
  [Status.completed]: "Completed",
};

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    [Status.pending]: "bg-secondary text-secondary-foreground border-border",
    [Status.inProgress]: "bg-accent/30 text-foreground border-accent/40",
    [Status.completed]: "bg-primary/20 text-foreground border-primary/40",
  };
  return (
    <Badge
      variant="outline"
      className={`font-sans text-xs rounded-full px-3 py-0.5 ${styles[status]}`}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function OrderRow({
  order,
  index,
}: {
  order: OrderRecord;
  index: number;
}) {
  const updateStatus = useUpdateOrderStatus();
  const orderId = String(index + 1);

  const handleStatusChange = async (newStatus: Status) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus });
      toast.success(`Status updated to ${STATUS_LABELS[newStatus]}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update status.",
      );
    }
  };

  return (
    <TableRow
      data-ocid={`admin.orders.item.${index + 1}`}
      className="hover:bg-secondary/30 transition-colors"
    >
      <TableCell className="font-sans text-sm font-medium text-foreground">
        <div className="flex flex-col">
          <span>{order.businessName}</span>
          <span className="text-xs text-muted-foreground">{order.niche}</span>
        </div>
      </TableCell>
      <TableCell className="font-sans text-sm text-foreground">
        {Number(order.numPosts)}
      </TableCell>
      <TableCell className="max-w-[180px]">
        <p className="font-sans text-xs text-muted-foreground line-clamp-2">
          {order.stylePreferences || "—"}
        </p>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <Palette className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{order.colorPalette || "—"}</span>
        </div>
      </TableCell>
      <TableCell>
        {order.logoURL ? (
          <a
            href={order.logoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary hover:underline font-sans text-xs"
          >
            <ImageIcon className="h-3 w-3" />
            View
          </a>
        ) : (
          <span className="font-sans text-xs text-muted-foreground">None</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span>{formatTimestamp(order.timestamp)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1.5">
          <StatusBadge status={order.status} />
          <Select
            value={order.status}
            onValueChange={(v) => handleStatusChange(v as Status)}
            disabled={updateStatus.isPending}
          >
            <SelectTrigger
              data-ocid={`admin.orders.item.${index + 1}.select`}
              className="h-7 rounded-lg border-border bg-card font-sans text-xs w-[120px] focus:ring-primary/40"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border bg-card">
              {Object.values(Status).map((s) => (
                <SelectItem
                  key={s}
                  value={s}
                  className="font-sans text-xs cursor-pointer"
                >
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: orders, isLoading: ordersLoading, refetch } = useGetAllOrders();

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" data-ocid="admin.link">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl gap-2 font-sans text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <img
              src="/assets/generated/aura-logo-transparent.png"
              alt="Aura Design Studio"
              className="h-9 w-auto object-contain"
            />
            <Badge
              variant="outline"
              className="font-sans text-xs bg-secondary border-border"
            >
              Admin Panel
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 font-sans text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[140px] truncate">
                  {identity?.getPrincipal().toString()}
                </span>
              </div>
            )}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-2 font-sans text-xs border-border hover:bg-secondary"
                onClick={handleLogout}
                data-ocid="admin.secondary_button"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 font-sans text-xs tracking-wide uppercase"
                onClick={handleLogin}
                disabled={isLoggingIn || isInitializing}
                data-ocid="admin.primary_button"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <LogIn className="h-3.5 w-3.5" />
                )}
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Not logged in */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            data-ocid="admin.panel"
            className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl text-foreground mb-2">
                Admin Access
              </h1>
              <p className="font-sans text-sm text-muted-foreground">
                Log in to view and manage all customer orders.
              </p>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2 font-sans text-xs tracking-widest uppercase px-8 py-5"
              onClick={handleLogin}
              disabled={isLoggingIn || isInitializing}
              data-ocid="admin.open_modal_button"
            >
              {isLoggingIn || isInitializing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isInitializing ? "Initializing..." : "Logging in..."}
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login to Continue
                </>
              )}
            </Button>
            {isInitializing && (
              <p
                data-ocid="admin.loading_state"
                className="font-sans text-xs text-muted-foreground"
              >
                Loading authentication...
              </p>
            )}
          </motion.div>
        )}

        {/* Checking admin status */}
        {isLoggedIn && isAdminLoading && (
          <div
            data-ocid="admin.loading_state"
            className="flex items-center justify-center min-h-[40vh] gap-3 text-muted-foreground"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="font-sans text-sm">Verifying admin access...</p>
          </div>
        )}

        {/* Not admin */}
        {isLoggedIn && !isAdminLoading && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="admin.error_state"
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldX className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl text-foreground">
              Access Denied
            </h2>
            <p className="font-sans text-sm text-muted-foreground max-w-sm">
              You don't have admin privileges. Contact the site owner to request
              access.
            </p>
            <Button
              variant="outline"
              className="rounded-xl gap-2 font-sans text-xs border-border hover:bg-secondary"
              onClick={handleLogout}
              data-ocid="admin.cancel_button"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Button>
          </motion.div>
        )}

        {/* Admin dashboard */}
        {isLoggedIn && !isAdminLoading && isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label mb-1">Dashboard</p>
                <h1 className="font-serif text-3xl text-foreground">
                  All Orders
                </h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-2 font-sans text-xs border-border hover:bg-secondary"
                onClick={() => refetch()}
                disabled={ordersLoading}
                data-ocid="admin.secondary_button"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${ordersLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Orders", value: orders?.length ?? 0, idx: 1 },
                {
                  label: "Pending",
                  value:
                    orders?.filter((o) => o.status === Status.pending).length ??
                    0,
                  idx: 2,
                },
                {
                  label: "Completed",
                  value:
                    orders?.filter((o) => o.status === Status.completed)
                      .length ?? 0,
                  idx: 3,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  data-ocid={`admin.stat.card.${stat.idx}`}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="font-serif text-3xl text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Orders table */}
            {ordersLoading ? (
              <div
                data-ocid="admin.orders.loading_state"
                className="flex items-center justify-center py-20 gap-3 text-muted-foreground"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="font-sans text-sm">Loading orders...</p>
              </div>
            ) : !orders || orders.length === 0 ? (
              <div
                data-ocid="admin.orders.empty_state"
                className="bg-card border border-border rounded-2xl p-16 text-center"
              >
                <p className="font-serif text-xl text-foreground mb-2">
                  No orders yet
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Orders from your website will appear here.
                </p>
              </div>
            ) : (
              <div
                data-ocid="admin.orders.table"
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs"
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border bg-secondary/30 hover:bg-secondary/30">
                        {[
                          "Business",
                          "Posts",
                          "Style",
                          "Colors",
                          "Logo",
                          "Submitted",
                          "Status",
                        ].map((h) => (
                          <TableHead
                            key={h}
                            className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <OrderRow
                          key={order.timestamp.toString()}
                          order={order}
                          index={i}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
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
