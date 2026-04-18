(function() {
    'use strict';

    // ---------- おみくじ抽選ロジック ----------
    const BINARY_LIST = [
        "0000", "0001", "0010", "0011",
        "0100", "0101", "0110", "0111",
        "1000", "1001", "1010", "1011",
        "1100", "1101", "1110", "1111"
    ];
    const WAIT_TIME = 2500;
    const CARD_COUNT = 16;

    const cardsGrid = document.getElementById('cardsGrid');
    const binaryNumber = document.getElementById('binary-number');
    const binarySuffix = document.getElementById('binary-suffix');
    const waitingMsg = document.getElementById('waiting-message');

    let isDrawing = false;
    let timeoutId = null;

    function buildCards() {
        if (!cardsGrid) return;
        cardsGrid.innerHTML = '';
        for (let i = 0; i < CARD_COUNT; i++) {
            const card = document.createElement('div');
            card.className = 'omikuji-card';
            card.textContent = 'おみくじ';
            card.setAttribute('data-index', i);
            card.addEventListener('click', onCardClick);
            cardsGrid.appendChild(card);
        }
    }

    function onCardClick() {
        if (isDrawing) return;
        startDrawing();
    }

    function startDrawing() {
        isDrawing = true;
        const allCards = document.querySelectorAll('.omikuji-card');
        allCards.forEach(card => card.classList.add('disabled'));

        if (binaryNumber) binaryNumber.textContent = '';
        if (binarySuffix) binarySuffix.textContent = '';
        if (waitingMsg) waitingMsg.textContent = '抽選中・・・';

        const randomIndex = Math.floor(Math.random() * BINARY_LIST.length);
        const selectedBinary = BINARY_LIST[randomIndex];

        timeoutId = setTimeout(() => {
            if (binaryNumber) binaryNumber.textContent = selectedBinary;
            if (binarySuffix) binarySuffix.textContent = '(2)';
            if (waitingMsg) waitingMsg.textContent = '';

            allCards.forEach(card => card.classList.remove('disabled'));
            isDrawing = false;
            timeoutId = null;
        }, WAIT_TIME);
    }

    function initializeDisplay() {
        if (binaryNumber) binaryNumber.textContent = '----';
        if (binarySuffix) binarySuffix.textContent = '';
        if (waitingMsg) waitingMsg.textContent = '';
    }

    // ---------- ハンバーガーメニュー制御（常時表示・全幅展開） ----------
    const toggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            toggleBtn.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
            });
        });
    }

    // ---------- スムーススクロール（遊び方リンク用） ----------
    document.querySelectorAll('a[href="#howto"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#howto');
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // メニュー内の「遊び方」も同様に
    document.querySelectorAll('.nav-menu a[href="#howto"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#howto');
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ---------- 初期化 ----------
    function init() {
        buildCards();
        initializeDisplay();

        window.addEventListener('beforeunload', function() {
            if (timeoutId) clearTimeout(timeoutId);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
