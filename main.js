        const totalSlides = 5;
        let currentSlide = 1;
        const slides = Array.from({ length: totalSlides }, (_, i) => document.getElementById(`slide${i + 1}`));
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicator = document.getElementById('currentSlideIndicator');
        const progressBar = document.getElementById('progressBar');
        const fullscreenBtn = document.getElementById('fullscreenBtn');

        function updateSlide(target) {
            if (target < 1 || target > totalSlides) return;
            slides.forEach((s, i) => s.classList.toggle('active', i === target - 1));
            currentSlide = target;
            indicator.textContent = currentSlide;
            progressBar.style.width = `${(currentSlide / totalSlides) * 100}%`;
            prevBtn.style.opacity = currentSlide === 1 ? '0.4' : '1';
            prevBtn.disabled = currentSlide === 1;
            nextBtn.innerHTML = currentSlide === totalSlides
                ? 'Restart <i class="fa-solid fa-rotate-left ml-1"></i>'
                : 'Next <i class="fa-solid fa-chevron-right ml-1"></i>';
        }

        const goNext = () => updateSlide(currentSlide === totalSlides ? 1 : currentSlide + 1);
        const goPrev = () => { if (currentSlide > 1) updateSlide(currentSlide - 1); };

        nextBtn.addEventListener('click', goNext);
        prevBtn.addEventListener('click', goPrev);

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
        });

        let touchStartX = 0;
        document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        document.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (diff < -50) goNext();
            else if (diff > 50) goPrev();
        }, { passive: true });

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.().catch(() => {});
            } else {
                document.exitFullscreen?.();
            }
        });
        document.addEventListener('fullscreenchange', () => {
            const icon = fullscreenBtn.querySelector('i');
            icon.className = document.fullscreenElement ? 'fa-solid fa-compress text-xs sm:text-sm' : 'fa-solid fa-expand text-xs sm:text-sm';
        });

        updateSlide(1);