import preview from "../images/base.jpg";

export default function Post() {
  return (
    <div className='post'>
      <div className='image'>
        <img src={preview} alt='' />
      </div>
      <div className='blog'>
        <h2>Planetary Base</h2>
        <p className='info'>
          <span className='author'>Nathanael King</span>
          <time>2023-07-20 19:40</time>
        </p>
        <p className='sum'>
          "Out There" is a cutting-edge planetary base designed for ambitious
          space exploration missions. Located on a distant and uncharted
          exoplanet, the base represents the pinnacle of human ingenuity and
          technology, created with the vision of unlocking the mysteries of the
          cosmos.
        </p>
      </div>
    </div>
  );
}
