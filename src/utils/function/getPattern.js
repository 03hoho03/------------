export { escapeRegExp }

function escapeRegExp(url) {
  const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/watch\?.*?v=|youtube\.com\/watch\?.*?&v=)([a-zA-Z0-9_-]+)/;
  const match = url.match(pattern)
  if(match){
    const videoId = match[1];
    return videoId;
  } else {
    console.log('No YouTube Video ID found in the URL.');
  }
}