const text = "Je m’appelle Johnny Kipp, je viens du Grand Est, et depuis toujours, l’informatique me passionne. Il y a quelques années, j’ai découvert le monde du développement web, une révélation qui m’a poussé à entamer une reconversion professionnelle. Aujourd’hui, je me consacre pleinement à cette voie, avec envie et détermination.";

    // Découpe le texte en mots et les place dans des <span>
    const container = document.getElementById('animated-text');
    const words = text.split(" ");

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word 
      container.appendChild(span);
      container.appendChild(document.createTextNode(" ")); // <-- espace après chaque span
    });

    // Animation : apparition progressive des mots
    const wordSpans = document.querySelectorAll('.word');
    wordSpans.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add('visible');
      }, index * 100); // 100ms entre chaque mot
    });

    /* *********************** icons *************************** */
window.addEventListener('load', () => {
    const iconWave = document.querySelector('.icon-wave');
    const icons = document.querySelectorAll('.icon-wave img');

    // Affiche le conteneur après 2400ms (juste avant les animations)
    setTimeout(() => {
        iconWave.style.opacity = '1';
        iconWave.style.visibility = 'visible';
    }, 1500);

    icons.forEach((icon, index) => {
      // Récupère le transform CSS initial
      const initialTransform = getComputedStyle(icon).transform;

      // Si pas de transform, mettre identity
      const baseTransform = (initialTransform === 'none') ? '' : initialTransform;

      // Avant l'animation : décalage de -50px + transform existant
      icon.style.transform = `${baseTransform} translateX(-50px)`;
      icon.style.opacity = '0';

      // Animation progressive par délai
      setTimeout(() => {
      icon.style.transition = 'transform 5s ease, opacity 5s ease';
      icon.style.opacity = '0.6';
      icon.style.transform = baseTransform;
    }, 1500 + index * 600);
  });
});

/*  ************************ Projects ************************ */

document.addEventListener("DOMContentLoaded", () => {
  const jsonData = document.getElementById("project-data").textContent;
  const projects = JSON.parse(jsonData);

  const phoneScreen = document.querySelector(".phone-screen");
  const tabletScreen = document.querySelector(".tablet-screen");
  const desktopScreen = document.querySelector(".desktop-screen");

  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-description");
  const popupImage = document.getElementById("popup-image");
  const closePopupBtn = document.querySelector(".close-popup");

  // Crée une icône pour mobile/tablette
  const createAppIcon = (project, index) => {
    const icon = document.createElement("div");
    icon.className = `app-icon app-icon-${index}`;
    icon.title = project.title;
    icon.tabIndex = 0;

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;

    icon.appendChild(img);
    icon.addEventListener("click", () => openPopup(project, icon));
    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openPopup(project, icon);
    });

    return icon;
  };

  // Crée une carte projet pour desktop
  const createProjectCard = (project, index) => {
    const card = document.createElement("div");
    card.className = `project-card project-card-${index}`;
    card.tabIndex = 0;

    // --- Barre supérieure avec 3 points ---
    const windowHeader = document.createElement("div");
    windowHeader.className = "window-header";
  
    const red = document.createElement("span");
    red.className = "window-dot red";
  
    const yellow = document.createElement("span");
    yellow.className = "window-dot yellow";
  
    const green = document.createElement("span");
    green.className = "window-dot green";
  
    windowHeader.append(red, yellow, green);
    card.appendChild(windowHeader);

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.textContent = project.description;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);

    card.addEventListener("click", () => openPopup(project, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openPopup(project, card);
    });

    return card;
  };

  // Injection des icônes et cartes dans les écrans
  projects.forEach((project, index) => {
    phoneScreen.appendChild(createAppIcon(project, index));
    tabletScreen.appendChild(createAppIcon(project, index));
    desktopScreen.appendChild(createProjectCard(project, index));
  });

  // Nouvelle version de openPopup avec l'élément déclencheur
  const openPopup = (project, triggerElement) => {
    popupTitle.textContent = project.title;
    popupDesc.textContent = project.description;
    popupImage.src = project.image;
    // S'assurer que l'image est bien dans un wrapper 
    if (!popupImage.parentElement.classList.contains("zoom-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("zoom-wrapper");
      popupImage.parentElement.insertBefore(wrapper, popupImage);
      wrapper.appendChild(popupImage);
    }
    popupImage.alt = project.title;

    // Calculer la position de l’élément cliqué
    const rect = triggerElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Définir transform-origin sur la popup pour que le zoom parte de ce point
    popup.style.transformOrigin = `${centerX}px ${centerY}px`;

    popup.setAttribute("aria-hidden", "false");
    popup.classList.add("visible");
  };

  const closePopup = () => {
    popup.setAttribute("aria-hidden", "true");
    popup.classList.remove("visible");
    popup.style.transformOrigin = "center"; // reset à propre
    popupImage.classList.remove("zoomed");
  };

  closePopupBtn.addEventListener("click", closePopup);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  popupImage.addEventListener("click", () => {
    popupImage.classList.toggle("zoomed");
  });
});















