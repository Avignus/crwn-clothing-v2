import categories from "../../components/categories";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <>
      <Directory categories={categories} />
    </>
  );
};

export default Home;
