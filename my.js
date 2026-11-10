'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById('galleryTrack');
    var galleryWindow = document.getElementById('galleryWindow');
    var items = document.querySelectorAll('.gallery-item');

    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');
    var pagerPrev = document.getElementById('pagerPrev');
    var pagerNext = document.getElementById('pagerNext');

    var pagerPages = document.getElementById('pagerPages');
    var pageCounter = document.getElementById('pageCounter');

    var currentPage = 0;
    var itemsPerPage = 3;
    var pageCount = 1;

    function getItemsPerPage() {
        return window.matchMedia('(max-width: 600px)').matches ? 1 : 3;
    }

    function updateGallery() {
        var itemWidth = galleryWindow.clientWidth / itemsPerPage;

        track.style.transform =
            'translateX(-' + (currentPage * itemsPerPage * itemWidth) + 'px)';

        prevButton.disabled = currentPage === 0;
        pagerPrev.disabled = currentPage === 0;

        nextButton.disabled = currentPage === pageCount - 1;
        pagerNext.disabled = currentPage === pageCount - 1;

        pageCounter.textContent =
            'Страница ' + (currentPage + 1) + ' из ' + pageCount;

        var buttons = pagerPages.querySelectorAll('.pager-page');

        buttons.forEach(function (button, index) {
            button.classList.toggle('active', index === currentPage);
        });
    }

    function createPager() {
        pagerPages.textContent = '';

        for (var i = 0; i < pageCount; i++) {
            var button = document.createElement('button');

            button.type = 'button';
            button.className = 'pager-page';
            button.textContent = String(i + 1);

            button.addEventListener('click', function (event) {
                currentPage = Number(event.currentTarget.textContent) - 1;
                updateGallery();
            });

            pagerPages.appendChild(button);
        }
    }

    function configureGallery() {
        itemsPerPage = getItemsPerPage();
        pageCount = Math.ceil(items.length / itemsPerPage);

        if (currentPage > pageCount - 1) {
            currentPage = pageCount - 1;
        }

        createPager();
        updateGallery();
    }

    function showPrevious() {
        if (currentPage > 0) {
            currentPage--;
            updateGallery();
        }
    }

    function showNext() {
        if (currentPage < pageCount - 1) {
            currentPage++;
            updateGallery();
        }
    }

    prevButton.addEventListener('click', showPrevious);
    pagerPrev.addEventListener('click', showPrevious);

    nextButton.addEventListener('click', showNext);
    pagerNext.addEventListener('click', showNext);

    window.addEventListener('resize', configureGallery);

    configureGallery();
});
