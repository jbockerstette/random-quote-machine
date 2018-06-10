import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import App, { Grid, Quote, Button, ButtonLink, Author } from './App';

const quotes = [
  {
    quote: 'Hello World',
    author: 'Jim'
  }
];

describe('App', () => {
  const wrapper = shallow(<App />);
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
    mountedApp = undefined;
  });

  it('should render a Grid component', () => {
    expect(wrapper.find('Grid').length).toEqual(1);
  });

  it('should render a div #quote-box', () => {
    expect(wrapper.find('#quote-box').length).toEqual(1);
  });

  it('should render a Quote component', () => {
    expect(wrapper.find('Quote').length).toEqual(1);
  });
  it('should render a Author component', () => {
    expect(wrapper.find('Author').length).toEqual(1);
  });
  it('should render a ButtonLink component', () => {
    expect(wrapper.find('ButtonLink').length).toEqual(1);
  });
  it('should render a Button component', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('always sets correct state from mock', async () => {
    const app1 = await app();
    const { state } = app1.instance();
    expect(state.quotes.length).toBeGreaterThan(0);
    expect(state.quotes).toMatchObject(quotes);
  });

  it('should have the correct Author', () => {
    const author = shallow(<App />).find('Author');
    expect(author.get(0).props).toHaveProperty('id', 'author');
    expect(author.get(0).props).toHaveProperty('author', '');
  });
  it('should have the correct Quote', () => {
    const quote = shallow(<App />).find('Quote');
    expect(quote.get(0).props).toHaveProperty('id', 'text');
    expect(quote.get(0).props).toHaveProperty('quote', '');
  });
  it('should have the correct ButtonLink', () => {
    const bl = shallow(<App />).find('ButtonLink');
    expect(bl.get(0).props).toHaveProperty('id', 'tweet-quote');
  });
  it('should have the correct Button', () => {
    const btn = shallow(<App />).find('Button');
    expect(btn.get(0).props).toHaveProperty('id', 'new-quote');
    expect(spy).toHaveBeenCalledTimes(0);
    btn.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
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
  const component = renderer.create(<Grid bgColor="red" />);
  it('always renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Quote', () => {
  const component = renderer.create(
    <Quote id="text" color="red" opacity={0.5} quote="hi" />
  );
  it('always renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Author', () => {
  const component = renderer.create(
    <Author id="author" color="red" opacity={0.5} author="jim" />
  );
  it('always renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  const component = renderer.create(
    <Button id="new-quote" bgColor="red" onClick={jest.fn()} />
  );
  it('always renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ButtonLink', () => {
  const component = renderer.create(
    <ButtonLink
      className="fa fa-twitter"
      id="tweet-quote"
      bgColor="red"
      href="myhref"
      target="_blank"
    />
  );
  it('always renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
