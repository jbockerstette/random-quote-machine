import React from 'react';
import { mount } from 'enzyme';
import App, { Grid } from './App';

const quotes = [
  {
    quote: 'Hello World',
    author: 'Jim'
  }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// global.fetch = () => Promise.resolve(new Response(JSON.stringify({ quotes })));

describe('App', () => {
  let props;
  let mountedApp;
  let spy;
  fetch.mockResponse(JSON.stringify({ quotes }));
  const app = async () => {
    if (!mountedApp) {
      spy = jest.spyOn(App.prototype, 'handleNextQuote');
      mountedApp = mount(<App />);
      await mountedApp.instance().componentDidMount();
    }
    return mountedApp;
  };

  beforeEach(() => {
    props = {};
    mountedApp = undefined;
  });

  // All tests go here.
  it('renders the correct components', async () => {
    const app1 = await app();
    const divs = app1.find('div');
    const grid = app1.find('Grid');
    const button = app1.find('Button');
    const link = app1.find('ButtonLink');
    const quote = app1.find('Quote');
    const author = app1.find('Author');
    expect(divs.length).toBeGreaterThan(0);
    expect(grid.length).toBeGreaterThan(0);
    expect(button.length).toBeGreaterThan(0);
    expect(link.length).toBeGreaterThan(0);
    expect(quote.length).toBeGreaterThan(0);
    expect(author.length).toBeGreaterThan(0);
  });
  it('always sets correct state from mock', async () => {
    const app1 = await app();
    const { state } = app1.instance();
    expect(state.quotes.length).toBeGreaterThan(0);
    expect(state.quotes).toMatchObject(quotes);
  });

  it('should have the correct Author', async () => {
    const app1 = await app();
    const author = app1.find('Author');
    expect(author.get(0).props).toHaveProperty('id', 'author');
    expect(author.get(0).props).toHaveProperty('author', '');
  });
  it('should have the correct Quote', async () => {
    const app1 = await app();
    const quote = app1.find('Quote');
    expect(quote.get(0).props).toHaveProperty('id', 'text');
    expect(quote.get(0).props).toHaveProperty('quote', '');
  });
  it('should have the correct ButtonLink', async () => {
    const app1 = await app();
    const bl = app1.find('ButtonLink');
    expect(bl.get(0).props).toHaveProperty('id', 'tweet-quote');
  });
  it('should have the correct Button', async () => {
    const app1 = await app();
    const btn = app1.find('Button');
    expect(btn.get(0).props).toHaveProperty('id', 'new-quote');
    expect(spy).toHaveBeenCalledTimes(0);
    btn.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    // expect(app1.find('#text').get(0).props).toHaveProperty('opacity', 0);
  });
  it('should have the correct quote and author after click', async done => {
    const app1 = await app();
    app1.setState({ quotes: [{ quote: 'hi', author: 'jim' }] }, () => {
      const author = app1.find('Author');
      const quote = app1.find('Quote');
      expect(author.get(0).props).toHaveProperty('author', 'jim');
      expect(quote.get(0).props).toHaveProperty('quote', 'hi');
      done();
    });
    // expect(app1.find('#text').get(0).props).toHaveProperty('opacity', 0);
  });
});

describe('Grid', () => {
  const mountedGrid = mount(<Grid bgColor="red" />);
  it('always renders a div', () => {
    const divs = mountedGrid.find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
  it('should set the bg color style from props', () => {
    const divs = mountedGrid.find('div');
    expect(divs.get(0).props.style).toHaveProperty('background', 'red');
  });
});
