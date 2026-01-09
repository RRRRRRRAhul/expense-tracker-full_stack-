const BASE_URL = "https://expense-tracker-vslc.onrender.com/api";

export const fetchFromApi = async (
    endpoint,
    { method = "GET", body = null, auth = true } = {}
) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (auth) {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw {
            status: response.status,
            data,
        };
    }

    return data;
};
