import { useEffect } from "react";

export default function useTitle(page) {
  useEffect(() => {
    document.title = page ? `GameHat: ${page}` : "GameHat";
  }, [page]);
}
