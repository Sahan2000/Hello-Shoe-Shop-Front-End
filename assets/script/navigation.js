window.addEventListener('load',function (){
    const loadingScreen1 = document.querySelector('.sidebar');
    loadingScreen1.style.display = 'block';

    const loadingScreen2 = document.querySelector('#home');
    loadingScreen2.style.display = 'block';
    $("#dashboardPage").eq(0).css("background","#eee");
    $("#dashboardIcon").eq(0).css("color","black");
    $("#dashboardName").eq(0).css("color","black");

    const loadingScreen3 = document.querySelector('#customer');
    loadingScreen3.style.display = 'none';

    const loadingScreen4 = document.querySelector('#supplier');
    loadingScreen4.style.display = 'none';

});

$(document).ready(function (){
    $('#customerPage').eq(0).on('click',function (){

        let mainTitle = document.querySelector('.dashboard');
        mainTitle.innerHTML = "Customer Manage Form";

        const loadingScreen1 = document.querySelector('.sidebar');
        loadingScreen1.style.display = 'block';

        const loadingScreen2 = document.querySelector('#home');
        loadingScreen2.style.display = 'none';

        const loadingScreen3 = document.querySelector('#customer');
        loadingScreen3.style.display = 'block';

        const loadingScreen4 = document.querySelector('#supplier');
        loadingScreen4.style.display = 'none';
        
        $("#dashboardPage").eq(0).css("background","#892CDC");
        $("#dashboardIcon").eq(0).css("color","#eee");
        $("#dashboardName").eq(0).css("color","#eee");

        $("#customerPage").eq(0).css("background","#eee");
        $("#customerIcon").eq(0).css("color","black");
        $("#customerName").eq(0).css("color","black");

        $("#supplierPage").eq(0).css("background","#892CDC");
        $("#supplierIcon").eq(0).css("color","#eee");
        $("#supplierName").eq(0).css("color","#eee");

    });

    $('#dashboardPage').eq(0).on('click',function (){

        let mainTitle = document.querySelector('.dashboard');
        mainTitle.innerHTML = "Dashboard";

        const loadingScreen1 = document.querySelector('.sidebar');
        loadingScreen1.style.display = 'block';

        const loadingScreen2 = document.querySelector('#home');
        loadingScreen2.style.display = 'block';

        const loadingScreen3 = document.querySelector('#customer');
        loadingScreen3.style.display = 'none';

        const loadingScreen4 = document.querySelector('#supplier');
        loadingScreen4.style.display = 'none';
        
        $("#customerPage").eq(0).css("background","#892CDC");
        $("#customerIcon").eq(0).css("color","#eee");
        $("#customerName").eq(0).css("color","#eee");

        $("#dashboardPage").eq(0).css("background","#eee");
        $("#dashboardIcon").eq(0).css("color","black");
        $("#dashboardName").eq(0).css("color","black");

        $("#supplierPage").eq(0).css("background","#892CDC");
        $("#supplierIcon").eq(0).css("color","#eee");
        $("#supplierName").eq(0).css("color","#eee");

    });

    $('#supplierPage').eq(0).on('click',function (){

        let mainTitle = document.querySelector('.dashboard');
        mainTitle.innerHTML = "Supplier Manage Form";

        const loadingScreen1 = document.querySelector('.sidebar');
        loadingScreen1.style.display = 'block';

        const loadingScreen2 = document.querySelector('#home');
        loadingScreen2.style.display = 'none';

        const loadingScreen3 = document.querySelector('#customer');
        loadingScreen3.style.display = 'none';

        const loadingScreen4 = document.querySelector('#supplier');
        loadingScreen4.style.display = 'block';
        
        $("#customerPage").eq(0).css("background","#892CDC");
        $("#customerIcon").eq(0).css("color","#eee");
        $("#customerName").eq(0).css("color","#eee");

        $("#dashboardPage").eq(0).css("background","#892CDC");
        $("#dashboardIcon").eq(0).css("color","#eee");
        $("#dashboardName").eq(0).css("color","#eee");

        $("#supplierPage").eq(0).css("background","#eee");
        $("#supplierIcon").eq(0).css("color","black");
        $("#supplierName").eq(0).css("color","black");

    });

});