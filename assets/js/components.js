const Components = {
    getIcon: (item) => {
        if (item.type === 'iconify') {
            return `<iconify-icon icon="${item.icon}" style="font-size: 1.4rem; display: flex; align-items: center; justify-content: center;"></iconify-icon>`;
        }
        return `<i class="${item.icon} skill-icon" style="color: ${item.color || 'var(--text-main)'}; text-shadow: 0 0 20px ${item.color}60;"></i>`;
    },

    renderNav: () => {
        return `
            <div class="nav-wrapper">
                <nav class="floating-nav">
                    <a href="#hero" class="nav-link active">Home</a>
                    <a href="#about" class="nav-link">About</a>
                    <a href="#skills" class="nav-link">Skills</a>
                    <a href="#github" class="nav-link">GitHub</a>
                    <a href="#projects" class="nav-link">Proyek</a>
                </nav>
            </div>
        `;
    },

    renderHero: (data) => {
        return `
            <div class="container hero-wrapper">
                <div class="bento-grid">
                    <div class="bento-card col-span-8 animate-slide-up" style="justify-content: center; min-height: 450px;">
                        <h3 style="color: var(--primary); letter-spacing: 2px; text-transform: uppercase; font-size: 0.85rem; margin-bottom: 20px;">
                            ${data.welcomeText}
                        </h3>
                        <h1 style="margin-bottom: 20px;">
                            ${data.subtitlePrefix} 
                            <span id="typing-text" style="color: var(--primary); display: block;">${settings.profile.title}</span>
                        </h1>
                        <p style="max-width: 90%; margin-bottom: 30px; font-size: 1.2rem; color: var(--text-muted);">
                            ${data.description}
                        </p>
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <a href="#projects" class="btn">Lihat Projek <i class="ri-arrow-right-line"></i></a>
                            <a href="#footer" class="btn btn-outline">Kontak Saya</a>
                        </div>
                    </div>
                    <div class="bento-card col-span-4 animate-slide-up stagger-1" style="padding: 0; min-height: 450px;">
                        <div class="profile-img-container">
                             <img src="${settings.profile.avatar}" class="profile-img" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px; border: none;">
                             <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(to top, black, transparent);">
                                <h3 style="color: white; font-size: 1.2rem;">${settings.profile.name}</h3>
                             </div>
                        </div>
                    </div>
                    <div class="bento-card col-span-3 tablet-col-1 animate-slide-up stagger-2" style="justify-content: center; align-items: center; text-align: center;">
                        <h2 style="color: var(--secondary); margin: 0; font-size: 3.5rem;">3+</h2>
                        <span style="color: var(--text-muted);">Years Experience</span>
                    </div>
                    <div class="bento-card col-span-3 tablet-col-1 animate-slide-up stagger-2" style="justify-content: center; align-items: center; text-align: center;">
                        <h2 style="color: var(--primary); margin: 0; font-size: 3.5rem;">20+</h2>
                        <span style="color: var(--text-muted);">Finished Projects</span>
                    </div>
                    <div class="bento-card col-span-6 animate-slide-up stagger-2" style="flex-direction: row; align-items: center; justify-content: space-around;">
                        ${settings.social.map(s => `
                            <a href="${s.link}" target="_blank" class="social-icon" title="${s.name}">
                                <i class="${s.icon}" style="font-size: 2.5rem; color: ${s.color || 'var(--text-muted)'};"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderAbout: (data) => {
        return `
            <div class="container">
                <div class="bento-grid">
                    <div class="bento-card col-span-12">
                        <h2 style="margin-bottom: 20px;">About Me</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">
                            ${settings.profile.bio}
                        </p>
                        <div style="margin-top: 30px; display: flex; gap: 20px;">
                            <div class="btn btn-outline" style="border-radius: 12px; padding: 10px 20px;">
                                <i class="ri-map-pin-line"></i> Indonesia
                            </div>
                            <div class="btn btn-outline" style="border-radius: 12px; padding: 10px 20px;">
                                <i class="ri-time-line"></i> UTC+7
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderSkills: (skills) => {
        const categories = [
            { title: 'Languages', icon: 'ri-code-s-slash-line', items: skills.languages || [] },
            { title: 'Frameworks', icon: 'ri-stack-line', items: skills.frameworks || [] },
            { title: 'Creative', icon: 'ri-palette-line', items: skills.others || [] }
        ];
        return `
            <div class="container">
                <div class="skills-header">
                    <h2>Tools & Technologies</h2>
                    <p style="color: var(--text-muted); margin-top: 10px;">Technologies I work with daily</p>
                </div>
                <div class="skills-categories">
                    ${categories.map((cat, catIndex) => `
                        <div class="skill-category animate-slide-up" style="animation-delay: ${catIndex * 0.1}s;">
                            <div class="category-header">
                                <i class="${cat.icon}" style="color: var(--primary);"></i>
                                <h3>${cat.title}</h3>
                            </div>
                            <div class="skill-items">
                                ${cat.items.map((skill, i) => `
                                    <div class="skill-item" style="--delay: ${(catIndex * 0.15) + (i * 0.08)}s; --skill-color: ${skill.color || '#ffffff'};">
                                        <div class="skill-icon-wrapper">
                                            ${Components.getIcon(skill)}
                                        </div>
                                        <span class="skill-name">${skill.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    renderGithubStats: (username) => {
        const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&title_color=58c4dc&icon_color=bd00ff&text_color=ffffff&bg_color=00000000&count_private=true&include_all_commits=true`;
        const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&title_color=58c4dc&text_color=888888&bg_color=00000000&langs_count=6`;
        const streakUrl = `https://streak-stats.demolab.com?user=${username}&theme=transparent&hide_border=true&ring=58c4dc&fire=bd00ff&currStreakLabel=58c4dc&sideLabels=888888&dates=888888&stroke=ffffff10`;
        return `
            <div class="container">
                <div class="skills-header">
                    <h2>GitHub Activity</h2>
                    <p style="color: var(--text-muted); margin-top: 10px;">My open source contributions</p>
                </div>
                <div class="bento-grid">
                    <div class="bento-card col-span-12 animate-slide-up" style="align-items: center; justify-content: center; padding: 30px;">
                        <img src="${streakUrl}" alt="GitHub Streak" style="width: 100%; max-width: 700px; height: auto;">
                    </div>
                    <div class="bento-card col-span-6 animate-slide-up" style="align-items: center; justify-content: center; padding: 30px;">
                        <img src="${statsUrl}" alt="GitHub Stats" style="width: 100%; height: auto;">
                    </div>
                    <div class="bento-card col-span-6 animate-slide-up" style="align-items: center; justify-content: center; padding: 30px;">
                        <img src="${langsUrl}" alt="Top Languages" style="width: 100%; height: auto;">
                    </div>
                </div>
            </div>
        `;
    },

    renderProjects: (projects) => {
        return `
            <div class="container">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px;">
                    <h2 style="margin: 0;">Projects <span style="font-size: 1rem; color: var(--text-muted); font-weight: 400;">(${projects.length} projects)</span></h2>
                    <a href="https://github.com/${settings.profile.github}" target="_blank" class="btn btn-outline" style="font-size: 0.85rem; padding: 10px 20px;">
                        <i class="ri-github-fill"></i> GitHub Profile
                    </a>
                </div>
                <div class="bento-grid">
                    ${projects.map(project => `
                        <div class="project-card col-span-4 animate-fade-in">
                            <div class="border-beam"></div>
                            <div class="project-card-inner" style="padding: 28px; display: flex; flex-direction: column;">
                                <div style="margin-bottom: 16px;">
                                    <i class="ri-folder-3-line" style="font-size: 1.3rem; color: var(--primary);"></i>
                                </div>
                                <h3 style="font-size: 1rem; margin-bottom: 10px;">${project.title}</h3>
                                <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px; line-height: 1.6; flex: 1;">
                                    ${project.description}
                                </p>
                                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                                </div>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto;">
                                    <a href="${project.link}" target="_blank"
                                        style="display: flex; align-items: center; gap: 6px; padding: 7px 14px; background: rgba(88,196,220,0.1); border: 1px solid rgba(88,196,220,0.2); border-radius: 20px; color: var(--primary); font-size: 0.78rem; text-decoration: none; transition: all 0.2s;">
                                        <i class="ri-external-link-line"></i> Visit
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    renderFooter: () => {
        return `
            <div class="container" style="padding: 80px 20px; text-align: center; border-top: 1px solid var(--glass-border);">
                <h2 style="margin-bottom: 20px;">Let's Work Together</h2>
                <p style="color: var(--text-muted); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto; font-size: 1.1rem;">
                    Have an idea? I can help you translate it into a digital reality.
                </p>
                <a href="mailto:${settings.profile.email}" class="btn" style="margin-bottom: 50px;">
                    <i class="ri-mail-send-line"></i> ${settings.profile.email}
                </a>
                <div class="social-links" style="margin-bottom: 40px; display: flex; justify-content: center; gap: 30px;">
                     ${settings.social.map(s => `
                        <a href="${s.link}" target="_blank" class="social-icon" title="${s.name}" style="font-size: 1.5rem; color: ${s.color || 'var(--text-muted)'};">
                            <i class="${s.icon}"></i>
                        </a>
                    `).join('')}
                </div>
                <div style="width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--glass-border), transparent); margin-bottom: 30px;"></div>
                <p style="font-size: 0.9rem; color: var(--text-muted);">
                    &copy; ${new Date().getFullYear()} ${settings.profile.name}. 
                    <span style="opacity: 0.5;">Values. Innovation. Execution.</span>
                </p>
            </div>
        `;
    }
};
