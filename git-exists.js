/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "git-exists",
			"fileName": "git-exists.js",
			"moduleName": "gitClone",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/git-exists.git",
			"isGlobal": "true"
		}
	@end-module-configuration

	@module-documentation:
		This will only return true or false regardless of what git repository on that directory.
	@end-module-documentation

	@include:
		{
			"chore@github.com/volkovasystems": "chore",
			"fs@nodejs": "fs"
		}
	@end-include
*/
var gitExists = function gitExists( assumedDirectory, callback ){
	/*:
		@meta-configuration:
			{
				"assumedDirectory:required": "string",
				"callback": "Callback"
			}
		@end-meta-configuration
	*/

	var currentWorkingDirectory = process.cwd( );

	if( GIT_EXISTS_DIRECTORY_PATTERN.test( currentWorkingDirectory ) ){
		process.chdir( "../" );
	}

	if( assumedDirectory && 
		fs.existsSync( assumedDirectory ) &&
		fs.statSync( assumedDirectory ).isDirectory( ) )
	{
		process.chdir( assumedDirectory );

	}else{
		console.warn( "this error is shown for warning purposes only" );
		var error = new Error( "assumed directory is invalid" );
		console.error( error );
		console.warn( "reverting to using the parent directory of this module as the assumed directory" ); 
	}

	chore( "git status -b --porcelain",
		function onCheckExists( error, isValid ){
			if( typeof callback == "function" ){
				callback( isValid );	
			}
		} );
};

const GIT_EXISTS_DIRECTORY_PATTERN = /git-exists$/;

var chore = require( "./chore/chore.js" );
var fs = require( "fs" );

module.exports = gitExists;