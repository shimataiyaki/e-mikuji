/* ============================================
   script.js - デジタルおみくじ（e-mikuji）本番版
   固定ヘッダー + 16枚札 + ポップアップ統合
   ※自動消滅なし
   ============================================ */

(function() {
    'use strict';

    // 抽選データ（四・十四を避け、十七・十八で16種類に）
    const NUMBER_LIST = [
        "一", "二", "三", "五",
        "六", "七", "八", "九",
        "十", "十一", "十二", "十三",
        "十五", "十六", "十七", "十八"
    ];
    const WAIT_TIME = 2500;     // 2.5秒
    const CARD_COUNT = 16;

    // DOM要素
    const cardsGrid = document.getElementById('cardsGrid');
    const waitingMsg = document.getElementById('waitingMessage');
    const modal = document.getElementById('resultModal');
    const modalNumber = document.getElementById('modalNumber');
    const modalClose = document.getElementById('modalClose');

    let isDrawing = false;
    let timeoutId = null;
    // 自動消滅タイマーは廃止

    // ---------- 札を16枚生成 ----------
    function buildCards() {
        cardsGrid.innerHTML = '';
        for (let i = 0; i < CARD_COUNT; i++) {
            const card = document.createElement('div');
            card.className = 'omikuji-card';
            card.textContent = 'おみくじ';
            card.addEventListener('click', onCardClick);
            cardsGrid.appendChild(card);
        }
    }

    function onCardClick() {
        if (isDrawing) return;
        startDrawing();
    }

    // ---------- 抽選開始 ----------
    function startDrawing() {
        isDrawing = true;

        const allCards = document.querySelectorAll('.omikuji-card');
        allCards.forEach(c => c.classList.add('disabled'));

        waitingMsg.textContent = '抽選中・・・';

        const randomIndex = Math.floor(Math.random() * NUMBER_LIST.length);
        const selected = NUMBER_LIST[randomIndex];

        timeoutId = setTimeout(() => {
            modalNumber.textContent = selected;
            waitingMsg.textContent = '';
            showModal();
            timeoutId = null;
        }, WAIT_TIME);
    }

    // ---------- ポップアップ表示（自動消滅なし） ----------
    function showModal() {
        if (!modal) return;
        modal.classList.add('show');
        // 自動消滅タイマーは設定しない
    }

    // ---------- リセット処理 ----------
    function resetEverything() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        // 自動消滅タイマーのクリアは不要
        waitingMsg.textContent = '';
        isDrawing = false;
        const allCards = document.querySelectorAll('.omikuji-card');
        allCards.forEach(c => c.classList.remove('disabled'));
        if (modal) modal.classList.remove('show');
    }

    // ---------- ハンバーガーメニュー制御 ----------
    function setupMobileMenu() {
        const toggleBtn = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
            const expanded = navMenu.classList.contains('show');
            this.setAttribute('aria-expanded', expanded);
        });

        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- スムーススクロール ----------
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#howto') {
                    e.preventDefault();
                    const target = document.querySelector('#howto');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ---------- 初期化 ----------
    function init() {
        buildCards();
        waitingMsg.textContent = '';

        setupMobileMenu();
        setupSmoothScroll();

        if (modalClose) {
            modalClose.addEventListener('click', resetEverything);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                resetEverything();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                resetEverything();
            }
        });

        window.addEventListener('beforeunload', () => {
            if (timeoutId) clearTimeout(timeoutId);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
