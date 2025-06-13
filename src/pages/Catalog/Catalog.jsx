import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCampers } from "../../redux/Vans/operations";
import { selectError, selectIsLoading } from "../../redux/Vans/selectors";

import Loader from "../../components/Loader/Loader";
import SearchForm from "../../components/SearchForm/SearchForm";
import VanList from "../../components/VanList/VanList";

import css from "./Catalog.module.css";

const CamperPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  return (
    <main className={css.container_catalog}>
      <SearchForm />
      {isLoading && <Loader />}
      {error ? (
        <div className="text-red-600 text-sm text-center">⚠️ {error}</div>
      ) : (
        <div className="w-full ">
          <VanList />
        </div>
      )}
    </main>
  );
};

export default CamperPage;
