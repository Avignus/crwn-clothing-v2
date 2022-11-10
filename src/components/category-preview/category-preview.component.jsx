import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.jsx";
import { Link } from "react-router-dom";
import {
  CategoryPreviewContainer,
  PreviewContainer,
} from "./category-preview.styles.jsx";
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={`/shop/${title}`}>
          <span>{title.toUpperCase()}</span>
        </Link>
      </h2>
      <PreviewContainer>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
