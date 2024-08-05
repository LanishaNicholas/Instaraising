$(document).ready(function(){

    // Scrolling News
    /*let scrolling = true;

    function stopScrollAndRedirect(newsId) {
      scrolling = false;
      window.location.href = `news/${newsId}.html`; // Replace with your news URLs
    }

    const newsContent = document.querySelector('.news-content');
    const newsItems = document.querySelectorAll('.news-item');

    newsContent.addEventListener('mouseenter', () => {
      scrolling = false;
    });

    newsContent.addEventListener('mouseleave', () => {
      scrolling = true;
    });

    function updateNews() {
      if (scrolling) {
        newsContent.style.animation = 'scrollNews 40s linear infinite';
      } else {
        newsContent.style.animation = 'none';
      }
    }

    setInterval(updateNews, 100);*/

    var part1 = $('.enpart1');
    // var language            = sessionStorage.getItem('selectedLanguage');
    part1.on('click', function(){
       console.log('click part1 - english');
      window.location.href = '../../views/en/updatesandnews.html';

    });

    $('.nopart1').on('click', function(){
      console.log('click part1 - norsk');
      window.location.href = '../../views/no/updatesandnews.html';
    });

    $('.svpart1').on('click', function(){
      window.location.href = '../../views/sv/updatesandnews.html';
    });

    $('.dkpart1').on('click', function(){
      window.location.href = '../../views/dk/updatesandnews.html';
    });

    $('.fipart1').on('click', function(){
      window.location.href = '../../views/fi/updatesandnews.html';
    });

    $('.ispart1').on('click', function(){
      window.location.href = '../../views/is/updatesandnews.html';
    });

    $('.reporten').on('click', function(){
      window.location.href = '../../views/en/reports.html';
    });

    $('.partnersen').on('click', function(){
      window.location.href = '../../views/en/partners.html';
    });

    $('.projectsen').on('click', function(){
      window.location.href = '../../views/en/projects.html';
    });

    $('.partnersno').on('click', function(){
      window.location.href = '../../views/no/partners.html';
    });

    $('.projectsno').on('click', function(){
      window.location.href = '../../views/no/projects.html';
    });

    $('.partnerssv').on('click', function(){
      window.location.href = '../../views/sv/partners.html';
    });

    $('.projectssv').on('click', function(){
      window.location.href = '../../views/sv/projects.html';
    });

    $('.partnersdk').on('click', function(){
      window.location.href = '../../views/dk/partners.html';
    });

    $('.projectsdk').on('click', function(){
      window.location.href = '../../views/dk/projects.html';
    });

    $('.partnersfi').on('click', function(){
      window.location.href = '../../views/fi/partners.html';
    });

    $('.projectsfi').on('click', function(){
      window.location.href = '../../views/fi/projects.html';
    });

    $('.partnersis').on('click', function(){
      window.location.href = '../../views/is/partners.html';
    });

    $('.projectsis').on('click', function(){
      window.location.href = '../../views/is/projects.html';
    });

    $('.reportno').on('click', function(){
      window.location.href = '../../views/no/reports.html';
    });

    $('.reportsv').on('click', function(){
      window.location.href = '../../views/sv/reports.html';
    });

    $('.reportdk').on('click', function(){
      window.location.href = '../../views/dk/reports.html';
    });

    $('.reportfi').on('click', function(){
      window.location.href = '../../views/fi/reports.html';
    });

    $('.reportis').on('click', function(){
      window.location.href = '../../views/is/reports.html';
    });

});