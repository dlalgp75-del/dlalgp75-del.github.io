const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const topButton = document.querySelector('.top-button');
const year = document.querySelector('#year');
const opsSimulator = document.querySelector('[data-ops-simulator]');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.textContent = isOpen ? '메뉴' : '닫기';
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (!event.target.matches('a')) return;

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '메뉴';
  siteNav.classList.remove('is-open');
});

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const panel = item.querySelector('.accordion-panel');
    const toggle = item.querySelector('.toggle');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isOpen));
    item.classList.toggle('is-open', !isOpen);
    panel.hidden = isOpen;
    toggle.textContent = isOpen ? '+' : '−';
  });
});

if (opsSimulator) {
  const participantRange = opsSimulator.querySelector('[data-participant-range]');
  const weekRange = opsSimulator.querySelector('[data-week-range]');
  const participantOutput = opsSimulator.querySelector('[data-participant-output]');
  const weekOutput = opsSimulator.querySelector('[data-week-output]');
  const scoreOutput = opsSimulator.querySelector('[data-ops-score]');
  const messageOutput = opsSimulator.querySelector('[data-ops-message]');
  const rhythmOutput = opsSimulator.querySelector('[data-ops-rhythm]');
  const deliverableOutput = opsSimulator.querySelector('[data-ops-deliverable]');
  const checklist = opsSimulator.querySelector('[data-ops-checklist]');
  const focusButtons = opsSimulator.querySelectorAll('[data-focus-option]');

  const focusContent = {
    launch: {
      deliverable: '온보딩 안내문',
      message: '참여자 흐름을 빠르게 잡고, 안내 메시지와 사전 체크리스트를 먼저 고정하는 구성이 좋습니다.',
      items: ['참여자 명단과 연락 채널 정리', '첫 안내 메시지와 제출 일정 확정', '문의 응대 기준과 담당자 역할 분리']
    },
    live: {
      deliverable: '운영 상황판',
      message: '실시간 이슈 대응과 일정 조율이 중요합니다. 현장 기록과 담당자별 액션을 짧게 반복 점검하세요.',
      items: ['세션별 출결과 이슈 로그 관리', '강사·멘토 전달사항 사전 공유', '지연 상황에 대한 대체 진행안 준비']
    },
    report: {
      deliverable: '성과 요약 리포트',
      message: '종료 후 바로 보고 가능한 상태를 목표로, 수치와 사례를 운영 중에 함께 모아두는 방식이 효율적입니다.',
      items: ['만족도 문항과 응답 수집 방식 확정', '결과물 제출 현황과 우수 사례 정리', '성과보고서 목차와 핵심 메시지 구성']
    }
  };

  let activeFocus = 'launch';

  function getRhythm(participants, weeks, score) {
    if (score >= 82 || participants >= 90) return '상시 모니터링';
    if (score >= 68 || weeks <= 3) return '주 3회 체크인';
    if (participants >= 35) return '주 2회 체크인';
    return '주 1회 체크인';
  }

  function updateSimulator() {
    const participants = Number(participantRange.value);
    const weeks = Number(weekRange.value);
    const focusWeight = activeFocus === 'live' ? 12 : activeFocus === 'report' ? 8 : 5;
    const score = Math.min(96, Math.round(34 + participants * 0.38 + weeks * 3.2 + focusWeight));
    const content = focusContent[activeFocus];

    participantOutput.textContent = `${participants}명`;
    weekOutput.textContent = `${weeks}주`;
    scoreOutput.textContent = score;
    messageOutput.textContent = content.message;
    rhythmOutput.textContent = getRhythm(participants, weeks, score);
    deliverableOutput.textContent = content.deliverable;
    checklist.innerHTML = content.items.map((item) => `<li>${item}</li>`).join('');
  }

  focusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFocus = button.dataset.focusOption;

      focusButtons.forEach((option) => {
        const isActive = option === button;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
      });

      updateSimulator();
    });
  });

  participantRange.addEventListener('input', updateSimulator);
  weekRange.addEventListener('input', updateSimulator);
  updateSimulator();
}

function updateTopButton() {
  topButton.classList.toggle('is-visible', window.scrollY > 500);
}

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateTopButton, { passive: true });

year.textContent = new Date().getFullYear();
updateTopButton();
