async function generateVideo() {
  const prompt = document.getElementById('prompt').value;
  const loading = document.getElementById('loading');
  const videoContainer = document.getElementById('videoContainer');

  if (!prompt.trim()) {
    alert("Please enter a prompt.");
    return;
  }

  loading.classList.remove('hidden');
  videoContainer.innerHTML = '';

  try {
    const response = await fetch("https://default-application-8669587.p.rapidapi.com/generate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "82ae10db11mshb41ccacdd991130p108a22jsnf3ae22b94bbd",
        "X-RapidAPI-Host": "default-application-8669587.p.rapidapi.com"
      },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();

    if (data.video_url) {
      const video = document.createElement('video');
      video.src = data.video_url;
      video.controls = true;
      video.autoplay = true;
      video.className = "mx-auto rounded shadow-lg";
      video.width = 480;
      videoContainer.appendChild(video);
    } else {
      videoContainer.innerHTML = `<p class="text-red-600">❌ Error generating video. Try a different prompt.</p>`;
    }
  } catch (error) {
    console.error(error);
    videoContainer.innerHTML = `<p class="text-red-600">⚠️ An error occurred. Check the console or try again later.</p>`;
  } finally {
    loading.classList.add('hidden');
  }
}
