document.getElementById('submit').addEventListener('click', saveMark);
fetchBookmarks()

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksFinal = document.getElementById('showCont');

  bookmarksFinal.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksFinal.innerHTML += '<div class="card">'+'<h3 class="ml-3">'+name+'<a class="btn btn-default mx-1" target="_blank" href="'+url+'">Visit</a> '+
                                  ' <a onclick="deleteMark(\''+url+'\', \'' + name + '\')" class="btn btn-danger my-1" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div></br>';
  }
}

function deleteMark(url, name){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i =0;i < bookmarks.length;i++){
    if((bookmarks[i].url == url) && (bookmarks[i].name == name)){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function saveMark(e){
  //console.log(0)
  var site =document.getElementById('site').value;
  var url =document.getElementById('url').value;

  if(!url || !site){
    alert('Write proper values!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!url.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  var bookmark = {
    name: site,
    url: url
  }
  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('addForm').reset();
  fetchBookmarks();
  e.preventDefault();
}
