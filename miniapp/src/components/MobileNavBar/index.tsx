import React from "react";
import styles from "./style.module.scss";

const navItems = [
  { label: "Home", icon: "🏠", href: "/" },
  { label: "Deposit", icon: "➕", href: "/Deposit" },
  { label: "Earn", icon: "💰", href: "/Earn" },
  { label: "Send", icon: "📤", href: "/Send" },
  { label: "Swap", icon: "🔄", href: "/Swap" },
];

export const MobileNavBar: React.FC = () => (
  <nav className={styles.mobileNavBar}>
    {navItems.map((item) => (
      <a key={item.label} href={item.href} className={styles.navItem}>
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.label}>{item.label}</span>
      </a>
    ))}
  </nav>
);
