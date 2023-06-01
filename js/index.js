const navBar = document.getElementById('nav-bar__list');
const imagesContainer = document.getElementById('images-container');
const modalWindow = document.getElementById('image-view-modal-wrapper');
const modalWindowImage = document.getElementById('image-view-modal__image');
const closeModalButton = document.getElementById('close-button');

const navBarLiElements = [];
let isModalOpen = false;

let selectedSectionId;

const openModal = (e) => {
    e.preventDefault();

    if (!isModalOpen) {
        isModalOpen = true;

        const imageNumber = e.target.getAttribute('imageNumber');

        modalWindowImage.src = `./assets/img/${SECTIONS[selectedSectionId].key}/photo-${imageNumber}.jpeg`

        modalWindowImage.alt = `photo-${imageNumber}`;

        modalWindow.style.display = 'flex';
    }
}

const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isModalOpen) {
        isModalOpen = false;

        modalWindow.style.display = 'none';
    }
}

const renderImagesList = (sectionId) => {
    for (let i = 1; i <= SECTIONS[sectionId].count; i++) {
        const imageCardElement = document.createElement('div');
        const imgElement = document.createElement('img');

        imageCardElement.classList.add('image-card');

        imgElement.classList.add('image-card__image');
        imgElement.src = `./assets/img/${SECTIONS[sectionId].key}/photo-${i}.jpeg`;
        imgElement.alt = `photo-${i}`;
        imgElement.setAttribute('imageNumber', i);

        imageCardElement.setAttribute('imageNumber', i);
        imageCardElement.addEventListener('click', openModal)

        imageCardElement.appendChild(imgElement);

        imagesContainer.appendChild(imageCardElement);
    }
}

const onSectionSelect = (e) => {
    e.preventDefault();

    const prevSelectedSection = document.getElementById(SECTIONS[selectedSectionId].key);

    prevSelectedSection.classList.remove('selected');

    e.target.classList?.add('selected');

    const newSelectedSectionId = e.target.getAttribute('selectedSectionId') || 0;
    
    selectedSectionId = newSelectedSectionId;

    imagesContainer.innerHTML = '';

    renderImagesList(newSelectedSectionId);
}

SECTIONS.forEach((section, index) => {
    const liElement = document.createElement('li');

    liElement.classList.add('nav-bar__list__element');
    liElement.id = section.key;
    liElement.textContent = section.name;
    liElement.setAttribute('selectedSectionId', index);

    liElement.addEventListener('click', onSectionSelect)

    if (index === 0) {
        liElement.classList.add('selected');

        selectedSectionId = index;

        renderImagesList(selectedSectionId);
    }

    navBar.appendChild(liElement);
});

closeModalButton.addEventListener('click', closeModal);

modalWindow.addEventListener('click', closeModal);

modalWindowImage.addEventListener('click', (e) => e.stopPropagation());

// modalWindow.style.display = 'none';