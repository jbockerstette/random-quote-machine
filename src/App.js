import React from 'react';
import './App.css';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

const Button = props => <button className="btn" {...props} />;
const ButtonLink = ({ className, ...rest }) => {
  const cls = ['btn', className].join(' ');
  return <a className={cls} {...rest} />;
};

const Quote = ({ quote, ...rest }) => (
  <p {...rest}>
    <i className="fa fa-quote-left" />
    {` ${quote} `}
    <i className="fa fa-quote-right" />
  </p>
);

const Author = ({ author, ...rest }) => <p {...rest}>{`- ${author}`}</p>;

class App extends React.Component {
  state = { quotes: [], quote: 0, colorIndex: 0 };
  async componentDidMount() {
    try {
      const json = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const quotes = await json.json();
      this.setState(
        () => ({ quotes: quotes.quotes }),
        () => this.handleNextQuote()
      );
    } catch (error) {
      console.error(error);
    }
  }

  getTwitterLink = q => {
    if (q) {
      return `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='${encodeURIComponent(
        `"${q.quote}" ${q.author}`
      )}`;
    }
    return '';
  };

  handleNextQuote = () => {
    const quote = Math.round(Math.random() * this.state.quotes.length);
    this.setState(({ colorIndex }) => {
      let nextColor = colorIndex + 1;
      if (nextColor === colors.length) {
        nextColor = 0;
      }
      return { quote, colorIndex: nextColor };
    });
  };

  render() {
    const { quotes, quote, colorIndex } = this.state;
    const q = quotes[quote];
    const bgColor = { background: colors[colorIndex] };
    const color = { color: colors[colorIndex] };
    const href = this.getTwitterLink(q);

    return q ? (
      <div className="grid" style={bgColor}>
        <div id="quote-box">
          <Quote id="text" style={color} quote={q.quote} />
          <Author id="author" style={color} author={q.author} />
          <ButtonLink
            className="fa fa-twitter"
            id="tweet-quote"
            style={bgColor}
            href={href}
            target="_blank"
          />
          <Button id="new-quote" onClick={this.handleNextQuote} style={bgColor}>
            New Quote
          </Button>
        </div>
      </div>
    ) : null;
  }
}
export default App;
