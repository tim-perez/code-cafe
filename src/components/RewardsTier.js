import { useParams } from 'react-router-dom';

function RewardsTier() {
  const { tier } = useParams();

  return (
    <h1>
      {tier}
    </h1>
  );
}

export default RewardsTier;
