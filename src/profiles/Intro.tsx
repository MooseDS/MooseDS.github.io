export function Intro() {
  const highlights = [
    '인하대학교 컴퓨터공학과 졸업',
    'IT 동호회 SOPT (Android 파트장), Depromeet',
    'HECAS → Querensys 선임 연구원 (7년 6개월)',
  ];

  const skills = [
    { name: 'Android', icon: '🤖' },
    { name: 'Kotlin', icon: '🎯' },
    { name: 'Web', icon: '🌐' },
    { name: 'React', icon: '⚛️' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-10 py-3 border border-border-fix rounded-half text-sm text-secondary-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            구직중
          </div>

          {/* Main Greeting */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Hello, I&apos;m
            <br />
            Dongsoek Lee
          </h1>

          {/* Role - designed for typing animation */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary flex items-center gap-2 flex-wrap justify-center">
            <span className="inline-block">&gt;</span>
            <span className="inline-block text-xl font-bold">
              Application Developer
            </span>
          </p>

          {/* Career History */}
          <div className="space-y-3 pt-4">
            {highlights.map((highlight, index) => (
              <p
                key={index}
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                {highlight}
              </p>
            ))}
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-3 pt-4 justify-center">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-sm text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span className="text-base">{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
