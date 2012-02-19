var mURLs = "baidu.com";

function init()
{
}

function canAccess(url)
{
	var rc = false;
	var popups = chrome.extension.getViews({type: 'popup'});

	mURLs = url;

	//alert(popups);
	//alert(popups.length);
/*
	if (popups.length > 0)
	{
		var popup = popups[0];

		alert(popup);
		var wl = popup.document.getElementById("white_list");
		alert(wl);
	}
*/
	if (isChecked("white_list"))
	{
		rc = matchURL(url, getURLs("white_list_area"));
	}
	else if (isChecked("black_list"))	
	{
		rc = !matchURL(url, getURLs("black_list_area"));
	}

	console.log("<dog> canAccess= " + rc + ":" + url);
	
	return rc;
}

function matchURL(url, urls)
{
	var match = true;

	return match;
}

function isChecked(list_id)
{
	var rc = false;
	var list = document.getElementById(list_id);

	if (list != null)
		rc = list.checked;

	return rc;
}

function getURLs(area_id)
{
	var urls = null;

	var area = document.getElementById(area_id);
	if (area != null)
		urls = area.value;

	return urls;
}
