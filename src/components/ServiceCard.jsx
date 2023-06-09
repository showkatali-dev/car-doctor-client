/* eslint-disable react/prop-types */
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, title, img, price } = service;

  return (
    <div className="card bg-base-100 border shadow">
      <figure className="px-6 pt-6">
        <img
          src={img}
          alt="Shoes"
          className="rounded-xl aspect-[1.5/1] object-cover"
        />
      </figure>
      <div className="card-body px-6">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions items-center text-primary font-semibold">
          <p>Price: ${price}</p>
          <Link to={`/appointment/${_id}`} className="text-xl">
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
