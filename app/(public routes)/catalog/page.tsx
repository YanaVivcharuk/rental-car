import mainCss from "../Home.module.css";
import css from "./CatalogPage.module.css";
import CatalogClientPage from "./CatalogClientPage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchCarBrandsServer, fetchServerCars } from "@/lib/api/serverApi";

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["brands"],
    queryFn: async () => fetchCarBrandsServer(),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars"],
    queryFn: async ({ pageParam = 1 }) => fetchServerCars(),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClientPage />
    </HydrationBoundary>
  );
}
