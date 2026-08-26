import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] border-t border-white/10 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-sm">
          &copy; 2025 이봉희. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/hae8064"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://velog.io/@hae8064"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            Velog
          </a>
          <a
            href="mailto:hae80648064@gmail.com"
            className="text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
