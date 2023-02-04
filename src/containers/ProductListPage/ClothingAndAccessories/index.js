import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

import classes from "./style.module.css";

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        position: "absolute",
        top: "17%",
        width: "99vw",
        display: "flex",
        gap: "3rem",
      }}
    >
              {product.products.map((product) => (
      <div className={classes.card}>
            <Link
              classNameName={classes.caImgContainer}
              to={`/${product.slug}/${product._id}/p`}
            >
            <img
              src={`http://localhost:5000/public/${product.productPictures[0].img} `}
              className={classes.card__img}
            />
            </Link>
            <h2 className={classes.card__title}>{product.name}</h2>
            {/* <h2 className="card__price">{product.price}</h2> */}
            <a href="#" className={classes.card__link}>
              Buy Now
            </a>
      </div>
      ))}
    </div>
  );
};

export default ClothingAndAccessories;
