import { useParams } from 'react-router-dom';

function RewardsTier() {
  const { tier } = useParams();

  return (
    <div>
      <h2>
        {tier}
      </h2>
    </div>
  );
}

export default RewardsTier;
