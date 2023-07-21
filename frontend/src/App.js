import "./App.css";
import preview from "./images/base.jpg";
import ring from "./images/planet.jpg";
import piolet from "./images/piolet.jpg";
import logo from "./images/logo.png";

function App() {
  return (
    <main>
      <header>
        <img src={logo} alt=''></img>
        {/* <a href='' className='logo'>
          MyBlog
        </a> */}
        <nav>
          <a href=''>Login</a>
          <a href=''>Register</a>
        </nav>
      </header>
      <div className='post'>
        <div className='image'>
          <img src={preview} alt='' />
        </div>
        <div className='texts'>
          <h2>Planetary Base</h2>
          <p>
            "Out There" is a cutting-edge planetary base designed for ambitious
            space exploration missions. Located on a distant and uncharted
            exoplanet, the base represents the pinnacle of human ingenuity and
            technology, created with the vision of unlocking the mysteries of
            the cosmos.
          </p>
        </div>
      </div>
      <div className='post'>
        <div className='image'>
          <img src={ring} alt='' />
        </div>
        <div className='texts'>
          <h2>Planetary Exploration</h2>
          <p>
            "Out There" is a cutting-edge planetary base designed for ambitious
            space exploration missions. Located on a distant and uncharted
            exoplanet, the base represents the pinnacle of human ingenuity and
            technology, created with the vision of unlocking the mysteries of
            the cosmos.
          </p>
        </div>
      </div>
      <div className='post'>
        <div className='image'>
          <img src={piolet} alt='' />
        </div>
        <div className='texts'>
          <h2>Pioleting Space Crafts</h2>
          <p>
            "Out There" is a cutting-edge planetary base designed for ambitious
            space exploration missions. Located on a distant and uncharted
            exoplanet, the base represents the pinnacle of human ingenuity and
            technology, created with the vision of unlocking the mysteries of
            the cosmos.
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
