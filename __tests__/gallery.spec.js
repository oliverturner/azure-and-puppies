import Gallery from "../gallery.js";

document.body.innerHTML = `
<figure class="gallery">
<div class="gallery__frame displaytext loading">
  loading mobilenet neural network
</div>
<figcaption class="gallery__caption">
  <div class="gallery__caption__inner"></div>
</figcaption>
<div class="controls">
  <div class="controls__buttons">
    <button class="controls__btn" data-topic="azure">Azure</button> +
    <button class="controls__btn" data-topic="puppy">Puppies</button> +
    <button class="controls__btn" data-topic="happy">I'm Fine</button>
  </div>
  <form id="search" class="controls__search" action="#">
    <label class="visually-hidden" for="search__field">Custom topic:</label>
    <input class="search__field" id="search__field" placeholder="Custom topic" name="topic">
    <button class="controls__btn controls__btn--search">Search</button>
  </form>
</div>
</figure>
`

describe("Gallery", () => {
  it("instantiates correctly", () => {
    const classify = jest.fn();
    const endpoint = jest.fn();
    const initialTopic = "fox";

    const g = new Gallery({
      model: { classify },
      endpoint,
      initialTopic
    });

    expect(g.state.loading).toBe(true);
    // expect(endpoint).toHaveBeenCalledTimes(1)
    // expect(endpoint).toHaveBeenCalledWith(initialTopic)
  });
});
