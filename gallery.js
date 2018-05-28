import GalleryUI from "./gallery-ui.js";

class Gallery {
  constructor({ model, endpoint, initialTopic }) {
    this.model = model;
    this.getEndpoint = endpoint;

    this.state = { loading: false };
    this.ui = new GalleryUI({
      onTopicSelect: this.onTopicSelect.bind(this)
    });

    this.onTopicSelect(initialTopic);
  }

  async onTopicSelect(topic) {
    if (this.state.loading) return;

    this.state.loading = true;
    this.ui.reset(topic && topic.length ? topic : "random");

    // 1) `fetch` a topical image from {endpoint} and extract the blobbed reponse
    // 2) Generate a new <img src={blob}> element
    // 3) Pass the <img> to the classifier, get predictions back
    const res = await fetch(this.getEndpoint(topic));
    const blob = await res.blob();
    const img = await this.ui.loadImage(blob);
    const predictions = await this.model.classify(img);

    this.ui.showPredictions(predictions);
    this.state.loading = false;
  }
}

export default Gallery;
