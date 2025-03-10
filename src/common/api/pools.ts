import { PoolDetails } from "@/app/types/types";

const url = process.env.NEXT_PUBLIC_SHAMBA_BACKEND_URL!;

export default async function fetchPools() {
    const response = await fetch(`${url}pools`)

    if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }

    try {
        const pools = await response.json();
        return pools;
    } catch (error) {
        console.log("Failed to fetch pools", error)
    }
}

// export default async function savePoolDetails(poolDetails: PoolDetails) {
//     const response = await fetch(`${url}save-pools`, {
//         method: "POST"
//     })
// }