const spanElement = document.querySelector('#output');
const selectElement = document.querySelector('#selection');
const title = document.querySelector('#title');
const submitButton = document.querySelector('.btn');
const changeEmoji = document.getElementById('emoji-change');

// English Corrector
function onSubmit(e) {
  e.preventDefault();

  
  const selectValue = selectElement.value;


  const prompt = document.querySelector('#prompt').value;
  const editedPrompt =
    selectValue === 'translate'
      ? 'Translate this into english: ' + prompt
      : 'Correct this to standard English: ' + prompt;

  console.log(editedPrompt);

  if (prompt === '') {
    alert('Cümle yada paragraf girin');
    return;
  }

  generateCorrectEnglish(editedPrompt);
}

async function generateCorrectEnglish(editedPrompt) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        editedPrompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('prompt could not be generated');
    }

    const data = await response.json();

    const aiOutput = data.data;
    document.querySelector('#output').textContent = aiOutput;

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

function copyToClipboard() {
  const promptValue = document.querySelector('#prompt').value;

  navigator.clipboard.writeText(promptValue);
}

function handleSelectChange() {
  const selectValue = selectElement.value;
  selectValue === 'translate'
    ? (title.textContent = 'İngilizceye Çevir')
    : (title.textContent = 'İngilizceyi Düzelt');

  selectValue === 'translate'
    ? (submitButton.textContent = 'Çevir')
    : (submitButton.textContent = 'Düzelt');

    selectValue === 'translate'
    ? (changeEmoji.textContent = '🇹🇷')
    : (changeEmoji.textContent = '🇬🇧');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

spanElement.addEventListener('click', copyToClipboard);

selectElement.addEventListener('change', handleSelectChange);
