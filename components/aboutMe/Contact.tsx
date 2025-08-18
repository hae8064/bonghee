import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBlog,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
        Contact
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-white/80 text-sm sm:text-base">
        <div className="flex items-center gap-2 sm:gap-3">
          <FaEnvelope className="text-base sm:text-lg text-blue-400 flex-shrink-0" />
          <span className="break-all">hae8064@gmail.com</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <FaPhone className="text-base sm:text-lg text-green-400 flex-shrink-0" />
          <span>010-2413-8607</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <svg
            role="img"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            id="Velog--Streamline-Simple-Icons"
            height="20"
            width="20"
            className="flex-shrink-0"
          >
            <desc>Velog Streamline Icon: https://streamlinehq.com</desc>
            <title>Velog</title>
            <path
              d="M2.5 0C1.1150000000000002 0 0 1.1150000000000002 0 2.5v15c0 1.385 1.1150000000000002 2.5 2.5 2.5h15c1.385 0 2.5 -1.1150000000000002 2.5 -2.5V2.5c0 -1.385 -1.1150000000000002 -2.5 -2.5 -2.5H2.5Zm5.735833333333334 5.208333333333334c0.525 0 0.8374999999999999 0.25 0.9375 0.75l1.2191666666666667 6.919166666666667c0.3875 -0.5125000000000001 0.705 -0.9441666666666667 0.955 -1.2941666666666667 0.3875 -0.55 0.7441666666666668 -1.1816666666666666 1.0691666666666666 -1.8941666666666668 0.3375 -0.7125 0.5066666666666667 -1.35 0.5066666666666667 -1.9125 0 -0.3375 -0.09416666666666668 -0.6058333333333333 -0.2816666666666667 -0.8058333333333333 -0.175 -0.21250000000000002 -0.5066666666666667 -0.48083333333333333 -0.9941666666666668 -0.8058333333333333 0.5 -0.6375000000000001 1.1250000000000002 -0.9566666666666667 1.875 -0.9566666666666667 0.4 0 0.7316666666666667 0.11916666666666666 0.9941666666666668 0.3566666666666667 0.275 0.2375 0.4116666666666667 0.5866666666666667 0.4116666666666667 1.05 0 0.775 -0.325 1.7441666666666666 -0.975 2.9066666666666667 -0.6375000000000001 1.15 -1.8675000000000002 2.8808333333333334 -3.6925000000000003 5.193333333333333l-1.8558333333333332 0.13 -1.4258333333333335 -8.023333333333333h-1.875V6.033333333333334c0.5 -0.1625 1.0875 -0.3383333333333334 1.7625000000000002 -0.525 0.675 -0.2 1.1316666666666668 -0.3 1.3691666666666666 -0.3Z"
              fill="#ffffff"
              strokeWidth="0.8333"
            ></path>
          </svg>
          <a
            href="https://velog.io/@hae8064/posts"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Velog
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <FaGithub className="text-base sm:text-lg text-gray-400 flex-shrink-0" />
          <a
            href="https://github.com/hae8064"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
