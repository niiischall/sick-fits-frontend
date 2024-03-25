import ResetPassword from '../components/ResetPassword';

const ResetPage = ({ query }) => (
  <div>
    <ResetPassword token={query?.token} />
  </div>
);

export default ResetPage;
