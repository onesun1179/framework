import { useEffect, useState } from "react";
import axios from "axios";

function useFetch<D = any>(url: string) {
	const [payload, setPayload] = useState<D | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(url);
				setPayload(data);
			} catch {
				setError("something is worng!");
			} finally {
				setLoading(false);
			}
		})();
	}, [url]);
	return { payload, loading, error };
}

export default useFetch;
