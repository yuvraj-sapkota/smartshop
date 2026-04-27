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
    { path: "affiliated-user", label: "Affiliate user", icon: Users },
  ],
  seller: [
    { path: "seller-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "create-order", label: "Create Order", icon: ShoppingBag },
    { path: "products", label: "Products", icon: ShoppingBasket },
    { path: "sales", label: "Sales", icon: Gift },
    { path: "commission", label: "Commission", icon: Wallet },
    { path: "seller-fund", label: "Fund", icon: Wallet },
  ],

  admin: [
    { path: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },

    { path: "products", label: "Products", icon: ShoppingBasket },

    { path: "sales-history", label: "Sales History", icon: ShoppingBag },

    { path: "seller-commission", label: "Seller Commission", icon: Wallet },

    { path: "user-commission", label: "User Commission", icon: Wallet },

    { path: "fund", label: "Fund", icon: Wallet },

    { path: "users", label: "Users", icon: Users },

    { path: "sellers", label: "Sellers", icon: Users },

    { path: "reward-ratio", label: "Fix Reward Ratio", icon: Gift },
  ],
};
