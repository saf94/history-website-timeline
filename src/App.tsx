import "./App.css";
import data from "./data.json";
import {
  ScrollMenu,
  // VisibilityContext
} from "react-horizontal-scrolling-menu";

// type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function App() {
  const timelineData = data.data;
  const lengthOfTimeline =
    timelineData[timelineData.length - 1].year - timelineData[0].year;
  const timelineList = Array(lengthOfTimeline + 1)
    .fill(1)
    .map((x, y) => timelineData[0].year + y);

  console.log("timelineData", timelineData);
  console.log("lengthOfTimeline", lengthOfTimeline);
  console.log("timelineList", timelineList);
  // function onWheel(
  //   apiObj: scrollVisibilityApiType,
  //   ev: React.WheelEvent
  // ): void {
  //   const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  //   if (isThouchpad) {
  //     ev.stopPropagation();
  //     return;
  //   }

  //   if (ev.deltaY > 0) {
  //     apiObj.scrollNext();
  //   } else if (ev.deltaY < 0) {
  //     apiObj.scrollPrev();
  //   }
  // }

  return (
    <div className="App">
      <ScrollMenu>
        {timelineList.map((year) => {
          const timelineElement = timelineData.filter(
            (yearElement) => yearElement.year === year
          );

          if (timelineElement.length === 0) {
            return <div></div>;
            // (
            //   <div className="timeline-element-empty" key={year}>
            //     <div className="background-styled-divider"></div>
            //     <div className="timeline-element-section" />
            //     <div className="timeline-line"></div>
            //     <div className="timeline-tick"></div>
            //     <h4 className="timeline-tick-year">{year}</h4>
            //     <div className="timeline-element-section" />
            //   </div>
            // );
          }

          if (timelineElement.length > 1 && timelineElement.length % 2 !== 0) {
            timelineElement.push({
              year: 0,
              endYear: null,
              imageLink: "",
              title: "",
              description: "",
              link: "",
            });
          }

          let yearText = `${timelineElement[0].year}`;

          if (timelineElement[0].endYear) {
            yearText = `${timelineElement[0].year} - ${timelineElement[0].endYear}`;
          }

          let amendedClassName = ''

          console.log('timelineElement.length', timelineElement.length)
          if (timelineElement.length > 4) {
            amendedClassName = '-extended'
          }

          return (
            <div className={`timeline-element${amendedClassName}`} key={year}>
              <div className="background-styled-divider" />
              <div className={`timeline-element-section top-section${amendedClassName}`}>
                {timelineElement.map((element, index) => {
                  if (index % 2 !== 0) {
                    return null;
                  }

                  return (
                    <a href={element.link}>
                      <div
                        className="element-wrapper"
                        key={element.description}
                      >
                        <div className="image-wrapper">
                          {/* todo: add alt text */}
                          {element.imageLink && (
                            <img
                              className="image"
                              alt="alt text here"
                              src={element.imageLink}
                            />
                          )}
                        </div>
                        <div className="text-wrapper">
                          {/* {element.year > 0 && (
                            <h4 className="text-year">{yearText}</h4>
                          )} */}
                          <p>{element.description}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="timeline-line"></div>
              <div className="timeline-tick"></div>
              <h4 className="timeline-tick-year">{yearText}</h4>

              <div className={`timeline-element-section bottom-section${amendedClassName}`}>
                {timelineElement.map((element, index) => {
                  if (index % 2 === 0) {
                    return null;
                  }

                  return (
                    <a href={element.link}>
                      <div
                        className="element-wrapper"
                        key={element.description}
                      >
                        <div className="image-wrapper">
                          {/* todo: add alt text */}
                          {element.imageLink && (
                            <img
                              className="image"
                              alt="alt text here"
                              src={element.imageLink}
                            />
                          )}
                        </div>
                        <div className="text-wrapper">
                          {/* {element.year > 0 && (
                            <h4 className="text-year">{yearText}</h4>
                          )} */}
                          <p>{element.description}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
}

export default App;
