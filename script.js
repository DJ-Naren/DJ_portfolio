// ============================================================
//  CONFIGURATION – YOUR YOUTUBE API KEY & CHANNEL ID
// ============================================================

const YOUTUBE_URL = 'https://www.youtube.com/@DJGAMINGTAM1L';
const DISCORD_URL = 'https://discord.gg/KFTQs4P7zC';

const CHANNEL_ID = 'UC9SPJDEKRhJOUrNBF_4Klsw';
const YOUTUBE_API_KEY = 'AIzaSyD6aEh8MeY1IhlIOWS8c4UzJLkla25YjAQ';

// 👇 Replace with your actual Discord Guild ID (enable Developer Mode in Discord)
const DISCORD_GUILD_ID = '1323988813382684712';

// ============================================================
//  STATIC FALLBACK DATA
// ============================================================

const staticStats = { subs: 528000, views: 12500000, videos: 342, discord: 18500 };

const staticFeaturedVideos = [
    { id: 'Ba81jibKaXU', title: 'Among Us Tamil| Playing With Subscribers', views: '32', date: '1 year ago', thumb: 'thumbau1.jpg' },
    { id: 'RvxhuhPj7AE', title: 'Fun Games Tamil| Playing With Subscribers', views: '58', date: '11 months ago', thumb: 'thumbfg1.jpg' },
    { id: 'bdBVjuBWGUg', title: 'Playing Minecraft With Nanbargal ', views: '62', date: '11 months ago', thumb: 'thumbmc1.jpg' },
    { id: 'C5cROF8xIA0', title: 'Tamil SMP | Playing With Subscribers', views: '27', date: '7 month ago', thumb: 'thumbmc2.jpg' },
    { id: '5mpVyDsrlPU', title: 'MC Live | Playing with Subscribers ', views: '32', date: '1 month ago', thumb: 'thumbmc1.jpg' },
    { id: 'Y3aP4nDw_cM', title: 'STUMBLE GUYS LIVE 🔴 || Tamil Streamer', views: '67', date: '1 year ago', thumb: 'thumbsg1.jpg' },
    { id: 'dummy1', title: 'Survival Series Ep.1', views: '15', date: '1 month ago', thumb: 'thumbmc1.jpg' },
    { id: 'dummy2', title: 'SMP Tutorial: How to Build', views: '22', date: '3 weeks ago', thumb: 'thumbmc2.jpg' },
    { id: 'dummy3', title: 'Live Stream Highlights', views: '45', date: '2 weeks ago', thumb: 'thumbsg1.jpg' },
    { id: 'dummy4', title: 'Tamil Minecraft Survival', views: '30', date: '1 week ago', thumb: 'thumbau1.jpg' },
    { id: 'dummy5', title: 'SMP Event – PvP Tournament', views: '18', date: '5 days ago', thumb: 'thumbfg1.jpg' },
    { id: 'dummy6', title: 'Tutorial: Redstone Basics', views: '10', date: '3 days ago', thumb: 'thumbmc1.jpg' },
];

const galleryImages = [
    { src: 'mcimg1.png', title: 'Cherry blossom tree', cat: 'Nature' },
    { src: 'mcimg2.png', title: 'Sun Set', cat: 'Nature' },
    { src: 'mcimg3.png', title: 'Night Sky', cat: 'Nature' },
];

const testimonials = [
    { name: 'GamerTamil_99', avatar: '👤', rating: 5, comment: 'Best Tamil Minecraft community ever! The SMP server is amazing and everyone is so friendly. ❤️' },
    { name: 'CraftMasterTN', avatar: '👤', rating: 5, comment: 'DJ GAMING TAMIL has the most entertaining Minecraft content. Love the survival series! 🔥' },
    { name: 'MineTamilFan', avatar: '👤', rating: 5, comment: 'Joined the SMP last month and it\'s been incredible. Great economy, events, and people! ⛏️' },
    { name: 'SMPKing2026', avatar: '👤', rating: 5, comment: 'The tutorials helped me improve so much. Best Tamil Minecraft channel hands down! 🎮' },
];

const smpFeatures = [
    { icon: '⛏️', title: 'Survival Gameplay', desc: 'Pure vanilla-like survival experience with quality-of-life plugins.' },
    { icon: '💰', title: 'Economy System', desc: 'Player-driven economy with shops, auctions, and trading.' },
    { icon: '🏠', title: 'Land Claim', desc: 'Protect your builds with easy-to-use land claiming.' },
    { icon: '🎪', title: 'Events', desc: 'Weekly events, tournaments, and community challenges.' },
    { icon: '⚔️', title: 'PvP Arena', desc: 'Dedicated PvP zones for competitive battles.' },
    { icon: '🤝', title: 'Tamil Community', desc: 'Friendly Tamil-speaking community with active members.' },
    { icon: '🛡️', title: 'Anti-Grief', desc: 'Advanced protection against griefing and cheating.' },
    { icon: '🏆', title: 'Leaderboards', desc: 'Compete for top spots on various leaderboards.' },
];

// ============================================================
//  HELPER: Relative Date Formatter
// ============================================================

function getRelativeTime(publishedAt) {
    const now = new Date();
    const past = new Date(publishedAt);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffYear > 0) return diffYear + ' year' + (diffYear > 1 ? 's' : '') + ' ago';
    if (diffMonth > 0) return diffMonth + ' month' + (diffMonth > 1 ? 's' : '') + ' ago';
    if (diffDay > 0) return diffDay + ' day' + (diffDay > 1 ? 's' : '') + ' ago';
    if (diffHour > 0) return diffHour + ' hour' + (diffHour > 1 ? 's' : '') + ' ago';
    if (diffMin > 0) return diffMin + ' minute' + (diffMin > 1 ? 's' : '') + ' ago';
    return 'Just now';
}

// ============================================================
//  FETCH CHANNEL DATA
// ============================================================

async function fetchChannelData() {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('⚠️ No YouTube API key – using fallback data');
        return { stats: staticStats, videos: staticFeaturedVideos };
    }

    try {
        const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
        const statsRes = await fetch(statsUrl);
        const statsData = await statsRes.json();

        let stats = { ...staticStats };
        if (statsData.items && statsData.items.length > 0) {
            const s = statsData.items[0].statistics;
            stats = {
                subs: parseInt(s.subscriberCount) || 0,
                views: parseInt(s.viewCount) || 0,
                videos: parseInt(s.videoCount) || 0,
                discord: staticStats.discord
            };
        } else {
            console.warn('⚠️ No channel stats found – using fallback');
        }

        const videosUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`;
        const videosRes = await fetch(videosUrl);
        const videosData = await videosRes.json();

        let videos = staticFeaturedVideos;
        if (videosData.items && videosData.items.length > 0) {
            videos = videosData.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                views: 'N/A',
                date: getRelativeTime(item.snippet.publishedAt),
                thumb: item.snippet.thumbnails.high?.url || 
                       item.snippet.thumbnails.default?.url || 
                       staticFeaturedVideos[0].thumb
            }));
        } else {
            console.warn('⚠️ No videos found from API – using fallback');
        }

        return { stats, videos };

    } catch (err) {
        console.error('❌ Failed to fetch channel data:', err);
        console.log('🔄 Using fallback data instead');
        return { stats: staticStats, videos: staticFeaturedVideos };
    }
}

// ============================================================
//  PARTICLES
// ============================================================

function createParticles() {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.appendChild(container);
    const icons = ['⬛', '⛏️', '💎', '⚔️', '🪓', '🗡️', '🔷', '🟦'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        p.textContent = icons[Math.floor(Math.random() * icons.length)];
        p.style.cssText = `
            left:${Math.random()*90}%;
            top:${Math.random()*90}%;
            font-size:${12+Math.random()*20}px;
            animation-delay:${Math.random()*8}s;
            animation-duration:${6+Math.random()*10}s;
            opacity:${0.06+Math.random()*0.12};
            color: #D4AF37;
        `;
        container.appendChild(p);
    }
}
createParticles();

// ============================================================
//  SCROLL PROGRESS BAR
// ============================================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = progress + '%';
});

// ============================================================
//  REVEAL ON SCROLL
// ============================================================

function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
//  LIVE STATUS CHECK
// ============================================================

async function checkLiveStatus() {
    try {
        if (YOUTUBE_API_KEY && YOUTUBE_API_KEY !== 'YOUR_API_KEY_HERE') {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                return {
                    isLive: true,
                    videoId: video.id.videoId,
                    title: video.snippet.title,
                    url: `https://www.youtube.com/watch?v=${video.id.videoId}`
                };
            }
            return { isLive: false };
        }
        const fallbackUrl = `https://yt.lemnoslife.com/noKey/channels?part=liveStreamingDetails&id=${CHANNEL_ID}`;
        const res = await fetch(fallbackUrl);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
            const details = data.items[0].liveStreamingDetails;
            if (details && details.actualStartTime && !details.actualEndTime) {
                return { isLive: true, videoId: null, title: 'Live Now', url: YOUTUBE_URL };
            }
        }
        return { isLive: false };
    } catch (err) {
        console.error('Live status check failed:', err);
        return { isLive: false };
    }
}

// ============================================================
//  REACT COMPONENTS
// ============================================================

const { useState, useEffect, useRef, useCallback } = React;

// ---- Helper to render FontAwesome icons ----
const FaIcon = ({ icon, className = '' }) => {
    return React.createElement('i', { className: `fa-brands ${icon} ${className}` });
};

// --- Navbar Component ----

function Navbar({ isLive, liveUrl }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = ['Home', 'Videos', 'SMP Server', 'Gallery', 'About', 'Contact'];

    return React.createElement('nav', {
        className: `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'scrolled navbar-floating' : ''}`,
    },
        React.createElement('div', {
            className: `max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8 transition-all duration-500`,
            style: {
                // ✅ CENTERED: use 'auto' for left/right margin
                margin: scrolled ? '10px auto' : '0 auto',
                // ✅ Shrink width slightly when floating for the "pill" look
                width: scrolled ? 'calc(100% - 40px)' : '100%',
                background: scrolled ? 'rgba(10, 10, 10, 0.55)' : 'transparent',
                backdropFilter: scrolled ? 'blur(24px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
                borderRadius: scrolled ? '20px' : '0',
                border: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : 'none',
                boxShadow: scrolled
                    ? '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.05)'
                    : 'none',
                padding: scrolled ? '0 1.5rem' : '0 1rem',
            }
        },
            // Logo
            React.createElement('a', {
                href: YOUTUBE_URL,
                target: '_blank',
                className: 'flex items-center gap-3 text-white font-bold text-lg lg:text-xl no-underline transition-opacity hover:opacity-80'
            },
                React.createElement('img', { src: 'avatarHead3.png', alt: 'DJ GAMING TAMIL Logo', className: 'h-8 w-auto' }),
                React.createElement('span', { className: 'hidden sm:inline' }, 'DJ GAMING TAMIL')
            ),

            // Desktop menu
            React.createElement('ul', {
                className: `hidden lg:flex items-center gap-6 list-none ${mobileOpen ? 'mobile-menu open' : ''}`
            },
                ...menuItems.map(item =>
                    React.createElement('li', { key: item },
                        React.createElement('a', {
                            href: `#${item.toLowerCase().replace(' ', '-')}`,
                            className: 'text-gray-300 hover:text-gold no-underline font-medium text-sm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all hover:after:w-full'
                        }, item)
                    )
                ),
                isLive && React.createElement('li', { key: 'live-badge' },
                    React.createElement('a', {
                        href: liveUrl || YOUTUBE_URL,
                        target: '_blank',
                        className: 'live-badge inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider no-underline',
                        style: { background: '#FF2040', color: '#fff' }
                    },
                        React.createElement('span', { className: 'dot', style: { width: '8px', height: '8px', background: '#fff', borderRadius: '50%', display: 'inline-block' } }),
                        ' LIVE NOW'
                    )
                )
            ),

            // Desktop action buttons
            React.createElement('div', { className: 'hidden lg:flex items-center gap-3' },
                isLive && React.createElement('a', {
                    href: liveUrl || YOUTUBE_URL,
                    target: '_blank',
                    className: 'gold-btn text-sm px-5 py-2 rounded-full font-semibold ripple flex items-center gap-1',
                    style: { background: '#FF2040', color: '#fff', boxShadow: '0 0 20px rgba(255,32,64,0.6)' }
                }, '🔴 LIVE'),
                React.createElement('button', {
                    className: 'gold-btn text-sm px-5 py-2 rounded-full font-semibold ripple flex items-center gap-2',
                    onClick: () => window.open(YOUTUBE_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-youtube' }),
                    'Subscribe'
                ),
                React.createElement('button', {
                    className: 'gold-btn text-sm px-5 py-2 rounded-full font-semibold ripple flex items-center gap-2',
                    onClick: () => window.open(DISCORD_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-discord' }),
                    'Discord'
                )
            ),

            // Mobile menu toggle
            React.createElement('button', {
                className: 'lg:hidden text-white text-2xl bg-transparent border-none cursor-pointer transition-transform duration-300 hover:scale-110',
                onClick: () => setMobileOpen(!mobileOpen)
            }, mobileOpen ? '✕' : '☰')
        ),

        // Mobile menu dropdown
        mobileOpen && React.createElement('div', {
            className: 'lg:hidden absolute top-16 left-0 right-0 px-6 py-4 flex flex-col gap-3',
            style: {
                background: 'rgba(10, 10, 10, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '2px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                animation: 'slideDown 0.3s ease-out'
            }
        },
            ...menuItems.map(item =>
                React.createElement('a', {
                    key: item,
                    href: `#${item.toLowerCase().replace(' ', '-')}`,
                    className: 'text-gray-300 hover:text-gold no-underline font-medium text-sm py-2 transition-colors',
                    onClick: () => setMobileOpen(false)
                }, item)
            ),
            isLive && React.createElement('a', {
                href: liveUrl || YOUTUBE_URL,
                target: '_blank',
                className: 'live-badge inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider no-underline',
                style: { background: '#FF2040', color: '#fff', alignSelf: 'flex-start' }
            }, '🔴 LIVE NOW'),
            React.createElement('div', { className: 'flex gap-3 mt-2 flex-wrap' },
                React.createElement('button', {
                    className: 'gold-btn text-sm px-4 py-2 rounded-full font-semibold flex items-center gap-2',
                    onClick: () => window.open(YOUTUBE_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-youtube' }),
                    'Subscribe'
                ),
                React.createElement('button', {
                    className: 'gold-btn text-sm px-4 py-2 rounded-full font-semibold flex items-center gap-2',
                    onClick: () => window.open(DISCORD_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-discord' }),
                    'Discord'
                )
            )
        )
    );
}
// ---- Hero ----
function HeroSection({ isLive, liveUrl }) {
    return React.createElement('section', { id: 'home', className: 'relative min-h-screen flex items-center justify-center overflow-hidden pt-16' },
        React.createElement('div', { className: 'absolute inset-0 z-0', style: { background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%), linear-gradient(180deg, #0A0A0A 0%, #111827 50%, #0A0A0A 100%)' } }),
        ...[...Array(12)].map((_, i) =>
            React.createElement('div', { key: `block-${i}`, className: 'minecraft-block', style: { left: `${5 + Math.random() * 85}%`, top: `${10 + Math.random() * 75}%`, animationDelay: `${Math.random() * 7}s`, animationDuration: `${5 + Math.random() * 8}s`, width: `${25 + Math.random() * 35}px`, height: `${25 + Math.random() * 35}px`, borderColor: 'rgba(212,175,55,0.2)', background: 'rgba(212,175,55,0.03)' } })
        ),
        React.createElement('div', { className: 'relative z-10 text-center px-4 max-w-4xl mx-auto' },
            React.createElement('img', { src: 'avatarHead3.png', alt: 'DJ GAMING TAMIL Logo', className: 'reveal h-24 sm:h-32 md:h-40 w-auto mx-auto mb-6 animate-float', style: { filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.5))' } }),
            isLive && React.createElement('div', { className: 'reveal mb-4 flex justify-center' },
                React.createElement('a', { href: liveUrl || YOUTUBE_URL, target: '_blank', className: 'live-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider no-underline', style: { background: '#FF2040', color: '#fff', animation: 'pulseLive 1.4s ease-in-out infinite, glowLive 1.4s ease-in-out infinite alternate' } },
                    React.createElement('span', { className: 'dot', style: { width: '10px', height: '10px', background: '#fff', borderRadius: '50%', display: 'inline-block' } }),
                    '🔴 LIVE NOW – Watch Now'
                )
            ),
            React.createElement('h1', { className: 'reveal text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 text-white', style: { letterSpacing: '-0.5px', textShadow: '0 0 60px rgba(212,175,55,0.3)' } }, 'DJ GAMING TAMIL'),
            React.createElement('p', { className: 'reveal text-lg sm:text-xl md:text-2xl text-gold font-semibold mb-3' }, 'Join the Ultimate Tamil Minecraft Community'),
            React.createElement('p', { className: 'reveal text-gray-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base' }, 'Explore survival adventures, SMP gameplay, tutorials, community events, and epic Minecraft content.'),
            React.createElement('div', { className: 'reveal flex flex-wrap gap-4 justify-center' },
                isLive && React.createElement('a', { href: liveUrl || YOUTUBE_URL, target: '_blank', className: 'gold-btn text-sm sm:text-base px-6 py-3 rounded-full font-bold ripple flex items-center gap-2', style: { background: '#FF2040', color: '#fff', boxShadow: '0 0 30px rgba(255,32,64,0.6)' } }, '🔴 Watch Live'),
                React.createElement('button', {
                    className: 'gold-btn text-sm sm:text-base px-6 py-3 rounded-full font-bold ripple flex items-center gap-2',
                    onClick: () => window.open(YOUTUBE_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-youtube' }),
                    'Subscribe on YouTube'
                ),
                React.createElement('button', {
                    className: 'gold-btn text-sm sm:text-base px-6 py-3 rounded-full font-bold ripple flex items-center gap-2',
                    onClick: () => window.open(DISCORD_URL, '_blank')
                },
                    React.createElement(FaIcon, { icon: 'fa-discord' }),
                    'Join Discord'
                ),
                React.createElement('button', { className: 'gold-outline-btn text-sm sm:text-base px-6 py-3 rounded-full font-bold ripple', onClick: () => document.getElementById('smp-server').scrollIntoView({ behavior: 'smooth' }) }, '⛏️ Explore SMP')
            )
        )
    );
}

// ---- StatsSection ----
function StatsSection({ stats }) {
    const [counts, setCounts] = useState({ subs: 0, views: 0, videos: 0, discord: 0 });
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!DISCORD_GUILD_ID || DISCORD_GUILD_ID === '1323988813382684712') return;
        const fetchDiscordMembers = async () => {
            try {
                const res = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`);
                const data = await res.json();
                if (data && data.members) {
                    const count = data.members.length;
                    setCounts(prev => ({ ...prev, discord: count }));
                }
            } catch (err) {
                console.warn('Discord widget fetch failed, using fallback:', err);
                setCounts(prev => ({ ...prev, discord: staticStats.discord }));
            }
        };
        fetchDiscordMembers();
        const interval = setInterval(fetchDiscordMembers, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) setStarted(true);
        }, { threshold: 0.4 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const targets = stats || staticStats;
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(prev => ({
                subs: Math.round(targets.subs * eased),
                views: Math.round(targets.views * eased),
                videos: Math.round(targets.videos * eased),
                discord: prev.discord || Math.round(targets.discord * eased)
            }));
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, [started, stats]);

    const statItems = [
        { label: 'Subscribers', value: counts.subs, icon: '👥', format: (v) => (v / 1000).toFixed(1) + 'K' },
        { label: 'Total Views', value: counts.views, icon: '👁️', format: (v) => (v / 1000).toFixed(0) + 'K' },
        { label: 'Videos Uploaded', value: counts.videos, icon: '🎬', format: (v) => v + '+' },
        { label: 'Discord Members', value: counts.discord, icon: '💬', format: (v) => (v / 1000).toFixed(1) + 'K' },
    ];

    return React.createElement('section', { ref, className: 'relative py-16 px-4 z-10', style: { background: 'rgba(17,24,39,0.3)' } },
        React.createElement('div', { className: 'max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6' },
            ...statItems.map((s, i) =>
                React.createElement('div', { key: i, className: 'glass-card p-6 text-center reveal', style: { animationDelay: `${i * 0.15}s` } },
                    React.createElement('div', { className: 'text-3xl mb-2' }, s.icon),
                    React.createElement('div', { className: 'text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold' }, s.format(s.value)),
                    React.createElement('div', { className: 'text-gray-400 text-sm mt-1' }, s.label)
                )
            )
        )
    );
}

// ---- VideosSection ----
function VideosSection({ videos }) {
    const [allVideos, setAllVideos] = useState(videos || staticFeaturedVideos);
    const [viewAll, setViewAll] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [displayVideos, setDisplayVideos] = useState([]);

    // Add this inside the VideosSection component
useEffect(() => {
    // Give React a tiny moment to paint the new cards
    const timer = setTimeout(() => {
        // Create a fresh observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        // Observe ONLY the reveal elements inside the Videos section
        document.querySelectorAll('#videos .reveal').forEach(el => observer.observe(el));

        // Cleanup observer when the component re-renders or unmounts
        return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
}, [displayVideos]); // 👈 This is the magic: re-run whenever the video list changes

    const getCategory = (title) => {
        const lower = title.toLowerCase();
        if (lower.includes('smp')) return 'SMP';
        if (lower.includes('live') || lower.includes('stream')) return 'Live';
        if (lower.includes('tutorial') || lower.includes('how to') || lower.includes('guide')) return 'Tutorials';
        if (lower.includes('survival')) return 'Survival';
        return 'Other';
    };

    useEffect(() => {
        let filtered = allVideos;
        if (activeFilter !== 'All') {
            filtered = allVideos.filter(v => getCategory(v.title) === activeFilter);
        }
        if (!viewAll) {
            filtered = filtered.slice(0, 6);
        }
        setDisplayVideos(filtered);
    }, [allVideos, viewAll, activeFilter]);

    useEffect(() => {
        if (videos && videos.length > 0) {
            setAllVideos(videos);
        }
    }, [videos]);

    const filterOptions = ['All', 'Survival', 'SMP', 'Live', 'Tutorials'];

    if (!displayVideos || displayVideos.length === 0) {
        return React.createElement('section', { id: 'videos', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
            React.createElement('div', { className: 'text-center text-gray-400' }, 'Loading videos...')
        );
    }

    return React.createElement('section', { id: 'videos', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'text-center mb-8 reveal' },
            React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'Content Hub'),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white' },
                'Latest ', React.createElement('span', { className: 'text-gold' }, 'Videos')
            ),
            React.createElement('p', { className: 'text-gray-400 mt-3 max-w-xl mx-auto' }, 'Watch the latest Minecraft survival, SMP, and tutorial content.')
        ),
        React.createElement('div', { className: 'flex flex-wrap justify-center gap-2 mb-8 reveal' },
            ...filterOptions.map(cat =>
                React.createElement('button', {
                    key: cat,
                    onClick: () => setActiveFilter(cat),
                    className: `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeFilter === cat ? 'bg-gold text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`
                }, cat)
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' },
            ...displayVideos.map((v, i) =>
                React.createElement('div', {
                    key: i,
                    className: 'glass-card overflow-hidden reveal cursor-pointer',
                    style: { animationDelay: `${i * 0.1}s` },
                    onClick: () => window.open(`https://www.youtube.com/watch?v=${v.id}`, '_blank')
                },
                    React.createElement('div', { className: 'h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden' },
                        React.createElement('img', { src: v.thumb, alt: v.title, className: 'w-full h-full object-cover', onError: (e) => { e.target.src = 'thumbau1.jpg'; } }),
                        React.createElement('div', { className: 'absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300', style: { background: 'rgba(0,0,0,0.5)' } },
                            React.createElement('span', { className: 'text-4xl text-white' }, '▶')
                        )
                    ),
                    React.createElement('div', { className: 'p-4' },
                        React.createElement('h3', { className: 'text-white font-semibold text-sm mb-2 line-clamp-2' }, v.title),
                        React.createElement('div', { className: 'flex justify-between text-xs text-gray-400' },
                            React.createElement('span', null, '👁️ ', v.views),
                            React.createElement('span', null, '📅 ', v.date)
                        )
                    )
                )
            )
        ),
        React.createElement('div', { className: 'text-center mt-10 reveal' },
            React.createElement('button', {
                onClick: () => setViewAll(!viewAll),
                className: 'gold-btn text-sm sm:text-base px-6 py-3 rounded-full font-bold ripple'
            }, viewAll ? '⬆ Show Less' : '⬇ View All Videos')
        )
    );
}

// ---- SMP Server ----
function SMPServerSection() {
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState({
        loading: true,
        online: false,
        players: { online: 0, max: 0 },
        version: '',
        motd: '',
        playerList: [],
        error: false,
        isTimeout: false
    });

    const serverIP = 'GP-Public_Network.aternos.me';
    const serverPort = '45911';
    const fullAddress = `${serverIP}:${serverPort}`;

    const fetchStatus = useCallback(async () => {
        try {
            let response = await fetch(`https://api.mcsrvstat.us/2/${fullAddress}`);
            let data = await response.json();

            if (data.online === false || data.status === 'error') {
                const backupRes = await fetch(`https://api.mcstatus.io/v2/status/java/${fullAddress}`);
                const backupData = await backupRes.json();

                if (backupData.status === 'error' && backupData.error?.includes('Timeout')) {
                    setStatus({
                        loading: false,
                        online: true,
                        players: { online: '?', max: '?' },
                        version: '1.8 - 1.21 (Query Port Blocked)',
                        motd: '🔒 Player count hidden – enable query port in server.properties',
                        playerList: [],
                        error: false,
                        isTimeout: true
                    });
                    return;
                }

                if (backupData.online) {
                    data = {
                        online: true,
                        players: {
                            online: backupData.players?.online || 0,
                            max: backupData.players?.max || 0,
                            list: backupData.players?.list?.map(p => p.name) || []
                        },
                        version: backupData.version?.name || 'Unknown',
                        motd: backupData.motd?.clean?.[0] || 'Welcome!'
                    };
                }
            }

            if (data.online) {
                let playerNames = [];
                if (data.players?.list && Array.isArray(data.players.list)) {
                    playerNames = data.players.list.map(p => typeof p === 'string' ? p : p.name || 'Unknown');
                }

                setStatus({
                    loading: false,
                    online: true,
                    players: { online: data.players?.online || 0, max: data.players?.max || 0 },
                    version: data.version || 'Unknown',
                    motd: data.motd?.clean?.[0] || data.motd?.raw?.[0] || 'Welcome!',
                    playerList: playerNames,
                    error: false,
                    isTimeout: false
                });
            } else {
                setStatus({ loading: false, online: false, players: { online: 0, max: 0 }, version: '', motd: '', playerList: [], error: false, isTimeout: false });
            }
        } catch (err) {
            console.error('❌ All APIs failed:', err);
            setStatus({ loading: false, online: false, players: { online: 0, max: 0 }, version: '', motd: '', playerList: [], error: true, isTimeout: false });
        }
    }, [fullAddress]);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 60000);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    const copyIP = () => {
        navigator.clipboard.writeText(fullAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const playerListDisplay = status.playerList.length > 0
        ? status.playerList.slice(0, 10).join(', ') + (status.playerList.length > 10 ? ` and ${status.playerList.length - 10} more` : '')
        : 'None online';

    // Helper to get status color and label
    const getStatusInfo = () => {
        if (status.loading) return { color: 'bg-yellow-400', label: 'Checking...', pulse: true };
        if (status.isTimeout) return { color: 'bg-blue-400', label: 'Online (Query Blocked)', pulse: false };
        if (status.online) return { color: 'bg-green-400', label: 'Online', pulse: true };
        return { color: 'bg-red-500', label: 'Offline', pulse: false };
    };

    const statusInfo = getStatusInfo();

    return React.createElement('section', { id: 'smp-server', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        // Section header
        React.createElement('div', { className: 'text-center mb-12 reveal' },
            React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'Multiplayer'),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white' }, 'SMP ', React.createElement('span', { className: 'text-gold' }, 'Server')),
            React.createElement('p', { className: 'text-gray-400 mt-3 max-w-xl mx-auto' }, 'Join the official DJ GAMING TAMIL SMP Server – play with the community!')
        ),

        // Main server card
        React.createElement('div', { className: 'glass-card p-6 sm:p-8 max-w-3xl mx-auto mb-10 reveal transition-all duration-300 hover:border-gold/40 hover:shadow-2xl' },
            // Status bar
            React.createElement('div', { className: 'flex items-center gap-3 mb-6' },
                React.createElement('span', {
                    className: `w-3 h-3 rounded-full ${statusInfo.color} ${statusInfo.pulse ? 'animate-pulse' : ''}`
                }),
                React.createElement('span', { className: status.online || status.isTimeout ? 'text-gold font-semibold' : 'text-red-500 font-semibold' },
                    statusInfo.label
                ),
                status.online && !status.loading && !status.isTimeout && React.createElement('span', { className: 'text-gray-400 text-sm ml-auto' },
                    `👥 ${status.players.online} / ${status.players.max} players`
                ),
                status.isTimeout && React.createElement('span', { className: 'text-yellow-400 text-sm ml-auto' }, '🔒 Player count hidden')
            ),

            // Server name
            React.createElement('h3', { className: 'text-2xl font-bold text-white mb-4' }, 'DJ GAMING TAMIL SMP'),

            // IP Display with copy button
            React.createElement('div', { className: 'flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 mb-6 border border-gray-700' },
                React.createElement('span', { className: 'text-gray-400 text-sm font-medium' }, 'IP:'),
                React.createElement('code', { className: 'flex-1 text-gold font-mono text-sm sm:text-base' }, fullAddress),
                React.createElement('button', {
                    onClick: copyIP,
                    className: `px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${copied ? 'bg-gold text-black' : 'bg-gray-700 hover:bg-gold hover:text-black text-white'}`
                }, copied ? '✅ Copied!' : '📋 Copy')
            ),

            // Server details grid
            React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm' },
                React.createElement('div', { className: 'flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg' },
                    React.createElement('span', { className: 'text-gray-400' }, 'Version'),
                    React.createElement('span', { className: 'text-white font-mono' }, status.loading ? 'Loading...' : status.online ? status.version : 'N/A')
                ),
                React.createElement('div', { className: 'flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg' },
                    React.createElement('span', { className: 'text-gray-400' }, 'Port'),
                    React.createElement('span', { className: 'text-white font-mono' }, serverPort)
                ),
                status.online && !status.loading && !status.isTimeout && React.createElement('div', { className: 'flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg col-span-2 sm:col-span-1' },
                    React.createElement('span', { className: 'text-gray-400' }, 'MOTD'),
                    React.createElement('span', { className: 'text-gold font-mono text-xs truncate max-w-[150px]' }, status.motd)
                ),
                status.online && !status.loading && !status.isTimeout && status.players.online > 0 && React.createElement('div', { className: 'flex justify-between py-2 px-3 bg-gray-800/30 rounded-lg col-span-2 sm:col-span-1' },
                    React.createElement('span', { className: 'text-gray-400' }, 'Players Online'),
                    React.createElement('span', { className: 'text-white text-xs truncate max-w-[150px]' }, playerListDisplay)
                )
            ),

            // Join button (copy IP)
            React.createElement('button', {
                onClick: copyIP,
                className: `w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${copied ? 'bg-gold text-black' : 'gold-btn'}`
            }, copied ? '✅ Copied! Join Now!' : '📋 Copy IP Address')
        ),

        // Features grid
        React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10' },
            ...smpFeatures.map((f, i) =>
                React.createElement('div', {
                    key: i,
                    className: 'glass-card p-4 text-center reveal transition-all duration-300 hover:scale-105 hover:border-gold/30 hover:shadow-gold/20',
                    style: { animationDelay: `${i * 0.08}s` }
                },
                    React.createElement('div', { className: 'text-3xl mb-2 transition-transform duration-300 group-hover:scale-110' }, f.icon),
                    React.createElement('h4', { className: 'text-white font-semibold text-sm' }, f.title),
                    React.createElement('p', { className: 'text-gray-500 text-xs mt-1 hidden sm:block' }, f.desc)
                )
            )
        )
    );
}
// ---- GallerySection ----
function GallerySection() {
    const [lightbox, setLightbox] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredImages = galleryImages.slice(0, 3);

    const openLightbox = (img, index) => {
        setLightbox(img);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightbox(null);
        document.body.style.overflow = 'auto';
    };

    const goPrev = (e) => {
        e && e.stopPropagation();
        const newIndex = (currentIndex - 1 + featuredImages.length) % featuredImages.length;
        setCurrentIndex(newIndex);
        setLightbox(featuredImages[newIndex]);
    };

    const goNext = (e) => {
        e && e.stopPropagation();
        const newIndex = (currentIndex + 1) % featuredImages.length;
        setCurrentIndex(newIndex);
        setLightbox(featuredImages[newIndex]);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightbox) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                goPrev(e);
            } else if (e.key === 'ArrowRight') {
                goNext(e);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox, currentIndex]);

    return React.createElement('section', { id: 'gallery', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'text-center mb-12 reveal' },
            React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'Moments'),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white' }, 'Gallery ', React.createElement('span', { className: 'text-gold' }, 'Showcase'))
        ),
        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' },
            ...featuredImages.map((img, i) =>
                React.createElement('div', { key: i, className: 'glass-card overflow-hidden cursor-pointer reveal', style: { animationDelay: `${i * 0.1}s` }, onClick: () => openLightbox(img, i) },
                    React.createElement('div', { className: 'h-64 sm:h-80 bg-gray-800 flex items-center justify-center relative overflow-hidden' },
                        React.createElement('img', { src: img.src, alt: img.title, className: 'w-full h-full object-cover', onError: (e) => { e.target.src = 'mcimg1.png'; } })
                    ),
                    React.createElement('div', { className: 'p-4' },
                        React.createElement('p', { className: 'text-white font-semibold text-lg' }, img.title),
                        React.createElement('span', { className: 'text-gold text-sm' }, img.cat)
                    )
                )
            )
        ),
        lightbox && React.createElement('div', { className: 'lightbox active', onClick: closeLightbox },
            React.createElement('div', { className: 'relative flex items-center justify-center w-full h-full', onClick: (e) => e.stopPropagation() },
                React.createElement('button', { onClick: goPrev, className: 'absolute left-4 z-20 text-white text-4xl bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200', style: { top: '50%', transform: 'translateY(-50%)' } }, '❮'),
                React.createElement('button', { onClick: goNext, className: 'absolute right-4 z-20 text-white text-4xl bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200', style: { top: '50%', transform: 'translateY(-50%)' } }, '❯'),
                React.createElement('div', { className: 'text-center max-w-4xl mx-auto px-4' },
                    React.createElement('img', { src: lightbox.src, alt: lightbox.title, className: 'max-w-[90vw] max-h-[80vh] rounded-xl object-contain', style: { border: '2px solid rgba(212,175,55,0.3)', boxShadow: '0 0 60px rgba(212,175,55,0.3)' }, onError: (e) => { e.target.src = 'mcimg1.png'; } }),
                    React.createElement('p', { className: 'text-white mt-4 text-xl font-bold' }, lightbox.title),
                    React.createElement('p', { className: 'text-gold' }, lightbox.cat),
                    React.createElement('p', { className: 'text-gray-400 text-sm mt-2' }, `${currentIndex + 1} / ${featuredImages.length}`)
                ),
                React.createElement('button', { onClick: closeLightbox, className: 'absolute top-4 right-4 text-white text-3xl bg-transparent border-none cursor-pointer hover:text-gold transition-colors z-30' }, '✕')
            )
        )
    );
}

// ---- CommunitySection ----
function CommunitySection() {
    return React.createElement('section', { id: 'community', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'glass-card p-8 sm:p-12 text-center reveal max-w-3xl mx-auto', style: { borderColor: 'rgba(212,175,55,0.3)' } },
            React.createElement('div', { className: 'text-6xl mb-4 text-gold flex justify-center' },
                React.createElement(FaIcon, { icon: 'fa-discord' })
            ),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl font-extrabold text-white mb-3' }, 'Join Our ', React.createElement('span', { className: 'text-gold' }, 'Discord')),
            React.createElement('p', { className: 'text-gray-400 mb-6 max-w-lg mx-auto' }, 'Connect with 18,500+ Tamil Minecraft players. Get server updates, participate in events, and make new friends!'),
            React.createElement('div', { className: 'flex flex-wrap gap-4 justify-center mb-6' },
                React.createElement('div', { className: 'text-center px-4' }, React.createElement('div', { className: 'text-2xl font-bold text-white' }, '18.5K+'), React.createElement('div', { className: 'text-gray-500 text-xs' }, 'Members')),
                React.createElement('div', { className: 'text-center px-4' }, React.createElement('div', { className: 'text-2xl font-bold text-gold' }, '4'), React.createElement('div', { className: 'text-gray-500 text-xs' }, 'Upcoming Events')),
                React.createElement('div', { className: 'text-center px-4' }, React.createElement('div', { className: 'text-2xl font-bold text-gold' }, '24/7'), React.createElement('div', { className: 'text-gray-500 text-xs' }, 'Active Chat'))
            ),
            React.createElement('button', { className: 'gold-btn text-base px-8 py-4 rounded-full font-bold ripple flex items-center gap-2 mx-auto', onClick: () => window.open(DISCORD_URL, '_blank') },
                React.createElement(FaIcon, { icon: 'fa-discord' }),
                'Join Discord Community'
            )
        )
    );
}

// ---- AboutSection ----
function AboutSection() {
    return React.createElement('section', { id: 'about', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-10 items-center' },
            React.createElement('div', { className: 'reveal flex justify-center' },
                React.createElement('img', { src: 'avatarHead3.png', alt: 'DJ GAMING TAMIL Logo', className: 'w-56 h-56 sm:w-72 sm:h-72 rounded-full object-cover border-4 border-gold', style: { boxShadow: '0 0 80px rgba(212,175,55,0.4)' }, onError: (e) => { e.target.src = 'avatarHead3.png'; } })
            ),
            React.createElement('div', { className: 'reveal' },
                React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'About'),
                React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4' }, 'DJ GAMING ', React.createElement('span', { className: 'text-gold' }, 'TAMIL')),
                React.createElement('p', { className: 'text-gray-300 mb-4 leading-relaxed' }, 'Welcome to the ultimate Tamil Minecraft community! We create epic survival content, host an incredible SMP server, and bring together Tamil gamers from around the world.'),
                React.createElement('p', { className: 'text-gray-400 mb-6 leading-relaxed' }, 'Our mission is to build the most welcoming and exciting Minecraft community for Tamil players. From beginners to pros, everyone has a place here.'),
                React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                    ['Minecraft Survival', 'SMP Series', 'Tutorials', 'Challenges', 'Community Events', 'Live Streams'].map((item, i) =>
                        React.createElement('div', { key: i, className: 'flex items-center gap-2 text-gray-300 text-sm' }, React.createElement('span', { className: 'text-gold' }, '▸'), item)
                    )
                )
            )
        )
    );
}

// ---- TestimonialsSection ----
function TestimonialsSection() {
    return React.createElement('section', { id: 'testimonials', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'text-center mb-12 reveal' },
            React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'Reviews'),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white' }, 'Community ', React.createElement('span', { className: 'text-gold' }, 'Love'))
        ),
        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' },
            ...testimonials.map((t, i) =>
                React.createElement('div', { key: i, className: 'glass-card p-5 reveal', style: { animationDelay: `${i * 0.12}s` } },
                    React.createElement('div', { className: 'flex items-center gap-3 mb-3' },
                        React.createElement('div', { className: 'w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg' }, t.avatar),
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-white font-semibold text-sm' }, t.name),
                            React.createElement('div', { className: 'text-gold text-xs' }, '⭐'.repeat(t.rating))
                        )
                    ),
                    React.createElement('p', { className: 'text-gray-400 text-sm leading-relaxed' }, t.comment)
                )
            )
        )
    );
}

// ---- ContactSection ----
function ContactSection() {
    return React.createElement('section', { id: 'contact', className: 'py-16 px-4 max-w-7xl mx-auto relative z-10' },
        React.createElement('div', { className: 'text-center mb-12 reveal' },
            React.createElement('div', { className: 'text-gold text-sm font-semibold tracking-widest uppercase mb-2' }, 'Get In Touch'),
            React.createElement('h2', { className: 'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white' }, 'Contact ', React.createElement('span', { className: 'text-gold' }, 'Us'))
        ),
        React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto' },
            React.createElement('form', { className: 'glass-card p-6 sm:p-8 reveal space-y-5', onSubmit: (e) => { e.preventDefault(); alert('Message sent! We will get back to you soon. 🎮'); } },
                React.createElement('input', { type: 'text', placeholder: 'Your Name', required: true, className: 'w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors' }),
                React.createElement('input', { type: 'email', placeholder: 'Your Email', required: true, className: 'w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors' }),
                React.createElement('input', { type: 'text', placeholder: 'Subject', className: 'w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors' }),
                React.createElement('textarea', { placeholder: 'Your Message', rows: 5, required: true, className: 'w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors resize-none' }),
                React.createElement('button', { type: 'submit', className: 'gold-btn w-full py-3 rounded-xl font-bold text-base' }, '📩 Send Message')
            ),
            React.createElement('div', { className: 'glass-card p-6 sm:p-8 reveal space-y-6' },
                React.createElement('h3', { className: 'text-xl font-bold text-white' }, 'Connect With Us'),
                [
                    { icon: React.createElement(FaIcon, { icon: 'fa-youtube', className: 'text-2xl text-gold' }), label: 'YouTube', val: 'Your Channel', link: YOUTUBE_URL },
                    { icon: React.createElement(FaIcon, { icon: 'fa-discord', className: 'text-2xl text-gold' }), label: 'Discord', val: 'Join Server', link: DISCORD_URL },
                    { icon: React.createElement(FaIcon, { icon: 'fa-instagram', className: 'text-2xl text-gold' }), label: 'Instagram', val: '@djgamingtamil', link: 'https://instagram.com/yourhandle' },
                    { icon: React.createElement(FaIcon, { icon: 'fa-envelope', className: 'text-2xl text-gold' }), label: 'Business Email', val: 'contact@djgamingtamil.com', link: 'mailto:contact@djgamingtamil.com' },
                ].map((item, i) =>
                    React.createElement('a', { key: i, href: item.link, target: '_blank', className: 'flex items-center gap-4 py-3 border-b border-gray-800 no-underline hover:bg-gray-800/50 transition-colors rounded-lg px-2' },
                        item.icon,
                        React.createElement('div', null,
                            React.createElement('div', { className: 'text-gray-400 text-xs' }, item.label),
                            React.createElement('div', { className: 'text-gold font-semibold text-sm' }, item.val)
                        )
                    )
                )
            )
        )
    );
}

// ---- Footer ----
function Footer() {
    return React.createElement('footer', { className: 'relative z-10 border-t border-gold/20 py-10 px-4 mt-8' },
        React.createElement('div', { className: 'max-w-7xl mx-auto text-center' },
            React.createElement('div', { className: 'flex items-center justify-center gap-2 text-white font-bold text-xl mb-4' },
                React.createElement('img', { src: 'avatarHead3.png', alt: 'Logo', className: 'h-6 w-auto inline-block', onError: (e) => { e.target.src = 'avatarHead3.png'; } }),
                'DJ GAMING TAMIL'
            ),
            React.createElement('div', { className: 'flex gap-6 justify-center mb-6 text-2xl' },
                React.createElement('a', { href: YOUTUBE_URL, target: '_blank', className: 'text-gray-400 hover:text-gold transition-colors no-underline', title: 'YouTube' },
                    React.createElement(FaIcon, { icon: 'fa-youtube' })
                ),
                React.createElement('a', { href: DISCORD_URL, target: '_blank', className: 'text-gray-400 hover:text-gold transition-colors no-underline', title: 'Discord' },
                    React.createElement(FaIcon, { icon: 'fa-discord' })
                ),
                React.createElement('a', { href: 'https://instagram.com/yourhandle', target: '_blank', className: 'text-gray-400 hover:text-gold transition-colors no-underline', title: 'Instagram' },
                    React.createElement(FaIcon, { icon: 'fa-instagram' })
                ),
                React.createElement('a', { href: '#', className: 'text-gray-400 hover:text-gold transition-colors no-underline', title: 'Music' },
                    React.createElement(FaIcon, { icon: 'fa-music' })
                )
            ),
            React.createElement('div', { className: 'flex gap-4 justify-center flex-wrap mb-6 text-sm' },
                ['Home', 'Videos', 'SMP Server', 'Gallery', 'About', 'Contact'].map(link =>
                    React.createElement('a', { key: link, href: `#${link.toLowerCase().replace(' ', '-')}`, className: 'text-gray-400 hover:text-white no-underline transition-colors' }, link)
                )
            ),
            React.createElement('p', { className: 'text-gray-600 text-xs' }, '© 2026 DJ GAMING TAMIL. All Rights Reserved. | Made with ❤️ for the Tamil Minecraft Community')
        )
    );
}

// ---- App ----
function App() {
    const [isLive, setIsLive] = useState(false);
    const [liveUrl, setLiveUrl] = useState(null);
    const [channelStats, setChannelStats] = useState(staticStats);
    const [latestVideos, setLatestVideos] = useState(staticFeaturedVideos);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const { stats, videos } = await fetchChannelData();
        setChannelStats(stats);
        setLatestVideos(videos);
        setLoading(false);
    }, []);

    const fetchLive = useCallback(async () => {
        const result = await checkLiveStatus();
        setIsLive(result.isLive);
        setLiveUrl(result.url || null);
    }, []);

    useEffect(() => {
        fetchData();
        fetchLive();
        const intervalData = setInterval(fetchData, 300000);
        const intervalLive = setInterval(fetchLive, 300000);
        return () => {
            clearInterval(intervalData);
            clearInterval(intervalLive);
        };
    }, [fetchData, fetchLive]);

    useEffect(() => {
        const timer = setTimeout(() => setupReveal(), 100);
        return () => clearTimeout(timer);
    }, []);

    return React.createElement('div', { className: 'relative' },
        React.createElement(Navbar, { isLive, liveUrl }),
        React.createElement(HeroSection, { isLive, liveUrl }),
        React.createElement(StatsSection, { stats: channelStats }),
        React.createElement(VideosSection, { videos: latestVideos }),
        React.createElement(SMPServerSection),
        React.createElement(GallerySection),
        React.createElement(CommunitySection),
        React.createElement(AboutSection),
        React.createElement(TestimonialsSection),
        React.createElement(ContactSection),
        React.createElement(Footer)
    );
}

// ============================================================
//  MOUNT REACT
// ============================================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

// ===== HIDE LOADING SCREEN =====
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 400);
}

// Re-run reveal after React paints
setTimeout(() => setupReveal(), 300);