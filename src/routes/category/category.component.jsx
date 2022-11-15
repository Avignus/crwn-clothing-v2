import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.jsx";
import { CategoryTitle, CategoryContainer } from "./category.styles.jsx";
import { selectCategories } from "../../store/categories/category.selector";
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategories);
  console.log(categoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    if (categoriesMap !== undefined) {
      console.log("effect fired calling setProducts");
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
