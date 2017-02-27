Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}
function columnFilter(tableClass,columnNo){
//table - pass the classname of the table
//columnNo - pass array having column index  which needs filter option [0,1,2]
	
	var $tables = $("table."+ tableClass); 
	$($tables).addClass('tableHeader');
	$.each($tables, function (index, table) {
		var $headers = $('th', $(table));
		$.each($headers, function (header_index, header) {
			var listContent;
			var items = [];
			listContent = '';
			column_header = '';
			if(columnNo.indexOf(header_index) != -1){
				column_header = $(header).html().trim()+'<span class="caret"></span>';				
				$.each($('tbody tr', $(table)), function (row_index, row) {
					items.push($('td:nth-child('+(header_index+1).toString()+')', $(row)).html());					
				});
				
				 items = items.unique().sort();
				 $.each( items, function(i, item){
					listContent = listContent + '<li class="list-group-item"><input type="checkbox" onClick="filterTableRows(this)" name="filterCheckbox" />&nbsp;<span>' + item.toString() + '</span></li>';
				});
				
				column_header = '<div class="table-FilterArrow">' + column_header.trim()+ '\
							<div class="tableFilter-content">\
								<ul class="list-group">' + listContent + '</ul>\
							</div>\
						 </div>';	
				$(header).html(column_header)
			}
		});
	});
}

function filterTableRows(element){
	var table = $(element).closest('table');
	var table_headers = $('th', $($(element).closest('table')));
	
	table_headers.each(function(){
		if( $(this).html()== $(element).closest('th').html()) {
			header_index = table_headers.index(this);
		}
	});
	var selected = [];
	$('input:checked',$(element).parents('ul')).each(function() {
		selected.push($(this).next('span').html());
	});
	
	var rex = new RegExp('P2');
	$('tbody tr', table).hide();
	
	$('tbody > tr td:nth-child('+ (header_index+1).toString() +')', table).filter(function () {
		return (($.inArray($(this).html(),selected) != -1 || selected.length == 0) ? true : false) ;  
	}).parent().show();
	 
}