import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import './Home.css';
import ItemType from '../types/item';

function Home({ items }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[32px_10px] px-5 py-8 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-[40px_15px] md:px-[50px] md:py-10">
      {items.map((item) => (
        <Thumbnail
          key={item.itemId}
          image={itemImages[item.imageId]}
          title={item.title}
        />
      ))}
    </div>
  );
}
Home.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Home;
