# table-filter
This plugin will create excel like column filters for HTML tables. In the header you will get the unique values  of a particular column listed to filter the rows.

In document.ready function call the filter plugin as below:

$(function() {

	//table - pass the classname of the table

	//columnNo - pass array having column index  which needs filter option [0,1,2]

	  columnFilter('filterTable',[0,1,2])
  
});
