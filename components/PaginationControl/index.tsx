import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PaginationControls = ({ total }: { total: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? 1;
  const per_page = searchParams.get("per_page") ?? 12;

  const handlePage = useCallback(
    (page: number) => {
      router.push(`${pathname}/?page=${Number(page)}&per_page=${per_page}`);
    },
    [router, pathname, per_page]
  );

  return (
    <Pagination
      total={Math.ceil(total / Number(per_page))}
      initialPage={Number(page)}
      showShadow
      onChange={handlePage}
    />
  );
};

export default PaginationControls;
