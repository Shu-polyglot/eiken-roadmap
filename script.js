const form = document.querySelector('#consultation-form');
const success = document.querySelector('.form-success');
const choices = document.querySelectorAll('.choice');
const generateButton = document.querySelector('#generate-roadmap');
const outputTitle = document.querySelector('#output-title');
const outputNote = document.querySelector('#output-note');
const outputStatus = document.querySelector('#output-status');
const taskList = document.querySelector('#task-list');
const selections = { level: '英検®2級', schedule: '部活と両立' };

form.addEventListener('submit', (event) => {
  event.preventDefault();
  success.textContent = 'お問い合わせを受け付けました。確認後、2営業日以内にご連絡します。';
  success.style.display = 'block';
  form.reset();
});

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const group = choice.parentElement.dataset.choice;
    choice.parentElement.querySelectorAll('.choice').forEach((item) => item.classList.remove('active'));
    choice.classList.add('active');
    selections[group] = choice.dataset.value;
  });
});

generateButton.addEventListener('click', () => {
  const isPre1 = selections.level === '英検®準1級';
  const intensive = selections.schedule === '短期集中';
  const tasks = isPre1
    ? [['MON', '語彙 40語 + 長文精読', '40 min'], ['WED', '要約 1題 + 添削を反映', '45 min'], ['SAT', '英作文 1題 + 音読', '45 min']]
    : [['MON', '語彙 30語 + リスニング 15分', '25 min'], ['WED', '長文 1題 + 間違い直し', '35 min'], ['SAT', 'ライティング 1題', '30 min']];
  if (intensive) tasks[2] = [tasks[2][0], `${tasks[2][1]} + 模試チェック`, isPre1 ? '70 min' : '55 min'];
  outputStatus.textContent = 'UPDATING';
  generateButton.disabled = true;
  window.setTimeout(() => {
    outputTitle.textContent = `${selections.level}へ向けた、今週の最適プラン`;
    taskList.innerHTML = tasks.map(([day, task, time]) => `<div><span>${day}</span><p>${task}</p><b>${time}</b></div>`).join('');
    outputNote.textContent = intensive
      ? '短期集中モード。週末に実戦演習を入れ、得点源をつくります。'
      : '忙しい週でも「ゼロにしない」設計から始めます。';
    outputStatus.textContent = 'UPDATED ✓';
    generateButton.disabled = false;
  }, 380);
});
