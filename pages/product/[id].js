import Product from '../../components/Product';

export const ProductPage = ({ query }) => <Product id={query?.id} />;

export default ProductPage;
