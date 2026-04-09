export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 border-t border-border mt-16 md:mt-24"
    >
      <div className="text-center space-y-8 md:space-y-12">
        {/* Quick Links */}
        <div>
          <h3
            className="text-base md:text-lg mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Quick Links
          </h3>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="#about"
                className="hover:text-primary transition-colors inline-block py-1"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-primary transition-colors inline-block py-1"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className="hover:text-primary transition-colors inline-block py-1"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-primary transition-colors inline-block py-1"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3
            className="text-base md:text-lg mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Connect
          </h3>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/MooseDS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://velog.io/@ds12892"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Velog"
            >
              Velog
            </a>
            <a
              href="mailto:ds12892@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/dongseok-lee-56b891204/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {currentYear} Dongseok Lee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
