import { useDispatch, useSelector } from "react-redux";

import { fetchCampers } from "../../redux/Vans/operations";
import {
  selectCampers,
  selectIsLoading,
  selectTotalCampers,
} from "../../redux/Vans/selectors";

import css from "./VanList.module.css";
import VanItem from "../VanItem/VanItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton.jsx";

const VanList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const totalCampers = useSelector(selectTotalCampers);
  const isLoading = useSelector(selectIsLoading);

  const loadMore = () => {
    if (isLoading || campers.length >= totalCampers) return;
    const currentPage = Math.ceil(campers.length / 4) + 1;
    dispatch(fetchCampers({ page: currentPage, limit: 4 }));
  };

  return (
    <section className={css.camper_section}>
      <ul className={css.camper_list}>
        {campers.map((camper) => (
          <VanItem key={camper.id} camper={camper} />
        ))}
      </ul>

      {!isLoading && campers.length < totalCampers && (
        <LoadMoreButton onClick={loadMore} />
      )}
    </section>
  );
};

export default VanList;
