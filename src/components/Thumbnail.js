import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Thumbnail({ itemId, image, title }) {
  return (
    <Link
      className="thumbnail-component flex flex-col w-full no-underline text-[black]"
      to={`/details/${itemId}`}
    >
      <div className="bg-[#B9A28D] flex justify-center items-center px-10 py-5 rounded-lg">
        <img className="h-[106px] w-[106px] transition-transform duration-[333ms] ease-[ease]" src={image} alt={title} />
      </div>
      <p className="flex w-full justify-center items-center text-[21px] text-center whitespace-nowrap mt-[9px] mb-0 mx-0">{title}</p>
    </Link>
  );
}

Thumbnail.propTypes = {
  itemId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Thumbnail;
