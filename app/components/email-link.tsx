"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export function EmailLink({ className, iconSize = 16, showAddress = false }: { className?: string; iconSize?: number; showAddress?: boolean }) {
  const [href, setHref] = useState("/contact");
  useEffect(() => setHref(["mailto:umair", "umairops.com"].join("@")), []);

  return <a className={className} href={href} aria-label="Email Umair Malik">
    {showAddress ? <><span>umair</span><span aria-hidden="true">@</span><span>umairops.com</span></> : "Email"} <ArrowUpRight size={iconSize} />
  </a>;
}
