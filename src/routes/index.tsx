import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Package,
  ReceiptText,
  LineChart,
  FileText,
  Truck,
  Settings,
  Users,
  MoreHorizontal,
  TrendingUp,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Send,
  Info,
  Percent,
  RotateCcw,
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
  Download,
  Filter,
  Eye,
  RefreshCw,
  Store,
  Building2,
  ShieldCheck,
  MapPin,
  Check,
  Plus,
  Box,
  Layers,
  ChevronRight,
  CheckCheck,
  Undo2,
  ArrowUpDown,
  Phone,
  Calendar,
  AlertCircle,
  ShoppingBag,
  FileSpreadsheet,
  Barcode,
  Archive,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/")({
  component: DashboardApp,
  head: () => ({
    meta: [
      { title: "OmniFlow OMS — Order Management System" },
      {
        name: "description",
        content:
          "Unified order, inventory, fulfillment and dispatch management across Shopify, Myntra, and Amazon.",
      },
      { property: "og:title", content: "OmniFlow OMS — Order Management System" },
      {
        property: "og:description",
        content:
          "Simple, non-tech friendly Order Management System for retail and warehouse operations.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

/* ================================================================
   SHARED TYPES & MOCK DATA
   ================================================================ */

type PageTab = "dashboard" | "orders" | "returns" | "inventory" | "suppliers";
type Platform = "Shopify" | "Myntra" | "Amazon";
type OrderStatus =
  "Needs Packing" | "Ready to Ship" | "In Transit" | "Delivered" | "Return Pending";

const salesTrend7Days = [
  {
    day: "Mon",
    date: "Oct 23",
    orders: 142,
    sales: 168000,
    shopify: 68000,
    myntra: 58000,
    amazon: 42000,
  },
  {
    day: "Tue",
    date: "Oct 24",
    orders: 156,
    sales: 182000,
    shopify: 74000,
    myntra: 62000,
    amazon: 46000,
  },
  {
    day: "Wed",
    date: "Oct 25",
    orders: 168,
    sales: 195000,
    shopify: 81000,
    myntra: 66000,
    amazon: 48000,
  },
  {
    day: "Thu",
    date: "Oct 26",
    orders: 174,
    sales: 204000,
    shopify: 85000,
    myntra: 70000,
    amazon: 49000,
  },
  {
    day: "Fri",
    date: "Oct 27",
    orders: 215,
    sales: 254000,
    shopify: 104000,
    myntra: 86000,
    amazon: 64000,
  },
  {
    day: "Sat",
    date: "Oct 28",
    orders: 198,
    sales: 232000,
    shopify: 96000,
    myntra: 79000,
    amazon: 57000,
  },
  {
    day: "Sun",
    date: "Oct 29",
    orders: 195,
    sales: 210000,
    shopify: 88000,
    myntra: 73000,
    amazon: 49000,
  },
];

const salesTrend30Days = [
  {
    day: "Week 1",
    date: "Oct 1-7",
    orders: 980,
    sales: 1140000,
    shopify: 480000,
    myntra: 380000,
    amazon: 280000,
  },
  {
    day: "Week 2",
    date: "Oct 8-14",
    orders: 1120,
    sales: 1320000,
    shopify: 540000,
    myntra: 450000,
    amazon: 330000,
  },
  {
    day: "Week 3",
    date: "Oct 15-21",
    orders: 1210,
    sales: 1410000,
    shopify: 580000,
    myntra: 490000,
    amazon: 340000,
  },
  {
    day: "Week 4",
    date: "Oct 22-29",
    orders: 1248,
    sales: 1445000,
    shopify: 596000,
    myntra: 504000,
    amazon: 345000,
  },
];

const marketplaceSales = [
  { name: "Shopify", value: 498000, orders: 498, pct: 40, color: "#10b981" },
  { name: "Myntra", value: 435000, orders: 436, pct: 35, color: "#ec4899" },
  { name: "Amazon", value: 312000, orders: 314, pct: 25, color: "#f59e0b" },
];

const totalSalesData = {
  total: "₹12,45,000",
  delta: "+₹1.2L vs last week",
  mix: [
    { platform: "Shopify" as Platform, pct: 40 },
    { platform: "Myntra" as Platform, pct: 35 },
    { platform: "Amazon" as Platform, pct: 25 },
  ],
};

const fullOrdersList = [
  {
    id: "ORD-24815",
    customer: "Priya Sharma",
    phone: "+91 98201 44521",
    city: "Mumbai, MH",
    platform: "Shopify" as Platform,
    product: "Summer Breeze Linen Shirt",
    sku: "SKU-SHIRT-001",
    variant: "Beige · Size M · Qty 2",
    image: "https://picsum.photos/seed/oms-linen/64/64",
    status: "Needs Packing" as OrderStatus,
    payment: "Prepaid (UPI)",
    carrier: "Blue Dart",
    total: "₹2,499",
    placedAt: "10 mins ago",
  },
  {
    id: "ORD-24814",
    customer: "Ananya Iyer",
    phone: "+91 94481 99201",
    city: "Bengaluru, KA",
    platform: "Myntra" as Platform,
    product: "Coastal Stripe Kaftan",
    sku: "SKU-DRESS-004",
    variant: "Ivory · Size S · Qty 1",
    image: "https://picsum.photos/seed/oms-kaftan/64/64",
    status: "Ready to Ship" as OrderStatus,
    payment: "Prepaid (Card)",
    carrier: "Delhivery",
    total: "₹1,899",
    placedAt: "25 mins ago",
  },
  {
    id: "ORD-24813",
    customer: "Rohan Verma",
    phone: "+91 98110 32190",
    city: "New Delhi, DL",
    platform: "Amazon" as Platform,
    product: "Breeze Layered Maxi Dress",
    sku: "SKU-DRESS-011",
    variant: "Teal · Size L · Qty 1",
    image: "https://picsum.photos/seed/oms-maxi/64/64",
    status: "In Transit" as OrderStatus,
    payment: "Prepaid",
    carrier: "Amazon ATS",
    total: "₹3,299",
    placedAt: "45 mins ago",
  },
  {
    id: "ORD-24812",
    customer: "Siddharth Rao",
    phone: "+91 99890 12044",
    city: "Hyderabad, TS",
    platform: "Myntra" as Platform,
    product: "Monsoon Poplin Co-ord Set",
    sku: "SKU-CORD-002",
    variant: "Sand · Size M · Qty 1",
    image: "https://picsum.photos/seed/oms-cord/64/64",
    status: "Return Pending" as OrderStatus,
    payment: "COD",
    carrier: "Delhivery",
    total: "₹2,149",
    placedAt: "1 hour ago",
  },
  {
    id: "ORD-24811",
    customer: "Vikram Malhotra",
    phone: "+91 97654 22019",
    city: "Pune, MH",
    platform: "Amazon" as Platform,
    product: "Terra Oversized Tee",
    sku: "SKU-TSHIRT-007",
    variant: "Olive · Size XL · Qty 3",
    image: "https://picsum.photos/seed/oms-tee/64/64",
    status: "In Transit" as OrderStatus,
    payment: "Prepaid",
    carrier: "Amazon ATS",
    total: "₹899",
    placedAt: "2 hours ago",
  },
  {
    id: "ORD-24810",
    customer: "Meera Patel",
    phone: "+91 98250 88123",
    city: "Ahmedabad, GJ",
    platform: "Shopify" as Platform,
    product: "Riviera Rayon Palazzo",
    sku: "SKU-BOTTOM-009",
    variant: "Rust · Size S · Qty 1",
    image: "https://picsum.photos/seed/oms-palazzo/64/64",
    status: "Delivered" as OrderStatus,
    payment: "Prepaid (UPI)",
    carrier: "Blue Dart",
    total: "₹1,299",
    placedAt: "3 hours ago",
  },
  {
    id: "ORD-24809",
    customer: "Neha Kapoor",
    phone: "+91 98761 00293",
    city: "Chandigarh, PB",
    platform: "Myntra" as Platform,
    product: "Beach Duster Kimono",
    sku: "SKU-KIMONO-003",
    variant: "Blush · Size M · Qty 1",
    image: "https://picsum.photos/seed/oms-kimono/64/64",
    status: "Needs Packing" as OrderStatus,
    payment: "COD",
    carrier: "Delhivery",
    total: "₹1,749",
    placedAt: "4 hours ago",
  },
];

const returnsList = [
  {
    returnId: "RET-9014",
    orderId: "ORD-24812",
    customer: "Siddharth Rao",
    phone: "+91 99890 12044",
    product: "Monsoon Poplin Co-ord Set",
    image: "https://picsum.photos/seed/oms-cord/64/64",
    platform: "Myntra" as Platform,
    reason: "Size Issue (Too tight at waist)",
    type: "Customer Return",
    status: "Reverse Pickup Scheduled",
    awb: "DEL-REV-49210",
    carrier: "Delhivery Surface",
    amount: "₹2,149",
    requestedAt: "Today, 11:20 AM",
  },
  {
    returnId: "RET-9013",
    orderId: "ORD-24790",
    customer: "Kavita Nair",
    phone: "+91 98450 77123",
    product: "Summer Breeze Linen Shirt",
    image: "https://picsum.photos/seed/oms-linen/64/64",
    platform: "Shopify" as Platform,
    reason: "Customer Not Available (3 attempts)",
    type: "Courier RTO",
    status: "Arrived at Warehouse Bay 2",
    awb: "BLU-RTO-88120",
    carrier: "Blue Dart",
    amount: "₹1,299",
    requestedAt: "Yesterday",
  },
  {
    returnId: "RET-9012",
    orderId: "ORD-24755",
    customer: "Arjun Singhal",
    phone: "+91 98101 22934",
    product: "Terra Oversized Tee",
    image: "https://picsum.photos/seed/oms-tee/64/64",
    platform: "Amazon" as Platform,
    reason: "Exchange for Size L (Ordered XL)",
    type: "Size Exchange",
    status: "Quality Inspection Passed",
    awb: "ATS-EXC-30192",
    carrier: "Amazon ATS",
    amount: "₹899",
    requestedAt: "Oct 27",
  },
  {
    returnId: "RET-9011",
    orderId: "ORD-24720",
    customer: "Divya Nambiar",
    phone: "+91 94470 33810",
    product: "Breeze Layered Maxi Dress",
    image: "https://picsum.photos/seed/oms-maxi/64/64",
    platform: "Myntra" as Platform,
    reason: "Color slightly darker than photos",
    type: "Customer Return",
    status: "Refund Approved",
    awb: "DEL-REV-48092",
    carrier: "Delhivery",
    amount: "₹1,999",
    requestedAt: "Oct 26",
  },
];

const inventoryList = [
  {
    sku: "SKU-SHIRT-001",
    barcode: "890123049102",
    product: "Summer Breeze Linen Shirt",
    image: "https://picsum.photos/seed/oms-linen/64/64",
    category: "Shirts",
    vendor: "Arvind Textiles",
    location: "Rack A-12 · Bin 04",
    cost: "₹420",
    sell: "₹1,299",
    stock: 38,
    reserved: 14,
    reorderLevel: 50,
    mappings: ["Shopify", "Myntra"] as Platform[],
    status: "Low Stock",
  },
  {
    sku: "SKU-DRESS-004",
    barcode: "890123049103",
    product: "Coastal Stripe Kaftan",
    image: "https://picsum.photos/seed/oms-kaftan/64/64",
    category: "Dresses",
    vendor: "Bombay Fabrics",
    location: "Rack B-08 · Bin 02",
    cost: "₹580",
    sell: "₹1,899",
    stock: 120,
    reserved: 8,
    reorderLevel: 40,
    mappings: ["Myntra", "Amazon"] as Platform[],
    status: "Healthy",
  },
  {
    sku: "SKU-DRESS-011",
    barcode: "890123049104",
    product: "Breeze Layered Maxi Dress",
    image: "https://picsum.photos/seed/oms-maxi/64/64",
    category: "Dresses",
    vendor: "KS Apparels",
    location: "Rack B-10 · Bin 01",
    cost: "₹640",
    sell: "₹1,999",
    stock: 210,
    reserved: 22,
    reorderLevel: 60,
    mappings: ["Shopify", "Amazon", "Myntra"] as Platform[],
    status: "Healthy",
  },
  {
    sku: "SKU-CORD-002",
    barcode: "890123049105",
    product: "Monsoon Poplin Co-ord Set",
    image: "https://picsum.photos/seed/oms-cord/64/64",
    category: "Co-ords",
    vendor: "Sunrise Garments",
    location: "Rack C-02 · Bin 03",
    cost: "₹510",
    sell: "₹1,499",
    stock: 12,
    reserved: 9,
    reorderLevel: 40,
    mappings: ["Myntra"] as Platform[],
    status: "Critical Low",
  },
  {
    sku: "SKU-TSHIRT-007",
    barcode: "890123049106",
    product: "Terra Oversized Tee",
    image: "https://picsum.photos/seed/oms-tee/64/64",
    category: "T-Shirts",
    vendor: "Arvind Textiles",
    location: "Rack A-04 · Bin 07",
    cost: "₹210",
    sell: "₹699",
    stock: 340,
    reserved: 45,
    reorderLevel: 80,
    mappings: ["Amazon", "Shopify"] as Platform[],
    status: "Healthy",
  },
  {
    sku: "SKU-BOTTOM-009",
    barcode: "890123049107",
    product: "Riviera Rayon Palazzo",
    image: "https://picsum.photos/seed/oms-palazzo/64/64",
    category: "Bottoms",
    vendor: "Deccan Mills",
    location: "Rack D-01 · Bin 05",
    cost: "₹260",
    sell: "₹899",
    stock: 88,
    reserved: 16,
    reorderLevel: 50,
    mappings: ["Amazon", "Shopify"] as Platform[],
    status: "Healthy",
  },
];

const purchaseOrdersList = [
  {
    poNumber: "PO-2024-089",
    vendor: "Arvind Textiles Ltd",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98200 11928",
    email: "orders@arvindtextiles.com",
    city: "Ahmedabad, GJ",
    itemsCount: 250,
    totalAmount: "₹1,05,000",
    paymentTerms: "Net 30 Days",
    orderDate: "Oct 25, 2024",
    expectedDate: "Oct 30, 2024 (Tomorrow)",
    status: "Dispatched (In Transit)",
    carrier: "VRL Logistics",
  },
  {
    poNumber: "PO-2024-088",
    vendor: "Sunrise Garments",
    contactPerson: "Anita Deshmukh",
    phone: "+91 98190 44321",
    email: "anita@sunrisegarments.com",
    city: "Surat, GJ",
    itemsCount: 150,
    totalAmount: "₹76,500",
    paymentTerms: "Advance 50%",
    orderDate: "Oct 27, 2024",
    expectedDate: "Nov 02, 2024",
    status: "Vendor Confirmed",
    carrier: "TCI Express",
  },
  {
    poNumber: "PO-2024-087",
    vendor: "KS Apparels Surat",
    contactPerson: "Kishore Shah",
    phone: "+91 98790 33219",
    email: "sales@ksapparels.in",
    city: "Surat, GJ",
    itemsCount: 300,
    totalAmount: "₹1,92,000",
    paymentTerms: "Net 15 Days",
    orderDate: "Oct 18, 2024",
    expectedDate: "Oct 24, 2024",
    status: "Goods Received (GRN Complete)",
    carrier: "SafeXpress",
  },
  {
    poNumber: "PO-2024-086",
    vendor: "Bombay Fabric Mills",
    contactPerson: "Farhan Merchant",
    phone: "+91 98210 55091",
    email: "farhan@bombayfabrics.com",
    city: "Mumbai, MH",
    itemsCount: 180,
    totalAmount: "₹1,04,400",
    paymentTerms: "Net 30 Days",
    orderDate: "Oct 12, 2024",
    expectedDate: "Oct 18, 2024",
    status: "Goods Received (GRN Complete)",
    carrier: "Direct Delivery",
  },
];

const courierPickups = [
  {
    carrier: "Blue Dart Express",
    slot: "2:15 PM (Done)",
    status: "Completed",
    packages: 48,
    tone: "mint" as const,
  },
  {
    carrier: "Delhivery Surface",
    slot: "4:30 PM (Next)",
    status: "Ready to Handover",
    packages: 82,
    tone: "blue" as const,
  },
  {
    carrier: "Amazon ATS Logistics",
    slot: "5:15 PM",
    status: "Packing Queue",
    packages: 94,
    tone: "peach" as const,
  },
];

/* ================================================================
   MAIN APP SHELL WITH TAB SWITCHER
   ================================================================ */

function DashboardApp() {
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PageTab>("dashboard");

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    setNavOpen(false); // Auto close mobile drawer on tab click
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen w-full px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <div className="relative mx-auto max-w-[1500px] rounded-2xl sm:rounded-3xl lg:rounded-[36px] bg-white/70 dark:bg-black/50 backdrop-blur-xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] border border-white dark:border-white/10 overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            <Sidebar
              open={navOpen}
              onClose={() => setNavOpen(false)}
              activeTab={activeTab}
              onSelectTab={handleTabChange}
            />
            <div className="p-3 sm:p-4 lg:p-5 flex flex-col gap-3 sm:gap-4 lg:gap-5 min-w-0">
              <TopBar
                onMenu={() => setNavOpen(true)}
                dark={dark}
                onToggleTheme={() => setDark((d) => !d)}
                activeTab={activeTab}
              />

              {/* Dynamic Pages / Views */}
              {activeTab === "dashboard" && (
                <OverviewDashboardView dark={dark} onGoToOrders={() => setActiveTab("orders")} />
              )}
              {activeTab === "orders" && <OrdersFulfillmentView dark={dark} />}
              {activeTab === "returns" && <ReturnsExchangesView dark={dark} />}
              {activeTab === "inventory" && <ProductInventoryView dark={dark} />}
              {activeTab === "suppliers" && <SuppliersPurchaseOrdersView dark={dark} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SIDEBAR COMPONENT
   ================================================================ */

function Sidebar({
  open,
  onClose,
  activeTab,
  onSelectTab,
}: {
  open: boolean;
  onClose: () => void;
  activeTab: PageTab;
  onSelectTab: (t: PageTab) => void;
}) {
  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={
          "fixed inset-y-0 left-0 z-50 w-[86%] max-w-[320px] flex flex-col p-5 gap-6 overflow-y-auto bg-white dark:bg-neutral-900 border-r border-black/5 dark:border-white/10 " +
          "transform transition-transform duration-300 ease-out " +
          (open ? "translate-x-0" : "-translate-x-full") +
          " lg:static lg:translate-x-0 lg:w-auto lg:max-w-none lg:bg-white/40 dark:lg:bg-neutral-900/40 lg:transform-none"
        }
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-2xl bg-ink dark:bg-mint flex items-center justify-center shadow-xs">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-mint dark:text-neutral-950"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path d="M4 8l8 5 8-5M4 8v8l8 5 8-5V8M4 8l8-5 8 5" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-ink dark:text-white truncate">OmniFlow OMS</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span>Orders &amp; Stock</span>
            </div>
          </div>
          <button
            className="lg:hidden h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-ink dark:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Menu: Operations */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground tracking-widest mb-2 px-1">
            OPERATIONS <ChevronUp className="h-3.5 w-3.5" />
          </div>
          <nav className="flex flex-col gap-1">
            <NavItem
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => onSelectTab("dashboard")}
            />
            <NavItem
              icon={<Package className="h-4 w-4" />}
              label="Orders & Fulfillment"
              badge="342"
              badgeTone="danger"
              active={activeTab === "orders"}
              onClick={() => onSelectTab("orders")}
            />
            <NavItem
              icon={<Undo2 className="h-4 w-4" />}
              label="Returns & Exchanges"
              badge="12"
              badgeTone="warn"
              active={activeTab === "returns"}
              onClick={() => onSelectTab("returns")}
            />
            <NavItem
              icon={<ReceiptText className="h-4 w-4" />}
              label="Product Inventory"
              active={activeTab === "inventory"}
              onClick={() => onSelectTab("inventory")}
            />
            <NavItem
              icon={<Truck className="h-4 w-4" />}
              label="Suppliers & Purchase Orders"
              active={activeTab === "procurement"}
              onClick={() => onSelectTab("procurement")}
            />
          </nav>
        </div>

        {/* Menu: Stores & Net Profit */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground tracking-widest mb-2 px-1">
            CONNECTED STORES <ChevronUp className="h-3.5 w-3.5" />
          </div>
          <nav className="flex flex-col gap-1">
            <NavItem
              icon={<DollarSign className="h-4 w-4" />}
              label="Sales & True Margin"
              badge="Net Profit"
              badgeTone="mint"
              active={activeTab === "margin_ledger"}
              onClick={() => onSelectTab("margin_ledger")}
            />
            <NavItem
              icon={<Store className="h-4 w-4" />}
              label="Shopify Store"
              badge="Live"
              badgeTone="mint"
            />
            <NavItem
              icon={<Store className="h-4 w-4" />}
              label="Myntra Store"
              badge="Live"
              badgeTone="peach"
            />
            <NavItem
              icon={<Store className="h-4 w-4" />}
              label="Amazon Store"
              badge="Live"
              badgeTone="mint"
            />
            <NavItem icon={<FileText className="h-4 w-4" />} label="Daily Dispatch Reports" />
          </nav>
        </div>

        {/* Profile Card */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-black/5 dark:border-white/10">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-700 flex items-center justify-center text-white text-sm font-medium">
            NB
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-ink dark:text-white truncate">
              Noah Bellingham
            </div>
            <div className="text-xs text-muted-foreground truncate">Warehouse &amp; Ops</div>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-mint-strong" title="Active" />
        </div>
      </aside>
    </>
  );
}

function NavItem({
  icon,
  label,
  badge,
  badgeTone,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  badgeTone?: "mint" | "peach" | "danger" | "warn";
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "group flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm transition cursor-pointer " +
        (active
          ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.6)] font-semibold"
          : "text-ink-soft dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 font-medium")
      }
    >
      <span
        className={
          "shrink-0 " +
          (active ? "text-white dark:text-neutral-950" : "text-ink-soft dark:text-neutral-400")
        }
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0 text-left truncate">{label}</span>
      {badge && (
        <span
          className={
            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white shrink-0 " +
            (badgeTone === "danger"
              ? "bg-danger"
              : badgeTone === "warn"
                ? "bg-warn"
                : badgeTone === "peach"
                  ? "bg-[oklch(0.72_0.18_45)]"
                  : "bg-mint-strong")
          }
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* ================================================================
   TOP BAR COMPONENT
   ================================================================ */

function TopBar({
  onMenu,
  dark,
  onToggleTheme,
  activeTab,
}: {
  onMenu: () => void;
  dark: boolean;
  onToggleTheme: () => void;
  activeTab: PageTab;
}) {
  const pageTitles: Record<PageTab, string> = {
    dashboard: "Dashboard Overview",
    orders: "Orders & Fulfillment",
    returns: "Returns & Exchanges",
    inventory: "Product Inventory",
    suppliers: "Suppliers & Purchase Orders",
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      <button
        className="lg:hidden h-11 w-11 shrink-0 rounded-full bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center text-ink dark:text-white"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Input */}
      <div className="flex-1 min-w-[200px] flex items-center gap-2 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 px-3 sm:px-4 py-2.5 shadow-xs">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${pageTitles[activeTab].toLowerCase()}...`}
          className="flex-1 min-w-0 bg-transparent text-sm text-ink dark:text-white placeholder:text-muted-foreground focus:outline-none"
        />
        <kbd className="hidden sm:inline-block text-[11px] text-muted-foreground border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      {/* Theme Toggle Button */}
      <div className="flex items-center rounded-full bg-white/80 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 p-1 shrink-0">
        <button
          onClick={onToggleTheme}
          className={
            "h-9 w-9 rounded-full flex items-center justify-center transition " +
            (!dark ? "bg-ink text-white" : "text-muted-foreground hover:text-white")
          }
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={onToggleTheme}
          className={
            "h-9 w-9 rounded-full flex items-center justify-center transition " +
            (dark ? "bg-white text-neutral-900" : "text-muted-foreground hover:text-ink")
          }
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>

      <button className="h-11 w-11 shrink-0 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 flex items-center justify-center text-ink dark:text-white relative">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-mint" />
      </button>

      <div className="hidden md:flex items-center gap-2 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 pl-2 pr-3 py-1 shrink-0">
        <div className="flex -space-x-2">
          {[
            "from-rose-300 to-rose-500",
            "from-amber-200 to-amber-400",
            "from-neutral-400 to-neutral-700",
          ].map((g, i) => (
            <div
              key={i}
              className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} border-2 border-white dark:border-neutral-800`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-ink dark:text-white">+6</span>
      </div>

      <button className="hidden sm:flex h-11 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 pl-3 pr-4 items-center gap-2 text-sm font-medium shrink-0 shadow-xs transition">
        <span className="h-7 w-7 rounded-full bg-white/10 dark:bg-neutral-950/10 flex items-center justify-center">
          <Plus className="h-3.5 w-3.5" />
        </span>
        Create Order
      </button>
    </div>
  );
}

/* ================================================================
   1. OVERVIEW DASHBOARD VIEW
   ================================================================ */

function OverviewDashboardView({
  dark,
  onGoToOrders,
}: {
  dark: boolean;
  onGoToOrders: () => void;
}) {
  return (
    <>
      <SmartAlert dark={dark} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <MetricTotalSales dark={dark} />
        <MetricActiveOrders dark={dark} onGoToOrders={onGoToOrders} />
        <MetricDeliverySuccess dark={dark} />
        <MetricReturnRate dark={dark} />
      </div>

      <VisualGraphsSection dark={dark} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-3 sm:gap-4 lg:gap-5 items-start">
        <RecentOrdersFeed onGoToOrders={onGoToOrders} />
        <DispatchCourierHub />
      </div>

      <InventoryMasterSnippet />
    </>
  );
}

/* ================================================================
   2. ORDERS & FULFILLMENT PAGE (Badge: 342)
   ================================================================ */

function OrdersFulfillmentView({ dark }: { dark: boolean }) {
  const [filter, setFilter] = useState<string>("All");
  const [storeFilter, setStoreFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [packToast, setPackToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return fullOrdersList.filter((o) => {
      const matchFilter = filter === "All" || o.status === filter;
      const matchStore = storeFilter === "All" || o.platform === storeFilter;
      const matchSearch =
        searchTerm === "" ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.city.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchStore && matchSearch;
    });
  }, [filter, storeFilter, searchTerm]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleBulkPack = () => {
    setPackToast(`Batch packed ${selectedIds.length} orders successfully!`);
    setSelectedIds([]);
    setTimeout(() => setPackToast(null), 3000);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Toast Notification */}
      {packToast && (
        <div className="rounded-2xl bg-mint-soft text-mint-strong border border-mint p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Check className="h-4 w-4" /> {packToast}
          </div>
          <button onClick={() => setPackToast(null)} className="text-xs font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">
              Orders &amp; Fulfillment
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-danger text-white">
              342 active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage packaging queue, shipping labels, and carrier handoffs across all stores
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkPack}
              className="h-10 px-4 rounded-full bg-mint-strong text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Check className="h-3.5 w-3.5" /> Pack Selected ({selectedIds.length})
            </button>
          )}
          <button className="h-10 px-4 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 font-medium text-xs flex items-center gap-1.5 shadow-xs">
            <Printer className="h-3.5 w-3.5" /> Print Pick Lists
          </button>
          <button className="h-10 px-4 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white font-medium text-xs flex items-center gap-1.5 hover:bg-black/5 dark:hover:bg-neutral-700">
            <Download className="h-3.5 w-3.5" /> Export Manifest
          </button>
        </div>
      </section>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Ready for Packaging</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">128 Orders</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Average packing time: 14 mins
          </div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Labels Generated Today</div>
          <div className="text-2xl font-bold text-mint-strong mt-1">224 Labels</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            All barcodes verified &amp; ready
          </div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Staged at Courier Bays</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">82 Parcels</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Next pickup: Delhivery (4:30 PM)
          </div>
        </div>
      </div>

      {/* Filter and Table Container */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/5 dark:border-white/10 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Needs Packing", "Ready to Ship", "In Transit", "Delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={
                  "h-8 px-3 rounded-full text-xs font-medium whitespace-nowrap transition " +
                  (filter === tab
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-muted-foreground hover:text-ink dark:hover:text-white")
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
              className="h-8 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 px-3 text-xs text-ink dark:text-white border-none focus:outline-none cursor-pointer"
            >
              <option value="All">All Stores</option>
              <option value="Shopify">Shopify Store</option>
              <option value="Myntra">Myntra Store</option>
              <option value="Amazon">Amazon Store</option>
            </select>
          </div>
        </div>

        {/* Table of Orders */}
        <div className="mt-4 overflow-x-auto -mx-4 sm:-mx-5">
          <div className="min-w-[860px] px-4 sm:px-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 text-xs text-muted-foreground pb-2">
                  <th className="pb-3 pl-2 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={(e) =>
                        setSelectedIds(e.target.checked ? filtered.map((x) => x.id) : [])
                      }
                      className="rounded accent-ink dark:accent-mint"
                    />
                  </th>
                  <th className="pb-3">Order &amp; Customer</th>
                  <th className="pb-3">Store</th>
                  <th className="pb-3">Product Ordered</th>
                  <th className="pb-3">Courier</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
                  >
                    <td className="py-3 pl-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(o.id)}
                        onChange={() => toggleSelect(o.id)}
                        className="rounded accent-ink dark:accent-mint"
                      />
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-ink dark:text-white text-xs">{o.id}</div>
                      <div className="text-xs text-muted-foreground">{o.customer}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {o.city} · {o.placedAt}
                      </div>
                    </td>
                    <td className="py-3">
                      <PlatformBadge p={o.platform} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={o.image}
                          alt={o.product}
                          className="h-9 w-9 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 max-w-[200px]">
                          <div className="font-medium text-ink dark:text-white text-xs truncate">
                            {o.product}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {o.variant}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-ink dark:text-white font-medium">
                      {o.carrier}
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{o.payment}</td>
                    <td className="py-3">
                      <OrderStatusPill s={o.status} />
                    </td>
                    <td className="py-3 text-right font-semibold text-ink dark:text-white">
                      {o.total}
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button className="h-7 px-2.5 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 hover:bg-black/5 dark:hover:bg-neutral-700 text-xs font-medium text-ink dark:text-white transition">
                        Print Label
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================
   3. RETURNS & EXCHANGES PAGE (Badge: 12)
   ================================================================ */

function ReturnsExchangesView({ dark }: { dark: boolean }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return returnsList;
    return returnsList.filter((r) => r.type === filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Header Banner */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">
              Returns &amp; Exchanges
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-warn text-white">
              12 active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Reverse pickups, courier RTO quarantine, size exchanges &amp; customer refunds
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="h-10 px-4 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 font-medium text-xs flex items-center gap-1.5 shadow-xs">
            <Barcode className="h-3.5 w-3.5" /> Scan Inward Package
          </button>
          <button className="h-10 px-4 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white font-medium text-xs flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download Return Ledger
          </button>
        </div>
      </section>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Inward Pending Pickup</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">5 Requests</div>
          <div className="text-[11px] text-muted-foreground mt-1">Reverse tracking active</div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Courier RTO Received</div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            4 Parcels
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">Staged at Quarantine Bay 2</div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Restocked to Inventory</div>
          <div className="text-2xl font-bold text-mint-strong mt-1">28 Units</div>
          <div className="text-[11px] text-muted-foreground mt-1">Inspected &amp; repackaged</div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Average Return Rate</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">3.8%</div>
          <div className="text-[11px] text-mint-strong mt-1">↓ 0.6% improvement</div>
        </div>
      </div>

      {/* Return List Table */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/10 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Customer Return", "Courier RTO", "Size Exchange"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={
                  "h-8 px-3 rounded-full text-xs font-medium whitespace-nowrap transition " +
                  (filter === tab
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-muted-foreground hover:text-ink dark:hover:text-white")
                }
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} requests matching</span>
        </div>

        <div className="mt-4 overflow-x-auto -mx-4 sm:-mx-5">
          <div className="min-w-[840px] px-4 sm:px-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 text-xs text-muted-foreground pb-2">
                  <th className="pb-3 pl-2">Return ID &amp; Order</th>
                  <th className="pb-3">Store</th>
                  <th className="pb-3">Customer &amp; Phone</th>
                  <th className="pb-3">Product &amp; Reason</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Inspection Status</th>
                  <th className="pb-3 text-right">Value</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                {filtered.map((r) => (
                  <tr
                    key={r.returnId}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
                  >
                    <td className="py-3 pl-2">
                      <div className="font-semibold text-ink dark:text-white text-xs">
                        {r.returnId}
                      </div>
                      <div className="text-[11px] text-muted-foreground">Order: {r.orderId}</div>
                      <div className="text-[10px] text-muted-foreground">{r.requestedAt}</div>
                    </td>
                    <td className="py-3">
                      <PlatformBadge p={r.platform} />
                    </td>
                    <td className="py-3">
                      <div className="text-xs font-medium text-ink dark:text-white">
                        {r.customer}
                      </div>
                      <div className="text-[11px] text-muted-foreground">{r.phone}</div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={r.image}
                          alt={r.product}
                          className="h-8 w-8 rounded-lg object-cover"
                        />
                        <div className="min-w-0 max-w-[200px]">
                          <div className="text-xs font-medium text-ink dark:text-white truncate">
                            {r.product}
                          </div>
                          <div className="text-[11px] text-rose-600 dark:text-rose-400 truncate">
                            {r.reason}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white">
                        {r.type}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-xs font-semibold text-mint-strong flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint-strong" /> {r.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-ink dark:text-white">
                      {r.amount}
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button className="h-7 px-3 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 text-xs font-medium shadow-xs">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================
   4. PRODUCT INVENTORY PAGE
   ================================================================ */

function ProductInventoryView({ dark }: { dark: boolean }) {
  const stockPct = (s: number) => Math.min(100, Math.round((s / 350) * 100));
  const [vendorFilter, setVendorFilter] = useState("All");

  const filtered = useMemo(() => {
    if (vendorFilter === "All") return inventoryList;
    return inventoryList.filter((i) => i.vendor === vendorFilter);
  }, [vendorFilter]);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Header Banner */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">
            Product Inventory &amp; Catalog
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Stock quantities, warehouse bins, cost prices, and marketplace inventory mappings
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="h-10 px-4 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 font-medium text-xs flex items-center gap-1.5 shadow-xs">
            <Plus className="h-3.5 w-3.5" /> Add New SKU
          </button>
          <button className="h-10 px-4 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white font-medium text-xs flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export Inventory CSV
          </button>
        </div>
      </section>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Total Units in Stock</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">808 Units</div>
          <div className="text-[11px] text-muted-foreground mt-1">Valuation: ₹18,45,000</div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Reserved in Active Orders</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">114 Units</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Allocated to pending dispatch
          </div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Low Stock Alerts</div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">2 SKUs</div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">
            Below minimum safety buffer
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/10 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Filter by Supplier:</span>
            <select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="h-8 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 px-3 text-xs text-ink dark:text-white border-none focus:outline-none cursor-pointer"
            >
              <option value="All">All Suppliers</option>
              <option value="Arvind Textiles">Arvind Textiles</option>
              <option value="Bombay Fabrics">Bombay Fabrics</option>
              <option value="KS Apparels">KS Apparels</option>
              <option value="Sunrise Garments">Sunrise Garments</option>
              <option value="Deccan Mills">Deccan Mills</option>
            </select>
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} SKUs displayed</span>
        </div>

        <div className="mt-4 overflow-x-auto -mx-4 sm:-mx-5">
          <div className="min-w-[880px] px-4 sm:px-5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 text-xs text-muted-foreground pb-2">
                  <th className="pb-3 pl-2">Product Name</th>
                  <th className="pb-3">SKU &amp; Location</th>
                  <th className="pb-3">Supplier</th>
                  <th className="pb-3">Buy Cost</th>
                  <th className="pb-3">Selling Price</th>
                  <th className="pb-3">Stock Available</th>
                  <th className="pb-3">Marketplaces</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                {filtered.map((item) => (
                  <tr
                    key={item.sku}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
                  >
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.product}
                          className="h-10 w-10 shrink-0 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-medium text-ink dark:text-white text-xs">
                            {item.product}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-mono text-xs text-ink-soft dark:text-neutral-300">
                        {item.sku}
                      </div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3 inline" /> {item.location}
                      </div>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{item.vendor}</td>
                    <td className="py-3 text-xs text-muted-foreground">{item.cost}</td>
                    <td className="py-3 text-xs font-semibold text-ink dark:text-white">
                      {item.sell}
                    </td>
                    <td className="py-3">
                      <div className="min-w-[120px]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span
                            className={
                              "font-semibold " +
                              (item.stock < 40
                                ? "text-rose-600 dark:text-rose-400"
                                : "text-ink dark:text-white")
                            }
                          >
                            {item.stock} in stock
                          </span>
                          {item.stock < 40 && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                              Low
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 rounded-full bg-[oklch(0.95_0.005_260)] dark:bg-neutral-800 overflow-hidden">
                          <div
                            className={
                              "h-full rounded-full " +
                              (item.stock < 40 ? "bg-rose-500" : "bg-mint-strong")
                            }
                            style={{ width: `${stockPct(item.stock)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {item.mappings.map((m) => (
                          <PlatformBadge key={m} p={m} size="xs" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button className="h-7 px-2.5 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 text-xs font-medium shadow-xs">
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================
   5. SUPPLIERS & PURCHASE ORDERS PAGE
   ================================================================ */

function SuppliersPurchaseOrdersView({ dark }: { dark: boolean }) {
  const [tab, setTab] = useState<"orders" | "vendors">("orders");

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Header Banner */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">
            Suppliers &amp; Purchase Orders
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Vendor catalogs, purchase orders, expected inward deliveries, and supplier ledgers
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="h-10 px-4 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 font-medium text-xs flex items-center gap-1.5 shadow-xs">
            <Plus className="h-3.5 w-3.5" /> + Create Purchase Order
          </button>
          <button className="h-10 px-4 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white font-medium text-xs flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export Ledger
          </button>
        </div>
      </section>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Active Purchase Orders</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">2 Pending</div>
          <div className="text-[11px] text-muted-foreground mt-1">Total value: ₹1,81,500</div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Expected Inward Tomorrow</div>
          <div className="text-2xl font-bold text-mint-strong mt-1">250 Units</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Arvind Textiles (VRL Logistics)
          </div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">Approved Suppliers</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">5 Vendors</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            All contracts &amp; GST verified
          </div>
        </div>
        <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs">
          <div className="text-xs text-muted-foreground font-medium">On-Time Supplier SLA</div>
          <div className="text-2xl font-bold text-ink dark:text-white mt-1">94.2%</div>
          <div className="text-[11px] text-mint-strong mt-1">High fulfillment reliability</div>
        </div>
      </div>

      {/* Tab Switcher & Content */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
          <button
            onClick={() => setTab("orders")}
            className={
              "h-8 px-3.5 rounded-full text-xs font-semibold transition " +
              (tab === "orders"
                ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                : "bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-muted-foreground hover:text-ink dark:hover:text-white")
            }
          >
            Purchase Orders ({purchaseOrdersList.length})
          </button>
          <button
            onClick={() => setTab("vendors")}
            className={
              "h-8 px-3.5 rounded-full text-xs font-semibold transition " +
              (tab === "vendors"
                ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                : "bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-muted-foreground hover:text-ink dark:hover:text-white")
            }
          >
            Supplier Directory (5)
          </button>
        </div>

        {tab === "orders" ? (
          <div className="mt-4 overflow-x-auto -mx-4 sm:-mx-5">
            <div className="min-w-[860px] px-4 sm:px-5">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10 text-xs text-muted-foreground pb-2">
                    <th className="pb-3 pl-2">PO Number &amp; Date</th>
                    <th className="pb-3">Supplier Name</th>
                    <th className="pb-3">Units Ordered</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Payment Terms</th>
                    <th className="pb-3">Expected Delivery</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                  {purchaseOrdersList.map((po) => (
                    <tr
                      key={po.poNumber}
                      className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
                    >
                      <td className="py-3 pl-2">
                        <div className="font-semibold text-ink dark:text-white text-xs">
                          {po.poNumber}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{po.orderDate}</div>
                      </td>
                      <td className="py-3">
                        <div className="text-xs font-medium text-ink dark:text-white">
                          {po.vendor}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{po.city}</div>
                      </td>
                      <td className="py-3 text-xs font-semibold text-ink dark:text-white">
                        {po.itemsCount} units
                      </td>
                      <td className="py-3 text-xs font-bold text-ink dark:text-white">
                        {po.totalAmount}
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{po.paymentTerms}</td>
                      <td className="py-3 text-xs text-ink dark:text-white font-medium">
                        {po.expectedDate}
                      </td>
                      <td className="py-3">
                        <span
                          className={
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold " +
                            (po.status.includes("Received")
                              ? "bg-mint-soft text-mint-strong"
                              : po.status.includes("Dispatched")
                                ? "bg-[oklch(0.94_0.05_240)] dark:bg-blue-950 text-[oklch(0.5_0.15_240)] dark:text-blue-300"
                                : "bg-[oklch(0.95_0.05_80)] dark:bg-amber-950 text-[oklch(0.55_0.14_70)] dark:text-amber-300")
                          }
                        >
                          {po.status}
                        </span>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button className="h-7 px-2.5 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-xs font-medium text-ink dark:text-white hover:bg-black/5 dark:hover:bg-neutral-700">
                          Receive (GRN)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                name: "Arvind Textiles Ltd",
                contact: "Rajesh Kumar",
                phone: "+91 98200 11928",
                email: "orders@arvindtextiles.com",
                city: "Ahmedabad, Gujarat",
                terms: "Net 30 Days",
                leadTime: "5 Days",
              },
              {
                name: "Sunrise Garments",
                contact: "Anita Deshmukh",
                phone: "+91 98190 44321",
                email: "anita@sunrisegarments.com",
                city: "Surat, Gujarat",
                terms: "Advance 50%",
                leadTime: "6 Days",
              },
              {
                name: "KS Apparels Surat",
                contact: "Kishore Shah",
                phone: "+91 98790 33219",
                email: "sales@ksapparels.in",
                city: "Surat, Gujarat",
                terms: "Net 15 Days",
                leadTime: "4 Days",
              },
              {
                name: "Bombay Fabric Mills",
                contact: "Farhan Merchant",
                phone: "+91 98210 55091",
                email: "farhan@bombayfabrics.com",
                city: "Mumbai, Maharashtra",
                terms: "Net 30 Days",
                leadTime: "3 Days",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-2xl border border-black/5 dark:border-white/10 p-3.5 flex flex-col justify-between gap-3 bg-[oklch(0.985_0.003_260)] dark:bg-neutral-850"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-ink dark:text-white">{v.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mint-soft text-mint-strong">
                      Active Partner
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {v.city}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground flex flex-col gap-0.5 border-t border-black/5 dark:border-white/10 pt-2">
                  <div>
                    Contact:{" "}
                    <span className="text-ink dark:text-white font-medium">{v.contact}</span> (
                    {v.phone})
                  </div>
                  <div>
                    Terms: {v.terms} · Typical Lead Time: {v.leadTime}
                  </div>
                </div>
                <button className="h-8 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs">
                  <Plus className="h-3 w-3" /> New PO to {v.name.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ================================================================
   REUSABLE METRIC AND WIDGET COMPONENTS
   ================================================================ */

function SmartAlert({ dark }: { dark: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <section
      className="rounded-2xl sm:rounded-[28px] border border-white/60 dark:border-white/10 shadow-xs p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition"
      style={{
        background: dark
          ? "linear-gradient(120deg, oklch(0.25 0.04 40) 0%, oklch(0.18 0.01 90) 55%, oklch(0.22 0.05 155) 130%)"
          : "linear-gradient(120deg, oklch(0.96 0.05 40) 0%, oklch(0.98 0.01 90) 55%, oklch(0.95 0.04 155) 130%)",
      }}
    >
      <span className="h-10 w-10 shrink-0 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-[oklch(0.62_0.19_50)] dark:text-amber-400 border border-black/5 dark:border-white/10 shadow-xs">
        <AlertTriangle className="h-4.5 w-4.5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-[15px] font-medium text-ink dark:text-white">
          Low Stock Notice: 2 fast-moving items are running low on inventory.
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          "Monsoon Poplin Co-ord Set" has only 12 items left. Restock suggested to avoid out of
          stock.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
        <button className="h-10 shrink-0 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 px-4 flex items-center gap-2 text-sm font-medium transition">
          <Truck className="h-4 w-4" /> Restock Inventory
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="h-10 w-10 shrink-0 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-ink dark:text-white hover:bg-black/10 transition"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function MetricShell({
  children,
  gradient,
  dark,
}: {
  children: React.ReactNode;
  gradient?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      className={
        "rounded-2xl sm:rounded-[24px] border p-4 shadow-xs flex flex-col gap-3 min-w-0 " +
        (gradient
          ? "border-white/70 dark:border-white/10"
          : "bg-white dark:bg-neutral-900/90 border-black/5 dark:border-white/10")
      }
      style={
        gradient
          ? {
              background: dark
                ? "linear-gradient(135deg, oklch(0.24 0.03 40) 0%, oklch(0.18 0.005 90) 45%, oklch(0.22 0.08 155) 110%)"
                : "linear-gradient(135deg, oklch(0.97 0.03 40) 0%, oklch(0.98 0.005 90) 45%, oklch(0.93 0.09 155) 110%)",
            }
          : undefined
      }
    >
      {children}
    </section>
  );
}

function MetricIcon({ children, tone }: { children: React.ReactNode; tone: "white" | "mint" }) {
  return (
    <div
      className={
        "h-9 w-9 shrink-0 rounded-full flex items-center justify-center " +
        (tone === "white"
          ? "bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/10 text-ink dark:text-white"
          : "bg-mint-soft text-mint-strong")
      }
    >
      {children}
    </div>
  );
}

function PlatformBadge({ p, size = "sm" }: { p: Platform; size?: "sm" | "xs" }) {
  const styles: Record<Platform, string> = {
    Shopify: "bg-mint-soft text-mint-strong",
    Myntra:
      "bg-[oklch(0.93_0.06_350)] dark:bg-pink-950/60 text-[oklch(0.58_0.2_350)] dark:text-pink-300",
    Amazon:
      "bg-[oklch(0.95_0.05_80)] dark:bg-amber-950/60 text-[oklch(0.55_0.14_70)] dark:text-amber-300",
  };
  return (
    <span
      className={
        "inline-flex items-center rounded-full font-semibold whitespace-nowrap " +
        styles[p] +
        " " +
        (size === "xs" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]")
      }
    >
      {p}
    </span>
  );
}

function MetricTotalSales({ dark }: { dark: boolean }) {
  return (
    <MetricShell gradient dark={dark}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MetricIcon tone="white">
            <TrendingUp className="h-4 w-4" />
          </MetricIcon>
          <h3 className="text-sm font-semibold text-ink dark:text-white truncate">Total Sales</h3>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="text-[26px] sm:text-[28px] leading-none font-semibold tracking-tight text-ink dark:text-white">
        {totalSalesData.total}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-mint-strong font-semibold text-xs">
          <ArrowUpRight className="h-3.5 w-3.5" /> 12.4%
        </span>
        <span className="text-[11px] text-muted-foreground">{totalSalesData.delta}</span>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white dark:bg-neutral-800 pl-2 pr-2.5 py-1 self-start">
        {totalSalesData.mix.map((m, i) => (
          <span
            key={m.platform}
            className="inline-flex items-center gap-1 text-[10px] font-semibold whitespace-nowrap"
          >
            {i > 0 && <span className="text-white/25">·</span>}
            {m.pct}% <span className="text-white/70 font-medium">{m.platform}</span>
          </span>
        ))}
      </div>
    </MetricShell>
  );
}

function MetricActiveOrders({ dark, onGoToOrders }: { dark: boolean; onGoToOrders: () => void }) {
  return (
    <MetricShell dark={dark}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MetricIcon tone="mint">
            <Package className="h-4 w-4" />
          </MetricIcon>
          <h3 className="text-sm font-semibold text-ink dark:text-white truncate">Active Orders</h3>
        </div>
        <button
          onClick={onGoToOrders}
          className="text-xs text-mint-strong font-semibold flex items-center gap-0.5 hover:underline"
        >
          View All <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="text-[26px] sm:text-[28px] leading-none font-semibold tracking-tight text-ink dark:text-white">
        342
      </div>
      <p className="text-xs text-muted-foreground -mt-1">pending warehouse dispatch</p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="inline-flex items-center rounded-full bg-[oklch(0.94_0.05_240)] dark:bg-blue-950/60 text-[oklch(0.5_0.15_240)] dark:text-blue-300 px-2 py-0.5 text-[10px] font-semibold">
          128 Ready to Pack
        </span>
        <span className="inline-flex items-center rounded-full bg-mint-soft text-mint-strong px-2 py-0.5 text-[10px] font-semibold">
          96 Shipped today
        </span>
      </div>
    </MetricShell>
  );
}

function MetricDeliverySuccess({ dark }: { dark: boolean }) {
  return (
    <MetricShell dark={dark}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MetricIcon tone="mint">
            <CheckCircle2 className="h-4 w-4" />
          </MetricIcon>
          <h3 className="text-sm font-semibold text-ink dark:text-white truncate">
            On-Time Delivery
          </h3>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="text-[26px] sm:text-[28px] leading-none font-semibold tracking-tight text-ink dark:text-white">
        98.2%
      </div>
      <p className="text-xs text-muted-foreground -mt-1">orders delivered within promised SLA</p>
      <div className="inline-flex items-center gap-1 rounded-full bg-mint-soft text-mint-strong px-2 py-0.5 text-[10px] font-semibold self-start">
        <ArrowUpRight className="h-3 w-3" /> +1.8% vs last week
      </div>
    </MetricShell>
  );
}

function MetricReturnRate({ dark }: { dark: boolean }) {
  return (
    <MetricShell dark={dark}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MetricIcon tone="mint">
            <Undo2 className="h-4 w-4" />
          </MetricIcon>
          <h3 className="text-sm font-semibold text-ink dark:text-white truncate">Return Rate</h3>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <div className="text-[26px] sm:text-[28px] leading-none font-semibold tracking-tight text-ink dark:text-white">
          3.8%
        </div>
        <span className="inline-flex items-center gap-0.5 rounded-full bg-mint-soft text-mint-strong px-2 py-1 text-[10px] font-semibold">
          <ArrowDownRight className="h-3.5 w-3.5" /> 0.6%
        </span>
      </div>
      <p className="text-xs text-muted-foreground -mt-1">returns &amp; replacements · improving</p>
      <div className="inline-flex items-center gap-1.5 text-[11px] text-ink-soft dark:text-neutral-400 self-start">
        <span className="h-2 w-2 rounded-full bg-mint" /> Lowest on Shopify (1.8%)
      </div>
    </MetricShell>
  );
}

function VisualGraphsSection({ dark }: { dark: boolean }) {
  const [timeframe, setTimeframe] = useState<"7d" | "30d">("7d");
  const [metricType, setMetricType] = useState<"sales" | "orders">("sales");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = timeframe === "7d" ? salesTrend7Days : salesTrend30Days;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {/* Chart 1: Sales & Orders Trends (2 cols on desktop) */}
      <section className="lg:col-span-2 rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 rounded-full bg-mint-soft flex items-center justify-center">
                <LineChart className="h-4 w-4 text-mint-strong" />
              </div>
              <h3 className="font-semibold text-ink dark:text-white text-base">
                Sales &amp; Orders Trend
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Daily revenue and package volume across all stores
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 p-1 text-xs">
              <button
                onClick={() => setMetricType("sales")}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  metricType === "sales"
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "text-muted-foreground hover:text-ink dark:hover:text-white"
                }`}
              >
                Revenue (₹)
              </button>
              <button
                onClick={() => setMetricType("orders")}
                className={`px-3 py-1 rounded-full font-medium transition ${
                  metricType === "orders"
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "text-muted-foreground hover:text-ink dark:hover:text-white"
                }`}
              >
                Orders
              </button>
            </div>

            <div className="flex items-center rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 p-1 text-xs">
              <button
                onClick={() => setTimeframe("7d")}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  timeframe === "7d"
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "text-muted-foreground hover:text-ink dark:hover:text-white"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe("30d")}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  timeframe === "30d"
                    ? "bg-ink text-white dark:bg-mint dark:text-neutral-950 shadow-xs"
                    : "text-muted-foreground hover:text-ink dark:hover:text-white"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2.5 text-xs border-b border-black/5 dark:border-white/10">
          <div>
            <div className="text-muted-foreground">Daily Average</div>
            <div className="text-sm font-semibold text-ink dark:text-white mt-0.5">
              {metricType === "sales" ? "₹2,06,428" : "178 orders"}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Peak Day</div>
            <div className="text-sm font-semibold text-mint-strong mt-0.5">
              {metricType === "sales" ? "Friday (₹2.54L)" : "Friday (215 orders)"}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Stores Synced</div>
            <div className="text-sm font-semibold text-ink dark:text-white mt-0.5">
              3 Active Platforms
            </div>
          </div>
        </div>

        <div className="w-full h-[240px] pt-3">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dark ? "#34d399" : "#10b981"} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={dark ? "#34d399" : "#10b981"} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={dark ? "#333333" : "#f0f0f0"}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: dark ? "#888888" : "#888888" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: dark ? "#888888" : "#888888" }}
                  tickFormatter={(v) =>
                    metricType === "sales" ? `₹${(v / 1000).toFixed(0)}k` : `${v}`
                  }
                />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-2xl bg-ink text-white p-3 text-xs shadow-xl border border-white/10">
                          <div className="font-semibold text-white/80">
                            {item.day} ({item.date})
                          </div>
                          <div className="text-mint font-bold text-sm mt-1">
                            {metricType === "sales"
                              ? `₹${item.sales.toLocaleString("en-IN")}`
                              : `${item.orders} Orders`}
                          </div>
                          {metricType === "sales" && (
                            <div className="mt-1.5 pt-1.5 border-t border-white/10 flex flex-col gap-0.5 text-[11px] text-white/70">
                              <div>Shopify: ₹{item.shopify.toLocaleString("en-IN")}</div>
                              <div>Myntra: ₹{item.myntra.toLocaleString("en-IN")}</div>
                              <div>Amazon: ₹{item.amazon.toLocaleString("en-IN")}</div>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={metricType === "sales" ? "sales" : "orders"}
                  stroke={dark ? "#34d399" : "#10b981"}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#trendGradient)"
                  dot={{
                    r: 3.5,
                    fill: dark ? "#34d399" : "#10b981",
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                  activeDot={{
                    r: 6,
                    fill: dark ? "#10b981" : "#059669",
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Chart 2: Sales by Store & Marketplace */}
      <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
            <h3 className="font-semibold text-ink dark:text-white text-base">Sales by Store</h3>
            <span className="text-xs text-muted-foreground font-medium">This Week</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Orders &amp; sales across each store</p>
        </div>

        <div className="w-full h-[180px] relative flex items-center justify-center my-1">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketplaceSales}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={74}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {marketplaceSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-ink text-white p-2.5 text-xs shadow-xl border border-white/10">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-mint font-bold">
                            ₹{item.value.toLocaleString("en-IN")}
                          </div>
                          <div className="text-[10px] text-white/70">
                            {item.orders} orders ({item.pct}%)
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] text-muted-foreground font-medium">Total</span>
            <span className="text-base font-bold text-ink dark:text-white">1,248</span>
            <span className="text-[10px] text-muted-foreground">Orders</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-black/5 dark:border-white/10">
          {marketplaceSales.map((ch) => (
            <div key={ch.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: ch.color }}
                />
                <span className="font-medium text-ink dark:text-neutral-200">{ch.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{ch.orders} orders</span>
                <span className="font-semibold text-ink dark:text-white">
                  ₹{(ch.value / 100000).toFixed(1)}L
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">({ch.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RecentOrdersFeed({ onGoToOrders }: { onGoToOrders: () => void }) {
  return (
    <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 rounded-full bg-mint-soft flex items-center justify-center">
            <ReceiptText className="h-4 w-4 text-mint-strong" />
          </div>
          <h3 className="font-semibold text-ink dark:text-white truncate">Recent Orders</h3>
          <span className="hidden sm:inline-flex items-center rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            Live Queue
          </span>
        </div>
        <button
          onClick={onGoToOrders}
          className="h-8 px-3 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 text-xs font-medium flex items-center gap-1 shadow-xs"
        >
          View All 342 Orders <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 md:hidden">
        {fullOrdersList.slice(0, 5).map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-black/5 dark:border-white/10 p-3 flex gap-3 bg-white dark:bg-neutral-900"
          >
            <img
              src={r.image}
              alt={r.product}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-ink dark:text-white text-sm truncate">
                  {r.product}
                </span>
                <span className="text-ink dark:text-white font-semibold text-sm shrink-0">
                  {r.total}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground truncate">
                  {r.id} · {r.customer}
                </span>
                <OrderStatusPill s={r.status} />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <PlatformBadge p={r.platform} size="xs" />
                <span className="text-[11px] text-muted-foreground truncate">{r.variant}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 hidden md:block -mx-4 sm:-mx-5 overflow-x-auto">
        <div className="min-w-[760px] px-4 sm:px-5">
          <div className="grid grid-cols-[130px_90px_1fr_130px_100px] gap-3 text-xs text-muted-foreground px-2 pb-3 border-b border-black/5 dark:border-white/10">
            <span>Order &amp; Customer</span>
            <span>Store</span>
            <span>Product Details</span>
            <span>Status</span>
            <span className="text-right">Total</span>
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {fullOrdersList.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[130px_90px_1fr_130px_100px] gap-3 items-center px-2 py-3 text-sm"
              >
                <div className="min-w-0">
                  <div className="text-ink dark:text-white font-medium text-xs">{r.id}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.customer}</div>
                  <div className="text-[10px] text-muted-foreground">{r.city}</div>
                </div>
                <div>
                  <PlatformBadge p={r.platform} />
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={r.image}
                    alt={r.product}
                    className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-ink dark:text-white truncate">{r.product}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.variant}</div>
                  </div>
                </div>
                <div>
                  <OrderStatusPill s={r.status} />
                </div>
                <span className="text-ink dark:text-white font-semibold text-right">{r.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderStatusPill({ s }: { s: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    "Needs Packing":
      "bg-[oklch(0.96_0.05_40)] dark:bg-amber-950/60 text-[oklch(0.6_0.18_35)] dark:text-amber-300",
    "Ready to Ship": "bg-mint-soft text-mint-strong",
    "In Transit":
      "bg-[oklch(0.94_0.05_240)] dark:bg-blue-950/60 text-[oklch(0.5_0.15_240)] dark:text-blue-300",
    Delivered: "bg-mint-soft text-mint-strong",
    "Return Pending":
      "bg-[oklch(0.94_0.06_25)] dark:bg-rose-950/60 text-[oklch(0.55_0.2_30)] dark:text-rose-300",
  };
  return (
    <span
      className={
        "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap " +
        styles[s]
      }
    >
      {s}
    </span>
  );
}

function DispatchCourierHub() {
  const [manifestDone, setManifestDone] = useState(false);

  const handleManifestClick = () => {
    setManifestDone(true);
    setTimeout(() => setManifestDone(false), 2500);
  };

  return (
    <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xs flex flex-col xl:sticky xl:top-5 p-4 sm:p-5 gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 rounded-full bg-ink dark:bg-mint flex items-center justify-center">
            <Truck className="h-4 w-4 text-mint dark:text-neutral-950" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-ink dark:text-white truncate leading-tight">
              Courier Dispatch
            </h3>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-strong" /> Pickup bay open
            </div>
          </div>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>

      <div className="rounded-2xl bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800/80 p-3.5 border border-black/5 dark:border-white/10">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-ink dark:text-white">Today's Dispatch Target</span>
          <span className="text-mint-strong font-bold">81% done</span>
        </div>
        <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-mint-strong transition-all duration-500"
            style={{ width: "81%" }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2">
          <span>224 parcels packed</span>
          <span>Target: 275</span>
        </div>
      </div>

      <div>
        <div className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-2">
          Scheduled Courier Handover
        </div>
        <div className="flex flex-col gap-2">
          {courierPickups.map((c) => (
            <div
              key={c.carrier}
              className="rounded-2xl border border-black/5 dark:border-white/10 p-3 flex items-center justify-between gap-2 bg-white dark:bg-neutral-850"
            >
              <div className="min-w-0">
                <div className="text-xs font-semibold text-ink dark:text-white truncate">
                  {c.carrier}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {c.slot} · {c.packages} parcels
                </div>
              </div>
              <span
                className={
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 " +
                  (c.tone === "mint"
                    ? "bg-mint-soft text-mint-strong"
                    : c.tone === "blue"
                      ? "bg-[oklch(0.94_0.05_240)] dark:bg-blue-950 text-[oklch(0.5_0.15_240)] dark:text-blue-300"
                      : "bg-[oklch(0.95_0.05_80)] dark:bg-amber-950 text-[oklch(0.55_0.14_70)] dark:text-amber-300")
                }
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">
        <button
          onClick={handleManifestClick}
          className="w-full h-10 rounded-full bg-ink text-white dark:bg-mint dark:text-neutral-950 font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition"
        >
          {manifestDone ? (
            <>
              <Check className="h-4 w-4" /> Manifest Printed!
            </>
          ) : (
            <>
              <Printer className="h-4 w-4" /> Print Daily Shipping Manifest
            </>
          )}
        </button>
        <button className="w-full h-9 rounded-full bg-[oklch(0.97_0.005_260)] dark:bg-neutral-800 text-ink dark:text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-neutral-700 transition">
          <Download className="h-3.5 w-3.5" /> Export Orders CSV
        </button>
      </div>
    </section>
  );
}

function InventoryMasterSnippet() {
  const stockPct = (s: number) => Math.min(100, Math.round((s / 350) * 100));

  return (
    <section className="rounded-2xl sm:rounded-[28px] bg-white dark:bg-neutral-900/90 p-4 sm:p-5 border border-black/5 dark:border-white/10 shadow-xs">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 shrink-0 rounded-full bg-mint-soft flex items-center justify-center">
            <Package className="h-4 w-4 text-mint-strong" />
          </div>
          <h3 className="font-semibold text-ink dark:text-white truncate">Inventory Overview</h3>
        </div>
        <span className="text-xs text-muted-foreground">Showing 6 high-demand SKUs</span>
      </div>

      <div className="mt-4 hidden md:block -mx-4 sm:-mx-5 overflow-x-auto">
        <div className="min-w-[880px] px-4 sm:px-5">
          <div className="grid grid-cols-[1fr_150px_160px_100px_100px_150px_180px] gap-3 text-xs text-muted-foreground px-2 pb-3 border-b border-black/5 dark:border-white/10">
            <span>Product</span>
            <span>Master SKU</span>
            <span>Supplier</span>
            <span>Cost</span>
            <span>Selling</span>
            <span>Stock Level</span>
            <span>Platform Mappings</span>
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {inventoryList.map((r) => (
              <div
                key={r.sku}
                className="grid grid-cols-[1fr_150px_160px_100px_100px_150px_180px] gap-3 items-center px-2 py-3 text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={r.image}
                    alt={r.product}
                    className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <span className="font-medium text-ink dark:text-white truncate">{r.product}</span>
                </div>
                <span className="text-ink-soft dark:text-neutral-300 font-mono text-xs">
                  {r.sku}
                </span>
                <span className="text-ink-soft dark:text-neutral-300 truncate">{r.vendor}</span>
                <span className="text-ink-soft dark:text-neutral-300">{r.cost}</span>
                <span className="text-ink dark:text-white font-medium">{r.sell}</span>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={
                        "text-xs font-semibold " +
                        (r.stock < 40
                          ? "text-[oklch(0.6_0.18_35)] dark:text-rose-400"
                          : "text-ink dark:text-white")
                      }
                    >
                      {r.stock}
                    </span>
                    {r.stock < 40 && (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[oklch(0.96_0.05_40)] dark:bg-rose-950 text-[oklch(0.6_0.18_35)] dark:text-rose-300">
                        Low
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 rounded-full bg-[oklch(0.95_0.005_260)] dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={
                        "h-full rounded-full " +
                        (r.stock < 40
                          ? "bg-[oklch(0.7_0.18_40)] dark:bg-rose-500"
                          : "bg-mint-strong")
                      }
                      style={{ width: `${stockPct(r.stock)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {r.mappings.map((p) => (
                    <PlatformBadge key={p} p={p} size="xs" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
