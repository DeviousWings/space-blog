import register from "../images/register.jpg";

export default function Register() {
  return (
    <div>
      <form className='register'>
        <h1>Register</h1>
        <input type='text' placeholder='username' />
        <input type='text' placeholder='password' />
        <button>Register</button>
      </form>
      <div className='registerImg'>
        <a href='https://www.artstation.com/artwork/space-outpost-bce36731-badd-4f50-a73b-cb40696b5306'>
          <img src={register} alt='Space Outpost' />
          <h6>by Tim Witprächtiger</h6>
        </a>
      </div>
    </div>
  );
}
