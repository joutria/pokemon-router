import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../context/Context";

function Home() {
  const { register, handleSubmit } = useForm();
  const { setUser, setIsAuth } = useContextInfo();
  let history= useHistory();

  useEffect(()=>{
    setUser('');
    setIsAuth(false);
  },[])

  function onSubmit(values) {
    setIsAuth(true);
    setUser(values);
    
    history.push("/Pokemon");
  }

  return (
    <div className="Home flex-center">
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)}>
        <label>Traineer name</label>
        <input
          placeholder="Your name here..."
          type="text"
          user="user"
          {...register("user", { required: true })}
        />
        <button className='hover-effect'>Go!</button>
      </form>
    </div>
  );
}

export default Home;
