import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingBasket,
  Gift,
  Wallet,
  Users,
} from "lucide-react";

export const menuConfig = {
  user: [
    { path: "shop", label: "Shop Now", icon: ShoppingBag },
    { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "purchases", label: "Purchases", icon: ShoppingBasket },
    { path: "reward", label: "Reward", icon: Gift },
    { path: "fund", label: "Fund", icon: Wallet },
    { path: "affiliateduser", label: "Affiliate user", icon: Users },
  ],
  seller: [
    { path: "seller-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "create-order", label: "Create Order", icon: ShoppingBag },
    { path: "product", label: "Product", icon: ShoppingBasket },
    { path: "sales", label: "Sales", icon: Gift },
    { path: "commission", label: "Commission", icon: Wallet },
    { path: "seller-fund", label: "Fund", icon: Wallet },
  ],
};
