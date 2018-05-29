import Gallery from "../gallery.js";

describe("Gallery", () => {
  it("instantiates correctly", () => {
    const classify = jest.fn();
    const endpoint = jest.fn();
    const topic = "fox";

    const g = new Gallery({
      model: { classify },
      endpoint,
      topic
    });

    expect(g.state.loading).toBe(true);
    // expect(endpoint).toHaveBeenCalledTimes(1)
    // expect(endpoint).toHaveBeenCalledWith(topic)
  });
});
