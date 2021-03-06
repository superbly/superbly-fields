/*!
 * superbly fields 
 * http://www.superbly.ch
 *
 * Copyright 2011, Manuel Spierenburg
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.superbly.ch/licenses/mit-license.txt
 * http://www.superbly.ch/licenses/gpl-2.0.txt
 *
 * Date: Wed Apr 20 23:43
 */
(function($){
    $.fn.superblySuggestField = function(userOptions) {
        var settings = {
            showSuggestionsNumber:10,
            suggestions:[]
        };

        if(userOptions) {
            $.extend(settings, userOptions);
        }

        superblySuggestField(this, settings);

        return this;
    };

    var keyMap = {
        downArrow:40,
        upArrow:38,
        enter:13,
        tab:9,
        backspace:8
    }
	function superblySuggestField(suggestField,settings){
		
		var suggestions = settings.suggestions.sort();
        var showSuggestionsNumber = settings.showSuggestionsNumber;
        
		//prepare needed vars
		var currentValue = null;
		var currentItem = null;
		var selectedIndex = null;
		var hoverSuggestItems = false;
		var suggestionstmp = suggestions.slice();
			
		suggestField.wrap("<div class='superblySuggestFieldDiv' />");
		suggestField.after("<ul class='superblySuggestItems' />");
	
		suggestField.next('.superblySuggestItems').mouseover(function(e){
			hoverSuggestItems = true;
		});
	
		suggestField.next('.superblySuggestItems').mouseleave(function(e){
			hoverSuggestItems = false;
		});
	
	
   		suggestField.keydown(function(e){
			if(e.keyCode == keyMap.downArrow) {			
				selectDown();
				e.preventDefault();
			}else if(e.keyCode == keyMap.upArrow) {
				selectUp()
			}else if(e.keyCode == keyMap.enter || e.keyCode == keyMap.tab) {
				if(currentItem != null){
					suggestField.val(currentItem);
					suggestField.next('.superblySuggestItems').css('display', 'none');
				}
				if(e.keyCode == keyMap.enter){
					e.preventDefault();
				}
			}else{
				suggest($(this).val());
			}
   		});
   	
   		suggestField.focus(function(e){
   			suggest($(this).val());
   		});

   	
   		suggestField.focusout(function(e){
   			if(!hoverSuggestItems){
   				suggestField.next('.superblySuggestItems').css('display', 'none');
   			}
   		});

   
   	
   		function suggest(value){
   			suggestField.next('.superblySuggestItems').show();
   			// if input has not changed at all don't do anything
			if(value == currentValue){
				return false;
			}
			suggestField.next('.superblySuggestItems').children('.superblySuggestItem').remove();
			currentValue = value;
			var suggestions = getSuggestionsArray(value);
			for(key in suggestions){
				suggestField.next('.superblySuggestItems').append("<li class=\"superblySuggestItem\" >" + suggestions[key] + "</li>");
			}
			selectedIndex=null;
			// add click listener 
			suggestField.next('.superblySuggestItems').children('.superblySuggestItem').click(function(e){
				currentItem = ($(this).html());
				suggestField.val(currentItem);
				suggestField.next('.superblySuggestItems').css('display', 'none');
			});
		}
	
		function getSuggestionsArray(value){
			var suggestions = new Array();
    		var count = 0;
			for(key in suggestionstmp){
        		if(showSuggestionsNumber <= count){
        			break;
        		}
				// if beginning is same
				var lower_case_tag = suggestionstmp[key].toLocaleLowerCase();
				var lower_cast_value = value.toLowerCase();
				if((lower_case_tag).indexOf(lower_cast_value) == 0){
					suggestions.push(suggestionstmp[key]);
					count++;
				}
			}
			return suggestions;
		}
	
		function selectDown(){
			var size = suggestField.next('.superblySuggestItems').children('.superblySuggestItem').size();
			if(selectedIndex == null){
				selectedIndex=0;
			}else if(selectedIndex < size-1){
				$(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).removeClass("selected");
				selectedIndex++;
			}
			$(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).addClass("selected");
			currentItem = $(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).html();
		}

		function selectUp(){
			if(selectedIndex == 0){
				selectedIndex=null;
				currentItem = null;
				suggestField.focus();
			} else if(selectedIndex >0){
				$(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).removeClass("selected");
				selectedIndex--;
				$(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).addClass("selected");
				currentItem = $(suggestField.next('.superblySuggestItems').children('.superblySuggestItem')[selectedIndex]).html();

			}
		}
	
		
	}
 
})(jQuery);

(function($){
    $.fn.superblyNumberField = function() {
	
		this.keydown(function (event) { 
			// 0-9 or numpad 0-9 
			if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){ 
			// check textbox value now and tab over if necessary 
			} else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39){ 
				event.preventDefault(); 
			} 
			// else the key should be handled normally 
		});
	} 
})(jQuery);

(function($){
    $.fn.superblySelectField = function(selectOptions) {
		for(key in selectOptions){
			this.append('<option value="' + selectOptions[key] + '">' + selectOptions[key] + '</option>');
		}
	} 
})(jQuery);