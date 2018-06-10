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

export const Grid = ({ bgColor, ...rest }) => (
  <div className="grid" style={{ background: bgColor }} {...rest} />
);
export const Button = ({ bgColor, ...rest }) => (
  <button className="btn" style={{ background: bgColor }} {...rest} />
);
export const ButtonLink = ({ className, bgColor, ...rest }) => {
  const cls = ['btn', className].join(' ');
  return <a className={cls} style={{ background: bgColor }} {...rest} />;
};

export const Quote = ({ quote, color, opacity, ...rest }) => (
  <p {...rest} style={{ color, opacity }}>
    <i className="fa fa-quote-left" />
    {` ${quote} `}
    <i className="fa fa-quote-right" />
  </p>
);

export const Author = ({ author, color, opacity, ...rest }) => (
  <p {...rest} style={{ color, opacity }}>{`- ${author}`}</p>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [{ quote: '', author: '' }],
      quote: 0,
      colorIndex: 0,
      opacity: 0
    };
    this.handleNextQuote = this.handleNextQuote.bind(this);
  }

  async componentDidMount() {
    try {
      const json = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const quotes = await json.json();
      this.setState(() => ({ quotes: quotes.quotes }));
    } catch (error) {
      console.error(error);
    }
  }

  static getTwitterLink(q) {
    if (q) {
      return `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='${encodeURIComponent(
        `"${q.quote}" ${q.author}`
      )}`;
    }
    return '';
  }

  handleNextQuote() {
    this.setState(() => ({ opacity: 0 }));
    setTimeout(() => {
      const quote = Math.round(Math.random() * this.state.quotes.length);
      this.setState(({ colorIndex }) => {
        let nextColor = colorIndex + 1;
        if (nextColor === colors.length) {
          nextColor = 0;
        }
        return { quote, colorIndex: nextColor, opacity: 1 };
      });
    }, 0);
  }

  render() {
    const { quotes, quote, colorIndex, opacity } = this.state;
    const q = quotes[quote];
    const color = colors[colorIndex];
    const href = App.getTwitterLink(q);
    return q ? (
      <Grid bgColor={color}>
        <div id="quote-box">
          <Quote id="text" color={color} opacity={opacity} quote={q.quote} />
          <Author
            id="author"
            color={color}
            opacity={opacity}
            author={q.author}
          />
          <ButtonLink
            className="fa fa-twitter"
            id="tweet-quote"
            bgColor={color}
            href={href}
            target="_blank"
          />
          <Button id="new-quote" onClick={this.handleNextQuote} bgColor={color}>
            New Quote
          </Button>
        </div>
      </Grid>
    ) : null;
  }
}
export default App;
