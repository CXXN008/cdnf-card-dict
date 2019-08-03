var nativefier = require('nativefier').default

// possible options, defaults unless specified otherwise
var options = {
	name: 'DNF Card Query', // will be inferred if not specified
	targetUrl: 'ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.cc', // required
	platform: 'windows', // defaults to the current system
	arch: 'x64', // defaults to the current system
	version: '0.36.4',
	out: '.',
	overwrite: false,
	asar: true, // see conceal
	icon: 'favicon.ico',
	counter: true,
	userAgent: 'win desktop', // will infer a default for your current system
	ignoreCertificate: true,
	ignoreGpuBlacklist: true,
	enableEs3Apis: true,
	insecure: true,
	singleInstance: true,
	disableContextMenu: true,
	disableDevTools: true,
	clearCache: false,
	win32metadata: {
		CompanyName: 'DNF Card Query',
		FileDescription: 'DNF Card Query',
		OriginalFilename: 'DNF Card Query',
		ProductName: 'DNF Card Query',
		InternalName: 'DNF Card Query'
	}
}

nativefier(options, function(error, appPath) {
	if (error) {
		console.error(error)
		return
	}
	console.log('App has been nativefied to', appPath)
})
