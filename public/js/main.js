const spanElement = document.querySelector('#output');


function onSubmit(e) {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;

  if (prompt === '') {
    alert('Cümle yada paragraf girin');
    return;
  }

  generateImageRequest(prompt);
}

async function generateImageRequest(prompt) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
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

document.querySelector('#image-form').addEventListener('submit', onSubmit);

spanElement.addEventListener('click', copyToClipboard);

