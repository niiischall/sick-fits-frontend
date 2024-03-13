import Edit from '../components/Edit';

const EditProductPage = ({ query }) => {
  const { id = '' } = query ?? {};
  return <Edit id={id} />;
};

export default EditProductPage;
