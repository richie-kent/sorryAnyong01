// 1. Smooth Scroll
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


const overlay = document.getElementById("start-overlay");
overlay.addEventListener("click", () => {
    bgMusic.play().catch(() => {});
    playPauseBtn.innerHTML = "⏸";
    gsap.to(overlay,{
        opacity:0,
        duration:1,
        ease:"power2.out",
        onComplete: () => {

    overlay.style.display = "none";

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });

    lenis.scrollTo(0, {
        immediate: true
    });

}
    });
});

// ===============================
// 2. Audio & Video Logic
// ===============================

// Background Music
const bgMusic = new Audio("locationUnknown.mp3"); // Ganti dengan nama lagu kamu
bgMusic.loop = true;
bgMusic.volume = 0.6;

// Video
const memoryVideo = document.getElementById("memoryVideo");

// Play / Pause Button
const playPauseBtn = document.getElementById("playPause");

// ===============================
// Start Overlay
// ===============================
document.getElementById("start-overlay").addEventListener("click", () => {

    bgMusic.play().catch(() => {});

    playPauseBtn.innerHTML = "⏸";

    gsap.to("#start-overlay", {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            document.getElementById("start-overlay").style.display = "none";
        }
    });

});

// ===============================
// Music Player Button
// ===============================
playPauseBtn.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play().catch(() => {});
        playPauseBtn.innerHTML = "⏸";

    } else {

        bgMusic.pause();
        playPauseBtn.innerHTML = "▶";

    }

});

// ===============================
// Sync Music With Video
// ===============================

// Saat video diputar
memoryVideo.addEventListener("play", () => {

    if (!bgMusic.paused) {

        gsap.to(bgMusic, {
            volume: 0,
            duration: 0.8,
            onComplete: () => {
                bgMusic.pause();
            }
        });

    }

});

// Saat video di-pause
memoryVideo.addEventListener("pause", () => {

    bgMusic.volume = 0;

    bgMusic.play().catch(() => {});

    gsap.to(bgMusic, {
        volume: 0.6,
        duration: 0.8
    });

});

// Saat video selesai
memoryVideo.addEventListener("ended", () => {

    bgMusic.volume = 0;

    bgMusic.play().catch(() => {});

    gsap.to(bgMusic, {
        volume: 0.6,
        duration: 0.8
    });

});

// 3. Floating Decorations (Hearts, Petals)
function createDecorations() {
    const container = document.getElementById('decorations');
    const emojis = ['🌸', '✨', '💖', '☁️', '🌷'];
    
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.fontSize = (Math.random() * 20 + 10) + 'px';
        p.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(p);
    }
}
createDecorations();

// 4. Letter Interaction
gsap.from(".letter-card", {
    scrollTrigger: {
        trigger: ".letter-card",
        start: "top 80%"
    },
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out"
});

// 5. GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".polaroid").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        rotation: Math.random() * 20 - 10,
        duration: 1.2,
        ease: "back.out(1.7)"
    });
});

function scrollToNext() {
    lenis.scrollTo('.album');
}
