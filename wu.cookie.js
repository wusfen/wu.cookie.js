/*!
https://github.com/wusfen/wu.cookie.js
*/
/*
by wushufen
wusfun@foxmail.com
2014.01.05
update 2015.08.26

wu.cookie('name', 'value', {expires: day, domain: '', path: '/', secure: true});
wu.cookie('name', 'value'); //set
wu.cookie('name', null);    //delete
wu.cookie(null);            //delete all
wu.cookie()                 //get all {}
wu.cookie().name            //get
wu.cookie()['name']         //get
wu.cookie('name')           //get
*/
+ function(wu) {

	function cookie(name, value, options) {
		options = options || {};

		/*delete: cookie(name, null)*/
		if (value === null) options.expires = -1;

		/*delete all: cookie(null)*/
		if (name === null) {
			for (var i in cookie()) {
				cookie(i, null, options);
			}
		}

		/*set: cookie(name, value, {})*/
		if (value !== undefined) {
			if (options.expires) {
				var date = new Date;
				date.setDate(date.getDate() + options.expires);
			}
			document.cookie = [name + '=' + escape(value),
				options.expires ? ';expires=' + date.toUTCString() : '',
				options.path ? ';path=' + options.path : '',
				options.domain ? ';domain=' + options.domain : '',
				options.secure ? ';secure' : ''
			].join('');
		}

		/*get: cookie('name'), cookie(), cookie().name, cookie()['name']*/
		var cookies = {},
			nvs = document.cookie ? document.cookie.split('; ') : [];
		for (var i in nvs) {
			var nv = nvs[i].split('='),
				n = nv[0],
				v = nv[1];
			cookies[n] = unescape(v);
		}

		/*log*/
		// console.log(cookies, document.cookie);

		/*return: value=cookie('name'), obj=cookies()*/
		return name ? cookies[name] : cookies;
	}

	wu.cookie = cookie;
}(this.wu || (wu = {}));
