// this will be used for codemirror


var language = $('#langOption').find(":selected").attr("data-language");

var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
	lineNumbers: true,			// gives a lineNumber gutter
	mode: 'htmlmixed',			// sets syntax mode
	theme: 'cobalt',			// select theme
	
	indentUnit: 4,				// default is 2
	tabSize: 4,					// default already is 4
	indentWithTabs: true,		// default is false
	
	fixedGutter: true,
	coverGutterNextToScrollbar: true,
	
	showCursorWhenSelecting: true,
	
	allowDropFileTypes: ['.htm', '.html', '.htmls', '.htt', '.htx', 'shtml'],
	
	electricChars: true,		// Configures whether the editor should re-indent the current line
								// when a character is typed that might change its proper indentation
								//(only works if the mode supports indentation). Default is true.
	
	keyMap: 'sublime',			// uses Sublime Text keymapping
								// down at the bottom of this script you can see the key commands
								// please note that I added this script: ../keymap/sublime.js
	
	autoCloseBrackets: true,	// typed characters like ()[]{}''"" don't close automatically,
								// please note that I added this script: ../addon/edit/closebrackets.js
								// now type ( [ { ' or " in the editor
	
	autoCloseTags: true,		// tags in html/xml don't close automatically,
								// please note that I added these scripts: ../addon/fold/xml-fold.js
								//										   ../addon/edit/closetag.js
								// now type <div> in the editor
  autoRefresh: true, // this fixed the issue with the textcursor located in a wrong place.
});


$('select').on('change', function() {
    language = $('#langOption').find(":selected").attr("data-language");
    editor.setOption("mode", language);
    
});
  



/**
 *
 * Sublime Text keyMap
 *
 * not all functions will be available,
 * since some functions depend on other addon scripts
 *
 *
 * key bindings:
 *
 * Alt-Left: 				"goSubwordLeft",
 * Alt-Right: 				"goSubwordRight",
 * Ctrl-Up: 				"scrollLineUp",
 * Ctrl-Down: 				"scrollLineDown",
 * Shift-Ctrl-L: 			"splitSelectionByLine",
 * Shift-Tab: 				"indentLess",
 * Esc: 					"singleSelectionTop",
 * Ctrl-L: 					"selectLine",
 * Shift-Ctrl-K: 			"deleteLine",
 * Ctrl-Enter: 				"insertLineAfter",
 * Shift-Ctrl-Enter: 		"insertLineBefore",
 * Ctrl-D: 					"selectNextOccurrence",
 * Alt-CtrlUp: 				"addCursorToPrevLine",
 * Alt-CtrlDown: 			"addCursorToNextLine",
 * Shift-Ctrl-Space:		"selectScope",
 * Shift-Ctrl-M: 			"selectBetweenBrackets",
 * Ctrl-M: 					"goToBracket",
 * Shift-Ctrl-Up: 			"swapLineUp",
 * Shift-Ctrl-Down: 		"swapLineDown",
 * Ctrl-/: 					"toggleCommentIndented",
 * Ctrl-J:		 			"joinLines",
 * Shift-Ctrl-D: 			"duplicateLine",
 * Ctrl-T: 					"transposeChars",
 * F9: 						"sortLines",
 * Ctrl-F9: 				"sortLinesInsensitive",
 * F2: 						"nextBookmark",
 * Shift-F2: 				"prevBookmark",
 * Ctrl-F2: 				"toggleBookmark",
 * Shift-Ctrl-F2: 			"clearBookmarks",
 * Alt-F2: 					"selectBookmarks",
 * Alt-Q: 					"wrapLines",
 * Ctrl-K Ctrl-Backspace: 	"delLineLeft",
 * Backspace: 				"smartBackspace",
 * Ctrl-K Ctrl-K: 			"delLineRight",
 * Ctrl-K Ctrl-U: 			"upcaseAtCursor",
 * Ctrl-K Ctrl-L: 			"downcaseAtCursor",
 * Ctrl-K Ctrl-Space: 		"setSublimeMark",
 * Ctrl-K Ctrl-A: 			"selectToSublimeMark",
 * Ctrl-K Ctrl-W: 			"deleteToSublimeMark",
 * Ctrl-K Ctrl-X: 			"swapWithSublimeMark",
 * Ctrl-K Ctrl-Y: 			"sublimeYank",
 * Ctrl-K Ctrl-G: 			"clearBookmarks",
 * Ctrl-K Ctrl-C: 			"showInCenter",
 * Ctrl-Alt-Up: 			"selectLinesUpward",
 * Ctrl-Alt-Down: 			"selectLinesDownward",
 * Ctrl-F3: 				"findUnder",
 * Shift-Ctrl-F3: 			"findUnderPrevious",
 * Shift-Ctrl-[: 			"fold",
 * Shift-Ctrl-]: 			"unfold",
 * Ctrl-K Ctrl-J: 			"unfoldAll",
 * Ctrl-K Ctrl-0: 			"unfoldAll",
 * Ctrl-H: 					"replace",
 *
 */

