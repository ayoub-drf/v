const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-times");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
});

const searchInput = document.querySelector("#section-search input#search-input");
const gameCards = Array.from(document.querySelectorAll("#featured-games .baps .bav"));

searchInput.focus();

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  gameCards.forEach((card) => {
    const title = card.querySelector("a span.title").textContent.toLowerCase();
    
    let hasResults = true;
    if (title.includes(searchTerm)) {
      card.style.display = "block";
      hasResults = true;
    } else {
      card.style.display = "none";
      hasResults = false;
    }
  });
});


gameCards.forEach((game) => {
  game.addEventListener("click", (e) => {

    let data;
    let card = e.currentTarget;

    // Option A: using data attributes
    if (card.dataset.title) {
      data = {
        title: card.dataset.title,
        image: card.dataset.image,
        screenshots: card.dataset.screenshots,
        features: JSON.parse(card.dataset.features)
      };

      document.querySelector('.game-modal').querySelector('.game-info img').src = data.image;
      document.querySelector('.game-modal').querySelector('.game-info img').alt = data.title;
      document.querySelector('.game-modal').querySelector('.game-info .game-details h1').innerHTML = data.title;
      // document.querySelector('.game-modal').querySelector('.features .feature-list').innerHTML = data.title;

      let featuresUl = '';
      data.features.forEach((li) => {
        featuresUl += `<li>${li}</li>`;
      })
      document.querySelector('.game-modal').querySelector('.features .feature-list').innerHTML = featuresUl;


      // let screenshotsImgs = '';
      // JSON.parse(data.screenshots).forEach((im) => {
      //   screenshotsImgs += `<img src="${im}" class="screenshot" />`;
      // })
      // document.querySelector('.game-modal').querySelector('.screenshots .screenshot-grid').innerHTML = screenshotsImgs;
    }

    // console.log(`<li>${[...data.features]}</li>`)

    document.querySelector('.game-modal').classList.add('show')
  })
});

document.querySelector('.game-modal #close-game-modal').onclick = () => {
  document.querySelector('.game-modal').classList.remove('show')
}

function changeInstallTab(tabIndex) {
  const tabs = document.querySelectorAll('.install-tab');
  tabs.forEach((tab, index) => {
      tab.classList.toggle('active', index === tabIndex);
  });
  
  document.getElementById('android-steps').style.display = tabIndex === 0 ? 'block' : 'none';
  document.getElementById('ios-steps').style.display = tabIndex === 1 ? 'block' : 'none';
}


const helpButton = document.getElementById("helpButton");
const helpModal = document.getElementById("helpModal");
const closeHelpModal = document.getElementById("closeHelpModal");
const closeHelpBtn = document.getElementById("closeHelpBtn");


helpButton.addEventListener("click", () => {
  helpModal.classList.add("active");
});


[closeHelpModal, closeHelpBtn].forEach((el) => {
  el.addEventListener("click", () => {
    helpModal.classList.remove("active");
  });
});



document.querySelector('.game-modal').querySelector('.download-section .download-btn-android').onclick = async () => {
  let gameName = document.querySelector('.game-modal').querySelector('.game-info .game-details h1').innerText.toLowerCase()

  _jb();
}
document.querySelector('.game-modal').querySelector('.download-section .download-btn-ios').onclick = async () => {
  let gameName = document.querySelector('.game-modal').querySelector('.game-info .game-details h1').innerText.toLowerCase()

  _jb();
}
// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());

// Disable common inspect shortcuts
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' || 
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || 
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
  }
});
