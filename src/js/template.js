export const getTemplate = (img) => {
    return `<div class="photo-card">
    <div class="photo-container"><a href="${img.largeImageURL}" title="${img.tags}"><img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" /></a></div>
    <div class="info">
      <div class="info-item">
        <b>Likes</b>
        <p class="info-data">${img.likes}</p>
      </div>
      <div class="info-item">
        <b>Views</b>
        <p class="info-data">${img.views}</p>
      </div>
      <div class="info-item">
        <b>Comments</b>
        <p class="info-data">${img.comments}</p>
      </div>
      <div class="info-item">
        <b>Downloads</b>
        <p class="info-data">${img.downloads}</p>
      </div>
    </div>
  </div>
    `
}