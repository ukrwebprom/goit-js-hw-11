import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export class Pixabay {
  constructor(options) {
    this.options = options;
    this.isMore = false;
    this.imgFound = 0;
  }

  getImages = async () => {
    this.isMore = false;
    const response = await axios.get(BASE_URL, { params: this.options });
    this.imgFound = response.data.totalHits;
    if (response.data.totalHits > this.options.page * this.options.per_page) {
      this.options.page += 1;
      this.isMore = true;
    }
    return response.data.hits;
  };

  findImages = async query => {
    this.options.q = query;
    this.options.page = 1;
    this.isMore = false;
    const images = await this.getImages();
    if (images.length > 0) return images;
    throw new Error('no data');
  };
}
