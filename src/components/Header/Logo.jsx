import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * LearnonixLogo – advanced, brand-ready logo component
 * ----------------------------------------------------
 * Updates:
 * • Wordmark color tuned: "onix" part has a more refined gradient instead of plain slate (better matching)
 * • Accent line (underline) now animated: gently scales width in and out (pulsing)
 */

const SIZES = {
  xs: { icon: "w-7 h-7", text: "text-lg", gap: "space-x-2", tagline: "text-[10px]" },
  sm: { icon: "w-8 h-8", text: "text-xl", gap: "space-x-2", tagline: "text-xs" },
  md: { icon: "w-10 h-10", text: "text-2xl", gap: "space-x-3", tagline: "text-sm" },
  lg: { icon: "w-12 h-12", text: "text-3xl", gap: "space-x-4", tagline: "text-base" },
  xl: { icon: "w-14 h-14", text: "text-4xl", gap: "space-x-5", tagline: "text-lg" },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

const BrandIcon = ({ className, animated = true }) => (
  <motion.div
    className={cx(
      "relative inline-flex items-center justify-center rounded-2xl",
      "bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400",
      "shadow-[0_10px_25px_rgba(255,140,0,0.35)]",
      "ring-1 ring-orange-400/40",
      className
    )}
    initial={animated ? { rotate: 0, scale: 1 } : false}
    whileHover={animated ? { rotate: 4, scale: 1.04 } : false}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
  >
    <div className="absolute inset-0 rounded-2xl bg-white/0 [mask-image:radial-gradient(90%_90%_at_50%_15%,#000,transparent)]" />
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Learnonix Om symbol"
      className="w-[72%] h-[72%] drop-shadow-sm"
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="60%" stopColor="#FFD08A" />
          <stop offset="100%" stopColor="#FF9900" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
        </filter>
      </defs>
      <circle cx="32" cy="32" r="22" fill="url(#g1)" opacity="0.9" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x="31.4"
          y="6"
          width="1.2"
          height="6"
          rx="0.6"
          fill="#FFF6EA"
          transform={`rotate(${i * 45} 32 32)`}
          opacity="0.9"
          filter="url(#soft)"
        />
      ))}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill="#7C2D12"
        style={{
          fontFamily:
            "'Noto Sans Devanagari','Hind','Mukta','Kohinoor Devanagari','Mangal','Lohit Devanagari',system-ui,sans-serif",
        }}
      >
        ॐ
      </text>
      <path
        d="M22 44c6 6 14 6 20 0 0 0-6 2-10 2s-10-2-10-2z"
        fill="#7C2D12"
        opacity="0.14"
      />
    </svg>
  </motion.div>
);

const Wordmark = ({ className, sizeKey = "md", showAccent = true }) => (
  <div className={cx("leading-none select-none", className)}>
    <div className={cx("font-extrabold tracking-tight", SIZES[sizeKey].text)}>
      <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
        Learn
      </span>
      {/* Updated "onix" to refined gradient */}
      <span className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 bg-clip-text text-transparent">
        onix
      </span>
    </div>
    {showAccent && (
      <motion.div
        className="mt-0.5 h-[3px] w-10 rounded-full bg-gradient-to-r from-orange-500/70 to-amber-400/70"
        animate={{ scaleX: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "left center" }}
      />
    )}
  </div>
);

const Tagline = ({ sizeKey = "md", text }) => (
  <div
    className={cx(
      "mt-1 font-medium text-slate-600/90 dark:text-slate-300/90",
      SIZES[sizeKey].tagline
    )}
  >
    {text || "ज्ञान • कौशल • सफलता"}
  </div>
);

export default function LearnonixLogo({
  to = "/all",
  variant = "full",
  size = "md",
  withTagline = false,
  taglineText,
  iconAnimated = true,
  className = "",
  asLink = true,
  ariaLabel = "Learnonix logo",
}) {
  const sizeKey = SIZES[size] ? size : "md";
  const containerCls = cx(
    "inline-flex items-center",
    variant === "stacked" ? "flex-col" : "flex-row",
    variant !== "stacked" ? SIZES[sizeKey].gap : "",
    className
  );

  const content = (
    <motion.div
      className={containerCls}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {variant === "mark" && (
        <BrandIcon className={SIZES[sizeKey].icon} animated={iconAnimated} />
      )}
      {variant === "full" && (
        <>
          <BrandIcon className={SIZES[sizeKey].icon} animated={iconAnimated} />
          <Wordmark sizeKey={sizeKey} />
        </>
      )}
      {variant === "stacked" && (
        <>
          <BrandIcon className={cx(SIZES[sizeKey].icon, "mb-1.5")} animated={iconAnimated} />
          <Wordmark sizeKey={sizeKey} />
        </>
      )}
      {withTagline && <Tagline sizeKey={sizeKey} text={taglineText} />}
    </motion.div>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={cx(
        "group/logo inline-block",
        size === "xs" || size === "sm" ? "-my-1" : "-my-0.5"
      )}
    >
      {content}
    </Link>
  );
}
