import './App.css';
import data from './data.json'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function App() {
  function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY > 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY < 0) {
      apiObj.scrollPrev();
    }
  }

  return (
    <div className="App">
      <ScrollMenu
        onWheel={onWheel}
      >
        {data.data.map(element => (
          <div className='element-wrapper'>
            <div>
              <img className="image" alt="google logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png" />
            </div>
            <div>
              <h3>{element.year}</h3>
              <p>{element.description}</p>
            </div>
          </div>
        ))}
      </ScrollMenu >
    </div>
  );
}

export default App;
