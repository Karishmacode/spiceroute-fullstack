import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const links = {
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Us", path: "/contact" },
    ],
    Support: [
      { name: "Help Center", path: "/help" },
      { name: "FAQs", path: "/faqs" },
      { name: "Cancellation", path: "/cancellation" },
      { name: "Order", path: "/orders" },
    ],
    Legal: [
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Refund Policy", path: "/refund-policy" },
      { name: "Cookie Policy", path: "/cookie-policy" },
    ],
  };

  const socials = [
  {
  name: "Email",
  path: "https://mail.google.com/mail/?view=cm&fs=1&to=karishma.900.kumari@gmail.com",
  icon: FaEnvelope,
},
    { name: "GitHub", path: "https://github.com/Karishmacode", icon: FaGithub },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/karishma-kumari-4a1952218/",
      icon: FaLinkedinIn,
    },
  ];

  return (
    <footer className="mt-10 card-bg rounded-3xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 items-start">
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-black">
            <span className="text-[#ff7a00]">Spice</span>Route
          </h2>

          <p className="mt-3 text-slate-400 max-w-sm leading-relaxed">
            Your favorite food, delivered fast and fresh. Good food, good mood!
            Explore top restaurants, trending dishes, and exciting offers all in
            one place.
          </p>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h3 className="font-extrabold">{title}</h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#ff7a00] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-extrabold">Follow Us</h3>

          <div className="mt-4 flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
             <a
  key={social.name}
  href={social.path}
  target="_blank"
  rel="noreferrer"
  title={social.name}
  className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#ff7a00] transition"
>
  <Icon size={18} />
</a>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-8 pt-5 border-t border-white/10 text-center text-sm text-slate-500">
        © 2026 SpiceRoute. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
