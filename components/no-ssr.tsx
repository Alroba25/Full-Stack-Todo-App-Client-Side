"use client";

import React, { useEffect, useState } from "react";

const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default NoSSR;
