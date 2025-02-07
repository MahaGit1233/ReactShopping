import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_ARRAY = [
    { title: 'Test', price: 6, description: 'This is a first product - amazing!' },
    { title: 'Test 1', price: 5, description: 'This is a second product - amazing!' },
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_ARRAY.map(item => (<ProductItem
          title={item.title}
          price={item.price}
          description={item.description}
        />))}
      </ul>
    </section>
  );
};

export default Products;
