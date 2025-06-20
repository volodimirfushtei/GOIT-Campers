import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCampers } from "../../redux/Vans/operations";
import { selectError, selectIsLoading } from "../../redux/Vans/selectors";

import Loader from "../../components/Loader/Loader";

import VanList from "../../components/VanList/VanList";

import css from "./Catalog.module.css";
import SideBar from "../../components/SideBar/SideBar";

const CamperPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  return (
    <main className={css.container_catalog}>
      <SideBar />
      {isLoading && <Loader />}
      {error ? (
        <div className="text-red-600 p-5 text-xl text-center bg-gradient-to-br from-red-100 via-white to-red-200 w-full height-10">
          ⚠️ {error}
        </div>
      ) : (
        <div className="w-full ">
          <VanList />
        </div>
      )}
    </main>
  );
};

export default CamperPage;
