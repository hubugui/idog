/*
 * idog_popup.js
 *
 * author: hubugui@gmail.com
 */

function load_urls(id, urls)
{
	var area = document.getElementById(id);

	if (area != null)
	{
		area.value = "";
		for (var i = 0; i < urls.length - 1; i++)
		{
			area.value += urls[i] + "\n";
		}

		area.value += urls[i];
	}
}

function save_urls(id, cb)
{
	var area = document.getElementById(id);

	if (area != null)
		cb(area.value.split("\n"));
}

function load_setting()
{
	var bgpage = chrome.extension.getBackgroundPage();

	document.getElementById("donot_block").checked = bgpage.idog_donotblock();
	document.getElementById("block_all").checked = bgpage.idog_blockall();
	document.getElementById("gcalendar").checked = bgpage.idog_gcalendar();
	document.getElementById("white_list").checked = bgpage.idog_checked(bgpage.idog_white_index);
	document.getElementById("black_list").checked = bgpage.idog_checked(bgpage.idog_black_index);

	load_urls("white_list_area", bgpage.idog_urls(bgpage.idog_white_index));
	load_urls("black_list_area", bgpage.idog_urls(bgpage.idog_black_index));
}

function save_setting()
{
	var bgpage = chrome.extension.getBackgroundPage();

	var elements = document.getElementsByName("work_mode");
	if (elements != null)
	{		
		for (var i = 0; i < elements.length; i++)
		{
			if (elements[i].checked)
			{
				bgpage.idog_donotblock_set(false);
				bgpage.idog_blockall_set(false);
				bgpage.idog_checked_set(bgpage.idog_white_index, false);
				bgpage.idog_checked_set(bgpage.idog_black_index, false);
				bgpage.idog_gcalendar_set(false);

				if (elements[i].value == "donot_block")
					bgpage.idog_donotblock_set(true);
				else if (elements[i].value == "block_all")
					bgpage.idog_blockall_set(true);
				else if (elements[i].value == "white_list")
				{
					bgpage.idog_checked_set(bgpage.idog_white_index, true);
					save_urls("white_list_area", 
						function cb(urls)
						{
							bgpage.idog_urls_set(bgpage.idog_white_index, urls);
						}
					);
				}
				else if (elements[i].value == "black_list")
				{
					bgpage.idog_checked_set(bgpage.idog_black_index, true);
					save_urls("black_list_area", 
						function cb(urls)
						{
							bgpage.idog_urls_set(bgpage.idog_black_index, urls);
						}
					);
				}
				else if (elements[i].value == "gcalendar")
					bgpage.idog_gcalendar_set(true);

				if (window.localStorage)
					bgpage.idog_save();
				break;
			}
		}
	}

	chrome.tabs.getCurrent(function callback(tab)
	{
		chrome.tabs.remove(tab.id);
	});	
}
