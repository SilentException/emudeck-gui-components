import './sonic.scss';

function Sonic() {
  return (
    <div className="sonic-container">
      <button id="info-toggle" className="info-button">
        Display info panel
      </button>

      <div id="container">
        <div className="background-wrapper">
          <div className="sky-wrapper">
            <div className="sky" />
            <div className="ocean-sparkle" />
          </div>

          <div className="mountains" />
          <div className="mountains-lower" />
          <div className="tile-1" />
          <div className="tile-2" />
          <div className="tile-3" />
          <div className="tile-4" />
          <div className="tile-5" />
        </div>

        <div className="sonic-wrapper">
          <div className="sonic" />
        </div>

        <div className="platform-wrapper">
          <div className="platform" />
          <div className="earth-tile" />
        </div>
      </div>
      <div id="center" />
    </div>
  );
}
export default Sonic;
