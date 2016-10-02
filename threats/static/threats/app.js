
$(document).ready(function(){ 

    // -------- Load the data when page loaded ---------
    window.onload = loadData();

    // -------- AJAX Call to load data --------
    function loadData(){ 
        $.ajax({
            url: '/threats/readData',
            type: 'get',
            success: function(data) {
                var response = JSON.parse(data);
                var trHTML = '';
                for(var i = 0; i < response.length; ++i){
                    for(var ind in response[i]) {
                        trHTML += "<tr><td class='date'>" + response[i][ind]['date'] + '</td><td>' + response[i][ind]['filename'] + '</td><td>' + response[i][ind]['action'] + '</td><td>' + response[i][ind]['submit-type'] + "</td><td class='rating'>" + response[i][ind]['rating'] + '</td></tr>';
                    }
                }
                $('#results').empty();    
                $('#results').append(trHTML);

                $("tr").each(function(){
                    var col_val = $(this).find('.rating').text().toLowerCase();
                    switch (col_val) { 
                        case 'high-risk': 
                            $(this).css('background-color','rgba(222, 3, 3, 0.44)');
                            break;
                        case 'medium-risk': 
                            $(this).css('background-color','rgba(243, 149, 2, 0.48)');
                            break;
                        case 'low-risk': 
                            $(this).css('background-color','rgba(243, 238, 2, 0.28)');
                            break;
                        case 'malicious': 
                            $(this).css('background-color','rgba(2, 230, 243, 0.24)');
                            break;            
                        case 'clean': 
                            $(this).css('background-color','rgba(54, 210, 27, 0.31)');
                            break;     
                    } 
                });
                $('.alertError').hide();
                $('.alertMessage').hide();
                $('#filterDate>option:eq(0)').prop('selected', true);
            
            },
            error: function(data) { 
                $('.alertError').show();
            }
        });
    }; 

    // --------- Sorting fields in table ----------
    // Helper function to convert a string of the form "Mar 15, 1987" into a Date object.
    var date_from_string = function(str){
        var months = ["jan","feb","mar","apr","may","jun","jul",
                      "aug","sep","oct","nov","dec"];
        var pattern = "^([a-zA-Z]{3})\\s*(\\d{1,2}),\\s*(\\d{4})";
        var re = new RegExp(pattern);
        var DateParts = re.exec(str).slice(1);
        
        var Year = DateParts[2];
        var Month = $.inArray(DateParts[0].toLowerCase(), months);
        var Day = DateParts[1];
        return new Date(Year, Month, Day);
    }

    var moveBlanks = function(a, b) {
        if ( a < b ){
          if (a == "")
            return 1;
          else
            return -1;
        }
        if ( a > b ){
          if (b == "")
            return -1;
          else
            return 1;
        }
        return 0;
      };
    var moveBlanksDesc = function(a, b) {
        if ( a < b )
          return 1;
        if ( a > b )
          return -1;
        return 0;
    };

    var table = $('#threatTable').stupidtable({
        "date":function(a,b){
            aDate = date_from_string(a);
            bDate = date_from_string(b);
            return aDate - bDate;
        },
        "moveBlanks": moveBlanks,
        "moveBlanksDesc": moveBlanksDesc,
    });

    table.on("beforetablesort", function (event, data) {
    });

    table.on("aftertablesort", function (event, data) {
        var th = $(this).find("th");
        th.find(".arrow").remove();
        var dir = $.fn.stupidtable.dir;
        var arrow = data.direction === dir.ASC ? "<span class='glyphicon glyphicon-chevron-up' aria-hidden='true'></span>" : "<span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span>";
        th.eq(data.column).append('  <span class="arrow">' + arrow +'</span>');
    });

    $("tr").slice(1).click(function(){
        $(".awesome").removeClass("awesome");
        $(this).addClass("awesome");
    });

    // ---------- Time-period dropdown ---------- 
    $("#filterDate").on("change", function(){
        var opt = $(this).val();
        $("tr").each(function(){
            var tr = $(this);
            var td = $(this).find('.date');
            var tdDate = new Date(td.text())
	        tr.show();
            if(opt == '24hours'){
                var last24h = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
                if (tdDate < last24h){
                    tr.hide();
                };
            }else if(opt == '7days'){
                var last7days = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                if (tdDate < last7days){
                    tr.hide();
                };
            }else if(opt == '4weeks'){
                var last4weeks = new Date(new Date().getTime() - (4 * 7 * 24 * 60 * 60 * 1000));
                if (tdDate < last4weeks){
                    tr.hide();
                };
            };
            
        });
    });

    // ---------- Refreshing data in table ----------
    $("#refreshBtn").on("click", function() {
        loadData();
        $('#filterDate>option:eq(0)').prop('selected', true);
    });

    // ---------- Auto refresh the content of table every 1.5 minute --------
    var refreshData = setInterval(loadData, 90000);

    // ---------- Display alert message every 30 seconds ----------
    var showAlert = setInterval(function(){
        $('.alertMessage').show();
    }, 30000);


});