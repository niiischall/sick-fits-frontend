import styled from 'styled-components';

const Dot = styled.div`
  background-color: var(--red);
  color: white;
  border-radius: 50%;
  padding: 1rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export default Dot;
