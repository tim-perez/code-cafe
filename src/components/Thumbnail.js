import PropTypes from 'prop-types';

function Thumbnail({ image, title }) {
  return (
    <a
      href="#todo"
      className="thumbnail-component flex flex-col w-full no-underline text-[black]"
    >
      <div className="bg-[#B9A28D] flex justify-center items-center px-10 py-5 rounded-lg">
        <img className="h-[106px] w-[106px] transition-transform duration-[333ms] ease-[ease]" src={image} alt={title} />
      </div>
      <p className="flex w-full justify-center items-center text-[21px] text-center whitespace-nowrap mt-[9px] mb-0 mx-0">{title}</p>
    </a>
  );
}

Thumbnail.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Thumbnail;
