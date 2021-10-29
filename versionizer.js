let getErrorMessage = (property, value) => {
	if (property === 'appendTo') return "Property \"" + property + "\" cannot be " + value
	return "Property \"" + property + "\" cannot be " + (value === undefined ? value : "an empty string")
}

let appendToDOM = (appendTo, el) => {
	if (appendTo) {
		if (appendTo.toLowerCase() === 'head' || appendTo.toLowerCase() === 'body') {
			document[appendTo.toLowerCase()].appendChild(el)
		} else throw getErrorMessage("appendTo", appendTo)
	} else document.head.appendChild(el)
}

let versionize = (src, type = 'property') => {
	try {
		if (src === undefined) throw getErrorMessage(type, src)
		return src + "?v=" + Date.now()
	} catch (error) {
		console.error(error)
	}
}

function load(tag, cf) {
	try {
		if (tag === undefined || tag === null || tag === '')
			throw getErrorMessage("tag", tag)

		let el = document.createElement(tag)
		switch(el.nodeName) {
			case "SCRIPT":
				el.src = versionize(cf.src, 'src')
				el.defer = cf.defer
				el.async = cf.async
				el.nomodule = cf.nomodule
				el.referrerpolicy = cf.referrerpolicy
				if (cf.type) el.type = cf.type
				if (cf.crossorigin) el.crossorigin = cf.crossorigin
				if (cf.integrity) el.integrity = cf.integrity
				break
			case "LINK":
				el.href= versionize(cf.href, 'href')
				el.rel = cf.rel || "stylesheet"
				el.referrerpolicy = cf.referrerpolicy
				if (cf.crossorigin) el.crossorigin = cf.crossorigin
				if (cf.hreflang) el.hreflang = cf.hreflang
				if (cf.media) el.media = cf.media
				if (cf.sizes) el.sizes = cf.sizes
				if (cf.title) el.title = cf.title
				if (cf.type) el.type = cf.type
				break
			default: console.warn("Loading tags of type \"" + tag + "\" is not supported")
		}

		appendToDOM(cf.appendTo, el)
	} catch (error) {
		console.error(error)
	}
}

function loadMultiple(cfs) {
	try {
		if (cfs === undefined) throw "Function \"loadMultiple()\" is missing some parameters"

		if (cfs.length > 0) {
			cfs.forEach(cf => { load(cf.tag, cf) })
		} else load(cfs.tag, cfs)
	} catch (error) {
		console.error(error)
	}
}