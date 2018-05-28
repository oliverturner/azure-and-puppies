class GalleryUI {
  constructor(props) {
    this.props = props;

    this.frame = document.querySelector(".gallery__frame");
    this.caption = document.querySelector(".gallery__caption");
    this.btns = [...document.querySelectorAll("[data-topic]")];
    this.search = document.querySelector("#search");

    this.loadImage = this.loadImage.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onBtnClick = this._onBtnClick.bind(this);

    this.search.addEventListener("submit", this._onSearch);
    this.btns.forEach(btn => btn.addEventListener("click", this._onBtnClick));
  }

  // Event handlers
  _onSearch(e) {
    e.preventDefault();
    this.props.onTopicSelect(e.target.topic.value);
  }

  _onBtnClick(e) {
    this.props.onTopicSelect(e.target.dataset.topic);
  }

  // Internal methods
  _updateBtns(topic) {
    this.btns.forEach(btn => {
      btn.dataset.topic === topic
        ? btn.classList.add("active")
        : btn.classList.remove("active");
    });
  }

  _updateSearch(topic) {
    if (this.search.topic.value != topic) {
      this.search.topic.value = "";
    }
  }

  _createImg(blob) {
    const img = document.createElement("img");
    img.className = "gallery__image";
    img.src = URL.createObjectURL(blob);

    return img;
  }

  _makeLabels(predictions) {
    const getLabel = prediction => {
      const percent = (prediction.probability * 100).toFixed(2);
      const dt = `<dt>${percent}%</dt>`;
      const dd = `<dd>${prediction.className}</dd>`;

      return `${dt} ${dd}`;
    };

    const labels = document.createElement("dl");
    labels.className = "gallery__caption__labels";
    labels.innerHTML = predictions.map(getLabel).join("");

    const inner = document.createElement("div");
    inner.className = "gallery__caption__inner";
    inner.appendChild(labels);

    return inner;
  }

  // Public API
  reset(topic) {
    this.frame.innerHTML = `loading ${topic} image from Unsplash`;
    this.frame.classList.add("loading");
    this.caption.innerHTML = "";
    this._updateBtns(topic);
    this._updateSearch(topic);
  }

  loadImage(blob) {
    this.img = this._createImg(blob);

    this.frame.classList.remove("loading");
    this.frame.innerHTML = "";
    this.frame.appendChild(this.img);

    // Need to introduce a short delay to account for time to mount
    // Promisifies setTimeout to keep the API consistently awaitable
    return new Promise(resolve => setTimeout(() => resolve(this.img), 100));
  }

  showPredictions(predictions) {
    this.img.alt = predictions.map(p => p.className).join(", ");
    this.caption.appendChild(this._makeLabels(predictions));
  }

  autoLoad(index = 0) {
    this.btns[index].click();
  }
}

export default GalleryUI;
