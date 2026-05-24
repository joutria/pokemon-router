import { useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../context/Context";

function Home() {
  const { register, handleSubmit } = useForm();
  const { setUser, setIsAuth, user } = useContextInfo();
  let history = useHistory();

  // Memoize storedUser to avoid repeated localStorage reads
  const storedUser = useMemo(() => localStorage.getItem('trainerName'), []);

  useEffect(() => {
    if (storedUser && (!user || !user.user)) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
    } else if (!storedUser) {
      setUser("");
      setIsAuth(false);
    }
    // Only run on mount
    // eslint-disable-next-line
  }, []);

  function onSubmit(values) {
    setIsAuth(true);
    setUser(values);
    localStorage.setItem('trainerName', JSON.stringify(values));
    history.push("/Pokemon");
  }

  if (storedUser) {
    return <Redirect to="/Pokemon" />;
  }
  return (
    <main className="Home flex-center" aria-label="Trainer login">
      <form className="flex-column" onSubmit={handleSubmit(onSubmit)} aria-label="Trainer login form">
        <label htmlFor="trainer-name">Trainer name</label>
        <input
          id="trainer-name"
          placeholder="Your name here..."
          type="text"
          aria-required="true"
          aria-label="Trainer name"
          autoFocus
          {...register("user", { required: true })}
        />
        <button className="hover-effect" type="submit" aria-label="Submit trainer name">Go!</button>
      </form>
    </main>
  );
}

export default Home;
