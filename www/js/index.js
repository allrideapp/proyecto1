// Initialize app
var myApp = new Framework7({
  init: false,
  material: true
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
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
  /*Graficos*/
  if(page.name == "test"){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
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
