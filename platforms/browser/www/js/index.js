// Initialize app
var myApp = new Framework7({
  init: false
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  animateNavBackIcon: true
});

localStorage.setItem('login', '1');

$$(document).on('pageInit', function (e) {
  var page = e.detail.page;
  console.log(page.name+' '+page.navbarInnerContainer);
  estilo();
  if(localStorage.getItem('login') == '1'){
    $$('.login-screen').css('display','none');
    myApp.showPreloader('Loading');
    setTimeout(function () {
        myApp.hideIndicator();
    }, 100000);
    mainView.loadPage('views/home.html');
  }
})

function estilo(){
  /*Input focus (aplicar estilo label)*/
  $$('.item-input').on('focusin focusout', function (e) {
      $$(this).parent('.item-inner').toggleClass('focus-state');
  });
}
myApp.init(); // init app manually after you've attached all handlers
