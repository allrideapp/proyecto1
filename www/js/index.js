var myApp = new Framework7({init: false,material: true});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: false,
  animateNavBackIcon: true
});

localStorage.setItem('login', '0');

$$(document).on('pageInit', function (e) {
  var page = e.detail.page;
  console.log(page.name);
  if(localStorage.getItem('login') == '1'){
    $$('.login-screen').css('display','none');
    mainView.loadPage('views/home.html');
  }
  if(page.name == 'home'){
    /*pull to refresh*/
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('ptr:refresh', function (e) {
      setTimeout(function () {
        var txt = '<li>';
            txt+= '<a href="#" class="item-link item-content">';
            txt+= '<div class="item-media"><img src="http://lorempixel.com/160/160/people/3" width="80"></div>';
            txt+= '<div class="item-inner">';
            txt+= '<div class="item-title-row">';
            txt+= '<div class="item-title">Billie Jean</div>';
            txt+= '<div class="item-after">$16</div>';
            txt+= '</div>';
            txt+= '<div class="item-subtitle">Michael Jackson</div>';
            txt+= '<div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus.Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>';
            txt+= '</div>';
            txt+= '</a>';
            txt+= '</li>';
          ptrContent.find('ul').prepend(txt);
        myApp.pullToRefreshDone();
      }, 2000);
    });
    /*swipe to delete*/
    $$('.mark').on('click', function () {
      myApp.alert('Mark');
    });
    $$('.reply').on('click', function () {
      myApp.alert('Reply');
    });
    $$('.forward').on('click', function () {
      myApp.alert('Forward');
    });
  }
  if(page.name == 'buy'){
      var categorias = ['Agua','Luz','Gas'];
      var autocompleteCategoria= myApp.autocomplete({
        input: '#categoria',
        openIn: 'dropdown',
        dropdownPlaceholderText: 'Por ejemplo: "Agua"',
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            for (var i = 0; i < categorias.length; i++) {
                if (categorias[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                  results.push(categorias[i]);
                }
            }
            render(results);
        }
      });
  }
})

function beforeLogin(view){
  $$('.login-screen').css('display','none');
  switch (view) {
    case 1 :   mainView.loadPage('views/home.html');break;
    case 2 :   mainView.loadPage('views/register.html'); break;
    case 3 :   mainView.loadPage('views/recover.html'); break;
  }
}
function backLogin(){
  mainView.router.back();
  myApp.loginScreen();
}
function goContact(){
  myApp.closeModal('.popover');
  mainView.loadPage('views/contact.html');
}
function loadCompra(){
  myApp.closeModal('.popover');
  mainView.loadPage('views/buy.html');
}
myApp.init(); // init app manually after you've attached all handlers
