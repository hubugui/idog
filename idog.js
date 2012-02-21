/**
 * idog.js
 *
 * author: hubugui@gmail.com
 */

var idog = new Object();
var idog_white_index = 0;
var idog_black_index = 1;

function idog_blockall()
{
	return idog.blockall;
}

function idog_blockall_set(checked)
{
	idog.blockall = checked;
}

function idog_gcalendar()
{
	return idog.google_calendar;
}

function idog_gcalendar_set(checked)
{
	idog.google_calendar = checked;
}

function idog_checked(index)
{
	return idog.list[index].checked;
}

function idog_checked_set(index, checked)
{
	idog.list[index].checked = checked;
}

function idog_urls(index)
{
	return idog.list[index].urls;
}

function idog_urls_set(index, urls)
{
	idog.list[index].urls = urls;
}

function idog_url_match(url, urls)
{
	var host = parseUri(url).host;

	for (var i = 0; i < urls.length; i++)
	{
		if (host.indexOf(urls[i]) > -1)
			return true;
	}

	return false;
}

function idog_url_allow_access_gcalendar(url)
{
	return true;
}

function idog_url_allow_access(url)
{
	var rc = false;
	var protocol = parseUri(url).protocol;

	if (protocol.toLowerCase() == "file")
		return true;
	if (protocol.toLowerCase() == "chrome-extension")
		return true;

	if (idog_blockall() == false)
	{
		if (idog_gcalendar())
			rc = idog_url_allow_access_gcalendar(url);
		else if (idog_checked(idog_white_index))
			rc = idog_url_match(url, idog_urls(idog_white_index));
		else if (idog_checked(idog_black_index))
			rc = !idog_url_match(url, idog_urls(idog_black_index));
	}

	return rc;
}

function idog_white_init()
{
	var white_list = new Object();

	white_list.checked = true;
	white_list.urls =
	[
		"137.",
		"192.",
		"4x-hover.png",
		"akamai.net",
		"android.com",
		"bing.",
		"evernote.com",
		"flickr.com",
		"github.",
		"google.",
		"googleusercontent.",
		"gstatic.com",
		"gravatar.com",
		"imo.im",
		"wikipedia.org",
		"wikimedia.org",
		"stackoverflow.com",
		"yimg.com",
	];

	return white_list;
}

function idog_black_init()
{
	var black_list = new Object();

	black_list.checked = false;
	black_list.urls =
	[
		"163",
		"360",
		"360buy",
		"amazon.cn",
		"dangdang.com",
		"joyo.",
		"qq.com",
		"sina.com",
		"sohu.com",
		"newsmth.net",
		"weibo",
	];

	return black_list;
}

function idog_load()
{
	idog.blockall = window.localStorage.idog_blockall;
	idog.google_calendar = window.localStorage.idog_google_calendar;
	idog.list = window.localStorage.idog_list;
}

function idog_save()
{
	window.localStorage.idog_blockall = idog.blockall;
	window.localStorage.idog_google_calendar = idog.google_calendar;
	window.localStorage.idog_list = idog.list;
}

function idog_init()
{
	idog.blockall = false;
	idog.google_calendar = false;
	idog.list = new Array(idog_white_init(), idog_black_init());
}

function idog_module_init()
{
	if (window.localStorage)
	{
		if (window.localStorage["idog_list"] && window.localStorage["idog_list"][0].checked)
			idog_load();
		else
		{
			idog_init();
			idog_save();
		}
	}
	else
	{
		alert('Your browser does NOT support localStorage');

		idog_init();
	}
}