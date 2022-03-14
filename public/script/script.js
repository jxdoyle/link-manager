var form = document.getElementById('myForm');

// save bookmark event
form.addEventListener('submit', saveBookmark);

// save bookmark function
function saveBookmark(e){
	// prevent form from submitting
	e.preventDefault();
	// getting the value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('urlName').value;
	// set them into an array
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	// check if fields are not null
	if(siteName && siteUrl !== null){
		// check if 'bookmarks' is null
		var getBookmark = JSON.parse(localStorage.getItem('Bookmarks'));//Get the bookmark from localstorage
		if(getBookmark === null){
			var bookmarks = [];
			// adding them to bookmarks array
			bookmarks.push(bookmark);
			localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
		}else{
			// if there is previous saved bookmarks
			var bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
			// loop through every bookmark saved before
			for(var x = 0; x < bookmarks.length; x++){
				// check if the bookmark is saved before
				if(bookmark.url == bookmarks[x].url){
					alert('This has already been added!');
					// clear form
					form.reset();
					// prevent bookmark from saving
					return false;
				}
			}
			bookmarks.push(bookmark);
			// re-set back bookmarks
			localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
		}
	}else{
		alert('Error: Please check the site name and url');
	}
	// clear form
	form.reset();
	// re-call fetckBookmark function
	fetchBookmarks();
}

// delete Bookmark
function deleteBookmark(url){
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	// loop through every bookmark
	for(var j = 0; j < bookmarks.length; j++){
		// check if the url matches
		if(bookmarks[j].url == url){
			// delete bookmark
			bookmarks.splice(j, 1);
		}
	}
	// re-set back bookmarks
	localStorage.setItem('Bookmarks', JSON.stringify(bookmarks));
	// re-call fetckBookmark function
	fetchBookmarks();
}

// fetching bookmarks
function fetchBookmarks(){
	// get the Result appearing div
	var resultDiv = document.getElementById('resultDiv').getElementsByClassName('row')[0];
	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	resultDiv.innerHTML = '';
	// get every bookmark
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		// set HTML
		resultDiv.innerHTML += '<div class="col-md-6">'+
									'<div>'+
										'<h3 class="well">'+
											name+
											'<span class="pull-right">'+
												'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
												'<button onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">Delete</button>'+
											'</span>'+
										'</h3>'+
									'</div>'+
								'</div>'
	}
}