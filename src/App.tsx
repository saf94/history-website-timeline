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
          <div className='timeline-element'>
            <div className='background-styled-divider'></div>
            <div className='element-wrapper'>
              <div className='image-wrapper'>
                <img className="image" alt="alt text here" src={element.imageLink} />
              </div>
              <div className='text-wrapper'>
                <h4 className='text-year'>{element.year}</h4>
                <p>{element.description}</p>
              </div>
            </div>
            <div className='timeline-line'></div>
            <div className='timeline-tick'></div>
            <h4 className='timeline-tick-year'>{element.year}</h4>
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
}

export default App;
