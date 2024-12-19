import { useEffect, useState } from "react";
import Reserve from "../types/reserve";

const REQUEST_URL = import.meta.env.VITE_API_URL;
// /api/reserve_list GET

const useGetReserveList = () => {
    const [reserves, setReserves] = useState<Reserve[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchReserveList = async () => {
        try {
          const response = await fetch(`${REQUEST_URL}/api/reservations_list`);
          if (!response.ok) {
            throw new Error('予約リストの取得に失敗しました');
          }
          const data = await response.json();
          setReserves(data);
        } catch (err) {
          setError(err as string);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReserveList();
    }, []);
  
    return { reserves, loading, error };
  };
  
  export default useGetReserveList;