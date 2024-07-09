import { useParams } from 'react-router-dom';

function RewardsTier() {
  const { tier } = useParams();

  return (
    <div>
      {tier}
    </div>
  );
}

export default RewardsTier;
