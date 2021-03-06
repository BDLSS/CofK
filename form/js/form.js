

 $(".date_is_range").click(function(){
/*
 add click event to add another set of date fields if this date to be captures is a range
 */
       $( ".date_is_range" ).change();
    });

$( ".date_is_range" ).change(function() {
  alert( "Handler for .change() called." );
});


function showContext(context){
	
	
// hide all fieldset elements
	$("fieldset").css("display","none");
	
// display selected fieldset element using id	
	$(context).css("display","inline");
	
}




function updateAssertion(value, id, svgid, circleid){
	    
	/*
	 * parameters
	 * 
	 * @value = value of input field
	 * @id = class identifier for span element
	 * 
	 * 
	 * This function updates the value of span elements that are used to illustration assertions that can be made with
	 * values entered in the input form
	 * 
	 * called when an onChange event occurs in an input field for a given context
	 * 
	 */
	
	// for each element with the select class name
	jQuery(id).each(function () {
		
	// set inner text to value of input field
		this.innerText = value  ;
		
		
	})
	
	
	// want to also update the svg graph
	
	cid = "txt" + circleid;
	
	svg = document.getElementById(svgid);
	svg.getElementById(cid).textContent = value;
	
	
	
}


function addSection(sectionclass){ 
   var currentCount =  $(sectionclass).length; // number of sections
   var val1 = "_" + currentCount; // value to replace in input id
   var val2 = "_" + (Number(currentCount) + 1) ; // replacement value in input id
    
    var lastRepeatingGroup = $(sectionclass).last(); // get last section in this group
    var newSection = lastRepeatingGroup.clone(); // copy last section
    newSection.insertAfter(lastRepeatingGroup); // insert copy after last section
    
    var appendOrReplace = (currentCount == 1) ? "append" : "replace"; // decide whether to append value to input id or replace id
    
    // iterate through each input field
    newSection.find("input").each(function (index, input) {
        updateInput(input, appendOrReplace, val1, val2); // update id of input and set value to empty string
    });
    
    // iterate through each textarea field
    newSection.find("textarea").each(function (index, input) { 
        updateInput(input, appendOrReplace, val1, val2); // update id of input and set value to empty string
    });
    
    // update each label
    newSection.find("label").each(function (index, label) {
        var l = $(label);
        
         if (appendOrReplace == "append"){ 
            l.attr('for', l.attr('for').concat("_2"));
       } else {
            l.attr('for', l.attr('for').replace(val1, val2));
       }   
    });
    return false;    
}


function updateInput(input, appendOrReplace, val1, val2){
    // update id of input 

       if (appendOrReplace == "append"){
            input.id = input.id.concat("_2");       
       } else {
            input.id = input.id.replace(val1, val2);
       }
       

 // add autocomplete function to relationship field 
 
 
       if ((sectionclass = 'repeatSectionFamilyRelationships') && (input.id.search('FamilyRelationships-FamilyRole') != -1 )){     
            $(input).autocomplete({ source: relationships});     
        }
    
     $(input).val(""); // set value to empty string
}



function deleteSection(obj, sectionclass){
    
    var currentCount =  $(sectionclass).length;
    // do not delete section if there is only one section
    if (currentCount == 1){
   
        return false;
    }
    
    // remove fieldset element that contains this section
     $(obj).parent('p').parent('fieldset').remove();
    return false;
}




function addField(obj, fieldclass){
    
	
	// identify index of groupclass
	
	var group = $(obj).parent().parent().parent().parent();
	var field = $(group).find(fieldclass);
	
	
   var currentCount =  $(field).length;
    var newCount = currentCount+1;
    var lastRepeatingGroup = $(field).last();
    var newField = lastRepeatingGroup.clone();
    newField.insertAfter(lastRepeatingGroup);
    
    newField.find("input").each(function (index, input) {
        input.id = input.id.replace("_" + currentCount, "_" + newCount);
        input.name = input.name.replace("_" + currentCount, "_" + newCount);
        $(input).prop("checked", false); // uncheck a checkbox
        $(input).val("");
    });
    
    newField.find("textarea").each(function (index, input) {
        input.id = input.id.replace("_" + currentCount, "_" + newCount);
        input.name = input.name.replace("_" + currentCount, "_" + newCount);
        $(input).val("");
    });
    
    
    newField.find("label").each(function (index, label) {
        var l = $(label);
        l.attr('for', l.attr('for').replace("_" + currentCount, "_" + newCount));
    });
    return false; 
    
    
    
    
    
}


function deleteField(obj, fieldclass){
    
	
	// get section
	var group = $(obj).parent().parent().parent().parent();
	var field = $(group).find(fieldclass); // get field in this section
	
	// get number of fields in this section
    var currentCount =  $(field).length;
    // do not delete field if there is only one field in this section
    if (currentCount == 1){
   
        return false;
    }
    
    
    $(obj).parent('label').parent('div').prev().focus();
    
     $(obj).parent('label').parent('div').remove();
     
     
     
     
    return false;
}



function dateRange(obj, fieldId, groupId){
	
	var fieldset = $(obj).parent().parent();
	
	var year = $(fieldset).find(".div"+ groupId + '-date_year');
	var month = $(fieldset).find(".div"+ groupId + '-date_month');
	var day = $(fieldset).find(".div"+ groupId + '-date_day');
	
	var inferred = $(fieldset).find(".div"+ groupId + '-date_inferred');
	var uncertain = $(fieldset).find(".div"+ groupId + '-date_uncertain');
	var approximate = $(fieldset).find(".div"+ groupId + '-date_approximate');
	
	var div1 = day.next('div');
	var div2 = approximate.next('div'); // div that follows the approximate checkbox and where we want to insert new date fields
	
	var arrayFields = new Array(year, month, day, div1, inferred, uncertain, approximate);
	
	// if date range property is checked, and there are not already two sets of date fields, then insert new date fields
	
	if ( ($('#' + fieldId).prop("checked")) && (year.length == 1)  ) {
		
		// insert date fields
			for(i = (arrayFields.length - 1) ;i > -1 ;--i){		
			var elem = arrayFields[i];
			var newelem = elem.clone();
			
			newelem.find("input").each(function (index, input) {
		        input.id = input.id + "_2";
		        $(input).val(""); // set value to empty string
		        $(input).prop("checked", false); // uncheck a checkbox
		    });
			
			newelem.insertAfter(div2);
		}

	} else {
		
		// checkbox is unchecked
		// delete date fields added to record a date range
		for(i = (arrayFields.length - 1) ;i > -1 ;--i){		
			
			var elem = arrayFields[i].get(1); // get second element in array of fields with same class name 
		
			$(elem).remove(); // remove second element
		
		 
		
	}
			
	}
	
}











