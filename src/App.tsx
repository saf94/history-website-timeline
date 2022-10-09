import './App.css';
import data from './data.json'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function App() {
  const timelineData = data.data
  const lengthOfTimeline = timelineData[timelineData.length - 1].year - timelineData[0].year
  const timelineList = Array(lengthOfTimeline).fill(1).map((x, y) => timelineData[0].year + y)

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
        {timelineList.map(year => {

          const timelineElement = timelineData.filter(yearElement => yearElement.year === year)

          if (timelineElement.length === 0) {
            return (
              <div className='timeline-element-empty' key={year}>
                <div className='background-styled-divider'></div>
                <div className='timeline-element-section'>
                  <div className='empty-section'></div>
                  <div className='timeline-line'></div>
                  <div className='timeline-tick'></div>
                  <h4 className='timeline-tick-year'>{year}</h4>
                </div>
              </div>
            )
          }

          return (
            <div className='timeline-element' key={year}>
              <div className='background-styled-divider' />
              <div className='timeline-element-section'>
                {timelineElement.map(element => {
                  return (
                    <div className='element-wrapper' key={element.description}>
                      <div className='image-wrapper'>
                        <img className="image" alt="alt text here" src={element.imageLink} />
                      </div>
                      <div className='text-wrapper'>
                        <h4 className='text-year'>{element.year}</h4>
                        <p>{element.description}</p>
                      </div>
                    </div>
                  )
                })}
                <div className='timeline-line'></div>
                <div className='timeline-tick'></div>
                <h4 className='timeline-tick-year'>{year}</h4>
              </div>
            </div>
          )
        }
        )
        }
      </ScrollMenu>
    </div>
  );
}

export default App;
